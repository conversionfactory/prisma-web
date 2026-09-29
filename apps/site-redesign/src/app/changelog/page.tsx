import type { Metadata } from "next";
import { ChangelogFeed } from "@/components/sections/changelog-feed";
import { ChangelogHero } from "@/components/sections/changelog-hero";
import { CtaBurst } from "@/components/sections/cta-burst";

export const metadata: Metadata = {
  title: "Changelog",
  description:
    "New features, improvements, and fixes across Prisma ORM, Prisma Postgres, and the platform.",
  alternates: { canonical: "/changelog" },
};

// /changelog — the redesign of prisma.io/changelog. The live page is a flat
// numbered list on white: date, title, a truncated blurb, "Read more", with no
// categories and no hierarchy. This keeps the content and gives it the brand
// front door (spectral hero), a product-area filter, and a colour-coded release
// timeline you can scan without reading. Entries and their categories live in
// data/changelog.ts. Closes on the shared CtaBurst.
export default function ChangelogPage() {
  return (
    <>
      <ChangelogHero />
      <ChangelogFeed />
      <CtaBurst
        headline="Build on a platform that ships"
        headlineMaxWidth="max-w-[20ch]"
        body="Everything above landed in the last few months. Start free with the ORM, and add Postgres and Compute when you need them."
        primaryCta={{ label: "Get started free", href: "https://console.prisma.io" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
