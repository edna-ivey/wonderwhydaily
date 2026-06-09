import type { Metadata } from "next";
import Link from "next/link";
import { WonderCard } from "@/components/wonder-card";
import { categorySlug, getAllWonders, getCategories } from "@/lib/wonders";

export const metadata: Metadata = {
  title: "Wonder Archive",
  description: "Explore every fascinating question from Wonder Why Daily.",
};

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ArchivePage({ searchParams }: Props) {
  const { category } = await searchParams;
  const wonders = getAllWonders();
  const categories = getCategories();
  const categoryOptions = categories
    .map((item) => ({
      ...item,
      count: wonders.filter(
        (wonder) => categorySlug(wonder.category) === item.slug,
      ).length,
    }))
    .filter((item) => item.count > 0);
  const selectedCategory = categoryOptions.find((item) => item.slug === category);
  const visibleWonders = selectedCategory
    ? wonders.filter((wonder) => categorySlug(wonder.category) === selectedCategory.slug)
    : wonders;

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
      <nav className="wide-shell archive-filters" aria-label="Filter Wonder archive">
        <Link
          aria-current={!selectedCategory ? "page" : undefined}
          href="/archive"
        >
          All <span>{wonders.length}</span>
        </Link>
        {categoryOptions.map((item) => (
          <Link
            aria-current={selectedCategory?.slug === item.slug ? "page" : undefined}
            href={`/archive?category=${item.slug}`}
            key={item.slug}
          >
            {item.name} <span>{item.count}</span>
          </Link>
        ))}
      </nav>
      <section
        className="wide-shell section-block archive-grid"
        aria-label={
          selectedCategory ? `${selectedCategory.name} wonders` : "All wonders"
        }
      >
        {visibleWonders.map((wonder) => (
          <WonderCard wonder={wonder} key={wonder.slug} />
        ))}
      </section>
    </main>
  );
}
