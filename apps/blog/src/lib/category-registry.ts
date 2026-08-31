/**
 * Single source of truth for blog category metadata.
 *
 * Categories map 1:1 to the `tags` used in post frontmatter, so a category
 * page at `/blog/category/<key>` lists every post whose `tags` include `<key>`.
 *
 * To add a new category:
 *   1. Add a key/value entry below (the key must match the frontmatter tag).
 *   2. Give it a display `title` and a short `description` (the subheader).
 */
export const categoryRegistry = {
  announcement: {
    title: "Announcements",
    description: "Product news, releases, and the latest updates from the Prisma team.",
  },
  education: {
    title: "Guides & Tutorials",
    description: "Hands-on guides, deep dives, and best practices for building with Prisma.",
  },
  orm: {
    title: "ORM",
    description: "Data modeling, queries, migrations, and type safety with Prisma ORM.",
  },
  platform: {
    title: "Platform",
    description: "The tools that run your data layer in production, from Postgres to Accelerate.",
  },
  "case-study": {
    title: "Customer Stories",
    description: "How teams build, ship, and scale on Prisma in production.",
  },
  "prisma-postgres": {
    title: "Prisma Postgres",
    description: "Managed Postgres built for modern, serverless workloads.",
  },
  ai: {
    title: "AI",
    description: "Building AI-powered apps and agents with Prisma.",
  },
} as const satisfies Record<
  string,
  {
    title: string;
    description?: string;
  }
>;

export type CategoryKey = keyof typeof categoryRegistry;

export type CategoryMetadata = {
  title: string;
  description?: string;
};

function hasCategoryKey(key: string): key is CategoryKey {
  return Object.prototype.hasOwnProperty.call(categoryRegistry, key);
}

/**
 * Resolves category metadata for a given key. Falls back to a synthetic entry
 * using the key as the title so an unknown key never breaks the page.
 */
export function getCategoryMetadata(key: string): CategoryMetadata {
  if (hasCategoryKey(key)) {
    return categoryRegistry[key] as CategoryMetadata;
  }
  return { title: key };
}

export function isKnownCategoryKey(key: string): key is CategoryKey {
  return hasCategoryKey(key);
}
