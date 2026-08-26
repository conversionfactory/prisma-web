import type { Metadata } from "next";
import {
  EngineeringHeroVisual,
  EngineeringIntroVisual,
} from "@/components/use-case/segment/abstractions/engineering-teams";
import { engineeringTeamsUseCase } from "@/components/use-case/segment/content/engineering-teams";
import { SegmentPage } from "@/components/use-case/segment/segment-page";

export const metadata: Metadata = engineeringTeamsUseCase.meta;

export default function EngineeringTeamsRoute() {
  return (
    <SegmentPage
      content={engineeringTeamsUseCase}
      heroVisual={<EngineeringHeroVisual />}
      introVisual={<EngineeringIntroVisual />}
    />
  );
}
