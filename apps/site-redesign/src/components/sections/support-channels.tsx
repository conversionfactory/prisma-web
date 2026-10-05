import { IconTile } from "@/components/brand/icon-tile";
import { PrismButtonOutline } from "@/components/brand/prism-button";
import { Console, Discord, Shield } from "@/components/icons/forma";
import { Reveal } from "@/components/motion/reveal";

// The three primary support channels, verbatim from the approved copy. Same
// card and outline-pill treatment as /contact's ContactSupport, so the two
// pages read as one system.
const CHANNELS = [
  {
    name: "Community support",
    Icon: Discord,
    description:
      "Ask questions and share what you're building with thousands of developers on our Discord. Available on every plan, including the free tier.",
    cta: { label: "Join our Discord", href: "https://pris.ly/discord" },
  },
  {
    name: "Direct support",
    Icon: Console,
    description:
      "On a Pro or Business plan? Submit a ticket from your Console, and our team will help.",
    cta: { label: "Submit a ticket", href: "https://console.prisma.io" },
  },
  {
    name: "Enterprise support",
    Icon: Shield,
    description:
      "Need higher-touch support with guaranteed response times? Explore our enterprise options.",
    // Enterprise support routes to the team — same destination as the nav's
    // "Talk to the team". Confirm with André if a dedicated enterprise page ships.
    cta: { label: "Discover Enterprise support", href: "/contact" },
  },
];

export function SupportChannels() {
  return (
    <section className="bg-white px-4 pb-8 pt-24 sm:px-8 sm:pb-10 sm:pt-28">
      <div className="mx-auto max-w-site">
        <Reveal>
          <h2 className="text-balance text-center text-[clamp(1.75rem,2.75vw,2.375rem)] leading-[1.1] max-md:text-left">
            Ways to get support
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {CHANNELS.map(({ name, Icon, description, cta }, i) => (
            <Reveal key={name} delay={i * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-black/[0.06] bg-card p-7">
                <IconTile>
                  <Icon className="size-5 text-foreground" aria-hidden />
                </IconTile>
                <h3 className="mt-5 text-xl">{name}</h3>
                <p className="mt-3 grow text-pretty leading-relaxed text-muted-foreground">
                  {description}
                </p>
                {/* inline-flex so the pill keeps its intrinsic width in the
                    card's flex column (see learn-more.tsx) */}
                <span className="mt-7 inline-flex">
                  <PrismButtonOutline href={cta.href}>{cta.label}</PrismButtonOutline>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.3}>
          <p className="mt-6 text-center text-sm italic text-muted-foreground">
            Response times depend on your subscription plan and current volume.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
