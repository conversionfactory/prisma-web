import { CtaBurst } from "@/components/sections/cta-burst";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { TestimonialsReveal } from "@/components/sections/testimonials-reveal";
import { aiAgentsUseCase } from "./content";
import { AgentHero } from "./agent-hero";
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

// The AI & Agents use-case page, in the doc's section order:
//
//   hero → logo strip → what Prisma is → when to use → is it the right fit →
//   the stack → where can I deploy → how it compares → what agents can build →
//   testimonials → closer
//
// Some sections are existing site components reused as-is rather than restyled,
// so a fix to the homepage or product pages reaches this page too:
//  - the logo strip is the homepage LogoCloud;
//  - testimonials and the closer are the site's TestimonialsReveal and CtaBurst.
// The hero is this page's own (see hero-options.tsx) — a purpose-built agent
// abstraction rather than the reused homepage console.
//
// The rest are this page's own sections (see sections.tsx) — the doc's copy has
// no slot in the /use-cases template shape.
export function AiAgentsUseCasePage() {
  const c = aiAgentsUseCase;
  return (
    <>
      <AgentHero name={c.eyebrow} hero={c.hero} />

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
          // the third benefit is a long list — drop it to its own line below
          ownLine: i === 2,
        }))}
        primaryCta={c.cta.primaryCta}
        secondaryCta={c.cta.secondaryCta}
      />
    </>
  );
}
