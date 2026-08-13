import { Reveal } from "@/components/motion/reveal";
import type { UseCasePageContent } from "./types";

// The numeral is drawn rather than set at a type size, so it fills the height
// it's given instead of being tied to a font-size.
//
// The viewBox is Inter's own metrics: tabular figures sit on a 0.56em advance
// with a 0.727em cap height, so two digits occupy 112 x 72.7 at this font size,
// with the baseline at y=72.7. The 6-unit margin around that box is
// load-bearing — round digits (0, 3, 8) overshoot the cap height and the
// baseline by about a percent of the em, and a viewBox that hugged the cap box
// exactly clipped the tops and bottoms off 01, 03 and 04.
const PAD = 6;
const GLYPH_W = 112;
const BASELINE = 72.7;

function LedgerNumeral({ value }: { value: string }) {
  return (
    <svg
      viewBox={`${-PAD} ${-PAD} ${GLYPH_W + PAD * 2} ${BASELINE + PAD * 2}`}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
      focusable="false"
      className="absolute inset-0 size-full text-black/[0.07]"
    >
      <text
        x="0"
        y={BASELINE}
        fill="currentColor"
        fontSize="100"
        fontWeight="500"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {value}
      </text>
    </svg>
  );
}

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
// What carries it instead is the numerals, set large and in ink at 7%. They
// were briefly in the brand hues and it was too much colour for a section that
// is otherwise all type — the size is doing the work, so the colour doesn't
// have to.
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
              {/* Both left columns are fixed width. The numeral column has to
                  be, because the numerals are sized by their row and an auto
                  column would then shift the claim column row to row; the claim
                  column is in rem rather than ch because the titles are set at
                  22px while `ch` resolves against the grid's 16px. Fixed on
                  both keeps the four titles stacked into a scannable edge. */}
              <div className="grid items-stretch gap-x-8 gap-y-4 border-b border-black/[0.09] py-9 md:grid-cols-[11rem_minmax(0,16rem)_minmax(0,1fr)] md:gap-x-12 md:py-12 lg:gap-x-16">
                {/* Fixed height, not the row's. Sizing each numeral to its own
                    row made 03 — the longest claim, five lines of evidence —
                    visibly larger than the rest, which read as a mistake rather
                    than as weight. One height for all four, and the rows keep
                    their natural depth underneath. */}
                <div className="relative h-14 md:h-[7.5rem]">
                  <LedgerNumeral value={String(i + 1).padStart(2, "0")} />
                </div>
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
