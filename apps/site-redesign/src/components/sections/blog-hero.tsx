import { GlassGlide } from "@/components/brand/glass-glide";
import { PrismButton, PrismButtonOutline } from "@/components/brand/prism-button";
import { Texture } from "@/components/brand/texture";
import { BLOG_POSTS, TOPIC_LABELS, TOPICS } from "@/data/blog-posts";

// /blog hero — the wrapped prismatic panel, centred, following customers-hero.
// This page opens on a claim and a roster, not on a form or a product visual,
// so there is no second column to balance (contact-hero.tsx splits at lg for
// exactly that reason).
//
// COPY IS PLACEHOLDER. No approved copy exists for the blog index yet, so the
// headline, subhead and band label below are written to the right shape and
// length for the layout and nothing more — they are sized so the real copy can
// drop in without the panel reflowing. Everything else on the page (post
// titles, excerpts, dates, authors) is real, from the production feed.
//
// The topic band lives INSIDE the panel, sitting on the spectral wash, in the
// slot the "Built with Prisma" logo band takes on /customers. It does the same
// job that band does — it answers "what's in here" before a single card is
// read — and like that band it runs straight off the CTAs with no heading
// marker, so it reads as the panel's footer rather than as its own section.
//
// The chips are deliberately NOT links. Topic filtering is a real feature with
// real UX questions (does it route, does it paginate, what is the empty state)
// and none of them are answered yet; a chip that looks like a filter and does
// nothing is worse than a label. Counts are what make it a roster rather than a
// dead control — the same reason the customers marquee carries "500K+".
//
// Wash values are product-hero's calibration, not the homepage's, for the same
// reason contact-hero gives: this panel is short, and the homepage's stronger
// values bloom up behind the headline and cost the subhead its contrast.

const TOPIC_COUNTS = TOPICS.map((id) => ({
  id,
  label: TOPIC_LABELS[id] ?? id,
  count: BLOG_POSTS.filter((post) => post.topics.includes(id)).length,
})).filter((topic) => topic.count > 0);

export function BlogHero() {
  return (
    <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        {/* spectral bottom — wash + beam fan dispersing to white above, same
            values as product-hero.tsx, contact-hero.tsx and customers-hero.tsx */}
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
          {/* top padding = bottom padding + the fixed header's footprint */}
          <div className="mx-auto max-w-site pb-16 pt-32 md:pb-20 md:pt-44">
            <div className="flex animate-hero-rise flex-col items-center text-center motion-reduce:animate-none">
              <h1 className="isolate max-w-[min(20ch,100%)] text-balance text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.06]">
                Notes from the team <GlassGlide>building Prisma</GlassGlide>
              </h1>
              <p className="mt-6 max-w-[62ch] text-pretty text-lg leading-relaxed text-muted-foreground">
                Releases, Postgres deep dives, and the engineering decisions behind the platform —
                written by the people who shipped them.
              </p>
              <div className="mt-9 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <PrismButton href="https://console.prisma.io" size="lg">
                  Get started free
                </PrismButton>
                <PrismButtonOutline href="https://www.prisma.io/docs" size="lg">
                  Read the docs
                </PrismButtonOutline>
              </div>
            </div>

            {/* the topic roster, on the wash */}
            <div className="mt-20 animate-hero-rise-late motion-reduce:animate-none">
              <p className="text-center text-sm font-semibold text-foreground/70">
                What we write about
              </p>
              {/* flex-wrap rather than the customers band's explicit grid: those
                  are twelve fixed-width logo plates that divide evenly at every
                  breakpoint, these are seven chips of wildly different widths,
                  which a grid would pad into a ragged table. */}
              <ul className="mx-auto mt-7 flex max-w-4xl flex-wrap items-center justify-center gap-2.5">
                {TOPIC_COUNTS.map((topic) => (
                  <li key={topic.id}>
                    {/* Squared off, not a pill. prism-button.tsx owns
                        `rounded-full` for both variants, so a white pill with a
                        hairline border on this panel is pixel-for-pixel the
                        secondary CTA sitting directly above it — see the same
                        ruling in marker.tsx. The band logo tiles use rounded-2xl
                        at 4.5rem tall; these are half that height, so rounded-xl
                        keeps the corner radius proportional. */}
                    <span className="spectrum-border flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white/80 px-5 text-sm font-semibold text-foreground backdrop-blur-sm">
                      {topic.label}
                      <span className="text-muted-foreground tabular-nums">{topic.count}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
