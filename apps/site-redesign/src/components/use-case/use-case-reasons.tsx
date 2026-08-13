import { Reveal } from "@/components/motion/reveal";
import type { UseCasePageContent } from "./types";

// The numeral is drawn rather than set at a type size, so it fills the height
// it's given instead of being tied to a font-size.
//
// The viewBox has to be the glyph's box, and anything outside it is clipped.
// These numbers are measured from the rendered text (getComputedTextLength and
// getBBox at this font size), not taken from a spec sheet — two guesses at
// Inter's metrics both clipped: 0.56em per digit lost the right edge of the
// second digit, and a box that hugged the cap height exactly lost the tops and
// bottoms of the round ones.
//
// `textLength` pins the advance rather than trusting it, so a fallback font
// while Inter loads, or a weight change, can't push the glyph back out of the
// box. `lengthAdjust="spacing"` moves the digits apart, never distorts them.
const PAD = 8;
/** Measured: two tabular digits advance 129.54 at font-size 100. */
const GLYPH_W = 130;
/** Measured: Inter's cap height, and so the baseline with the cap top at y=0. */
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
        textLength={GLYPH_W}
        lengthAdjust="spacing"
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
              {/* 13rem, not 11: the numeral's box is 146 x 88.7 and it scales
                  to fit, so a column any narrower than ~198px makes width the
                  limit and the numerals stop reaching their full height. */}
              <div className="grid items-stretch gap-x-8 gap-y-4 border-b border-black/[0.09] py-9 md:grid-cols-[13rem_minmax(0,16rem)_minmax(0,1fr)] md:gap-x-12 md:py-12 lg:gap-x-16">
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
