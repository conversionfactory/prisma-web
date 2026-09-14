import {
  Bot,
  Boxes,
  Cpu,
  Database,
  FolderPlus,
  Milestone,
  NotebookTabs,
  Terminal,
} from "lucide-react";
import type { ReactNode } from "react";
import { IconTile } from "@/components/brand/icon-tile";
import { cn } from "@/lib/utils";

// Shared content + atoms for the /docs section-layout exploration. The copy is
// the live docs getting-started page's; only the layout differs per variant.
// Framework logos are stand-in mono initials here so the demo has no image deps
// — the real section uses the technology SVGs.

export type Item = {
  title: string;
  sub?: string;
  badge?: string;
  mono?: string;
  icon?: ReactNode;
};

export type Section = {
  n: string;
  title: string;
  description: string;
  accent: string;
  items: Item[];
  note?: ReactNode;
};

export const SECTIONS: Section[] = [
  {
    n: "01",
    title: "Pick your framework",
    description:
      "Every guide runs the same journey with the same commands: scaffold, connect Prisma Postgres, run a real query, and deploy.",
    accent: "bg-prism-cyan-400",
    items: [
      { title: "Next.js", mono: "N" },
      { title: "Hono", mono: "Ho" },
      { title: "TanStack Start", mono: "TS" },
      { title: "NestJS", mono: "Ne" },
      { title: "Astro", mono: "As" },
      { title: "Nuxt", mono: "Nu" },
      { title: "SvelteKit", mono: "Sv" },
      { title: "Bun", mono: "Bu" },
      { title: "Elysia", mono: "E" },
      { title: "Deno", mono: "De" },
    ],
    note: "Using Express or another Node.js server? Follow the existing-project path instead.",
  },
  {
    n: "02",
    title: "Prisma ORM 7",
    description:
      "Prisma ORM 7 remains fully supported. It pairs with Prisma Postgres and Prisma Compute the same way. When you're ready, Prisma ORM 8 is the upgrade path.",
    accent: "bg-prism-yellow-300",
    items: [
      {
        title: "Prisma ORM 7 setup paths",
        sub: "All database quickstarts, plus the agent prompt",
        icon: <Milestone />,
      },
      {
        title: "Prisma ORM 7 quickstart",
        sub: "With Prisma Postgres",
        badge: "5 min",
        icon: <Database />,
      },
    ],
  },
  {
    n: "03",
    title: "Other setups",
    description:
      "If you already have an app or a database, or need a single Prisma product on its own, each path has a guide to follow and a prompt to hand to your agent.",
    accent: "bg-prism-red-500",
    items: [
      {
        title: "Existing project, your own database, or a single product",
        sub: "Five paths: add to an existing project, bring your own Postgres, or use the ORM, Postgres, or Compute alone.",
        icon: <FolderPlus />,
      },
    ],
  },
  {
    n: "04",
    title: "Browse the docs",
    description:
      "This page hides the full navigation to keep the first run focused. These links open the full docs for each product.",
    accent: "bg-prism-cyan-400",
    items: [
      { title: "Prisma ORM", sub: "Prisma ORM 8, with Prisma ORM 7 docs", icon: <Boxes /> },
      { title: "Prisma Postgres", sub: "The managed database", icon: <Database /> },
      { title: "Prisma Compute", sub: "Hosting and branching", icon: <Cpu /> },
      { title: "CLI reference", sub: "Every command and flag", icon: <Terminal /> },
      { title: "Guides", sub: "Frameworks and workflows", icon: <NotebookTabs /> },
      { title: "AI tools", sub: "Skills, MCP, and prompts", icon: <Bot /> },
    ],
  },
];

// ---- atoms ---------------------------------------------------------------

export function Tile({ item, className }: { item: Item; className?: string }) {
  if (item.icon) {
    return (
      <IconTile className={cn("size-10 rounded-lg", className)}>
        <span className="text-foreground [&_svg]:size-5">{item.icon}</span>
      </IconTile>
    );
  }
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white font-mono text-sm font-semibold text-muted-foreground",
        className,
      )}
    >
      {item.mono}
    </span>
  );
}

// Brand badge rule: squared chip with the colour in the dot, never a pill.
export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-black/[0.09] bg-white px-2 py-0.5 text-[0.6875rem] font-semibold leading-4 text-foreground">
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-prism-cyan-400" />
      {children}
    </span>
  );
}

// Standard link tile — icon + title (+ optional badge/sub). Reused by variants
// that want the site's existing card treatment.
export function LinkTile({ item }: { item: Item }) {
  return (
    <a
      href="#"
      className={cn(
        "group flex gap-3 rounded-xl border border-black/[0.06] bg-card p-3 shadow-[0_1px_2px_rgba(21,21,21,0.04)] transition-[box-shadow,border-color] hover:border-black/10 hover:shadow-[0_1px_2px_rgba(21,21,21,0.04),0_14px_28px_-20px_rgba(21,21,21,0.25)]",
        item.sub ? "items-start" : "items-center",
      )}
    >
      <Tile item={item} />
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
          {item.title}
          {item.badge && <Chip>{item.badge}</Chip>}
        </span>
        {item.sub && (
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{item.sub}</span>
        )}
      </span>
    </a>
  );
}
