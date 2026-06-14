import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { getAllScheduledWonders, getEditorialDate, type Wonder } from "../../lib/wonders.ts";

const baseUrl = "https://wonderwhydaily.com";
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type DraftType = "instagram-carousel" | "short-video" | "pinterest";

type DraftRecord = {
  type: DraftType;
  path: string;
  contentHash: string;
};

type SocialManifest = {
  type: "social-draft-set";
  wonderSlug: string;
  publicationDate: string;
  canonicalUrl: string;
  drafts: DraftRecord[];
  status: "generated";
  generatedAt: string;
};

function fail(message: string): never {
  throw new Error(`Social draft generation failed: ${message}`);
}

function canonicalUrl(wonder: Wonder): string {
  return `${baseUrl}/wonders/${wonder.slug}`;
}

function renderChoices(choices: string[]): string {
  return choices
    .map((choice, index) => `${String.fromCharCode(65 + index)}. ${choice}`)
    .join("\n\n");
}

function renderInstagram(wonder: Wonder): string {
  const slides = [
    `1. Hook\n${wonder.title}\n\nTake a guess before you swipe.`,
    `2. Quiz\n${renderChoices(wonder.choices)}`,
    "3. Guess Moment\nWhat do you think?\n\nLock in your answer.\n\nStill no answer.",
    `4. Reveal\n${wonder.shortAnswer}`,
    `5. Cool Fact\n${wonder.coolFact}`,
    "6. CTA\nStay Curious.\n\nLink in bio.",
  ];

  return [
    "# Instagram Carousel Draft",
    "",
    "## Review Details",
    "",
    `- Wonder: ${wonder.title}`,
    `- Publication date: ${wonder.date}`,
    `- Category: ${wonder.category}`,
    `- Rating: ${wonder.rating}`,
    `- Canonical URL: ${canonicalUrl(wonder)}`,
    "",
    "## Slides",
    "",
    slides.join("\n\n---\n\n"),
    "",
    "## Caption",
    "",
    wonder.channels.social.hook,
    "",
    "Pause. Make your guess before you swipe.",
    "",
    `${wonder.category} · ${wonder.rating}`,
    "",
    "Stay Curious.",
    "",
    "## Publishing Notes",
    "",
    "- Review every slide for accuracy and readability.",
    "- Create artwork using the Wonder's existing category accent.",
    "- Add platform-native alt text before publishing.",
    "- This draft does not post or schedule anything.",
    "",
  ].join("\n");
}

function renderShortVideo(wonder: Wonder): string {
  return [
    "# TikTok / Reel Script Draft",
    "",
    "## Review Details",
    "",
    `- Wonder: ${wonder.title}`,
    `- Publication date: ${wonder.date}`,
    `- Category: ${wonder.category}`,
    `- Rating: ${wonder.rating}`,
    `- Canonical URL: ${canonicalUrl(wonder)}`,
    "",
    "## Script",
    "",
    `**0–3 seconds — Question:** ${wonder.title}`,
    "",
    `**3–8 seconds — Choices:**\n${renderChoices(wonder.choices)}`,
    "",
    "**8–12 seconds — Guess pause:** Pause. Which one would you pick? Lock in your answer.",
    "",
    `**12–20 seconds — Reveal:** ${wonder.shortAnswer}`,
    "",
    `**20–30 seconds — Cool fact:** ${wonder.coolFact}`,
    "",
    `**Close — One CTA:** Stay Curious. Read the full Wonder: ${canonicalUrl(wonder)}`,
    "",
    "## On-Screen Text",
    "",
    `- Question: ${wonder.title}`,
    `- Choices: A / B / C from the Wonder quiz`,
    "- Guess pause: Pause. Which one would you pick?",
    `- Reveal: ${wonder.correctAnswer}`,
    "- Closing: Stay Curious.",
    "",
    "## Publishing Notes",
    "",
    "- Read aloud and adjust pacing without changing factual meaning.",
    "- Add captions before publishing.",
    "- This draft does not create video, post, or schedule anything.",
    "",
  ].join("\n");
}

function renderPinterest(wonder: Wonder): string {
  return [
    "# Pinterest Draft",
    "",
    "## Review Details",
    "",
    `- Wonder: ${wonder.title}`,
    `- Publication date: ${wonder.date}`,
    `- Category: ${wonder.category}`,
    `- Rating: ${wonder.rating}`,
    "",
    "## Pin Copy",
    "",
    `**Curiosity hook:** ${wonder.channels.social.hook}`,
    "",
    `**Title:** ${wonder.channels.social.pinterestTitle}`,
    "",
    `**Description:** ${wonder.channels.social.pinterestDescription}`,
    "",
    `**Destination URL:** ${canonicalUrl(wonder)}`,
    "",
    `**Suggested image text:** ${wonder.title}`,
    "",
    `**Suggested alt text:** Wonder Why Daily illustration for "${wonder.title}" in the ${wonder.category} category.`,
    "",
    "## Publishing Notes",
    "",
    "- Review the title, description, destination, and alt text.",
    "- Create the Pin using the Wonder's existing category accent.",
    "- This draft does not create a Pin, post, or schedule anything.",
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

  const requiredValues = [
    wonder.channels.social.hook,
    wonder.channels.social.pinterestTitle,
    wonder.channels.social.pinterestDescription,
    wonder.shortAnswer,
    wonder.correctAnswer,
    wonder.coolFact,
  ];

  if (requiredValues.some((value) => value.trim().length === 0)) {
    fail(`"${wonder.slug}" contains empty social metadata.`);
  }
}

function writeDraft(
  outputRoot: string,
  directory: string,
  filename: string,
  type: DraftType,
  content: string,
): DraftRecord {
  const relativePath = path.join("social/drafts", directory, filename);
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
      "provide a valid Wonder slug, for example: npm run social:wonder -- why-do-mirrors-reverse-left-and-right",
    );
  }

  const wonder = getAllScheduledWonders().find((item) => item.slug === slug);

  if (!wonder) {
    fail(`no Wonder exists with slug "${slug}".`);
  }

  const editorialDate = getEditorialDate();
  validateWonder(wonder, editorialDate);

  const outputRoot = path.join(process.cwd(), "social/drafts");
  const filename = `${wonder.date}--${wonder.slug}.md`;
  const drafts = [
    writeDraft(outputRoot, "instagram", filename, "instagram-carousel", renderInstagram(wonder)),
    writeDraft(outputRoot, "tiktok", filename, "short-video", renderShortVideo(wonder)),
    writeDraft(outputRoot, "pinterest", filename, "pinterest", renderPinterest(wonder)),
  ];
  const manifest: SocialManifest = {
    type: "social-draft-set",
    wonderSlug: wonder.slug,
    publicationDate: wonder.date,
    canonicalUrl: canonicalUrl(wonder),
    drafts,
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

  console.log(`Generated social draft set for ${wonder.title}.`);
  for (const draft of drafts) {
    console.log(`${draft.type}: ${draft.path}`);
  }
  console.log(`Manifest: social/drafts/manifests/${manifestFilename}`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
