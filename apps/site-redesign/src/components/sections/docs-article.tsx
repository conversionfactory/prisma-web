"use client";

import { ArrowLeft, ArrowRight, Check, ChevronLeft, Copy, Info, TextAlignStart } from "lucide-react";
import Link from "next/link";
import { type CSSProperties, type ReactNode, useEffect, useState } from "react";
import { highlight } from "sugar-high";
import {
  CopyMarkdown,
  DocsHeroLight,
  IconGrid,
  IconLink,
  InlineCode,
  OpenInTools,
  useCopy,
} from "@/components/sections/docs-getting-started";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DOCS_ARTICLES, type DocsArticle as Article, type DocsBlock } from "@/data/docs-articles";
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

// The article's h2s with unique anchor ids (repeated headings get a -2, -3
// suffix), shared by the article body and the "On this page" index.
function headingsOf(article: Article) {
  const seen = new Map<string, number>();
  return [...article.sections.map((s) => s.heading), article.related.heading].map((title) => {
    const base = anchor(title);
    const n = (seen.get(base) ?? 0) + 1;
    seen.set(base, n);
    return { title, id: n > 1 ? `${base}-${n}` : base };
  });
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

// Syntax colours drawn from the prism palette, scoped to code blocks.
const SYNTAX = {
  "--sh-keyword": "var(--color-prism-red-600)",
  "--sh-string": "var(--color-prism-cyan-700)",
  "--sh-jsxliterals": "var(--color-prism-cyan-700)",
  "--sh-class": "var(--color-prism-yellow-700)",
  "--sh-entity": "var(--color-prism-yellow-700)",
  "--sh-property": "var(--color-prism-cyan-800)",
  "--sh-identifier": "var(--foreground)",
  "--sh-sign": "var(--muted-foreground)",
  "--sh-comment": "var(--muted-foreground)",
} as CSSProperties;

// The site maps font-mono to Inter, which is fine for labels but misaligns
// real code, so code bodies use the system monospace stack.
function Pre({ code }: { code: string }) {
  return (
    <pre className="overflow-x-auto p-4 text-[0.8125rem] leading-6 text-foreground" style={SYNTAX}>
      <code
        className="font-[family-name:ui-monospace,SFMono-Regular,Menlo,monospace]"
        dangerouslySetInnerHTML={{ __html: highlight(code) }}
      />
    </pre>
  );
}

// The brand gradient as the active tab's underline.
const SPECTRUM_TAB =
  "after:bg-[linear-gradient(85deg,#01d7e4,#f3c306,#f37a03,#f43531,#f00e5c)]";

function CodeBlock({ lang, code }: { lang: string; code: string }) {
  return (
    <CodeFrame
      header={
        <>
          <span className="flex grow items-center gap-2 font-mono text-xs text-muted-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-prism-cyan-400" />
            {lang}
          </span>
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
                <TabsTrigger key={tab.label} value={tab.label} className={cn("flex-none font-mono text-xs", SPECTRUM_TAB)}>
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
    <aside className="flex gap-3 rounded-xl border border-prism-cyan-200/70 bg-gradient-to-br from-prism-cyan-50 via-prism-cyan-50/40 to-card px-4 py-3.5 text-[0.9375rem] leading-7 text-foreground/80">
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

function SectionHeading({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="scroll-mt-28 text-2xl leading-tight">
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
        "group flex flex-col rounded-xl border border-black/[0.06] bg-gradient-to-br from-prism-cyan-50/50 via-card to-card p-5 shadow-[0_1px_2px_rgba(21,21,21,0.04)] transition-[box-shadow,border-color] hover:border-black/10 hover:shadow-[0_1px_2px_rgba(21,21,21,0.04),0_14px_28px_-20px_rgba(21,21,21,0.25)]",
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
  const headings = headingsOf(article);
  return (
    <article>
      <header className="relative isolate border-b border-black/[0.06] pb-8">
        <DocsHeroLight className="top-0 bottom-0" fadeOut />
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
            <SectionHeading id={headings[i].id}>{section.heading}</SectionHeading>
            {section.blocks.map((block, j) => (
              <Block key={j} block={block} />
            ))}
          </section>
        ))}

        <section className="flex flex-col gap-5">
          <SectionHeading id={headings[headings.length - 1].id}>
            {article.related.heading}
          </SectionHeading>
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

// The article's left nav, as on the live docs articles: back to all docs, then
// the pages around this one, with the current page ringed in the spectrum.
export function DocsArticleNav({ slug }: { slug: string }) {
  const article = DOCS_ARTICLES[slug];
  const pages = [
    article.prev,
    { title: article.title, href: `/docs/${article.slug}`, current: true },
    article.next,
  ].filter((page) => page !== undefined);
  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/docs"
        className="flex items-center gap-1.5 px-2 font-semibold text-foreground transition-colors hover:text-foreground/70"
      >
        <ChevronLeft className="size-4" aria-hidden />
        All docs
      </Link>
      <ul className="flex flex-col gap-0.5">
        {pages.map((page) => {
          const current = "current" in page;
          return (
            <li key={page.title}>
              <a
                href={page.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex rounded-lg px-2 py-1.5 font-medium transition-colors",
                  current
                    ? "spectrum-border spectrum-border-on text-foreground"
                    : "text-foreground/75 hover:bg-black/[0.04] hover:text-foreground",
                )}
              >
                {page.title}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// "On this page": the article's h2s on a rail, the section being read lit in
// the warm end of the spectrum. Shown from xl, where the shell has room for a
// third column.
export function DocsToc({ slug }: { slug: string }) {
  const headings = headingsOf(DOCS_ARTICLES[slug]);
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const headings = headingsOf(DOCS_ARTICLES[slug]);
    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      // A section is "being read" once its heading passes the upper 40% of the
      // viewport.
      const line = window.innerHeight * 0.4;
      let current = headings[0]?.id;
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < line) current = id;
      }
      setActive(atBottom ? headings[headings.length - 1]?.id : current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [slug]);

  return (
    <aside className="hidden xl:block">
      <nav aria-label="On this page" className="sticky top-20 pt-2 text-sm">
        <p className="mb-3 flex items-center gap-2 font-medium text-foreground">
          <TextAlignStart className="size-4 text-muted-foreground" aria-hidden />
          On this page
        </p>
        <ul className="border-l border-black/[0.08]">
          {headings.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  "relative block py-1.5 pl-3 leading-snug transition-colors",
                  id === active
                    ? "text-prism-red-600"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {id === active && (
                  <span
                    aria-hidden
                    className="absolute inset-y-0 -left-px w-0.5 bg-[linear-gradient(to_bottom,#f43531,#f00e5c)]"
                  />
                )}
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
