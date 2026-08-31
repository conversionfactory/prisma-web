import Link from "next/link";
import { Marker } from "@/components/brand/marker";
import { Texture } from "@/components/brand/texture";

// /blog/category/[slug] hero — the same wrapped prismatic panel the blog index
// and /customers open on (blog-hero.tsx, customers-hero.tsx), run lighter for a
// sub-page: an eyebrow linking back to the index, the category name, and one
// line of subhead. No CTA buttons and no logo band — those belong to the index
// and the page closer (CtaBurst) makes the ask once at the bottom.
//
// Same spectral wash and Texture as the index hero so a category page reads as
// part of the blog, not a different template; the reduced bottom padding is the
// only thing that marks it as the smaller page.
//
// COPY: the `label` is real (the topic's display name), the `description` is
// placeholder shaped to the layout — see TOPIC_DESCRIPTIONS in data/blog-posts.

export function BlogCategoryHero({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        {/* spectral bottom — wash + beam fan dispersing to white above, the same
            values as blog-hero.tsx and customers-hero.tsx */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[30rem] overflow-hidden"
        >
          <div
            className="absolute -bottom-1/3 left-1/2 h-[120%] w-[160%] -translate-x-1/2"
            style={{
              background: [
                "radial-gradient(52% 40% at 30% 100%, color-mix(in srgb, var(--color-prism-cyan-400) 34%, transparent), transparent 68%)",
                "radial-gradient(44% 36% at 52% 100%, color-mix(in srgb, var(--color-prism-yellow-300) 26%, transparent), transparent 66%)",
                "radial-gradient(42% 30% at 74% 100%, color-mix(in srgb, var(--color-prism-red-400) 28%, transparent), transparent 68%)",
              ].join(","),
            }}
          />
          <div className="absolute bottom-[-24rem] left-[10%] h-[60rem] w-36 origin-bottom rotate-[-28deg] bg-prism-cyan-300/50 blur-[64px]" />
          <div className="absolute bottom-[-26rem] left-1/2 h-[62rem] w-44 origin-bottom -translate-x-1/2 rotate-[5deg] bg-prism-yellow-200/60 blur-[72px]" />
          <div className="absolute bottom-[-28rem] right-[8%] h-[60rem] w-36 origin-bottom rotate-[28deg] bg-prism-red-300/50 blur-[64px]" />
          <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-t from-transparent via-white/60 to-white" />
        </div>
        <Texture opacity={0.06} blend="multiply" />

        <div className="relative px-4 sm:px-8">
          {/* top padding = bottom padding + the fixed header's footprint; the
              bottom runs shorter than the index hero — no buttons to clear */}
          <div className="mx-auto max-w-site pb-12 pt-32 md:pb-16 md:pt-44">
            <div className="flex animate-hero-rise flex-col items-center text-center motion-reduce:animate-none">
              <Link href="/blog" className="mb-5">
                <Marker color="bg-prism-cyan-400">Blog</Marker>
              </Link>
              <h1 className="isolate max-w-[min(18ch,100%)] text-balance text-[clamp(2.25rem,3.6vw,3.25rem)] leading-[1.06]">
                {label}
              </h1>
              <p className="mt-5 max-w-[58ch] text-pretty text-lg leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
