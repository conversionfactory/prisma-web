// Verbatim from prisma/web apps/docs/content/docs/(index)/index.mdx — the five
// "Other setups" agent prompts. hrefs absolutized to prisma.io/docs.

export type DocsSetup = { title: string; guideHref: string; guideTitle: string; prompt: string };

export const DOCS_SETUPS: DocsSetup[] = [
  {
    "title": "Add Prisma to an existing project",
    "guideHref": "https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql",
    "guideTitle": "PostgreSQL guide",
    "prompt": "Add Prisma ORM to this existing project.\n\nThis flow is for PostgreSQL. If the project uses MongoDB, follow https://www.prisma.io/docs/prisma-orm/add-to-existing-project/mongodb.md instead; for other databases, stop and tell me.\n\n1. Run `npx prisma@latest orm init --yes --target postgres --authoring psl` (the flags are required when the CLI cannot prompt). It writes `prisma.config.ts`, a starter contract and `db.ts` under `src/prisma/`, and installs dependencies. Then run `npx prisma@latest skills sync` to install the Prisma ORM skills.\n2. Set `DATABASE_URL` in `.env` to my database. If I did not give you one, create a Prisma Postgres database with `npx create-db@latest`, put its connection string in `.env`, and show me the claim URL it prints so I can keep the database.\n3. If the database already has tables, infer the contract from it: `npx prisma@latest contract infer`, then `npx prisma@latest contract emit`, then sign it with `npx prisma@latest db sign`. If the database is empty, keep the starter contract and run `npx prisma@latest db init`.\n4. Write one query with the generated `db` client in an existing code path, run it, and show me the returned rows.\n\nFollow https://www.prisma.io/docs/prisma-orm/add-to-existing-project/postgresql.md and the installed Prisma ORM skills."
  },
  {
    "title": "Prisma ORM with your own PostgreSQL database",
    "guideHref": "https://www.prisma.io/docs/prisma-orm/quickstart/postgresql",
    "guideTitle": "Quickstart",
    "prompt": "Create a new [framework] application with Prisma ORM against my existing PostgreSQL database.\n\nIf I have not given you a connection string, stop and ask; do not invent one. Valid --template values: minimal (the default), next, hono, nuxt, astro, nest, svelte, tanstack-start, elysia.\n\n1. Scaffold: `npm create prisma@latest -- my-app --template [framework] --provider postgres --yes`.\n2. Export my connection string as `DATABASE_URL` in the shell; the generated scripts read the environment variable, not `.env`. From the project directory: `npm run db:init`, then start `npm run dev` in the background and verify the sample query returns data. Sample users are seeded automatically on the app's first query; there is no separate seed script.\n3. Evolve the starter contract under `src/prisma/` into my schema, then run `npm run contract:emit`, `npx prisma@latest migration plan`, and `npx prisma@latest db migrate --yes`.\n\nDo not provision any hosted database. Use the installed Prisma ORM skills and https://www.prisma.io/docs/llms.txt for current docs."
  },
  {
    "title": "Prisma ORM only (Prisma ORM 7)",
    "guideHref": "https://www.prisma.io/docs/v7/prisma-postgres/quickstart/prisma-orm",
    "guideTitle": "Quickstart",
    "prompt": "Add Prisma ORM 7 to this project with my existing database.\n\nIf I have not given you a database connection string and none exists in the project, stop and ask.\n\n1. Run `npx prisma@7.10.0 init` (Prisma ORM 7). For an existing database, set DATABASE_URL in `.env` and introspect it with `npx prisma db pull`; for a new schema, define models in `prisma/schema.prisma` and run `npx prisma migrate dev --name init`. If migrate dev asks to reset the database, stop and ask me first.\n2. Install the driver adapter for the database (Prisma ORM 7 requires one), e.g. `npm install @prisma/adapter-pg` for PostgreSQL, and pass it to `new PrismaClient({ adapter })`. Generate the client with `npx prisma generate` and write one query in an existing code path.\n3. Run the query (e.g. with `npx tsx`) and show me the output, the schema, and the query you added.\n\nCurrent docs: https://www.prisma.io/docs/orm/v7.md and https://www.prisma.io/docs/llms.txt."
  },
  {
    "title": "Prisma Postgres only",
    "guideHref": "https://www.prisma.io/docs/postgres/npx-create-db",
    "guideTitle": "create-db guide",
    "prompt": "Create a Prisma Postgres database for this project.\n\n1. Run `npx create-db@latest`. It creates a temporary Prisma Postgres database without an account and prints a connection string plus a claim URL.\n2. Put the connection string in `.env` as DATABASE_URL and wire it into whichever of Prisma ORM, Kysely, Drizzle, TypeORM, or node-postgres the project already uses (detect it from package.json; if none, ask me). Verify the connection with one trivial query such as `select 1`.\n3. Remind me to open the claim URL to keep the database in my Prisma workspace.\n\nCurrent docs: https://www.prisma.io/docs/postgres.md."
  },
  {
    "title": "Prisma Compute only",
    "guideHref": "https://www.prisma.io/docs/prisma-compute/deploy",
    "guideTitle": "Deploy guide",
    "prompt": "Deploy this app to Prisma Compute using `npx prisma@latest`.\n\nCompute runs apps declared with Prisma Composer: your server code plus a small TypeScript declaration. Port the app following https://www.prisma.io/docs/composer/porting-an-app.md. SvelteKit and Deno are not supported yet; if the app is one of those, stop and tell me.\n\n1. Install `@prisma/composer` and `@prisma/composer-prisma-cloud`, and pin `effect` in package.json to the exact version in `node_modules/@prisma/composer/package.json` (`\"overrides\": { \"effect\": \"<that version>\" }`). Then install the Composer skill with `npx prisma@latest skills sync`, and use it.\n2. Declare the app: a `service.ts` with `compute({ name, deps, build })`, a `module.ts` that provisions it, and a `prisma-composer.config.ts`. Read the port from `service.port()` and bind 0.0.0.0. Replace other `process.env` reads with the service input schema, binding credentials like DATABASE_URL with `envSecret`. Composer does not build: produce one self-contained entry file per service (for example `esbuild <server> --bundle --platform=node --format=esm --outfile=dist/server.mjs`), or use the framework build adapter (Next.js needs the `nextjs` adapter and `output: \"standalone\"`).\n3. Verify locally: run the build, then `npx prisma@latest dev module.ts`, and curl the printed local URL.\n4. Confirm I am signed in with `npx prisma@latest auth whoami`; if not, stop and ask me to run `npx prisma@latest auth login` (it opens a browser).\n5. Deploy: run the build, then `npx prisma@latest deploy module.ts` with the app's env values (like DATABASE_URL) exported in the shell; the first deploy copies input values up to the deployment. Verify the printed public URL with curl.\n\nCurrent docs: https://www.prisma.io/docs/composer/porting-an-app.md and https://www.prisma.io/docs/prisma-compute/deploy.md."
  }
];
