import type { Metadata } from "next";
import { aiAgentsUseCase } from "@/components/use-case/ai-agents/content";
import { AiAgentsUseCasePage } from "@/components/use-case/ai-agents/ai-agents-page";

// The AI & Agents use case carries a different section set from the generic
// /use-cases/[slug] template, so it lives at its own static segment (which
// Next resolves ahead of the dynamic one) with its own composition.
export const metadata: Metadata = aiAgentsUseCase.meta;

export default function AiAgentsRoute() {
  return <AiAgentsUseCasePage />;
}
