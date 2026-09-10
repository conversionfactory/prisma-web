// The /blog index roster.
//
// No approved copy exists for this page yet, so rather than invent posts these
// entries are lifted verbatim from the real Prisma blog that already lives in
// this monorepo (apps/blog/content/blog/*/index.mdx): title, slug, date,
// authors and metaDescription, newest first. Nothing here is written copy — it
// is the production feed, so the page can be judged on structure and density
// with real line lengths instead of lorem.
//
// This is a static file rather than a read of apps/blog for the same reason
// /customers ships data/customers.ts: the two apps are separate workspaces with
// separate content pipelines, and site-redesign has no loader for the other
// app's MDX. When the redesign gets its own post pages, this file becomes the
// fallback and `href` switches from prisma.io to a local route — see the note
// on BlogPost.href.
//
// The redesign's own content/blog/*.mdx (three scaffold posts) is deliberately
// NOT the source. It is placeholder marketing text about a fictional product,
// which is exactly what this page should not be shown with.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date. Formatted at render with an explicit UTC timezone. */
  date: string;
  authors: string[];
  /** Topic ids, matching TOPIC_LABELS. First one wins the art plate's label. */
  topics: string[];
  /**
   * Points at prisma.io while the redesign has no post pages of its own —
   * the same interim /customers takes with its story cards. Swapping this to
   * `/blog/${slug}` is the only change needed once those exist.
   */
  href: string;
};

// Display names for the topic ids carried on each post. Anything unmapped falls
// through to the raw id rather than being dropped, so a new tag appearing in
// the data shows up (slightly wrong) instead of silently vanishing — the same
// rule customers-grid.tsx uses for stack chips.
export const TOPIC_LABELS: Record<string, string> = {
  ai: "AI",
  announcement: "Announcements",
  "case-study": "Case studies",
  education: "Deep dives",
  orm: "ORM",
  platform: "Platform",
  "prisma-postgres": "Prisma Postgres",
};

// Subheaders for the /blog/category/[slug] pages, keyed by topic id. Like the
// blog hero copy, these are PLACEHOLDER — written to the right shape for the
// category header and nothing more, so approved copy can drop in without the
// layout reflowing. A topic with no entry falls back to a generic line rather
// than rendering an empty subhead (see the category page's resolver).
export const TOPIC_DESCRIPTIONS: Record<string, string> = {
  ai: "Building AI-powered apps and agents on Prisma — from retrieval to what ships in production.",
  announcement: "Product news, releases, and the latest from the people building Prisma.",
  "case-study": "How real teams build, ship, and scale on Prisma in production.",
  education:
    "Long-form engineering: the architecture decisions, benchmarks, and how things actually work.",
  orm: "Type-safe data access with Prisma ORM — modeling, queries, migrations, and the road ahead.",
  platform: "The tools that run your data layer in production, from the console to the query engine.",
  "prisma-postgres":
    "Managed Postgres for modern, serverless workloads — deep dives, patterns, and what we're shipping.",
};

// The topic roster for the hero band, in the order the band shows them. Hand
// ordered rather than derived: the derived order is post-count descending,
// which buries "Announcements" and puts two engineering topics side by side.
export const TOPICS = [
  "prisma-postgres",
  "orm",
  "ai",
  "platform",
  "education",
  "case-study",
  "announcement",
] as const;

const blogPost = (post: Omit<BlogPost, "href">): BlogPost => ({
  ...post,
  href: `https://www.prisma.io/blog/${post.slug}`,
});

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "you-dont-need-elasticsearch-postgres-already-has-full-text-search",
    title: "You Don't Need Elasticsearch, Postgres Already Has Full-Text Search",
    excerpt:
      "Build full-text search with tsvector, GIN indexes, and pg_trgm typo tolerance on Prisma Postgres. For most apps, no Elasticsearch cluster required.",
    date: "2026-07-21",
    authors: ["Nurul Sundarani"],
    topics: ["prisma-postgres", "education"],
  },
  {
    slug: "prisma-next-ltree-extension",
    title: "Extending Prisma Next with Typed Postgres ltree",
    excerpt:
      "Use PostgreSQL ltree in Prisma Next with prisma-ltree: typed path columns plus ancestor and descendant queries.",
    date: "2026-07-20",
    authors: ["Jason Procka"],
    topics: ["orm", "education"],
  },
  {
    slug: "agents-md-for-databases",
    title: "What to Put in Your AGENTS.md So Your Agent Handles the Database Right",
    excerpt:
      "A copy-pasteable AGENTS.md section for database work: ephemeral Postgres via npx create-db, safe migrations, and JSON output for Claude Code, Cursor, and Codex.",
    date: "2026-07-17",
    authors: ["Nurul Sundarani"],
    topics: ["ai", "prisma-postgres"],
  },
  {
    slug: "prisma-studio-migrations-view",
    title: "See Your Migration History in Prisma Studio",
    excerpt:
      "The Prisma Studio Migrations view shows every applied Prisma Next migration as a timeline with a visual diff, the executed SQL, and a schema diff.",
    date: "2026-07-17",
    authors: ["Ankur Datta", "Søren Bramer Schmidt"],
    topics: ["announcement", "orm"],
  },
  {
    slug: "you-dont-need-a-job-queue-postgres-already-has-skip-locked",
    title: "You Don't Need a Job Queue, Postgres Already Has SKIP LOCKED",
    excerpt:
      "Postgres can run a reliable background job queue with FOR UPDATE SKIP LOCKED. Build a worker queue with retries using pg and Prisma Postgres, no broker required.",
    date: "2026-07-17",
    authors: ["Nurul Sundarani"],
    topics: ["prisma-postgres", "education"],
  },
  {
    slug: "you-dont-need-a-vector-database-postgres-already-has-pgvector",
    title: "You Don't Need a Vector Database, Postgres Already Has pgvector",
    excerpt:
      "pgvector turns Postgres into a vector store; Prisma Next makes it type-safe. Build working semantic search on a temporary Prisma Postgres database in minutes.",
    date: "2026-07-10",
    authors: ["Ankur Datta"],
    topics: ["prisma-postgres", "education"],
  },
  {
    slug: "give-your-agent-a-database",
    title: "Your AI Agent Needs a Database. Give It One in Five Seconds",
    excerpt:
      "npx create-db gives coding agents a temporary Postgres database in seconds, no sign-up. JSON output lets Cursor, Claude Code, and Codex test on real Postgres.",
    date: "2026-07-09",
    authors: ["Nurul Sundarani"],
    topics: ["ai", "prisma-postgres"],
  },
  {
    slug: "serverless-postgres",
    title: "Serverless Postgres: How It Works and How to Choose a Provider",
    excerpt:
      "Serverless Postgres separates compute from storage and bills for usage instead of provisioned servers. How scale-to-zero, cold starts, and the three pricing models compare across Neon, Prisma Postgres, Supabase, Aurora, and PlanetScale.",
    date: "2026-07-09",
    authors: ["Martin Janse van Rensburg"],
    topics: ["prisma-postgres", "platform"],
  },
  {
    slug: "typescript-7-native-compiler-faster-type-checking",
    title: "TypeScript 7 in a Real Monorepo: 3x Faster Type Checks, Mostly Config Changes",
    excerpt:
      "TypeScript 7 ships the compiler as a native Go port. We migrated a large TypeScript monorepo to it: whole-repo type checking went from ~74s to ~24s with no memory tuning. Here are the numbers, the exact config diffs, and the sharp edges.",
    date: "2026-07-09",
    authors: ["Ankur Datta", "Sampo Lahtinen"],
    topics: ["education", "platform"],
  },
  {
    slug: "claude-generated-50-websites-overnight-prisma-compute",
    title: "Claude Generated 50 Websites Overnight. Prisma Compute Helped Ship Them.",
    excerpt:
      "Ali Fatemi gave Claude the Prisma docs and CLI, then used Prisma Compute to turn AI-generated websites into working URLs.",
    date: "2026-07-01",
    authors: ["Gregory Boch"],
    topics: ["platform", "ai", "case-study"],
  },
  {
    slug: "prisma-compute-vs-vercel-pricing",
    title: "Prisma Compute vs Vercel Pricing",
    excerpt:
      "Prisma Compute vs Vercel, priced line by line: the same workload runs ~$98 vs ~$236. See why, and why Vercel bills the workflow while Prisma bills the work.",
    date: "2026-07-01",
    authors: ["Martin Janse van Rensburg"],
    topics: ["prisma-postgres", "platform"],
  },
  {
    slug: "how-xeito-builds-features-not-database-infrastructure-with-prisma",
    title: "How One Founder Builds a Live Sports Platform Without a Database Team",
    excerpt:
      "How Xeito uses Prisma ORM and Prisma Postgres to ship live scoring, leagues, payments, and player workflows without a database team.",
    date: "2026-06-30",
    authors: ["Gregory Boch"],
    topics: ["case-study", "platform", "orm"],
  },
  {
    slug: "evaluating-object-storage-providers-for-prisma-compute",
    title: "Evaluating Object Storage Providers for Prisma Compute",
    excerpt:
      "We benchmarked Tigris and Cloudflare R2 from six Prisma Compute regions using a latency-sensitive virtual filesystem workload, with AWS S3 and S3 Express as a baseline.",
    date: "2026-06-26",
    authors: ["Søren Bramer Schmidt"],
    topics: ["platform", "ai"],
  },
  {
    slug: "prisma-compute-time-synchronization",
    title: "How Prisma Compute Keeps Time Accurate in Long-Running Applications",
    excerpt:
      "How Prisma Compute keeps wall-clock time accurate in long-running Firecracker microVMs, using the host-paired KVM PTP clock instead of an in-guest NTP daemon.",
    date: "2026-06-26",
    authors: ["Alexey Orlenko"],
    topics: ["platform"],
  },
  {
    slug: "prisma-postgres-on-stripe-projects",
    title: "Your agent can now provision Prisma Postgres through Stripe",
    excerpt:
      "Add a Prisma Postgres database to your Stripe project with one command: spending limits out of the box, plan changes from the CLI you already use.",
    date: "2026-06-26",
    authors: ["Sampo Lahtinen"],
    topics: ["announcement", "prisma-postgres"],
  },
  {
    slug: "prisma-postgres-vs-neon-pricing-2026",
    title: "Prisma Postgres vs Neon Pricing 2026: Per-Plan Tables and Worked Examples",
    excerpt:
      "Prisma Postgres vs Neon pricing side by side: per-plan tables with exact unit prices, five worked cost examples with reproducible math, and a worksheet for your own workload.",
    date: "2026-06-24",
    authors: ["Martin Janse van Rensburg"],
    topics: ["education"],
  },
].map(blogPost);
