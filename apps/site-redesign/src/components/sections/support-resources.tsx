import { IconTile } from "@/components/brand/icon-tile";
import { ArrowRightBold, CheckCircle, Code, Github, Table } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";

// Self-serve resources, verbatim from the approved copy. Quieter than the
// channel cards above: these carry spectrum-ink text links (the LearnMore idiom)
// rather than outline pills, so the primary channels keep the stronger action
// and the self-serve row reads as the lighter, browse-at-your-own-pace tier.
const RESOURCES = [
  {
    name: "Documentation",
    Icon: Code,
    description: "Guides, references, and API docs for every part of Prisma.",
    cta: { label: "Read the docs", href: "/docs" },
  },
  {
    name: "Examples",
    Icon: Github,
    description: "Ready-to-run example projects on GitHub.",
    cta: { label: "Browse examples", href: "https://github.com/prisma/prisma-examples" },
  },
  {
    name: "Platform status",
    Icon: CheckCircle,
    description: "Check current status and past incidents.",
    // Matches the footer's status link (siteConfig.footer.resources).
    cta: { label: "View status", href: "/prisma-status" },
  },
  {
    name: "Support policy",
    Icon: Table,
    description: "What each plan includes and how support works.",
    // No dedicated policy page exists yet — pointed at the docs for now. Confirm.
    cta: { label: "Read the policy", href: "/docs" },
  },
];

export function SupportResources() {
  return (
    <section className="bg-white px-4 pb-10 pt-14 sm:px-8">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="text-balance text-center text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1] max-md:text-left">
            Resources for faster answers
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {RESOURCES.map(({ name, Icon, description, cta }, i) => (
            <Reveal key={name} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-card p-7">
                <IconTile>
                  <Icon className="size-5 text-foreground" aria-hidden />
                </IconTile>
                <h3 className="mt-5 text-xl">{name}</h3>
                <p className="mt-3 grow text-pretty leading-relaxed text-muted-foreground">
                  {description}
                </p>
                <a
                  href={cta.href}
                  className="spectrum-ink -ml-3.5 mt-6 inline-flex h-9 w-fit shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-semibold outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                  {cta.label}
                  <ArrowRightBold className="size-3.5" aria-hidden />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
