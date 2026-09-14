import { cn } from "@/lib/utils";
import { LinkTile, SECTIONS } from "./shared";

// Variant B — Timeline rail. A vertical line runs down the left, threaded
// through numbered prism nodes. Content sits to the right of the line, so the
// four sections read as sequential stops on a path from setup to reference.
export function VariantTimeline() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <ol className="relative">
        {/* the rail */}
        <span
          aria-hidden
          className="absolute left-[15px] top-2 bottom-2 w-px bg-black/[0.08] sm:left-[19px]"
        />
        {SECTIONS.map((s) => (
          <li key={s.n} className="relative pl-12 pb-14 last:pb-0 sm:pl-16">
            <span
              aria-hidden
              className="absolute left-0 top-0 flex size-8 items-center justify-center rounded-full border border-black/[0.08] bg-white font-mono text-xs font-medium text-foreground shadow-[0_1px_2px_rgba(21,21,21,0.05)] sm:size-10"
            >
              {s.n}
              <span className={cn("absolute -right-0.5 -top-0.5 size-2 rounded-full", s.accent)} />
            </span>
            <h2 className="text-xl leading-tight sm:text-2xl">{s.title}</h2>
            <p className="mt-2 max-w-xl text-[0.9375rem] leading-7 text-muted-foreground">
              {s.description}
            </p>
            <div
              className={cn(
                "mt-5 grid gap-3",
                s.items.length > 4 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1",
              )}
            >
              {s.items.map((item) => (
                <LinkTile key={item.title} item={item} />
              ))}
            </div>
            {s.note && <p className="mt-4 text-sm leading-7 text-muted-foreground">{s.note}</p>}
          </li>
        ))}
      </ol>
    </div>
  );
}
