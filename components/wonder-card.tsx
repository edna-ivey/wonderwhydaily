import Link from "next/link";
import {
  categorySlug,
  formatWonderDate,
  getWonderTeaser,
  type Wonder,
} from "@/lib/wonders";
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
        <WonderArt
          accent={wonder.accent}
          category={wonder.category}
          compact={variant === "standard"}
        />
      </Link>
      <div className="card-body">
        <div className="eyebrow-row">
          <span className="wonder-classification">
            <Link href={`/category/${categorySlug(wonder.category)}`}>
              {wonder.category}
            </Link>
            <span aria-hidden="true">•</span>
            <span>{wonder.rating}</span>
          </span>
          <time dateTime={wonder.date}>{formatWonderDate(wonder.date)}</time>
        </div>
        <h2>
          <Link href={`/wonders/${wonder.slug}`}>{wonder.title}</Link>
        </h2>
        <p>{getWonderTeaser(wonder)}</p>
        <Link className="text-link" href={`/wonders/${wonder.slug}`}>
          Take a guess <span aria-hidden="true">-&gt;</span>
        </Link>
      </div>
    </article>
  );
}
