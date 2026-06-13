import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { getAllScheduledWonders, getEditorialDate, type Wonder } from "../../lib/wonders.ts";

const baseUrl = "https://wonderwhydaily.com";
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const dayMilliseconds = 24 * 60 * 60 * 1_000;

type DigestManifest = {
  type: "weekly-digest";
  periodStart: string;
  periodEnd: string;
  wonderSlugs: string[];
  contentHash: string;
  status: "generated";
  generatedAt: string;
};

function fail(message: string): never {
  throw new Error(`Weekly digest generation failed: ${message}`);
}

function parseDate(value: string): Date {
  if (!datePattern.test(value)) {
    fail(`"${value}" must use YYYY-MM-DD format.`);
  }

  const date = new Date(`${value}T12:00:00Z`);

  if (Number.isNaN(date.valueOf())) {
    fail(`"${value}" is not a valid calendar date.`);
  }

  return date;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  return new Date(date.valueOf() + days * dayMilliseconds);
}

function formatDisplayDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(parseDate(value));
}

function renderWonderBlock(wonder: Wonder, featured: boolean): string {
  const callToAction = featured ? "Make Your Guess" : "Discover This Wonder";
  const copy = featured ? wonder.channels.email.teaser : wonder.excerpt;

  return [
    `${wonder.category} · ${wonder.rating}`,
    "",
    `### ${wonder.title}`,
    "",
    copy,
    "",
    `[${callToAction} →](${baseUrl}/wonders/${wonder.slug})`,
  ].join("\n");
}

function renderDigest(wonders: Wonder[], start: string, end: string): string {
  const [featured, ...remaining] = wonders;

  if (!featured) {
    fail("no Wonders were selected.");
  }

  return [
    `Subject: This week's Wonders: ${featured.title}`,
    "Preheader: Seven fascinating questions. How many answers can you guess?",
    "",
    "# What made you wonder this week?",
    "",
    `Here are the Wonders published from ${formatDisplayDate(start)} through ${formatDisplayDate(end)}.`,
    "",
    "How many answers can you guess before revealing them?",
    "",
    "## Featured Wonder",
    "",
    renderWonderBlock(featured, true),
    "",
    "## More Wonders From This Week",
    "",
    remaining.map((wonder) => renderWonderBlock(wonder, false)).join("\n\n---\n\n"),
    "",
    "Which question surprised you most?",
    "",
    "Share this roundup with someone curious and compare guesses before either of you reveals the answers.",
    "",
    `[Explore All Wonders →](${baseUrl}/archive)`,
    "",
    "Until next Sunday,",
    "",
    "Stay curious.",
    "",
    "— Edna",
    "",
  ].join("\n");
}

function validateSelection(wonders: Wonder[], expectedDates: string[], today: string) {
  if (wonders.length !== expectedDates.length) {
    fail(`expected ${expectedDates.length} Wonders but found ${wonders.length}.`);
  }

  const slugs = new Set(wonders.map((wonder) => wonder.slug));
  const dates = new Set(wonders.map((wonder) => wonder.date));

  if (slugs.size !== wonders.length) {
    fail("the selected week contains duplicate Wonder slugs.");
  }

  if (dates.size !== wonders.length) {
    fail("the selected week contains duplicate publication dates.");
  }

  const missingDates = expectedDates.filter((date) => !dates.has(date));

  if (missingDates.length > 0) {
    fail(`missing publication dates: ${missingDates.join(", ")}.`);
  }

  const futureWonders = wonders.filter((wonder) => wonder.date > today);

  if (futureWonders.length > 0) {
    fail(`future Wonders were selected: ${futureWonders.map((wonder) => wonder.slug).join(", ")}.`);
  }
}

function main() {
  const weekEnding = process.argv[2];

  if (!weekEnding) {
    fail("provide a Saturday week-ending date, for example: npm run newsletter:weekly -- 2026-06-13");
  }

  const endDate = parseDate(weekEnding);

  if (endDate.getUTCDay() !== 6) {
    fail(`${weekEnding} is not a Saturday.`);
  }

  const startDate = addDays(endDate, -6);
  const periodStart = formatDate(startDate);
  const periodEnd = formatDate(endDate);
  const editorialDate = getEditorialDate();

  if (periodEnd > editorialDate) {
    fail(`the week ends on ${periodEnd}, after the current editorial date ${editorialDate}.`);
  }

  const expectedDates = Array.from({ length: 7 }, (_, index) =>
    formatDate(addDays(startDate, index)),
  );
  const wonders = getAllScheduledWonders()
    .filter((wonder) => wonder.date >= periodStart && wonder.date <= periodEnd)
    .sort((a, b) => a.date.localeCompare(b.date));

  validateSelection(wonders, expectedDates, editorialDate);

  const markdown = renderDigest(wonders, periodStart, periodEnd);
  const contentHash = createHash("sha256").update(markdown).digest("hex");
  const manifest: DigestManifest = {
    type: "weekly-digest",
    periodStart,
    periodEnd,
    wonderSlugs: wonders.map((wonder) => wonder.slug),
    contentHash,
    status: "generated",
    generatedAt: new Date().toISOString(),
  };
  const outputDirectory = path.join(process.cwd(), "newsletter/drafts/weekly");
  const outputStem = `${periodStart}--${periodEnd}`;

  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, `${outputStem}.md`), markdown);
  fs.writeFileSync(
    path.join(outputDirectory, `${outputStem}.json`),
    `${JSON.stringify(manifest, null, 2)}\n`,
  );

  console.log(
    `Generated ${wonders.length}-Wonder digest for ${periodStart} through ${periodEnd}.`,
  );
  console.log(`Markdown: newsletter/drafts/weekly/${outputStem}.md`);
  console.log(`Manifest: newsletter/drafts/weekly/${outputStem}.json`);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
