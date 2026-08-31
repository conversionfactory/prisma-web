import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

import { blog } from "@/lib/source";
import { getPostsByCategory } from "@/lib/categories";
import { categoryRegistry, getCategoryMetadata, isKnownCategoryKey } from "@/lib/category-registry";
import { withBlogBasePath, withBlogBasePathForImageSrc } from "@/lib/url";
import { PostCard } from "@/components/PostCard";
import { BlogCTA } from "@/components/BlogCTA";
import { type BlogCardItem } from "@/components/BlogGrid";
import { BLOG_HOME_TITLE } from "@/lib/blog-metadata";

export const revalidate = false;

interface CategoryPageParams {
  slug: string;
}

function buildCardItems(slug: string): BlogCardItem[] {
  const posts = getPostsByCategory(slug);
  return posts.map((post) => {
    const data = post.data as {
      title?: string;
      date?: Date | string;
      updatedAt?: Date | string;
      metaDescription?: string;
      authors?: string[];
      heroImagePath?: string;
      heroImageAlt?: string;
      tags?: string[];
    };

    let dateISO = "";
    if (data.date) {
      const dateObj = new Date(data.date);
      if (!Number.isNaN(dateObj.getTime())) {
        dateISO = dateObj.toISOString();
      }
    }

    let updatedAtISO: string | null = null;
    if (data.updatedAt) {
      const updatedObj = new Date(data.updatedAt);
      if (!Number.isNaN(updatedObj.getTime())) {
        updatedAtISO = updatedObj.toISOString();
      }
    }

    const authors = Array.isArray(data.authors)
      ? data.authors.filter((a): a is string => typeof a === "string")
      : [];

    return {
      url: withBlogBasePath(post.url),
      title: data.title ?? "",
      date: dateISO,
      updatedAt: updatedAtISO,
      excerpt: data.metaDescription,
      author: authors[0] ?? null,
      authors,
      imageSrc: withBlogBasePathForImageSrc(data.heroImagePath ?? ""),
      imageAlt: data.heroImageAlt ?? data.title ?? "",
      tags: data.tags,
    };
  });
}

export default async function CategoryPage(props: { params: Promise<CategoryPageParams> }) {
  const { slug } = await props.params;
  if (!isKnownCategoryKey(slug)) notFound();

  const meta = getCategoryMetadata(slug);
  const items = buildCardItems(slug);

  return (
    <main className="flex-1 w-full max-w-249 mx-auto px-4 py-8 z-1">
      <Link href="/" className="text-fd-primary hover:underline text-sm">
        ← Back to Blog
      </Link>

      <header className="mt-9 mb-12 text-center">
        <h1 className="type-title-3xl md:type-title-4xl text-foreground-neutral break-words hyphens-auto">
          {meta.title}
        </h1>
        {meta.description ? (
          <p className="mt-3 mx-auto max-w-2xl text-foreground-neutral-weak">{meta.description}</p>
        ) : null}
      </header>

      {items.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <PostCard key={post.url} post={post} currentCategory={slug} vertical />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-foreground-neutral-weak">
          No posts in this category yet.
        </p>
      )}

      <div className="mt-16">
        <BlogCTA />
      </div>
    </main>
  );
}

export function generateStaticParams(): CategoryPageParams[] {
  return Object.keys(categoryRegistry).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<CategoryPageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isKnownCategoryKey(slug)) return {};

  const meta = getCategoryMetadata(slug);
  const title = `${meta.title} — ${BLOG_HOME_TITLE}`;
  const description = meta.description;

  return {
    title,
    description,
    alternates: { canonical: withBlogBasePath(`/category/${slug}`) },
    openGraph: {
      siteName: "Prisma",
      type: "website",
      title,
      description,
      url: withBlogBasePath(`/category/${slug}`),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// Reference `blog` so the route is recompiled when content changes.
void blog;
