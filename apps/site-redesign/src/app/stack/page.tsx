import type { Metadata } from "next";
import { PlatformHero } from "@/components/sections/platform-hero";
import { PlatformCompare } from "@/components/sections/platform-compare";
import { PlatformFlow } from "@/components/sections/platform-flow";
import { PlatformProducts } from "@/components/sections/platform-products";
import { PlatformOpen } from "@/components/sections/platform-open";
import { AgentLoop } from "@/components/sections/agent-loop";
import { TestimonialsReveal } from "@/components/sections/testimonials-reveal";
import { CtaBurst } from "@/components/sections/cta-burst";

export const metadata: Metadata = {
  title: "Stack",
  description:
    "A type-safe ORM, managed Postgres, and TypeScript app hosting, built to work together natively.",
};

// Narrative order, per the client's structure note: what it is → how it works →
// why it matters. Core value, then the system diagram, then the build/deploy/
// debug path, then the products, then what you get and what stays replaceable,
// then proof and the ask.
// Section rhythm: the wrapped panels (hero, flow, closing CTA) break up the runs
// of sections that sit on the page's own white.
export default function StackPage() {
  return (
    <>
      <PlatformHero />
      <PlatformCompare />
      <PlatformFlow />
      <PlatformProducts />
      <AgentLoop heading="What changes when your stack works as one" />
      <PlatformOpen />
      <TestimonialsReveal />
      {/* the homepage's closing CTA, unchanged — same copy as the copy deck's
          closing block, same cloud loop, same prismatic burst on the buttons */}
      <CtaBurst />
    </>
  );
}
