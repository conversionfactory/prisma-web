import { BookOpen, Milestone, Rocket } from "lucide-react";
import type { ComponentType } from "react";

// The docs article template — one entry per article, rendered by
// components/sections/docs-article.tsx at /docs/<slug>.

export type DocsBlock =
  | { type: "paragraph"; text: string }
  | { type: "code"; lang: string; code: string }
  | { type: "note"; text: string }
  | { type: "tabs"; tabs: { label: string; lang: string; code: string }[] };

export type DocsArticle = {
  slug: string;
  seo: { title: string; description: string };
  title: string;
  intro: string;
  sections: { heading: string; blocks: DocsBlock[] }[];
  related: {
    heading: string;
    links: { title: string; href: string; icon: ComponentType<{ className?: string }> }[];
  };
  prev?: { title: string; href: string };
  next?: { title: string; href: string };
};

// Copy is Notion "Docs Template Copy and Design", toggle **V1**, transcribed
// verbatim — brackets and all, following the use-case template's placeholder
// convention.
//
// The italic lines in V1 are notes to the writer rather than page copy, so they
// have no slot in the layout. They are kept here verbatim instead of dropped:
//
//   Answer-first intro:
//     "One or two sentences, before any setup, that state what this page lets
//      you do, who it is for, and the outcome. Written so a reader knows in
//      seconds if they are in the right place, and so an AI assistant can lift
//      it as the answer."
//     (The intro below is V1's "Example shape:" line.)
//
//   Body:
//     "Written by the Prisma team."
//
//   Question-style section heading:
//     "Frame headings the way people and agents actually ask, for example "How
//      do I run a migration?" rather than "Migrations." This helps the page
//      surface in AI answers and search."
//
//   Tabs:
//     "[Tabs for alternative setups where relevant, for example npm and pnpm,
//      or by framework.]" — built as npm / pnpm tabs, the example it names.
//
//   Related and next steps:
//     "A short, consistent block at the end of the article that points the
//      reader to the next move. A mix of the next doc in the sequence, a
//      relevant guide, and the related product page or "get started" path."
const template: DocsArticle = {
  slug: "template",
  seo: {
    title: "[Article title] | Prisma Documentation",
    description: "A one or two sentence summary of the page, including the primary term.",
  },
  title: "[Article title]",
  intro:
    "This page shows you how to [do X] with [product]. Use it when [situation]. By the end, you will have [outcome].",
  sections: [
    {
      heading: "[Question-style section heading]",
      blocks: [
        { type: "paragraph", text: "[Paragraph text.]" },
        // Dummy code (not from the copy doc) so the code block and tabs can be
        // reviewed with realistic content. Replace with "// [Code example]".
        {
          type: "code",
          lang: "typescript",
          code: `import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const users = await prisma.user.findMany({
  where: { email: { endsWith: "@prisma.io" } },
  include: { posts: true },
})

console.log(users)`,
        },
        { type: "note", text: "[Tip, warning, or prerequisite.]" },
        {
          type: "tabs",
          tabs: [
            { label: "npm", lang: "bash", code: "npm install prisma --save-dev\nnpx prisma init" },
            { label: "pnpm", lang: "bash", code: "pnpm add prisma --save-dev\npnpm dlx prisma init" },
          ],
        },
      ],
    },
    {
      heading: "[Question-style section heading]",
      blocks: [{ type: "paragraph", text: "[Paragraph text.]" }],
    },
  ],
  related: {
    heading: "[Related and next steps]",
    links: [
      { title: "[Next doc in the sequence]", href: "#", icon: Milestone },
      { title: "[Related guide]", href: "#", icon: BookOpen },
      { title: "[Relevant product page or Get started]", href: "#", icon: Rocket },
    ],
  },
  prev: { title: "[Previous article]", href: "#" },
  next: { title: "[Next article]", href: "#" },
};

export const DOCS_ARTICLES: Record<string, DocsArticle> = {
  [template.slug]: template,
};
