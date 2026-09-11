import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { UseCasePageContent } from "../types";

const HUES = ["bg-prism-cyan-400", "bg-prism-yellow-400", "bg-prism-red-500"];

// Option E — The Statement.
//
// The claims set at headline scale rather than as body copy with a heading on
// top: each title reads as an assertion the page is making, with the evidence
// demoted underneath it. Quartered by hairlines only — no cards, no fills, no
// containers. The most confident of the five, and the one that depends most on
// the titles being good.
export function VariantStatement({ reasons }: Pick<UseCasePageContent, "reasons">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="max-w-[26ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1] text-muted-foreground">
            {reasons.headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2">
          {reasons.items.map(({ title, body }, i) => (
            <Reveal
              key={title}
              delay={(i % 2) * 0.08}
              className={cn(
                "border-t border-black/[0.09] py-10 md:py-12",
                // inner gutters, so the hairlines read as one cross through
                // the block rather than as four separate boxes
                i % 2 === 0 ? "md:pr-14" : "md:border-l md:pl-14",
              )}
            >
              <div>
                <span
                  aria-hidden
                  className={cn("block h-1 w-8 rounded-full", HUES[i % HUES.length])}
                />
                <h3 className="mt-6 max-w-[18ch] text-balance text-[clamp(1.5rem,2.1vw,1.875rem)] leading-[1.15]">
                  {title}
                </h3>
                <p className="mt-4 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground">
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
