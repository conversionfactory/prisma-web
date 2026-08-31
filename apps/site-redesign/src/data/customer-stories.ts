// Long-form content for the /customers/[slug] detail pages — the redesign of the
// prisma.io/blog customer stories, rebuilt from the approved copy (Notion:
// "Customer Story Detail Page — Batch One").
//
// Separate from customers.ts, which drives the /customers INDEX (card title,
// excerpt, black logo lockup, outbound blog href). That file stays the source
// for the grid; this one carries the full story body. The two share a `slug`,
// and STORY_DETAIL_SLUGS below is what customers-grid.tsx reads to decide
// whether a card links inward (a detail page exists) or out to the live post.
//
// Icons are named against the shared PRODUCT_ICONS map (product/icons.ts) so the
// glyph vocabulary stays consistent with the product pages and the data stays
// serializable. Batch one is seven stories; we build the template on the first
// (Reflag) and fill the rest once the layout is signed off.

import type { ProductIconName } from "@/components/product/icons"

type Fact = { icon: ProductIconName; label: string; value: string }
type Reason = { icon: ProductIconName; title: string; body: string }
type Quote = {
  text: string
  author: string
  /** e.g. "Co-founder & CTO". */
  role: string
  /** Company name, shown after the role. */
  company?: string
  /** Optional link on the company name. */
  companyHref?: string
}
type Result = { icon: ProductIconName; stat: string; detail: string }

export type CustomerStoryDetail = {
  slug: string
  name: string
  /**
   * White-on-transparent customer mark (same asset the index uses on its black
   * plate). Rendered on the hero's dark logo plate, so a white mark is correct.
   */
  logo: string
  /** Skip the whitening filter when the mark is already white — see customers.ts. */
  logoAsIs?: boolean

  hero: {
    title: string
    /** Lead + supporting paragraph; both render in the hero dek. */
    lead: string
    support?: string
  }

  about: {
    heading: string
    body: string
    facts: Fact[]
  }

  challenge: {
    heading: string
    /** Paragraphs before the constraint list. */
    body: string[]
    points: { icon: ProductIconName; title: string; body: string }[]
    /** Closing line after the constraints. */
    outro?: string
  }

  reasons: {
    heading: string
    intro: string
    cards: Reason[]
  }

  /** Pull quote between "Why" and "How". */
  quote: Quote

  usage: {
    heading: string
    body: string[]
  }

  results: {
    heading: string
    intro: string
    items: Result[]
  }

  /** Second pull quote, shown under the results. Optional. */
  closingQuote?: Quote

  cta: {
    heading: string
    body: string
    /** Three ticks. Cycled through the brand spectrum in order. */
    checks: string[]
  }
}

export const CUSTOMER_STORY_DETAILS: CustomerStoryDetail[] = [
  {
    slug: "reflag",
    name: "Reflag",
    logo: "/logos/customers/reflag-white.png",
    logoAsIs: true,
    hero: {
      title: "How Reflag ships reliably with a lean team on Prisma ORM",
      lead: "Reflag, a feature-management platform out of Copenhagen, runs its product on Node.js and PostgreSQL with a team of eight. It uses Prisma ORM to manage the complex relationships between features, users, and feedback without slowing development down.",
      support:
        "For a small team, the data layer can't become the work. Prisma keeps queries type-safe and migrations schema-driven, so Reflag keeps shipping features reliably as the product grows.",
    },
    about: {
      heading: "About Reflag",
      body: "Reflag is a feature-management platform for product engineering teams, bringing feature flags, user feedback, and adoption metrics together in one place. What started three years ago in Copenhagen is now a live product run by a team of eight, built on Node.js services talking to PostgreSQL on Google Cloud.",
      facts: [
        { icon: "layoutGrid", label: "Industry", value: "Developer tools / feature management" },
        { icon: "rocket", label: "Team size", value: "8" },
        { icon: "layers", label: "Stack", value: "Node.js, PostgreSQL, Google Cloud" },
        { icon: "database", label: "Using", value: "Prisma ORM" },
      ],
    },
    challenge: {
      heading: "The challenge",
      body: [
        "Reflag's product lives on complex relationships between features, users, and the feedback tied to them. Modeling and querying that data across their Node.js services meant holding two things together that usually pull apart: moving fast, and staying type-safe as the schema kept growing.",
        "With a team of eight, there's no room for the data layer to slow things down:",
      ],
      points: [
        {
          icon: "layers",
          title: "A data model with real depth.",
          body: "Features, users, and feedback all relate to each other, and every new capability adds relationships to keep consistent.",
        },
        {
          icon: "rocket",
          title: "Velocity that can't drop.",
          body: "A small team ships often, so queries and migrations have to stay easy to change.",
        },
        {
          icon: "shield",
          title: "Type safety that has to hold.",
          body: "Mistakes caught at compile time are mistakes that never reach a customer.",
        },
      ],
      outro:
        "The database is central to the product. It just can't be the thing that slows the product down.",
    },
    reasons: {
      heading: "Why Reflag chose Prisma ORM",
      intro:
        "Reflag reached for Prisma ORM to make working with PostgreSQL fast and safe. The draw wasn't a single feature, it was how the schema, the generated client, and relational queries work together to keep a small team productive.",
      cards: [
        {
          icon: "shield",
          title: "Type-safe from the schema",
          body: "A generated, fully typed client catches mistakes before they ship, no manual setup to keep in sync.",
        },
        {
          icon: "database",
          title: "Relational queries made simple",
          body: "Prisma's include and select turn complex joins into queries that are easy to write and easy to read.",
        },
        {
          icon: "layers",
          title: "One schema the team shares",
          body: "The schema documents the data model in one place, so eight people stay aligned on how the data fits together.",
        },
      ],
    },
    quote: {
      text: "We rely on Prisma heavily for relational queries. It's so intuitive and makes complex queries easy to manage, allowing us to build advanced data retrieval patterns with minimal effort.",
      author: "Ron Cohen",
      role: "Co-founder & CTO",
      company: "Reflag",
      companyHref: "https://reflag.com/",
    },
    usage: {
      heading: "How they use Prisma",
      body: [
        "Reflag uses Prisma ORM as the data-access layer across its Node.js services. As the product evolves, the team uses schema-based migrations to experiment with the database structure, then leans on Prisma's include and select to handle the relational queries the product depends on, all through a generated type-safe client.",
        "The shared schema doubles as documentation. Instead of tribal knowledge about how features, users, and feedback connect, there's one model everyone works from, which keeps a small team moving in the same direction.",
      ],
    },
    results: {
      heading: "The results",
      intro:
        "With Prisma handling the data layer, Reflag ships reliably at a size where every hour counts.",
      items: [
        {
          icon: "rocket",
          stat: "8-person team",
          detail:
            "Shipping features reliably without a dedicated database team.",
        },
        {
          icon: "database",
          stat: "Complex queries, simplified",
          detail: "Relational joins handled through include and select.",
        },
        {
          icon: "layers",
          stat: "One shared schema",
          detail:
            "The data model documented in one place the whole team works from.",
        },
      ],
    },
    closingQuote: {
      text: "Prisma makes database management incredibly easy. For example, when we needed to implement OAuth, which involved creating multiple new database tables, we just defined them in our Prisma schema, ran a migration, and everything was ready. Prisma's built-in type safety helps us avoid mistakes that happen with manual setups.",
      author: "Ron Cohen",
      role: "Co-founder & CTO",
      company: "Reflag",
      companyHref: "https://reflag.com/",
    },
    cta: {
      heading: "Build on the same stack as Reflag",
      body: "If an eight-person team can manage complex relational data and keep shipping, yours can too.",
      checks: [
        "Free to start, no credit card required",
        "One TypeScript stack your agent can operate end to end",
        "Trusted by 500K+ developers",
      ],
    },
  },
  {
    slug: "amplication",
    name: "Amplication",
    logo: "/logos/customers/amplication-white.png",
    logoAsIs: true,
    hero: {
      title: "How Amplication builds Prisma into every app it generates",
      lead: "Amplication is an open-source, low-code tool that generates production-quality Node.js applications, so teams skip the repetitive setup and spend their time on real features instead. Prisma ORM and Prisma Migrate are built right into the stack Amplication generates.",
      support:
        "Amplication bet on Prisma early, back in 2020, and it became an enabler for the whole product: easy to use, strong on TypeScript, and with a migrations story that fit their long-term vision.",
    },
    about: {
      heading: "About Amplication",
      body: "Amplication is an open-source, low-code development tool that helps teams build quality Node.js applications while cutting out repetitive coding. It serves both backend and fullstack developers, generating a complete server-side stack so teams can focus on business logic instead of boilerplate. At the time of the story, Amplication had raised $6.6M in seed funding and was planning to double its team within the year.",
      facts: [
        { icon: "layoutGrid", label: "Industry", value: "Open-source developer tools / low-code" },
        { icon: "rocket", label: "Stage", value: "$6.6M seed, team growing" },
        {
          icon: "layers",
          label: "Stack",
          value: "Node.js, NestJS, PostgreSQL, GraphQL, Passport, Jest, Swagger UI, Docker",
        },
        { icon: "database", label: "Using", value: "Prisma ORM · Prisma Migrate" },
      ],
    },
    challenge: {
      heading: "The challenge",
      body: [
        "Development teams at larger companies were spending too much time on the repetitive, error-prone work at the start of every project: standing up databases, user interfaces, and APIs by hand. That's time that should go into innovative features and complex business logic, not setup.",
        "Amplication set out to remove that friction by generating the whole foundation for a Node.js application. But to do that credibly, the code it generates has to be something developers actually trust:",
      ],
      points: [
        {
          icon: "shield",
          title: "The generated stack has to be production-quality.",
          body: "Teams inherit this code, so it has to be solid, not scaffolding they rip out.",
        },
        {
          icon: "database",
          title: "The data layer has to be easy to work with.",
          body: "Whatever Amplication generates for the database has to be approachable for the developers who take it forward.",
        },
        {
          icon: "gitBranch",
          title: "Schema changes have to stay manageable.",
          body: "As generated apps evolve, migrations can't become a source of friction.",
        },
      ],
    },
    reasons: {
      heading: "Why Amplication chose Prisma",
      intro:
        "Yuval Hazaz, CEO at Amplication, chose Prisma early, in 2020. The decision came down to three things: an easy-to-use tool with a responsive community, strong TypeScript support, and a migrations story that matched where Amplication was headed.",
      cards: [
        {
          icon: "rocket",
          title: "An enabler, easy to use",
          body: "Prisma was easy enough to adopt that Amplication could build it directly into the apps it generates.",
        },
        {
          icon: "code",
          title: "Built for TypeScript",
          body: "Type-safe from the schema, which fit Amplication's TypeScript-first generated stack.",
        },
        {
          icon: "gitBranch",
          title: "Migrations that fit the vision",
          body: "Prisma Migrate auto-generates customizable schema migrations, aligned with Amplication's long-term plans.",
        },
      ],
    },
    quote: {
      text: "Prisma was a really good bet, and it helped us a lot when working on Amplication. It was an enabler for us because we actually use Prisma in the generated app, and it is really easy to use.",
      author: "Yuval Hazaz",
      role: "CEO",
      company: "Amplication",
      companyHref: "https://amplication.com/",
    },
    usage: {
      heading: "How they use Prisma",
      body: [
        "Prisma is part of the server-side stack Amplication generates, alongside NestJS, PostgreSQL, GraphQL, Passport, Jest, Swagger UI, and Docker. The Prisma Client slots into NestJS's modular architecture, carrying type safety through the application layer so the generated code is type-safe end to end.",
        "Prisma Migrate handles schema changes in that generated stack, auto-generating customizable migrations. That keeps schema evolution low-friction for the teams who take an Amplication-generated app forward, so they stay focused on building features rather than refactoring the data layer.",
      ],
    },
    results: {
      heading: "The results",
      intro:
        "Prisma became a foundational part of what Amplication ships, built into every app it generates.",
      items: [
        {
          icon: "database",
          stat: "Prisma in every generated app",
          detail: "Prisma ORM and Migrate are part of Amplication's generated server stack.",
        },
        {
          icon: "code",
          stat: "TypeScript-first, type-safe",
          detail: "Type safety carried through the NestJS application layer.",
        },
        {
          icon: "gitBranch",
          stat: "Low-friction migrations",
          detail: "Prisma Migrate keeps schema changes manageable so teams build, not refactor.",
        },
      ],
    },
    closingQuote: {
      text: "Supporting and building with TypeScript was really great for us. I also think migrations are amazing.",
      author: "Yuval Hazaz",
      role: "CEO",
      company: "Amplication",
    },
    cta: {
      heading: "Build on the same stack as Amplication",
      body: "Amplication trusts Prisma enough to build it into every app it ships. See what it can do for yours.",
      checks: [
        "Free to start, no credit card required",
        "One TypeScript stack your agent can operate end to end",
        "Trusted by 500K+ developers",
      ],
    },
  },
  {
    slug: "formbricks",
    name: "Formbricks",
    logo: "/logos/customers/formbricks-white.png",
    logoAsIs: true,
    hero: {
      title: "How Formbricks kept its serverless backend online under load with Prisma Accelerate",
      lead: "Formbricks, an open-source survey and feedback platform, hit a scaling wall running its cloud version on a serverless backend. A usage spike blew past its database connection limit and took the database down. Prisma Accelerate's connection pooling solved it, and the setup was simple enough to do at 3 a.m. mid-incident.",
    },
    about: {
      heading: "About Formbricks",
      body: "Formbricks is an open-source, privacy-first survey and feedback platform. It lets businesses gather user insights through in-app surveys, website surveys, link-based questionnaires, and email surveys, with prebuilt data analysis built in as an experience-management solution.",
      facts: [
        { icon: "layoutGrid", label: "Industry", value: "Open-source survey / experience management" },
        { icon: "server", label: "Deployment", value: "Cloud version on Vercel, serverless backend" },
        { icon: "database", label: "Using", value: "Prisma Accelerate (connection pooling)" },
      ],
    },
    challenge: {
      heading: "The challenge",
      body: [
        "Formbricks runs its cloud version on Vercel with a serverless backend, and that architecture ran into a hard limit. Serverless functions open lots of short-lived database connections, and Formbricks exceeded its connection pool size, hitting performance bottlenecks along the way.",
        "Then a significant usage spike pushed it over the edge: the database failed and server load climbed, forcing an urgent need for something more robust.",
      ],
      points: [
        {
          icon: "server",
          title: "Serverless exhausts connections.",
          body: "Many concurrent functions meant more database connections than the pool could hold.",
        },
        {
          icon: "rocket",
          title: "A spike became an outage.",
          body: "Growing traffic tipped bottlenecks into a database failure.",
        },
        {
          icon: "swap",
          title: "Alternatives were too expensive.",
          body: "Options like AWS RDS Proxy existed, but the cost was prohibitively high.",
        },
      ],
    },
    reasons: {
      heading: "Why Formbricks chose Prisma Accelerate",
      intro:
        "Formbricks needed connection pooling built for serverless, without the price tag of the heavier alternatives. Prisma Accelerate offered an accessible, cost-effective option with a low barrier to entry, and it was straightforward enough to set up in the middle of an incident.",
      cards: [
        {
          icon: "server",
          title: "Connection pooling for serverless",
          body: "A scalable pool that manages many database connections without exhausting the limit.",
        },
        {
          icon: "swap",
          title: "Cost-effective by comparison",
          body: "A low entry barrier where alternatives like AWS RDS Proxy were prohibitively expensive.",
        },
        {
          icon: "rocket",
          title: "Simple to set up",
          body: "Create an account, swap the connection string, connect the database, done, even at 3 a.m.",
        },
      ],
    },
    quote: {
      text: "It's also possible to set up Accelerate when you're totally tired at 3 a.m. in the morning. The process was pretty straightforward – created an account, replaced the connection string, and connected the database on the Prisma Accelerate website. It was easy and worked out, even under those high-pressure circumstances.",
      author: "Matti Nannt",
      role: "Co-Founder",
      company: "Formbricks",
      companyHref: "https://formbricks.com/",
    },
    usage: {
      heading: "How they use Prisma",
      body: [
        "Formbricks put Prisma Accelerate in front of its database to handle connection pooling for the serverless backend. The setup was deliberately minimal: create a Prisma Accelerate account, replace the connection string, and connect the database through the Accelerate website, which is exactly what they did during the database-failure incident at 3 a.m.",
        "With Accelerate's scalable connection pool in place, the serverless architecture could manage large numbers of database connections while holding performance during traffic surges.",
      ],
    },
    results: {
      heading: "The results",
      intro:
        "The integration resolved Formbricks' scalability problems and strengthened its serverless backend against future spikes.",
      items: [
        {
          icon: "server",
          stat: "Serverless scaling, solved",
          detail: "Connection pooling that keeps serverless from exhausting the database.",
        },
        {
          icon: "shield",
          stat: "Held up under surges",
          detail: "The pool manages many connections while maintaining performance during traffic spikes.",
        },
        {
          icon: "rocket",
          stat: "Set up mid-incident",
          detail: "Configured at 3 a.m. during a live database failure.",
        },
      ],
    },
    cta: {
      heading: "Build on the same stack as Formbricks",
      body: "If your serverless backend is straining its database connections, Prisma can take the pressure off.",
      checks: [
        "Free to start, no credit card required",
        "One TypeScript stack your agent can operate end to end",
        "Trusted by 500K+ developers",
      ],
    },
  },
  {
    slug: "solin",
    name: "Solin",
    logo: "/logos/customers/solin-white.png",
    logoAsIs: true,
    hero: {
      title: "How Solin serves 2.5M database queries a day with Prisma",
      lead: "Solin, a fitness-creator marketplace, ran a serverless backend that kept exhausting its database connections during traffic spikes, causing failed requests and a poor experience. With Prisma ORM and Prisma Accelerate, it now serves 2.5 million database queries a day with zero connection issues.",
      support:
        "Accelerate's connection pooling ended the failures, and per-query caching made landing pages lightning fast, which fed directly into better conversion.",
    },
    about: {
      heading: "About Solin",
      body: "Solin is a fitness marketplace that connects fitness creators with consumers. Creators sell workout programs, challenges, memberships, and cookbooks, while consumers get community features and transformation-tracking tools. The platform runs a fullstack serverless app in the fitness-technology space.",
      facts: [
        { icon: "layoutGrid", label: "Industry", value: "Fitness technology / creator marketplace" },
        { icon: "layers", label: "Stack", value: "Remix, Vercel serverless, PostgreSQL on Heroku" },
        { icon: "database", label: "Using", value: "Prisma ORM · Prisma Accelerate" },
      ],
    },
    challenge: {
      heading: "The challenge",
      body: [
        "Solin runs a fullstack Remix app on Vercel with serverless functions, and that setup hit a familiar serverless wall: too many database connections. As the user base and query volume grew, its PostgreSQL database on Heroku couldn't hold enough connections, and traffic spikes exhausted the limit.",
        "When the connections ran out, requests failed and the user experience suffered:",
      ],
      points: [
        {
          icon: "server",
          title: "Serverless exhausts connections.",
          body: "Many concurrent functions opened more connections than the database could sustain.",
        },
        {
          icon: "rocket",
          title: "Spikes caused failed requests.",
          body: "When the limit was hit, requests dropped and users felt it.",
        },
        {
          icon: "swap",
          title: "Growth made it worse.",
          body: "A growing audience and rising query volume kept pushing against the ceiling.",
        },
      ],
    },
    reasons: {
      heading: "Why Solin chose Prisma",
      intro:
        "Solin already used Prisma ORM to query its database. When connection limits became the bottleneck, Prisma Accelerate added the connection pooling and caching the serverless backend needed to scale, without changing how the team wrote queries.",
      cards: [
        {
          icon: "server",
          title: "Connection pooling at scale",
          body: "Accelerate's pool manages database connections so serverless functions stop exhausting the limit.",
        },
        {
          icon: "repeat",
          title: "Per-query caching",
          body: "ttl and swr options set per query, ideal for landing pages whose content rarely changes.",
        },
        {
          icon: "code",
          title: "No change to the query layer",
          body: "Accelerate layered onto the Prisma ORM queries Solin was already writing.",
        },
      ],
    },
    quote: {
      text: "Accelerate is a perfect fit for landing pages. We are able to take advantage of caching to speed up queries and reduce latency, making them lightning fast. This obviously means we have a faster landing page, leading to better conversion.",
      author: "Blake Carroll",
      role: "CTO",
      company: "Solin",
    },
    usage: {
      heading: "How they use Prisma",
      body: [
        "Solin's API layer uses Prisma ORM to query the database, with Prisma Accelerate's connection pool sitting in front to manage connections at scale across its serverless functions. On top of pooling, the team uses Accelerate's caching on a per-query basis, applying ttl (time-to-live) and swr (stale-while-revalidate) where it helps most, particularly on landing pages with content that rarely changes.",
        "That combination keeps the serverless backend from running out of connections during spikes, while caching keeps high-traffic pages fast.",
      ],
    },
    results: {
      heading: "The results",
      intro: "Prisma took Solin from connection failures to serving millions of queries a day, reliably.",
      items: [
        {
          icon: "database",
          stat: "2.5M queries / day",
          detail: "Database queries served daily through Prisma.",
        },
        {
          icon: "shield",
          stat: "Zero connection issues",
          detail: "No connection problems since adopting Accelerate.",
        },
        {
          icon: "rocket",
          stat: "Faster landing pages",
          detail:
            "Cached pages load lightning fast, improving conversion, while reduced server load lowers costs.",
        },
      ],
    },
    cta: {
      heading: "Build on the same stack as Solin",
      body: "If your serverless app is straining its database connections, Prisma can pool and cache its way past the limit.",
      checks: [
        "Free to start, no credit card required",
        "One TypeScript stack your agent can operate end to end",
        "Trusted by 500K+ developers",
      ],
    },
  },
  {
    slug: "elsevier",
    name: "Elsevier",
    logo: "/logos/customers/elsevier.svg",
    hero: {
      title: "How one tech lead built Elsevier's peer-review MVP in ten months with Prisma",
      lead: "Elsevier, a global leader in scientific publishing, set out to modernize a slow, manual peer-review process. Led by a single tech lead, the team built a meaningful MVP in ten months on Prisma, and it now processes real scientific publications.",
      support:
        "Prisma Client, Prisma Migrate, and Nexus let one engineer move fast, experiment with the data model, and keep frontend and database types in sync, so the product could change quickly based on user feedback.",
    },
    about: {
      heading: "About Elsevier",
      body: "Elsevier is a global leader in information and analytics for scientific publishing, helping researchers and healthcare professionals advance science and improve health outcomes. This project set out to modernize its peer-review workflow for journal publications.",
      facts: [
        { icon: "layoutGrid", label: "Industry", value: "Scientific publishing / information analytics" },
        { icon: "rocket", label: "Scale", value: "Global" },
        { icon: "layers", label: "Stack", value: "TypeScript, GraphQL, Nexus, AWS Lambda" },
        { icon: "database", label: "Using", value: "Prisma Client · Prisma Migrate · Nexus" },
      ],
    },
    challenge: {
      heading: "The challenge",
      body: [
        "Elsevier's peer-review process for scientific publications was manual, outdated, and slow, a logically complex workflow that needed modernizing to stay competitive in healthcare research.",
        "Rebuilding it came with real constraints:",
      ],
      points: [
        {
          icon: "layers",
          title: "A logically complex workflow.",
          body: "Multi-user document editing needs a nested data structure, not flat records.",
        },
        {
          icon: "rocket",
          title: "Speed of iteration mattered.",
          body: "The product had to change quickly as user feedback came in.",
        },
        {
          icon: "bot",
          title: "A very small team.",
          body: "Much of the build rested on a single tech lead, so hand-writing boilerplate wasn't an option.",
        },
      ],
    },
    reasons: {
      heading: "Why Elsevier chose Prisma",
      intro:
        "The team chose Prisma to move fast without writing and maintaining the usual boilerplate. Paired with Nexus for code-first GraphQL, Prisma removed the manual work of definitions, resolvers, schemas, and models, while keeping everything type-safe in TypeScript.",
      cards: [
        {
          icon: "layers",
          title: "GraphQL with the nested data it needed",
          body: "Nexus gave the multi-user document editing a nested structure, code-first.",
        },
        {
          icon: "code",
          title: "Less boilerplate to hand-write",
          body: "Prisma eliminated manual definitions, resolvers, schemas, and models.",
        },
        {
          icon: "checkCircle",
          title: "Frontend and database types in sync",
          body: "TypeScript throughout kept application types aligned with the database.",
        },
      ],
    },
    quote: {
      text: "Writing all that by yourself, it's a lot of work. The flexibility of moving fast and changing fast, that was crucial.",
      author: "Serghei Ghidora",
      role: "Tech Lead",
      company: "Elsevier",
      companyHref: "https://www.elsevier.com/",
    },
    usage: {
      heading: "How they use Prisma",
      body: [
        "The MVP is built around a Prisma and Nexus package that holds the schema, migrations, and generated types. AWS Lambda functions use Prisma Client to update resources directly, and the business logic backed by Prisma serves both the GraphQL API and the frontend. Everything is written in TypeScript, so database and frontend types stay synchronized.",
        "Handling schema changes is a big part of why it worked for a small team. As Serghei Ghidora put it: “When it comes to the data model experimentation, handling migrations, you run the migrations and Prisma will do everything by itself.”",
        "On type safety, they said: “Your frontend application types are always in sync with what's available on the database level. That's a big, big deal.”",
      ],
    },
    results: {
      heading: "The results",
      intro:
        "One tech lead turned a complex, manual process into a working product that runs on real publications today.",
      items: [
        {
          icon: "rocket",
          stat: "MVP in 10 months",
          detail: "A meaningful MVP delivered in ten months.",
        },
        {
          icon: "bot",
          stat: "Built by 1 tech lead",
          detail: "A large, complex product driven largely by a single engineer.",
        },
        {
          icon: "checkCircle",
          stat: "Live on real publications",
          detail:
            "Processing real scientific publications, holding up with few critical bugs as it moves toward full production.",
        },
      ],
    },
    closingQuote: {
      text: "Prisma is one of the bricks of that foundation.",
      author: "Serghei Ghidora",
      role: "Tech Lead",
      company: "Elsevier",
    },
    cta: {
      heading: "Build on the same stack as Elsevier",
      body: "Prisma helped one tech lead take a complex workflow from MVP to real publications. Start building on it today.",
      checks: [
        "Free to start, no credit card required",
        "One TypeScript stack your agent can operate end to end",
        "Trusted by 500K+ developers",
      ],
    },
  },
  {
    slug: "tryg",
    name: "Tryg",
    logo: "/logos/customers/tryg-white.svg",
    logoAsIs: true,
    hero: {
      title: "How Tryg unified decades of insurance data with Prisma",
      lead: "Tryg, one of the Nordic region's largest non-life insurers, handles over a million claims a year across data sources spread between countries and built up over decades. It uses Prisma to power Tryg 360, the in-house data-broker platform that pulls all of it into one model.",
      support:
        "Prisma auto-generates database clients and GraphQL APIs straight from the schema, even for data models that run to 10,000 lines, so Tryg's developers iterate quickly and data becomes reachable for people without SQL expertise.",
    },
    about: {
      heading: "About Tryg",
      body: "Tryg is one of the Nordic region's largest non-life insurance companies, covering private, commercial, and corporate markets and handling more than a million claims a year. To make its data accessible across the business, Tryg built Tryg 360, a proprietary data-broker platform, with Prisma as a core enabling technology.",
      facts: [
        { icon: "layoutGrid", label: "Industry", value: "Non-life insurance" },
        { icon: "rocket", label: "Scale", value: "Nordic's largest, 1M+ claims/year" },
        {
          icon: "layers",
          label: "Stack",
          value: "CockroachDB, Kubernetes, Helm, Apache Kafka, GraphQL, Pal.js",
        },
        { icon: "database", label: "Using", value: "Prisma Client · Prisma Schema (generator API)" },
      ],
    },
    challenge: {
      heading: "The challenge",
      body: [
        "Tryg's data had accumulated across different countries over decades, in systems that were never designed to work together. The result was a harmonization problem at scale:",
      ],
      points: [
        {
          icon: "layers",
          title: "Incompatible models.",
          body: "Data sources across countries used models built independently over many years.",
        },
        {
          icon: "swap",
          title: "Conflicting definitions.",
          body: "The same concept meant different things in different systems, creating redundancy and workarounds.",
        },
        {
          icon: "settings",
          title: "Slow, error-prone integration.",
          body: "Bringing it all together by hand was time-consuming and easy to get wrong.",
        },
        {
          icon: "database",
          title: "Locked behind SQL.",
          body: "The goal was to make data accessible to everyone who needed it, including people without SQL expertise.",
        },
      ],
    },
    reasons: {
      heading: "Why Tryg chose Prisma",
      intro:
        "Tryg chose Prisma as a critical enabler for Tryg 360 because it could generate the data-access layer from the schema and hold up under models far larger than most tools handle.",
      cards: [
        {
          icon: "database",
          title: "Clients generated from the schema",
          body: "Prisma auto-generates database clients directly from the Prisma schema.",
        },
        {
          icon: "code",
          title: "GraphQL APIs, auto-generated",
          body: "Paired with Pal.js, the platform auto-generates GraphQL resolvers and type definitions for developers to work against.",
        },
        {
          icon: "layers",
          title: "Built for extreme complexity",
          body: "Prisma handles very complex models and massive datasets, with schema files up to 10,000 lines and over a million characters.",
        },
      ],
    },
    quote: {
      text: "Prisma is a huge technical enabler for us.",
      author: "Artur Mrozowski",
      role: "Data Engineer",
      company: "Tryg",
      companyHref: "https://www.tryg.com/",
    },
    usage: {
      heading: "How they use Prisma",
      body: [
        "Tryg 360 is a data broker that streams live data from multiple sources into one place, without transforming it up front. Data synchronizes through a Time-Aware MirrorMaker built on Apache Kafka into a local Kafka cluster for selective loading, and lands in CockroachDB, which speaks the PostgreSQL wire protocol, as unified storage.",
        "Prisma Client accesses CockroachDB, and from the Prisma schema the platform generates the database client and, with Pal.js, the GraphQL resolvers and type definitions. Whole environments spin up in one click through Kubernetes and Helm charts, so there's no manual configuration between a developer and a working environment.",
      ],
    },
    results: {
      heading: "The results",
      intro:
        "Tryg turned decades of scattered, incompatible data into one model developers can build on quickly.",
      items: [
        {
          icon: "layers",
          stat: "Many sources, one schema",
          detail: "Multiple data sources unified into a single schema and data model.",
        },
        {
          icon: "rocket",
          stat: "One-click environments",
          detail: "Kubernetes and Helm provision whole environments without manual setup.",
        },
        {
          icon: "code",
          stat: "Faster development",
          detail: "Generating clients and APIs from code lets developers iterate quickly.",
        },
      ],
    },
    closingQuote: {
      text: "Our setup with Prisma enabled us to generate everything from code and ensure our developers can iterate very quickly.",
      author: "Lasse Abelsen",
      role: "DevOps Engineer",
      company: "Tryg",
    },
    cta: {
      heading: "Build on the same stack as Tryg",
      body: "Tryg unified decades of insurance data on Prisma. See what it can do for your data model.",
      checks: [
        "Free to start, no credit card required",
        "Clients and GraphQL APIs generated from your schema",
        "Trusted by 500K+ developers",
      ],
    },
  },
  {
    slug: "panther",
    name: "Panther",
    logo: "/logos/customers/panther.svg",
    hero: {
      title: "How Panther keeps data consistent across microservices in 160+ countries with Prisma",
      lead: "Panther, a global payroll and compliance platform, runs a distributed microservices architecture behind a federated GraphQL API. It uses Prisma ORM to guarantee that the data flowing through that API is valid and correctly shaped, no matter which service it came from.",
      support:
        "Prisma lets Panther's independent service teams move fast while keeping data consistent across the whole platform, giving them faster time to market with type safety end to end.",
    },
    about: {
      heading: "About Panther",
      body: "Panther is a global payroll and compliance platform that helps organizations hire remote talent across borders. Operating in over 160 countries, it handles hiring, onboarding, payroll, benefits administration, and labor-law compliance. Panther is a 100% remote company in a period of significant growth, having raised $2.5M in its latest funding round.",
      facts: [
        { icon: "layoutGrid", label: "Industry", value: "Global payroll & compliance" },
        { icon: "rocket", label: "Scale", value: "160+ countries, 100% remote, $2.5M raised" },
        {
          icon: "layers",
          label: "Stack",
          value: "TypeScript, Node.js, MySQL, MongoDB, GraphQL (Apollo Federation), React",
        },
        { icon: "database", label: "Using", value: "Prisma ORM · Prisma Data Proxy" },
      ],
    },
    challenge: {
      heading: "The challenge",
      body: [
        "Panther set out to build a complex platform from multiple independent services, and needed to keep data consistent across a distributed microservices architecture. Its domain-driven design and federated GraphQL API depended on reliable database interaction underneath.",
      ],
      points: [
        {
          icon: "server",
          title: "Many independent services.",
          body: "Each team owns its own service, but the data has to stay consistent across all of them.",
        },
        {
          icon: "code",
          title: "A federated GraphQL API.",
          body: "Data from many services funnels into one API, and its shape has to be guaranteed.",
        },
        {
          icon: "database",
          title: "Reliable database interaction.",
          body: "A distributed architecture across borders needs database tooling teams can depend on.",
        },
      ],
    },
    reasons: {
      heading: "Why Panther chose Prisma",
      intro:
        "Before committing, co-founder and CTO Vasil Popovski looked hard at whether Prisma was a technology Panther could rely on for the long run, weighing its backing, community, and documentation. On the product side, the draw was faster time to market, developer productivity, type safety, and guaranteed data structures through the GraphQL API.",
      cards: [
        {
          icon: "shield",
          title: "A technology to rely on",
          body: "Backing, community, and complete documentation that made Prisma safe to standardize on.",
        },
        {
          icon: "checkCircle",
          title: "Guaranteed data shape",
          body: "Type safety that ensures the data reaching the GraphQL API is valid and correctly shaped.",
        },
        {
          icon: "rocket",
          title: "Faster time to market",
          body: "Developer productivity that helps independent teams ship quickly.",
        },
      ],
    },
    quote: {
      text: "I did a lot of investigation on whether Prisma was going to be supported by its creators, whether it's something we can rely on and will be here in the long run. I also looked at the community, which is an important factor when switching to a new technology, and finally the completeness of the documentation.",
      author: "Vasil Popovski",
      role: "Co-founder & CTO",
      company: "Panther",
      companyHref: "https://www.panther.co/",
    },
    usage: {
      heading: "How they use Prisma",
      body: [
        "Panther's platform is built in TypeScript and Node.js, with MySQL and MongoDB behind the services, a React frontend, and a federated GraphQL API using Apollo Federation, with Dataloaders batching and caching requests. Prisma ORM sits in the services as the database layer, guaranteeing the shape of the data that funnels through the main GraphQL API. Prisma Data Proxy handles database connections for serverless without exhausting them.",
        "This lets individual microservice teams keep their freedom while the platform maintains data consistency across the federated GraphQL layer.",
      ],
    },
    results: {
      heading: "The results",
      intro:
        "Panther built a complex, distributed platform where independent teams ship freely and the data stays consistent across all of it.",
      items: [
        {
          icon: "layoutGrid",
          stat: "160+ countries",
          detail: "Automated global payroll and compliance across more than 160 countries.",
        },
        {
          icon: "server",
          stat: "Independent teams, consistent data",
          detail: "Microservice teams keep their freedom while data stays consistent.",
        },
        {
          icon: "code",
          stat: "One federated GraphQL API",
          detail: "Data from many services funnels through one API with a guaranteed shape.",
        },
      ],
    },
    closingQuote: {
      text: "We have to rely on a lot of internal APIs, and Prisma guarantees that the data and the shape of the data that gets funnelled through the main GraphQL API at the end is valid and is of a specific shape.",
      author: "Vasil Popovski",
      role: "Co-founder & CTO",
      company: "Panther",
    },
    cta: {
      heading: "Build on the same stack as Panther",
      body: "Panther keeps data consistent across a global microservices platform. See what Prisma can do for yours.",
      checks: [
        "Free to start, no credit card required",
        "Type-safe data across every service",
        "Trusted by 500K+ developers",
      ],
    },
  },
]

const BY_SLUG = new Map(CUSTOMER_STORY_DETAILS.map((s) => [s.slug, s]))

export function getCustomerStory(slug: string): CustomerStoryDetail | undefined {
  return BY_SLUG.get(slug)
}

/** Slugs with a built detail page — customers-grid uses this to link inward. */
export const STORY_DETAIL_SLUGS = new Set(BY_SLUG.keys())
