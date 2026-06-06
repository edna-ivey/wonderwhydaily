import Link from "next/link";
import { categorySlug, formatWonderDate, type Wonder } from "@/lib/wonders";
import { WonderArt } from "@/components/wonder-art";

export function WonderCard({
  wonder,
  variant = "standard",
}: {
  wonder: Wonder;
  variant?: "standard" | "large";
}) {
  return (
    <article className={`wonder-card wonder-card-${variant}`}>
      <Link href={`/wonders/${wonder.slug}`} className="card-art-link" tabIndex={-1}>
        <WonderArt accent={wonder.accent} compact={variant === "standard"} />
      </Link>
      <div className="card-body">
        <div className="eyebrow-row">
          <Link
            className="category-pill"
            href={`/category/${categorySlug(wonder.category)}`}
          >
            {wonder.category}
          </Link>
          <time dateTime={wonder.date}>{formatWonderDate(wonder.date)}</time>
        </div>
        <h2>
          <Link href={`/wonders/${wonder.slug}`}>{wonder.title}</Link>
        </h2>
        <p>{wonder.excerpt}</p>
        <Link className="text-link" href={`/wonders/${wonder.slug}`}>
          Keep your curiosity going <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </article>
  );
}
