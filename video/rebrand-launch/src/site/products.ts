import { C } from "../theme";

// Copy from apps/site-redesign/src/components/sections/stack-bento.tsx.
export const PRODUCTS = [
  {
    name: "Prisma ORM",
    role: "Type-safe data layer",
    dot: C.cyan400,
    body: "A declarative, type-safe schema rebuilt in native TypeScript, the shared contract your whole stack and your agent are built around.",
    object: "brand/cards-3d.png",
    w: 560,
    h: 384,
    fit: 0.9,
    panel: "brand/feature-orm.jpg",
  },
  {
    name: "Prisma Postgres",
    role: "Managed database",
    dot: C.yellow300,
    body: "Managed Postgres already wired to your schema and co-located with your app hosting, on infrastructure built for single-digit ms boot times.",
    object: "brand/database-3d.png",
    w: 560,
    h: 560,
    fit: 0.78,
    panel: "brand/feature-postgres.jpg",
  },
  {
    name: "Prisma Compute",
    role: "App hosting",
    dot: C.red500,
    body: "TypeScript app hosting that runs on the same host as your database, so your agent can deploy, debug, and redeploy end-to-end.",
    object: "brand/cpu-3d.png",
    w: 800,
    h: 800,
    fit: 0.56,
    panel: "brand/feature-compute.jpg",
  },
];

// Connector captions between the bento cards, same file.
export const CONNECTORS = [
  { file: "contract.prisma", caption: "The shared contract across your stack", from: C.cyan400, to: C.yellow300 },
  { file: "prisma.config.ts", caption: "One config, both products", from: C.yellow300, to: C.red500 },
];
