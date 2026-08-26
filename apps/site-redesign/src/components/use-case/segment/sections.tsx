import { GlassGlide } from "@/components/brand/glass-glide";
import { IconTile } from "@/components/brand/icon-tile";
import { Pattern } from "@/components/brand/pattern";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { PrismRay } from "@/components/brand/prism-ray";
import { RoleKicker } from "@/components/brand/role-kicker";
import { Texture } from "@/components/brand/texture";
import { CheckBold, X } from "@/components/icons/forma";
import { PRODUCT_ICONS } from "@/components/product/icons";
import { ProductNarrative } from "@/components/product/product-narrative";
import type { ProductPageContent } from "@/components/product/types";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";
import type { SegmentUseCaseContent } from "./types";

// Shared sections for the audience use-case pages — the same idioms as the
// AI-agents page (hero with a full-height visual, an illustrated narrative,
// icon-card grids, an asymmetric fit split, card rows), generalised to take
// per-page content and abstractions. The comparison table is its own file.

const HEADING = "text-balance text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1]";
const CHECK_COLORS = ["text-prism-cyan-500", "text-prism-yellow-400", "text-prism-red-500"];

type Hero = ProductPageContent["hero"];

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

// The hero: copy left, a purpose-built visual filling the column on the right
// (same proportion as the AI-agents hero — 16px subhead, items-stretch so the
// visual is the full height of the copy).
export function SegmentHero({
  name,
  hero,
  visual,
}: {
  name: string;
  hero: Hero;
  visual: React.ReactNode;
}) {
  const paras = Array.isArray(hero.subheadline) ? hero.subheadline : [hero.subheadline];
  return (
    <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
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
          <div className="mx-auto grid max-w-site items-stretch gap-12 pb-20 pt-36 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:pb-28 md:pt-44 lg:gap-16">
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

            <div className="relative min-w-0 self-stretch max-md:mt-2">
              <PrismRay
                className="left-[75%] top-1/2 h-12 w-[32rem] -translate-x-1/2 -translate-y-1/2 md:h-24 md:w-[64rem]"
                angle={-50}
                intensity="hero"
              />
              <div className="relative flex h-full max-md:aspect-[4/5]">{visual}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// "What Prisma is for … / Why … use Prisma" — the /orm narrative shape: copy on
// the left, a purpose-built 1:1 abstraction on the right, the copy centred to it.
export function SegmentIntro({
  intro,
  visual,
}: Pick<SegmentUseCaseContent, "intro"> & { visual: React.ReactNode }) {
  return (
    <ProductNarrative
      headline={intro.headline}
      paragraphs={[intro.lede, ...intro.body]}
      centerText
      illustration={<div className="w-full">{visual}</div>}
    />
  );
}

// An icon-card grid — the /postgres outcomes tile. Used by "when to use" (four-
// up) and "why choose" (two-up), so the two grids read at different rhythms.
function IconCards({
  headline,
  intro,
  items,
  columns,
}: {
  headline: string;
  intro: string[];
  items: SegmentUseCaseContent["when"]["items"];
  columns: "four" | "two";
}) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <div className="mx-auto flex max-w-3xl flex-col gap-4 text-center">
          <Reveal>
            <h2 className={cn("mx-auto max-w-[28ch]", HEADING)}>{headline}</h2>
          </Reveal>
          {intro.map((para, i) => (
            <Reveal key={i} delay={0.05 + i * 0.05}>
              <p
                className={cn(
                  "text-pretty leading-relaxed text-muted-foreground",
                  i === 0 && "text-lg",
                )}
              >
                {para}
              </p>
            </Reveal>
          ))}
        </div>

        <div
          className={cn(
            "mt-12 grid grid-cols-1 gap-5",
            columns === "four" ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-2",
          )}
        >
          {items.map(({ icon, title, body }, i) => {
            const Icon = PRODUCT_ICONS[icon];
            return (
              <Reveal key={title} delay={(i % 4) * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-card p-7">
                  <IconTile>
                    <Icon className="size-5 text-foreground" aria-hidden />
                  </IconTile>
                  <h3 className="mt-5 text-balance text-xl leading-snug">{title}</h3>
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

export function SegmentWhen({ when }: Pick<SegmentUseCaseContent, "when">) {
  return (
    <IconCards headline={when.headline} intro={[when.intro]} items={when.items} columns="four" />
  );
}

export function SegmentWhyChoose({
  whyChoose,
}: {
  whyChoose: NonNullable<SegmentUseCaseContent["whyChoose"]>;
}) {
  return (
    <IconCards
      headline={whyChoose.headline}
      intro={whyChoose.intro}
      items={whyChoose.items}
      columns="two"
    />
  );
}

// "Is Prisma the right fit …?" — an asymmetric split: the affirmative promoted
// (wider, elevated, spectrum-edged), the honest caveat beside it, plain and muted.
export function SegmentFit({ fit }: Pick<SegmentUseCaseContent, "fit">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className={cn("mx-auto max-w-[26ch] text-center", HEADING)}>{fit.headline}</h2>
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

// "What … build with Prisma / Who Prisma is best for" — the site's icon-tile
// card, four-up.
export function SegmentBuilds({ builds }: Pick<SegmentUseCaseContent, "builds">) {
  return (
    <section className="bg-white px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <h2 className={cn("mx-auto max-w-[26ch]", HEADING)}>{builds.headline}</h2>
          </Reveal>
          {builds.intro ? (
            <Reveal delay={0.05}>
              <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
                {builds.intro}
              </p>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {builds.items.map(({ icon, title, body }, i) => {
            const Icon = PRODUCT_ICONS[icon];
            return (
              <Reveal key={title} delay={(i % 4) * 0.08} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-card p-7">
                  <IconTile>
                    <Icon className="size-5 text-foreground" aria-hidden />
                  </IconTile>
                  <h3 className="mt-5 text-balance text-lg leading-snug">{title}</h3>
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
