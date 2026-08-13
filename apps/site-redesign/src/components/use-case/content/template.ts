import type { UseCasePageContent } from "../types";

// The use-case template itself, at /use-cases/template.
//
// Copy is Notion "Use Case Template Copy", toggle **V2**, transcribed verbatim
// — including every bracketed placeholder. Nothing here is guessed, tightened
// or filled in: André's instruction (2026-08-13) is to use the copy exactly as
// it is in Notion, and the project's standing convention is a visible
// placeholder over an invented value (see the /pricing TBC convention).
//
// Two italic lines in V2 are notes to the copywriter rather than page copy, so
// they have no slot in the layout. They are preserved here verbatim instead of
// being dropped:
//
//   Under the hero headline:
//     "[Lead with what the developer's agent ships, not the feature. Use build
//      / ship / deploy / iterate so it works whether the agent is the user's or
//      a future Prisma one.]"
//
//   Under "Why teams choose Prisma for [use case]":
//     "These are the fixed D4 differentiators. Keep them; tailor the one-line
//      reads to the use case. Don't claim best-in-class ORM, DB, or hosting
//      individually — the integrated slice is the differentiator."
//
// V1 is superseded — it routes the agent through the Management API rather
// than Prisma Skills and closes on a different CTA. Don't copy from it.
const CONSOLE = "https://console.prisma.io";
const PRICING = "/pricing";

export const templateUseCase: UseCasePageContent = {
  slug: "template",
  meta: {
    title: "Use case template",
    description: "The reusable Prisma use-case page template, carrying V2 of the approved copy.",
  },
  eyebrow: '[Eyebrow text: Use case name — short, developer-native, e.g. "Ship a SaaS backend"]',
  hero: {
    headline: "[Outcome-led headline for this use case]",
    subheadline: "[One to two sentences: who this is for and the end-to-end outcome.]",
    benefits: [
      "[Lead benefit for this use case — the thing that only the integrated stack makes possible]",
      "[Agent-workflow benefit — what the agent can now do end-to-end through the Prisma CLI and Prisma Skills]",
      "The ORM is free, always",
    ],
    primaryCta: { label: "Get started free", href: CONSOLE },
    secondaryCta: { label: "See pricing", href: PRICING },
    microline:
      "Trusted by 500,000+ developers. 28% of the TypeScript ORM market. 47.3k GitHub stars.",
    placeholderLabel: "[product screenshot or short code sample relevant to this use case]",
  },
  problem: {
    headline: "Why [use case] breaks down on a stitched-together stack",
    before: [
      "[Current-state pain: a database from one vendor, an ORM from another, hosting from a third]",
      "[Current-state pain: the agent writes the code, the developer wires it up by hand]",
      "[Current-state pain specific to this use case — e.g. previews that don't connect, latency, bill shock]",
      "[Current-state pain: context-switching across separate dashboards and CLIs]",
    ],
    after: [
      "[Improved outcome: the agent runs the full loop — build, deploy, debug, fix, redeploy]",
      "One platform: hosting, database, and ORM built to work together natively",
      "[Improved outcome specific to this use case]",
      "[Improved outcome: cost / spend limits / latency benefit relevant here]",
    ],
  },
  steps: {
    headline: "Ship [use case outcome] in three steps",
    items: [
      {
        step: "1",
        name: "Define",
        body: "Write your data model once in contract.prisma, or have your agent write it for you. It's the shared contract your ORM, migrations, and data layer are all built around. [One line tying Define to this use case.]",
      },
      {
        step: "2",
        name: "Deploy",
        body: "Add Prisma Postgres and Compute when you're ready to ship. Your app and database deploy together on the same host, co-located by default. [One line tying Deploy to this use case.]",
      },
      {
        step: "3",
        name: "Iterate",
        body: "Your agent reads logs, fixes what broke, and redeploys through the Prisma CLI. The loop runs for as long as you need it to. [One line tying Iterate to this use case.]",
      },
    ],
    cta: { label: "Get started free", href: CONSOLE },
  },
  handles: {
    headline: "How Prisma handles [use case]",
    bridge:
      "ORM, database, and hosting designed to work together, so your agent can [use case outcome] without coordinating between vendors.",
    items: [
      {
        name: "[Type-safe data layer outcome for this use case]",
        description:
          "Prisma ORM is the declarative, type-safe schema your whole stack and your agent are built around — a small, dense, machine-readable contract, with errors structured for agent consumption. Free, open-source, and the foundation 500K+ developers already trust. [Adjust if needed to show why this matters for the use case.]",
      },
      {
        name: "[Managed database outcome for this use case]",
        description:
          "Prisma Postgres is managed Postgres already wired to your schema and co-located with your app hosting — unikernel microVMs on bare metal, single-digit ms boot, no cold starts. Free per-branch databases integrated with hosting previews, and operation-based pricing with spend limits. [Adjust if needed to show why this matters for the use case.]",
      },
      {
        name: "[App hosting outcome for this use case]",
        description:
          "Prisma Compute (Public Beta) runs your TypeScript app close to your database, helping queries stay fast and deployment stay simple. Your agent can deploy changes, inspect logs, test a preview URL, and redeploy without managing a separate hosting platform. [Adjust if needed to show why this matters for the use case.]",
      },
      {
        name: "[Agent-driven workflow outcome for this use case]",
        description:
          "The Prisma CLI and Prisma Skills are the agent interface for the whole platform — structured output and --json everywhere, with Prisma Skills teaching your agent the commands and workflows, so anything you can run it can run too. [Adjust if needed to show why this matters for the use case.]",
      },
    ],
    cta: { label: "See how it works", href: "/how-it-works" },
  },
  changes: {
    headline: "What changes when your stack is built to work together",
    items: [
      {
        icon: "repeat",
        title: "[Full-loop outcome for this use case]",
        body: "[Short explanation — your agent handles build, deploy, debug, and redeploy without coordinating between vendors.]",
      },
      {
        icon: "rocket",
        title: "[Speed / co-location outcome for this use case]",
        body: "[Short explanation — app and Postgres run on the same host, so queries stay in the single-digit ms range.]",
      },
      {
        icon: "shield",
        title: "[Cost-control outcome for this use case]",
        body: "[Short explanation — one platform with spend limits on every tier and data transfer included, so the bill can't surprise you.]",
      },
    ],
  },
  reasons: {
    headline: "Why teams choose Prisma for [use case]",
    items: [
      {
        title: "Built to work together",
        body: "Prisma ORM, Prisma Postgres, and Prisma Compute share one TypeScript-first workflow, so developers and agents can build, deploy, and debug without stitching together separate tools and platforms.",
      },
      {
        title: "Agent-ready by design",
        body: "Structured output, predictable commands, and clear exit codes make it easier for agents to understand what happened, recover from errors, and keep working without manual intervention.",
      },
      {
        title: "Predictable pricing that scales with you",
        body: "Predictable, operation-based pricing with spend limits on every tier, so your bill stops where you set it — no surprises as you scale. It also runs lower than a multi-vendor stack: about 58% less than Vercel on a typical workload, with 6× lower egress and no per-seat fees. [Adjust if needed to show the cost outcome for this use case.]",
      },
      {
        title: "The TypeScript stack teams already trust",
        body: "Used by 500,000+ developers, with 47.3k GitHub stars for Prisma ORM, [Prisma Postgres usage proof point], and [Prisma Compute deployments / active-apps proof point]. [Optional: focus on the proof point most relevant to this use case.]",
      },
    ],
  },
  cta: {
    headline: "Give your agent everything it needs to [ship the use-case outcome].",
    body: "Start with Prisma ORM to define and build the data layer. When you're ready to ship, add Prisma Postgres and Compute so your agent can deploy the app, inspect logs, fix issues, and redeploy through the same workflow. [Adjust if needed to fit this use case.]",
    benefits: [
      "Build [the first version of the use case] with the free Prisma ORM",
      "Let your agent handle deployment, debugging, and redeployment",
      "Add managed Postgres and hosting without rebuilding the data layer",
    ],
    primaryCta: { label: "Get started free", href: CONSOLE },
    secondaryCta: { label: "See pricing", href: PRICING },
  },
  faqs: [
    {
      question: "[Use-case-specific: do I have to use all three products?]",
      answer:
        "No. Prisma Postgres works with any ORM, Prisma Compute works with any TypeScript app, and the ORM is free and works with any database. Use whichever pieces solve [this use case], and add the rest when you're ready.",
    },
    {
      question: "[Use-case-specific question about fit or setup]",
      answer: "[Plain-language answer grounded in the actual capability.]",
    },
    {
      question: "[Use-case-specific question about cost or scale]",
      answer:
        "Every paid tier includes spend limits, so your bill stops at the cap you set. [Tie to the use case's likely usage.]",
    },
    {
      question: '[Use-case-specific question — e.g. "what if I\'m not using an AI agent?"]',
      answer:
        "Everything works without one. The Prisma CLI and Prisma Skills are built so agents can drive them, but they're also just well-designed developer tools.",
    },
    {
      question: "[Use-case-specific honest-tradeoff question]",
      answer:
        "[Answer that acknowledges where Prisma isn't the right fit — Compute is in public beta, pricing not final; recommend non-critical workloads first. Honesty is on-brand.]",
    },
  ],
};
