import { Reveal } from "@/components/motion/reveal";
import type { SegmentUseCaseContent } from "@/components/use-case/segment/types";
import { cn } from "@/lib/utils";

const HEADING = "text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]";
const DOTS = ["bg-prism-cyan-400", "bg-prism-yellow-400", "bg-prism-red-500", "bg-foreground/70"];

// "Who the Prisma Stack is best for" — a split list rather than another card
// grid, so it doesn't repeat the "When to use" cards directly above it. The
// heading and intro hold the left column; the four audiences run down the
// right as ruled rows, name beside description. The copy names no icons here.
export function BestFor({ bestFor }: { bestFor: SegmentUseCaseContent["builds"] }) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <h2 className={cn("max-w-[18ch]", HEADING)}>{bestFor.headline}</h2>
          </Reveal>
          {bestFor.intro ? (
            <Reveal delay={0.05}>
              <p className="mt-5 max-w-[46ch] text-pretty text-lg leading-relaxed text-muted-foreground">
                {bestFor.intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div role="list" className="border-b border-black/[0.08]">
          {bestFor.items.map(({ title, body }, i) => (
            <Reveal key={title} delay={i * 0.06}>
              <div role="listitem" className="grid gap-3 border-t border-black/[0.08] py-7 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-10">
                <h3 className="flex items-baseline gap-3 text-balance text-xl leading-snug">
                  <span
                    aria-hidden
                    className={cn("size-2 shrink-0 translate-y-[-0.1em] rounded-full", DOTS[i % 4])}
                  />
                  {title}
                </h3>
                <p className="text-pretty leading-relaxed text-muted-foreground">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
