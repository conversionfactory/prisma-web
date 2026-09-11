import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { USE_CASES } from "@/components/use-case/content";
import { UseCasePage } from "@/components/use-case/use-case-page";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(USE_CASES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return USE_CASES[slug]?.meta ?? {};
}

// Every use case is an instance of one template — see
// components/use-case/types.ts for the contract and content/ for the copy.
export default async function UseCaseRoute({ params }: Props) {
  const { slug } = await params;
  const content = USE_CASES[slug];
  if (!content) notFound();

  return <UseCasePage content={content} />;
}
