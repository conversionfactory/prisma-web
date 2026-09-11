import { Mail } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";

// The closer, verbatim from the approved copy. Reuses the exact email-note
// treatment from /contact's ContactSupport — same rounded card, Mail glyph and
// spectrum-ink link — so the two pages land on the same final beat.
export function SupportStillStuck() {
  return (
    <section className="bg-white px-4 pb-28 pt-14 sm:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
            Still stuck?
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-pretty leading-relaxed text-muted-foreground">
            If you can&apos;t find what you need, email us and we&apos;ll point you in the right
            direction.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-center justify-center gap-2.5 rounded-2xl border border-black/[0.06] bg-card px-6 py-5 font-semibold">
            <Mail className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            <span>
              Email us at{" "}
              <a
                href="mailto:support@prisma.io"
                className="spectrum-ink underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-transparent"
              >
                support@prisma.io
              </a>
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
