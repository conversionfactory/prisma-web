import type { ReactNode } from "react";
import { Texture } from "@/components/brand/texture";
import { DocsSidebar } from "@/components/sections/docs-sidebar";
import { DocsTopBar } from "@/components/sections/docs-topbar";
import { cn } from "@/lib/utils";

// The docs shell, matching the live prisma.io/docs layout: the docs top-bar
// (brand + search + Ask AI + social/auth) over the site's standard grained
// background (the shared Texture at its standard 0.06/multiply), with the left
// navbar riding alongside the content, which sits in one large rounded white
// "notebook" card. On /docs the marketing header is swapped out for the docs
// top-bar, so the preview mirrors the real docs experience; the card clips the
// hero's prism light at its edges.
//
// Article pages swap in their own `sidebar` and add a `toc` column on the
// right ("On this page"), as on the live docs articles.
export function DocsShell({
  children,
  sidebar = <DocsSidebar />,
  toc,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
  toc?: ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-muted">
      <Texture opacity={0.06} blend="multiply" />
      <DocsTopBar />
      <div className="relative mx-auto max-w-[90rem] px-3 pb-16 pt-4 sm:px-5 sm:pt-8 lg:px-6">
        <div
          className={cn(
            "lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8",
            toc && "xl:grid-cols-[15rem_minmax(0,1fr)_13rem]",
          )}
        >
          {sidebar}
          <main className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white px-4 py-8 shadow-[0_1px_2px_rgba(21,21,21,0.04),0_30px_60px_-40px_rgba(21,21,21,0.28)] sm:px-10 sm:py-12 lg:px-14">
            {children}
          </main>
          {toc}
        </div>
      </div>
    </div>
  );
}
