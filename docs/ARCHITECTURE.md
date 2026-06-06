# Wonder Why Daily: Production Architecture

**Document status:** Initial architecture recommendation  
**Architecture style:** Modular monolith with managed services and asynchronous workflows  
**Primary goal:** Ship a reliable daily habit product quickly while preserving a clear path to scale

## 1. Architecture Principles

1. **Start as a modular monolith.** One web application and one primary relational database are easier to operate and change than premature microservices.
2. **Keep user state transactional.** Completions, streaks, subscriptions, and preferences belong in PostgreSQL.
3. **Keep editorial content structured.** Questions should be reusable across web, email, social, audio, and future channels.
4. **Make external effects asynchronous and idempotent.** Email, social publishing, asset generation, and webhook processing must tolerate retries.
5. **Treat dates and timezones as domain logic.** A daily habit product cannot treat streaks as a UI counter.
6. **Use managed services for undifferentiated infrastructure.** The differentiator is the daily curiosity experience and editorial system.
7. **Instrument from the first public release.** Product and operational events must be distinguishable, privacy-aware, and useful.
8. **Prefer reversible choices.** Wrap critical vendors behind small internal interfaces and keep authoritative records in owned data stores.

## 2. Recommended System Shape

```text
Browsers / Email links / Social links
                 |
                 v
      Next.js web application on Vercel
        |        |          |         |
        |        |          |         +--> PostHog analytics
        |        |          +------------> Sanity Content Lake
        |        +-----------------------> Supabase Auth
        +--------------------------------> Supabase PostgreSQL
                 |
                 +--> Trigger.dev durable background workflows
                         |       |        |         |
                         |       |        |         +--> Social APIs / Buffer
                         |       |        +------------> Cloudinary
                         |       +---------------------> Resend
                         +-----------------------------> Stripe
```

### Why a modular monolith

The initial product has several domains but modest throughput:

- Daily content delivery
- Identity and preferences
- Completion and streak tracking
- Email delivery
- Social distribution
- Billing
- Editorial operations

These domains should be separated in code and data ownership, but they do not require separate deployable services. Extract a service only when independent scaling, security isolation, ownership, or deployment cadence provides a demonstrated benefit.

## 3. Complete Recommended Tech Stack

Versions should be pinned to the current stable release at implementation time.

| Layer | Recommendation | Rationale |
|---|---|---|
| Language | TypeScript | Shared types across web, jobs, validation, and editorial tooling |
| Web framework | Next.js App Router | Strong server rendering, caching, metadata, route handlers, and Vercel integration |
| UI | React, Tailwind CSS, Radix primitives or shadcn/ui | Accessible primitives and fast product iteration |
| Validation | Zod | Runtime validation at external and domain boundaries |
| Hosting/CDN | Vercel | Low-operations deployment, previews, edge delivery, and observability |
| Primary database | Supabase managed PostgreSQL | Durable relational state, backups, extensions, and integrated auth/RLS |
| Authentication | Supabase Auth | Passwordless and OAuth support integrated with PostgreSQL authorization |
| Database access | Drizzle ORM plus SQL migrations | Type-safe application queries without hiding relational behavior |
| Connection strategy | Supabase transaction pooler for serverless; direct connection for migrations/jobs when required | Protects PostgreSQL connection limits |
| Content management | Sanity Studio and Content Lake | Structured multi-channel content, drafts, previews, validation, and editorial workflow |
| Background jobs | Trigger.dev | Durable tasks, schedules, retries, concurrency controls, and job visibility |
| Transactional/lifecycle email | Resend with React Email | Developer-friendly sending, reusable templates, webhooks, and deliverability tooling |
| Media delivery | Sanity image pipeline for editorial media; Cloudinary for generated social assets | Keeps editorial assets close to content and supports dynamic channel formats |
| Product analytics | PostHog | Events, funnels, retention, feature flags, and experiments in one tool |
| Error monitoring | Sentry | Exceptions, traces, releases, and alerting |
| Billing | Stripe Billing and Customer Portal | Subscription lifecycle, tax-ready path, hosted management, and webhooks |
| Testing | Vitest, React Testing Library, Playwright | Unit/domain, component, and end-to-end coverage |
| CI/CD | GitHub Actions plus Vercel preview deployments | Automated quality gates and reviewable releases |
| Infrastructure config | Provider dashboards initially, secrets in managed environment stores, configuration documented in-repo | Avoid infrastructure overhead before it adds value |

### Deferred alternatives

- Use a dedicated search service only when PostgreSQL full-text search no longer meets relevance or scale needs.
- Use a warehouse only when product analytics and operational reporting outgrow PostHog plus PostgreSQL views.
- Use native mobile apps only after the web habit loop has proven durable retention.
- Use dedicated queue infrastructure only if Trigger.dev cannot meet measured throughput or control requirements.

## 4. Domain Boundaries

Organize the application around domains rather than technical folders alone.

### Content

Owns daily question presentation, content retrieval, archive discovery, citations, revisions, and preview.

### Identity

Owns authentication mapping, user profile, timezone, consent, and account lifecycle.

### Habit

Owns completion events, streak calculations, streak summaries, calendars, and return behavior.

### Messaging

Owns email preferences, reminders, delivery records, templates, suppression, and webhook events.

### Distribution

Owns social assets, channel copy, approvals, publication jobs, and results.

### Billing

Owns plans, entitlements, Stripe customer mapping, subscription state, and webhook reconciliation.

### Analytics

Owns event definitions, identity policy, experiments, dashboards, and data quality.

## 5. Core Data Ownership

### Sanity is authoritative for editorial content

Sanity stores:

- Questions and explanations
- Citations and source metadata
- Topic taxonomy
- Editorial status and review fields
- Scheduled edition date
- Web, email, and social copy variants
- Editorial images and alt text
- Correction notes

The application reads published content through a cached server-side content adapter. A content publication webhook triggers cache revalidation and downstream workflows.

### PostgreSQL is authoritative for application state

PostgreSQL stores:

- User profile and timezone
- Completion event ledger
- Derived streak summary
- Email preferences and delivery records
- Saved items and collections
- Social publication records
- Billing customer, subscription, and entitlement state
- Processed webhook/idempotency records
- Operational audit records

Never store mutable user progress only in analytics or only in browser storage.

## 6. Proposed Data Model

Names are conceptual and may change during implementation.

### Identity and preferences

#### `profiles`

- `user_id` UUID, primary key, references auth user
- `display_name`
- `timezone` IANA timezone, required
- `pending_timezone`
- `pending_timezone_effective_at`
- `locale`
- `created_at`
- `updated_at`
- `deleted_at`

#### `notification_preferences`

- `user_id`
- `daily_email_enabled`
- `daily_email_local_time`
- `weekly_recap_enabled`
- `marketing_enabled`
- `consent_source`
- `consented_at`
- `updated_at`

### Content registry

Sanity remains authoritative, but PostgreSQL keeps a minimal registry for transactional joins and historical stability.

#### `editions`

- `id` UUID
- `sanity_document_id`, unique
- `edition_date` date, unique
- `slug`, unique
- `content_version`
- `published_at`
- `unpublished_at`
- `is_available`

This registry is synchronized idempotently from verified Sanity webhooks. It does not duplicate the full article body.

### Habit

#### `completion_events`

- `id` UUID
- `user_id`
- `edition_id`
- `habit_date` date
- `timezone_used`
- `completed_at` timestamptz
- `source` such as web, email, import, or admin
- `idempotency_key`
- unique `(user_id, edition_id)`
- unique `(user_id, habit_date)` while one completion per day is the rule

#### `streak_summaries`

- `user_id`, primary key
- `current_streak`
- `longest_streak`
- `last_completed_habit_date`
- `total_completions`
- `calculated_at`
- `version`

#### `streak_adjustments`

- `id`
- `user_id`
- `habit_date`
- `adjustment_type`
- `reason`
- `created_by`
- `created_at`

Adjustments are append-only and auditable. They support future streak repairs, support interventions, and corrections without mutating completion history.

### Messaging

#### `email_subscriptions`

- `id`
- `user_id`, nullable for pre-account subscribers
- `email_normalized`
- `status`
- `subscription_type`
- `verification_token_hash`
- `verified_at`
- `unsubscribed_at`
- `created_at`

#### `email_deliveries`

- `id`
- `email_subscription_id`
- `edition_id`, nullable
- `message_type`
- `provider_message_id`
- `status`
- `scheduled_for`
- `sent_at`
- `last_event_at`
- `idempotency_key`, unique

### Distribution

#### `social_publications`

- `id`
- `edition_id`
- `channel`
- `asset_variant`
- `copy_version`
- `status`
- `approval_state`
- `scheduled_for`
- `provider_post_id`
- `published_at`
- `attempt_count`
- `last_error`
- unique `(edition_id, channel, copy_version)`

### Billing

#### `billing_customers`

- `user_id`
- `stripe_customer_id`, unique
- `created_at`

#### `subscriptions`

- `id`
- `user_id`
- `stripe_subscription_id`, unique
- `plan_key`
- `status`
- `current_period_end`
- `cancel_at_period_end`
- `provider_updated_at`
- `updated_at`

#### `entitlements`

- `user_id`
- `entitlement_key`
- `source`
- `starts_at`
- `ends_at`
- unique `(user_id, entitlement_key, source)`

Entitlements, not raw Stripe states, gate product features.

### Operations

#### `processed_webhooks`

- `provider`
- `provider_event_id`
- `received_at`
- `processed_at`
- `status`
- `payload_hash`
- unique `(provider, provider_event_id)`

#### `audit_log`

- `id`
- `actor_type`
- `actor_id`
- `action`
- `resource_type`
- `resource_id`
- `metadata`
- `created_at`

## 7. Authentication and Authorization Strategy

### Recommendation

Use Supabase Auth with:

- Email magic link or email OTP as the default
- Google and Apple OAuth as optional convenience providers
- Passkeys when product demand and provider support justify rollout
- No required password for the initial release

Passwordless auth reduces password support and credential risk for a low-frequency daily product. The anonymous daily experience remains fully usable.

### Account creation flow

1. User reads and reveals today's answer anonymously.
2. After completion, the product offers progress sync and reminders.
3. User enters email or selects an OAuth provider.
4. On verified authentication, create `profiles`, preferences, and streak summary transactionally.
5. If an anonymous browser completion exists, offer to attach it to the account with explicit confirmation.

### Session handling

- Use secure, HTTP-only cookies through the supported Next.js server integration.
- Validate sessions server-side for protected operations.
- Never trust client-supplied user IDs, roles, entitlement states, dates, or timezones.
- Rotate and expire sessions according to provider best practices.

### Authorization

- Apply PostgreSQL Row Level Security to all user-owned tables exposed through Supabase APIs.
- Use explicit `authenticated` policies and indexed `user_id` columns.
- Keep service-role credentials server-only.
- Restrict editorial administration to Sanity roles.
- Restrict operational admin routes with server-side role checks and audit logging.
- Derive privileged application roles from server-controlled claims or tables, never editable user metadata.

### Account lifecycle

Support:

- Email change verification
- Sign out all sessions
- Data export request
- Account deletion with a short recovery window if legally and operationally appropriate
- Anonymization or deletion of personal data while retaining aggregate metrics

## 8. Streak Tracking Architecture

### Domain definition

A streak is the number of consecutive **habit dates** on which a user completed the corresponding daily edition.

A habit date is computed in the user's effective IANA timezone at completion time. Store both the resulting date and timezone used so calculations are reproducible.

### Source of truth

`completion_events` and `streak_adjustments` are the source of truth. `streak_summaries` is a derived cache for fast reads.

Do not make an incrementing counter the source of truth. Counters cannot reliably recover from retries, out-of-order events, timezone changes, corrections, or future streak protection.

### Completion transaction

Within one database transaction:

1. Authenticate the user.
2. Resolve the server's current time.
3. Resolve the user's effective timezone.
4. Compute the habit date.
5. Verify the edition is valid for that habit date.
6. Insert the completion event using a unique idempotency key.
7. Recalculate the streak from recent completion dates and adjustments.
8. Upsert the streak summary.
9. Commit.
10. Emit a non-authoritative analytics event after success.

Duplicate requests return the existing completion result and do not double-count.

### Timezone policy

- Ask for timezone during account setup, defaulting from the browser only with user confirmation.
- Store IANA names such as `America/Anchorage`, never a fixed UTC offset.
- A timezone change becomes effective at the next unambiguous local day boundary.
- Record changes to prevent repeated timezone switching from manufacturing streak days.
- Handle daylight-saving transitions through a timezone-aware date library and server-side tests.

### Missed days and grace

Launch with a clear, simple rule: one valid completion per local calendar day, no hidden grace period.

If user research shows strict streak loss harms healthy return behavior, add an explicit, auditable streak repair or freeze mechanic later. Never silently change historical completion dates.

### Recalculation and recovery

- Recompute from the ledger on write for the recent date window.
- Provide a full rebuild job for support, migrations, and integrity checks.
- Run a scheduled integrity job that compares summaries to ledger-derived results.
- Alert on mismatches rather than silently correcting without an audit trail.

### Anonymous behavior

Anonymous users may store a local completion indicator for same-device continuity, but it is not authoritative. On signup, the server may import recent anonymous completions only through a controlled, abuse-aware flow.

## 9. Content Architecture

### Content model: `dailyQuestion`

Recommended fields:

- Internal title
- Public question
- Slug
- Edition date
- Status and review state
- Topic and tags
- Hook/teaser
- Optional think prompt
- Short answer
- Structured explanation sections
- Memorable takeaway
- Related question references
- Citations
- Primary image, caption, credit, rights, and alt text
- Sensitivity flags
- Reading time
- SEO title and description
- Email subject, preheader, and body variant
- Shared social hook, carousel beats, short-video hook/payoff, and Pinterest copy
- Social image direction or asset
- Correction note and corrected timestamp
- Author, reviewer, and fact-checker

### Citation model

Each citation should contain:

- Source title
- Publisher or institution
- Author, when available
- Canonical URL
- Publication date, when available
- Accessed date
- Source type
- Claims supported
- Internal reviewer note

### Publication lifecycle

```text
Idea -> Researching -> Draft -> Fact check -> Editorial review
     -> Ready -> Scheduled -> Published -> Corrected/Archived
```

Transitions into `Ready`, `Scheduled`, and `Published` require validation. Publication must fail closed if required sources, rights, dates, or review fields are absent.

### Edition scheduling

Use an `edition_date` as the stable public identity. Content may be technically published ahead of time but should be served as today's edition according to the application's release policy.

Recommended release policy:

- A question becomes today's edition at midnight in the visitor's local timezone.
- Canonical archive URLs remain stable.
- The application never exposes an unpublished future answer through public APIs or page payloads.
- Social and broadcast email use a designated operating timezone configured separately from user-local reminders.

### Caching and invalidation

- Cache published content at the server/CDN layer.
- Use Sanity's CDN for public published reads.
- Verify Sanity webhook signatures.
- Use webhook idempotency keys.
- On publish/correction/unpublish, synchronize the edition registry and revalidate affected routes.
- Keep a short fallback cache for today's edition to tolerate a temporary CMS outage.

### Editorial resilience

Maintain at least 30 ready or scheduled questions before public launch and a minimum rolling buffer of 14 days after launch. Prepare a small set of evergreen emergency editions.

## 10. Social Media Automation Architecture

### Goals

- Turn each daily question into consistent, unspoiled, channel-appropriate assets.
- Preserve human approval.
- Prevent duplicate posts.
- Make failures visible and recoverable.

### Recommended flow

1. Sanity publication or schedule change emits a verified webhook.
2. A Trigger.dev workflow validates the edition and desired channels.
3. The workflow generates social assets through deterministic Cloudinary templates.
4. The workflow stores preview URLs and proposed copy in `social_publications`.
5. An editor approves or rejects each publication.
6. At the scheduled time, a durable task publishes through Buffer or official platform APIs.
7. Provider result IDs and status are persisted.
8. Failures retry with backoff, then alert an operator.

### Launch recommendation

Start with **asset and copy generation plus manual approval/publishing**, or use Buffer for the final publishing step. Direct platform integrations create policy, permission, review, and token-maintenance overhead that should be justified by volume.

### Channel rules

- Default post shows the question, not the answer.
- Every asset includes accessible alt text where the platform supports it.
- Copy is channel-specific, not blindly duplicated.
- Links use stable campaign parameters.
- No platform post is the only copy of a valuable asset or result.

### Reliability controls

- Unique key per edition/channel/copy version
- Provider token encryption and rotation
- Approval required before publish
- Dry-run mode
- Retry policy by error class
- Dead-letter state and operator alert
- Manual republish with a new copy version
- Audit log for approval and publication

## 11. Email Architecture

### Email types

**Transactional**

- Sign-in and verification
- Email change
- Account and billing events
- Data export or deletion confirmation

**Lifecycle/product**

- Daily question reminder
- Welcome sequence
- Return invitation after inactivity
- Weekly recap
- Streak milestone

**Marketing**

- Product announcements
- Offers and campaigns

Transactional, lifecycle, and marketing consent and suppression rules must be handled separately.

### Recommended flow

1. User explicitly opts into the daily email and selects a local send time.
2. Store normalized preference and consent evidence in PostgreSQL.
3. A scheduled Trigger.dev coordinator finds due recipients in bounded batches.
4. Each recipient/message pair gets a unique delivery idempotency key.
5. Render a React Email template with the correct edition and preference links.
6. Send through Resend.
7. Process delivery, bounce, complaint, and unsubscribe webhooks idempotently.
8. Update delivery status and suppress future sends when required.

### Deliverability requirements

- Use a dedicated sending subdomain.
- Configure SPF, DKIM, and DMARC.
- Use double opt-in where appropriate and at minimum for pre-account subscriptions.
- Provide one-click unsubscribe and a preference center.
- Never send to bounced, complained, or unsubscribed recipients.
- Warm volume gradually.
- Monitor complaint, bounce, delivery, open, and click rates.
- Include plain-text versions.

### Daily email content

The daily email should create curiosity, not replace the full product:

- Question
- Short thinking prompt
- Optional image
- Clear call to reveal
- Preference and unsubscribe links

Test answer-in-email variants only if they improve the mission and retention rather than just open rates.

## 12. Billing and Entitlements

### Stripe integration

- Use Stripe Checkout for initial purchase.
- Use Stripe Customer Portal for self-service billing.
- Treat Stripe as authoritative for payment lifecycle.
- Treat the local entitlement table as authoritative for product access.
- Process signed Stripe webhooks idempotently.
- Run periodic reconciliation against Stripe to detect missed or failed webhook processing.

### Feature gating

Feature code checks an entitlement such as `archive_full_access`, not a plan name or client-supplied subscription status. This supports gifts, trials, staff access, future plan changes, and manual support grants.

### Failure behavior

- Do not instantly erase user data when payment fails.
- Follow a documented grace period.
- Make downgrade behavior clear.
- Preserve user-created collections if access is temporarily reduced.

## 13. API and Rendering Strategy

### Rendering

- Server-render the daily question and public archive pages for performance and discoverability.
- Use client components only for interactive reveal, completion feedback, and preference controls.
- Never include future or preview content in public page payloads.
- Use static or cached rendering for stable archive content and targeted revalidation on corrections.

### Mutations

Use server actions or route handlers behind domain services for:

- Completion
- Preference updates
- Subscription actions
- Saved questions
- Admin operations

Every mutation must:

- Authenticate and authorize server-side
- Validate input
- Use idempotency where retries are possible
- Return typed domain errors
- Emit operational logs without sensitive payloads

### Public API

Do not launch a general public API. Add one only when a real integration use case exists, with separate rate limits, scopes, versioning, and terms.

## 14. Analytics Architecture

### Event principles

- Product analytics events are not transactional sources of truth.
- Use a versioned event dictionary.
- Keep personally identifiable information out of event properties.
- Identify users only after authentication and respect consent requirements.
- Record server-confirmed events for critical actions such as completion and purchase.

### Initial event dictionary

- `daily_question_viewed`
- `answer_reveal_started`
- `answer_revealed`
- `daily_question_completed`
- `account_signup_started`
- `account_created`
- `daily_email_opted_in`
- `share_started`
- `share_completed`
- `archive_item_viewed`
- `paywall_viewed`
- `checkout_started`
- `subscription_activated`

Common properties:

- `edition_date`
- `question_id`
- `topic`
- `authenticated`
- `referrer_category`
- `experiment_variants`

### Dashboards

Maintain:

- Daily product health
- Activation funnel
- Cohort retention
- Content performance
- Email funnel
- Share loop
- Subscription funnel
- System reliability

## 15. Security, Privacy, and Compliance

### Security baseline

- Enforce least privilege across vendors and environments.
- Use separate development, preview/staging, and production credentials.
- Keep secrets in managed environment stores.
- Verify webhook signatures before processing.
- Rate-limit authentication, completion, sharing, and subscription endpoints.
- Protect state-changing requests against CSRF as required by the chosen session pattern.
- Apply secure headers and a restrictive Content Security Policy.
- Scan dependencies and enable automated security updates.
- Back up PostgreSQL and test restoration.
- Audit privileged actions.
- Maintain a security incident runbook.

### Privacy baseline

- Maintain a data inventory and retention policy.
- Collect only necessary data.
- Make analytics and email consent behavior region-aware.
- Support export and deletion.
- Do not log email bodies, auth tokens, or full webhook payloads by default.
- Review vendors for data processing terms before launch.

### Abuse controls

- Bot protection on email signup and auth initiation when needed.
- Rate limits and idempotency on completion endpoints.
- Link-signing for sensitive email actions.
- Operational tools to revoke sessions and suppress email.

## 16. Reliability and Operations

### Service objectives for public launch

- Public daily page availability: target 99.9%
- Successful authenticated completion writes: target 99.9%
- Today's edition available by release boundary: 100%, with alerting before deadline
- Daily email send initiation within configured window: target 99%
- No duplicate daily email or social publish caused by retries

### Graceful degradation

- If auth is unavailable, public content remains readable.
- If analytics is unavailable, product use continues.
- If the CMS is temporarily unavailable, serve cached published content.
- If jobs are delayed, show content normally and alert operators.
- If social publishing fails, email and web publication continue.
- If billing is unavailable, existing entitlements remain stable until reconciliation.

### Monitoring and alerts

Alert on:

- Missing or invalid next edition
- Failed edition publication or route revalidation
- Completion error-rate spike
- Streak summary integrity mismatch
- Email bounce/complaint threshold
- Job backlog or repeated workflow failure
- Webhook verification failure spike
- Billing reconciliation mismatch
- Error-rate and latency regression

### Runbooks

Create before launch:

- Today's question is missing or wrong
- Emergency unpublish/correction
- Daily emails did not send
- Duplicate email/social publication
- Streak support correction
- Authentication outage
- Billing webhook outage
- Provider credential rotation
- Database restore

## 17. Environments and Delivery

### Environments

**Local**

- Local application
- Isolated development database/project
- Development CMS dataset
- Provider test modes

**Preview/staging**

- Created for pull requests or a persistent staging branch
- Production-like schema with synthetic data
- No production email or social publishing

**Production**

- Protected deployment branch
- Production vendors and credentials
- Restricted administrative access

Never copy production personal data into development or preview environments.

### CI quality gates

Every change should pass:

- Formatting and linting
- Type checking
- Unit tests
- Database migration checks
- Content schema validation when relevant
- Build
- Targeted end-to-end tests
- Accessibility checks for core flows

Production database migrations require review, backup awareness, and a rollback or forward-fix plan.

## 18. Testing Strategy

### Highest-risk domain tests

Streak logic requires table-driven and property-based tests covering:

- Consecutive dates
- Missed dates
- Duplicate completion
- Out-of-order completion attempts
- Daylight-saving changes
- Timezone changes
- Month/year boundaries
- Leap years
- Adjustments and rebuilds

### Other required test layers

- Content schema and publication validation
- Auth and RLS policy tests
- Email preference and suppression tests
- Webhook signature and replay tests
- Billing entitlement tests
- End-to-end daily question, signup, completion, and unsubscribe flows
- Accessibility and performance regression checks

## 19. Scaling Path

### Phase 1: Launch scale

- Next.js modular monolith
- Managed PostgreSQL
- Sanity content
- Trigger.dev workflows
- CDN caching

### Phase 2: Growing audience

- Add read replicas or stronger caching only based on measured load
- Batch and partition high-volume delivery records if needed
- Improve search with PostgreSQL full-text indexes
- Add warehouse export for cross-system reporting
- Add dedicated moderation/support tools

### Phase 3: Large-scale distribution

- Extract messaging or distribution workers only if workload isolation is needed
- Add dedicated search
- Partition completion events by time if table size and query plans require it
- Add regional strategy based on actual latency and compliance needs

The system should scale by optimizing known bottlenecks, not by predicting hypothetical ones.

## 20. Vendor Portability and Cost Controls

### Portability

- Keep domain logic in application modules, not provider-specific callbacks.
- Wrap Sanity, Resend, Trigger.dev, Stripe, Cloudinary, and analytics calls behind small adapters.
- Store provider IDs and outcomes locally where they affect operations or user access.
- Export Sanity content and PostgreSQL backups on a documented schedule.
- Keep email templates, social template definitions, and analytics event definitions in version control.
- Do not depend on analytics, email, or social providers as the only record of important business events.

### Cost controls

- Set provider budget alerts before public launch.
- Tag or separate preview/staging usage from production usage.
- Cache public content aggressively and invalidate deliberately.
- Batch reminder queries and email jobs.
- Apply retention policies to logs, webhook payloads, generated assets, and delivery records.
- Track cost per active user, per completed question, per email subscriber, and per paid subscriber.
- Review high-cardinality analytics events and properties before shipping them.

### Build-versus-buy review triggers

Re-evaluate a managed vendor when:

- Its cost materially changes unit economics.
- A required capability is blocked by platform limits.
- Reliability repeatedly misses the product's service objectives.
- Compliance or data residency requirements cannot be met.
- Provider coupling makes routine product changes unreasonably difficult.

Do not replace a vendor solely because an in-house version appears technically interesting.

## 21. Key Risks and Mitigations

| Risk | Consequence | Primary mitigation |
|---|---|---|
| Daily content quality declines under schedule pressure | Trust and retention fall | Maintain editorial buffer, quality gates, and emergency editions |
| Product feels like trivia | Users focus on correctness instead of curiosity | Think-before-reveal design, no scores, editorial question rubric |
| Streaks create anxiety or disputes | Habit mechanics harm trust | Ledger-based correctness, gentle language, auditable support adjustments |
| Timezone edge cases corrupt streaks | User-visible progress errors | IANA timezone policy, delayed changes, exhaustive domain tests |
| Automation publishes incorrect content | Public brand and trust damage | Human approval, dry runs, idempotency, emergency unpublish |
| Email harms deliverability or consent trust | Channel loss and compliance risk | Explicit consent, suppression, authentication, gradual warmup |
| Vendor outage interrupts the daily ritual | Missed publication or completion | Cached content, graceful degradation, alerts, runbooks |
| Premature feature expansion weakens the ritual | High cost and low retention | Milestone gates and product decision checklist |
| Monetization degrades free value | Growth and mission suffer | Keep essential daily answer free and monitor guardrails |
| Editorial claims are inaccurate or insensitive | Harm and loss of credibility | Source standards, fact-checking, sensitivity review, corrections |

## 22. Initial Architecture Decisions

| Decision | Choice | Reason |
|---|---|---|
| Application shape | Modular monolith | Lowest operational burden with clear domain boundaries |
| Core database | PostgreSQL | Strong fit for transactional user state and date-based queries |
| Auth | Supabase Auth | Integrated identity and RLS with low initial operations |
| Editorial source | Sanity | Structured, reusable content and strong editorial workflow |
| Streak source of truth | Append-only completion ledger | Correctness, replayability, and auditability |
| Job orchestration | Trigger.dev | Durable workflows and operational visibility |
| Current daily answer | Always free | Protects mission and growth loop |
| Social publishing | Human-approved automation | Protects editorial quality and platform safety |
| Billing access model | Local entitlements derived from Stripe | Stable and flexible feature gating |

Revisit these decisions with evidence, and record material changes as architecture decision records.
