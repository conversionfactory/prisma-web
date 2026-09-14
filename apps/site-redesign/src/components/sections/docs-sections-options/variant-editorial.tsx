import { cn } from "@/lib/utils";
import { LinkTile, SECTIONS } from "./shared";

// Variant A — Editorial band. Full-width sections. A header row spans the
// column: an oversized ghost number + title on the left, the description on the
// right. The tiles run edge-to-edge below in a wide grid. Reads like a magazine
// spread — no sidebar, strong horizontal rhythm.
export function VariantEditorial() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-8">
      {SECTIONS.map((s) => (
        <section key={s.n} className="border-t border-black/[0.08] py-14 first:border-t-0 first:pt-0">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-4xl font-medium leading-none text-black/[0.13]">{s.n}</span>
              <h2 className="text-2xl leading-tight">{s.title}</h2>
            </div>
            <p className="text-[0.9375rem] leading-7 text-muted-foreground">{s.description}</p>
          </div>
          <div
            className={cn(
              "mt-8 grid gap-4",
              s.items.length > 4
                ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
                : s.items.length > 1
                  ? "sm:grid-cols-2"
                  : "grid-cols-1",
            )}
          >
            {s.items.map((item) => (
              <LinkTile key={item.title} item={item} />
            ))}
          </div>
          {s.note && <p className="mt-6 text-sm leading-7 text-muted-foreground">{s.note}</p>}
        </section>
      ))}
    </div>
  );
}
