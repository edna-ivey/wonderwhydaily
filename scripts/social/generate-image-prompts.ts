import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import {
  getAllScheduledWonders,
  getEditorialDate,
  type CategoryName,
  type Wonder,
} from "../../lib/wonders.ts";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const categoryStyles: Record<
  CategoryName,
  { accent: string; symbol: string; visualMood: string }
> = {
  Animals: {
    accent: "#FFC46B mustard",
    symbol: "a simple paw-print or animal-track mark",
    visualMood: "observant, lively, and grounded in animal behavior",
  },
  Space: {
    accent: "#C7B8FF lavender",
    symbol: "a simple planet, moon, or star mark",
    visualMood: "vast, quiet, and full of scale",
  },
  "Human Body": {
    accent: "#FFB7C5 pink",
    symbol: "a simple heartbeat, brain-curve, or nerve mark",
    visualMood: "personal, surprising, and gently anatomical",
  },
  Earth: {
    accent: "#D5F07C lime",
    symbol: "a simple mountain, wave, globe, or river-curve mark",
    visualMood: "natural, expansive, and connected to the planet",
  },
  Technology: {
    accent: "#8BD5E8 sky blue",
    symbol: "a simple circuit, cursor, pixel, or grid mark",
    visualMood: "clever, precise, and quietly modern",
  },
  Food: {
    accent: "#E58C6C terracotta",
    symbol: "a simple ingredient, plate, bread, or kernel mark",
    visualMood: "warm, appetizing, and tactile",
  },
  History: {
    accent: "#D7C6A5 parchment brown",
    symbol: "a simple column, compass, scroll, or old-key mark",
    visualMood: "timeless, archival, and quietly mysterious",
  },
  "Weird & Wonderful": {
    accent: "#AEE3D6 mint",
    symbol: "a simple eye, spiral, or abstract curiosity mark",
    visualMood: "slightly magical, unexpected, and thoughtful",
  },
};

type PromptRecord = {
  type: "instagram-image-prompts" | "short-video-visual-prompts" | "pinterest-image-prompt";
  path: string;
  contentHash: string;
};

type PromptManifest = {
  type: "social-image-prompt-set";
  wonderSlug: string;
  publicationDate: string;
  promptFiles: PromptRecord[];
  status: "generated";
  generatedAt: string;
};

function fail(message: string): never {
  throw new Error(`Social image prompt generation failed: ${message}`);
}

function sharedStyle(wonder: Wonder): string {
  const style = categoryStyles[wonder.category];

  return [
    "Wonder Why Daily editorial illustration style.",
    `Use dark forest green (#17221C), cream (#FFFAF0), and the ${wonder.category} accent: ${style.accent}.`,
    "Use large editorial typography, generous negative space, organic asymmetrical orbit lines, and one restrained orbiting dot.",
    `Use ${style.symbol} only when a category symbol helps the composition.`,
    `The mood should feel ${style.visualMood}.`,
    "Timeless and curious, not childish, corporate, classroom-like, photorealistic, or visually noisy.",
  ].join(" ");
}

function renderInstagramPrompts(wonder: Wonder): string {
  return [
    "# Instagram Carousel Image Prompts",
    "",
    "## Shared Visual Direction",
    "",
    sharedStyle(wonder),
    "",
    "Format every slide as a 4:5 portrait carousel image with strong mobile readability and consistent composition.",
    "",
    "## Slide Prompts",
    "",
    "### Slide 1 — Hook",
    "",
    `Create a curiosity-first cover for "${wonder.title}". Suggest that something is waiting to be discovered. The visual must not depict, imply, or hint at the answer mechanism. Use an unresolved orbit composition and room for the question plus "Take a guess before you swipe."`,
    "",
    `Alt text suggestion: Curiosity-first ${wonder.category} illustration introducing the question "${wonder.title}" without revealing the answer.`,
    "",
    "### Slide 2 — Quiz",
    "",
    "Create a clean quiz layout with three equally weighted answer-choice areas labeled A, B, and C. Keep all choices visually neutral: no highlighting, color clues, icons, size differences, or positioning that suggests which answer is correct.",
    "",
    `Alt text suggestion: Three visually equal answer choices for "${wonder.title}", with no indication of the correct choice.`,
    "",
    "### Slide 3 — Guess Moment",
    "",
    "Create a deliberate visual pause. Use open negative space, an incomplete organic orbit, and one subtle discovery point that has not reached its destination. Include room for: \"Pause. Which one would you pick? Lock in your answer.\" Do not reveal or hint at the answer.",
    "",
    "Alt text suggestion: An unresolved orbit invites the viewer to pause and choose an answer before the reveal.",
    "",
    "### Slide 4 — Reveal",
    "",
    `Create the first answer-supporting visual for this reveal: "${wonder.shortAnswer}" Show the core idea clearly through one focused editorial illustration. The visual may now make the answer understandable, but should remain concise rather than becoming an infographic.`,
    "",
    `Alt text suggestion: Editorial illustration supporting the reveal that ${wonder.shortAnswer}`,
    "",
    "### Slide 5 — Cool Fact",
    "",
    `Create a second-surprise visual that is clearly different from the reveal slide and supports this fact: "${wonder.coolFact}" Keep it visually self-contained and memorable.`,
    "",
    `Alt text suggestion: Editorial illustration showing the additional fact that ${wonder.coolFact}`,
    "",
    "### Slide 6 — CTA",
    "",
    "Create a quiet closing slide using the Wonder Why Daily orbital language, category accent, and generous negative space. Include only: \"Stay Curious.\" and \"Link in bio.\" Do not add a URL or another call to action.",
    "",
    "Alt text suggestion: Wonder Why Daily closing slide reading Stay Curious and Link in bio.",
    "",
    "## Reveal Safety Check",
    "",
    "- Slides 1–3 must not depict, imply, highlight, or hint at the correct answer.",
    "- The first answer-supporting imagery appears on Slide 4.",
    "- Slide 5 adds a separate discovery.",
    "- Slide 6 contains one CTA only.",
    "",
  ].join("\n");
}

function renderShortVideoPrompts(wonder: Wonder): string {
  return [
    "# TikTok / Reel Visual Direction",
    "",
    "## Shared Visual Direction",
    "",
    sharedStyle(wonder),
    "",
    "Format for 9:16 vertical video. Use restrained motion, readable captions, and visual beats that support a 20–35 second quiz-first sequence.",
    "",
    "## Timeline Prompts",
    "",
    "### 0–3 seconds — Question",
    "",
    `Open on a bold unresolved visual for "${wonder.title}". Use motion that creates curiosity without showing or hinting at the answer.`,
    "",
    "### 3–8 seconds — Choices",
    "",
    "Show A, B, and C as equally weighted choices. Use identical type treatment and neutral visual framing. Do not animate or emphasize the correct choice differently.",
    "",
    "### 8–12 seconds — Commitment Pause",
    "",
    "Slow the motion. Let an incomplete orbit pause before reaching a discovery point. Show: \"Pause. Which one would you pick? Lock in your answer.\" No answer imagery yet.",
    "",
    "### 12–20 seconds — Reveal",
    "",
    `Introduce the first answer-supporting visual and concise reveal: "${wonder.shortAnswer}" Use one satisfying motion or transformation that makes the discovery feel earned.`,
    "",
    "### 20–30 seconds — Cool Fact",
    "",
    `Shift to a distinct second visual supporting: "${wonder.coolFact}" Avoid simply repeating the reveal composition.`,
    "",
    "### Close — One CTA",
    "",
    "End on a restrained Wonder Why Daily orbital frame with: \"Stay Curious. Read the full Wonder.\" Use exactly one CTA.",
    "",
    "## Accessibility Suggestions",
    "",
    "- Keep all essential meaning in captions, not sound alone.",
    "- Maintain strong forest-green/cream contrast and large mobile-readable text.",
    "- Avoid fast flashing, rapid cuts, or motion that obscures quiz choices.",
    "- Describe the reveal and cool-fact visuals in the final caption file.",
    "",
  ].join("\n");
}

function renderPinterestPrompt(wonder: Wonder): string {
  return [
    "# Pinterest Pin Image Prompt",
    "",
    "## Visual Direction",
    "",
    sharedStyle(wonder),
    "",
    "Create a 2:3 vertical editorial Pin designed for search and discovery.",
    `Build a curiosity-first composition around "${wonder.title}" and this hook: "${wonder.channels.social.hook}"`,
    "Use an intriguing unresolved visual rather than depicting the answer. Keep the title highly readable and leave breathing room around the illustration.",
    "Do not include quiz choices, the correct answer, the short answer, or reveal imagery.",
    "",
    "## Suggested Image Text",
    "",
    wonder.title,
    "",
    "## Alt Text Suggestion",
    "",
    `Wonder Why Daily ${wonder.category} illustration inviting readers to explore "${wonder.title}" without revealing the answer.`,
    "",
    "## Safety And Review Notes",
    "",
    "- Keep imagery safe and age-appropriate.",
    "- Confirm the image creates curiosity without misleading the reader.",
    "- Do not reveal or visually imply the answer.",
    "- Review typography and contrast at mobile size.",
    "",
  ].join("\n");
}

function validateWonder(wonder: Wonder, editorialDate: string) {
  if (wonder.date > editorialDate) {
    fail(
      `"${wonder.slug}" publishes on ${wonder.date}, after the current editorial date ${editorialDate}.`,
    );
  }

  if (wonder.choices.length !== 3 || !wonder.choices.includes(wonder.correctAnswer)) {
    fail(`"${wonder.slug}" must contain exactly three choices and a matching correct answer.`);
  }
}

function writePrompt(
  outputRoot: string,
  directory: string,
  filename: string,
  type: PromptRecord["type"],
  content: string,
): PromptRecord {
  const relativePath = path.join("social/prompts", directory, filename);
  const outputPath = path.join(outputRoot, directory, filename);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);

  return {
    type,
    path: relativePath,
    contentHash: createHash("sha256").update(content).digest("hex"),
  };
}

function main() {
  const slug = process.argv[2];

  if (!slug || !slugPattern.test(slug)) {
    fail(
      "provide a valid Wonder slug, for example: npm run social:prompts -- why-do-mirrors-reverse-left-and-right",
    );
  }

  const wonder = getAllScheduledWonders().find((item) => item.slug === slug);

  if (!wonder) {
    fail(`no Wonder exists with slug "${slug}".`);
  }

  validateWonder(wonder, getEditorialDate());

  const outputRoot = path.join(process.cwd(), "social/prompts");
  const filename = `${wonder.date}--${wonder.slug}.md`;
  const promptFiles = [
    writePrompt(
      outputRoot,
      "instagram",
      filename,
      "instagram-image-prompts",
      renderInstagramPrompts(wonder),
    ),
    writePrompt(
      outputRoot,
      "tiktok",
      filename,
      "short-video-visual-prompts",
      renderShortVideoPrompts(wonder),
    ),
    writePrompt(
      outputRoot,
      "pinterest",
      filename,
      "pinterest-image-prompt",
      renderPinterestPrompt(wonder),
    ),
  ];
  const manifest: PromptManifest = {
    type: "social-image-prompt-set",
    wonderSlug: wonder.slug,
    publicationDate: wonder.date,
    promptFiles,
    status: "generated",
    generatedAt: new Date().toISOString(),
  };
  const manifestDirectory = path.join(outputRoot, "manifests");
  const manifestFilename = `${wonder.date}--${wonder.slug}.json`;

  fs.mkdirSync(manifestDirectory, { recursive: true });
  fs.writeFileSync(
    path.join(manifestDirectory, manifestFilename),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log(`Generated social image prompt set for ${wonder.title}.`);
  for (const promptFile of promptFiles) {
    console.log(`${promptFile.type}: ${promptFile.path}`);
  }
  console.log(`Manifest: social/prompts/manifests/${manifestFilename}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
