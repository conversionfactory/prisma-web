import type { Metadata } from "next";
import { SupportChannels } from "@/components/sections/support-channels";
import { SupportHero } from "@/components/sections/support-hero";
import { SupportReport } from "@/components/sections/support-report";
import { SupportResources } from "@/components/sections/support-resources";
import { SupportStillStuck } from "@/components/sections/support-still-stuck";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Find an answer in the docs, ask the community, or reach our support team. Where you go depends on your plan and what you need.",
};

// Built from the approved support copy (V1), verbatim. Five beats: the search
// hero, the three primary channels, the GitHub report panel, the self-serve
// resources, and the email closer.
export default function SupportPage() {
  return (
    <>
      <SupportHero />
      <SupportChannels />
      <SupportReport />
      <SupportResources />
      <SupportStillStuck />
    </>
  );
}
