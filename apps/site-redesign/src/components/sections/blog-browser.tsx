"use client";

import { useMemo, useState } from "react";
import { PrismButtonOutline } from "@/components/brand/prism-button";
import { Texture } from "@/components/brand/texture";
import { BlogFilters, type TopicOption } from "@/components/sections/blog-filters";
import { BlogIndexGrid } from "@/components/sections/blog-index-grid";
import { BLOG_POSTS, TOPIC_LABELS, TOPICS } from "@/data/blog-posts";

// The blog list: the search and chip filters at the top, the post cards under
// them, in one client component because they share a single piece of state.
//
// THE CONTAINER IS /pricing's (client, 2026-08-17: "we can use this type of
// container and internal cards for the blogs list, in the top part we can place
// the search bar and chip filters"). pricing-hero.tsx is unwrapped and
// full-bleed — no rounded panel, no border — with a spectral wash and grain
// carrying the brand instead of a frame, and the plan cards sitting on it. This
// is that treatment around the list.
//
// It stops at the list. The hero above keeps its wrapped panel and the sections
// below keep theirs; an earlier pass put the whole page in this container and
// that was too much of it (André, 2026-08-17).
//
// The wash could not be copied verbatim. pricing-hero anchors it near the
// BOTTOM of its section and fades upward, which works for a title band plus one
// row of cards. This section is the whole grid — around 4,600px with sixteen
// cards — so the same values put the colour behind the last row and left the
// controls flat white. It is anchored to the top here and masked at both ends
// instead: it pools behind the controls and the first cards, which is where
// /pricing's sits relative to its own content, and it is gone long before the
// grid runs out.
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
    <section className="relative overflow-hidden bg-white px-4 sm:px-8">
      {/* Spectral wash, pooling behind the controls and the first row of cards.
          A mask rather than a clipped box with fades stacked on it: the box
          would need overflow-hidden to contain the gradients, and its own hard
          edge is then the seam you were trying to avoid. Masked, the whole
          thing dissolves at both ends with nothing to line up. Hue order and
          sizes are pricing-hero's; only the anchor moved. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[46rem] [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_52%,transparent)]"
      >
        <div
          className="absolute left-1/2 top-0 h-full w-[150%] -translate-x-1/2"
          style={{
            background: [
              "radial-gradient(50% 32% at 28% 40%, color-mix(in srgb, var(--color-prism-cyan-400) 32%, transparent), transparent 70%)",
              "radial-gradient(44% 28% at 52% 40%, color-mix(in srgb, var(--color-prism-yellow-300) 26%, transparent), transparent 68%)",
              "radial-gradient(46% 28% at 76% 40%, color-mix(in srgb, var(--color-prism-red-400) 28%, transparent), transparent 70%)",
            ].join(","),
          }}
        />
      </div>
      {/* Grain over the top of the band only. Unmasked it runs the section's
          full ~4,600px, which is both pointless and a large paint. */}
      <Texture className="[mask-image:linear-gradient(to_bottom,black,black_9%,transparent_18%)]" />

      <div className="relative mx-auto max-w-site pb-24 pt-20 sm:pt-24">
        <BlogFilters
          query={query}
          onQueryChange={setQuery}
          topics={TOPIC_OPTIONS}
          activeTopic={activeTopic}
          onTopicChange={setActiveTopic}
          resultCount={results.length}
          totalCount={BLOG_POSTS.length}
        />

        <div className="mt-8">
          {results.length > 0 ? (
            // The lead card only exists in the unfiltered view. It is the newest
            // post promoted to full width, which is an editorial claim about the
            // feed — inside a filtered set it is just whichever card happens to
            // be first, and at three or four results a full-width card followed
            // by a short row reads as a layout bug.
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
    </section>
  );
}
