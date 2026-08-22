import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
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
        <RevealQuiz
          choices={wonder.guessChoices}
          correctAnswer={wonder.correctAnswer}
          correctFeedback={wonder.correctFeedback}
          incorrectFeedback={wonder.incorrectFeedback}
          shortAnswer={wonder.correctAnswer}
        >
          <article className="explanation" id="explanation">
            <p className="section-kicker">The why</p>
            <MDXRemote source={wonder.explanation} />
          </article>

          <aside className="wow-fact-card" aria-labelledby="wow-fact-heading">
            <p className="section-kicker">WAIT... WHAT?</p>
            <h2 id="wow-fact-heading">One more weird little door</h2>
            <p>{wonder.wowFact}</p>
          </aside>

          {wonder.curiosityChain ? (
            <section
              className="curiosity-chain"
              aria-labelledby="curiosity-chain-heading"
            >
              <p className="section-kicker">Now you&apos;re probably wondering...</p>
              <h2 id="curiosity-chain-heading">{wonder.curiosityChain.question}</h2>
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
