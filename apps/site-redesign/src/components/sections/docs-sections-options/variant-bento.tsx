import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { type Section, LinkTile, SECTIONS } from "./shared";

// Variant E — Bento. The sections aren't equal weight, so the layout isn't
// either: "Pick your framework" is the wide hero tile, "Prisma ORM 7" and
// "Other setups" pair up in a row, "Browse the docs" runs full width at the
// bottom. Card sizes carry the hierarchy.
function Card({
  section,
  className,
  itemsClassName,
  children,
}: {
  section: Section;
  className?: string;
  itemsClassName?: string;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-2xl border border-black/[0.06] bg-card p-6 shadow-[0_1px_2px_rgba(21,21,21,0.04)]",
        className,
      )}
    >
      <span className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground">
        <span aria-hidden className={cn("size-1.5 rounded-full", section.accent)} />
        {section.n}
      </span>
      <h2 className="mt-2 text-xl leading-tight">{section.title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{section.description}</p>
      <div className={cn("mt-5 grid gap-3", itemsClassName)}>
        {section.items.map((item) => (
          <LinkTile key={item.title} item={item} />
        ))}
      </div>
      {children}
    </section>
  );
}

export function VariantBento() {
  const [frameworks, orm7, other, browse] = SECTIONS;
  return (
    <div className="mx-auto grid max-w-5xl gap-4 px-4 py-16 sm:px-8 lg:grid-cols-2">
      <Card
        section={frameworks}
        className="lg:col-span-2"
        itemsClassName="grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      >
        <p className="mt-5 text-sm leading-7 text-muted-foreground">{frameworks.note}</p>
      </Card>
      <Card section={orm7} itemsClassName="grid-cols-1" />
      <Card section={other} itemsClassName="grid-cols-1" />
      <Card
        section={browse}
        className="lg:col-span-2"
        itemsClassName="sm:grid-cols-2 lg:grid-cols-3"
      />
    </div>
  );
}
