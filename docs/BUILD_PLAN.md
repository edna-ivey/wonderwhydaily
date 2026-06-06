# Wonder Why Daily: Milestone-Based Build Plan

**Document status:** Initial delivery roadmap  
**Planning approach:** Validate the daily habit before expanding the feature surface  
**Release philosophy:** Each milestone must produce a coherent, testable improvement with explicit exit criteria

## 1. Roadmap Principles

- Protect the core daily question experience from scope creep.
- Build editorial operations before public demand creates a daily deadline crisis.
- Prove retention before investing in complex monetization, personalization, or native apps.
- Implement streaks as a correct domain system, not a cosmetic counter.
- Automate only stable workflows; keep human approval around public editorial output.
- Instrument hypotheses before using them to make product decisions.
- Treat accessibility, security, privacy, and operations as release requirements.

## 2. Delivery Streams

Work is organized across six parallel streams:

1. **Product and design:** Daily experience, habit mechanics, onboarding, and accessibility
2. **Editorial:** Content model, voice, sourcing, review, and backlog
3. **Application engineering:** Web experience, identity, habit, archive, and billing
4. **Platform and operations:** Environments, jobs, observability, security, and runbooks
5. **Distribution:** Email, social assets, sharing, and SEO
6. **Learning:** Analytics, research, experiments, and roadmap decisions

The milestone sequence below is more important than calendar estimates. Team size, editorial capacity, and quality requirements should determine dates.

## 3. Milestone 0: Product Foundation

### Goal

Turn the mission into a validated product specification and operating model before application implementation.

### Product and design

- Validate the primary audience and jobs through interviews.
- Prototype the daily loop: question, pause, reveal, explanation, takeaway, completion.
- Test whether users perceive it as curiosity rather than trivia.
- Define tone, visual direction, and accessibility standards.
- Decide the initial archive access rule.
- Define account creation and email opt-in moments.

### Editorial

- Define question selection rubric.
- Define voice and style guide.
- Define source quality and correction policy.
- Create the structured content model.
- Draft and review at least 15 representative questions across topics.
- Measure realistic editorial throughput per question.

### Architecture and operations

- Confirm vendors and expected costs.
- Create a data inventory and threat model.
- Define analytics event dictionary and metric formulas.
- Define streak rules and timezone policy.
- Define incident severity levels and ownership.
- Record initial architecture decisions.

### Deliverables

- Approved product bible
- Approved architecture
- Clickable daily-loop prototype
- Editorial style and sourcing guide
- Initial content model
- Prioritized launch scope
- Cost model and vendor decision log

### Exit criteria

- At least five target users complete prototype sessions and understand the product without describing it primarily as trivia.
- The team can produce a question to the required quality bar using the proposed workflow.
- The team agrees on what is explicitly excluded from launch.
- Streak, timezone, privacy, and correction policies are documented.

## 4. Milestone 1: Editorial System and Read-Only Daily Experience

### Goal

Create a production-shaped, public daily question experience backed by a reliable editorial workflow, without accounts or streaks.

### Editorial

- Configure structured content schemas.
- Implement draft, review, ready, scheduled, published, and corrected states.
- Require citations, image rights, alt text, edition date, and reviewer fields.
- Create preview and validation workflow.
- Build a rolling content calendar.
- Prepare at least 30 publish-ready questions before public launch.

### Application

- Establish the web application and deployment environments.
- Build the mobile-first daily question page.
- Build think-before-reveal interaction.
- Build explanation, takeaway, sources, and correction note components.
- Build stable archive detail URLs.
- Add metadata, canonical URLs, sitemap, and social preview metadata.
- Add loading, empty, error, correction, and missing-edition states.

### Platform

- Configure CI quality gates and preview deployments.
- Configure CMS webhook verification and route revalidation.
- Add Sentry and structured logs.
- Add basic uptime and missing-next-edition alerts.
- Establish production secret handling.

### Quality

- Accessibility review of the full daily flow.
- Performance baseline on representative mobile devices.
- Content rendering tests for long questions, citations, images, and corrections.
- Verify future content cannot leak through public routes or payloads.

### Exit criteria

- Editors can create, preview, approve, schedule, publish, correct, and unpublish without engineering intervention.
- Today's question remains readable during a temporary CMS read outage through cached content.
- The page meets agreed accessibility and performance budgets.
- At least 30 days of content are ready or scheduled.
- Missing or invalid future editions trigger alerts before publication time.

## 5. Milestone 2: Accounts, Completion, and Reliable Streaks

### Goal

Enable users to carry a trustworthy curiosity habit across devices.

### Identity

- Add passwordless email authentication.
- Add selected OAuth providers only if needed.
- Add profile and confirmed IANA timezone.
- Add session management, account settings, export request, and deletion flow.
- Add RLS policies and authorization tests.

### Habit

- Implement transactional completion event ledger.
- Implement derived streak summary.
- Implement completion idempotency.
- Add current streak, longest streak, total completions, and simple calendar.
- Add timezone-change policy and effective-date handling.
- Add admin/support adjustment process with audit logging.
- Add streak rebuild and integrity-check jobs.

### Product

- Offer account creation after first value.
- Support anonymous same-device completion as a non-authoritative convenience.
- Design celebrations that remain calm and accessible.
- Design missed-day return messaging.

### Analytics

- Instrument view, reveal, completion, signup, and return events.
- Build activation and retention dashboards.
- Validate event accuracy against database totals.

### Quality

- Add exhaustive date, timezone, DST, duplicate, and retry tests.
- Test multiple devices and interrupted auth flows.
- Test account deletion and personal data handling.

### Exit criteria

- Duplicate or retried completion requests cannot inflate progress.
- Streak summaries can be rebuilt from source events with matching results.
- RLS tests prove users cannot access another user's progress or preferences.
- Core signup and completion flows pass end-to-end tests.
- Activation and retention can be measured with agreed definitions.

## 6. Milestone 3: Email Habit Loop

### Goal

Give users a reliable, consent-based daily reminder that strengthens return behavior.

### Product

- Add explicit daily email opt-in.
- Add local send-time preference.
- Add preference center and one-click unsubscribe.
- Add welcome email and daily question email.
- Decide whether weekly recap belongs in this milestone based on capacity.

### Platform

- Configure sending subdomain, SPF, DKIM, and DMARC.
- Build due-recipient coordinator and bounded batch jobs.
- Build per-recipient idempotent delivery jobs.
- Process delivery, bounce, complaint, and unsubscribe webhooks.
- Build suppression behavior.
- Add delivery dashboards and alerts.

### Editorial

- Add email subject, preheader, and body fields.
- Create email-specific quality checklist.
- Preview emails across major client categories.

### Learning

- Measure opt-in rate, delivery, open, click, site completion, unsubscribe, and complaint rates.
- Compare reminder timing and message framing carefully.

### Exit criteria

- A retry cannot send a duplicate daily email to the same subscription for the same edition.
- Unsubscribe and complaint events suppress future sends promptly.
- Email links resolve to the correct edition and preserve campaign attribution.
- Daily emails consistently initiate within the promised user-local window.
- Deliverability metrics remain within agreed thresholds during gradual volume ramp.

## 7. Milestone 4: Sharing and Social Distribution

### Goal

Create a repeatable, brand-consistent growth loop that preserves the answer reveal.

### Product

- Add copy-link and native share interactions.
- Add downloadable question and completion cards.
- Ensure share assets do not expose sensitive user data or spoil the answer.
- Add stable campaign attribution.

### Distribution

- Create deterministic social templates for priority formats.
- Generate channel-specific copy and assets from structured content.
- Build human approval state.
- Schedule through Buffer or a first official platform integration.
- Store provider post IDs and publication outcomes.
- Add retry, dead-letter, and manual republish paths.

### Editorial

- Define social voice and spoiler policy.
- Review alt text and image rights.
- Establish approval ownership and publishing calendar.

### Learning

- Measure share starts, completed shares where observable, referred visits, reveal rate, and subscriber conversion.
- Identify which question properties correlate with healthy sharing.

### Exit criteria

- No social post can publish without approval.
- Replayed jobs cannot create duplicate posts.
- Operators can see and recover failed publications.
- Social referrals are attributable through the product funnel.
- Shared content consistently preserves the curiosity-first experience.

## 8. Milestone 5: Public Beta and Retention Validation

### Goal

Operate the full daily system with a real audience and determine whether the habit loop is working.

### Beta preparation

- Recruit a representative beta cohort.
- Complete launch content buffer and emergency editions.
- Run load and failure-mode tests.
- Complete privacy policy, terms, email compliance review, and accessibility review.
- Finalize support and incident runbooks.
- Establish on-call/operational ownership for daily publication.

### Beta operation

- Observe at least four to eight weeks of behavior.
- Run regular user interviews across retained, occasional, and churned users.
- Review content performance without overfitting to clickbait.
- Review missed-day sentiment and streak behavior.
- Fix reliability and comprehension problems before adding features.

### Decision metrics

Set numeric targets before beta begins for:

- Reveal-to-completion rate
- First-week second-completion rate
- Week 1 and Week 4 retention
- Questions completed per active week
- Email-assisted completion
- Share referral conversion
- Correction and operational failure rates

Exact targets should reflect acquisition channel and cohort quality. The key requirement is to define them before seeing results.

### Exit criteria

- The product runs through multiple daily publication cycles without recurring manual emergencies.
- A meaningful cohort returns repeatedly and expresses anticipation for the next question.
- Core reliability and content quality meet launch standards.
- The team has evidence-based decisions for the next milestone.
- No unresolved high-severity privacy, accessibility, security, or deliverability issues remain.

## 9. Milestone 6: Monetization Experiment

### Goal

Test willingness to pay without weakening the free daily ritual.

### Product

- Define free and Plus entitlement boundaries.
- Build clear upgrade surfaces at appropriate value moments.
- Add Stripe Checkout and Customer Portal.
- Add entitlement-based feature gates.
- Add grace period and downgrade behavior.
- Add founding member or annual plan experiment.

### Initial paid value candidates

Choose a small coherent set:

- Full archive access
- Advanced search and filters
- Saved questions and collections
- Audio versions
- Weekly recap or curated collections

Do not build all candidates before testing demand.

### Platform

- Process signed Stripe webhooks idempotently.
- Store local subscription projection and entitlements.
- Add periodic Stripe reconciliation.
- Add billing support and refund process.
- Add revenue and churn dashboards.

### Learning

- Test value proposition and price separately where possible.
- Track paywall view, checkout start, activation, renewal, churn, and downgrade.
- Interview subscribers and non-converters.

### Exit criteria

- Product access remains correct through purchase, renewal, payment failure, cancellation, refund, and webhook replay.
- Users can manage billing without support intervention.
- Monetization does not materially reduce free-user completion or trust.
- The team has evidence to continue, change, or pause the paid offering.

## 10. Milestone 7: Deliberate Expansion

### Goal

Expand only around proven user needs and operational capacity.

Potential tracks:

- Better archive discovery and PostgreSQL full-text search
- Saved questions and personal collections
- Audio narration
- Weekly recaps
- Topic preferences
- Family, classroom, or team modes
- Gift subscriptions
- Streak repair or freeze mechanic
- Native mobile apps
- Community question suggestions

Each candidate requires:

- User problem statement
- Evidence from research or behavior
- Mission and anti-feature review
- Success and guardrail metrics
- Editorial and operational cost estimate
- Smallest testable version

## 11. Cross-Cutting Production Requirements

These are not a final hardening phase. They apply throughout the roadmap.

### Accessibility

- WCAG 2.2 AA target
- Keyboard and screen-reader coverage
- Reduced motion
- Contrast and zoom support
- Accessible emails and social alt text

### Security and privacy

- Least privilege and environment separation
- RLS and authorization tests
- Webhook signature verification
- Rate limits and abuse controls
- Data inventory, retention, export, and deletion
- Dependency scanning and secret rotation

### Reliability

- Idempotency for completion, webhooks, email, social, and billing
- Alerts for missing content and failed daily workflows
- Backups and tested restore
- Graceful degradation
- Runbooks and audit logs

### Quality

- Unit and domain tests
- Integration and RLS tests
- End-to-end core journey tests
- Content schema validation
- Performance budgets
- Analytics validation

## 12. Suggested Work Breakdown for the First Implementation Cycle

When application development is approved, the first implementation cycle should remain narrow:

1. Establish the repository conventions, CI, environments, and architecture decision log.
2. Implement the content schema and editorial preview path.
3. Implement a read-only daily question page against sample production-shaped content.
4. Add publication validation, caching, and missing-edition monitoring.
5. Test the experience with users before beginning account and streak work.

This ordering makes the editorial product and core user value real before investing in secondary systems.

## 13. Launch Readiness Checklist

### Product

- Daily question loop is understandable, calm, and compelling
- Account ask follows value
- Missed-day experience is respectful
- Empty, loading, error, and correction states are designed

### Editorial

- At least 30 days ready or scheduled
- Rolling buffer process is owned
- Sources and image rights are complete
- Emergency content and correction process are ready

### Engineering

- Core end-to-end flows pass
- Streak ledger and rebuild agree
- Future content cannot leak
- Webhooks are verified and idempotent
- Production migrations and rollback plans are reviewed

### Operations

- Alerts route to an owner
- Runbooks have been exercised
- Backups and restore have been tested
- Provider limits and costs are understood
- Support path is visible

### Compliance and trust

- Accessibility review complete
- Privacy policy and terms published
- Consent, unsubscribe, export, and deletion work
- Security review complete
- Editorial correction policy visible

### Measurement

- Event definitions are documented
- Critical events match database truth
- Launch dashboards are ready
- Beta targets and decision rules are set before launch

## 14. Roadmap Decision Rules

After each milestone:

1. Review user evidence, metrics, incidents, and operational cost.
2. Decide whether the core daily loop improved.
3. Fix reliability and trust issues before adding scope.
4. Remove features that distract from the daily habit.
5. Update the product bible, architecture decisions, and next milestone.

The roadmap is successful when it creates learning and a durable product, not when every originally imagined feature ships.
