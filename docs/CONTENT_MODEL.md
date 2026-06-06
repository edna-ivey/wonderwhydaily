# Wonder Why Daily: Content Model

**Status:** Milestone 1.1 local MDX contract  
**Purpose:** Keep each Wonder useful across the website and future distribution channels without coupling content to a delivery provider.

## Permanent Categories

Categories reflect the way curious people browse, not textbook departments:

1. Animals
2. Space
3. Human Body
4. Earth
5. Technology
6. Food
7. History
8. Weird & Wonderful

The definitions, stable slugs, descriptions, and visual accents live in
`lib/wonders.ts`. Category pages exist even when no Wonder has been assigned
yet. A Wonder must use exactly one permanent category.

## Wonder Contract

Every file in `content/wonders` is an MDX document with validated frontmatter
and a long-form explanation body.

### Core identity and discovery

| Field | Purpose |
|---|---|
| `title` | Public question and primary headline |
| `date` | Daily edition date in `YYYY-MM-DD` format |
| `category` | One permanent curiosity category |
| `excerpt` | Short curiosity-building summary for cards and SEO |
| `accent` | Visual treatment key |
| `related` | Stable slugs for intentional Related Wonders |

### Quiz and reveal

| Field | Purpose |
|---|---|
| `choices` | Plausible curiosity-first guesses |
| `correctAnswer` | Must exactly match one choice |
| `correctFeedback` | Warm feedback after a correct reveal |
| `incorrectFeedback` | Warm, non-punitive feedback after an incorrect reveal |
| `shortAnswer` | Concise answer shown immediately after reveal |

### Learning and retention

| Field | Purpose |
|---|---|
| MDX body | Structured explanation with readable sections |
| `takeaway` | One memorable summary suitable for recaps and scripts |
| `coolFact` | A surprising supporting fact |
| `tryItYourself` | Safe observation or activity that connects learning to life |

### Future channel-ready metadata

The `channels` block separates reusable editorial copy from future automation.
It does not send or publish anything.

| Field | Future use |
|---|---|
| `channels.email.subject` | Daily email subject |
| `channels.email.preheader` | Inbox preview text |
| `channels.email.teaser` | Curiosity-building email body copy |
| `channels.social.hook` | Shared opening hook for social adaptation |
| `channels.social.carouselBeats` | Ordered beats for Instagram carousel generation |
| `channels.social.shortVideoHook` | Opening line for TikTok and YouTube Shorts |
| `channels.social.shortVideoPayoff` | Concise explanation/payoff for short video |
| `channels.social.pinterestTitle` | Pinterest-specific title |
| `channels.social.pinterestDescription` | Pinterest-specific description |

Future systems can combine these fields with the question, short answer,
takeaway, cool fact, and explanation. The model intentionally stores semantic
content rather than provider IDs, posting schedules, generated assets, or
publication status.

## Validation Rules

The local content loader fails the build when:

- A required field is missing or empty.
- A category is outside the permanent taxonomy.
- The correct answer does not match a quiz choice.
- Quiz choices or related slugs are malformed.
- A Related Wonder slug does not exist.
- More than one Wonder uses the same edition date.
- The future-ready channel block is missing.
- A carousel has fewer than three ordered beats.

Related slugs are validated as a hard build failure so intentional exploration
paths cannot quietly break.

## Channel Readiness Review

The schema can support the requested future surfaces:

- **Daily email:** subject, preheader, teaser, title, and destination content
- **Instagram carousel:** hook, ordered beats, takeaway, cool fact, and visual accent
- **TikTok and YouTube Shorts:** short-video hook, payoff, takeaway, and explanation
- **Pinterest:** dedicated title and description plus the Wonder's visual treatment
- **AI-assisted social automation:** structured, human-approved source fields that can be transformed without scraping prose

Those systems remain deliberately unimplemented in Milestone 1.1.

## Editorial Guidance

- Write guesses that sound reasonable; avoid trick answers.
- Feedback should reward thinking, not test performance.
- The question, explanation, and takeaway remain the canonical truth.
- Channel copy may adapt the idea but must not introduce unsupported claims.
- Human review remains required before any future automated publication.
