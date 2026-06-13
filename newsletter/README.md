# Wonder Why Daily Newsletter Drafts

The newsletter generator creates review-ready Markdown and a matching JSON
manifest. It does not contact Buttondown, schedule email, or send anything.

## Generate A Weekly Digest

Provide the Saturday that ends the completed Sunday-through-Saturday period:

```bash
npm run newsletter:weekly -- 2026-06-13
```

The command writes:

```text
newsletter/drafts/weekly/2026-06-07--2026-06-13.md
newsletter/drafts/weekly/2026-06-07--2026-06-13.json
```

The generator uses the application's `WONDER_TIME_ZONE` editorial-date logic.
It refuses to generate a future week, a non-Saturday period, a week with
missing publication dates, or a selection containing duplicate Wonders.

## Review Workflow

1. Generate the completed week's draft.
2. Review the Markdown for tone, ordering, and links.
3. Confirm the manifest contains the expected seven Wonder slugs.
4. Paste the approved Markdown into Buttondown.
5. Send a Buttondown test email before scheduling Sunday delivery.

Generated manifests begin with `status: "generated"`. No delivery state is
managed by this milestone.
