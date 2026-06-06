import Link from "next/link";
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
          <span className="brand-mark" aria-hidden="true">
            ?
          </span>
          <span>
            Wonder Why
            <small>Daily</small>
          </span>
        </Link>
        <nav className="primary-nav" aria-label="Main navigation">
          <Link href="/">Today</Link>
          <Link href="/archive">Archive</Link>
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
