import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WonderCard } from "@/components/wonder-card";
import {
  getCategory,
  getWondersByCategory,
} from "@/lib/wonders";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const definition = getCategory(category);

  if (!definition) return {};

  return {
    title: `${definition.name} Wonders`,
    description: definition.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const definition = getCategory(category);
  const wonders = getWondersByCategory(category);

  if (!definition) notFound();

  return (
    <main id="main-content">
      <header
        className={`page-header category-page-header category-${definition.accent} wide-shell`}
      >
        <p className="section-kicker">Curiosity category</p>
        <h1>{definition.name}</h1>
        <p>{definition.description}</p>
      </header>
      <section
        className={`wide-shell section-block archive-grid category-results ${
          wonders.length === 0 ? "category-results-empty" : ""
        }`}
        aria-label={`${definition.name} wonders`}
      >
        {wonders.length > 0 ? (
          wonders.map((wonder) => <WonderCard wonder={wonder} key={wonder.slug} />)
        ) : (
          <div className="empty-category">
            <span className="empty-category-mark" aria-hidden="true">
              ?
            </span>
            <div>
              <p className="section-kicker">A wonder is coming</p>
              <h2>We are still following this curiosity trail.</h2>
              <p>
                This permanent category is ready for future wonders. Check back
                as the archive grows.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
