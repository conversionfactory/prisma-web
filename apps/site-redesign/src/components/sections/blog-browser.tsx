"use client";

import { useMemo, useState } from "react";
import { GlassPrismSpin } from "@/components/brand/glass-prism-spin";
import { PrismButtonOutline } from "@/components/brand/prism-button";
import { Texture } from "@/components/brand/texture";
import { BlogFilters, type TopicOption } from "@/components/sections/blog-filters";
import { BlogIndexGrid } from "@/components/sections/blog-index-grid";
import { BLOG_POSTS, TOPIC_LABELS, TOPICS } from "@/data/blog-posts";

// The blog list: the search and chip filters at the top, the post cards under
// them, in one client component because they share a single piece of state.
//
// THE CONTAINER IS pricing-comparison.tsx's, copied structurally (client,
// 2026-08-17: "we can use this type of container and internal cards for the
// blogs list, in the top part we can place the search bar and chip filters",
// pointing at that section). It is the site's wrapped prismatic panel: a
// max-w-[96rem] rounded card with a hairline border, the spectral wash and beam
// fan pooled at its bottom edge, grain, and a glass prism turning at the
// bottom-right corner — with the content cards sitting inside it.
//
// EVERY decorative layer lives inside the panel's overflow-hidden. That is the
// whole point and it is what two earlier passes got wrong: they copied
// pricing-hero.tsx instead, which is the one deliberately UNWRAPPED section on
// that page, so the wash and grain ran full-bleed and washed the page
// background rather than filling a container.
//
// The panel wraps the list only. The hero above and the sections below keep
// their own treatments.
//
// Filtering is client-side over a static array. Sixteen posts is small enough
// that there is nothing to debounce and no reason to round-trip; if this list
// ever comes from a CMS with hundreds of entries, the filter state is the part
// that moves to the URL and the matching moves to the server. Deliberately NOT
// in the URL yet — searchParams would make this a Suspense boundary and put a
// history entry behind every keystroke, for a page with no deep links to share.
//
// Topic counts are computed once at module scope, not per render: they are
// totals over the whole feed and never change with the filter state.

// Spectrum gradient matching the brand CTA glow (see prism-button.tsx).
const SPECTRUM =
  "linear-gradient(85deg, #01d7e4 0%, #f3c306 25%, #f37a03 50%, #f43531 74%, #f00e5c 100%)";

const TOPIC_OPTIONS: TopicOption[] = TOPICS.map((id) => ({
  id,
  label: TOPIC_LABELS[id] ?? id,
  count: BLOG_POSTS.filter((post) => post.topics.includes(id)).length,
})).filter((topic) => topic.count > 0);

// Matched against title, excerpt, author and topic label — the four things
// someone might have in mind. Precomputed per post so typing does not rebuild
// sixteen lowercase strings on every keystroke.
const HAYSTACKS = new Map(
  BLOG_POSTS.map((post) => [
    post.slug,
    [
      post.title,
      post.excerpt,
      post.authors.join(" "),
      post.topics.map((t) => TOPIC_LABELS[t] ?? t).join(" "),
    ]
      .join(" ")
      .toLowerCase(),
  ]),
);

export function BlogBrowser() {
  const [query, setQuery] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  const results = useMemo(() => {
    // Every term must match somewhere, in any order — "postgres search" finds
    // the full-text post whichever way round it is typed. A single substring
    // match on the whole string would not.
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    return BLOG_POSTS.filter((post) => {
      if (activeTopic && !post.topics.includes(activeTopic)) return false;
      const haystack = HAYSTACKS.get(post.slug) ?? "";
      return terms.every((term) => haystack.includes(term));
    });
  }, [query, activeTopic]);

  const filtering = query.trim() !== "" || activeTopic !== null;

  function reset() {
    setQuery("");
    setActiveTopic(null);
  }

  return (
    <section className="bg-white px-3 py-16 sm:px-4 sm:py-24">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        {/* spectral bottom — wash plus the three brand beams, pricing-comparison's
            values verbatim. Anchored to the panel's bottom edge, and the panel
            clips it, so however tall the grid gets the colour stays inside the
            container and the page background never sees it. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[34rem] overflow-hidden"
        >
          <div
            className="absolute -bottom-1/3 left-1/2 h-[120%] w-[160%] -translate-x-1/2"
            style={{
              background: [
                "radial-gradient(52% 40% at 30% 100%, color-mix(in srgb, var(--color-prism-cyan-400) 30%, transparent), transparent 68%)",
                "radial-gradient(44% 36% at 52% 100%, color-mix(in srgb, var(--color-prism-yellow-300) 24%, transparent), transparent 66%)",
                "radial-gradient(42% 30% at 74% 100%, color-mix(in srgb, var(--color-prism-red-400) 26%, transparent), transparent 68%)",
              ].join(","),
            }}
          />
          <div className="absolute bottom-[-24rem] left-[12%] h-[60rem] w-40 origin-bottom rotate-[-26deg] bg-prism-cyan-300/45 blur-[80px]" />
          <div className="absolute bottom-[-26rem] left-1/2 h-[62rem] w-44 origin-bottom -translate-x-1/2 rotate-[4deg] bg-prism-yellow-200/50 blur-[72px]" />
          <div className="absolute bottom-[-28rem] right-[12%] h-[60rem] w-40 origin-bottom rotate-[26deg] bg-prism-red-300/45 blur-[80px]" />
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-t from-transparent via-white/60 to-white" />
        </div>

        {/* glass prism turning at the bottom edge, light concentrating behind it */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-6rem] right-[-4rem] h-[16rem] w-[24rem] rounded-full opacity-25 blur-[70px]"
          style={{ backgroundImage: SPECTRUM }}
        />
        <GlassPrismSpin
          shape="pentagon"
          period={24}
          initialAngle={0.7}
          className="bottom-[-4.5rem] right-[-3.5rem] w-[14rem] max-md:bottom-[-3rem] max-md:right-[-2rem] max-md:w-[9rem]"
        />
        <Texture />

        <div className="relative px-4 pb-12 pt-16 sm:px-8 sm:pb-14 sm:pt-24">
          <div className="mx-auto max-w-site">
            <BlogFilters
              query={query}
              onQueryChange={setQuery}
              topics={TOPIC_OPTIONS}
              activeTopic={activeTopic}
              onTopicChange={setActiveTopic}
              resultCount={results.length}
              totalCount={BLOG_POSTS.length}
            />

            <div className="mt-10">
              {results.length > 0 ? (
                // The lead card only exists in the unfiltered view. It is the
                // newest post promoted to full width, which is an editorial
                // claim about the feed — inside a filtered set it is just
                // whichever card happens to be first, and at three or four
                // results a full-width card followed by a short row reads as a
                // layout bug.
                <BlogIndexGrid posts={results} showLead={!filtering} />
              ) : (
                <div className="rounded-2xl border border-black/[0.06] bg-card px-6 py-20 text-center">
                  <p className="text-xl leading-snug">No posts match that search.</p>
                  <p className="mx-auto mt-3 max-w-[46ch] text-pretty leading-relaxed text-muted-foreground">
                    Try a broader term, or clear the filters to see all {BLOG_POSTS.length} posts.
                  </p>
                  <div className="mt-7 flex justify-center">
                    <PrismButtonOutline onClick={reset}>Clear filters</PrismButtonOutline>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
