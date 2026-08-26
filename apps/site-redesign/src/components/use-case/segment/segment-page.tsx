import { CtaBurst } from "@/components/sections/cta-burst";
import { LogoCloud } from "@/components/sections/logo-cloud";
import { TestimonialsReveal } from "@/components/sections/testimonials-reveal";
import { ComparisonTable } from "./comparison-table";
import {
  SegmentBuilds,
  SegmentFit,
  SegmentHero,
  SegmentIntro,
  SegmentWhen,
  SegmentWhyChoose,
} from "./sections";
import type { SegmentUseCaseContent } from "./types";

const CHECK_COLORS = ["text-prism-cyan-500", "text-prism-yellow-400", "text-prism-red-500"];

// The audience use-case template, in the copy's section order:
//
//   hero → logo strip → what Prisma is → when to use → is it the right fit →
//   [why choose] → comparison table → what they build → testimonials → closer
//
// The hero and intro visuals are per-page abstractions passed in; everything
// else is driven by the page's content object.
export function SegmentPage({
  content,
  heroVisual,
  introVisual,
}: {
  content: SegmentUseCaseContent;
  heroVisual: React.ReactNode;
  introVisual: React.ReactNode;
}) {
  const c = content;
  return (
    <>
      <SegmentHero name={c.eyebrow} hero={c.hero} visual={heroVisual} />

      <LogoCloud />

      <SegmentIntro intro={c.intro} visual={introVisual} />
      <SegmentWhen when={c.when} />
      <SegmentFit fit={c.fit} />
      {c.whyChoose ? <SegmentWhyChoose whyChoose={c.whyChoose} /> : null}
      <ComparisonTable comparison={c.comparison} />
      <SegmentBuilds builds={c.builds} />

      <TestimonialsReveal heading={c.testimonialsHeading} />

      <CtaBurst
        headline={c.cta.headline}
        headlineMaxWidth="max-w-[28ch]"
        body={c.cta.body}
        bodyMaxWidth="max-w-[72ch]"
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
