# Wonder Why Daily: Content Model

**Status:** Milestone 1.5 local MDX contract
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
and a conversational explanation body.

### Core identity and discovery

| Field | Purpose |
|---|---|
| `title` | Public question and primary headline |
| `date` | Daily edition date in `YYYY-MM-DD` format |
| `category` | One permanent curiosity category |
| `rating` | One permanent Wonder Rating |
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
| MDX body | One flowing, conversational explanation narrative |
| `takeaway` | One memorable summary suitable for recaps and scripts |
| `coolFact` | A surprising supporting fact |
| `tryIt` | **Required.** A safe, real activity that lets the reader experience the Wonder — see "Try It" below |
| `tryItYourself` | Legacy string alias for `tryIt.text`. Kept only for backward compatibility; do not author new content against this field |

### Try It: a required permanent element

Every Wonder must include a `tryIt` object. This is not optional — a Wonder is
not canonical without one, regardless of whether the legacy `tryItYourself`
string is present. Try It is what keeps Wonder Why Daily from being a site
that only explains things: whenever it is genuinely possible, the reader
should be able to observe, test, notice, compare, or safely experience the
Wonder for themselves, not just read about it.

Canonical schema:

```yaml
tryIt:
  type: home | wild | yourself
  text: >-
    Short safe observation, experiment, or action.
```

There is no custom title field. The UI derives a fixed label from `type`:

- **`home`** — a simple activity or experiment using ordinary household
  items. Label: **TRY IT AT HOME**.
- **`wild`** — noticing or testing the phenomenon somewhere in everyday life
  or the outside world (weather, nature, a pet, technology in its normal
  environment). Label: **TRY IT IN THE WILD**.
- **`yourself`** — something the reader can observe or test directly with
  their own perception, body, or device. Label: **TRY IT YOURSELF**.

Editorial rules for `tryIt.text`:

- Every Wonder gets one. Do not skip it because a natural activity is hard to
  devise — find the closest genuine way to observe, test, notice, or compare
  something related, even if it is a perceptual or reflective one rather than
  a hands-on experiment.
- It should let the reader observe, test, notice, compare, or safely
  experience something related to the Wonder — not just repeat the
  explanation in a different sentence.
- Prefer real-world interaction over simply looking something up online when
  a practical real-world alternative exists. Searching for a video or photo
  is acceptable only when the phenomenon genuinely cannot be observed
  firsthand (for example, a black hole, a snapping shrimp's flash, or a
  volcanic eruption).
- Activities must be safe and realistically doable by a curious reader of any
  age reading unsupervised.
- Do not require specialized equipment or purchases. Ordinary household
  objects, a mirror, a phone the reader already owns, or things found
  outdoors are fine.
- Include adult-supervision language where appropriate (kitchen heat,
  flames, anything a young reader should not do alone).
- Body-related activities must be gentle, reversible, and include stop
  language where appropriate ("stop if it feels uncomfortable" and similar).
- Prefer an observation over an experiment when an experiment would be
  unsafe or impractical (never invent a risky "test" for something like an
  injury, illness, or hazardous natural event).
- Never claim the activity "proves" the scientific explanation. It
  demonstrates, illustrates, or lets the reader notice — it does not prove.
- Do not unnecessarily reveal the answer or mechanism inside the
  instruction. Try It should read as an invitation to notice or do
  something, not as a second, smaller explanation. (Try It always renders
  after the reveal, so this is about tone and redundancy, not about
  spoiling the guess.)
- Keep it concise and actionable — one or two sentences, a single clear
  action plus what to notice.

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
- A publication date is earlier than May 28, 2026.
- A category is outside the permanent taxonomy.
- A rating is outside the four permanent Wonder Ratings.
- A quiz does not contain exactly three unique choices.
- The correct answer does not match a quiz choice.
- Quiz choices or related slugs are malformed.
- A Related Wonder slug does not exist.
- More than one Wonder uses the same edition date.
- The future-ready channel block is missing.
- A carousel has fewer than three ordered beats.
- An explanation falls outside 150-320 words.
- An explanation contains any heading or subsection.
- `tryIt.type` is present but is not exactly `home`, `wild`, or `yourself`.

Editorial QA (`npm run editorial:qa`) additionally requires every Wonder to
have a canonical `tryIt` object (`type` one of `home`/`wild`/`yourself`, plus
non-empty `text`). The legacy `tryItYourself` string alone does not satisfy
this — a Wonder is not considered fully canonical without `tryIt`.

Related slugs are validated as a hard build failure so intentional exploration
paths cannot quietly break.

## Permanent Wonder Ratings

Ratings describe how surprising the experience feels. They are brand language,
not difficulty levels:

- `⭐ Everyday Wonder`
- `⭐⭐ Curious Wonder`
- `⭐⭐⭐ Mind-Blowing Wonder`
- `⭐⭐⭐⭐ Reality-Bending Wonder`

## Editorial Calendar

- The public launch remains June 1, 2026.
- Three preview Wonders are published May 28 through May 30.
- Existing launch Wonders occupy June 1 through June 5.
- New Wonders continue forward one edition per day.
- Categories should be mixed across the calendar rather than published in blocks.
- Today's edition uses `WONDER_TIME_ZONE`. Configure
  `WONDER_TIME_ZONE=America/Anchorage` in local `.env.local` and in the Vercel
  Production environment before deployment. Without it, the app falls back to
  the server environment's timezone.
- Collection helpers expose only Wonders whose date is on or before today's
  editorial date, sorted newest first.
- Direct Wonder routes evaluate publication state at request time and return
  `notFound()` until their publication date.
- Date-sensitive routes render at request time so homepage, category, Wonder,
  related-Wonder, and sitemap publication state advances without a redeploy.

## Channel Readiness Review

The schema can support the requested future surfaces:

- **Daily email:** subject, preheader, teaser, title, and destination content
- **Instagram carousel:** hook, ordered beats, takeaway, cool fact, and visual accent
- **TikTok and YouTube Shorts:** short-video hook, payoff, takeaway, and explanation
- **Pinterest:** dedicated title and description plus the Wonder's visual treatment
- **AI-assisted social automation:** structured, human-approved source fields that can be transformed without scraping prose

Those systems remain deliberately unimplemented in Milestone 1.5.

## Editorial Guidance

- Write guesses that sound reasonable; avoid trick answers.
- Give every quiz exactly three plausible choices that reward careful thinking.
- Make wrong answers actually wrong. A distractor is not valid merely because it
  is not the preferred main answer; if it can genuinely contribute to the
  phenomenon, rewrite the distractor or make the correct answer reflect the
  multifactor reality.
- Feedback should reward thinking, not test performance.
- Write one flowing explanation narrative, usually 180-280 words and always
  within 150-320 words.
- Open with a hook, use a vivid mental image or analogy, answer the question,
  and end with a satisfying payoff.
- Start from the weird thing the reader can notice. Do not narrate like a
  children's educational host. Whenever possible, begin with an observation,
  situation, or question the reader recognizes, then invite them into the
  explanation.
- Personality should feel effortless. Wonder Why Daily does not need to prove it
  is funny.
- The subject is the star. If the actual fact is strange, beautiful, gross,
  enormous, ancient, counterintuitive, or unbelievable, let that create the
  entertainment.
- Question-reveal alignment matters. Before approving a Wonder, ask: if someone
  read only the question and `correctAnswer`, would they feel that the question
  had actually been answered? A "why" question should not quietly become only a
  "how," "what," or "where" reveal unless that mechanism genuinely answers the
  why.
- Premise accuracy matters too. Before writing the Wonder, ask: is the premise
  embedded in the question itself actually true? Do not put a shaky viral fact,
  oversimplified claim, exception-heavy pattern, or misconception in the
  question and then correct it only after the reader clicks. The Wonder should
  begin from a defensible premise.
- Core answer focus keeps Wonders from getting muddy. Before approving a
  Wonder, ask: what is the single most important thing the reader needs to
  understand to answer this exact question? The reveal should normally contain
  that core answer. Secondary mechanisms, caveats, adjacent concepts, and
  follow-up questions belong in the explanation or curiosity chain.
- Mechanism and purpose are different kinds of answers. Before approving a
  reveal, ask whether the question is really asking how something happens, why
  it exists or happens, what caused it historically, what origin it has, or why
  we perceive it a certain way. Do not answer a purpose question with only a
  mechanism unless that mechanism genuinely resolves the "why."
- Be witty without landing a joke every time. Fun does not always mean comedy;
  a Wonder can leave the reader amazed, amused, creeped out, surprised,
  delighted, humbled by scale, or fascinated by history.
- Watch for repeated AI/template phrases across Wonders, including "which
  sounds impossible," "basically," "here's where it gets interesting," "and
  that's not all," and generic "tiny and boring" setups. These phrases are not
  banned individually, but recurring formulaic use should be revised.
- Do not foreshadow the shape of the answer. A teaser can leak by saying the
  answer is complicated, uncertain, counterintuitive, debated, not simple, or
  multi-causal before the quiz. Ask whether the teaser tells the reader what
  kind of answer to choose, not just whether it reveals a factual mechanism.
- Include at least one sentence that remains fascinating even when the reader
  already knows the basic answer.
- Keep Cool Fact independent from the explanation.
- Try It is required for every Wonder and must follow the rules in "Try It: a
  required permanent element" above — action-focused, safe, and not a
  restatement of the explanation.
- Prefer short, lively paragraphs that are easy to read aloud.
- Use vivid comparisons and direct language without sounding childish.
- Avoid academic framing, generic editorial filler, and repeated formal prose.
- The question, explanation, and takeaway remain the canonical truth.
- Channel copy may adapt the idea but must not introduce unsupported claims.
- Human review remains required before any future automated publication.
