import { Fragment } from "react";
import { Code, Console, Database, Server, Table } from "@/components/icons/forma";
import { Bar, CardChrome, SectionLabel } from "@/components/product/illustrations/parts";
import { cn } from "@/lib/utils";

// The /prisma-stack hero abstraction: the three products as one wired column,
// each layer in its canonical hue, with the cross-stack tools on the tinted
// track underneath. Every label is a term from the page's copy; supporting
// detail collapses to skeleton lines, same idiom as the product-page panels.
// One motion only: light running down the wires that join the layers.

const LAYERS = [
  {
    kicker: "Type-safe data layer",
    name: "Prisma ORM",
    Icon: Code,
    tile: "border-prism-cyan-200 bg-prism-cyan-50 text-prism-cyan-800",
    detail: (
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[0.625rem] text-foreground">schema.prisma</span>
        <Bar className="w-20" />
        <Bar className="w-14" />
        <Bar className="w-16" />
      </div>
    ),
  },
  {
    kicker: "Managed database",
    name: "Prisma Postgres",
    Icon: Database,
    tile: "border-prism-yellow-200 bg-prism-yellow-50 text-prism-yellow-800",
    detail: (
      <div className="grid w-24 grid-cols-3 gap-x-2 gap-y-1.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <Bar key={i} className={cn("w-full", i < 3 && "bg-foreground/20")} />
        ))}
      </div>
    ),
  },
  {
    kicker: "App hosting",
    name: "Prisma Compute",
    Icon: Server,
    tile: "border-prism-red-200 bg-prism-red-50 text-prism-red-800",
    detail: (
      <div className="flex flex-col items-end gap-1.5">
        <span className="font-mono text-[0.625rem] text-foreground">git push</span>
        <span className="flex items-center gap-1.5">
          <span className="size-1.5 animate-status-pulse rounded-full bg-prism-cyan-400 motion-reduce:animate-none" />
          <Bar className="w-16" />
        </span>
      </div>
    ),
  },
];

const TOOLS = [
  { name: "Prisma Studio", Icon: Table },
  { name: "CLI + Management API", Icon: Console, chip: "--json" },
];

// The wire between two layers, centred under the icon tiles (row border + row
// padding + half the size-10 tile), with light running down it.
function Connector({ gradient, delay }: { gradient: string; delay: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative ml-9 block min-h-6 w-0.5 flex-1 overflow-hidden bg-gradient-to-b sm:ml-10",
        gradient,
      )}
    >
      <span
        className="absolute inset-0 animate-spine-flow bg-gradient-to-b from-transparent via-white to-transparent motion-reduce:hidden"
        style={{ animationDelay: delay }}
      />
    </span>
  );
}

export function StackHeroVisual() {
  return (
    <figure
      role="img"
      aria-label="Illustration of the Prisma Stack: Prisma ORM, Prisma Postgres and Prisma Compute wired together in one column, with Prisma Studio and the CLI + Management API working across all three"
      className="pointer-events-none flex h-full w-full select-none flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[0_1px_2px_rgba(21,21,21,0.04),0_8px_16px_-4px_rgba(21,21,21,0.06),0_32px_64px_-16px_rgba(21,21,21,0.14)]"
    >
      <CardChrome
        file="The Prisma Stack"
        right={
          <span className="flex items-center gap-1.5 text-[0.625rem] font-semibold text-prism-cyan-700">
            <span className="size-1.5 animate-status-pulse rounded-full bg-prism-cyan-400 motion-reduce:animate-none" />
            connected
          </span>
        }
      />

      {/* the wires stretch, so the layers always span the card top to bottom
          whatever height the copy column sets */}
      <div className="flex flex-1 flex-col px-5 py-6 sm:px-6">
        {LAYERS.map(({ kicker, name, Icon, tile, detail }, i) => (
          <Fragment key={name}>
            {i === 1 ? (
              <Connector gradient="from-prism-cyan-400 to-prism-yellow-400" delay="0s" />
            ) : null}
            {i === 2 ? (
              <Connector gradient="from-prism-yellow-400 to-prism-red-500" delay="1.2s" />
            ) : null}
            <div className="flex items-center gap-4 rounded-xl border border-border/80 bg-card p-4 shadow-[0_1px_2px_rgba(21,21,21,0.04)] sm:p-5">
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-lg border",
                  tile,
                )}
              >
                <Icon className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <SectionLabel>{kicker}</SectionLabel>
                <p className="mt-0.5 text-[0.9375rem] font-semibold text-foreground">{name}</p>
              </div>
              <div className="shrink-0 max-sm:hidden">{detail}</div>
            </div>
          </Fragment>
        ))}
      </div>

      <div className="border-t border-border/70 bg-muted/40 px-5 py-4 sm:px-6">
        <SectionLabel>Working across the stack</SectionLabel>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {TOOLS.map(({ name, Icon, chip }) => (
            <span
              key={name}
              className="flex items-center gap-2 rounded-lg border border-border/80 bg-card px-3 py-2"
            >
              <Icon className="size-3.5 text-foreground" />
              <span className="text-[0.8125rem] font-semibold text-foreground">{name}</span>
              {chip ? (
                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
                  {chip}
                </code>
              ) : null}
            </span>
          ))}
        </div>
      </div>
    </figure>
  );
}
