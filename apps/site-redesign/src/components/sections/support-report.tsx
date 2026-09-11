import { IconTile } from "@/components/brand/icon-tile";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { RoleKicker } from "@/components/brand/role-kicker";
import { Texture } from "@/components/brand/texture";
import { Github } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";

// "Report an issue" — the page's CTA beat, so it carries the brand's CTA
// treatment rather than a flat card: the hero's spectral bottom (wash + beam
// fan dispersing to white) with a glass prism catching the light in the
// corner, the same idiom as CtaBurst. GitHub is the one place bugs and features
// are tracked, so both actions live together here.
//
// Bug -> new issue; feature -> a discussion (Prisma tracks feature requests as
// GitHub discussions). Confirm the exact destinations with André.
export function SupportReport() {
  return (
    <section className="bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-site">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.06] bg-white">
            {/* spectral bottom — wash + beam fan dispersing to white above,
                same values as the hero panel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[26rem] overflow-hidden"
            >
              <div
                className="absolute -bottom-1/3 left-1/2 h-[120%] w-[160%] -translate-x-1/2"
                style={{
                  background: [
                    "radial-gradient(52% 44% at 28% 100%, color-mix(in srgb, var(--color-prism-cyan-400) 32%, transparent), transparent 70%)",
                    "radial-gradient(44% 38% at 52% 100%, color-mix(in srgb, var(--color-prism-yellow-300) 24%, transparent), transparent 66%)",
                    "radial-gradient(48% 40% at 74% 100%, color-mix(in srgb, var(--color-prism-red-400) 28%, transparent), transparent 70%)",
                  ].join(","),
                }}
              />
              <div className="absolute bottom-[-22rem] left-[14%] h-[52rem] w-40 origin-bottom rotate-[-26deg] bg-prism-cyan-300/50 blur-[80px]" />
              <div className="absolute bottom-[-24rem] left-1/2 h-[54rem] w-44 origin-bottom -translate-x-1/2 rotate-[5deg] bg-prism-yellow-200/55 blur-[80px]" />
              <div className="absolute bottom-[-26rem] right-[12%] h-[52rem] w-40 origin-bottom rotate-[26deg] bg-prism-red-300/50 blur-[80px]" />
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-t from-transparent via-white/50 to-white" />
            </div>

            <Texture opacity={0.06} blend="multiply" />

            <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-12 sm:py-20">
              <IconTile className="size-14">
                <Github className="size-6 text-foreground" aria-hidden />
              </IconTile>
              <div className="flex flex-col items-center gap-3">
                <RoleKicker color="bg-prism-red-500">Report an issue</RoleKicker>
                <h2 className="text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]">
                  Found a bug or want a feature?
                </h2>
                <p className="max-w-[52ch] text-pretty leading-relaxed text-muted-foreground">
                  Report bugs and request features on GitHub, where our team and the community track
                  them in the open.
                </p>
              </div>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <PrismButton href="https://github.com/prisma/prisma/issues/new/choose">
                  Report a bug
                </PrismButton>
                <PrismButtonOutline href="https://github.com/prisma/prisma/discussions/new?category=ideas">
                  Request a feature
                </PrismButtonOutline>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
