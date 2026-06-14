# Wonder Why Daily Social Image Prompts

The image prompt generator creates review-ready visual direction from one
published Wonder. It writes Markdown prompt files and matching hash manifests.
It does not generate images, call Canva, contact image or social APIs, post, or
schedule anything.

## Generate A Prompt Set

```bash
npm run social:prompts -- why-do-mirrors-reverse-left-and-right
```

The command writes:

```text
social/prompts/instagram/YYYY-MM-DD--slug.md
social/prompts/tiktok/YYYY-MM-DD--slug.md
social/prompts/pinterest/YYYY-MM-DD--slug.md
social/prompts/manifests/YYYY-MM-DD--slug.json
```

## Visual Source Of Truth

Prompts preserve the existing Wonder Why Daily visual system:

- dark forest green, cream, and the Wonder's category accent
- large editorial typography and generous negative space
- organic asymmetrical orbital lines and a restrained discovery point
- the existing representative category-symbol direction
- timeless, curious, thoughtful visuals rather than classroom or corporate art

## Quiz-First Guardrails

- Instagram Slides 1–3 and TikTok/Reel beats before 12 seconds must not reveal
  or visually hint at the correct answer.
- The first answer-supporting imagery appears at the reveal.
- The cool-fact visual adds a separate discovery.
- Pinterest remains curiosity-first and does not reveal the answer.
- Every prompt includes accessibility or alt-text guidance.

## Review Workflow

1. Generate prompts only after the Wonder publishes.
2. Review pre-reveal prompts for accidental answer clues.
3. Review every visual claim against the canonical Wonder.
4. Adapt prompts to the selected design tool only after human approval.
5. Check typography, contrast, mobile readability, and alt text.
6. Keep the matching manifest as the prompt audit record.
