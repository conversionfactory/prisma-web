import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { ChevronRight } from "@/components/icons/forma"
import { blogMdxComponents } from "@/components/blog/mdx"
import { PrismButton } from "@/components/brand/prism-button"
import { PostArt } from "@/components/sections/post-art"
import { PostShare } from "@/components/sections/post-share"
import { BlogIndexGrid } from "@/components/sections/blog-index-grid"
import { CtaBurst } from "@/components/sections/cta-burst"
import { NewsletterBand } from "@/components/sections/newsletter-band"
import { RelatedResources, type RelatedResource } from "@/components/sections/related-resources"
import { BLOG_POSTS, TOPIC_LABELS, type BlogPost } from "@/data/blog-posts"
import { getContentBySlug, getContentSlugs } from "@/lib/content"
import { siteConfig } from "@/lib/config"

// The blog post template — the /blog index's design language carried onto a
// single post (blog-hero typography, the live-blog cover, the prism CTA closer,
// the same card grid for "More from the blog"), assembled to the blog template
// brief: SEO header → featured cover → body → related resources → get-started
// CTA → newsletter → more posts.
//
// TWO SOURCES. A post is rendered from content/blog/*.mdx when a body exists
// there (getting-started et al.). Every other card on the index comes from the
// BLOG_POSTS roster — real articles whose body still lives on prisma.io — so
// those slugs resolve here too: the template renders from the roster entry
// (cover + excerpt) and links out to the full article, rather than the card
// jumping straight off the redesign. Give a roster post an MDX file and it
// upgrades to a full body with no other change.

type BlogFrontmatter = {
  title: string
  description: string
  date: string
  author: string
  /** Optional author role, e.g. "Developer Advocate" — shown after the name. */
  role?: string
  /** Featured image path; falls back to the live-blog cover template when absent. */
  image?: string
  imageAlt?: string
  tags?: string[]
  relatedResources?: RelatedResource[]
}

type Props = {
  params: Promise<{ slug: string }>
}

const DATE_FORMAT = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
})

// ~200 wpm, rounded, floored at 1 — the standard blog estimate.
function readTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

// Unifies the two sources into one view model the template renders from.
function getPostView(slug: string) {
  const mdx = getContentBySlug<BlogFrontmatter>("blog", slug)
  if (mdx) {
    const { frontmatter: fm, content } = mdx
    return {
      title: fm.title,
      description: fm.description,
      date: fm.date,
      byline: fm.author,
      role: fm.role,
      topics: fm.tags ?? [],
      image: fm.image,
      imageAlt: fm.imageAlt,
      relatedResources: fm.relatedResources,
      content,
      readTime: readTimeMinutes(content),
      externalUrl: undefined as string | undefined,
    }
  }

  const roster = BLOG_POSTS.find((p) => p.slug === slug)
  if (roster) {
    return {
      title: roster.title,
      description: roster.excerpt,
      date: roster.date,
      byline: roster.authors.join(" & "),
      role: undefined,
      topics: roster.topics,
      image: undefined,
      imageAlt: undefined,
      relatedResources: undefined,
      content: undefined as string | undefined,
      readTime: undefined as number | undefined,
      // Body still lives on the production blog.
      externalUrl: `https://www.prisma.io/blog/${slug}`,
    }
  }

  return null
}

export function generateStaticParams() {
  const slugs = new Set([...getContentSlugs("blog"), ...BLOG_POSTS.map((p) => p.slug)])
  return [...slugs].map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostView(slug)
  if (!post) return {}

  const { title, description, image, imageAlt } = post
  const url = `${siteConfig.url}/blog/${slug}`
  const images = image
    ? [{ url: new URL(image, siteConfig.url).toString(), alt: imageAlt ?? title }]
    : undefined

  return {
    title: `${title} | Prisma`,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "article", images },
    twitter: { card: "summary_large_image", title, description, images: images?.map((i) => i.url) },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostView(slug)
  if (!post) notFound()

  const {
    title,
    description,
    date,
    byline,
    role,
    topics,
    image,
    imageAlt,
    relatedResources,
    content,
    readTime,
    externalUrl,
  } = post

  const leadTopic = topics[0]
  const categoryLabel = leadTopic ? (TOPIC_LABELS[leadTopic] ?? leadTopic) : "Article"
  const canonicalUrl = `${siteConfig.url}/blog/${slug}`

  // A BlogPost-shaped object so the redesign's light PostArt plate can stand in
  // as the featured image when a post ships without a real one.
  const artPost: BlogPost = {
    slug,
    title,
    excerpt: description,
    date,
    authors: [byline],
    topics,
    href: `/blog/${slug}`,
  }

  // Newest three from the index feed, excluding this post if it appears there.
  const morePosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Two-column post hero — title / byline / share on the left, the featured
          cover on the right (the redesign's light plate, matching the cards). */}
      <header className="bg-white px-4 pt-32 sm:px-8 md:pt-40">
        <div className="mx-auto grid max-w-site items-center gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Link href="/blog" className="transition-colors hover:text-foreground">
                Blog
              </Link>
              <ChevronRight className="size-3.5" aria-hidden />
              <span className="text-foreground">{categoryLabel}</span>
            </nav>

            <h1 className="mt-5 text-balance text-[clamp(2rem,3.4vw,3rem)] leading-[1.08]">
              {title}
            </h1>

            <div className="mt-8 text-sm text-muted-foreground">
              <p>
                By <span className="font-semibold text-foreground">{byline}</span>
                {role ? <span> · {role}</span> : null}
              </p>
              <p className="mt-1.5">
                <time dateTime={date}>{DATE_FORMAT.format(new Date(date))}</time>
                {readTime ? (
                  <>
                    <span aria-hidden className="px-1.5">
                      &bull;
                    </span>
                    {readTime} min read
                  </>
                ) : null}
              </p>
            </div>

            <div className="mt-8">
              <PostShare url={canonicalUrl} title={title} />
            </div>
          </div>

          <figure className="overflow-hidden rounded-[1.5rem] border border-black/[0.06]">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={imageAlt ?? title} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <PostArt post={artPost} index={0} size="lead" className="aspect-[4/3] w-full" />
            )}
          </figure>
        </div>
      </header>

      <article className="bg-white px-4 pb-8 pt-16 sm:px-8">
        {/* Body + related resources, in the prose measure */}
        <div className="mx-auto max-w-[46rem]">
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">{description}</p>

          {content ? (
            <div className="prose prose-neutral mt-8 max-w-none prose-headings:scroll-mt-28 prose-pre:rounded-xl prose-pre:border prose-pre:border-black/[0.08] prose-img:rounded-xl prose-img:border prose-img:border-black/[0.06]">
              <MDXRemote
                source={content}
                options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                components={blogMdxComponents(`https://www.prisma.io/blog/${slug}`)}
              />
            </div>
          ) : externalUrl ? (
            // Roster post: the body lives on the production blog. Keep the reader
            // on the redesign's template, then hand off to the full article.
            <div className="mt-8 rounded-2xl border border-black/[0.06] bg-card p-8 text-center sm:p-10">
              <p className="text-pretty leading-relaxed text-muted-foreground">
                The full article lives on the Prisma blog.
              </p>
              <div className="mt-6 flex justify-center">
                <PrismButton href={externalUrl}>Read the full article</PrismButton>
              </div>
            </div>
          ) : null}

          <RelatedResources resources={relatedResources} />
        </div>
      </article>

      {/* Get started with Prisma — the approved prism closer, blog copy */}
      <CtaBurst
        headline="Get started with Prisma"
        headlineMaxWidth="max-w-[18ch]"
        body="Spin up a database and deploy your first app in minutes. Free to start, no credit card required."
        bodyMaxWidth="max-w-[46ch]"
        checks={[
          { label: "Create a database and start building in minutes", color: "text-prism-cyan-500" },
          { label: "Type-safe queries from the Prisma ORM", color: "text-prism-yellow-400" },
          { label: "Trusted by 500K+ developers globally", color: "text-prism-red-500" },
        ]}
        primaryCta={{ label: "Get started free", href: "https://console.prisma.io" }}
        secondaryCta={{ label: "Read the docs", href: "https://www.prisma.io/docs" }}
      />

      <NewsletterBand />

      {/* More from the Prisma blog */}
      {morePosts.length > 0 && (
        <section className="bg-white px-4 pb-24 sm:px-8">
          <div className="mx-auto max-w-site">
            <h2 className="text-center text-[clamp(1.75rem,2.6vw,2.5rem)] leading-tight">
              More from the Prisma blog
            </h2>
            <div className="mt-10">
              <BlogIndexGrid posts={morePosts} showLead={false} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
