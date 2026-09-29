"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { useReducedMotion } from "framer-motion";
import { AgentRobot } from "@/components/brand/agent-robot";
import { Marker } from "@/components/brand/marker";
import { CheckBold } from "@/components/icons/forma";
import { Bar } from "@/components/product/illustrations/parts";
import { cn } from "@/lib/utils";

// The /prisma-stack hero abstraction, after the client's mock-up (2026-09-29):
// the stack shown being driven by an agent. One prompt at the top, then the
// agent's run down a spectrum rail — it edits the schema (Prisma ORM), one
// deploy ships the migration (Prisma Postgres) and the app (Prisma Compute).
//
// The in-visual wording is the client's, from the mock-up. Brand changes from
// it: light code panel with the site's syntax hues instead of a dark editor,
// product colour carried by Marker dots rather than filled pills (pills belong
// to buttons), and Prismo as the agent.
//
// One motion: the run plays step by step, holds on the finished state, then
// replays. Under reduced motion it rests on the finished state.

// How long each phase holds, in ms. Phase i reveals everything at step <= i.
const PHASES = [900, 1400, 1100, 1200, 450, 450, 450, 3800];
const DONE = PHASES.length - 1;

const MONO = "font-mono text-[0.6875rem] leading-none";

function Kw({ children }: { children: React.ReactNode }) {
  return <span className="text-prism-cyan-600">{children}</span>;
}
function Type({ children }: { children: React.ReactNode }) {
  return <span className="text-prism-yellow-600">{children}</span>;
}
function Attr({ children }: { children: React.ReactNode }) {
  return <span className="text-prism-red-500">{children}</span>;
}

/** Text on the rail: lit once the run reaches it, faded before. */
function Step({
  on,
  className,
  children,
}: {
  on: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "transition-opacity duration-500 ease-out motion-reduce:transition-none",
        on ? "opacity-100" : "opacity-35",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** The agent's narration between panels, on the rail. */
function RailCaption({
  on,
  dot,
  children,
}: {
  on: boolean;
  dot: string;
  children: React.ReactNode;
}) {
  return (
    <Step on={on} className="flex items-center gap-2.5 py-3 pl-[1.625rem] sm:pl-[1.875rem]">
      <span
        aria-hidden
        className={cn(
          "relative z-10 size-2 shrink-0 rounded-full ring-4 ring-white transition-colors duration-500",
          on ? dot : "bg-border",
        )}
      />
      <span className={cn(MONO, "min-w-0 truncate text-muted-foreground")}>{children}</span>
    </Step>
  );
}

// Panels stay opaque while they wait their turn — a white veil ghosts the
// contents instead, so the hero's ray never shows through a half-lit card.
function Panel({
  on = true,
  className,
  children,
}: {
  on?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-border/80 bg-card shadow-[0_1px_2px_rgba(21,21,21,0.04),0_12px_24px_-12px_rgba(21,21,21,0.12)]",
        className,
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-card transition-opacity duration-500 ease-out motion-reduce:transition-none",
          on ? "opacity-0" : "opacity-65",
        )}
      />
    </div>
  );
}

const noopSubscribe = () => () => {};

const CHECKS = ["app deployed", "migration add_plan", "stage: production"];

export function StackHeroVisual() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(0);

  // False during SSR and hydration, true after — so the first render is the
  // same on server and client, and reduced motion only takes over once mounted.
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    if (reduce) return;
    const id = setTimeout(() => setPhase((p) => (p + 1) % PHASES.length), PHASES[phase]);
    return () => clearTimeout(id);
  }, [phase, reduce]);

  const at = reduce && mounted ? DONE : phase;
  const working = at < DONE;

  return (
    <figure
      role="img"
      aria-label="Illustration of an agent driving the Prisma Stack: asked to add a paid plan to users and ship it, the agent edits schema.prisma in Prisma ORM, then one deploy ships the add_plan migration to Prisma Postgres and the app to production on Prisma Compute"
      className="pointer-events-none flex h-full w-full select-none flex-col justify-center text-left"
    >
      <div className="relative">
        {/* the rail the agent's run travels down, from the ask to the last card */}
        <span
          aria-hidden
          className="absolute bottom-12 left-[1.8125rem] top-8 w-0.5 rounded-full bg-gradient-to-b from-prism-cyan-300 via-prism-yellow-300 to-prism-red-300 sm:left-[2.0625rem]"
        />

        {/* the ask */}
        <Panel className="flex items-center gap-3 p-2.5 pr-3 sm:gap-4 sm:p-3 sm:pr-4">
          <span className="relative flex size-10 shrink-0 items-end justify-center overflow-hidden rounded-lg border border-prism-cyan-200 bg-gradient-to-b from-white to-prism-cyan-50 sm:size-11">
            <AgentRobot variant="nod" className="w-[118%] max-w-none translate-y-[8%]" />
          </span>
          <div className="min-w-0 flex-1">
            <p className={cn(MONO, "text-prism-cyan-700")}>you → agent</p>
            <p className="mt-1.5 truncate text-[0.875rem] font-semibold text-foreground sm:text-[0.9375rem]">
              Add a paid plan to users and ship it.
            </p>
          </div>
          <Marker
            color={cn(
              working ? "bg-prism-cyan-400 animate-status-pulse" : "bg-prism-cyan-500",
              "motion-reduce:animate-none",
            )}
            className="shrink-0 font-mono text-[0.625rem] font-medium max-sm:hidden"
          >
            agent working
          </Marker>
        </Panel>

        <RailCaption on={at >= 1} dot="bg-prism-cyan-400">
          agent · edits schema.prisma
        </RailCaption>

        {/* 1 · Prisma ORM — the schema change */}
        <Panel on={at >= 1}>
          <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
            <span className="size-2 rounded-full bg-border" />
            <span className="size-2 rounded-full bg-border" />
            <span className="ml-1.5 font-mono text-xs text-foreground">schema.prisma</span>
            <Marker color="bg-prism-cyan-400" className="ml-auto">
              1 · Prisma ORM
            </Marker>
          </div>
          <div
            className={cn(
              MONO,
              "flex flex-col gap-2.5 whitespace-pre py-4 text-foreground sm:text-xs",
            )}
          >
            <p className="px-4">
              <Kw>model</Kw> User {"{"}
            </p>
            <p className="pl-8 pr-4">
              {"id "}
              <Type>{"Int "}</Type>
              <Attr>@id @default(autoincrement())</Attr>
            </p>
            <p className="pl-8 pr-4">
              {"email "}
              <Type>{"String "}</Type>
              <Attr>@unique</Attr>
            </p>
            {/* the agent's one-line change, highlighted as a diff */}
            <p
              className={cn(
                "relative -my-1 py-1 pl-8 pr-4 transition-[background-color,opacity] duration-500 motion-reduce:transition-none",
                at >= 1 ? "bg-prism-cyan-50 opacity-100" : "opacity-0",
              )}
            >
              <span aria-hidden className="absolute left-0 top-0 h-full w-0.5 bg-prism-cyan-400" />
              <span className="absolute left-4 text-prism-cyan-600">+</span>
              {"plan "}
              <Type>{"String "}</Type>
              <Attr>@default(&quot;free&quot;)</Attr>
            </p>
            <p className="px-4">{"}"}</p>
          </div>
        </Panel>

        <RailCaption on={at >= 2} dot="bg-prism-yellow-400">
          agent · npx prisma deploy · one step ships app + migration
        </RailCaption>

        <div className="grid gap-3 sm:grid-cols-2">
          {/* 2 · Prisma Postgres — the migration landed */}
          <Panel on={at >= 3} className="flex h-full flex-col p-4">
            <Marker color="bg-prism-yellow-400" className="self-start">
              2 · Prisma Postgres
            </Marker>
            <p className="mt-3 text-pretty text-[0.8125rem] font-semibold leading-snug text-foreground">
              Migration <code className="font-mono font-medium">add_plan</code> shipped with the
              deploy
            </p>
            <div
              className={cn(
                MONO,
                "mt-3 grid grid-cols-[2rem_minmax(0,1fr)_3.5rem] overflow-hidden rounded-lg border border-border/80 [&>span]:px-2 [&>span]:py-2",
              )}
            >
              {[
                ["id", "email", "plan"],
                ["1", "ada@…", "free"],
                ["2", "lin@…", "free"],
              ].map((row, r) =>
                row.map((cell, c) => (
                  <span
                    key={`${r}-${c}`}
                    className={cn(
                      "truncate",
                      r === 0
                        ? "text-muted-foreground"
                        : "border-t border-border/60 text-foreground",
                      c === 2 && "transition-colors duration-500 motion-reduce:transition-none",
                      c === 2 && (at >= 3 ? "bg-prism-yellow-50 text-prism-yellow-800" : ""),
                    )}
                  >
                    {cell}
                  </span>
                )),
              )}
            </div>
          </Panel>

          {/* 3 · Prisma Compute — the app is live */}
          <Panel on={at >= 4} className="flex h-full flex-col p-4">
            <Marker color="bg-prism-red-500" className="self-start">
              3 · Prisma Compute
            </Marker>
            <p className="mt-3 text-[0.8125rem] font-semibold leading-snug text-foreground">
              App live in production
            </p>
            <ul className="mb-3.5 mt-3 flex flex-col gap-2">
              {CHECKS.map((label, i) => (
                <li key={label} className={cn(MONO, "flex items-center gap-2 text-foreground")}>
                  <span className="truncate">{label}</span>
                  <CheckBold
                    className={cn(
                      "ml-auto size-3 shrink-0 text-prism-cyan-500 transition-opacity duration-300 motion-reduce:transition-none",
                      at >= 4 + i ? "opacity-100" : "opacity-0",
                    )}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-auto flex items-center gap-2 rounded-lg border border-border/80 bg-muted/40 px-2.5 py-2">
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full transition-colors duration-500",
                  at >= DONE - 1 ? "bg-prism-cyan-400" : "bg-border",
                )}
              />
              <span className={cn(MONO, "text-muted-foreground")}>https://</span>
              <Bar className="w-20" />
            </div>
          </Panel>
        </div>
      </div>
    </figure>
  );
}
