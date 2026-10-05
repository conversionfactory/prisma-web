import { cn } from "@/lib/utils";
import { LinkTile, SECTIONS } from "./shared";

// Variant C — Halo panels. Each section is a self-contained rounded card wearing
// the brand prism glow (same conic wash as the homepage workflow stages). Header
// lives inside the card; tiles sit on the panel. Distinct floating blocks with
// air between them, rather than one continuous ruled list.
const HALO =
  "conic-gradient(var(--color-prism-yellow-300), var(--color-prism-red-500) 32%, var(--color-prism-cyan-400) 64%, var(--color-prism-yellow-300))";

export function VariantPanels() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16 sm:px-8">
      {SECTIONS.map((s) => (
        <section
          key={s.n}
          className="relative isolate overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-br from-prism-cyan-50/50 via-card to-card p-6 sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 -z-10 size-56 rounded-full opacity-[0.13] blur-[46px]"
            style={{ background: HALO }}
          />
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground">
              <span aria-hidden className={cn("size-1.5 rounded-full", s.accent)} />
              {s.n}
            </span>
          </div>
          <h2 className="mt-2 text-2xl leading-tight">{s.title}</h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-7 text-muted-foreground">
            {s.description}
          </p>
          <div
            className={cn(
              "mt-6 grid gap-3",
              s.items.length > 4
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : s.items.length > 1
                  ? "sm:grid-cols-2"
                  : "grid-cols-1",
            )}
          >
            {s.items.map((item) => (
              <LinkTile key={item.title} item={item} />
            ))}
          </div>
          {s.note && <p className="mt-5 text-sm leading-7 text-muted-foreground">{s.note}</p>}
        </section>
      ))}
    </div>
  );
}
