import type { Metadata } from "next";
import {
  SaasHeroVisual,
  SaasIntroVisual,
} from "@/components/use-case/segment/abstractions/saas-teams";
import { saasTeamsUseCase } from "@/components/use-case/segment/content/saas-teams";
import { SegmentPage } from "@/components/use-case/segment/segment-page";

// A segment use case carries the table-bearing template, distinct from the
// generic /use-cases/[slug] shape, so it lives at its own static segment.
export const metadata: Metadata = saasTeamsUseCase.meta;

export default function SaasTeamsRoute() {
  return (
    <SegmentPage
      content={saasTeamsUseCase}
      heroVisual={<SaasHeroVisual />}
      introVisual={<SaasIntroVisual />}
    />
  );
}
