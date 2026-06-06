"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function RevealQuiz({
  children,
  choices,
  correctAnswer,
  correctFeedback,
  incorrectFeedback,
  shortAnswer,
}: {
  children: ReactNode;
  choices: string[];
  correctAnswer: string;
  correctFeedback: string;
  incorrectFeedback: string;
  shortAnswer: string;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (revealed) {
      answerRef.current?.focus();
    }
  }, [revealed]);

  function choose(answer: string) {
    if (revealed) return;
    setSelected(answer);
  }

  return (
    <>
      <section className="quiz-panel" aria-labelledby="quiz-heading">
        <p className="section-kicker">Before you peek</p>
        <h2 id="quiz-heading">What do you think?</h2>
        <p className="quiz-instruction">
          Make a guess. This is curiosity, not a test.
        </p>
        <div className="choice-list">
          {choices.map((choice) => {
            const isSelected = selected === choice;
            const isCorrect = revealed && choice === correctAnswer;
            const isIncorrect =
              revealed && isSelected && choice !== correctAnswer;

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
          <button
            aria-controls="wonder-reveal-content"
            aria-expanded="false"
            className="button button-dark reveal-button"
            disabled={!selected}
            onClick={() => setRevealed(true)}
            type="button"
          >
            Reveal the answer
          </button>
        ) : (
          <div
            className={`answer-reveal ${
              selected === correctAnswer ? "answer-correct" : "answer-incorrect"
            }`}
            ref={answerRef}
            tabIndex={-1}
          >
            <p className="answer-result">
              {selected === correctAnswer ? "Your guess was right" : "Not quite"}
            </p>
            <p className="answer-feedback">
              {selected === correctAnswer ? correctFeedback : incorrectFeedback}
            </p>
            <p className="answer-copy">{shortAnswer}</p>
            <a className="text-link" href="#explanation">
              Continue to the explanation <span aria-hidden="true">↓</span>
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
          {children}
        </div>
      ) : null}
    </>
  );
}
