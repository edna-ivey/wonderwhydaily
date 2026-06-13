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

The highest-rated Wonder is featured. If multiple Wonders share the highest
rating, the earliest one published during the week is featured.

## Copy The Draft Into Buttondown

The generated Markdown separates the content into `Subject`, `Preheader`, and
`Body` sections:

1. Open Buttondown and create a new email draft.
2. Copy the text beneath `## Subject` into Buttondown's subject field.
3. Copy the text beneath `## Preheader` into Buttondown's preheader field.
4. Copy everything beneath `## Body` into Buttondown's email body.
5. Preview the email and verify every Wonder link.

## Test And Schedule Sunday Delivery

1. Send a Buttondown test email to yourself.
2. Check the subject, preheader, spacing, ratings, and links on desktop and
   mobile.
3. Confirm the email does not reveal any answers.
4. Schedule the reviewed email for Sunday morning.
5. Keep the matching JSON manifest as the review and audit record.

Generated manifests begin with `status: "generated"`. No delivery state is
managed by this milestone. Buttondown automation is not used yet: draft
creation, test delivery, and Sunday scheduling remain manual.
