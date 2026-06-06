# Wonder Why Daily: Product Bible

**Document status:** Initial product architecture  
**Audience:** Founders, product, design, editorial, engineering, growth, and operations  
**Product promise:** One fascinating question every day

## 1. Executive Summary

Wonder Why Daily is a daily learning habit product built around a single compelling question each day. It is designed to make curiosity feel approachable, rewarding, and repeatable.

The product is not a trivia game and should not optimize for knowing the answer before opening it. It is not an encyclopedia and should not optimize for exhaustive coverage. Its job is to create a satisfying daily loop:

1. Encounter a question that creates genuine curiosity.
2. Pause and form a prediction.
3. Reveal an understandable, memorable explanation.
4. Mark the day complete and feel visible progress.
5. Share the question or return tomorrow.

The closest product analogies are useful for different reasons:

- **Wordle:** one shared daily object and a natural social conversation.
- **Duolingo:** visible progress, reminders, streaks, and habit reinforcement.
- **BlackHistoryInRealTime:** editorial purpose, narrative care, and a reason to return daily.

Wonder Why Daily should combine those strengths without becoming competitive trivia, manipulative gamification, or a high-volume content feed.

## 2. Mission, Vision, and Positioning

### Mission

Help people build a daily curiosity habit through one fascinating question every day.

### Vision

Make thoughtful learning a small, joyful part of everyday life for millions of people.

### Positioning

For curious people who want to learn regularly but do not want another overwhelming feed, Wonder Why Daily offers one carefully researched question and a memorable explanation each day. Unlike trivia apps or reference sites, it rewards curiosity and consistency rather than prior knowledge or endless consumption.

### Product category

Wonder Why Daily is a **daily learning habit platform**.

It should be described externally as:

- A daily curiosity ritual
- One fascinating question every day
- A small daily habit that makes the world more interesting

It should not be described as:

- Daily trivia
- A quiz app
- A science facts site
- An encyclopedia
- An AI answer engine

## 3. Product Principles

These principles are decision filters. When tradeoffs arise, prefer the option that best protects them.

### 3.1 Curiosity before correctness

The product should make users want to know, not test whether they already know. Predictions are welcome; scores and shame are not.

### 3.2 One excellent thing

The daily experience must remain finite and intentional. Avoid infinite feeds, noisy dashboards, and excessive choices before the daily question is complete.

### 3.3 Explanation is the reward

The reveal should produce a clear "oh, that makes sense" moment. Quality of explanation matters more than novelty alone.

### 3.4 Habit support without coercion

Streaks, reminders, and celebrations should encourage return behavior without manufacturing anxiety. Missed days should invite users back rather than punish them.

### 3.5 Trust is a product feature

Every substantive claim must be fact-checked, sourced, and presented with appropriate uncertainty. Corrections must be transparent.

### 3.6 Shared question, personal journey

Everyone can encounter the same daily question, creating social conversation. Personal progress, interests, and reminders make the habit individual.

### 3.7 The core stays accessible

The current daily question and its essential explanation should remain free. Monetization should sell greater depth, convenience, personalization, and patronage, not basic understanding.

### 3.8 Editorial voice over content volume

AI can assist research, repurposing, and operations, but a human editor is accountable for every published daily question.

## 4. Target Audience

### Primary audience: The Intentional Curious

Adults and older teens who enjoy learning but struggle to make time for it. They like podcasts, documentaries, explainers, museums, and surprising conversations, but do not want to commit to a course.

**Needs**

- A small, achievable daily learning ritual
- Reliable, understandable explanations
- A sense of progress without pressure
- Interesting things to discuss and share

### Secondary audience: Parents and Educators

Adults who want a reliable daily conversation starter for families, classrooms, or teams.

**Needs**

- Age-appropriate and trustworthy content
- Easy sharing and discussion prompts
- A predictable publication cadence
- Topic variety

### Secondary audience: Knowledge Sharers

People who enjoy sending interesting ideas to friends or posting them socially.

**Needs**

- Shareable hooks that do not spoil the answer
- Attractive social cards
- Credible source links
- A feeling of discovery

### Initially out of scope

- Children under 13 as registered users
- Professional academic research
- Formal classroom management
- Competitive trivia players seeking leaderboards
- Users seeking personalized medical, legal, or financial advice

## 5. Jobs To Be Done

### Core job

When I have a few free minutes, help me learn one fascinating thing so I feel more curious and connected to the world.

### Supporting jobs

- When I want to build a learning habit, give me a small reason to return each day.
- When I encounter an intriguing question, let me think before revealing the answer.
- When I learn something surprising, help me remember and share it.
- When I miss a day, make it easy and emotionally safe to return.
- When I want more, let me explore related questions without turning the daily ritual into a feed.

## 6. Core Experience

### 6.1 The daily loop

The ideal daily session lasts two to five minutes.

1. **Hook:** The user sees today's question immediately.
2. **Think:** The interface offers a brief pause and optional prediction.
3. **Reveal:** The user chooses to reveal the answer.
4. **Understand:** The explanation unfolds in a short, layered format.
5. **Remember:** The experience ends with one memorable takeaway.
6. **Complete:** The user records completion and sees streak/progress feedback.
7. **Continue:** The user can share, subscribe, or explore one related item.

### 6.2 Daily question page

The daily page is the product's center of gravity and must work without an account.

Required content hierarchy:

- Date and topic label
- Question
- Optional illustration or image
- "What do you think?" pause
- Reveal control
- Short answer
- Clear explanation in two to four sections
- One memorable takeaway
- Sources and editorial notes
- Completion action
- Share action
- One related question, only after completion

### 6.3 Account value

Users should understand the product before being asked to register. Account creation is offered after the first meaningful payoff, ideally after reveal or completion.

An account unlocks:

- Cross-device completion history
- Streak tracking
- Email reminders
- Saved questions
- Topic preferences
- Subscription management

### 6.4 Habit mechanics

Use:

- Current streak
- Longest streak
- A simple calendar/history view
- Gentle completion celebration
- Reminder preferences
- Return messaging after a missed day
- Optional streak repair or freeze only after evidence supports it

Avoid:

- Public leaderboards
- Punitive loss language
- Excessive badges
- Artificial time pressure
- Notifications framed around guilt

## 7. Scope and Feature Strategy

### Launch product

The launch product must prove that people value the daily question and return for another one.

Required:

- Public daily question and answer experience
- Mobile-first responsive web experience
- Public archive with limited browsing
- Account creation and sign-in
- Completion and reliable streak tracking
- Daily email opt-in and unsubscribe
- Share cards and copy-link sharing
- Structured editorial workflow
- Scheduled publication
- Basic analytics and operational monitoring
- Admin correction process

### Post-launch candidates

Build only after core retention signals justify them:

- Saved questions
- Topic follows and preference tuning
- Audio narration
- Weekly curiosity recap
- Streak freezes or repairs
- Premium archive and advanced search
- Collections and learning paths
- Classroom/family discussion mode
- Mobile apps
- Community submissions

### Explicit anti-features

Do not build in the first product:

- Infinite scroll
- Open comments
- User-generated answers
- Global leaderboards
- Complex points economy
- AI-generated questions published without editorial review
- Personalized daily questions that eliminate the shared daily experience
- Native mobile applications before web retention is proven

## 8. Editorial Product

### 8.1 What makes a strong question

A Wonder Why Daily question should:

- Be understandable without specialist knowledge
- Create a gap between what seems obvious and what is true
- Have an answer that can be explained accurately in a few minutes
- Reveal a useful mechanism, story, or way of seeing
- Avoid relying on a trick, technicality, or obscure fact
- Be appropriate for a broad audience
- Have credible and accessible sources

Examples of promising forms:

- Why does a familiar thing behave in an unexpected way?
- How did an everyday convention come to exist?
- What hidden system makes an ordinary experience possible?
- Why do people, animals, languages, cities, or technologies develop a certain pattern?

### 8.2 Permanent curiosity categories

Maintain deliberate variety across the permanent categories:

- Animals
- Space
- Human Body
- Earth
- Technology
- Food
- History
- Weird & Wonderful

These categories reflect how curious people browse rather than how textbooks
organize knowledge. No category should dominate the calendar. Sensitive topics
require additional review.

### 8.3 Editorial voice

The voice is:

- Curious, warm, and intelligent
- Clear without being simplistic
- Surprising without clickbait
- Confident when evidence is strong
- Explicit about ambiguity and uncertainty
- Respectful across cultures and lived experiences

The voice is not:

- Lecture-like
- Snarky
- Breathlessly sensational
- Overloaded with jargon
- Written as if the reader should already know

### 8.4 Editorial quality gate

Every question must pass:

1. Question quality review
2. Source quality review
3. Factual review
4. Clarity and accessibility edit
5. Sensitivity and harm review where relevant
6. Metadata and social/email review
7. Preview in the actual product
8. Final publish approval

### 8.5 Sources and corrections

- Every daily question includes at least two credible sources when possible.
- Primary sources and authoritative institutions are preferred.
- Sources must support the exact claims made.
- AI-generated summaries are never treated as sources.
- Material corrections show a visible correction note and timestamp.
- Editorial staff can immediately unpublish or replace unsafe content.

## 9. Growth and Distribution

### 9.1 Growth loop

The primary growth loop is:

1. User discovers a compelling question.
2. User visits and reveals the answer.
3. User shares the unspoiled question or result card.
4. A friend visits to satisfy curiosity.
5. The friend opts into tomorrow's question.

### 9.2 Sharing philosophy

Sharing should preserve curiosity. Default social assets should feature the question, date, visual identity, and URL without revealing the answer.

Provide:

- Copy link
- Native share sheet on supported devices
- Downloadable story card
- Platform-specific share intents where reliable
- A completion card that indicates participation without exposing personal data

### 9.3 Search and evergreen discovery

Past question pages can attract search traffic, but SEO must not compromise the daily ritual.

- Publish stable, canonical archive URLs.
- Use descriptive titles and structured metadata.
- Allow search visitors to read the answer.
- Present today's question as the primary next action.
- Avoid producing thin derivative pages solely for search.

### 9.4 Email as a habit channel

Email is a first-class product surface, not a marketing afterthought. The daily email should contain the question and an invitation to think, but usually withhold the full explanation to preserve the site experience.

## 10. Monetization Strategy

### 10.1 Monetization principles

- Never paywall today's essential answer.
- Do not use invasive advertising or sell user data.
- Make paid value understandable without degrading free value.
- Introduce payment after habit value is proven.
- Prefer recurring membership over one-off content purchases.

### 10.2 Recommended model: Freemium membership

**Free**

- Today's complete question and explanation
- Basic account and streak
- Daily email
- Limited recent archive
- Sharing

**Wonder Why Plus**

- Full archive access
- Advanced search and topic filters
- Saved questions and personal collections
- Audio versions
- Weekly recap and personalized recommendations
- Streak protection features, if introduced responsibly
- Member-only deeper dives or themed collections
- Supporter recognition options

Recommended initial pricing hypothesis:

- Monthly: test approximately $5-$8 USD
- Annual: test approximately $40-$60 USD
- Founding member annual plan: limited early offer with price lock

Exact pricing is an experiment, not an architecture decision.

### 10.3 Additional revenue paths

Evaluate later:

- Gift memberships
- Family plans
- Classroom or team plans
- Curated print products or annual question books
- Values-aligned sponsorships clearly separated from editorial decisions
- Licensing curated collections

Avoid early reliance on display ads. Ads undermine focus, trust, and perceived quality unless implemented with exceptional restraint.

### 10.4 Paid conversion moments

Good moments:

- After a user develops a meaningful streak
- When opening an older archive item beyond the free window
- When trying to save or organize content
- At the end of a high-value weekly recap

Bad moments:

- Before the first answer reveal
- During the core explanation
- Immediately after a missed day

## 11. Metrics Framework

### North-star metric

**Weekly Meaningful Curiosity Completions (WMCC):** the number of daily question sessions completed by users who complete at least two questions in a rolling seven-day period.

This measures both meaningful use and emerging habit, while avoiding vanity traffic.

### Activation

Primary activation definition:

- A new visitor reveals one question and returns to complete another question within seven days.

Supporting metrics:

- Landing-to-reveal rate
- Reveal-to-completion rate
- Completion-to-account rate
- Completion-to-email-opt-in rate
- Time to first meaningful takeaway

### Retention

- Day 1, Day 7, Day 30 return rates
- Questions completed per active week
- Percentage of active users with a 3-day, 7-day, and 30-day streak
- Return rate after streak loss
- Email-assisted completion rate

### Content health

- Reveal and completion rate by question
- Share rate by question
- Source click-through rate
- Correction rate
- Topic balance
- Editorial lead time and backlog coverage

### Growth and revenue

- Share-to-visit conversion
- Visitor-to-subscriber conversion
- Email open and click rates
- Free-to-paid conversion
- Paid retention and churn
- Revenue per active user

### Guardrail metrics

- Unsubscribe and spam complaint rates
- Notification opt-out rate
- Account deletion completion time
- Page performance and error rate
- Negative feedback after missed streaks
- Correction severity and response time

## 12. Product Policies

### Accessibility

Target WCAG 2.2 AA. The daily experience must support keyboard navigation, screen readers, zoom, reduced motion, sufficient contrast, and meaningful alternative text.

### Privacy

Collect only what is needed to operate and improve the product. Do not sell personal data. Avoid collecting exact location; a user-selected IANA timezone is sufficient for streaks and reminders.

### Age

The initial registered product is intended for users 13 and older. Avoid knowingly collecting data from children under 13 without a dedicated compliance strategy.

### Sensitive content

Questions involving health, trauma, violence, identity, politics, religion, or contested history require stronger sourcing, respectful framing, and editorial review. Educational content must not be presented as personalized professional advice.

### AI use

AI may assist with brainstorming, source discovery, first-pass summaries, accessibility checks, and channel adaptation. A human editor remains accountable for claims, citations, voice, and publication. AI-generated images must be labeled internally and used only when rights and representation risks are addressed.

## 13. Launch Hypotheses

The first release should test these assumptions:

1. A single excellent daily question is enough to create repeat visits.
2. The think-before-reveal interaction increases satisfaction and memory.
3. Visible streaks increase return behavior without increasing regret or anxiety.
4. Email reminders create meaningful return visits.
5. Unspoiled question cards create organic sharing.
6. A reliable editorial process can maintain at least 30 days of scheduled content.

Do not treat these as facts. Instrument them and revise the product based on evidence.

## 14. Product Decision Checklist

Before approving a feature, ask:

- Does it make the daily curiosity loop better?
- Does it preserve the finite, calm experience?
- Does it reward curiosity rather than prior knowledge?
- Does it increase trust or put trust at risk?
- Is it useful before we have proven retention?
- Can it be measured?
- Can the editorial and operations team sustain it?
- Does it create pressure, shame, or distraction?
- Is there a simpler way to achieve the same user outcome?

## 15. Definition of Product Success

Wonder Why Daily succeeds when users say some version of:

> "I look forward to seeing what the question is each day."

The product has reached meaningful product-market fit when a durable cohort repeatedly completes questions, returns after missed days, recommends the experience organically, and is willing to support it financially without the core daily answer becoming less accessible.
