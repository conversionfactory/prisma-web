import { IconTile } from "@/components/brand/icon-tile";
import { ArrowRightBold, CheckCircle, Code, Github, Table } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";

// Self-serve resources, verbatim from the approved copy. A divided link list
// inside a single panel rather than a second card grid — the channel cards
// above are the primary, higher-commitment actions, so these quieter
// browse-at-your-own-pace links get a distinct, more compact treatment. Same
// design language (IconTile, spectrum-ink arrow), different layout.
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
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="text-balance text-center text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1] max-md:text-left">
            Resources for faster answers
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="divide-y divide-black/[0.06] overflow-hidden rounded-2xl border border-black/[0.06] bg-card">
            {RESOURCES.map(({ name, Icon, description, cta }) => (
              <a
                key={name}
                href={cta.href}
                className="group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-black/[0.02] sm:px-6"
              >
                <IconTile className="size-11">
                  <Icon className="size-5 text-foreground" aria-hidden />
                </IconTile>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold leading-tight">{name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
                <span className="ml-2 hidden shrink-0 items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground sm:inline-flex">
                  {cta.label}
                </span>
                <ArrowRightBold
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground"
                  aria-hidden
                />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
