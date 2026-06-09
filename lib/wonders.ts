import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const wondersDirectory = path.join(process.cwd(), "content/wonders");
const earliestPublicationDate = "2026-05-28";
const minimumExplanationWords = 150;
const maximumExplanationWords = 320;
const rejectedEditorialPhrases = [
  "Researchers compare",
  "A careful observer would",
  "Scientists strengthen the model",
  "Studies become more convincing",
  "A useful explanation follows the information",
  "Historians weigh",
  "A strong explanation predicts",
  "The concise answer is this",
  "That extra detail is not merely",
];

export const categoryDefinitions = [
  {
    name: "Animals",
    slug: "animals",
    accent: "animals",
    description: "Wild abilities, strange behaviors, and the lives all around us.",
  },
  {
    name: "Space",
    slug: "space",
    accent: "space",
    description: "Big questions from our sky, solar system, and the universe beyond.",
  },
  {
    name: "Human Body",
    slug: "human-body",
    accent: "human-body",
    description: "The surprising systems working inside every one of us.",
  },
  {
    name: "Earth",
    slug: "earth",
    accent: "earth",
    description: "Weather, landscapes, oceans, and the planet beneath our feet.",
  },
  {
    name: "Technology",
    slug: "technology",
    accent: "technology",
    description: "The hidden ideas inside the tools and systems we rely on.",
  },
  {
    name: "Food",
    slug: "food",
    accent: "food",
    description: "The chemistry, history, and delightful oddities on our plates.",
  },
  {
    name: "History",
    slug: "history",
    accent: "history",
    description: "How people, choices, and accidents shaped the world we know.",
  },
  {
    name: "Weird & Wonderful",
    slug: "weird-wonderful",
    accent: "weird",
    description: "Questions too surprising, delightful, or peculiar for any other shelf.",
  },
] as const;

export type CategoryName = (typeof categoryDefinitions)[number]["name"];

export const wonderRatings = [
  "⭐ Everyday Wonder",
  "⭐⭐ Curious Wonder",
  "⭐⭐⭐ Mind-Blowing Wonder",
  "⭐⭐⭐⭐ Reality-Bending Wonder",
] as const;

export type WonderRating = (typeof wonderRatings)[number];

export type WonderChannels = {
  email: {
    subject: string;
    preheader: string;
    teaser: string;
  };
  social: {
    hook: string;
    carouselBeats: string[];
    shortVideoHook: string;
    shortVideoPayoff: string;
    pinterestTitle: string;
    pinterestDescription: string;
  };
};

export type Wonder = {
  slug: string;
  title: string;
  date: string;
  category: CategoryName;
  rating: WonderRating;
  excerpt: string;
  shortAnswer: string;
  choices: string[];
  correctAnswer: string;
  correctFeedback: string;
  incorrectFeedback: string;
  coolFact: string;
  tryItYourself: string;
  related: string[];
  accent: string;
  takeaway: string;
  channels: WonderChannels;
  content: string;
};

type Frontmatter = Omit<Wonder, "slug" | "content">;

function assertString(value: unknown, field: string, filename: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`${filename}: "${field}" must be a non-empty string.`);
  }
  return value;
}

function assertStringArray(
  value: unknown,
  field: string,
  filename: string,
  minimum = 0,
): string[] {
  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== "string") ||
    value.length < minimum
  ) {
    throw new Error(
      `${filename}: "${field}" must contain at least ${minimum} strings.`,
    );
  }
  return value;
}

function parseFrontmatter(data: Record<string, unknown>, filename: string): Frontmatter {
  const category = assertString(data.category, "category", filename);
  const categoryDefinition = categoryDefinitions.find((item) => item.name === category);
  const date = assertString(data.date, "date", filename);
  const rating = assertString(data.rating, "rating", filename);

  if (!categoryDefinition) {
    throw new Error(
      `${filename}: "${category}" is not a permanent Wonder Why Daily category.`,
    );
  }

  if (!wonderRatings.includes(rating as WonderRating)) {
    throw new Error(
      `${filename}: "${rating}" is not an approved Wonder rating.`,
    );
  }

  const choices = assertStringArray(data.choices, "choices", filename, 2);
  const correctAnswer = assertString(data.correctAnswer, "correctAnswer", filename);

  if (!choices.includes(correctAnswer)) {
    throw new Error(`${filename}: "correctAnswer" must match one of the choices.`);
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error(`${filename}: "date" must use YYYY-MM-DD format.`);
  }

  if (date < earliestPublicationDate) {
    throw new Error(
      `${filename}: "date" cannot be earlier than ${earliestPublicationDate}.`,
    );
  }

  if (choices.length !== 3 || new Set(choices).size !== 3) {
    throw new Error(`${filename}: "choices" must contain exactly three unique answers.`);
  }

  const channels = data.channels as Record<string, unknown> | undefined;
  const email = channels?.email as Record<string, unknown> | undefined;
  const social = channels?.social as Record<string, unknown> | undefined;

  if (!email || !social) {
    throw new Error(`${filename}: a future-ready "channels" block is required.`);
  }

  return {
    title: assertString(data.title, "title", filename),
    date,
    category: categoryDefinition.name,
    rating: rating as WonderRating,
    excerpt: assertString(data.excerpt, "excerpt", filename),
    shortAnswer: assertString(data.shortAnswer, "shortAnswer", filename),
    choices,
    correctAnswer,
    correctFeedback: assertString(data.correctFeedback, "correctFeedback", filename),
    incorrectFeedback: assertString(
      data.incorrectFeedback,
      "incorrectFeedback",
      filename,
    ),
    coolFact: assertString(data.coolFact, "coolFact", filename),
    tryItYourself: assertString(data.tryItYourself, "tryItYourself", filename),
    related: assertStringArray(data.related ?? [], "related", filename),
    accent: assertString(data.accent ?? categoryDefinition.accent, "accent", filename),
    takeaway: assertString(data.takeaway, "takeaway", filename),
    channels: {
      email: {
        subject: assertString(email.subject, "channels.email.subject", filename),
        preheader: assertString(
          email.preheader,
          "channels.email.preheader",
          filename,
        ),
        teaser: assertString(email.teaser, "channels.email.teaser", filename),
      },
      social: {
        hook: assertString(social.hook, "channels.social.hook", filename),
        carouselBeats: assertStringArray(
          social.carouselBeats,
          "channels.social.carouselBeats",
          filename,
          3,
        ),
        shortVideoHook: assertString(
          social.shortVideoHook,
          "channels.social.shortVideoHook",
          filename,
        ),
        shortVideoPayoff: assertString(
          social.shortVideoPayoff,
          "channels.social.shortVideoPayoff",
          filename,
        ),
        pinterestTitle: assertString(
          social.pinterestTitle,
          "channels.social.pinterestTitle",
          filename,
        ),
        pinterestDescription: assertString(
          social.pinterestDescription,
          "channels.social.pinterestDescription",
          filename,
        ),
      },
    },
  };
}

function readWonder(filename: string): Wonder {
  const slug = filename.replace(/\.mdx$/, "");
  const source = fs.readFileSync(path.join(wondersDirectory, filename), "utf8");
  const { data, content } = matter(source);
  const explanationWords = content
    .replace(/^#{1,6}\s+/gm, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const explanationHeadings = [...content.matchAll(/^#{1,6}\s+(.+)$/gm)].map(
    ([, heading]) => heading.trim(),
  );

  if (explanationWords < minimumExplanationWords) {
    throw new Error(
      `${filename}: explanation must contain at least ${minimumExplanationWords} words; found ${explanationWords}.`,
    );
  }

  if (explanationWords > maximumExplanationWords) {
    throw new Error(
      `${filename}: explanation must contain no more than ${maximumExplanationWords} words; found ${explanationWords}.`,
    );
  }

  if (explanationHeadings.length > 0) {
    throw new Error(
      `${filename}: explanation must be one conversational narrative without headings.`,
    );
  }

  for (const phrase of rejectedEditorialPhrases) {
    if (content.includes(phrase)) {
      throw new Error(`${filename}: replace formal or generic phrase "${phrase}".`);
    }
  }

  return {
    slug,
    ...parseFrontmatter(data, filename),
    content,
  };
}

function getEditorialTimeZone(): string {
  return (
    process.env.WONDER_TIME_ZONE ??
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
}

export function getEditorialDate(now = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: getEditorialTimeZone(),
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;

  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function isWonderPublished(wonder: Wonder, today = getEditorialDate()): boolean {
  return wonder.date <= today;
}

export function getAllScheduledWonders(): Wonder[] {
  const wonders = fs
    .readdirSync(wondersDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map(readWonder)
    .sort((a, b) => b.date.localeCompare(a.date));

  const slugs = new Set(wonders.map((wonder) => wonder.slug));
  const dates = new Set<string>();

  for (const wonder of wonders) {
    if (dates.has(wonder.date)) {
      throw new Error(`More than one Wonder is assigned to ${wonder.date}.`);
    }
    dates.add(wonder.date);

    for (const relatedSlug of wonder.related) {
      if (!slugs.has(relatedSlug)) {
        throw new Error(
          `${wonder.slug}: related Wonder "${relatedSlug}" does not exist.`,
        );
      }
    }
  }

  return wonders;
}

export function getAllWonders(): Wonder[] {
  return getAllScheduledWonders().filter((wonder) => isWonderPublished(wonder));
}

export function getWonder(slug: string): Wonder | undefined {
  return getAllWonders().find((wonder) => wonder.slug === slug);
}

export function getTodaysWonder(): Wonder {
  const today = getEditorialDate();
  const wonders = getAllWonders();

  const wonder = wonders.find((item) => item.date === today) ?? wonders[0];

  if (!wonder) {
    throw new Error(`No Wonder is published on or before ${today}.`);
  }

  return wonder;
}

export function getCategories() {
  return categoryDefinitions;
}

export function getCategory(slug: string) {
  return categoryDefinitions.find((category) => category.slug === slug);
}

export function getWondersByCategory(category: string): Wonder[] {
  const categoryDefinition = getCategory(category);

  return categoryDefinition
    ? getAllWonders().filter((wonder) => wonder.category === categoryDefinition.name)
    : [];
}

export function getRelatedWonders(wonder: Wonder): Wonder[] {
  const allWonders = getAllWonders();
  const explicitlyRelated = wonder.related
    .map((slug) => allWonders.find((item) => item.slug === slug))
    .filter((item): item is Wonder => Boolean(item));
  const sameCategory = allWonders.filter(
    (item) =>
      item.slug !== wonder.slug &&
      item.category === wonder.category &&
      !explicitlyRelated.some((related) => related.slug === item.slug),
  );
  const otherCategories = allWonders.filter(
    (item) =>
      item.slug !== wonder.slug &&
      item.category !== wonder.category &&
      !explicitlyRelated.some((related) => related.slug === item.slug),
  );
  const related = [
    ...explicitlyRelated.filter((item) => item.category === wonder.category),
    ...sameCategory,
    ...explicitlyRelated.filter((item) => item.category !== wonder.category),
    ...otherCategories,
  ];

  return related.slice(0, 4);
}

export function categorySlug(category: CategoryName): string {
  const definition = categoryDefinitions.find((item) => item.name === category);

  if (!definition) {
    throw new Error(`Unknown Wonder Why Daily category: ${category}`);
  }

  return definition.slug;
}

export function formatWonderDate(date: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
