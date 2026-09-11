import type { UseCasePageContent } from "../types";
import { templateUseCase } from "./template";

// Every use-case page, keyed by slug. `template` is the shape itself, carrying
// V2's placeholder copy — real use cases get their own file alongside it and
// are added here.
export const USE_CASES: Record<string, UseCasePageContent> = {
  [templateUseCase.slug]: templateUseCase,
};
