import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: unknown; company?: unknown };

  if (typeof body.company === "string" && body.company.length > 0) {
    return NextResponse.json({ message: "Thanks for joining." });
  }

  if (typeof body.email !== "string" || !emailPattern.test(body.email)) {
    return NextResponse.json(
      { message: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const endpoint = process.env.EMAIL_SIGNUP_WEBHOOK_URL;

  if (!endpoint) {
    return NextResponse.json(
      { message: "The curiosity list is getting ready. Please try again soon." },
      { status: 503 },
    );
  }

  const response = await fetch(endpoint, {
    body: JSON.stringify({
      email: body.email.toLowerCase(),
      source: "wonderwhydaily.com",
    }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "We could not add you just yet. Please try again." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    message: "You are on the curiosity list. See you in your inbox.",
  });
}
