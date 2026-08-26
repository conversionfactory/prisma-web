import { IconTile } from "@/components/brand/icon-tile";
import { Marker } from "@/components/brand/marker";
import { Pattern } from "@/components/brand/pattern";
import {
  AppWindow,
  CheckBold,
  Code,
  Database,
  GitBranch,
  Rocket,
  Server,
  Swap,
} from "@/components/icons/forma";

const PANEL =
  "relative flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-card shadow-[0_1px_2px_rgba(21,21,21,0.04),0_24px_48px_-24px_rgba(21,21,21,0.14)]";
const SECTION_LABEL =
  "text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70";

// Hero — the shared team workflow on a PR: the schema as the shared contract,
// a type-safe query check, a reviewable migration, and an isolated app +
// database for the branch. Fills the hero column.
export function EngineeringHeroVisual() {
  return (
    <div className={PANEL}>
      <div className="flex items-center gap-2 border-b border-border/70 px-5 py-3.5">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 font-mono text-xs text-foreground">team · prisma</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-prism-cyan-100 px-2 py-0.5 text-[0.625rem] font-semibold text-prism-cyan-800">
          <GitBranch className="size-3 text-prism-cyan-700" aria-hidden />
          PR #128
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-between gap-3 p-5">
        {/* the schema as the shared contract */}
        <div className="rounded-xl border border-black/[0.06] bg-white p-4">
          <div className="flex items-center gap-2.5">
            <IconTile className="size-8">
              <Code className="size-4 text-foreground" aria-hidden />
            </IconTile>
            <span className="font-mono text-[0.6875rem] text-foreground">schema.prisma</span>
            <Marker>shared contract</Marker>
          </div>
        </div>

        {/* a type-safe query */}
        <div className="rounded-xl border border-black/[0.06] bg-white p-4">
          <p className={SECTION_LABEL}>Type-safe query</p>
          <div className="mt-2.5 flex items-center gap-2 rounded-lg border border-border/80 bg-muted/30 px-3 py-2 font-mono text-[0.6875rem]">
            <span className="text-foreground">db.user.findMany()</span>
            <span className="ml-auto flex items-center gap-1 text-prism-cyan-700">
              <CheckBold className="size-3" aria-hidden />
              typed
            </span>
          </div>
        </div>

        {/* a reviewable migration */}
        <div className="rounded-xl border border-black/[0.06] bg-white p-4">
          <p className={SECTION_LABEL}>Reviewable migration</p>
          <div className="mt-2.5 flex items-center gap-2 font-mono text-[0.6875rem]">
            <Swap className="size-3.5 shrink-0 text-foreground/50" aria-hidden />
            <span className="truncate text-foreground">20260826_add_teams</span>
            <span className="ml-auto flex items-center gap-2">
              <span className="text-prism-cyan-600">+24</span>
              <span className="text-prism-red-500">−3</span>
            </span>
          </div>
        </div>

        {/* an isolated app + database for the branch */}
        <div className="flex items-center gap-2 rounded-xl border border-prism-cyan-200 bg-prism-cyan-50/50 px-4 py-3">
          <GitBranch className="size-3.5 shrink-0 text-prism-cyan-700" aria-hidden />
          <span className="font-mono text-[0.6875rem] text-foreground">pr-128</span>
          <span className="text-[0.6875rem] text-muted-foreground">production-like</span>
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
      </div>
    </div>
  );
}

// Intro — one connected workflow flowing from the schema: the shared contract
// at the top, the parts that stay aligned with it on a spine beneath.
const DOWNSTREAM = [
  { Icon: Swap, label: "Queries" },
  { Icon: GitBranch, label: "Migrations" },
  { Icon: Server, label: "Environments" },
  { Icon: Rocket, label: "Deployment" },
];

export function EngineeringIntroVisual() {
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
        <span className="ml-1.5 font-mono text-xs text-foreground">one shared workflow</span>
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col justify-center gap-3 px-5 py-5">
        {/* the schema, promoted — everything downstream stays aligned to it */}
        <div className="spectrum-border spectrum-border-on relative flex items-center gap-3 rounded-xl border border-transparent bg-white px-3.5 py-3">
          <IconTile className="size-9">
            <Code className="size-4 text-foreground" aria-hidden />
          </IconTile>
          <div className="flex flex-col">
            <span className="text-[0.8125rem] font-semibold text-foreground">Prisma schema</span>
            <span className="text-[0.6875rem] text-muted-foreground">shared contract</span>
          </div>
        </div>

        <span aria-hidden className="mx-auto h-4 w-px bg-black/15" />

        <div className="relative grid grid-cols-2 gap-2.5">
          {DOWNSTREAM.map(({ Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2.5 rounded-xl border border-black/[0.06] bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(21,21,21,0.04)]"
            >
              <IconTile className="size-8">
                <Icon className="size-4 text-foreground" aria-hidden />
              </IconTile>
              <span className="text-[0.8125rem] font-medium text-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
