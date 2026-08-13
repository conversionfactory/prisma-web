import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { UseCasePageContent } from "./types";

// Rotates through the brand's three hues, in the order the rest of the site
// runs them. Four claims over three hues, so the last comes back round to cyan
// — the same `% 3` cycle the hero checks and the closer use.
const HUES = ["text-prism-cyan-500", "text-prism-yellow-500", "text-prism-red-500"];

// "Why teams choose Prisma for [use case]" — the fixed D4 differentiators, as a
// ledger: four ruled rows reading index, claim, evidence.
//
// Chosen from five options at /demo/use-case-reasons (André, 2026-08-13). Two
// earlier passes were rejected: a plain ruled list read as documentation, and
// wrapping it in the site's full-bleed panel didn't fix it. So there is no
// panel and no card here — the section follows two card sections already (the
// four-card grid and the three icon columns), and a third grid of boxes
// flattens the whole second half of the page into one texture.
//
// What carries it instead is the numerals: set large and in the row's hue, they
// give the section its scale contrast and are the only pigment in it. The claim
// column is a fixed measure so the four titles stack into a vertical edge that
// can be scanned without reading the bodies.
export function UseCaseReasons({ reasons }: Pick<UseCasePageContent, "reasons">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="max-w-[26ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
            {reasons.headline}
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-black/[0.09]">
          {reasons.items.map(({ title, body }, i) => (
            <Reveal key={title} delay={(i % 2) * 0.08}>
              {/* Both left columns are fixed rather than auto. At this size
                  "01" and "04" measure differently enough to shift the claim
                  column between rows, and the claim column is sized in rem
                  rather than ch because the titles are set at 22px while `ch`
                  resolves against the grid's 16px — 21ch looked ample and
                  wrapped "Predictable pricing that scales with you" to three
                  lines. Fixed on both keeps the scannable edge. */}
              <div className="grid items-baseline gap-x-8 gap-y-3 border-b border-black/[0.09] py-9 md:grid-cols-[5rem_minmax(0,17rem)_minmax(0,1fr)] md:gap-x-12 md:py-12 lg:gap-x-16">
                <span
                  className={cn(
                    "font-mono text-[clamp(2.5rem,3.2vw,3.25rem)] font-medium leading-[0.8] tracking-tight tabular-nums",
                    HUES[i % HUES.length],
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-balance text-[1.375rem] leading-snug">{title}</h3>
                <p className="max-w-[70ch] text-pretty leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
