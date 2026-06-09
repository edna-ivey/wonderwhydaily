# Wonder Why Daily: Growth Foundation

**Status:** Milestone 3.0 provider-neutral foundation

## Email Signup

The homepage and footer use the same accessible signup component. Submissions
are validated by `POST /api/subscribe`, protected by a simple honeypot, and
forwarded to the server-only `EMAIL_SIGNUP_WEBHOOK_URL`.

The webhook keeps the site independent from a specific email provider. Until
that environment variable is configured, the form clearly reports that the
curiosity list is getting ready rather than pretending a subscription was
stored.

Expected webhook request:

```json
{
  "email": "reader@example.com",
  "source": "wonderwhydaily.com"
}
```

## Reading Streaks

Reading streaks are anonymous and stored in local storage under
`wonder-why-daily-reading-streak`. The root layout records one visit per
editorial date, while the homepage displays current and longest streaks.

The streak uses the same configured editorial date as Wonder publishing. A
future authenticated version can migrate this small record to a user profile.

## Discoverability

- Related Wonders prefer published questions from the same category and show
  up to four options.
- Wonder pages include compact sharing links.
- Wonder metadata includes canonical URLs, Open Graph, Twitter cards, and
  Article structured data.
- Every Wonder has a generated 1200x630 Open Graph image.
- The archive includes server-rendered category filters and published counts.
