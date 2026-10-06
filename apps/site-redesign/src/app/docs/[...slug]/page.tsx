import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsArticle, DocsArticleNav, DocsToc } from "@/components/sections/docs-article";
import { DocsShell } from "@/components/sections/docs-shell";
import { DocsSidebar } from "@/components/sections/docs-sidebar";
import { DOCS_ARTICLES } from "@/data/docs-articles";

type Props = { params: Promise<{ slug: string[] }> };

export function generateStaticParams() {
  return Object.keys(DOCS_ARTICLES).map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = DOCS_ARTICLES[slug.join("/")];
  if (!article) return {};
  return {
    // The SEO title already carries "| Prisma Documentation", so it skips the
    // root layout's title template.
    title: { absolute: article.seo.title },
    description: article.seo.description,
  };
}

export default async function DocsArticlePage({ params }: Props) {
  const { slug } = await params;
  const key = slug.join("/");
  if (!DOCS_ARTICLES[key]) notFound();

  return (
    <DocsShell
      sidebar={
        <DocsSidebar>
          <DocsArticleNav slug={key} />
        </DocsSidebar>
      }
      toc={<DocsToc slug={key} />}
    >
      <DocsArticle slug={key} />
    </DocsShell>
  );
}
