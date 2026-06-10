import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const buttondownEndpoint =
  process.env.BUTTONDOWN_API_URL ?? "https://api.buttondown.com/v1/subscribers";
const rateLimitWindow = 10 * 60 * 1000;
const rateLimitMaximum = 5;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip");
}

function isRateLimited(ip: string | null) {
  if (!ip) return false;

  const now = Date.now();
  const existing = attempts.get(ip);

  if (!existing || existing.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + rateLimitWindow });
    return false;
  }

  existing.count += 1;
  return existing.count > rateLimitMaximum;
}

async function getProviderError(response: Response) {
  try {
    return (await response.text()).slice(0, 1_000).toLowerCase();
  } catch {
    return "";
  }
}

export async function POST(request: Request) {
  let body: { email?: unknown; company?: unknown };

  try {
    body = (await request.json()) as { email?: unknown; company?: unknown };
  } catch {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({
      message: "Check your inbox to confirm your subscription.",
      state: "subscribed",
    });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      { message: "A few too many tries. Please wait a little while and try again." },
      {
        headers: { "Retry-After": String(rateLimitWindow / 1_000) },
        status: 429,
      },
    );
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: "The curiosity list is getting ready. Please try again soon." },
      { status: 503 },
    );
  }

  let response: Response;

  try {
    response = await fetch(buttondownEndpoint, {
      body: JSON.stringify({
        email_address: email,
        ip_address: clientIp || undefined,
        metadata: { source: "wonderwhydaily.com" },
      }),
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      signal: AbortSignal.timeout(8_000),
    });
  } catch {
    return NextResponse.json(
      { message: "We could not add you just yet. Please try again." },
      { status: 502 },
    );
  }

  if (!response.ok) {
    const providerError = await getProviderError(response);
    const isExistingSubscriber =
      response.status === 409 ||
      /(already|collision|duplicate|exists)/i.test(providerError);

    if (isExistingSubscriber) {
      return NextResponse.json({
        message: "You are already on the curiosity list.",
        state: "already_subscribed",
      });
    }

    if (response.status === 400) {
      return NextResponse.json(
        { message: "That address could not be added. Please check it and try again." },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "We could not add you just yet. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "Check your inbox to confirm your subscription.",
    state: "subscribed",
  });
}
