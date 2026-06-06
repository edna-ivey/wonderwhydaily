# Wonder Why Daily

One fascinating question every day.

## Milestone 1

This first build is intentionally simple:

- Next.js, TypeScript, and Tailwind
- Local Markdown/MDX content in `content/wonders`
- Today's Wonder homepage
- Wonder detail, archive, and category pages
- Interactive guess-and-reveal experience
- Static SEO metadata, sitemap, and robots rules
- Eight permanent curiosity-led categories
- Validated, future-ready editorial metadata for later channel repurposing

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Add a wonder

Create an `.mdx` file in `content/wonders` using the same frontmatter fields
as the existing samples. The build validates the content contract and permanent
category taxonomy. The newest dated wonder becomes the homepage feature unless
a wonder is dated today.

See `docs/CONTENT_MODEL.md` for the full content contract.
