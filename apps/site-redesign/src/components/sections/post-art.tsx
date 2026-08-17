import { Texture } from "@/components/brand/texture";
import { TOPIC_LABELS, type BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

// The standard card art for a blog post — the /customers StoryArt idiom
// (story-art.tsx) carried onto the blog index: a black plate with the brand's
// prismatic light entering from outside the frame, the Prisma wordmark locked
// up with a label across the middle.
//
// Where a customer story locks the wordmark to the customer's own mark, a post
// has no mark of its own, so the lockup's second half is the post's lead topic
// set as type. That keeps the plate a data render — adding a post is a data
// entry, never a trip to a design tool — and it does a job the hero band can't:
// it tags every card at a glance without spending a chip row on it.
//
// The light is at the EDGES rather than pooled at the bottom (the light-panel
// idiom): the centre has to stay dark enough for white type to hold contrast,
// so the spectrum enters from outside the frame and falls off inward. `screen`
// is what keeps it reading as light — painted normally these gradients
// composite toward their own muddy midtones over black.

// Sixteen plates on one page, and the customer version's single cyan/red
// diagonal repeated sixteen times reads as a printing error rather than as a
// system. The pair rotates instead, through the brand's three hues in the
// site's standard order. Each entry is [corner-in, corner-out].
//
// The caller picks the pair, not this component: a plain 0,1,2,3,… card index
// lands the same hue in the same column on every row of a three-column grid,
// which is a stripe, not a rotation. blog-index-grid.tsx shifts by row to break
// that — see the note there.
const HUE_PAIRS = [
  ["--color-prism-cyan-400", "--color-prism-red-500"],
  ["--color-prism-yellow-300", "--color-prism-cyan-400"],
  ["--color-prism-red-500", "--color-prism-yellow-300"],
] as const;

export function PostArt({
  post,
  index = 0,
  className,
  size = "card",
}: {
  post: BlogPost;
  /** Which hue pair to light the plate with, modulo the number available. */
  index?: number;
  className?: string;
  /** `card` is the grid plate; `lead` scales the lockup up for the wide card. */
  size?: "card" | "lead";
}) {
  const lead = size === "lead";
  const [from, to] = HUE_PAIRS[index % HUE_PAIRS.length];
  const topic = post.topics[0];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden bg-[#08090b]",
        className,
      )}
    >
      {/* Both sources sit just OUTSIDE their corner and are drawn large, so
          what lands in frame is the broad body of the glow sweeping across the
          corner rather than a discrete blob. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background: [
            `radial-gradient(58% 82% at -2% -6%, color-mix(in srgb, var(${from}) 95%, transparent), transparent 72%)`,
            `radial-gradient(58% 82% at 102% 106%, color-mix(in srgb, var(${to}) 90%, transparent), transparent 72%)`,
          ].join(","),
        }}
      />

      {/* Grain at story-art's calibration: 0.08 hard-light on black, roughly
          double the 0.06 multiply that works on white, because hard-light on a
          dark surface amplifies it far less. */}
      <Texture opacity={0.08} blend="hard-light" />

      <div
        className={cn(
          "relative flex items-center justify-center",
          lead ? "gap-6 px-10 sm:gap-8" : "gap-5 px-7 sm:gap-6",
        )}
      >
        {/* full-color-white is the dark-surface sibling of the full-color mark
            the header uses: brand-coloured icon, white wordmark. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/full-color-white.svg"
          alt="Prisma"
          className={cn("w-auto object-contain", lead ? "h-8" : "h-7")}
          loading="lazy"
          draggable={false}
        />
        <span aria-hidden className={cn("w-px shrink-0 bg-white/25", lead ? "h-10" : "h-9")} />
        {/* Not a heading element: the card's real heading is the post title in
            the copy column, and a second one here would put two headings in one
            link. Sized to sit at the wordmark's optical weight. */}
        <span
          className={cn(
            "select-none text-balance font-semibold tracking-tight text-white",
            lead ? "text-2xl" : "text-xl",
          )}
        >
          {TOPIC_LABELS[topic] ?? topic}
        </span>
      </div>
    </div>
  );
}
