import type { Metadata } from "next";
import { BlogBrowser } from "@/components/sections/blog-browser";
import { BlogHero } from "@/components/sections/blog-hero";
import { CtaBurst } from "@/components/sections/cta-burst";
import { LogoCloud } from "@/components/sections/logo-cloud";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Releases, Postgres deep dives, and the engineering decisions behind the platform — written by the people who shipped them.",
  alternates: { canonical: "/blog" },
};

// /blog — the index redesign.
//
// It started on the section order /customers established (hero panel, content,
// proof band, closer) and has since moved onto /pricing's container instead
// (client, 2026-08-17): one unwrapped full-bleed band holding the title, the
// search and chip filters, and the post cards, then the proof band and the
// closer outside it. What that buys is the same thing it bought /pricing —
// you land on the list rather than on a screenful of introduction — and it
// stops the page stacking a bordered hero panel on top of a card grid.
//
// There is no approved copy for this page. Rather than fill it with lorem, the
// two kinds of text on it are sourced differently and the difference is worth
// knowing when reviewing:
//
//   - Post titles, excerpts, dates and authors are REAL, lifted from the
//     production blog that ships in this monorepo (apps/blog/content/blog).
//     Line lengths and density are therefore what the live page would be.
//   - The hero headline and subhead are PLACEHOLDER, written to the right shape
//     for the layout. See the note in blog-hero.tsx.
//
// The closer is CtaBurst carrying the /customers overrides verbatim rather than
// a fourth invented headline: that copy is approved and already shipping, and
// this page makes the same ask.
//
// LogoCloud is the one section here I would put a question mark against. On
// /customers the marquee answers "how many teams", which is the page's whole
// argument; on a blog index it is a proof band with nothing to prove, and the
// page reads fine at three sections. It is in because the brief was to follow
// the established index structure, and that structure has a band in this slot.
// Cutting it is a one-line change.
export default function BlogPage() {
  return (
    <>
      {/* The title band, the filter controls and the post grid share one
          container, the way /pricing puts its headline and plan cards in one —
          see the note in blog-hero.tsx. */}
      <BlogHero>
        <BlogBrowser />
      </BlogHero>
      <LogoCloud />
      <CtaBurst
        headline="Ready to build with Prisma?"
        headlineMaxWidth="max-w-[22ch]"
        body="Free to start, no credit card required."
        bodyMaxWidth="max-w-[44ch]"
        checks={[
          {
            label: "Create a database and start building in minutes",
            color: "text-prism-cyan-500",
          },
          {
            label: "Read the docs for guides and API reference",
            color: "text-prism-yellow-400",
          },
          { label: "Trusted by 500K+ developers globally", color: "text-prism-red-500" },
        ]}
        primaryCta={{ label: "Get started free", href: "https://console.prisma.io" }}
        secondaryCta={{ label: "Talk to us", href: "/contact" }}
      />
    </>
  );
}
