import { Reveal } from "@/components/motion/reveal";
import type { UseCasePageContent } from "../types";

// Each row's rule carries one stop further through the spectrum than the row
// above it — white light entering at the first differentiator and fully
// dispersed by the last. The brand's central image used as a progress
// indicator rather than as decoration.
const RULES = [
  "linear-gradient(90deg, var(--color-prism-cyan-400) 0%, rgba(21,21,21,0.10) 26%, rgba(21,21,21,0.07) 100%)",
  "linear-gradient(90deg, var(--color-prism-cyan-400) 0%, var(--color-prism-yellow-400) 24%, rgba(21,21,21,0.10) 52%, rgba(21,21,21,0.07) 100%)",
  "linear-gradient(90deg, var(--color-prism-cyan-400) 0%, var(--color-prism-yellow-400) 26%, var(--color-prism-red-500) 52%, rgba(21,21,21,0.10) 78%, rgba(21,21,21,0.07) 100%)",
  "linear-gradient(90deg, var(--color-prism-cyan-400) 0%, var(--color-prism-yellow-400) 30%, var(--color-prism-red-500) 62%, #f00e5c 100%)",
];

// Option B — Dispersion.
//
// Unwrapped, no boxes. Four rows, each opening on a rule that runs one stop
// further into the spectrum than the last, so the section visibly resolves as
// you read down it and the fourth claim lands on full colour. Title and body
// sit side by side so each row stays one line of rhythm.
export function VariantDispersion({ reasons }: Pick<UseCasePageContent, "reasons">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="max-w-[26ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
            {reasons.headline}
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-12">
          {reasons.items.map(({ title, body }, i) => (
            <Reveal key={title} delay={(i % 2) * 0.08}>
              <div>
                <span
                  aria-hidden
                  className="block h-px w-full"
                  style={{ background: RULES[i % RULES.length] }}
                />
                <div className="mt-6 grid gap-3 md:grid-cols-[minmax(0,26ch)_minmax(0,1fr)] md:gap-12">
                  <h3 className="text-xl">{title}</h3>
                  <p className="max-w-[68ch] text-pretty leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
