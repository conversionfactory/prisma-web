import { IconTile } from "@/components/brand/icon-tile";
import { Pattern } from "@/components/brand/pattern";
import { Check, Code, Database, Rocket, Server, Swap } from "@/components/icons/forma";

const SPECTRUM = "linear-gradient(90deg,#01d7e4,#f3c306 25%,#f37a03 50%,#f43531 74%,#f00e5c)";

const PANEL =
  "relative flex h-full w-full flex-col overflow-hidden rounded-[1.25rem] border border-black/[0.06] bg-card shadow-[0_1px_2px_rgba(21,21,21,0.04),0_24px_48px_-24px_rgba(21,21,21,0.14)]";
const SECTION_LABEL =
  "text-[0.625rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground/70";

// Hero — a founder's launch-to-scale console: the fast path from data model to
// deployed app, a free start capped by a spend limit, and one stack carrying
// the product from MVP to real traffic. Fills the hero column.
const LAUNCH = ["Define your data model", "Create a database", "Deploy your app"];

export function StartupsHeroVisual() {
  return (
    <div className={PANEL}>
      <div className="flex items-center gap-2 border-b border-border/70 px-5 py-3.5">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 font-mono text-xs text-foreground">your-app · prisma</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-prism-cyan-100 px-2 py-0.5 text-[0.625rem] font-semibold text-prism-cyan-800">
          <span className="size-1.5 animate-status-pulse rounded-full bg-prism-cyan-400 motion-reduce:animate-none" />
          live
        </span>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 p-5">
        {/* the fast path, all from one workflow */}
        <div className="rounded-xl border border-black/[0.06] bg-white p-4">
          <p className={SECTION_LABEL}>Launch · one workflow</p>
          <div className="mt-3 flex flex-col gap-2.5">
            {LAUNCH.map((step) => (
              <div key={step} className="flex items-center gap-2.5">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-prism-cyan-100">
                  <Check className="size-3 text-prism-cyan-600" strokeWidth={3} aria-hidden />
                </span>
                <span className="text-[0.8125rem] text-foreground">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* free to start, capped as usage grows */}
        <div className="rounded-xl border border-black/[0.06] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className={SECTION_LABEL}>Pricing</p>
            <span className="rounded border border-prism-cyan-200 bg-prism-cyan-50 px-1.5 py-0.5 text-[0.5625rem] font-semibold text-prism-cyan-800">
              Free to start
            </span>
          </div>
          <div className="relative mt-3 h-2 overflow-hidden rounded-full bg-muted">
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-2/5 rounded-full"
              style={{ backgroundImage: SPECTRUM }}
            />
            <span
              aria-hidden
              className="absolute inset-y-[-3px] left-[75%] w-px bg-foreground/40"
            />
          </div>
          <div className="mt-2 flex items-center justify-between font-mono text-[0.625rem] text-muted-foreground">
            <span>usage</span>
            <span>spend limit</span>
          </div>
        </div>

        {/* one stack from MVP to real traffic */}
        <div className="flex min-h-0 flex-1 flex-col rounded-xl border border-black/[0.06] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className={SECTION_LABEL}>Growth · same stack</p>
            <span className="text-[0.625rem] font-medium text-muted-foreground">
              MVP → real traffic
            </span>
          </div>
          <svg
            aria-hidden
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="mt-3 min-h-0 w-full flex-1"
          >
            <defs>
              <linearGradient id="startup-spark" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#01d7e4" />
                <stop offset="55%" stopColor="#f3c306" />
                <stop offset="100%" stopColor="#f43531" />
              </linearGradient>
            </defs>
            <polyline
              points="0,36 18,33 34,34 52,24 68,20 84,11 100,4"
              fill="none"
              stroke="url(#startup-spark)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

// Intro — one connected stack: the core product pieces the copy names, on a
// single spine, so they read as one thing rather than separate vendors.
const PIECES = [
  { Icon: Code, label: "Data model" },
  { Icon: Database, label: "Database" },
  { Icon: Swap, label: "Queries" },
  { Icon: Server, label: "Migrations" },
  { Icon: Rocket, label: "Deployment" },
];

export function StartupsIntroVisual() {
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
        <span className="ml-1.5 font-mono text-xs text-foreground">one connected stack</span>
      </div>
      <div className="relative flex min-h-0 flex-1 flex-col justify-center gap-3 px-5 py-5">
        <span
          aria-hidden
          className="absolute bottom-9 left-[2.4rem] top-9 w-px bg-gradient-to-b from-prism-cyan-300 via-prism-yellow-300 to-prism-red-400"
        />
        {PIECES.map(({ Icon, label }) => (
          <div
            key={label}
            className="relative flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white px-3.5 py-2.5 shadow-[0_1px_2px_rgba(21,21,21,0.04)]"
          >
            <IconTile className="size-8">
              <Icon className="size-4 text-foreground" aria-hidden />
            </IconTile>
            <span className="text-[0.8125rem] font-medium text-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
