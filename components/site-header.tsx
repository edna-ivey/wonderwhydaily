import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { getCategories } from "@/lib/wonders";

export function SiteHeader() {
  const categories = getCategories();

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Wonder Why Daily home">
          <BrandLogo />
        </Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <Link href="/">Today</Link>
          <Link href="/archive">Archive</Link>
          <Link className="about-nav-link" href="/about">
            About
          </Link>
          <details className="category-menu">
            <summary>Categories</summary>
            <div className="category-menu-panel">
              {categories.map((category) => (
                <Link href={`/category/${category.slug}`} key={category.slug}>
                  {category.name}
                </Link>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
