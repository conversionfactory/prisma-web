"use client";

import { MessagesSquare, Monitor, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Discord, Github, Search } from "@/components/icons/forma";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

// The docs top-bar, mirroring the live prisma.io/docs header (matched against a
// screenshot of the real bar): logo + "/ docs" on the left; on the right a
// compact search pill (icon + ⌘K), an "Ask AI" pill (⌘I), plain GitHub /
// Discord icons, the solid black "Login" pill, and the theme toggle with the
// active choice filled in brand cyan. The bar is translucent with a backdrop
// blur so the page shows through, and — like the live bar and the marketing
// header — it docks full-width at the top of the page and detaches into a
// floating pill on scroll.
//
// Search, Ask AI, and the theme toggle are presentational in this preview —
// they're served by Prisma's docs shell (Orama index, AI endpoint, dark-mode
// styles) which isn't part of this standalone clone. Shortcuts are shown with ⌘
// as on the live site's macOS rendering.
export function DocsTopBar() {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        floating
          ? "border-b border-transparent bg-transparent"
          : "border-b border-black/[0.06] bg-white/55 backdrop-blur-md"
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-14 items-center justify-between gap-3 rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          floating
            ? "my-2 max-w-[calc(100%-1.5rem)] border-black/[0.06] bg-white/70 px-4 shadow-[0_1px_2px_rgba(21,21,21,0.04),0_8px_24px_-8px_rgba(21,21,21,0.16)] backdrop-blur-md lg:max-w-5xl"
            : "max-w-[90rem] border-transparent bg-transparent px-3 sm:px-5 lg:px-6"
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/" className="flex shrink-0 items-center" aria-label="Prisma home">
            <Image
              src="/logo/full-color.svg"
              alt={siteConfig.name}
              width={96}
              height={24}
              priority
            />
          </Link>
          <span aria-hidden className="text-lg text-muted-foreground/50">
            /
          </span>
          <Link
            href="/docs"
            className="text-sm font-semibold text-foreground"
            aria-label="Prisma documentation home"
          >
            docs
          </Link>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <button
            type="button"
            aria-label="Search"
            title="Search is served by Prisma's docs shell in production"
            className="hidden h-8 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/70 px-2.5 text-muted-foreground transition-colors hover:border-black/15 hover:bg-white md:inline-flex"
          >
            <Search className="size-4 shrink-0" />
            <span className="inline-flex gap-0.5">
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </span>
          </button>

          <button
            type="button"
            title="Ask AI is served by Prisma's docs shell in production"
            className="inline-flex h-8 items-center gap-1.5 rounded-full border border-black/[0.08] bg-white/70 px-2.5 text-sm font-medium text-foreground/85 transition-colors hover:border-black/15 hover:bg-white"
          >
            <MessagesSquare className="size-4 shrink-0 text-muted-foreground" aria-hidden />
            Ask AI
            <span className="hidden gap-0.5 md:inline-flex">
              <Kbd>⌘</Kbd>
              <Kbd>I</Kbd>
            </span>
          </button>

          <div className="hidden items-center gap-1.5 md:flex">
            <a
              href="https://pris.ly/github?utm_source=docs&utm_medium=navbar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex size-8 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-foreground"
            >
              <Github className="size-[1.15rem]" />
            </a>
            <a
              href="https://pris.ly/discord?utm_source=docs&utm_medium=navbar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join Discord"
              className="inline-flex size-8 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-foreground"
            >
              <Discord className="size-[1.15rem]" />
            </a>

            <Button size="sm" asChild>
              <a href="https://console.prisma.io/login?utm_source=docs&utm_medium=login">Login</a>
            </Button>

            <div
              className="inline-flex items-center gap-0.5 rounded-full border border-black/[0.08] bg-white/70 p-1"
              title="Theme switching is served by Prisma's docs shell in production"
            >
              <ThemeDot label="light">
                <Sun className="size-3.5" />
              </ThemeDot>
              <ThemeDot label="dark">
                <Moon className="size-3.5" />
              </ThemeDot>
              <ThemeDot label="system" active>
                <Monitor className="size-3.5" />
              </ThemeDot>
            </div>
          </div>

          <button
            type="button"
            aria-label="Open Search"
            title="Search is served by Prisma's docs shell in production"
            className="inline-flex size-8 items-center justify-center rounded-full text-foreground/80 transition-colors hover:text-foreground md:hidden"
          >
            <Search className="size-[1.05rem]" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[1.15rem] items-center justify-center rounded border border-black/10 bg-white px-1 py-0.5 font-mono text-[0.65rem] leading-none text-muted-foreground">
      {children}
    </kbd>
  );
}

function ThemeDot({
  label,
  active,
  children,
}: {
  label: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "inline-flex size-6 items-center justify-center rounded-full transition-colors",
        active
          ? "bg-prism-cyan-400 text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
