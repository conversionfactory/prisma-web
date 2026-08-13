import { GlassPrismSpin } from "@/components/brand/glass-prism-spin";
import { Pattern } from "@/components/brand/pattern";
import { Texture } from "@/components/brand/texture";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { UseCasePageContent } from "./types";

// Spectrum gradient matching the brand CTA glow (see prism-button.tsx).
const SPECTRUM =
  "linear-gradient(85deg, #01d7e4 0%, #f3c306 25%, #f37a03 50%, #f43531 74%, #f00e5c 100%)";

// One hue per differentiator, in the order the rest of the site runs them.
// Four over three, so the last comes back round to cyan — the same `% 3` cycle
// the hero checks and the closer use. The rule carries the colour and the
// numeral echoes it, which is as far as colour goes here: fills and pills stay
// reserved for buttons.
const HUES = [
  {
    rule: "from-prism-cyan-400 via-prism-cyan-400/50",
    numeral: "text-prism-cyan-500/25",
  },
  {
    rule: "from-prism-yellow-400 via-prism-yellow-400/50",
    numeral: "text-prism-yellow-500/30",
  },
  {
    rule: "from-prism-red-500 via-prism-red-500/50",
    numeral: "text-prism-red-500/25",
  },
];

// "Why teams choose Prisma for [use case]" — the fixed D4 differentiators.
//
// This was a plain ruled list first, and it read as documentation: white on
// white, hairlines, muted body, nothing at scale (André, 2026-08-13). It's the
// page's strongest claim, so it now takes the site's signature wrapped panel —
// spectral bottom, glass prism in the corner, grain — with the four claims as
// a 2x2 of numbered entries.
//
// Still card-less on purpose. It follows two card sections (the four-card grid
// and the three icon columns), and a third grid of boxes would flatten the
// whole second half of the page into one texture. The scale contrast comes
// from the numerals and the panel behind them instead of from more boxes.
export function UseCaseReasons({ reasons }: Pick<UseCasePageContent, "reasons">) {
  return (
    <section className="bg-white px-3 py-3 sm:px-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        {/* the wrapped panels' spectral bottom — wash + beam fan dispersing
            to white above, same values as hero-home.tsx */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] overflow-hidden"
        >
          <div
            className="absolute -bottom-1/3 left-1/2 h-[120%] w-[160%] -translate-x-1/2"
            style={{
              background: [
                "radial-gradient(52% 40% at 26% 100%, color-mix(in srgb, var(--color-prism-cyan-400) 32%, transparent), transparent 68%)",
                "radial-gradient(44% 36% at 52% 100%, color-mix(in srgb, var(--color-prism-yellow-300) 26%, transparent), transparent 66%)",
                "radial-gradient(48% 36% at 78% 100%, color-mix(in srgb, var(--color-prism-red-400) 32%, transparent), transparent 70%)",
              ].join(","),
            }}
          />
          <div className="absolute bottom-[-24rem] left-[12%] h-[60rem] w-40 origin-bottom rotate-[-26deg] bg-prism-cyan-300/50 blur-[72px]" />
          <div className="absolute bottom-[-26rem] left-1/2 h-[62rem] w-44 origin-bottom -translate-x-1/2 rotate-[4deg] bg-prism-yellow-200/60 blur-[80px]" />
          <div className="absolute bottom-[-28rem] right-[12%] h-[60rem] w-40 origin-bottom rotate-[26deg] bg-prism-red-300/50 blur-[72px]" />
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-t from-transparent via-white/60 to-white" />
        </div>
        {/* the brand cube pattern, greyscaled and faded out downward, so the
            top of the panel isn't flat white (comparison.tsx idiom) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035] grayscale [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
        >
          <Pattern className="h-full w-full" scale={3} />
        </div>
        {/* the glass prism rising out of the corner where the light
            concentrates behind it (stack-bento idiom) */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="absolute bottom-[-13rem] left-[-9rem] h-[30rem] w-[46rem] rounded-full opacity-25 blur-[90px]"
            style={{ backgroundImage: SPECTRUM }}
          />
          <GlassPrismSpin
            shape="triangle"
            tint="ink"
            period={26}
            initialAngle={1.4}
            className="bottom-[-5rem] left-[-11rem] w-[30rem] max-md:bottom-[-2.5rem] max-md:left-[-7rem] max-md:w-[16rem]"
          />
        </div>
        <Texture opacity={0.06} blend="multiply" />

        <div className="relative mx-auto max-w-site px-4 py-20 sm:px-8 sm:py-24">
          <Reveal>
            <h2 className="mx-auto max-w-[26ch] text-balance text-center text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1] max-md:text-left">
              {reasons.headline}
            </h2>
          </Reveal>

          <ul className="mt-16 grid gap-x-16 gap-y-14 md:grid-cols-2">
            {reasons.items.map(({ title, body }, i) => {
              const hue = HUES[i % HUES.length];
              return (
                <Reveal key={title} delay={(i % 2) * 0.1}>
                  <li>
                    {/* the rule states the hue full-strength at the numeral and
                        disperses to nothing across the entry, the way light
                        leaves the prism everywhere else on the site */}
                    <span
                      aria-hidden
                      className={cn("block h-px w-full bg-gradient-to-r to-transparent", hue.rule)}
                    />
                    <div className="mt-6 flex items-start gap-5">
                      <span
                        aria-hidden
                        className={cn(
                          "select-none font-mono text-[2.75rem] font-medium leading-[0.8] tracking-tight",
                          hue.numeral,
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-xl">{title}</h3>
                        <p className="mt-3 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground">
                          {body}
                        </p>
                      </div>
                    </div>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
