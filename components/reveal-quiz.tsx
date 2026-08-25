"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type RevealPayload = {
  correct: boolean;
  correctAnswer: string;
  correctFeedback: string;
  incorrectFeedback: string;
  explanation: MDXRemoteSerializeResult;
  wowFact: string;
};

export function RevealQuiz({
  children,
  choices,
  curiosityChain,
  slug,
}: {
  children: ReactNode;
  choices: string[];
  curiosityChain?: ReactNode;
  slug: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [reveal, setReveal] = useState<RevealPayload | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const answerRef = useRef<HTMLDivElement>(null);
  const revealed = reveal !== null;

  useEffect(() => {
    if (revealed) {
      answerRef.current?.focus();
    }
  }, [revealed]);

  function choose(answer: string) {
    if (revealed) return;
    setSelected(answer);
  }

  async function revealAnswer() {
    if (!selected || status === "loading") return;

    setStatus("loading");

    try {
      const response = await fetch(`/api/wonders/${slug}/reveal`, {
        body: JSON.stringify({ selected }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Reveal request failed");
      }

      const data = (await response.json()) as RevealPayload;

      setReveal(data);
      setStatus("idle");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <section className="quiz-panel" aria-labelledby="quiz-heading">
        <p className="section-kicker">Take a Guess</p>
        <h2 id="quiz-heading">What do you think?</h2>
        <p className="quiz-instruction">Pick the answer that feels most likely.</p>
        <div className="choice-list">
          {choices.map((choice) => {
            const isSelected = selected === choice;
            const isCorrect = revealed && choice === reveal.correctAnswer;
            const isIncorrect =
              revealed && isSelected && choice !== reveal.correctAnswer;

            return (
              <button
                aria-pressed={isSelected}
                className={`choice ${isSelected ? "selected" : ""} ${
                  isCorrect ? "correct" : ""
                } ${isIncorrect ? "incorrect" : ""}`}
                disabled={revealed}
                key={choice}
                onClick={() => choose(choice)}
                type="button"
              >
                <span className="choice-dot" aria-hidden="true" />
                <span>{choice}</span>
              </button>
            );
          })}
        </div>
        {!revealed ? (
          <>
            <button
              aria-controls="wonder-reveal-content"
              aria-expanded="false"
              className="button button-dark reveal-button"
              disabled={!selected || status === "loading"}
              onClick={revealAnswer}
              type="button"
            >
              {status === "loading" ? "Revealing…" : "Reveal the answer"}
            </button>
            {status === "error" ? (
              <p className="reveal-error" role="alert">
                Something went wrong loading the answer. Please try again.
              </p>
            ) : null}
          </>
        ) : (
          <div
            className={`answer-reveal ${
              selected === reveal.correctAnswer ? "answer-correct" : "answer-incorrect"
            }`}
            ref={answerRef}
            tabIndex={-1}
          >
            <p className="answer-result">
              {selected === reveal.correctAnswer ? "You got it" : "Not quite"}
            </p>
            <p className="answer-feedback">
              {selected === reveal.correctAnswer
                ? reveal.correctFeedback
                : reveal.incorrectFeedback}
            </p>
            <p className="answer-copy">{reveal.correctAnswer}</p>
            <a className="text-link" href="#explanation">
              Read the why <span aria-hidden="true">↓</span>
            </a>
          </div>
        )}
      </section>

      {revealed ? (
        <div
          className="post-reveal-content"
          id="wonder-reveal-content"
          aria-label="Wonder answer and explanation"
        >
          <div className="editorial-grid">
            <article className="explanation" id="explanation">
              <p className="section-kicker">The why</p>
              <MDXRemote {...reveal.explanation} />
            </article>

            <div className="editorial-sidebar">
              <aside className="wow-fact-card" aria-labelledby="wow-fact-heading">
                <p className="section-kicker">WAIT... WHAT?</p>
                <h2 id="wow-fact-heading">One more weird little door</h2>
                <p>{reveal.wowFact}</p>
              </aside>

              {curiosityChain}
            </div>
          </div>

          {children}
        </div>
      ) : null}
    </>
  );
}
