// The /changelog feed — the redesign of prisma.io/changelog.
//
// The live changelog is a flat, undated-looking numbered list: date, title, a
// truncated blurb, "Read more". No categories, no visual hierarchy, no way to
// tell an ORM fix from a platform launch at a glance. The redesign keeps the
// content and adds the structure the list is missing — a product-area category
// per entry (which drives colour and the filter), a short tag set, and a
// "highlight" flag for the launches that deserve a feature card.
//
// Entries are lifted from the real changelog (title + date verbatim, blurb
// lightly tightened from the live preview text), newest first. Nothing here is
// invented product news. This is a static array for the same reason
// data/blog-posts.ts is: site-redesign has no loader for the changelog's real
// content pipeline, and the page is meant to be judged on structure with real
// line lengths. When the redesign owns its changelog source, this file becomes
// the fallback and `href` switches to a local route.

/** Product areas. The id drives the category chip colour and the filter. */
export type ChangelogCategory = "compute" | "orm" | "postgres" | "studio" | "platform";

export type ChangelogEntry = {
  /** ISO date. Formatted at render with an explicit UTC timezone. */
  date: string;
  title: string;
  description: string;
  category: ChangelogCategory;
  /** Short, lowercase-ish labels shown as pills under the entry. */
  tags: string[];
  /**
   * The big launches get a featured treatment (larger card, ships an accent).
   * Reserve for genuine "generally available" / "now in beta" moments.
   */
  highlight?: boolean;
  /** Points at the live changelog until the redesign owns these pages. */
  href: string;
};

// Category display + colour. Each area gets one of the three brand anchors (or
// ink for the platform-wide entries), so the feed reads as coloured bands you
// can scan without reading. Kept in one place so the chip, the timeline node
// and the filter tab always agree.
export const CATEGORY_META: Record<
  ChangelogCategory,
  { label: string; dot: string; text: string; ring: string; glow: string }
> = {
  compute: {
    label: "Compute",
    dot: "bg-prism-cyan-400",
    text: "text-prism-cyan-700",
    ring: "ring-prism-cyan-400/30",
    glow: "var(--color-prism-cyan-400)",
  },
  orm: {
    label: "ORM",
    dot: "bg-prism-red-500",
    text: "text-prism-red-700",
    ring: "ring-prism-red-500/30",
    glow: "var(--color-prism-red-500)",
  },
  postgres: {
    label: "Postgres",
    dot: "bg-prism-yellow-400",
    text: "text-prism-yellow-700",
    ring: "ring-prism-yellow-400/40",
    glow: "var(--color-prism-yellow-400)",
  },
  studio: {
    label: "Studio",
    dot: "bg-prism-cyan-600",
    text: "text-prism-cyan-800",
    ring: "ring-prism-cyan-600/30",
    glow: "var(--color-prism-cyan-600)",
  },
  platform: {
    label: "Platform",
    dot: "bg-foreground",
    text: "text-foreground",
    ring: "ring-foreground/20",
    glow: "var(--primary)",
  },
};

// The order the filter tabs show categories in — hand-ordered so the three
// headline products lead and the cross-cutting areas follow.
export const CATEGORY_ORDER: ChangelogCategory[] = [
  "compute",
  "orm",
  "postgres",
  "studio",
  "platform",
];

export const CHANGELOG: ChangelogEntry[] = [
  {
    date: "2026-08-28",
    title: "Prisma Compute is now generally available",
    description:
      "Run production apps on Prisma Compute with published pricing. The Free plan includes a million monthly requests, every branch gets its own environment, and Deploy is now built in.",
    category: "compute",
    tags: ["General availability", "Pricing", "Deploy"],
    highlight: true,
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-08-02",
    title: "Expression and partial indexes in Prisma 8",
    description:
      "Prisma 8 now supports authoring expression, partial, and unique indexes in Prisma Schema Language or TypeScript — and reads existing database indexes and row-level security policies. Plus: import any GitHub repository to Prisma Compute.",
    category: "orm",
    tags: ["Prisma 8", "Indexes", "Import"],
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-07-24",
    title: "Store files with Object Store buckets",
    description:
      "Prisma projects can now store files in S3-compatible Object Store buckets, sitting right alongside your Postgres databases and Compute apps and managed from the Console. See your whole workspace at a glance.",
    category: "postgres",
    tags: ["Object Store", "Console"],
    highlight: true,
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-07-17",
    title: "Use Prisma 8 with Supabase and pin Compute preview branches",
    description:
      "Prisma 8 runs Supabase projects end-to-end through @prisma/orm-extension-supabase, adds row-level security authoring in schema and TypeScript, and brings managed native PostgreSQL features.",
    category: "orm",
    tags: ["Prisma 8", "Supabase", "RLS"],
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-07-09",
    title: "Learn Prisma 8 from its expanded docs and use native enums",
    description:
      "The Prisma 8 docs now cover fundamentals, data modeling, migrations, middleware, extensions, contract authoring, and the full API reference. Schema now reads native PostgreSQL enums.",
    category: "orm",
    tags: ["Prisma 8", "Docs", "Enums"],
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-07-03",
    title: "Set up Prisma 8 with new guides and debug failed builds",
    description:
      "New setup guides for PostgreSQL and MongoDB projects, with schema language extended to scalar list fields and MongoDB enums. Debug failed Prisma Compute builds straight from the Console.",
    category: "compute",
    tags: ["Prisma 8", "Guides", "Builds"],
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-06-24",
    title: "Manage Prisma Compute apps through the API",
    description:
      "Manage Compute services without the dashboard via the Management API, with /v1/apps and /v1/deployments surfaces — including a deployment logs endpoint.",
    category: "compute",
    tags: ["Public beta", "Management API"],
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-06-19",
    title: "Configure Compute in TypeScript and roll back bad deploys",
    description:
      "Configure Compute deploys in TypeScript with a prisma.compute.ts file, and roll services back to a prior version from the Console. NestJS support joins Nuxt.",
    category: "compute",
    tags: ["Public beta", "Rollbacks", "NestJS"],
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-06-11",
    title: "Prisma Compute is now in Public Beta",
    description:
      "Deploy a TypeScript app right next to your Prisma Postgres database, with custom domains and database branches.",
    category: "compute",
    tags: ["Public beta", "Launch"],
    highlight: true,
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-06-05",
    title: "Debug slow queries from Prisma Studio",
    description:
      "Query Insights is now built into Prisma Studio, so you can inspect slow queries alongside the data you're browsing. Plus: preview migrations in Prisma 8.",
    category: "studio",
    tags: ["Query Insights", "Migrations"],
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-05-19",
    title: "Upgrade Node.js without Buffer deprecation warnings",
    description:
      "Prisma ORM no longer uses the deprecated Buffer() constructor, eliminating DEP0005 warnings on recent Node.js versions.",
    category: "orm",
    tags: ["Fix", "Node.js"],
    href: "https://www.prisma.io/changelog",
  },
  {
    date: "2026-05-15",
    title: "Browse wide tables again in Prisma Studio on Safari",
    description:
      "Prisma Studio restores horizontal scrolling in Safari, so wide tables are usable again.",
    category: "studio",
    tags: ["Fix", "Safari"],
    href: "https://www.prisma.io/changelog",
  },
];
