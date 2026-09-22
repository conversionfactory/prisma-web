import { Texture } from "@/components/brand/texture";
import { DocsSidebar } from "@/components/sections/docs-sidebar";
import { DocsTopBar } from "@/components/sections/docs-topbar";

// The docs shell, matching the live prisma.io/docs layout: the docs top-bar
// (brand + search + Ask AI + social/auth) over the site's standard grained
// background (the shared Texture at its standard 0.06/multiply), with the left
// navbar riding alongside the content, which sits in one large rounded white
// "notebook" card. On /docs the marketing header is swapped out for the docs
// top-bar, so the preview mirrors the real docs experience; the card clips the
// hero's prism light at its edges.
export function DocsShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-muted">
      <Texture opacity={0.06} blend="multiply" />
      <DocsTopBar />
      <div className="relative mx-auto max-w-[90rem] px-3 pb-16 pt-8 sm:px-5 lg:px-6">
        <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-8">
          <DocsSidebar />
          <main className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white px-6 py-10 shadow-[0_1px_2px_rgba(21,21,21,0.04),0_30px_60px_-40px_rgba(21,21,21,0.28)] sm:px-10 sm:py-12 lg:px-14">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
