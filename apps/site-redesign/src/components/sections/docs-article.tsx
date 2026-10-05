"use client";

import { ArrowLeft, ArrowRight, Check, Copy, Info } from "lucide-react";
import { type ReactNode, useState } from "react";
import {
  CopyMarkdown,
  IconGrid,
  IconLink,
  InlineCode,
  OpenInTools,
  useCopy,
} from "@/components/sections/docs-getting-started";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DOCS_ARTICLES, type DocsBlock } from "@/data/docs-articles";
import { cn } from "@/lib/utils";

// A docs article on the brand design, inside the same DocsShell as /docs. The
// hero actions, inline code, link tiles and pager card are the /docs landing's
// own pieces, so an article and the landing read as one surface.

const D = "https://www.prisma.io/docs";

function anchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function CopyCode({ code }: { code: string }) {
  const [checked, copy] = useCopy();
  return (
    <button
      aria-label="Copy code"
      onClick={() => copy(code)}
      className="inline-flex items-center rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-black/[0.04] hover:text-foreground"
    >
      {checked ? <Check className="size-3.5" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
    </button>
  );
}

function CodeFrame({ header, children }: { header: ReactNode; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/[0.06] bg-muted/50">
      <div className="flex min-h-10 items-center gap-2 border-b border-black/[0.06] bg-card px-3">
        {header}
      </div>
      {children}
    </div>
  );
}

// The site maps font-mono to Inter, which is fine for labels but misaligns
// real code, so code bodies use the system monospace stack.
function Pre({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-6 text-foreground">
      <code className="font-[family-name:ui-monospace,SFMono-Regular,Menlo,monospace]">{code}</code>
    </pre>
  );
}

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <CodeFrame
      header={
        <>
          <span className="grow font-mono text-xs text-muted-foreground">{lang}</span>
          <CopyCode code={code} />
        </>
      }
    >
      <Pre code={code} />
    </CodeFrame>
  );
}

function CodeTabs({ tabs }: { tabs: { label: string; lang: string; code: string }[] }) {
  const [active, setActive] = useState(tabs[0].label);
  const current = tabs.find((t) => t.label === active) ?? tabs[0];
  return (
    <Tabs value={active} onValueChange={setActive} className="gap-0">
      <CodeFrame
        header={
          <>
            <TabsList variant="line" className="grow justify-start">
              {tabs.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.label} className="flex-none font-mono text-xs">
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <CopyCode code={current.code} />
          </>
        }
      >
        {tabs.map((tab) => (
          <TabsContent key={tab.label} value={tab.label}>
            <Pre code={tab.code} />
          </TabsContent>
        ))}
      </CodeFrame>
    </Tabs>
  );
}

function Note({ text }: { text: string }) {
  return (
    <aside className="flex gap-3 rounded-xl border border-black/[0.06] bg-gradient-to-br from-prism-cyan-50/60 via-card to-card px-4 py-3.5 text-[0.9375rem] leading-7 text-foreground/80">
      <Info className="mt-1.5 size-4 shrink-0 text-prism-cyan-600" aria-hidden />
      <p>
        <strong className="font-semibold text-foreground">Note:</strong>{" "}
        <InlineCode text={text} />
      </p>
    </aside>
  );
}

function Block({ block }: { block: DocsBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="max-w-[68ch] text-[0.9375rem] leading-7 text-foreground/80">
          <InlineCode text={block.text} />
        </p>
      );
    case "code":
      return <CodeBlock lang={block.lang} code={block.code} />;
    case "note":
      return <Note text={block.text} />;
    case "tabs":
      return <CodeTabs tabs={block.tabs} />;
  }
}

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 id={anchor(children)} className="scroll-mt-28 text-2xl leading-tight">
      {children}
    </h2>
  );
}

function Helpful() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
      <h3 className="text-lg leading-tight">Was this page helpful?</h3>
      <div className="flex gap-2">
        {(["yes", "no"] as const).map((value) => (
          <Button
            key={value}
            variant={answer === value ? "default" : "outline"}
            size="sm"
            aria-pressed={answer === value}
            onClick={() => setAnswer(value)}
          >
            {value === "yes" ? "Yes" : "No"}
          </Button>
        ))}
      </div>
    </div>
  );
}

function PagerCard({ href, title, dir }: { href: string; title: string; dir: "prev" | "next" }) {
  return (
    <a
      href={href}
      className={cn(
        "group flex flex-col rounded-xl border border-black/[0.06] bg-card p-5 shadow-[0_1px_2px_rgba(21,21,21,0.04)] transition-[box-shadow,border-color] hover:border-black/10 hover:shadow-[0_1px_2px_rgba(21,21,21,0.04),0_14px_28px_-20px_rgba(21,21,21,0.25)]",
        dir === "next" ? "items-end text-right sm:col-start-2" : "items-start",
      )}
    >
      <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
        {dir === "prev" && (
          <ArrowLeft
            className="size-3.5 transition-transform group-hover:-translate-x-0.5"
            aria-hidden
          />
        )}
        {title}
        {dir === "next" && (
          <ArrowRight
            className="size-3.5 transition-transform group-hover:translate-x-0.5"
            aria-hidden
          />
        )}
      </span>
    </a>
  );
}

// Takes the slug rather than the article: the related links carry icon
// components, which can't cross the server/client boundary as props.
export function DocsArticle({ slug }: { slug: string }) {
  const article = DOCS_ARTICLES[slug];
  const markdownUrl = `${D}/${article.slug}.md`;
  return (
    <article>
      <header className="border-b border-black/[0.06] pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="max-w-[24ch] text-balance text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08]">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <OpenInTools
              markdownUrl={markdownUrl}
              githubUrl={`https://github.com/prisma/web/blob/main/apps/docs/content/docs/${article.slug}.mdx`}
            />
            <CopyMarkdown markdownUrl={markdownUrl} />
          </div>
        </div>
        <p className="mt-6 max-w-[68ch] text-[1.0625rem] leading-relaxed text-foreground/80">
          <InlineCode text={article.intro} />
        </p>
      </header>

      <div className="flex flex-col gap-12 pt-10">
        {article.sections.map((section, i) => (
          <section key={i} className="flex flex-col gap-5">
            <SectionHeading>{section.heading}</SectionHeading>
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </section>
        ))}

        <section className="flex flex-col gap-5">
          <SectionHeading>{article.related.heading}</SectionHeading>
          <IconGrid columns={3}>
            {article.related.links.map(({ icon: Icon, ...link }) => (
              <IconLink key={link.title} {...link} icon={<Icon />} />
            ))}
          </IconGrid>
        </section>
      </div>

      <footer className="mt-12 flex flex-col gap-8 border-t border-black/[0.06] pt-8">
        <Helpful />
        {(article.prev || article.next) && (
          <nav aria-label="Pagination" className="grid gap-4 sm:grid-cols-2">
            {article.prev && <PagerCard dir="prev" {...article.prev} />}
            {article.next && <PagerCard dir="next" {...article.next} />}
          </nav>
        )}
      </footer>
    </article>
  );
}
