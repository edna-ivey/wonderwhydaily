# Wonder Why Daily Social Drafts

The social generator turns one published Wonder's approved frontmatter into
review-ready drafts. It does not contact, post to, or schedule content on any
social platform.

## Existing Source Metadata

Every Wonder already provides the quiz-first source material:

- `title`, `choices`, `correctAnswer`, and `shortAnswer`: question, quiz, and reveal
- `correctFeedback` and `incorrectFeedback`: future interactive adaptation
- `coolFact` and `takeaway`: a second discovery and memorable close
- `channels.social.hook`: shared curiosity-first opening
- `channels.social.pinterestTitle`: Pinterest-specific title
- `channels.social.pinterestDescription`: Pinterest-specific description

The generator preserves the website's `Pause. Guess. Discover.` sequence on
Instagram and short video. Pinterest remains search and discovery focused.

## Generate A Draft Set

Provide the slug of a Wonder that has already published:

```bash
npm run social:wonder -- why-do-mirrors-reverse-left-and-right
```

The command writes:

```text
social/drafts/instagram/YYYY-MM-DD--slug.md
social/drafts/tiktok/YYYY-MM-DD--slug.md
social/drafts/pinterest/YYYY-MM-DD--slug.md
social/drafts/manifests/YYYY-MM-DD--slug.json
```

## Review Workflow

1. Generate the draft set after the Wonder publishes.
2. Review every claim against the canonical Wonder.
3. Edit platform pacing or length without introducing unsupported facts.
4. Create visual or video assets separately using the existing category style.
5. Add platform-native alt text and captions.
6. Publish manually only after human approval.
7. Keep the manifest as the draft audit record.

## Validation And Safety

Generation fails when:

- the slug is malformed or missing
- the Wonder does not exist
- the Wonder is unpublished or future-dated in the editorial timezone
- required social metadata is empty
- the Wonder quiz does not provide exactly three choices

Each manifest records the canonical URL and a SHA-256 content hash for every
draft. No credentials, platform APIs, posting logic, scheduling, or automation
are included.
