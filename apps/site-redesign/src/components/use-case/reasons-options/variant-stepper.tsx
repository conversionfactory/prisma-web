"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { UseCasePageContent } from "../types";

const HUES = ["bg-prism-cyan-400", "bg-prism-yellow-400", "bg-prism-red-500"];

// Option D — The Stepper.
//
// The four claims as a rail you pick through, one body shown at a time. Turns
// the longest section on the page into its shortest: four titles are scannable
// in a glance, and the evidence only appears for the one you're on. The
// selected row is marked by its dot and by weight — no fill, no pill.
//
// Trade-off worth naming: three of the four bodies are hidden at rest, which
// costs the page some scannable proof for anyone skimming.
export function VariantStepper({ reasons }: Pick<UseCasePageContent, "reasons">) {
  const [active, setActive] = useState(0);
  const current = reasons.items[active];

  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="max-w-[26ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
            {reasons.headline}
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-14 grid gap-10 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] md:gap-16"
        >
          <ul className="flex flex-col">
            {reasons.items.map(({ title }, i) => (
              <li key={title}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  aria-current={i === active || undefined}
                  className={cn(
                    "flex w-full cursor-pointer items-center gap-4 border-b border-black/[0.09] py-5 text-left transition-colors duration-300 first:border-t",
                    i === active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "size-2 shrink-0 rounded-full transition-all duration-300",
                      i === active ? HUES[i % HUES.length] : "bg-foreground/15",
                    )}
                  />
                  <span
                    className={cn(
                      "text-xl transition-[font-weight]",
                      i === active && "font-semibold",
                    )}
                  >
                    {title}
                  </span>
                </button>
              </li>
            ))}
          </ul>

          <div className="md:pt-5">
            <p
              // keyed so the paragraph re-enters rather than swapping in place
              key={active}
              className="max-w-[56ch] text-pretty text-lg leading-relaxed text-muted-foreground duration-500 animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none"
            >
              {current.body}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
