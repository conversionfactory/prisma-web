import type { Metadata } from "next";
import {
  StartupsHeroVisual,
  StartupsIntroVisual,
} from "@/components/use-case/segment/abstractions/startups";
import { startupsUseCase } from "@/components/use-case/segment/content/startups";
import { SegmentPage } from "@/components/use-case/segment/segment-page";

export const metadata: Metadata = startupsUseCase.meta;

export default function StartupsRoute() {
  return (
    <SegmentPage
      content={startupsUseCase}
      heroVisual={<StartupsHeroVisual />}
      introVisual={<StartupsIntroVisual />}
    />
  );
}
