import type { Metadata } from "next";
import { WonderCard } from "@/components/wonder-card";
import { getAllWonders } from "@/lib/wonders";

export const metadata: Metadata = {
  title: "Wonder Archive",
  description: "Explore every fascinating question from Wonder Why Daily.",
};

export default function ArchivePage() {
  const wonders = getAllWonders();

  return (
    <main id="main-content">
      <header className="page-header wide-page-header wide-shell">
        <p className="section-kicker">Every question so far</p>
        <h1>Wonder archive</h1>
        <p>
          A growing collection of ordinary questions with extraordinary
          answers.
        </p>
      </header>
      <section
        className="wide-shell section-block archive-grid"
        aria-label="All wonders"
      >
        {wonders.map((wonder) => (
          <WonderCard wonder={wonder} key={wonder.slug} />
        ))}
      </section>
    </main>
  );
}
