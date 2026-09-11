import { GlassGlide } from "@/components/brand/glass-glide";
import { Texture } from "@/components/brand/texture";
import { SupportSearch } from "@/components/sections/support-search";

// Support hero: the same wrapped prismatic panel as /contact — same wrapper,
// spectral bottom, grain and white fade — but centred, since this is a title
// band leading into the support channels rather than a split with a form. The
// wash values are the contact hero's calibration (softer/shorter than the
// homepage), which is right at this panel height so the subhead keeps contrast.
export function SupportHero() {
  return (
    <section className="bg-white px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="relative mx-auto max-w-[96rem] overflow-hidden rounded-[1.5rem] border border-black/[0.06] bg-white">
        {/* spectral bottom — wash + beam fan dispersing to white above */}
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
        {/* brand grain across the whole panel */}
        <Texture opacity={0.06} blend="multiply" />

        <div className="relative px-4 sm:px-8">
          {/* top padding clears the fixed header; the column centres. */}
          <div className="mx-auto flex max-w-3xl animate-hero-rise flex-col items-center pb-24 pt-36 text-center motion-reduce:animate-none md:pb-28 md:pt-44">
            <h1 className="isolate max-w-[18ch] text-balance text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.06]">
              How can we <GlassGlide>help</GlassGlide>?
            </h1>
            <p className="mt-6 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted-foreground">
              Find an answer in the docs, ask the community, or reach our support team. Where you go
              depends on your plan and what you need.
            </p>

            <div className="mt-10 w-full max-w-xl">
              <SupportSearch />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
