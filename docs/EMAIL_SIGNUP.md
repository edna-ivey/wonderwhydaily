# Wonder Why Daily: Email Signup

**Status:** Milestone 4.0 production integration  
**Provider:** Buttondown

## Why Buttondown

Buttondown is the simplest fit for a small daily editorial publication:

- It is focused on newsletters rather than broad marketing automation.
- The first 100 subscribers are free.
- Its standard pricing assumes at most one full-list email per day.
- The subscriber API is small and supports double opt-in by default.
- It accepts the visitor IP address for provider-side spam screening.

Other providers remain viable later:

- **Beehiiv** has a larger free tier and strong publication growth tools, but
  adds more platform surface than subscriber capture currently needs.
- **Kit** is generous for creators and supports an API, but its creator
  commerce and recommendation system are beyond this milestone.
- **Mailchimp** is a broad marketing platform with more setup and operational
  complexity.
- **Resend** is excellent email infrastructure, but using it would require
  Wonder Why Daily to assemble more newsletter management behavior itself.

## Required Environment Variable

```bash
BUTTONDOWN_API_KEY=
```

Create a Buttondown newsletter, generate an API key in Buttondown, and copy it
into `.env.local` for local development and into the Vercel project settings
for Production.

`BUTTONDOWN_API_KEY` is read only by `POST /api/subscribe`. It must never use a
`NEXT_PUBLIC_` prefix.

Optional local-test override:

```bash
BUTTONDOWN_API_URL=http://127.0.0.1:4010/v1/subscribers
```

Do not set `BUTTONDOWN_API_URL` in Vercel. Production defaults to Buttondown's
official subscriber endpoint.

## Signup Behavior

`POST /api/subscribe`:

- rejects missing, malformed, and excessively long email addresses;
- silently accepts the hidden honeypot field without contacting Buttondown;
- permits five attempts per IP during a ten-minute window per server instance;
- sends the normalized email, source metadata, and visitor IP to Buttondown;
- leaves Buttondown's default double opt-in enabled;
- reports an existing subscriber without treating it as an error;
- returns a generic error without exposing provider details or credentials.

The in-memory rate limit is intentionally lightweight and best effort. Vercel
may run multiple server instances, while Buttondown provides the authoritative
provider-side spam validation and rate limiting.

## Local Setup And Testing

1. Add `BUTTONDOWN_API_KEY` to `.env.local`.
2. Run `npm run dev`.
3. Submit an email through the homepage or footer form.
4. Confirm the UI asks the reader to check their inbox.
5. Confirm the subscriber appears as unactivated in Buttondown until they
   complete double opt-in.

Without a key, the route returns `503` and explains that the curiosity list is
still getting ready. Use a local mock endpoint with `BUTTONDOWN_API_URL` to
exercise success, duplicate, and provider-error states without adding a real
subscriber.

## Vercel Production Setup

1. Open the Wonder Why Daily project in Vercel.
2. Go to **Settings > Environment Variables**.
3. Add `BUTTONDOWN_API_KEY` for the **Production** environment.
4. Redeploy the latest `main` deployment after saving the variable.
5. Submit a controlled test address on production.

Do not add `BUTTONDOWN_API_URL` to Vercel.

## Production Verification

After deployment:

1. Submit a test address from the homepage.
2. Verify the site shows the confirmation-inbox message.
3. Open Buttondown and verify the address appears as an unactivated subscriber.
4. Complete the confirmation email and verify the subscriber becomes active.
5. Submit the same address again and verify the site reports that it is already
   on the curiosity list.

No secret keys or provider response bodies should appear in browser responses
or server logs.

## Rollback

To disable new signups without changing the UI, remove
`BUTTONDOWN_API_KEY` from Vercel and redeploy. The route will return a friendly
temporary-unavailable response and will not pretend to store submissions.

To replace Buttondown later, keep the public `/api/subscribe` response contract
and swap only the server-side provider request.
