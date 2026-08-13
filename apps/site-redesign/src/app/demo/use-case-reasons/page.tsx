import type { Metadata } from "next";
import { templateUseCase } from "@/components/use-case/content/template";
import { VariantBento } from "@/components/use-case/reasons-options/variant-bento";
import { VariantDispersion } from "@/components/use-case/reasons-options/variant-dispersion";
import { VariantLedger } from "@/components/use-case/reasons-options/variant-ledger";
import { VariantStatement } from "@/components/use-case/reasons-options/variant-statement";
import { VariantStepper } from "@/components/use-case/reasons-options/variant-stepper";

export const metadata: Metadata = {
  title: "Use case — why teams choose Prisma — design options",
  robots: { index: false, follow: false },
};

const OPTIONS = [
  {
    label: "Option A — The Ledger",
    thesis:
      "No boxes. Four ruled rows read as a spec sheet: index, claim, evidence. The claim column is fixed, so the four titles stack into an edge you can scan without reading the bodies.",
    Component: VariantLedger,
  },
  {
    label: "Option B — Dispersion",
    thesis:
      "Each row's rule runs one stop further into the spectrum than the one above it, so the section resolves from an ink hairline to full colour as you read down. The brand's own image used as a progress indicator.",
    Component: VariantDispersion,
  },
  {
    label: "Option C — The Bento",
    thesis:
      "Tiles, but unequal: integration and trust take the wide slots, agents and pricing the narrow ones. The lead tile wears the cube pattern. A composition rather than four identical boxes.",
    Component: VariantBento,
  },
  {
    label: "Option D — The Stepper",
    thesis:
      "The four claims as a rail you pick through, one body at a time. Turns the page's longest section into its shortest — at the cost of hiding three of the four bodies at rest.",
    Component: VariantStepper,
  },
  {
    label: "Option E — The Statement",
    thesis:
      "Titles set at headline scale as assertions, evidence demoted underneath. Quartered by hairlines only. The most confident of the five, and the most dependent on the titles being good.",
    Component: VariantStatement,
  },
];

// Internal design exploration — not linked from the site, noindex. Five
// directions for "Why teams choose Prisma for [use case]" after the wrapped
// panel was rejected (André, 2026-08-13). Same V2 copy in all five; none of
// them is a full-bleed panel.
export default function UseCaseReasonsOptionsPage() {
  const { reasons } = templateUseCase;

  return (
    <div className="bg-white">
      <header className="border-b border-black/[0.06] px-4 pb-10 pt-28 text-center sm:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Internal · design exploration
        </p>
        <h1 className="mt-2 text-3xl">Why teams choose Prisma — five options</h1>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
          Same V2 copy, same four fixed differentiators. Only the design changes. None of them is
          wrapped in a panel.
        </p>
      </header>
      {OPTIONS.map(({ label, thesis, Component }) => (
        <div key={label} className="border-b border-black/[0.06]">
          <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-8">
            <p className="inline-flex rounded-full bg-foreground px-4 py-1.5 text-sm font-semibold text-white">
              {label}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{thesis}</p>
          </div>
          <Component reasons={reasons} />
        </div>
      ))}
    </div>
  );
}
