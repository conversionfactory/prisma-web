import { blog } from "./source";

type BlogPage = ReturnType<typeof blog.getPages>[number];

function readTags(page: BlogPage): string[] {
  const raw = (page.data as { tags?: unknown }).tags;
  if (!Array.isArray(raw)) return [];
  return raw.filter((t): t is string => typeof t === "string" && t.trim().length > 0);
}

/**
 * Returns all posts (newest first) tagged with the given category slug.
 */
export function getPostsByCategory(slug: string): BlogPage[] {
  return blog
    .getPages()
    .filter((page) => readTags(page).includes(slug))
    .sort((a, b) => {
      const ad = new Date((a.data as { date?: Date }).date ?? 0).getTime();
      const bd = new Date((b.data as { date?: Date }).date ?? 0).getTime();
      return bd - ad;
    });
}
