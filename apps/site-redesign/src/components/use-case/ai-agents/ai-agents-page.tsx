import { ConsoleIllustration } from "@/components/sections/console-illustration";
import { CtaBurst } from "@/components/sections/cta-burst";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { TestimonialsReveal } from "@/components/sections/testimonials-reveal";
import { ProductHero } from "@/components/product/product-hero";
import { aiAgentsUseCase } from "./content";
import {
  AgentBuilds,
  AgentCompare,
  AgentDeploy,
  AgentFit,
  AgentIntro,
  AgentStack,
  AgentWhen,
} from "./sections";

// Rotates through the brand's three hues, in the order the homepage uses.
const CHECK_COLORS = ["text-prism-cyan-500", "text-prism-yellow-400", "text-prism-red-500"];

// A use case isn't a Platform product, so the hero kicker can't borrow one of
// the three canonical product accents — cyan is the hue the brand leads with
// where a colour isn't already spoken for (same call as the template page).
const USE_CASE_ACCENT = "bg-prism-cyan-400";

// The AI & Agents use-case page, in the doc's section order:
//
//   hero → logo strip → what Prisma is → when to use → is it the right fit →
//   the stack → where can I deploy → how it compares → what agents can build →
//   testimonials → closer
//
// Four sections are existing site components reused as-is rather than restyled,
// so a fix to the homepage or product pages reaches this page too:
//  - the hero is the product-page ProductHero, carrying the Console illustration
//    as its visual (the doc supplies no hero image);
//  - the logo strip is the homepage LogoCloud;
//  - testimonials and the closer are the site's TestimonialsReveal and CtaBurst.
//
// The rest are this page's own sections (see sections.tsx) — the doc's copy has
// no slot in the /use-cases template shape.
export function AiAgentsUseCasePage() {
  const c = aiAgentsUseCase;
  return (
    <>
      <ProductHero
        name={c.eyebrow}
        accent={USE_CASE_ACCENT}
        hero={c.hero}
        visual={<ConsoleIllustration />}
        benefitsPlacement="above-cta"
      />

      <LogoCloud />

      <AgentIntro intro={c.intro} />
      <AgentWhen when={c.when} />
      <AgentFit fit={c.fit} />
      <AgentStack stack={c.stack} />
      <AgentDeploy deploy={c.deploy} />
      <AgentCompare compare={c.compare} />
      <AgentBuilds builds={c.builds} />

      <TestimonialsReveal heading={c.testimonialsHeading} />

      <CtaBurst
        headline={c.cta.headline}
        headlineMaxWidth="max-w-[26ch]"
        body={c.cta.body}
        bodyMaxWidth="max-w-[70ch]"
        checks={c.cta.benefits.map((label, i) => ({
          label,
          color: CHECK_COLORS[i % CHECK_COLORS.length],
        }))}
        primaryCta={c.cta.primaryCta}
        secondaryCta={c.cta.secondaryCta}
      />
    </>
  );
}
