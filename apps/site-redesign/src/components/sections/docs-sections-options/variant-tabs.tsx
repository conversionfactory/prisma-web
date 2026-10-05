"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LinkTile, SECTIONS } from "./shared";

// Variant D — Tabbed switcher. All four sections collapse into one framed panel
// with a tab row across the top. Keeps the page short and turns "which path?"
// into a single choice up front. Interactive — good if we want the getting-
// started surface to feel compact and app-like.
export function VariantTabs() {
  const [active, setActive] = useState(0);
  const s = SECTIONS[active];
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-8">
      <div className="overflow-hidden rounded-2xl border border-black/[0.08] bg-card shadow-[0_1px_2px_rgba(21,21,21,0.04)]">
        <div className="flex flex-wrap gap-1 border-b border-black/[0.06] bg-muted/40 p-1.5">
          {SECTIONS.map((sec, i) => (
            <button
              key={sec.n}
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                i === active
                  ? "bg-white text-foreground shadow-[0_1px_2px_rgba(21,21,21,0.06)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span aria-hidden className={cn("size-1.5 rounded-full", sec.accent)} />
              {sec.title}
            </button>
          ))}
        </div>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl leading-tight">{s.title}</h2>
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
        </div>
      </div>
    </div>
  );
}
