import { GlassGlide } from "@/components/brand/glass-glide";
import { RoleKicker } from "@/components/brand/role-kicker";
import { Texture } from "@/components/brand/texture";

// /blog hero: a title band that takes the filter controls and the post grid as
// children, so the whole index lives in one container.
//
// This is pricing-hero.tsx's structure, applied here on client feedback
// (2026-08-17: "we can use this type of container and internal cards for the
// blogs list, in the top part we can place the search bar and chip filters").
// Same reasoning as /pricing, which got here first: land on the page and see
// the list, not a full screen of introduction before it.
//
// UNWRAPPED, unlike most sections on the site: no rounded panel, no border,
// full-bleed. That is the whole point of the borrowed container — /blog used to
// open on a wrapped prismatic panel, and stacking a bordered hero panel on top
// of a card grid put two competing frames on one page. André made the same call
// on /pricing (2026-07-30) and for the same reason: the panel was containing
// the layout and reading tighter than the reference.
//
// Because nothing clips the wash now, it has to dissolve into white on its own.
// pricing-hero does that by anchoring the wash near the BOTTOM of its section
// and fading upward, which works because that section is a title band plus one
// row of cards. This one is the entire index — around 5,000px with sixteen
// cards in it — so the same values put the colour behind the last row and left
// the top of the page flat white. Here the wash is anchored to the top and
// masked at both ends: it pools behind the controls and the first cards, which
// is the spot /pricing's is pooling behind too, and it is gone long before the
// grid runs out.
//
// WHAT CAME OUT, moving to this container:
//  - The two CTAs. They pushed the search field a row further down, which is
//    the exact thing the pricing rework was undoing. CtaBurst still closes the
//    page, and the header carries Get Started on every route.
//  - The centred axis. Kicker, headline, subhead, field and chips are all left
//    aligned now, on the container's own axis — /pricing is left aligned and a
//    centred control block under a left-aligned headline reads as two layouts.
//
// COPY IS PLACEHOLDER. No approved copy exists for the blog index, so the
// kicker, headline and subhead are written to the right shape and length for
// the layout and nothing more. Everything else on the page (post titles,
// excerpts, dates, authors) is real, from the production feed.
export function BlogHero({ children }: { children?: React.ReactNode }) {
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
        className="pointer-events-none absolute inset-x-0 top-0 h-[56rem] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_62%,transparent)]"
      >
        <div
          className="absolute left-1/2 top-0 h-full w-[150%] -translate-x-1/2"
          style={{
            background: [
              "radial-gradient(50% 30% at 28% 72%, color-mix(in srgb, var(--color-prism-cyan-400) 30%, transparent), transparent 70%)",
              "radial-gradient(44% 26% at 52% 72%, color-mix(in srgb, var(--color-prism-yellow-300) 24%, transparent), transparent 68%)",
              "radial-gradient(46% 26% at 76% 72%, color-mix(in srgb, var(--color-prism-red-400) 26%, transparent), transparent 70%)",
            ].join(","),
          }}
        />
      </div>
      {/* Grain over the top of the band only. Unmasked it runs the section's
          full ~5,000px, which is both pointless and a large paint. */}
      <Texture className="[mask-image:linear-gradient(to_bottom,black,black_10%,transparent_20%)]" />

      {/* Generous top padding: the fixed header is 100px, the rest is deliberate
          air above the headline. pricing-hero's numbers. */}
      <div className="relative mx-auto max-w-site pb-20 pt-32 sm:pb-24 md:pt-36">
        <div className="flex min-w-0 flex-col items-start">
          <RoleKicker color="bg-prism-cyan-400">Blog</RoleKicker>
          <h1 className="isolate mt-5 max-w-[30ch] text-balance text-[clamp(2.25rem,3.4vw,3.125rem)] leading-[1.06]">
            Notes from the team{" "}
            <GlassGlide className="md:whitespace-normal">building Prisma</GlassGlide>
          </h1>
          <p className="mt-6 max-w-[62ch] text-pretty text-lg leading-relaxed text-muted-foreground">
            Releases, Postgres deep dives, and the engineering decisions behind the platform —
            written by the people who shipped them.
          </p>
        </div>

        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
