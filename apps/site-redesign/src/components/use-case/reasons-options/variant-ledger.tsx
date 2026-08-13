import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { UseCasePageContent } from "../types";

const HUES = ["bg-prism-cyan-400", "bg-prism-yellow-400", "bg-prism-red-500"];

// Option A — The Ledger.
//
// No boxes at all. Four full-width ruled rows, read like a spec sheet: index,
// claim, evidence. The claim column is fixed so the four titles stack into a
// vertical edge you can scan without reading the bodies. Colour is a single
// short tick against the index — the section's only pigment.
export function VariantLedger({ reasons }: Pick<UseCasePageContent, "reasons">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="max-w-[26ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
            {reasons.headline}
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-black/[0.09]">
          {reasons.items.map(({ title, body }, i) => (
            <Reveal key={title} delay={(i % 2) * 0.08}>
              <div className="grid gap-3 border-b border-black/[0.09] py-8 md:grid-cols-[auto_minmax(0,24ch)_minmax(0,1fr)] md:items-baseline md:gap-12 md:py-10">
                <span className="flex items-center gap-2.5 font-mono text-sm text-muted-foreground">
                  <span aria-hidden className={cn("h-3 w-0.5 shrink-0", HUES[i % HUES.length])} />
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl">{title}</h3>
                <p className="max-w-[68ch] text-pretty leading-relaxed text-muted-foreground">
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
