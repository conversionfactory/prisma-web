import { IconTile } from "@/components/brand/icon-tile";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { RoleKicker } from "@/components/brand/role-kicker";
import { Github } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";

// "Report an issue" — a single bordered panel, so it reads as a distinct beat
// between the two card rows rather than a third row of cards. GitHub is the one
// place bugs and features are tracked, so both actions live together here.
//
// Bug -> new issue; feature -> a discussion (Prisma tracks feature requests as
// GitHub discussions). Confirm the exact destinations with André.
export function SupportReport() {
  return (
    <section className="bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-site">
        <Reveal>
          <div className="flex flex-col items-center gap-6 rounded-3xl border border-black/[0.06] bg-card px-6 py-12 text-center sm:px-12">
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
        </Reveal>
      </div>
    </section>
  );
}
