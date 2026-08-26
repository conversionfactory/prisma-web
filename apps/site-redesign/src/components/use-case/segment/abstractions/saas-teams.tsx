import { IconTile } from "@/components/brand/icon-tile";
import { Marker } from "@/components/brand/marker";
import { Pattern } from "@/components/brand/pattern";
import {
  AppWindow,
  Code,
  Database,
  GitBranch,
  Layers,
  Rocket,
  Server,
  Swap,
} from "@/components/icons/forma";

const SPECTRUM = "linear-gradient(90deg,#01d7e4,#f3c306 25%,#f37a03 50%,#f43531 74%,#f00e5c)";

const PANEL =
  "relative flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-card shadow-[0_1px_2px_rgba(21,21,21,0.04),0_24px_48px_-24px_rgba(21,21,21,0.14)]";
const SECTION_LABEL =
  "text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70";

// Hero — a SaaS project console: the integrated stack (one bill), preview
// branches with their own isolated app + database, and operation-based usage
// under a spend limit. Fills the hero column top to bottom.
export function SaasHeroVisual() {
  return (
    <div className={PANEL}>
      <div className="flex items-center gap-2 border-b border-border/70 px-5 py-3.5">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 font-mono text-xs text-foreground">acme · prisma project</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-prism-cyan-100 px-2 py-0.5 text-[0.625rem] font-semibold text-prism-cyan-800">
          <span className="size-1.5 animate-status-pulse rounded-full bg-prism-cyan-400 motion-reduce:animate-none" />
          production
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-5">
        {/* one integrated stack, one bill */}
        <div className="rounded-xl border border-black/[0.06] bg-white p-4">
          <p className={SECTION_LABEL}>Stack · one bill</p>
          <div className="relative mt-3 flex items-center justify-between">
            <span
              aria-hidden
              className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-prism-cyan-300 via-prism-yellow-300 to-prism-red-400"
            />
            {[
              { Icon: AppWindow, label: "App" },
              { Icon: Database, label: "Postgres" },
              { Icon: Layers, label: "ORM" },
            ].map(({ Icon, label }) => (
              <span
                key={label}
                className="relative flex flex-col items-center gap-1.5 bg-white px-2"
              >
                <IconTile className="size-10">
                  <Icon className="size-4 text-foreground" aria-hidden />
                </IconTile>
                <span className="text-[0.625rem] font-medium text-muted-foreground">{label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* preview branches, each with an isolated app + database */}
        <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-black/[0.06] bg-white p-4">
          <p className={SECTION_LABEL}>Preview environments</p>
          <div className="mt-2 flex flex-1 flex-col justify-between">
            {[
              { name: "main", tag: "production" },
              { name: "pr-214", tag: "isolated" },
              { name: "pr-207", tag: "isolated" },
            ].map(({ name, tag }) => (
              <div
                key={name}
                className="flex items-center gap-2 border-t border-border/50 py-2 first:border-t-0"
              >
                <GitBranch className="size-3.5 shrink-0 text-foreground/50" aria-hidden />
                <span className="font-mono text-[0.6875rem] text-foreground">{name}</span>
                {tag === "production" ? (
                  <Marker>{tag}</Marker>
                ) : (
                  <span className="rounded border border-prism-cyan-200 bg-prism-cyan-50 px-1.5 py-0.5 text-[0.5625rem] font-semibold text-prism-cyan-800">
                    {tag}
                  </span>
                )}
                <span className="ml-auto flex items-center gap-1.5">
                  <span className="flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 text-[0.5625rem] text-muted-foreground">
                    <AppWindow className="size-2.5" aria-hidden />
                    app
                  </span>
                  <span className="flex items-center gap-1 rounded border border-border bg-card px-1.5 py-0.5 text-[0.5625rem] text-muted-foreground">
                    <Database className="size-2.5" aria-hidden />
                    db
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* operation-based usage under a spend limit */}
        <div className="rounded-xl border border-black/[0.06] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className={SECTION_LABEL}>Usage</p>
            <span className="text-[0.625rem] font-medium text-muted-foreground">
              spend limit set
            </span>
          </div>
          <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-3/5 rounded-full"
              style={{ backgroundImage: SPECTRUM }}
            />
            {/* the cap */}
            <span
              aria-hidden
              className="absolute inset-y-[-3px] left-[80%] w-px bg-foreground/40"
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[0.625rem] text-muted-foreground">
            <span>operations</span>
            <span>one bill</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Intro — one Prisma project bringing the pieces the copy names together: the
// data model, ORM, Postgres, hosting, migrations, and preview environments in
// one container, with the deploy workflow along the bottom.
const PIECES = [
  { Icon: Code, label: "Data model" },
  { Icon: Layers, label: "ORM" },
  { Icon: Database, label: "Postgres" },
  { Icon: Server, label: "Hosting" },
  { Icon: Swap, label: "Migrations" },
  { Icon: GitBranch, label: "Previews" },
];

export function SaasIntroVisual() {
  return (
    <div className="relative mx-auto flex aspect-square w-full max-w-md flex-col overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-card shadow-[0_1px_2px_rgba(21,21,21,0.04),0_24px_48px_-24px_rgba(21,21,21,0.14)] lg:my-auto">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] grayscale [mask-image:linear-gradient(to_bottom,black,transparent_45%)]"
      >
        <Pattern className="h-full w-full" scale={2.5} />
      </div>
      <div className="relative flex items-center gap-2 border-b border-border/70 px-5 py-3.5">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 font-mono text-xs text-foreground">one Prisma project</span>
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col gap-3 p-5">
        <div className="grid flex-1 grid-cols-2 gap-2.5">
          {PIECES.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white px-3 shadow-[0_1px_2px_rgba(21,21,21,0.04)]"
            >
              <IconTile className="size-8">
                <Icon className="size-4 text-foreground" aria-hidden />
              </IconTile>
              <span className="text-[0.8125rem] font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-border bg-primary px-3.5 py-3 font-mono text-[0.75rem] text-primary-foreground">
          <Rocket className="size-3.5 shrink-0 text-prism-cyan-400" aria-hidden />
          <span>deploy workflow</span>
          <span className="ml-auto text-primary-foreground/60">branch → production</span>
        </div>
      </div>
    </div>
  );
}
