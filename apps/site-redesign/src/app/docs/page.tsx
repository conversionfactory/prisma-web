import type { Metadata } from "next";
import { DocsGettingStarted } from "@/components/sections/docs-getting-started";
import { DocsShell } from "@/components/sections/docs-shell";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Build your app with Prisma Composer and Prisma ORM, run it all locally, then deploy it to Prisma Compute, Prisma Postgres, and Storage. One CLI, one workflow.",
  alternates: { canonical: "/docs" },
};

// /docs — the prisma.io/docs getting-started landing, rebuilt on the redesign's
// brand design: the live layout (left navbar + grainy background + content in a
// rounded notebook card) with the redesign's visual language.
export default function DocsPage() {
  return (
    <DocsShell>
      <DocsGettingStarted />
    </DocsShell>
  );
}
