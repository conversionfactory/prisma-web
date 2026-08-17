import { Search, X } from "@/components/icons/forma";
import { cn } from "@/lib/utils";

// The /blog filter controls: a search field with the topic chips under it.
// Rendered at the top of the BlogHero container, above the post grid.
//
// These chips have moved three times. They started inside the old hero panel as
// a static roster with counts (the slot /customers gives its "Built with Prisma"
// logo band), came down the page and became real controls, lost the card that
// boxed them, and now sit at the top of the pricing-style container with the
// grid (André, 2026-08-17).
//
// Losing the box is what let the field get big. Inside a panel it had to stay
// h-11 and share a row with eight chips, which capped it at ~320px and left it
// reading as an admin filter. Free of the panel it takes the measure a search
// field wants, with the spectrum ring lighting on focus — the same prismatic
// hairline the outline CTA and the logo tiles use, so the one control on the
// page that invites typing is also the one that reacts to it.
//
// LEFT ALIGNED, not centred. The block was centred while it was a standalone
// band between two sections; inside the container it shares an axis with the
// kicker, the headline, the subhead and the grid, and a centred control block
// under a left-aligned headline reads as two layouts stitched together.
//
// Counts stay on the chips, and they are TOTALS — they do not recount as you
// type. A number that moves while you search reads as a result count for the
// search rather than as the size of the topic, and the actual result count has
// its own line below.
//
// Chips are squared off rather than pills: prism-button.tsx owns `rounded-full`
// for both of its variants, so a white pill with a hairline border is
// pixel-for-pixel the secondary CTA. Same ruling as marker.tsx.

export type TopicOption = { id: string; label: string; count: number };

export function BlogFilters({
  query,
  onQueryChange,
  topics,
  activeTopic,
  onTopicChange,
  resultCount,
  totalCount,
}: {
  query: string;
  onQueryChange: (value: string) => void;
  topics: TopicOption[];
  /** null = no topic filter, the "All" chip. */
  activeTopic: string | null;
  onTopicChange: (topic: string | null) => void;
  resultCount: number;
  totalCount: number;
}) {
  const filtering = query.trim() !== "" || activeTopic !== null;

  return (
    <div>
      {/* The field. `spectrum-border` paints the prismatic hairline on hover,
          `spectrum-border-focus` keeps it lit while the field has focus — see
          the pair in globals.css. Both need the ring's radius to match, which
          it does via border-radius: inherit, so the rounding lives here only. */}
      <div className="max-w-xl">
        <div
          className={cn(
            "spectrum-border spectrum-border-focus relative rounded-2xl bg-white",
            "border border-black/[0.09] shadow-[0_1px_2px_rgba(21,21,21,0.04),0_16px_40px_-24px_rgba(21,21,21,0.28)]",
            "transition-shadow duration-500 hover:shadow-[0_1px_2px_rgba(21,21,21,0.04),0_20px_48px_-24px_rgba(21,21,21,0.34)]",
          )}
        >
          <label htmlFor="blog-search" className="sr-only">
            Search posts
          </label>
          <Search
            className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <input
            id="blog-search"
            // `search` rather than `text` for the mobile keyboard's Search key
            // and Escape-to-clear. The browser-native clear affordance it adds
            // on WebKit is suppressed in globals.css — this ships its own, so
            // the two would sit side by side.
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search posts, topics, authors"
            // No focus ring: the spectrum hairline IS the focus indicator here,
            // and a default ring on top of it draws two concentric outlines.
            className="h-14 w-full rounded-2xl bg-transparent pl-14 pr-14 text-base outline-none placeholder:text-muted-foreground"
          />
          {query !== "" && (
            <button
              type="button"
              onClick={() => onQueryChange("")}
              aria-label="Clear search"
              className="absolute right-3.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-black/[0.05] hover:text-foreground"
            >
              <X className="size-4" aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* Chips wrap under the field at every width. They used to scroll
          horizontally at lg to keep a single-row panel tidy; with no panel to
          keep tidy, wrapping is strictly better — nothing is hidden off-screen.
          No max width: the container's max-w-site is wider than the eight chips
          need (~950px laid out), so they stay on one row at desktop and wrap
          naturally below it. */}
      <ul className="mt-5 flex flex-wrap items-center gap-2">
        <li>
          <Chip
            active={activeTopic === null}
            onClick={() => onTopicChange(null)}
            count={totalCount}
          >
            All
          </Chip>
        </li>
        {topics.map((topic) => (
          <li key={topic.id}>
            <Chip
              active={activeTopic === topic.id}
              onClick={() => onTopicChange(activeTopic === topic.id ? null : topic.id)}
              count={topic.count}
            >
              {topic.label}
            </Chip>
          </li>
        ))}
      </ul>

      {/* aria-live so the grid changing under a keyboard or screen-reader user
          is announced — filtering rewrites the page below with no other signal.
          The element is always rendered, never conditionally mounted: a live
          region that appears at the same moment its text does is frequently
          missed by screen readers. */}
      <p className="mt-5 min-h-5 text-sm text-muted-foreground" aria-live="polite">
        {filtering
          ? `${resultCount} of ${totalCount} ${totalCount === 1 ? "post" : "posts"}`
          : null}
      </p>
    </div>
  );
}

function Chip({
  active,
  count,
  onClick,
  children,
}: {
  active: boolean;
  count: number;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex h-10 shrink-0 items-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-colors",
        active
          ? "border-transparent bg-foreground text-background"
          : // spectrum-border paints the brand's prismatic hairline on hover.
            // Only on the inactive chips: on a filled dark chip it draws a
            // coloured ring around something already at full contrast.
            "spectrum-border border-neutral-200 bg-white text-foreground",
      )}
    >
      {children}
      <span className={cn("tabular-nums", active ? "text-background/60" : "text-muted-foreground")}>
        {count}
      </span>
    </button>
  );
}
