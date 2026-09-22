import {
  Blocks,
  Bot,
  Boxes,
  Cpu,
  Database,
  FileCode2,
  Gauge,
  Laptop,
  LayoutGrid,
  NotebookTabs,
  Table2,
  Terminal,
  Zap,
} from "lucide-react";
import type { ComponentType } from "react";
import { BucketIcon } from "@/components/icons/bucket";

type IconType = ComponentType<{ className?: string }>;
type NavItem = { label: string; href: string; icon?: IconType };
type NavGroup = { label: string; items: NavItem[] };

const D = "https://www.prisma.io/docs";

// Mirrors the live docs left navbar (Start / Build / Deploy / Manage /
// Reference). Links point at prisma.io until the redesign owns the docs pages.
const GROUPS: NavGroup[] = [
  {
    label: "Start",
    items: [
      { label: "Getting Started", href: D },
      { label: "Deploy your first app", href: `${D}/prisma-compute/deploy` },
      { label: "Deploy the full Prisma stack", href: `${D}/full-stack-tutorial` },
    ],
  },
  {
    label: "Build",
    items: [
      { label: "ORM", href: `${D}/orm`, icon: Boxes },
      { label: "Composer", href: `${D}/composer`, icon: Blocks },
      { label: "Local Development", href: `${D}/local-development`, icon: Laptop },
    ],
  },
  {
    label: "Deploy",
    items: [
      { label: "Compute", href: `${D}/compute`, icon: Cpu },
      { label: "Postgres", href: `${D}/postgres`, icon: Database },
      { label: "Storage", href: `${D}/storage`, icon: BucketIcon },
    ],
  },
  {
    label: "Manage",
    items: [
      { label: "Console", href: `${D}/console`, icon: LayoutGrid },
      { label: "Studio", href: `${D}/studio`, icon: Table2 },
      { label: "Query Insights", href: `${D}/query-insights`, icon: Gauge },
    ],
  },
  {
    label: "Reference",
    items: [
      { label: "Guides", href: `${D}/guides`, icon: NotebookTabs },
      { label: "CLI", href: `${D}/cli`, icon: Terminal },
      { label: "REST API", href: `${D}/rest-api`, icon: FileCode2 },
      { label: "AI", href: `${D}/ai`, icon: Bot },
      { label: "Accelerate", href: `${D}/accelerate`, icon: Zap },
    ],
  },
];

// The docs left navbar — a sticky column riding alongside the content card, as
// on the live docs. Hidden below lg (the site header carries nav there).
export function DocsSidebar() {
  return (
    <aside className="hidden lg:block">
      <nav
        aria-label="Documentation"
        className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pb-10 pr-2 text-sm [scrollbar-width:thin]"
      >
        <ul className="flex flex-col gap-6">
          {GROUPS.map((group) => (
            <li key={group.label}>
              <p className="mb-1.5 px-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground/70">
                {group.label}
              </p>
              <ul className="flex flex-col">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 font-medium text-foreground/75 transition-colors hover:bg-black/[0.04] hover:text-foreground"
                      >
                        {Icon && <Icon className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
                        <span className="truncate">{item.label}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
