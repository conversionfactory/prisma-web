import { Pattern } from "@/components/brand/pattern";
import { PrismButtonOutline } from "@/components/brand/prism-button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { UseCasePageContent } from "./types";

// Spectrum gradient matching the brand CTA glow (see prism-button.tsx).
const SPECTRUM =
  "linear-gradient(85deg, #01d7e4 0%, #f3c306 25%, #f37a03 50%, #f43531 74%, #f00e5c 100%)";

// One hue per step, in the cyan → yellow → red order every other surface on the
// site runs. Squared chips, not pills: `rounded-full` belongs to buttons, so a
// round tinted badge reads as a CTA (the same rule brand/marker.tsx follows).
// Shades are the "Public Beta" badge's — 50 fill, 200 hairline, 700 ink — which
// is the site's existing tinted-chip recipe.
const STEP_HUES = [
  "border-prism-cyan-200 bg-prism-cyan-50 text-prism-cyan-700",
  "border-prism-yellow-200 bg-prism-yellow-50 text-prism-yellow-700",
  "border-prism-red-200 bg-prism-red-50 text-prism-red-700",
];

// The robot animation André is supplying (2026-08-13). Reserved beside the
// headline, inside the card.
//
// When the asset lands, drop it in here. If it's the same character as
// brand/agent-robot.tsx, that component's rule applies — the agent means "your
// agent", so it appears once per page, and this is the section where the agent
// is the actor ("your agent reads logs, fixes what broke, and redeploys").
function RobotSlot() {
  return (
    <div
      aria-hidden
      className="flex size-32 shrink-0 items-center justify-center rounded-xl border border-dashed border-black/20 bg-white/70 p-3 text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        [Robot animation]
      </p>
    </div>
  );
}

// "Ship [outcome] in three steps" — the headline and the three steps together
// in one card. Deliberately plain: the section carries no illustration of its
// own, so it reads as the page's step-by-step and doesn't compete with the
// four-card grid below it.
export function UseCaseSteps({ steps }: Pick<UseCasePageContent, "steps">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal className="relative">
          {/* the brand's gradient shadow: a spectrum bloom sitting just outside
              the card's own edge, same treatment as the deploy cards in the
              homepage before/after — spread wider here for a card this size */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-[1.5rem] opacity-25 blur-[32px]"
            style={{ backgroundImage: SPECTRUM }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-card p-8 shadow-[0_1px_2px_rgba(21,21,21,0.04),0_16px_32px_-12px_rgba(21,21,21,0.10)] sm:p-12">
            {/* the brand cube pattern, greyscaled and masked so it reads at the
                top of the card and is fully covered by the time it reaches the
                steps (comparison.tsx idiom) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.05] grayscale [mask-image:linear-gradient(to_bottom,black,transparent_55%)]"
            >
              <Pattern className="h-full w-full" scale={2.5} />
            </div>

            <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <h2 className="max-w-[24ch] text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
                {steps.headline}
              </h2>
              <RobotSlot />
            </div>

            <div className="relative mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.items.map(({ step, name, body }, i) => (
                <div key={step}>
                  <div className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-lg border text-lg font-semibold",
                        STEP_HUES[i % STEP_HUES.length],
                      )}
                    >
                      {step}
                    </span>
                    <h3 className="text-xl">{name}</h3>
                  </div>
                  <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>

            <div className="relative mt-12 flex">
              <PrismButtonOutline href={steps.cta.href}>{steps.cta.label}</PrismButtonOutline>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
