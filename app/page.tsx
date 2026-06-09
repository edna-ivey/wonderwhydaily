import Link from "next/link";
import { EmailSignup } from "@/components/email-signup";
import { ReadingStreak } from "@/components/reading-streak";
import { WonderArt } from "@/components/wonder-art";
import { WonderCard } from "@/components/wonder-card";
import {
  formatWonderDate,
  getAllWonders,
  getCategories,
  getEditorialDate,
  getTodaysWonder,
} from "@/lib/wonders";

export default function Home() {
  const today = getTodaysWonder();
  const recent = getAllWonders().filter((wonder) => wonder.slug !== today.slug).slice(0, 3);
  const categories = getCategories();
  const editorialDate = getEditorialDate();

  return (
    <main id="main-content">
      <section className="home-hero">
        <div className="wide-shell home-hero-grid">
          <div className="home-hero-copy">
            <div className="eyebrow-row light">
              <span className="category-pill">Today&apos;s Wonder</span>
              <time dateTime={today.date}>{formatWonderDate(today.date)}</time>
            </div>
            <h1>{today.title}</h1>
            <p className="hero-excerpt">{today.excerpt}</p>
            <Link className="button button-light" href={`/wonders/${today.slug}`}>
              Find out why <span aria-hidden="true">-&gt;</span>
            </Link>
          </div>
          <WonderArt accent={today.accent} category={today.category} />
        </div>
        <div className="hero-marquee" aria-hidden="true">
          <span>Pause. Guess. Discover.</span>
        </div>
      </section>

      <section className="wide-shell intro-strip" aria-labelledby="intro-heading">
        <p className="section-kicker">Build a daily curiosity habit</p>
        <div className="intro-message">
          <h2 id="intro-heading">
            The world gets more interesting when you stop to ask why.
          </h2>
          <p className="mission-copy">
            Wonder Why Daily helps people build a daily curiosity habit through
            one fascinating question every day.
          </p>
        </div>
        <div className="steps">
          <div>
            <strong>01</strong>
            <span>Meet today&apos;s wonder</span>
          </div>
          <div>
            <strong>02</strong>
            <span>Make your guess</span>
          </div>
          <div>
            <strong>03</strong>
            <span>Discover the why</span>
          </div>
        </div>
      </section>

      <section className="wide-shell section-block" aria-labelledby="recent-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Missed a day?</p>
            <h2 id="recent-heading">Recent wonders</h2>
          </div>
          <Link className="text-link" href="/archive">
            Browse all wonders <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>
        <div className="card-grid three-up">
          {recent.map((wonder) => (
            <WonderCard wonder={wonder} key={wonder.slug} />
          ))}
        </div>
      </section>

      <section className="wide-shell growth-foundation" aria-label="Stay curious">
        <EmailSignup />
        <ReadingStreak editorialDate={editorialDate} />
      </section>

      <section className="category-band">
        <div className="wide-shell">
          <p className="section-kicker">Follow your curiosity</p>
          <h2>What makes you wonder?</h2>
          <div className="category-links">
            {categories.map((category, index) => (
              <Link
                className={`category-link category-${category.accent}`}
                href={`/category/${category.slug}`}
                key={category.slug}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {category.name}
                <b aria-hidden="true">+</b>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
