import { IconTile } from "@/components/brand/icon-tile";
import { Pattern } from "@/components/brand/pattern";
import { ArrowRight, Bot, CheckBold, Code, Console, Database, LayoutGrid, Rocket, Server, X } from "@/components/icons/forma";
import { ProductFeatures } from "@/components/product/product-features";
import { ProductNarrative } from "@/components/product/product-narrative";
import type { ProductIllustrationName } from "@/components/product/illustrations";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import { AgentToolchain } from "./agent-toolchain";
import { DeployLoopTerminal } from "./deploy-loop-terminal";
import type { AgentUseCaseContent } from "./content";

// The AI & Agents page's own sections. Each is a deliberately different layout
// archetype so the page reads as designed, not assembled — an illustrated
// narrative, a numbered ledger, an asymmetric split, the product feature grid,
// a running terminal, a before→after transformation, a card row. No two adjacent
// sections share a shape, and icons are never reused across sections (per the
// site's design guidelines). Where a section is anchored by a visual, it reuses
// the product pages' own abstractions (the feature cards) or builds a first-
// class one (the toolchain diagram, the deploy-loop terminal). Shared sections
// (hero, logo strip, testimonials, closer) are composed in ai-agents-page.tsx.

const HEADING = "text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]";
const SPECTRUM = "linear-gradient(85deg,#01d7e4,#f3c306 25%,#f37a03 50%,#f43531 74%,#f00e5c)";

// "What Prisma is for AI agents" — the /orm "argue one point with a visual"
// pattern (ProductNarrative): the headline and copy on the left, a purpose-built
// 1:1 abstraction on the right — Prismo at the centre of one connected toolchain
// (schema, database, hosting, CLI), which is exactly what the copy argues. The
// lede leads the paragraphs, so all three lines are kept.
export function AgentIntro({ intro }: Pick<AgentUseCaseContent, "intro">) {
  return (
    <ProductNarrative
      headline={intro.headline}
      paragraphs={[intro.lede, ...intro.body]}
      illustration={
        <div className="mx-auto w-full max-w-md lg:my-auto">
          <AgentToolchain />
        </div>
      }
    />
  );
}

// "When to use Prisma for agent-driven apps" — a numbered ledger. The copy's
// four titles share the anaphora "Use Prisma when your agent needs…"; a ruled
// index/claim/detail ledger turns that repetition into a scannable edge, and
// keeps this section type-driven so it doesn't read as another card grid.
export function AgentWhen({ when }: Pick<AgentUseCaseContent, "when">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className={cn("max-w-[26ch]", HEADING)}>{when.headline}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-[62ch] text-pretty text-lg leading-relaxed text-muted-foreground">
            {when.intro}
          </p>
        </Reveal>

        <div className="mt-14 border-t border-black/[0.09]">
          {when.items.map(({ title, body }, i) => (
            <Reveal key={title} delay={(i % 2) * 0.08}>
              <div className="grid items-baseline gap-x-8 gap-y-2 border-b border-black/[0.09] py-8 md:grid-cols-[5rem_minmax(0,22rem)_minmax(0,1fr)] md:gap-x-12 md:py-10">
                <span
                  aria-hidden
                  className="select-none font-medium leading-none tabular-nums text-[clamp(2.5rem,4vw,3.5rem)] text-black/[0.12]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-balance text-xl leading-snug">{title}</h3>
                <p className="max-w-[64ch] text-pretty leading-relaxed text-muted-foreground">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// "Is Prisma the right fit for AI and agents?" — an asymmetric split, not two
// equal boxes. The affirmative is promoted: wider, elevated, spectrum-edged,
// set larger. The honest caveat sits beside it, plain and muted — present, but
// visibly the secondary voice.
export function AgentFit({ fit }: Pick<AgentUseCaseContent, "fit">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className={cn("max-w-[26ch]", HEADING)}>{fit.headline}</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-[1.15fr_0.85fr]">
          <Reveal delay={0.05} className="h-full">
            <div className="spectrum-border spectrum-border-on relative flex h-full flex-col justify-center overflow-hidden rounded-[1.25rem] border border-transparent bg-white p-8 shadow-[0_1px_2px_rgba(21,21,21,0.04),0_20px_40px_-16px_rgba(21,21,21,0.12)] sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05] grayscale [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
              >
                <Pattern className="h-full w-full" scale={2.5} />
              </div>
              <CheckBold className="relative size-7 text-prism-cyan-500" aria-hidden />
              <p className="relative mt-5 text-pretty text-[clamp(1.25rem,2vw,1.625rem)] font-medium leading-snug text-foreground">
                {fit.suited}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-[1.25rem] border border-black/[0.08] bg-muted/40 p-8 sm:p-10">
              <X className="size-6 text-foreground/30" strokeWidth={3} aria-hidden />
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{fit.caveat}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// "A stack built for agents to drive end to end" — the four layers as the
// product pages' own feature grid (ProductFeatures): a wrapped prismatic panel
// of ray-photo cards, each carrying the real abstraction that product page
// shows — the schema file, the database panel, the co-located app, the deploy
// log. Reusing the component (not a copy) keeps this page in lockstep with
// /orm, /postgres and /compute.
const STACK_ILLUSTRATIONS: ProductIllustrationName[] = [
  "schemaFile",
  "databasePanel",
  "coLocated",
  "deployLog",
];
export function AgentStack({ stack }: Pick<AgentUseCaseContent, "stack">) {
  return (
    <ProductFeatures
      features={{
        headline: stack.headline,
        bridge: stack.intro,
        items: stack.items.map((item, i) => ({
          name: item.title,
          description: item.body,
          illustration: STACK_ILLUSTRATIONS[i],
        })),
      }}
      // four cards run two-up, where the default block leaves them squat
      mediaHeight="h-[22rem]"
    />
  );
}

// "Where can I deploy my agent-built TypeScript app?" — the loop, running. The
// terminal cycles build → deploy → debug → redeploy on its own (see
// deploy-loop-terminal.tsx), so the section shows the animation the doc asked
// for rather than describing it. The doc's animation note is carried as the
// terminal's accessible label, so nothing is lost. Intro and body copy frame it.
export function AgentDeploy({ deploy }: Pick<AgentUseCaseContent, "deploy">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className={cn("max-w-[26ch]", HEADING)}>{deploy.headline}</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-[64ch] text-pretty text-lg leading-relaxed text-muted-foreground">
            {deploy.intro}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12 overflow-hidden rounded-2xl border border-black/[0.06] bg-card p-6 shadow-[0_1px_2px_rgba(21,21,21,0.04),0_24px_48px_-20px_rgba(21,21,21,0.14)] sm:p-10">
            {/* spectrum bloom low in the card, the deploy glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 left-1/2 h-56 w-[42rem] max-w-full -translate-x-1/2 rounded-full opacity-20 blur-[80px]"
              style={{ backgroundImage: SPECTRUM }}
            />
            <div className="relative mx-auto max-w-2xl">
              <DeployLoopTerminal label={deploy.animationLabel} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-[70ch] text-pretty text-lg leading-relaxed text-muted-foreground">
            {deploy.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// "How Prisma compares to stitched-together stacks" — a single left→right
// transformation, so it reads differently from the two-card Fit section above.
// One panel: on the left the five separate tools scattered and disconnected; a
// gradient seam with an arrow through the middle; on the right they collapse
// into one connected layer. The seam is the whole point — the same pieces,
// stitched vs unified.
const STITCHED_ICONS = [Database, Code, Server, Console, Rocket];
export function AgentCompare({ compare }: Pick<AgentUseCaseContent, "compare">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className={cn("max-w-[24ch]", HEADING)}>{compare.headline}</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative mt-12 grid overflow-hidden rounded-[1.5rem] border border-black/[0.08] bg-card lg:grid-cols-[1fr_auto_1fr]">
            {/* before — separate tools, scattered and muted */}
            <div className="flex flex-col gap-8 bg-muted/30 p-8 sm:p-10">
              <div className="flex flex-wrap gap-2.5">
                {STITCHED_ICONS.map((Icon, i) => (
                  <span
                    key={i}
                    aria-hidden
                    className={cn(
                      "flex size-11 items-center justify-center rounded-xl border border-dashed border-black/15 bg-white/70",
                      i % 2 === 0 ? "translate-y-0" : "translate-y-2",
                    )}
                  >
                    <Icon className="size-5 text-foreground/40" />
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <X className="mt-1 size-5 shrink-0 text-foreground/35" strokeWidth={3} aria-hidden />
                <p className="text-pretty leading-relaxed text-muted-foreground">{compare.before}</p>
              </div>
            </div>

            {/* the seam — the transformation, an arrow riding the spectrum */}
            <div className="relative flex items-center justify-center bg-white max-lg:h-14 max-lg:w-full lg:w-16">
              <span
                aria-hidden
                className="absolute bg-gradient-to-b from-prism-cyan-300 via-prism-yellow-300 to-prism-red-400 max-lg:inset-x-0 max-lg:top-1/2 max-lg:h-px max-lg:bg-gradient-to-r lg:inset-y-0 lg:left-1/2 lg:w-px"
              />
              <span className="relative flex size-9 items-center justify-center rounded-full border border-border bg-card shadow-[0_8px_20px_-8px_rgba(21,21,21,0.3)]">
                <ArrowRight className="size-4 text-foreground/70 max-lg:rotate-90" aria-hidden />
              </span>
            </div>

            {/* after — one connected layer, spectrum-lit */}
            <div className="relative flex flex-col gap-8 overflow-hidden p-8 sm:p-10">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05] grayscale [mask-image:linear-gradient(to_bottom,black,transparent_60%)]"
              >
                <Pattern className="h-full w-full" scale={2.5} />
              </div>
              <div className="relative flex h-11 items-center gap-1 self-start rounded-xl border border-prism-cyan-200 bg-white px-3 shadow-sm">
                {STITCHED_ICONS.map((Icon, i) => (
                  <Icon key={i} className="size-5 text-foreground/70" aria-hidden />
                ))}
              </div>
              <div className="relative flex gap-3">
                <CheckBold className="mt-1 size-5 shrink-0 text-prism-cyan-500" aria-hidden />
                <p className="text-pretty font-medium leading-relaxed text-foreground">
                  {compare.after}
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// "What agents can build with Prisma" — three build types in the site's own
// card idiom (the /postgres "ships with the rest of your stack" tiles): an icon
// tile, a heading, a line of copy, a quiet border. One distinct icon each —
// internal tools, an AI product, a prototype to launch.
const BUILD_ICONS = [LayoutGrid, Bot, Rocket];
export function AgentBuilds({ builds }: Pick<AgentUseCaseContent, "builds">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className={cn("max-w-[24ch]", HEADING)}>{builds.headline}</h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {builds.items.map(({ title, body }, i) => {
            const Icon = BUILD_ICONS[i % BUILD_ICONS.length];
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
