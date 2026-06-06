import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { RevealQuiz } from "@/components/reveal-quiz";
import { WonderArt } from "@/components/wonder-art";
import { WonderCard } from "@/components/wonder-card";
import {
  categorySlug,
  formatWonderDate,
  getRelatedWonders,
  type Wonder,
} from "@/lib/wonders";

export function WonderDetail({ wonder }: { wonder: Wonder }) {
  const related = getRelatedWonders(wonder);

  return (
    <main id="main-content">
      <section className="wonder-hero">
        <div className="shell wonder-hero-grid">
          <div className="wonder-hero-copy">
            <div className="eyebrow-row light">
              <span className="wonder-classification">
                <Link href={`/category/${categorySlug(wonder.category)}`}>
                  {wonder.category}
                </Link>
                <span aria-hidden="true">•</span>
                <span>{wonder.rating}</span>
              </span>
              <time dateTime={wonder.date}>{formatWonderDate(wonder.date)}</time>
            </div>
            <p className="hero-kicker">Today&apos;s Wonder</p>
            <h1>{wonder.title}</h1>
            <p className="hero-excerpt">{wonder.excerpt}</p>
          </div>
          <WonderArt accent={wonder.accent} category={wonder.category} />
        </div>
      </section>

      <div className="reading-shell wonder-main">
        <RevealQuiz
          choices={wonder.choices}
          correctAnswer={wonder.correctAnswer}
          correctFeedback={wonder.correctFeedback}
          incorrectFeedback={wonder.incorrectFeedback}
          shortAnswer={wonder.shortAnswer}
        >
          <article className="explanation" id="explanation">
            <p className="section-kicker">The explanation</p>
            <MDXRemote source={wonder.content} />
          </article>

          <div className="takeaway-grid">
            <aside className="takeaway-card cool-fact">
              <span className="takeaway-number" aria-hidden="true">
                01
              </span>
              <p className="section-kicker">Cool fact</p>
              <h2>One more thing</h2>
              <p>{wonder.coolFact}</p>
            </aside>
            <aside className="takeaway-card try-it">
              <span className="takeaway-number" aria-hidden="true">
                02
              </span>
              <p className="section-kicker">Try it yourself</p>
              <h2>Notice it in the wild</h2>
              <p>{wonder.tryItYourself}</p>
            </aside>
          </div>

          <section className="related-section" aria-labelledby="related-heading">
            <div className="section-heading">
              <div>
                <p className="section-kicker">You might also wonder...</p>
                <h2 id="related-heading">Related Wonders</h2>
              </div>
              <Link className="text-link" href="/archive">
                Browse the archive <span aria-hidden="true">-&gt;</span>
              </Link>
            </div>
            <p className="related-intro">
              Keep your curiosity going with another question chosen to surprise
              you.
            </p>
            <div className="card-grid related-grid">
              {related.map((relatedWonder) => (
                <WonderCard
                  key={relatedWonder.slug}
                  variant="large"
                  wonder={relatedWonder}
                />
              ))}
            </div>
          </section>
        </RevealQuiz>
      </div>
    </main>
  );
}
