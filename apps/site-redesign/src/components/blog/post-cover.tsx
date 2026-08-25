import { RoleKicker } from "@/components/brand/role-kicker"
import { Texture } from "@/components/brand/texture"
import { cn } from "@/lib/utils"

// Featured cover for the post hero: a dark editorial plate that sets the post's
// own title as the artwork. Left-aligned, filling the plate — the headline is
// the image, so every post gets a distinct cover with no per-post design work.
//
// Dark on purpose. The hero sits inside the wrapped white panel, so a near-white
// plate (the grid's PostArt treatment) disappears into it; this reads as its own
// surface. The grid cards keep the light plate — a page of dark slabs was the
// thing /blog's authors rejected, but one hero is exactly where it works.
//
// THE TYPE SCALES WITH THE PLATE, NOT THE VIEWPORT. The container is
// `container-type: inline-size` and the headline is sized in `cqw`, so it fills
// the same proportion of the cover at every breakpoint instead of going tiny in
// a big frame. The ramp below trades size against title length so a short title
// runs huge and a long one still fits without clipping.

const PATTERN_URL = "url('/brand/pattern.svg')"

function headlineSize(length: number): string {
  if (length <= 28) return "9cqw"
  if (length <= 45) return "7.4cqw"
  if (length <= 70) return "6.2cqw"
  if (length <= 95) return "5.4cqw"
  return "4.8cqw"
}

export function PostCover({
  title,
  topic,
  className,
}: {
  title: string
  topic?: string
  className?: string
}) {
  return (
    <div
      className={cn("relative flex flex-col justify-between overflow-hidden", className)}
      style={{
        containerType: "inline-size",
        background: "linear-gradient(150deg, #141418 0%, #0b0b0f 58%, #16101a 100%)",
      }}
    >
      {/* Prism light blooming in from the corners — screened so the hues stay
          clean on black instead of compositing toward their own midtones. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen"
        style={{
          background: [
            "radial-gradient(72% 72% at 4% 2%, color-mix(in srgb, var(--color-prism-cyan-400) 62%, transparent), transparent 62%)",
            "radial-gradient(66% 66% at 98% 96%, color-mix(in srgb, var(--color-prism-red-500) 55%, transparent), transparent 62%)",
            "radial-gradient(46% 46% at 88% 6%, color-mix(in srgb, var(--color-prism-yellow-300) 34%, transparent), transparent 58%)",
          ].join(","),
        }}
      />

      {/* Cube grid, inverted to read on black, fading before it hits the type. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-repeat opacity-[0.09] [mask-image:linear-gradient(to_top,black,transparent_72%)]"
        style={{ backgroundImage: PATTERN_URL, backgroundSize: "300px 146px", filter: "invert(1)" }}
      />

      <Texture opacity={0.09} blend="hard-light" />

      {/* Kicker — the site's standard tagline treatment (role-kicker.tsx): the
          colour lives in the dot, the label stays ink, sentence case, never
          uppercase or letter-spaced. Ink is white here for the dark plate. */}
      <div className="relative p-[7cqw] pb-0">
        {topic ? (
          <RoleKicker
            color="bg-prism-cyan-400"
            className="gap-[1.6cqw] text-[2.4cqw] font-medium leading-none text-white/70 [&>span]:size-[1.5cqw]"
          >
            {topic}
          </RoleKicker>
        ) : null}
      </div>

      {/* The headline as artwork — fills the plate, left aligned. */}
      <p
        className="relative px-[7cqw] font-semibold tracking-[-0.02em] text-white"
        style={{ fontSize: headlineSize(title.length), lineHeight: 1.06 }}
      >
        {title}
      </p>

      {/* Wordmark */}
      <div className="relative p-[7cqw] pt-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/full-color-white.svg"
          alt="Prisma"
          className="h-[4.2cqw] w-auto"
          draggable={false}
        />
      </div>
    </div>
  )
}
