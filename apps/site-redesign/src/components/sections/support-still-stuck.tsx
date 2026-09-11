import { PrismButtonOutline } from "@/components/brand/prism-button";
import { Mail } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";

// The closer, verbatim from the approved copy. Ends on a single centred email
// action — the brand outline pill rather than a full-width bordered bar (that
// treatment belongs beside a row of cards, as on /contact; standing alone here
// it read as an empty box).
export function SupportStillStuck() {
  return (
    <section className="bg-white px-4 pb-28 pt-14 sm:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <h2 className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
            Still stuck?
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground">
            If you can&apos;t find what you need, email us and we&apos;ll point you in the right
            direction.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <PrismButtonOutline href="mailto:support@prisma.io">
            <span className="inline-flex items-center gap-2">
              <Mail className="size-4" aria-hidden />
              Email support@prisma.io
            </span>
          </PrismButtonOutline>
        </Reveal>
      </div>
    </section>
  );
}
