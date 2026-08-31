import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogCategoryHero } from "@/components/sections/blog-category-hero";
import { BlogIndexGrid } from "@/components/sections/blog-index-grid";
import { CtaBurst } from "@/components/sections/cta-burst";
import {
  BLOG_POSTS,
  TOPIC_DESCRIPTIONS,
  TOPIC_LABELS,
  TOPICS,
} from "@/data/blog-posts";

// /blog/category/[slug] — a topic landing on the blog index's design: the same
// prismatic hero panel (run lighter, blog-category-hero.tsx), the same card
// grid the index uses (BlogIndexGrid), and the same CtaBurst closer the index
// and /customers carry. A category is just the index filtered to one topic, so
// it reuses the index's parts rather than inventing a second look.
//
// The grid runs with showLead={false}: the full-width lead card is an editorial
// claim about the whole feed ("this is the newest post"), which does not hold
// inside a single topic — every card is the same size, matching the wireframe.
//
// Categories are the topic ids already carried on each post (data/blog-posts).
// Only topics with at least one post get a page; an unknown or empty slug 404s.

const postsFor = (slug: string) => BLOG_POSTS.filter((post) => post.topics.includes(slug));

const isTopic = (slug: string): boolean => (TOPICS as readonly string[]).includes(slug);

export function generateStaticParams(): { slug: string }[] {
  return TOPICS.filter((slug) => postsFor(slug).length > 0).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isTopic(slug)) return {};

  const label = TOPIC_LABELS[slug] ?? slug;
  const description = TOPIC_DESCRIPTIONS[slug] ?? `${label} posts from the Prisma blog.`;

  return {
    title: `${label} — Prisma Blog`,
    description,
    alternates: { canonical: `/blog/category/${slug}` },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isTopic(slug)) notFound();

  const posts = postsFor(slug);
  if (posts.length === 0) notFound();

  const label = TOPIC_LABELS[slug] ?? slug;
  const description = TOPIC_DESCRIPTIONS[slug] ?? `The latest ${label} posts from the Prisma blog.`;

  return (
    <>
      <BlogCategoryHero label={label} description={description} />

      <section className="bg-white px-4 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-site">
          <BlogIndexGrid posts={posts} showLead={false} />
        </div>
      </section>

      <CtaBurst
        headline="Ready to build with Prisma?"
        headlineMaxWidth="max-w-[22ch]"
        body="Free to start, no credit card required."
        bodyMaxWidth="max-w-[44ch]"
        checks={[
          {
            label: "Create a database and start building in minutes",
            color: "text-prism-cyan-500",
          },
          {
            label: "Read the docs for guides and API reference",
            color: "text-prism-yellow-400",
          },
          { label: "Trusted by 500K+ developers globally", color: "text-prism-red-500" },
        ]}
        primaryCta={{ label: "Get started free", href: "https://console.prisma.io" }}
        secondaryCta={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
