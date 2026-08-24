import { Marker } from "@/components/brand/marker";
import { ArrowRightBold } from "@/components/icons/forma";
import { cn } from "@/lib/utils";

// The "Related resources" block that closes a blog post's body: a short,
// editorial list of internal links (two posts, a docs page, a product page)
// placed for SEO. Data comes from the post's frontmatter; the block renders
// nothing when a post has none, so it is opt-in per post.
//
// Kind drives only the marker's colour and label — the three brand hues in the
// site's standard order — following marker.tsx's rule that the colour lives in
// the dot and the label stays ink. Squared chips, not pills, for the same
// reason: prism-button.tsx owns rounded-full.

export type RelatedResource = {
  label: string;
  href: string;
  kind?: "blog" | "docs" | "product";
};

const KIND = {
  blog: { label: "Blog", color: "bg-prism-cyan-400" },
  docs: { label: "Docs", color: "bg-prism-yellow-400" },
  product: { label: "Product", color: "bg-prism-red-500" },
} as const;

export function RelatedResources({ resources }: { resources?: RelatedResource[] }) {
  if (!resources || resources.length === 0) return null;

  return (
    <section aria-label="Related resources" className="mt-16">
      <h2 className="text-2xl leading-snug">Related resources</h2>
      <ul className="mt-6 flex flex-col gap-3">
        {resources.map((resource) => {
          const kind = KIND[resource.kind ?? "blog"];
          // External links open in a new tab; internal redesign routes stay put.
          const external = /^https?:\/\//.test(resource.href);
          return (
            <li key={resource.href}>
              <a
                href={resource.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl border border-black/[0.06] bg-card px-5 py-4",
                  "spectrum-border transition-shadow hover:shadow-[0_1px_2px_rgba(21,21,21,0.04),0_16px_40px_-24px_rgba(21,21,21,0.28)]",
                )}
              >
                <Marker color={kind.color}>{kind.label}</Marker>
                <span className="flex-1 text-pretty font-medium text-foreground">
                  {resource.label}
                </span>
                <ArrowRightBold
                  className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
