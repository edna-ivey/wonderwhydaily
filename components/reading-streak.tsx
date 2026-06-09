"use client";

import { useEffect, useState } from "react";

const storageKey = "wonder-why-daily-reading-streak";

type Streak = {
  current: number;
  longest: number;
  lastVisit: string;
};

function daysBetween(earlier: string, later: string): number {
  const start = Date.parse(`${earlier}T12:00:00Z`);
  const end = Date.parse(`${later}T12:00:00Z`);

  return Math.round((end - start) / 86_400_000);
}

export function ReadingStreak({
  editorialDate,
  trackOnly = false,
}: {
  editorialDate: string;
  trackOnly?: boolean;
}) {
  const [streak, setStreak] = useState<Streak | null>(null);

  useEffect(() => {
    let previous: Streak | null = null;

    try {
      previous = JSON.parse(localStorage.getItem(storageKey) ?? "null") as Streak;
    } catch {
      previous = null;
    }

    if (previous?.lastVisit === editorialDate) {
      setStreak(previous);
      return;
    }

    const current =
      previous && daysBetween(previous.lastVisit, editorialDate) === 1
        ? previous.current + 1
        : 1;
    const next = {
      current,
      longest: Math.max(previous?.longest ?? 0, current),
      lastVisit: editorialDate,
    };

    localStorage.setItem(storageKey, JSON.stringify(next));
    setStreak(next);
  }, [editorialDate]);

  if (trackOnly) return null;

  return (
    <aside className="reading-streak" aria-label="Your reading streak">
      <div>
        <p className="section-kicker">Your curiosity habit</p>
        <p className="reading-streak-note">A quiet record of days you stopped to wonder.</p>
      </div>
      <dl>
        <div>
          <dt>Current streak</dt>
          <dd>{streak ? `${streak.current} day${streak.current === 1 ? "" : "s"}` : "—"}</dd>
        </div>
        <div>
          <dt>Longest streak</dt>
          <dd>{streak ? `${streak.longest} day${streak.longest === 1 ? "" : "s"}` : "—"}</dd>
        </div>
      </dl>
    </aside>
  );
}
