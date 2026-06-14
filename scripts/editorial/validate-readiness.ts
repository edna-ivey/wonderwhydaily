import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { categoryDefinitions, getEditorialDate, wonderRatings } from "../../lib/wonders.ts";

const root = process.cwd();
const biblePath = path.join(root, "docs/WONDER_BIBLE.md");
const wondersDirectory = path.join(root, "content/wonders");
const dayMilliseconds = 24 * 60 * 60 * 1_000;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const validStatuses = new Set(["Published", "Scheduled", "Approved"]);
const validCategories = new Set<string>(categoryDefinitions.map((category) => category.name));
const validRatings = new Set<string>([...wonderRatings, "TBD"]);

type Severity = "error" | "warning";
type Issue = { area: string; severity: Severity; message: string };
type BibleEntry = {
  date?: string;
  title: string;
  category: string;
  rating: string;
  status: string;
};
type WonderRecord = {
  filename: string;
  slug: string;
  data: Record<string, unknown>;
  content: string;
};

const issues: Issue[] = [];

function report(area: string, severity: Severity, message: string) {
  issues.push({ area, severity, message });
}

function exists(relativePath: string): boolean {
  return fs.existsSync(path.join(root, relativePath));
}

function readJson(relativePath: string): Record<string, unknown> | undefined {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8")) as Record<
      string,
      unknown
    >;
  } catch (error) {
    report(
      "Generated artifacts",
      "error",
      `${relativePath} is not valid JSON: ${error instanceof Error ? error.message : error}`,
    );
    return undefined;
  }
}

function normalizeTitle(title: string): string {
  return title.trim().toLocaleLowerCase().replace(/\s+/g, " ");
}

function parseDate(value: string): Date {
  return new Date(`${value}T12:00:00Z`);
}

function isValidDate(value: string): boolean {
  if (!datePattern.test(value)) return false;
  const date = parseDate(value);
  return !Number.isNaN(date.valueOf()) && formatDate(date) === value;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(value: string, days: number): string {
  return formatDate(new Date(parseDate(value).valueOf() + days * dayMilliseconds));
}

function listDates(start: string, end: string): string[] {
  const dates: string[] = [];
  for (let date = start; date <= end; date = addDays(date, 1)) dates.push(date);
  return dates;
}

function parseBible(): BibleEntry[] {
  if (!fs.existsSync(biblePath)) {
    report("Wonder Bible", "error", "docs/WONDER_BIBLE.md does not exist.");
    return [];
  }

  const source = fs.readFileSync(biblePath, "utf8");
  const entries: BibleEntry[] = [];
  let inWonderTable = false;

  for (const line of source.split("\n")) {
    if (/^## (Published Wonders|Scheduled Wonders|Approved Wonder Candidate Pool)$/.test(line)) {
      inWonderTable = true;
      continue;
    }
    if (line.startsWith("## ")) {
      inWonderTable = false;
      continue;
    }
    if (!inWonderTable || !line.startsWith("|")) continue;

    const cells = line
      .split("|")
      .slice(1, -1)
      .map((cell) => cell.trim());
    if (cells.length !== 5 || cells[0] === "Date" || /^-+$/.test(cells[0])) continue;

    const [date, title, category, rating, status] = cells;
    entries.push({
      date: date && date !== "—" ? date : undefined,
      title,
      category,
      rating,
      status,
    });
  }

  return entries;
}

function loadWonders(): WonderRecord[] {
  if (!fs.existsSync(wondersDirectory)) {
    report("Wonder coverage", "error", "content/wonders does not exist.");
    return [];
  }

  return fs
    .readdirSync(wondersDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .sort()
    .map((filename) => {
      const source = fs.readFileSync(path.join(wondersDirectory, filename), "utf8");
      const parsed = matter(source);
      return {
        filename,
        slug: filename.replace(/\.mdx$/, ""),
        data: parsed.data as Record<string, unknown>,
        content: parsed.content,
      };
    });
}

function duplicates<T>(values: T[]): T[] {
  const seen = new Set<T>();
  const duplicateValues = new Set<T>();
  for (const value of values) {
    if (seen.has(value)) duplicateValues.add(value);
    seen.add(value);
  }
  return [...duplicateValues];
}

function validateBible(entries: BibleEntry[]) {
  for (const title of duplicates(entries.map((entry) => normalizeTitle(entry.title)))) {
    report("Wonder Bible", "error", `duplicate normalized title: ${title}`);
  }
  for (const date of duplicates(entries.flatMap((entry) => (entry.date ? [entry.date] : [])))) {
    report("Wonder Bible", "error", `duplicate publication date: ${date}`);
  }

  for (const entry of entries) {
    if (!validStatuses.has(entry.status)) {
      report("Wonder Bible", "error", `"${entry.title}" has invalid status "${entry.status}".`);
    }
    if (!validCategories.has(entry.category)) {
      report("Wonder Bible", "error", `"${entry.title}" has invalid category "${entry.category}".`);
    }
    if (!validRatings.has(entry.rating)) {
      report("Wonder Bible", "error", `"${entry.title}" has invalid rating "${entry.rating}".`);
    }
    if (entry.status === "Approved" && entry.date) {
      report("Wonder Bible", "error", `Approved title "${entry.title}" unexpectedly has a date.`);
    }
    if (entry.status !== "Approved" && (!entry.date || !isValidDate(entry.date))) {
      report("Wonder Bible", "error", `"${entry.title}" requires a valid publication date.`);
    }
  }

  const dated = entries.flatMap((entry) => (entry.date ? [entry.date] : [])).sort();
  if (dated.length > 0) {
    const assigned = new Set(dated);
    for (const date of listDates(dated[0], dated.at(-1)!)) {
      if (!assigned.has(date)) report("Wonder Bible", "error", `missing schedule date: ${date}`);
    }
  }
}

function nonEmpty(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function validateWonderMetadata(wonders: WonderRecord[]) {
  const slugs = new Set(wonders.map((wonder) => wonder.slug));
  const requiredStrings = [
    "title",
    "date",
    "category",
    "rating",
    "excerpt",
    "shortAnswer",
    "correctAnswer",
    "correctFeedback",
    "incorrectFeedback",
    "coolFact",
    "tryItYourself",
    "takeaway",
  ];

  for (const wonder of wonders) {
    for (const field of requiredStrings) {
      if (!nonEmpty(wonder.data[field])) {
        report("Wonder metadata", "error", `${wonder.filename} is missing "${field}".`);
      }
    }

    const category = wonder.data.category;
    const rating = wonder.data.rating;
    const choices = wonder.data.choices;
    const related = wonder.data.related;
    const channels = wonder.data.channels as Record<string, unknown> | undefined;
    const email = channels?.email as Record<string, unknown> | undefined;
    const social = channels?.social as Record<string, unknown> | undefined;

    if (typeof category === "string" && !validCategories.has(category)) {
      report("Wonder metadata", "error", `${wonder.filename} has invalid category "${category}".`);
    }
    if (typeof rating === "string" && !validRatings.has(rating)) {
      report("Wonder metadata", "error", `${wonder.filename} has invalid rating "${rating}".`);
    }
    if (
      !Array.isArray(choices) ||
      choices.length !== 3 ||
      new Set(choices).size !== 3 ||
      !choices.includes(wonder.data.correctAnswer)
    ) {
      report("Wonder metadata", "error", `${wonder.filename} has an invalid three-choice quiz.`);
    }
    if (!Array.isArray(related) || related.some((slug) => typeof slug !== "string")) {
      report("Wonder metadata", "error", `${wonder.filename} has an invalid related list.`);
    } else {
      for (const slug of related) {
        if (!slugs.has(slug)) {
          report("Wonder metadata", "error", `${wonder.filename} has broken related slug "${slug}".`);
        }
      }
    }

    for (const field of ["subject", "preheader", "teaser"]) {
      if (!nonEmpty(email?.[field])) {
        report("Wonder metadata", "error", `${wonder.filename} is missing channels.email.${field}.`);
      }
    }
    for (const field of [
      "hook",
      "shortVideoHook",
      "shortVideoPayoff",
      "pinterestTitle",
      "pinterestDescription",
    ]) {
      if (!nonEmpty(social?.[field])) {
        report("Wonder metadata", "error", `${wonder.filename} is missing channels.social.${field}.`);
      }
    }
    if (
      !Array.isArray(social?.carouselBeats) ||
      social.carouselBeats.length < 3 ||
      social.carouselBeats.some((beat) => !nonEmpty(beat))
    ) {
      report("Wonder metadata", "error", `${wonder.filename} has invalid social carousel beats.`);
    }
  }
}

function validateCoverage(entries: BibleEntry[], wonders: WonderRecord[], today: string) {
  const bibleByTitle = new Map(entries.map((entry) => [normalizeTitle(entry.title), entry]));
  const bibleByDate = new Map(entries.flatMap((entry) => (entry.date ? [[entry.date, entry] as const] : [])));
  const wonderTitles = wonders.map((wonder) => normalizeTitle(String(wonder.data.title ?? "")));
  const wonderDates = wonders.map((wonder) => String(wonder.data.date ?? ""));

  for (const title of duplicates(wonderTitles)) {
    report("Wonder coverage", "error", `multiple completed Wonder files use title "${title}".`);
  }
  for (const date of duplicates(wonderDates)) {
    report("Wonder coverage", "error", `multiple completed Wonder files use date "${date}".`);
  }

  for (const wonder of wonders) {
    const title = normalizeTitle(String(wonder.data.title ?? ""));
    const date = String(wonder.data.date ?? "");
    if (!bibleByTitle.has(title)) {
      report("Wonder coverage", "error", `${wonder.filename} is orphaned from the Wonder Bible.`);
    } else if (bibleByTitle.get(title)?.date !== date) {
      report("Wonder coverage", "error", `${wonder.filename} date does not match its Bible entry.`);
    }
    if (!bibleByDate.has(date)) {
      report("Wonder coverage", "error", `${wonder.filename} uses a date absent from the Wonder Bible.`);
    }
    if (wonder.data.status === "draft") {
      report("Draft validation", "error", `${wonder.filename} is a draft inside production content.`);
    }
  }

  const completedTitles = new Set(wonderTitles);
  for (const entry of entries) {
    if (entry.date && entry.date <= today && !completedTitles.has(normalizeTitle(entry.title))) {
      report(
        "Wonder coverage",
        "error",
        `${entry.date} "${entry.title}" is published by editorial date but has no completed MDX file.`,
      );
    }
    if (entry.status === "Published" && !completedTitles.has(normalizeTitle(entry.title))) {
      report("Wonder coverage", "error", `Bible Published title "${entry.title}" has no MDX file.`);
    }
  }
}

function validateHash(relativePath: string, expected: unknown, area: string) {
  if (typeof expected !== "string") {
    report(area, "error", `${relativePath} manifest has no content hash.`);
    return;
  }
  if (!exists(relativePath)) {
    report(area, "error", `${relativePath} referenced by a manifest does not exist.`);
    return;
  }
  const content = fs.readFileSync(path.join(root, relativePath), "utf8");
  const actual = createHash("sha256").update(content).digest("hex");
  if (actual !== expected) report(area, "error", `${relativePath} content hash does not match.`);
}

function listJson(relativeDirectory: string): string[] {
  const directory = path.join(root, relativeDirectory);
  return fs.existsSync(directory)
    ? fs.readdirSync(directory).filter((file) => file.endsWith(".json")).sort()
    : [];
}

function validateDrafts(): number {
  const draftDirectory = "editorial/drafts/wonders";
  const manifestDirectory = "editorial/drafts/manifests";
  const drafts = exists(draftDirectory)
    ? fs.readdirSync(path.join(root, draftDirectory)).filter((file) => file.endsWith(".mdx"))
    : [];
  const manifests = listJson(manifestDirectory);

  for (const filename of drafts) {
    const relativePath = `${draftDirectory}/${filename}`;
    const parsed = matter(fs.readFileSync(path.join(root, relativePath), "utf8"));
    if (
      parsed.data.status !== "draft" ||
      parsed.data.needsFactReview !== true ||
      parsed.data.needsEditorialReview !== true
    ) {
      report("Draft validation", "error", `${relativePath} is missing mandatory draft review flags.`);
    }
    const manifest = `${manifestDirectory}/${filename.replace(/\.mdx$/, ".json")}`;
    if (!exists(manifest)) report("Draft validation", "error", `${relativePath} has no manifest.`);
  }

  for (const filename of manifests) {
    const relativeManifest = `${manifestDirectory}/${filename}`;
    const manifest = readJson(relativeManifest);
    if (!manifest) continue;
    const draftPath = manifest.draftPath;
    if (typeof draftPath !== "string" || !draftPath.startsWith(`${draftDirectory}/`)) {
      report("Draft validation", "error", `${relativeManifest} points outside editorial drafts.`);
      continue;
    }
    validateHash(draftPath, manifest.contentHash, "Draft validation");
  }

  return drafts.length;
}

function validateNewsletter(): number {
  const required = [
    "scripts/newsletter/generate-weekly-digest.ts",
    "newsletter/templates/weekly-digest.md",
    "newsletter/templates/welcome.md",
  ];
  for (const file of required) {
    if (!exists(file)) report("Newsletter", "error", `missing ${file}.`);
  }

  const manifests = listJson("newsletter/drafts/weekly");
  for (const filename of manifests) {
    const relativeManifest = `newsletter/drafts/weekly/${filename}`;
    const manifest = readJson(relativeManifest);
    if (!manifest) continue;
    if (manifest.type !== "weekly-digest" || !Array.isArray(manifest.wonderSlugs)) {
      report("Newsletter", "error", `${relativeManifest} is not a valid weekly digest manifest.`);
    }
    validateHash(relativeManifest.replace(/\.json$/, ".md"), manifest.contentHash, "Newsletter");
  }
  return required.filter(exists).length / required.length;
}

function validateManifestSet(
  manifestDirectory: string,
  expectedType: string,
  recordsField: "drafts" | "promptFiles",
  area: string,
) {
  for (const filename of listJson(manifestDirectory)) {
    const relativeManifest = `${manifestDirectory}/${filename}`;
    const manifest = readJson(relativeManifest);
    if (!manifest) continue;
    if (manifest.type !== expectedType || !Array.isArray(manifest[recordsField])) {
      report(area, "error", `${relativeManifest} has an invalid manifest structure.`);
      continue;
    }
    for (const record of manifest[recordsField] as Array<Record<string, unknown>>) {
      if (typeof record.path !== "string") {
        report(area, "error", `${relativeManifest} contains a record without a path.`);
      } else {
        validateHash(record.path, record.contentHash, area);
      }
    }
  }
}

function validateSocial(): number {
  const required = [
    "scripts/social/generate-social-drafts.ts",
    "scripts/social/generate-image-prompts.ts",
    "social/templates/instagram-carousel.md",
    "social/templates/short-video.md",
    "social/templates/pinterest.md",
  ];
  for (const file of required) {
    if (!exists(file)) report("Social", "error", `missing ${file}.`);
  }
  validateManifestSet("social/drafts/manifests", "social-draft-set", "drafts", "Social");
  validateManifestSet(
    "social/prompts/manifests",
    "social-image-prompt-set",
    "promptFiles",
    "Social",
  );
  return required.filter(exists).length / required.length;
}

function readinessWindow(entries: BibleEntry[], wonders: WonderRecord[], today: string, days: number) {
  const end = addDays(today, days - 1);
  const scheduled = entries.filter((entry) => entry.date && entry.date >= today && entry.date <= end);
  const completed = new Set(wonders.map((wonder) => normalizeTitle(String(wonder.data.title ?? ""))));
  const missing = scheduled.filter((entry) => !completed.has(normalizeTitle(entry.title)));
  const ready = scheduled.length - missing.length;
  const percentage = scheduled.length === 0 ? 100 : Math.round((ready / scheduled.length) * 100);
  return { days, end, scheduled, ready, missing, percentage };
}

function printIssues() {
  const areas = [...new Set(issues.map((issue) => issue.area))];
  if (areas.length === 0) {
    console.log("\nIntegrity Issues\n- None");
    return;
  }
  console.log("\nIntegrity Issues");
  for (const area of areas) {
    console.log(`\n${area}`);
    for (const issue of issues.filter((item) => item.area === area)) {
      console.log(`- ${issue.severity.toUpperCase()}: ${issue.message}`);
    }
  }
}

function main() {
  const today = getEditorialDate();
  const entries = parseBible();
  const wonders = loadWonders();

  validateBible(entries);
  validateCoverage(entries, wonders, today);
  validateWonderMetadata(wonders);
  const draftCount = validateDrafts();
  const newsletterReadiness = validateNewsletter();
  const socialReadiness = validateSocial();
  const windows = [30, 60, 90].map((days) => readinessWindow(entries, wonders, today, days));
  const nextMissing = entries
    .filter((entry) => entry.date && entry.date >= today)
    .filter(
      (entry) =>
        !wonders.some(
          (wonder) => normalizeTitle(String(wonder.data.title ?? "")) === normalizeTitle(entry.title),
        ),
    )
    .slice(0, 5);
  const statusCount = (status: string) => entries.filter((entry) => entry.status === status).length;
  const contentReadiness = windows[1].percentage;
  const operationalPublished = entries.filter((entry) => entry.date && entry.date <= today).length;
  const operationalScheduled = entries.filter((entry) => entry.date && entry.date > today).length;

  console.log("Wonder Why Daily Readiness Report");
  console.log(`Editorial date: ${today}`);
  console.log(`Timezone: ${process.env.WONDER_TIME_ZONE ?? Intl.DateTimeFormat().resolvedOptions().timeZone}`);
  console.log("");
  console.log(`Content Readiness (next 60 days): ${contentReadiness}%`);
  console.log(`Newsletter Readiness: ${Math.round(newsletterReadiness * 100)}%`);
  console.log(`Social Readiness: ${Math.round(socialReadiness * 100)}%`);
  console.log("");
  console.log("Coverage");
  console.log(`- Operational Published by ${today}: ${operationalPublished}`);
  console.log(`- Operational Future Scheduled: ${operationalScheduled}`);
  console.log(`- Bible Published: ${statusCount("Published")}`);
  console.log(`- Bible Scheduled: ${statusCount("Scheduled")}`);
  console.log(`- Bible Approved: ${statusCount("Approved")}`);
  console.log(`- Completed MDX: ${wonders.length}`);
  console.log(`- Editorial Drafts: ${draftCount}`);
  console.log(`- Total Controlled Wonders: ${entries.length}`);

  for (const window of windows) {
    console.log(`\nNext ${window.days} Days (${today} through ${window.end})`);
    console.log(`- Scheduled: ${window.scheduled.length}`);
    console.log(`- Ready: ${window.ready}`);
    console.log(`- Missing Content: ${window.missing.length}`);
    console.log(`- Readiness: ${window.percentage}%`);
    if (window.missing.length > 0) {
      for (const entry of window.missing) console.log(`  - ${entry.date}: ${entry.title}`);
    }
  }

  console.log("\nNext Missing Content");
  if (nextMissing.length === 0) console.log("- None");
  for (const entry of nextMissing) console.log(`- ${entry.date}: ${entry.title}`);

  console.log("\nHighest Priority Action");
  console.log(
    nextMissing.length > 0
      ? `- Complete and review "${nextMissing[0].title}" for ${nextMissing[0].date}.`
      : "- No scheduled content gaps are currently visible.",
  );

  printIssues();
  const errors = issues.filter((issue) => issue.severity === "error").length;
  const warnings = issues.filter((issue) => issue.severity === "warning").length;
  console.log(`\nResult: ${errors} error(s), ${warnings} warning(s).`);
  if (errors > 0) process.exitCode = 1;
}

main();
