import { IconTile } from "@/components/brand/icon-tile";
import { Pattern } from "@/components/brand/pattern";
import { Bot, CheckCircle, Layers, Shield } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { UseCasePageContent } from "../types";

// The D4 are a fixed set in a fixed order (see types.ts), so the glyph and the
// tile's weight are positional rather than content — integration, agents,
// pricing, trust.
const TILES = [
  { Icon: Layers, span: "md:col-span-3", lead: true },
  { Icon: Bot, span: "md:col-span-2" },
  { Icon: Shield, span: "md:col-span-2" },
  { Icon: CheckCircle, span: "md:col-span-3" },
];

// Option C — The Bento.
//
// Tiles, but deliberately unequal: the integration claim and the trust claim
// take the wide slots, the other two the narrow ones, so the row reads as a
// composition instead of a grid of four identical boxes. The lead tile carries
// the cube pattern, which is what marks it as the one that matters.
export function VariantBento({ reasons }: Pick<UseCasePageContent, "reasons">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="mx-auto max-w-[26ch] text-balance text-center text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1] max-md:text-left">
            {reasons.headline}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-5">
          {reasons.items.map(({ title, body }, i) => {
            const { Icon, span, lead } = TILES[i % TILES.length];
            return (
              <Reveal key={title} delay={(i % 2) * 0.1} className={cn("h-full", span)}>
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-card p-8">
                  {lead ? (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-[0.05] grayscale [mask-image:linear-gradient(to_bottom,black,transparent_65%)]"
                    >
                      <Pattern className="h-full w-full" scale={2.5} />
                    </div>
                  ) : null}
                  <div className="relative">
                    <IconTile>
                      <Icon className="size-5 text-foreground" aria-hidden />
                    </IconTile>
                    <h3 className="mt-5 text-xl">{title}</h3>
                    <p className="mt-3 max-w-[58ch] text-pretty leading-relaxed text-muted-foreground">
                      {body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
