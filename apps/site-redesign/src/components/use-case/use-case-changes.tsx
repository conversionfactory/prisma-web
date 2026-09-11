import { IconTile } from "@/components/brand/icon-tile";
import { PRODUCT_ICONS } from "@/components/product/icons";
import { Reveal } from "@/components/motion/reveal";
import type { UseCasePageContent } from "./types";

// "What changes when your stack is built to work together" — three icon
// columns in the /contact support-channel idiom (icon tile, heading, one
// paragraph, no CTA), which is the site's existing three-across pattern.
//
// Unwrapped and plain white on purpose: it sits between two wrapped panels
// (the four-card grid above, the closer below), so the white keeps the page
// from reading as one continuous panel — the same rhythm /pricing and
// /contact use.
export function UseCaseChanges({ changes }: Pick<UseCasePageContent, "changes">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="mx-auto max-w-[28ch] text-balance text-center text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1] max-md:text-left">
            {changes.headline}
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {changes.items.map(({ icon, title, body }, i) => {
            const Icon = PRODUCT_ICONS[icon];
            return (
              <Reveal key={title} delay={i * 0.1} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-card p-7">
                  <IconTile>
                    <Icon className="size-5 text-foreground" aria-hidden />
                  </IconTile>
                  <h3 className="mt-5 text-xl">{title}</h3>
                  <p className="mt-3 grow text-pretty leading-relaxed text-muted-foreground">
                    {body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
