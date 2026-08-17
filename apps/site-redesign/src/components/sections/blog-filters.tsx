import { Search, X } from "@/components/icons/forma";
import { cn } from "@/lib/utils";

// The /blog filter frame — search field on the left, topic chips on the right.
//
// These chips started life inside the hero panel as a static roster with counts
// (the slot /customers gives its "Built with Prisma" logo band). They moved down
// here and became real controls (André, 2026-08-17). Two things follow from that
// and are worth not undoing:
//
//   - The frame is its own surface, not a strip of the page. A bare row of
//     controls floating between the hero panel and the card grid belongs to
//     neither; boxed, it reads as the thing that operates the grid below it.
//     Card treatment is contact-message-form.tsx's, which is the site's
//     established "this is an interactive panel" surface.
//   - Counts stay on the chips, and they are TOTALS — they do not recount as you
//     type. A number that moves while you search reads as a result count for the
//     search rather than as the size of the topic, and the actual result count
//     has its own line below the frame.
//
// Chips are squared off rather than pills: prism-button.tsx owns `rounded-full`
// for both of its variants, so a white pill with a hairline border is
// pixel-for-pixel the secondary CTA. Same ruling as marker.tsx.

// Matches contact-message-form.tsx's FIELD, which is the site's field
// calibration — taller and softer than the shadcn default (h-9, rounded-md).
const FIELD =
  "rounded-lg border border-black/[0.09] bg-white text-[15px] shadow-[0_1px_2px_rgba(21,21,21,0.04)]";

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
      <div className="rounded-2xl border border-black/[0.06] bg-card p-5 shadow-[0_1px_2px_rgba(21,21,21,0.04),0_16px_40px_-20px_rgba(21,21,21,0.22)] sm:p-6">
        {/* Stacked below lg. Seven chips plus an All will not share a row with a
            search field at tablet width without the field collapsing to
            something unusable. */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
          <div className="relative lg:w-80 lg:shrink-0">
            <label htmlFor="blog-search" className="sr-only">
              Search posts
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <input
              id="blog-search"
              // `search` rather than `text` for the mobile keyboard's Search
              // key. The browser-native clear affordance it adds on WebKit is
              // suppressed in globals.css — this ships its own, so the two
              // would sit side by side.
              type="search"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
              placeholder="Search posts"
              className={cn(
                FIELD,
                "h-11 w-full pl-10 pr-10 outline-none placeholder:text-muted-foreground",
                "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
              )}
            />
            {query !== "" && (
              <button
                type="button"
                onClick={() => onQueryChange("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-black/[0.05] hover:text-foreground"
              >
                <X className="size-3.5" aria-hidden />
              </button>
            )}
          </div>

          {/* The chips scroll rather than wrap at lg and up: wrapping to a
              second line inside the frame pushes the search field off centre
              and the panel grows a ragged bottom edge. Below lg they wrap,
              because a horizontal scroller next to a stacked field hides half
              the topics with nothing to say they are there. */}
          <ul className="flex flex-wrap gap-2 lg:flex-nowrap lg:overflow-x-auto lg:pb-1">
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
        </div>
      </div>

      {/* aria-live so the grid changing under a keyboard or screen-reader user
          is announced — filtering rewrites the page below with no other signal.
          The element is always rendered, never conditionally mounted: a live
          region that appears at the same moment its text does is frequently
          missed by screen readers. */}
      <p className="mt-4 min-h-5 text-sm text-muted-foreground" aria-live="polite">
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
