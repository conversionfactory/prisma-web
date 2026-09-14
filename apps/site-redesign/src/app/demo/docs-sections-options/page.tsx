import type { Metadata } from "next";
import { VariantBento } from "@/components/sections/docs-sections-options/variant-bento";
import { VariantEditorial } from "@/components/sections/docs-sections-options/variant-editorial";
import { VariantPanels } from "@/components/sections/docs-sections-options/variant-panels";
import { VariantTabs } from "@/components/sections/docs-sections-options/variant-tabs";
import { VariantTimeline } from "@/components/sections/docs-sections-options/variant-timeline";

export const metadata: Metadata = {
  title: "Docs sections — layout options",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    label: "Option A — Editorial band",
    thesis:
      "No sidebar. An oversized ghost number + title sit left, the description right, tiles run edge-to-edge below. Magazine spread, strong horizontal rhythm.",
    Component: VariantEditorial,
  },
  {
    label: "Option B — Timeline rail",
    thesis:
      "A vertical line threaded through numbered prism nodes. The four sections read as sequential stops on a path from setup to reference.",
    Component: VariantTimeline,
  },
  {
    label: "Option C — Halo panels",
    thesis:
      "Each section is a contained rounded card wearing the brand prism glow. Distinct floating blocks with air between them, not one ruled list.",
    Component: VariantPanels,
  },
  {
    label: "Option D — Tabbed switcher",
    thesis:
      "All four collapse into one framed panel with a tab row. Turns 'which path?' into a single choice and keeps the page short. Interactive.",
    Component: VariantTabs,
  },
  {
    label: "Option E — Bento",
    thesis:
      "Unequal sections get unequal tiles: 'Pick your framework' is the wide hero, ORM 7 and Other setups pair up, Browse runs full width. Size carries hierarchy.",
    Component: VariantBento,
  },
];

// Internal design exploration — not linked from the site. Five layout directions
// for the lower /docs sections (Pick your framework, Prisma ORM 7, Other setups,
// Browse the docs). Same copy, same content, only the layout changes.
export default function DocsSectionsOptionsPage() {
  return (
    <div className="bg-white">
      <header className="border-b border-black/[0.06] px-4 pb-10 pt-28 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Internal · design exploration
        </p>
        <h1 className="mt-2 text-3xl">Docs sections — five layouts</h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
          Same sections, same copy. Only the layout of the lower /docs sections
          changes. Pick one.
        </p>
      </header>
      {OPTIONS.map(({ label, thesis, Component }) => (
        <div key={label} className="border-b border-black/[0.06]">
          <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-8">
            <p className="inline-flex rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-white">
              {label}
            </p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">{thesis}</p>
          </div>
          <Component />
        </div>
      ))}
    </div>
  );
}
