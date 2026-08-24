import { ChevronRight } from "@/components/icons/forma"

// MDX components for ported blog posts. The production blog (apps/blog) renders
// these through Fumadocs; here they're supplied to next-mdx-remote so the same
// article bodies render in the redesign. Kept intentionally light and on-brand
// (native <details>, a card pull-quote). Interactive demos degrade to a link.

export function Accordions({ children }: { children: React.ReactNode }) {
  return <div className="not-prose my-6 flex flex-col gap-2">{children}</div>
}

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group rounded-xl border border-black/[0.08] bg-card px-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold text-foreground [&::-webkit-details-marker]:hidden">
        <span>{title}</span>
        <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
      </summary>
      <div className="prose prose-neutral max-w-none pb-5 pt-1">{children}</div>
    </details>
  )
}

export function Quotes({
  speakerName,
  speakerImgLink,
  children,
}: {
  speakerName?: string
  speakerImgLink?: string
  children: React.ReactNode
}) {
  return (
    <figure className="not-prose my-8 rounded-2xl border border-black/[0.06] bg-card p-6 sm:p-8">
      <blockquote className="text-balance text-lg leading-relaxed text-foreground">
        &ldquo;{children}&rdquo;
      </blockquote>
      {speakerName ? (
        <figcaption className="mt-5 flex items-center gap-3">
          {speakerImgLink ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={speakerImgLink} alt={speakerName} className="size-10 rounded-full object-cover" />
          ) : null}
          <span className="text-sm font-semibold text-foreground">{speakerName}</span>
        </figcaption>
      ) : null}
    </figure>
  )
}

// Fallback for the production blog's interactive demos (VectorSpaceDemo,
// PgvectorDemoRunner, ServerlessPostgresChooser) — not ported, so link out.
function interactiveDemo(articleUrl: string) {
  return function InteractiveDemo() {
    return (
      <div className="not-prose my-8 rounded-2xl border border-dashed border-black/[0.16] bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">
          This section has an interactive demo.{" "}
          <a
            href={articleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline underline-offset-2"
          >
            Try it on the Prisma blog &rarr;
          </a>
        </p>
      </div>
    )
  }
}

// Components map for MDXRemote. `articleUrl` is the original post so the
// interactive-demo fallbacks can link straight to it.
export function blogMdxComponents(articleUrl: string) {
  const InteractiveDemo = interactiveDemo(articleUrl)
  return {
    Accordions,
    Accordion,
    Quotes,
    VectorSpaceDemo: InteractiveDemo,
    PgvectorDemoRunner: InteractiveDemo,
    ServerlessPostgresChooser: InteractiveDemo,
  }
}
