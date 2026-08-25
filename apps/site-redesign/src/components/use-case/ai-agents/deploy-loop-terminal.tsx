"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Check, XCircle } from "@/components/icons/forma";
import { cn } from "@/lib/utils";

// The build → deploy → debug → redeploy loop, running. Not a still and not a
// caption: the four stages light up in sequence, each streaming its own CLI
// lines, then it wraps back to the start — the loop the copy describes, shown
// as a loop. Commands and results are illustrative in the step-mocks idiom
// (real `prisma` verbs, skeleton results), not invented product copy.
//
// prefers-reduced-motion holds the finished state with every stage lit, so the
// picture still reads without any movement.

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "warn"; text: string }
  | { kind: "agent"; text: string };

const STAGES: { label: string; lines: Line[] }[] = [
  { label: "build", lines: [{ kind: "cmd", text: "prisma migrate deploy" }, { kind: "ok", text: "3 migrations applied" }] },
  { label: "deploy", lines: [{ kind: "cmd", text: "prisma deploy" }, { kind: "ok", text: "web · api · worker built" }, { kind: "ok", text: "health check — 200 OK" }] },
  { label: "debug", lines: [{ kind: "cmd", text: "prisma app logs" }, { kind: "warn", text: "TypeError in /api/checkout" }, { kind: "agent", text: "agent: patch applied" }] },
  { label: "redeploy", lines: [{ kind: "cmd", text: "prisma deploy" }, { kind: "ok", text: "redeployed to us-west-1" }] },
];

const STEP_MS = 1700;

function LogLine({ line, caret }: { line: Line; caret?: boolean }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-2"
    >
      {line.kind === "cmd" ? (
        <>
          <span className="text-prism-cyan-600">$</span>
          <span className="text-foreground">{line.text}</span>
        </>
      ) : line.kind === "ok" ? (
        <>
          <Check className="size-3 shrink-0 text-prism-cyan-500" strokeWidth={3} aria-hidden />
          <span className="text-muted-foreground">{line.text}</span>
        </>
      ) : line.kind === "warn" ? (
        <>
          <XCircle className="size-3 shrink-0 text-prism-red-500" aria-hidden />
          <span className="text-muted-foreground">{line.text}</span>
        </>
      ) : (
        <>
          <Bot className="size-3 shrink-0 text-foreground/60" aria-hidden />
          <span className="text-foreground/80">{line.text}</span>
        </>
      )}
      {caret ? (
        <span
          aria-hidden
          className="inline-block h-3 w-[0.4rem] shrink-0 animate-caret-blink bg-prism-cyan-400 motion-reduce:animate-none"
        />
      ) : null}
    </motion.p>
  );
}

export function DeployLoopTerminal({ label }: { label: string }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Under reduced motion the render shows every stage lit already, so there's
    // nothing to drive — leave `step` be and don't start the interval.
    if (reduce) return;
    const id = setInterval(() => setStep((s) => (s + 1) % STAGES.length), STEP_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // Accumulate lines through the current stage, so the log fills across a cycle
  // and clears when it wraps — the loop restarting.
  const shown = reduce ? STAGES : STAGES.slice(0, step + 1);
  const flat = shown.flatMap((s, si) => s.lines.map((line, li) => ({ line, si, li })));

  return (
    <div
      role="img"
      aria-label={label}
      className="relative overflow-hidden rounded-xl border border-border bg-card shadow-[0_12px_32px_-14px_rgba(21,21,21,0.2)]"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border/70 px-4 py-2.5">
        <span className="size-2 rounded-full bg-border" />
        <span className="size-2 rounded-full bg-border" />
        <span className="ml-1.5 font-mono text-xs text-foreground">agent — deploy loop</span>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-prism-cyan-100 px-2 py-0.5 text-[0.625rem] font-semibold text-prism-cyan-800">
          <span className="size-1.5 animate-status-pulse rounded-full bg-prism-cyan-400 motion-reduce:animate-none" />
          running
        </span>
      </div>

      {/* stage strip — the four loop stages, filling in sequence */}
      <div className="flex items-center gap-1.5 border-b border-border/60 px-4 py-3">
        {STAGES.map((s, i) => {
          const active = reduce || i <= step;
          return (
            <div key={s.label} className="flex flex-1 items-center gap-1.5">
              <span
                className={cn(
                  "flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[0.625rem] transition-colors duration-300",
                  active
                    ? "border-prism-cyan-200 bg-prism-cyan-50 text-prism-cyan-800"
                    : "border-border bg-muted/40 text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full transition-colors duration-300",
                    active ? "bg-prism-cyan-400" : "bg-border",
                  )}
                />
                {s.label}
              </span>
              {i < STAGES.length - 1 ? (
                <span aria-hidden className="h-px flex-1 overflow-hidden rounded-full bg-border/70">
                  <span
                    className={cn(
                      "block h-full origin-left bg-prism-cyan-300 transition-transform duration-500",
                      reduce || i < step ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* the log */}
      <div className="min-h-[10.5rem] px-4 py-3 font-mono text-[0.75rem] leading-none">
        <div className="flex flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {flat.map(({ line, si, li }) => (
              <LogLine
                key={`${si}-${li}`}
                line={line}
                caret={!reduce && si === step && li === STAGES[step].lines.length - 1}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
