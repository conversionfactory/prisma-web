import { Texture } from "@/components/brand/texture";
import { TOPIC_LABELS, type BlogPost } from "@/data/blog-posts";
import { cn } from "@/lib/utils";

// The card art for a blog post: a light plate carrying the isometric-cube
// pattern in grey, a soft prismatic wash at two opposite corners, and the
// Prisma wordmark locked up with the post's lead topic.
//
// It was a black plate first — story-art.tsx's treatment, lifted from
// /customers. Reworked to light (André, 2026-08-17): sixteen dark slabs stacked
// down a white page turned the grid into a wall of tombstones, where /customers
// only ever shows thirteen and gives each one a different customer logo to
// break it up.
//
// Where a customer story locks the wordmark to the customer's own mark, a post
// has no mark of its own, so the lockup's second half is the post's lead topic
// set as type. That keeps the plate a data render — adding a post is a data
// entry, never a trip to a design tool.
//
// THE PATTERN IS A STATIC BACKGROUND, NOT <Pattern>. brand/pattern.tsx is the
// cursor-reactive version used on the homepage and /compare, and it is the
// right thing there — one or two instances per page. It inlines a 323KB SVG,
// measures all 1008 of its paths, and runs a requestAnimationFrame loop over
// them for as long as it is mounted. Sixteen of those on one grid is ~16k
// transform writes per frame and a dead page. Same asset, same grey, same
// low opacity as the stack-bento and comparison panels — just painted rather
// than simulated, with the hover handled in CSS.
const PATTERN_URL = "url('/brand/pattern.svg')";

// Each entry is [corner-in, corner-out] — the hue enters top-left and leaves
// bottom-right. Sixteen plates lit identically read as a printing error rather
// than as a system.
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
        // Faintly off-white, not pure white. The card behind it is white, so at
        // #fff the plate stops being a surface and the lockup looks like it is
        // floating in the card's padding. This is barely a tint — the hairline
        // below does most of the separating — but it is the difference between
        // "image area" and "gap".
        "relative flex items-center justify-center overflow-hidden bg-[#fcfcfd]",
        className,
      )}
    >
      {/* The prismatic wash, painted normally rather than screened: on black
          these gradients needed mix-blend-screen to stop compositing toward
          their own muddy midtones, but on a light plate normal blending is what
          keeps them clean. Weaker than the dark plate's too (22/18% against
          95/90%) — the same value that reads as "light entering the frame" on
          black reads as a stain on white. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            `radial-gradient(64% 86% at -4% -8%, color-mix(in srgb, var(${from}) 22%, transparent), transparent 70%)`,
            `radial-gradient(64% 86% at 104% 108%, color-mix(in srgb, var(${to}) 18%, transparent), transparent 70%)`,
          ].join(","),
        }}
      />

      {/* The cube grid. Greyscaled and masked to fade out before it reaches the
          lockup, so the type never sits on top of pattern detail.
          `group-hover` targets the card's <a>, which owns `group` — the plate
          brightening as the whole card is hovered is the point. The card had no
          hover state at all before this (André's original ruling on
          /customers); the pattern coming up is now the one thing that moves. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-repeat opacity-[0.05] grayscale",
          // 0.05 → 0.16. The rest value matches the stack-bento and comparison
          // panels, which are decoration; the hover value has to actually read
          // as a state change from across the grid, and 0.13 was still ambiguous
          // next to the wash.
          "transition-opacity duration-500 ease-out group-hover:opacity-[0.16]",
          "[mask-image:linear-gradient(to_top,black,transparent_72%)]",
          // Reduced motion still gets the state change — it is a cross-fade,
          // not movement — but instantly, since the transition is the animation.
          "motion-reduce:transition-none",
        )}
        style={{
          backgroundImage: PATTERN_URL,
          // The tile is 446x217. Halved on grid plates so a ~455px card shows
          // two columns of cubes rather than one oversized row; the lead plate
          // is taller than it is wide, so it takes the tile closer to full size.
          backgroundSize: lead ? "334px 163px" : "223px 109px",
        }}
      />

      {/* Grain at the light-surface calibration — 0.06 multiply, the value
          Texture documents for white panels. The dark plate used 0.08
          hard-light, which on this base is invisible. */}
      <Texture opacity={0.06} blend="multiply" />

      {/* Hairline against the copy area. On the dark plate the tonal jump did
          this on its own; between two near-white surfaces there has to be an
          actual edge. Bottom on grid cards, right on the lead card, matching
          which way the plate sits against the text. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute bg-black/[0.07]",
          lead ? "inset-y-0 right-0 hidden w-px md:block" : "inset-x-0 bottom-0 h-px",
        )}
      />

      <div
        className={cn(
          "relative flex items-center justify-center",
          lead ? "gap-6 px-10 sm:gap-8" : "gap-5 px-7 sm:gap-6",
        )}
      >
        {/* full-color, not full-color-white: this is the same mark the header
            uses on a light surface. The dark plate needed the white-wordmark
            sibling. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/full-color.svg"
          alt="Prisma"
          className={cn("w-auto object-contain", lead ? "h-8" : "h-7")}
          loading="lazy"
          draggable={false}
        />
        <span aria-hidden className={cn("w-px shrink-0 bg-black/15", lead ? "h-10" : "h-9")} />
        {/* Not a heading element: the card's real heading is the post title in
            the copy column, and a second one here would put two headings in one
            link. Sized to sit at the wordmark's optical weight. */}
        <span
          className={cn(
            "select-none text-balance font-semibold tracking-tight text-foreground",
            lead ? "text-2xl" : "text-xl",
          )}
        >
          {TOPIC_LABELS[topic] ?? topic}
        </span>
      </div>
    </div>
  );
}
