import { ProductFeatures } from "@/components/product/product-features";
import { ProductHero } from "@/components/product/product-hero";
import { Comparison } from "@/components/sections/comparison";
import { CtaBurst } from "@/components/sections/cta-burst";
import { Faq } from "@/components/sections/faq";
import { TestimonialsReveal } from "@/components/sections/testimonials-reveal";
import { UseCaseChanges } from "./use-case-changes";
import { UseCaseReasons } from "./use-case-reasons";
import { UseCaseSteps } from "./use-case-steps";
import type { UseCasePageContent } from "./types";

// Rotates through the brand's three hues, in the order the homepage uses.
const CHECK_COLORS = ["text-prism-cyan-500", "text-prism-yellow-400", "text-prism-red-500"];

// A use case isn't a Platform product, so the hero kicker can't borrow one of
// the three canonical product accents (PLATFORM_PRODUCT_ACCENTS) — that dot
// means "this page is Postgres / Compute / ORM". Use-case pages take cyan, the
// hue the brand leads with everywhere a colour isn't already spoken for.
const USE_CASE_ACCENT = "bg-prism-cyan-400";

// The use-case page template, in V2's section order:
//
//   hero → before/after → three steps → how Prisma handles it →
//   what changes → why teams choose Prisma → testimonials → closer → FAQs
//
// Four of those are existing site sections reused as-is rather than restyled
// copies, so a fix to the product pages or the homepage reaches this page too:
//  - the hero and the four-card grid are the product-page sections (ProductHero,
//    ProductFeatures), which is what /postgres, /orm and /compute run;
//  - before/after is the homepage's Comparison, minus its two deploy cards;
//  - the closer and the FAQs are the site's CtaBurst and Faq, as on /contact.
export function UseCasePage({ content }: { content: UseCasePageContent }) {
  return (
    <>
      <ProductHero
        name={content.eyebrow}
        accent={USE_CASE_ACCENT}
        hero={content.hero}
        placeholderLabel={content.hero.placeholderLabel}
        benefitsPlacement="above-cta"
      />

      <Comparison
        heading={content.problem.headline}
        before={content.problem.before}
        after={content.problem.after}
        cards={false}
      />

      <UseCaseSteps steps={content.steps} />

      <ProductFeatures
        features={{
          headline: content.handles.headline,
          bridge: content.handles.bridge,
          items: content.handles.items,
        }}
        cta={content.handles.cta}
        placeholderLabel="[Use-case abstraction]"
        // four cards means two-up, where the default block leaves them squat
        mediaHeight="h-[22rem]"
      />

      <UseCaseChanges changes={content.changes} />

      <UseCaseReasons reasons={content.reasons} />

      {/* V2's heading here is "Real teams, real builds", which is already this
          section's default — the quotes are the site's real customer set. */}
      <TestimonialsReveal />

      <CtaBurst
        headline={content.cta.headline}
        headlineMaxWidth="max-w-[30ch]"
        body={content.cta.body}
        bodyMaxWidth="max-w-[78ch]"
        checks={content.cta.benefits.map((label, i) => ({
          label,
          color: CHECK_COLORS[i % CHECK_COLORS.length],
        }))}
        primaryCta={content.cta.primaryCta}
        secondaryCta={content.cta.secondaryCta}
      />

      <Faq heading="FAQs" items={content.faqs} />
    </>
  );
}
