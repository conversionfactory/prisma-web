import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { CustomerStory } from "@/components/sections/customer-story"
import {
  CUSTOMER_STORY_DETAILS,
  getCustomerStory,
} from "@/data/customer-stories"
import { siteConfig } from "@/lib/config"

type Props = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return CUSTOMER_STORY_DETAILS.map((story) => ({ slug: story.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = getCustomerStory(slug)
  if (!story) return {}

  const url = `${siteConfig.url}/customers/${slug}`

  return {
    title: story.hero.title,
    description: story.hero.lead,
    alternates: { canonical: url },
    openGraph: {
      title: story.hero.title,
      description: story.hero.lead,
      url,
      type: "article",
    },
  }
}

export default async function CustomerStoryPage({ params }: Props) {
  const { slug } = await params
  const story = getCustomerStory(slug)
  if (!story) notFound()

  return <CustomerStory story={story} />
}
