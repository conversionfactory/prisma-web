"use client";

import { useMemo, useState } from "react";
import { PrismButtonOutline } from "@/components/brand/prism-button";
import { BlogFilters, type TopicOption } from "@/components/sections/blog-filters";
import { BlogIndexGrid } from "@/components/sections/blog-index-grid";
import { BLOG_POSTS, TOPIC_LABELS, TOPICS } from "@/data/blog-posts";

// The blog list: the search and chip filters at the top, the post cards under
// them, in one client component because they share a single piece of state.
//
// NO WRAPPER FRAME (client, 2026-08-18). This briefly used
// pricing-comparison.tsx's wrapped prismatic panel — bordered, rounded, wash
// and glass prism inside it. Removed: that panel is sized for one comparison
// table, and stretched around sixteen cards it became a ~3,800px box whose
// border you only ever see two edges of at a time.
//
// The decorative layers went with it, deliberately. The wash, beam fan and
// prism only worked because the panel's overflow-hidden clipped them; without
// a frame to fill they run the height of the grid and tint the page, which is
// the exact thing that was wrong two passes ago. Plain white section, cards
// carry their own borders.
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
    <section className="bg-white px-4 py-20 sm:px-8 sm:py-24">
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
            // newest post promoted to full width, which is an editorial claim
            // about the feed — inside a filtered set it is just whichever card
            // happens to be first, and at three or four results a full-width
            // card followed by a short row reads as a layout bug.
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
