import Link from "next/link";
import { RevealQuiz } from "@/components/reveal-quiz";
import { ShareWonder } from "@/components/share-wonder";
import { WonderArt } from "@/components/wonder-art";
import { WonderCard } from "@/components/wonder-card";
import {
  categorySlug,
  formatWonderDate,
  getCuriosityChainTarget,
  getRelatedWonders,
  getWonderTeaser,
  type Wonder,
} from "@/lib/wonders";

export function WonderDetail({ wonder }: { wonder: Wonder }) {
  const related = getRelatedWonders(wonder);
  const curiosityChainTarget = getCuriosityChainTarget(wonder);
  const curiosityChainQuestion =
    curiosityChainTarget?.question ?? wonder.curiosityChain?.question;
  const wonderUrl = `https://wonderwhydaily.com/wonders/${wonder.slug}`;

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
            <h1>{wonder.question}</h1>
            <p className="hero-excerpt">{getWonderTeaser(wonder)}</p>
          </div>
          <WonderArt accent={wonder.accent} category={wonder.category} />
        </div>
      </section>

      <div className="reading-shell wonder-main">
        <RevealQuiz choices={wonder.guessChoices} slug={wonder.slug}>
          {wonder.curiosityChain ? (
            <section
              className="curiosity-chain"
              aria-labelledby="curiosity-chain-heading"
            >
              <p className="section-kicker">Now you&apos;re probably wondering...</p>
              <h2 id="curiosity-chain-heading">{curiosityChainQuestion}</h2>
              {curiosityChainTarget ? (
                <Link
                  className="button button-dark"
                  href={`/wonders/${curiosityChainTarget.slug}`}
                >
                  Follow that question <span aria-hidden="true">-&gt;</span>
                </Link>
              ) : null}
            </section>
          ) : null}

          <ShareWonder title={wonder.title} url={wonderUrl} />

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
              Pick another question and see where it leads.
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
