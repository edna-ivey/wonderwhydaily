import { NextResponse } from "next/server";
import { serialize } from "next-mdx-remote/serialize";
import { getWonder } from "@/lib/wonders";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function POST(request: Request, { params }: Props) {
  const { slug } = await params;
  const wonder = getWonder(slug);

  if (!wonder) {
    return NextResponse.json({ message: "Wonder not found." }, { status: 404 });
  }

  let body: { selected?: unknown };

  try {
    body = (await request.json()) as { selected?: unknown };
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const selected = typeof body.selected === "string" ? body.selected : "";

  if (!wonder.guessChoices.includes(selected)) {
    return NextResponse.json({ message: "Invalid choice." }, { status: 400 });
  }

  const explanation = await serialize(wonder.explanation);

  return NextResponse.json({
    correct: selected === wonder.correctAnswer,
    correctAnswer: wonder.correctAnswer,
    correctFeedback: wonder.correctFeedback,
    incorrectFeedback: wonder.incorrectFeedback,
    explanation,
    wowFact: wonder.wowFact,
    ...(wonder.tryIt ? { tryIt: wonder.tryIt } : {}),
  });
}
