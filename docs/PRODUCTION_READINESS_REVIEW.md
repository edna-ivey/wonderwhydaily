# Wonder Why Daily: Production Readiness Review

**Scope:** Milestone 1.1 application  
**Result:** Ready for a controlled production deployment after the Critical fixes
listed below, with Recommended items tracked before broader public launch.

## Verification Summary

- `npm run lint`: passed
- `npm run build`: passed with no warnings
- `npm audit --audit-level=moderate`: zero vulnerabilities
- All generated internal links: returned `200`
- Sitemap: 15 unique URLs, no duplicates
- `robots.txt`: valid and references the sitemap
- Unknown root, Wonder, and category routes: return `404` and `noindex`
- Representative pages: one `<main>`, one `<h1>`, and `lang="en"`
- Production payloads sampled:
  - HTML: approximately 15-25 KB per page
  - Compiled CSS: approximately 21 KB
  - First-load JavaScript: approximately 102-107 KB

This review did not run a browser-based Lighthouse, axe, or screen-reader lab
because a headless browser is not installed in the workspace. Those checks
remain required before a broad public launch.

## Critical Findings and Fixes Applied

### Security response headers were missing

**Risk:** The application was frameable, exposed its framework signature, and
did not set baseline MIME-sniffing, referrer, or browser-feature protections.

**Fixed:**

- Disabled `X-Powered-By`
- Added `X-Content-Type-Options: nosniff`
- Added `X-Frame-Options: DENY`
- Added `Referrer-Policy: strict-origin-when-cross-origin`
- Added a restrictive `Permissions-Policy`

### Repeated navigation had no keyboard bypass

**Risk:** Keyboard and assistive-technology users had to traverse the full
header navigation on every page.

**Fixed:** Added a visible-on-focus “Skip to main content” link and one valid
`#main-content` target on every page type, including 404 and Wonder detail pages.

## Recommended Findings

### Mobile and tablet responsiveness

- Test the 700-999 px range on physical tablets. The hero changes to two columns
  at 700 px, which may feel tight in portrait orientation.
- Test the navigation at 320 px and with increased browser text size. Header
  links and the category summary should target at least a 44-by-44 px touch area.
- Replace desktop `white-space: nowrap` category/archive descriptions if copy
  becomes longer or localization is introduced; it can create overflow.
- Add automated viewport screenshots for 320, 375, 768, 1024, 1440, and 1920 px.

### Accessibility

- Run axe and manual screen-reader checks after each major UI change.
- Add a consistent `:focus-visible` treatment to all links, buttons, and the
  category summary rather than relying partly on browser defaults.
- Perform a formal color-contrast audit, especially muted text and small labels.
- Review the CSS-generated Wonder artwork semantics. It currently has an
  accessible label, but should be tested for duplicate or confusing announcements.
- The full answer requires JavaScript because post-reveal content is mounted by
  a client component. Decide whether a no-JavaScript fallback is needed.

### Lighthouse and performance

- Run Lighthouse in CI for mobile and desktop with budgets for performance,
  accessibility, SEO, and best practices.
- The current static pages, system fonts, small CSS, and lack of raster images
  create a strong baseline. No immediate payload blocker was found.
- Monitor the Wonder page client bundle as reveal interactions grow.
- Consider route-level error handling before adding networked services.

### SEO and metadata

- Add route-specific Open Graph and Twitter metadata for archive and category
  pages; they currently inherit generic homepage social titles/descriptions.
- Add Open Graph and Twitter images. Current pages have no social preview image.
- Add canonical URLs for homepage, archive, and category pages.
- Add `og:url` and consider structured data for articles or educational content.
- Empty category pages are included in the sitemap and are indexable. Consider
  excluding or marking them `noindex` until they contain Wonders.
- Post-reveal explanation content is intentionally absent from visible initial
  HTML. Search engines may not index the long explanation. Treat this as an
  explicit product/SEO tradeoff and test actual indexing behavior.

### Missing metadata and assets

- Add favicon/app icons.
- Add a web app manifest if installability is desired.
- Add `theme-color` metadata for browser chrome.
- Confirm that `https://wonderwhydaily.com` is the final canonical production
  domain before deployment.

### Loading and error states

- Current routes are statically generated and do not need meaningful loading
  states today.
- Add route-level `loading.tsx` and `error.tsx` when remote data, authentication,
  or other asynchronous services are introduced.
- Under the current Next.js version, unknown dynamic Wonder/category URLs return
  the correct `404` and `noindex`, but the custom 404 content is not present in
  initial HTML before JavaScript starts. Re-test after framework upgrades or add
  an explicit routing fallback if no-JavaScript 404 presentation becomes required.

### Security

- Add a Content Security Policy after cataloging required Next.js script/style
  behavior. Do not deploy a guessed policy that breaks hydration.
- Enable HSTS at the production hosting layer after HTTPS and domain behavior are
  confirmed.
- Keep dependency auditing and automated updates in CI.
- Local MDX is trusted executable content. Limit repository write access and
  require review for content changes.

### Deployment

- Configure a scheduled daily build/deployment. With local MDX and static
  generation, “Today’s Wonder” changes only when a new build is deployed.
- Do not merge future-dated Wonders into the production branch unless the
  deployment process is designed to prevent early exposure.
- Pin the supported Node.js runtime in deployment configuration.
- Add CI checks for lint, build, audit, internal links, and sitemap integrity.
- Add preview and production deployment smoke tests.
- Confirm production redirects for `www` versus apex domain and trailing-slash
  policy.

## Nice-to-Have Findings

- Add a dedicated 404 title and description; the current 404 correctly uses
  `noindex` but inherits the default site title.
- Add breadcrumbs to archive/category/Wonder pages if the information
  architecture becomes deeper.
- Add a generated social preview per Wonder using the existing channel-ready
  metadata.
- Add visual regression testing once the design stabilizes.
- Add a lightweight performance budget report to pull requests.
- Add a custom category-menu close behavior for escape/outside click if user
  testing shows the native `<details>` interaction is insufficient.

## Areas Verified Without Findings

- No broken internal links were found.
- No build warnings were produced.
- No dependency vulnerabilities were reported.
- Sitemap generation and `robots.txt` are functioning.
- Root custom 404 content is present in initial HTML. Dynamic-route 404s return
  the correct status and `noindex`, with the initial-HTML limitation noted above.
- SEO titles and descriptions exist for homepage, archive, categories, and Wonders.
- Wonder canonical URLs and route-specific Wonder Open Graph text are present.
- No hydration error was observed in build or server output. Browser-console
  verification should still be included in a future automated end-to-end suite.
