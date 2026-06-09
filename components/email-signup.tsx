"use client";

import { useId, useState, type FormEvent } from "react";

export function EmailSignup({ compact = false }: { compact?: boolean }) {
  const emailId = useId();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        body: JSON.stringify({
          email: form.get("email"),
          company: form.get("company"),
        }),
        headers: { "Content-Type": "application/json" },
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message ?? "Please try again in a moment.");
      }

      formElement.reset();
      setStatus("success");
      setMessage(result.message ?? "You are on the curiosity list.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error ? error.message : "Please try again in a moment.",
      );
    }
  }

  return (
    <section
      className={`email-signup ${compact ? "email-signup-compact" : ""}`}
      aria-labelledby={compact ? undefined : "email-signup-heading"}
    >
      <div className="email-signup-copy">
        <p className="section-kicker">Stay Curious.</p>
        {!compact ? (
          <h2 id="email-signup-heading">
            Get one fascinating question delivered to your inbox.
          </h2>
        ) : (
          <p>Get one fascinating question delivered to your inbox.</p>
        )}
      </div>
      <form className="email-signup-form" onSubmit={subscribe}>
        <label className="sr-only" htmlFor={emailId}>
          Email address
        </label>
        <input
          autoComplete="email"
          id={emailId}
          name="email"
          placeholder="you@example.com"
          required
          type="email"
        />
        <div className="email-honeypot" aria-hidden="true">
          <label htmlFor={`${emailId}-company`}>Company</label>
          <input
            autoComplete="off"
            id={`${emailId}-company`}
            name="company"
            tabIndex={-1}
            type="text"
          />
        </div>
        <button
          className={compact ? "button button-light" : "button button-dark"}
          disabled={status === "submitting"}
          type="submit"
        >
          {status === "submitting" ? "Joining..." : "Join the daily wonder"}
        </button>
      </form>
      <p
        className={`email-signup-status ${
          status === "error" ? "email-signup-status-error" : ""
        }`}
        role="status"
      >
        {message}
      </p>
    </section>
  );
}
