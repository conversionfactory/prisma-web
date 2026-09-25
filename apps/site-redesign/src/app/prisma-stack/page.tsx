import type { Metadata } from "next";
import { CtaBurst } from "@/components/sections/cta-burst";
import { StackBento } from "@/components/sections/stack-bento";
import { ComparisonTable } from "@/components/use-case/segment/comparison-table";
import { SegmentBuilds, SegmentWhen } from "@/components/use-case/segment/sections";
import { UseCaseHero } from "@/components/use-case/use-case-hero";
import { bestFor, comparison, cta, hero, meta, stack, when } from "./content";

export const metadata: Metadata = meta;

// Separate from /stack. Built from existing sections in the copy's order:
// the use-case hero, the homepage stack bento, the segment pages' comparison
// table and card grids, and the site's closing CTA.
export default function PrismaStackPage() {
  return (
    <>
      <UseCaseHero name="The Prisma Stack" hero={hero} />
      <StackBento content={stack} />
      <ComparisonTable comparison={comparison} />
      <SegmentWhen when={when} />
      <SegmentBuilds builds={bestFor} />
      <CtaBurst
        headline={cta.headline}
        body={cta.body}
        bodyMaxWidth="max-w-[60ch]"
        checks={cta.checks}
      />
    </>
  );
}
