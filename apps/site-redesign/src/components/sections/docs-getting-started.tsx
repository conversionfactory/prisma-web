"use client";

import {
  ArrowDown,
  ArrowRight,
  Blocks,
  Bot,
  Boxes,
  Check,
  ChevronDown,
  Copy,
  Cpu,
  Database,
  FolderPlus,
  Laptop,
  MessageSquare,
  Milestone,
  NotebookTabs,
  Plug,
  Rocket,
  SquarePen,
  Terminal,
  X,
} from "lucide-react";
import { Fragment, type ReactNode, useEffect, useRef, useState } from "react";
import { IconTile } from "@/components/brand/icon-tile";
import { PrismRay } from "@/components/brand/prism-ray";
import { BucketIcon } from "@/components/icons/bucket";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DOCS_SETUPS } from "@/data/docs-setups";
import { cn } from "@/lib/utils";

// The prisma.io/docs getting-started landing, rebuilt on the brand design.
// Structure and copy are the live page's (prisma/web apps/docs index.mdx); the
// styling is the redesign's — brand panel cards, IconTile, Marker badges, the
// prism halo and PrismRay light, black pill buttons. Doc links point at
// prisma.io until the redesign owns the docs surface.

const D = "https://www.prisma.io/docs";

/** Renders `backtick` spans in a plain string as inline code. */
function InlineCode({ text }: { text: string }) {
  return (
    <>
      {text.split(/`([^`]+)`/g).map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded-md border border-black/[0.06] bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground"
          >
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="spectrum-link font-medium text-foreground"
    >
      {children}
    </a>
  );
}

function Badge({ children }: { children: ReactNode }) {
  // Brand badge rule: a squared chip with the colour in the dot, never a pill.
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-black/[0.09] bg-white px-2 py-0.5 text-[0.6875rem] font-semibold leading-4 text-foreground">
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-prism-cyan-400" />
      {children}
    </span>
  );
}

// A small icon tile: the brand IconTile (spectral wash) for lucide glyphs, a
// plain white tile for technology logos and the mono fallback.
function Tile({
  src,
  darkSrc,
  invertDark,
  mono,
  icon,
}: {
  src?: string;
  darkSrc?: string;
  invertDark?: boolean;
  mono?: string;
  icon?: ReactNode;
}) {
  if (icon) {
    return (
      <IconTile className="size-10 rounded-lg">
        <span className="text-foreground [&_svg]:size-5">{icon}</span>
      </IconTile>
    );
  }
  return (
    <span
      aria-hidden
      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-black/[0.06] bg-white"
    >
      {src ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className={cn(
              "size-5 object-contain",
              darkSrc && "dark:hidden",
              invertDark && "dark:invert",
            )}
          />
          {darkSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={darkSrc} alt="" className="hidden size-5 object-contain dark:block" />
          )}
        </>
      ) : (
        <span className="font-mono text-sm font-semibold text-muted-foreground">{mono}</span>
      )}
    </span>
  );
}

// ---- Interactive: copy-able agent prompts in a modal --------------------

function useCopy() {
  const [checked, setChecked] = useState(false);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setChecked(true);
      setTimeout(() => setChecked(false), 1600);
    } catch {
      // clipboard unavailable (insecure context) — fail quietly
    }
  };
  return [checked, copy] as const;
}

function Modal({
  open,
  onClose,
  title,
  action,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto w-[min(48rem,calc(100vw-2rem))] rounded-2xl border border-black/[0.08] bg-card p-0 text-foreground shadow-[0_24px_60px_-20px_rgba(21,21,21,0.35)] backdrop:bg-black/50"
    >
      <div className="flex items-center gap-3 border-b border-black/[0.06] px-4 py-3">
        <span className="grow text-sm font-semibold">{title}</span>
        {action}
        <button
          aria-label="Close"
          onClick={onClose}
          className="inline-flex items-center rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto p-4">{children}</div>
    </dialog>
  );
}

function AgentPrompt({
  title,
  guideHref,
  guideTitle,
  prompt,
  icon,
}: {
  title: string;
  guideHref: string;
  guideTitle: string;
  prompt: string;
  icon: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [checked, copy] = useCopy();
  const copyBtn = (
    <Button size="sm" onClick={() => copy(prompt)}>
      {checked ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      Copy prompt
    </Button>
  );
  return (
    <div className="my-3 rounded-xl border border-black/[0.06] bg-card">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 p-3">
        <Tile icon={icon} />
        <span className="min-w-48 flex-1 text-sm font-medium text-foreground">{title}</span>
        {/* One group so the actions wrap together and stay right-aligned. */}
        <div className="ms-auto flex shrink-0 items-center gap-3">
          <a
            href={guideHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground"
          >
            <span className="spectrum-link">{guideTitle}</span>
            <ArrowRight className="size-3.5" aria-hidden />
          </a>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={open}
          >
            <ChevronDown className="size-3.5" aria-hidden />
            View
          </Button>
          {copyBtn}
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title={title} action={copyBtn}>
        <pre className="w-full whitespace-pre-wrap rounded-lg border border-black/[0.06] bg-muted/50 p-4 font-mono text-[0.8rem] leading-6 text-foreground">
          {prompt}
        </pre>
      </Modal>
    </div>
  );
}

// Copies the page's markdown. Fetches the .md content (falls back to copying the
// URL if the cross-origin fetch is blocked), matching the live LLMCopyButton.
function CopyMarkdown({ markdownUrl }: { markdownUrl: string }) {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const onClick = async () => {
    setLoading(true);
    let text = markdownUrl;
    try {
      const res = await fetch(markdownUrl);
      if (res.ok) text = await res.text();
    } catch {
      // cross-origin fetch blocked — fall back to the URL
    }
    try {
      await navigator.clipboard.writeText(text);
      setChecked(true);
      setTimeout(() => setChecked(false), 1600);
    } catch {
      // clipboard unavailable
    }
    setLoading(false);
  };
  return (
    <Button variant="outline" size="sm" disabled={loading} onClick={onClick}>
      {checked ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      Copy Markdown
    </Button>
  );
}

function GithubMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function OpenAIMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  );
}

function AnthropicMark() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="size-4">
      <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
    </svg>
  );
}

// Open the page's markdown in an LLM (or on GitHub). Exposed inline — one button
// per tool — so it's immediately obvious the docs open in your favourite AI tool.
function OpenInTools({ markdownUrl, githubUrl }: { markdownUrl: string; githubUrl: string }) {
  const q = `Read ${markdownUrl}, I want to ask questions about it.`;
  const items = [
    {
      title: "ChatGPT",
      href: `https://chatgpt.com/?${new URLSearchParams({ hints: "search", q })}`,
      icon: <OpenAIMark />,
    },
    {
      title: "Claude",
      href: `https://claude.ai/new?${new URLSearchParams({ q })}`,
      description: "Previews the prompt and asks you to confirm",
      icon: <AnthropicMark />,
    },
    {
      title: "T3 Chat",
      href: `https://t3.chat/new?${new URLSearchParams({ q, search: "true" })}`,
      icon: <MessageSquare className="size-4" />,
    },
    { title: "GitHub", href: githubUrl, icon: <GithubMark /> },
  ];
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Open in</span>
        <div className="flex items-center gap-1.5">
          {items.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon-sm"
                  asChild
                  aria-label={`Open in ${item.title}`}
                >
                  <a href={item.href} target="_blank" rel="noreferrer noopener">
                    {item.icon}
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-[16rem] text-center">
                <span className="font-medium">Open in {item.title}</span>
                {item.description && (
                  <span className="mt-0.5 block text-background/70">{item.description}</span>
                )}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
}

const SETUP_ICONS = [FolderPlus, Plug, Boxes, Database, Rocket];

function OtherSetups() {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-2 rounded-xl border border-black/[0.06] bg-card">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 p-3">
        <Tile icon={<FolderPlus />} />
        <span className="min-w-0 grow">
          <span className="block text-sm font-medium text-foreground">
            Existing project, your own database, or a single product on its own
          </span>
          <span className="block text-xs text-muted-foreground">
            Five paths: add to an existing project, bring your own Postgres, or use the ORM,
            Postgres, or Compute alone.
          </span>
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <ChevronDown className="size-3.5" aria-hidden />
          View
        </Button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Other setup paths">
        {DOCS_SETUPS.map((setup, i) => {
          const Icon = SETUP_ICONS[i] ?? FolderPlus;
          return (
            <AgentPrompt
              key={setup.title}
              title={setup.title}
              guideHref={setup.guideHref}
              guideTitle={setup.guideTitle}
              prompt={setup.prompt}
              icon={<Icon />}
            />
          );
        })}
        <p className="mt-4 text-sm leading-6 text-muted-foreground">
          If you&apos;re using MongoDB, follow the{" "}
          <InlineLink href={`${D}/prisma-orm/quickstart/mongodb`}>MongoDB quickstart</InlineLink> or{" "}
          <InlineLink href={`${D}/prisma-orm/add-to-existing-project/mongodb`}>
            add Prisma ORM to an existing MongoDB app
          </InlineLink>
          . If you work with{" "}
          <InlineLink href={`${D}/prisma-postgres/quickstart/kysely`}>Kysely</InlineLink>,{" "}
          <InlineLink href={`${D}/prisma-postgres/quickstart/drizzle-orm`}>Drizzle</InlineLink>, or{" "}
          <InlineLink href={`${D}/prisma-postgres/quickstart/typeorm`}>TypeORM</InlineLink>, follow
          the Prisma Postgres quickstart for that tool.
        </p>
      </Modal>
    </div>
  );
}

// ---- Layout building blocks ---------------------------------------------

function slug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// The prism accents cycle through the brand palette so each panel reads as its
// own stop rather than one long list.
const SECTION_ACCENTS = ["bg-prism-cyan-400", "bg-prism-yellow-300", "bg-prism-red-500"];

// A section rendered as a self-contained halo panel: rounded brand card wearing
// the prism glow, numbered eyebrow, header stacked above the content.
function SectionRow({
  index,
  title,
  description,
  children,
}: {
  index: number;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const id = slug(title);
  const accent = SECTION_ACCENTS[index % SECTION_ACCENTS.length];
  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-black/[0.06] bg-gradient-to-br from-prism-cyan-50/50 via-card to-card p-6 sm:p-8">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 -z-10 size-56 rounded-full opacity-[0.13] blur-[46px]"
        style={{ background: HALO }}
      />
      <span className="inline-flex items-center gap-2 font-mono text-xs font-medium tracking-[0.14em] text-muted-foreground">
        <span aria-hidden className={cn("size-1.5 rounded-full", accent)} />
        {String(index + 1).padStart(2, "0")}
      </span>
      <h2 id={id} className="mt-2 scroll-mt-28 text-2xl leading-tight">
        {title}
      </h2>
      <p className="mt-2 max-w-2xl text-[0.9375rem] leading-7 text-muted-foreground">
        <InlineCode text={description} />
      </p>
      <div className="mt-6 min-w-0">{children}</div>
    </section>
  );
}

function IconGrid({ columns = 2, children }: { columns?: 2 | 3; children: ReactNode }) {
  return (
    <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", columns === 3 && "lg:grid-cols-3")}>
      {children}
    </div>
  );
}

type LinkTile = {
  href: string;
  title: string;
  src?: string;
  darkSrc?: string;
  invertDark?: boolean;
  mono?: string;
  icon?: ReactNode;
  description?: string;
  badge?: string;
};

function IconLink({
  href,
  title,
  src,
  darkSrc,
  invertDark,
  mono,
  icon,
  description,
  badge,
}: LinkTile) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group flex gap-3 rounded-xl border border-black/[0.06] bg-card p-3 shadow-[0_1px_2px_rgba(21,21,21,0.04)] transition-[box-shadow,border-color] hover:border-black/10 hover:shadow-[0_1px_2px_rgba(21,21,21,0.04),0_14px_28px_-20px_rgba(21,21,21,0.25)]",
        description ? "items-start" : "items-center",
      )}
    >
      <Tile src={src} darkSrc={darkSrc} invertDark={invertDark} mono={mono} icon={icon} />
      <span className="min-w-0">
        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
          {title}
          {badge && <Badge>{badge}</Badge>}
        </span>
        {description && (
          <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
            {description}
          </span>
        )}
      </span>
    </a>
  );
}

// The prism halo behind each workflow stage — brand palette, from hero-home.
const HALO =
  "conic-gradient(var(--color-prism-yellow-300), var(--color-prism-red-500) 32%, var(--color-prism-cyan-400) 64%, var(--color-prism-yellow-300))";

function WorkflowLink({ href, title, badge, icon, description }: LinkTile) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3.5 rounded-xl border border-black/[0.06] bg-white/80 p-3.5 shadow-[0_1px_2px_rgba(21,21,21,0.04)] transition-[box-shadow,border-color] hover:border-black/10 hover:shadow-[0_1px_2px_rgba(21,21,21,0.04),0_14px_28px_-20px_rgba(21,21,21,0.25)]"
    >
      <Tile icon={icon} />
      <span className="min-w-0 grow">
        <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
          {title}
          {badge && <Badge>{badge}</Badge>}
        </span>
        <span className="mt-0.5 block text-xs leading-5 text-muted-foreground">{description}</span>
      </span>
      <span
        aria-hidden
        className="inline-flex shrink-0 items-center gap-1 self-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground"
      >
        docs
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </a>
  );
}

function WorkflowStage({
  title,
  description,
  links,
}: {
  title: string;
  description: string;
  links: LinkTile[];
}) {
  return (
    <section className="relative isolate flex flex-col rounded-2xl border border-black/[0.06] bg-gradient-to-br from-prism-cyan-50/60 via-card to-card p-5 sm:p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-20 blur-[18px]"
        style={{ background: HALO }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-3 -z-10 rounded-3xl opacity-[0.12] blur-[44px]"
        style={{ background: HALO }}
      />
      <h3 className="text-lg leading-tight">{title}</h3>
      <p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p>
      <div className="mt-4 flex grow flex-col gap-3">
        {links.map((link) => (
          <WorkflowLink key={link.href} {...link} />
        ))}
      </div>
    </section>
  );
}

// ---- Content ------------------------------------------------------------

const BUILD: LinkTile[] = [
  {
    href: `${D}/local-development`,
    title: "Local development",
    icon: <Laptop />,
    description:
      "One command runs your whole app on your machine, with your services on Bun wired to local Postgres and local storage, and no cloud credentials.",
  },
  {
    href: `${D}/composer`,
    title: "Composer",
    badge: "Early Access",
    icon: <Blocks />,
    description:
      "Declare your services and the resources they depend on: databases, jobs, buckets, secrets.",
  },
  {
    href: `${D}/orm`,
    title: "ORM",
    icon: <Boxes />,
    description: "Model your data and query it with type safety, end to end.",
  },
];

const DEPLOY: LinkTile[] = [
  {
    href: `${D}/compute`,
    title: "Compute",
    icon: <Cpu />,
    description: "Hosting for your services, next to your data.",
  },
  {
    href: `${D}/storage`,
    title: "Storage",
    icon: <BucketIcon />,
    description: "S3-compatible object storage inside your project.",
  },
  {
    href: `${D}/postgres`,
    title: "Postgres",
    icon: <Database />,
    description: "Managed PostgreSQL, provisioned during setup.",
  },
  {
    href: `${D}/prisma-compute/deploy`,
    title: "Deploy",
    icon: <Rocket />,
    description:
      "Ship from a git push, the Console, or Composer. Every branch gets its own environment.",
  },
];

const FRAMEWORKS: LinkTile[] = [
  {
    href: `${D}/guides/frameworks/nextjs`,
    title: "Next.js",
    src: "/img/technologies/nextjs.svg",
    invertDark: true,
  },
  { href: `${D}/guides/frameworks/hono`, title: "Hono", src: "/img/technologies/hono.svg" },
  {
    href: `${D}/guides/frameworks/tanstack-start`,
    title: "TanStack Start",
    src: "/img/technologies/tanstack.svg",
  },
  { href: `${D}/guides/frameworks/nestjs`, title: "NestJS", src: "/img/technologies/nestjs.svg" },
  {
    href: `${D}/guides/frameworks/astro`,
    title: "Astro",
    src: "/img/technologies/astro.svg",
    darkSrc: "/img/technologies/astrodark.svg",
  },
  { href: `${D}/guides/frameworks/nuxt`, title: "Nuxt", src: "/img/technologies/nuxtjs.svg" },
  {
    href: `${D}/guides/frameworks/sveltekit`,
    title: "SvelteKit",
    src: "/img/technologies/sveltekit.svg",
  },
  { href: `${D}/guides/runtimes/bun`, title: "Bun", src: "/img/technologies/bun.svg" },
  { href: `${D}/guides/frameworks/elysia`, title: "Elysia", mono: "E" },
  {
    href: `${D}/guides/runtimes/deno`,
    title: "Deno",
    src: "/img/technologies/deno.svg",
    invertDark: true,
  },
];

const ORM7: LinkTile[] = [
  {
    href: `${D}/v7/getting-started`,
    title: "Prisma ORM 7 setup paths",
    description: "All database quickstarts, plus the agent prompt",
    icon: <Milestone />,
  },
  {
    href: `${D}/v7/prisma-orm/quickstart/prisma-postgres`,
    title: "Prisma ORM 7 quickstart",
    description: "With Prisma Postgres",
    badge: "5 min",
    icon: <Database />,
  },
];

const BROWSE: LinkTile[] = [
  {
    href: `${D}/orm`,
    title: "Prisma ORM",
    description: "Prisma ORM 8, with Prisma ORM 7 docs",
    icon: <Boxes />,
  },
  {
    href: `${D}/postgres`,
    title: "Prisma Postgres",
    description: "The managed database",
    icon: <Database />,
  },
  {
    href: `${D}/compute`,
    title: "Prisma Compute",
    description: "Hosting and branching",
    icon: <Cpu />,
  },
  {
    href: `${D}/cli`,
    title: "CLI reference",
    description: "Every command and flag",
    icon: <Terminal />,
  },
  {
    href: `${D}/guides`,
    title: "Guides",
    description: "Frameworks and workflows",
    icon: <NotebookTabs />,
  },
  { href: `${D}/ai`, title: "AI tools", description: "Skills, MCP, and prompts", icon: <Bot /> },
];

export function DocsGettingStarted() {
  return (
    <div>
      {/* Hero */}
      <div className="relative isolate pb-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-10 top-16 -bottom-8 -z-10 overflow-hidden"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, #000 5rem)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 5rem)",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: [
                "radial-gradient(38% 45% at 78% 16%, color-mix(in srgb, var(--color-prism-cyan-400) 20%, transparent), transparent 68%)",
                "radial-gradient(30% 38% at 94% 55%, color-mix(in srgb, var(--color-prism-yellow-300) 15%, transparent), transparent 66%)",
              ].join(","),
            }}
          />
          <PrismRay
            intensity="structural"
            className="left-[24%] top-[52%] h-12 w-[90rem] -translate-y-1/2"
          />
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="max-w-[20ch] text-balance text-[clamp(2rem,3.2vw,2.75rem)] leading-[1.08]">
            Get started with Prisma
          </h1>
          <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2">
            <OpenInTools
              markdownUrl={`${D}/index.md`}
              githubUrl="https://github.com/prisma/web/blob/main/apps/docs/content/docs/(index)/index.mdx"
            />
            <CopyMarkdown markdownUrl={`${D}/index.md`} />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-8">
          <div className="max-w-[68ch] space-y-2 text-[1.0625rem] leading-relaxed text-foreground/80">
            <p>
              Prisma is a complete TypeScript stack with one workflow:{" "}
              <strong className="font-semibold text-foreground">build</strong> your app and run all
              of it on your machine, then{" "}
              <strong className="font-semibold text-foreground">deploy</strong> it to the Prisma
              platform with one command. Check out the{" "}
              <InlineLink href={`${D}/full-stack-tutorial`}>full-stack tutorial</InlineLink>.
            </p>
            <p>
              Here for the ORM? Jump straight to{" "}
              <InlineLink href={`${D}/orm/v7`}>Prisma ORM 7</InlineLink> or{" "}
              <InlineLink href={`${D}/orm`}>Prisma ORM 8</InlineLink>, or check the{" "}
              <InlineLink href={`${D}/prisma-orm/release-status`}>release status</InlineLink> first.
            </p>
          </div>

          {/* Workflow grid: Build -> Deploy */}
          <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <WorkflowStage
              title="Build"
              description="Define the app in TypeScript and run everything locally before you ship."
              links={BUILD}
            />
            <span
              className="flex items-center justify-center self-center text-muted-foreground/70"
              aria-hidden
            >
              <ArrowDown className="size-5 lg:hidden" />
              <ArrowRight className="hidden size-5 lg:block" />
            </span>
            <WorkflowStage
              title="Deploy"
              description="One deploy provisions everything on the Prisma platform and connects it."
              links={DEPLOY}
            />
          </div>

          {/* CLI callout */}
          <aside className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-black/[0.06] bg-card px-4 py-3.5 shadow-[0_1px_2px_rgba(21,21,21,0.04)]">
            <Tile icon={<Terminal />} />
            <span className="min-w-0 grow text-sm leading-6 text-foreground/80">
              <InlineCode text="One CLI serves the whole stack: `npx prisma@latest` drives the ORM and the Prisma platform, from migrations and local dev to deploys, databases, and buckets, for you and your coding agent." />
            </span>
            <Button variant="outline" size="sm" asChild>
              <a href={`${D}/cli`} target="_blank" rel="noopener noreferrer">
                CLI reference
                <ArrowRight className="size-3.5" aria-hidden />
              </a>
            </Button>
          </aside>
        </div>
      </div>

      {/* Section panels */}
      <div className="mt-4 flex flex-col gap-6">
        {/* Pick your framework */}
        <SectionRow
          index={0}
          title="Pick your framework"
          description="Every guide runs the same journey with the same commands: scaffold, connect Prisma Postgres, run a real query, and deploy. SvelteKit and Deno don't deploy to Compute yet; their guides stop at a verified local run."
        >
          <IconGrid columns={3}>
            {FRAMEWORKS.map((f) => (
              <IconLink key={f.href} {...f} />
            ))}
          </IconGrid>
          <p className="mt-7 text-sm leading-7 text-muted-foreground">
            If you&apos;re using Express or another Node.js server, follow the{" "}
            <InlineLink href={`${D}/prisma-orm/add-to-existing-project/postgresql`}>
              existing-project path
            </InlineLink>{" "}
            instead.
          </p>
        </SectionRow>

        {/* Prisma ORM 7 */}
        <SectionRow
          index={1}
          title="Prisma ORM 7"
          description="Prisma ORM 7 remains fully supported. Scaffold it with `npx create-prisma@stable`, or add it to an existing project with `npx prisma@7.10.0 init`. It pairs with Prisma Postgres and Prisma Compute the same way. When you're ready, Prisma ORM 8 is the upgrade path."
        >
          <IconGrid>
            {ORM7.map((l) => (
              <IconLink key={l.href} {...l} />
            ))}
          </IconGrid>
        </SectionRow>

        {/* Other setups */}
        <SectionRow
          index={2}
          title="Other setups"
          description="If you already have an app or a database, or need a single Prisma product on its own, each path below has a guide to follow and a prompt to hand to your agent."
        >
          <OtherSetups />
        </SectionRow>

        {/* Browse the docs */}
        <SectionRow
          index={3}
          title="Browse the docs"
          description="This page hides the full navigation to keep the first run focused. These links open the full docs for each product."
        >
          <IconGrid columns={3}>
            {BROWSE.map((l) => (
              <IconLink key={l.href} {...l} />
            ))}
          </IconGrid>
        </SectionRow>
      </div>

      {/* Footer: edit link + the next-page nav card (right-aligned, as on the
          live docs — the only pagination card since this is the first page). */}
      <footer className="mt-10 flex flex-col gap-6">
        <div>
          <Button variant="outline" size="sm" asChild>
            <a
              href="https://github.com/prisma/web/edit/main/apps/docs/content/docs/(index)/index.mdx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SquarePen className="size-3.5" aria-hidden />
              Edit on GitHub
            </a>
          </Button>
        </div>
        <a
          href={`${D}/getting-started`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-end rounded-xl border border-black/[0.06] bg-card p-5 text-right shadow-[0_1px_2px_rgba(21,21,21,0.04)] transition-[box-shadow,border-color] hover:border-black/10 hover:shadow-[0_1px_2px_rgba(21,21,21,0.04),0_14px_28px_-20px_rgba(21,21,21,0.25)]"
        >
          <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            Choose a Prisma ORM setup path
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
          <span className="mt-1 text-sm leading-6 text-muted-foreground">
            Choose the fastest path to try Prisma ORM in a new or existing project.
          </span>
        </a>
      </footer>
    </div>
  );
}
