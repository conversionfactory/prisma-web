import { GlassGlide } from "@/components/brand/glass-glide";
import { IconTile } from "@/components/brand/icon-tile";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { PrismRay } from "@/components/brand/prism-ray";
import { RoleKicker } from "@/components/brand/role-kicker";
import { Texture } from "@/components/brand/texture";
import { Bot, CheckBold, Code, Console, Database, Server } from "@/components/icons/forma";
import { cn } from "@/lib/utils";
import type { AgentUseCaseContent } from "./content";

type Hero = AgentUseCaseContent["hero"];

const CHECK_COLORS = ["text-prism-cyan-500", "text-prism-yellow-400", "text-prism-red-500"];

function Headline({ headline, emphasis }: { headline: string; emphasis?: string }) {
  const at = emphasis ? headline.indexOf(emphasis) : -1;
  if (!emphasis || at === -1) return <>{headline}</>;
  return (
    <>
      {headline.slice(0, at)}
      <GlassGlide>{emphasis}</GlassGlide>
      {headline.slice(at + emphasis.length)}
    </>
  );
}

// The AI-agents hero. Copy on the left; on the right, a purpose-built agent
// console that fills the full height of the copy column (no reused homepage
// abstraction, no floating card in dead space). Subheadline is 16px per the
// approved proportion (André, 2026-08-26).
export function AgentHero({ name, hero }: { name: string; hero: Hero }) {
  const paras = Array.isArray(hero.subheadline) ? hero.subheadline : [hero.subheadline];
  return (
    <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        {/* spectral bottom — same values as the site hero */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] overflow-hidden"
        >
          <div
            className="absolute -bottom-1/3 left-1/2 h-[120%] w-[160%] -translate-x-1/2"
            style={{
              background: [
                "radial-gradient(52% 40% at 30% 100%, color-mix(in srgb, var(--color-prism-cyan-400) 34%, transparent), transparent 68%)",
                "radial-gradient(44% 36% at 52% 100%, color-mix(in srgb, var(--color-prism-yellow-300) 26%, transparent), transparent 66%)",
                "radial-gradient(42% 30% at 74% 100%, color-mix(in srgb, var(--color-prism-red-400) 28%, transparent), transparent 68%)",
              ].join(","),
            }}
          />
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-t from-transparent via-white/60 to-white" />
        </div>
        <Texture opacity={0.06} blend="multiply" />

        <div className="relative px-4 sm:px-8">
          {/* items-stretch so the console fills the height the copy sets */}
          <div className="mx-auto grid max-w-site items-stretch gap-12 pb-20 pt-36 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:pb-28 md:pt-44 lg:gap-16">
            {/* copy */}
            <div className="flex flex-col items-start justify-center">
              <RoleKicker color="bg-prism-cyan-400">{name}</RoleKicker>
              <h1 className="isolate mt-4 max-w-[min(16ch,100%)] text-balance text-[clamp(2.25rem,3.2vw,2.875rem)] leading-[1.08]">
                <Headline headline={hero.headline} emphasis={hero.headlineEmphasis} />
              </h1>
              {paras.map((para, i) => (
                <p
                  key={i}
                  className={cn(
                    "max-w-[46ch] text-pretty text-base leading-relaxed text-muted-foreground",
                    i === 0 ? "mt-5" : "mt-4",
                  )}
                >
                  {para}
                </p>
              ))}
              <ul className="mt-7 flex flex-col gap-2.5">
                {hero.benefits.map((label, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[0.9375rem] font-semibold text-foreground"
                  >
                    <CheckBold
                      className={cn("mt-0.5 size-4 shrink-0", CHECK_COLORS[i % 3])}
                      aria-hidden
                    />
                    {label}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PrismButton href={hero.primaryCta.href} size="lg">
                  {hero.primaryCta.label}
                </PrismButton>
                <PrismButtonOutline href={hero.secondaryCta.href} size="lg">
                  {hero.secondaryCta.label}
                </PrismButtonOutline>
              </div>
            </div>

            {/* the console: fills the column, top aligned with the kicker */}
            <div className="relative min-w-0 self-stretch max-md:mt-2">
              <PrismRay
                className="left-[75%] top-1/2 h-12 w-[32rem] -translate-x-1/2 -translate-y-1/2 md:h-24 md:w-[64rem]"
                angle={-50}
                intensity="hero"
              />
              <div className="relative flex h-full max-md:aspect-[4/5]">
                <AgentConsole />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const STACK = [
  { Icon: Code, label: "Schema", meta: "prisma/schema.prisma" },
  { Icon: Database, label: "Postgres", meta: "db.prisma.io · us-west-1" },
  { Icon: Server, label: "Compute", meta: "web · api · worker" },
  { Icon: Console, label: "CLIs & Management API", meta: "provision · deploy · logs" },
];

// The agent operating the whole Prisma stack: an agent header, the four pieces
// as connected cards down a spectrum spine (each with the real filename/target
// it maps to), and the command line it drives them from — sized to fill the
// hero panel top to bottom.
function AgentConsole() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-card shadow-[0_1px_2px_rgba(21,21,21,0.04),0_24px_48px_-24px_rgba(21,21,21,0.14)]">
      {/* chrome */}
      <div className="flex items-center gap-2 border-b border-border/70 px-5 py-3.5">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 font-mono text-xs text-foreground">agent — prisma</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-prism-cyan-100 px-2 py-0.5 text-[0.625rem] font-semibold text-prism-cyan-800">
          <span className="size-1.5 animate-status-pulse rounded-full bg-prism-cyan-400 motion-reduce:animate-none" />
          running
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-5">
        {/* the agent's prompt */}
        <div className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(21,21,21,0.04)]">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white shadow-sm">
            <Bot className="size-4 text-foreground" aria-hidden />
          </span>
          <span className="flex flex-1 flex-col gap-1.5">
            <span className="h-2 w-3/4 rounded-full bg-foreground/12" />
            <span className="h-2 w-1/2 rounded-full bg-foreground/[0.08]" />
          </span>
        </div>

        {/* the four pieces, connected on a spectrum spine, filling the body */}
        <div className="relative flex min-h-0 flex-1 flex-col gap-3">
          <span
            aria-hidden
            className="absolute bottom-6 left-[2.4rem] top-6 w-px bg-gradient-to-b from-prism-cyan-300 via-prism-yellow-300 to-prism-red-400"
          />
          {STACK.map(({ Icon, label, meta }) => (
            <div
              key={label}
              className="relative flex flex-1 flex-col justify-center gap-2 rounded-xl border border-black/[0.06] bg-white px-3.5 py-3 shadow-[0_1px_2px_rgba(21,21,21,0.04)]"
            >
              <div className="flex items-center gap-3">
                <IconTile className="size-9">
                  <Icon className="size-4 text-foreground" aria-hidden />
                </IconTile>
                <span className="text-sm font-medium text-foreground">{label}</span>
                <CheckBold className="ml-auto size-4 shrink-0 text-prism-cyan-500" aria-hidden />
              </div>
              <div className="pl-[3rem] font-mono text-[0.6875rem] text-muted-foreground">
                {meta}
              </div>
            </div>
          ))}
        </div>

        {/* the command line the agent drives it from */}
        <div className="flex items-center gap-2 rounded-xl border border-border bg-primary px-3.5 py-3 font-mono text-[0.75rem] text-primary-foreground">
          <span className="text-prism-cyan-400">$</span>
          <span>prisma deploy</span>
          <span
            aria-hidden
            className="inline-block h-3.5 w-[0.4rem] animate-caret-blink bg-prism-cyan-400 motion-reduce:animate-none"
          />
        </div>
      </div>
    </div>
  );
}
