import React from "react";
import { INTER, SORA } from "../../theme";
import { caretOn, rocketBob, shimmer, statusPulse } from "./anim";
import { AppWindow, Bot, ChevronRight, ChevronsUpDown, Copy, Database, GitBranch, Github, Layers, LayoutGrid, Plus, Rocket, Search, Settings } from "./icons";

// Port of apps/site-redesign/src/components/sections/console-illustration.tsx
// at its desktop (md+) layout, 896px wide. Tailwind classes are spelled out
// in px; the CSS animations run off `t` (seconds) instead of the clock.

const FG = "#3a3b3c";
const MUTED_FG = "#646567";
const BORDER = "#e5e5e5";
const border = (a: number) => `rgba(229,229,229,${a})`;
const fg = (a: number) => `rgba(58,59,60,${a})`;
const mutedFg = (a: number) => `rgba(100,101,103,${a})`;
const PRIMARY = "#151515";
const PAPER = "#f9faf5";
const CYAN_100 = "#dcfdff";
const CYAN_400 = "#01d7e4";
const CYAN_600 = "#009aaa";

const Bar: React.FC<{ t: number; w: number | string; h?: number; tone?: number }> = ({ t, w, h = 6, tone = 0.1 }) => (
  <span style={{ position: "relative", display: "block", width: w, height: h, overflow: "hidden", borderRadius: 999, background: fg(tone), flexShrink: 0 }}>
    <span style={{ position: "absolute", inset: 0, transform: `translateX(${shimmer(t)}%)`, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.7),transparent)" }} />
  </span>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span style={{ fontSize: 9, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: mutedFg(0.7) }}>{children}</span>
);

const Dot: React.FC<{ t: number }> = ({ t }) => <span style={{ width: 6, height: 6, borderRadius: 999, background: CYAN_400, flexShrink: 0, ...statusPulse(t) }} />;

const NAV = [
  { Icon: LayoutGrid, bar: 64, active: true },
  { Icon: GitBranch, bar: 32, active: false },
  { Icon: Layers, bar: 80, active: false },
  { Icon: Settings, bar: 48, active: false },
];

const row: React.CSSProperties = { display: "flex", alignItems: "center" };

export const ConsoleIllustration: React.FC<{ t: number }> = ({ t }) => (
  <div style={{ width: 896, textAlign: "left", fontFamily: INTER, color: FG }}>
    <div
      style={{
        overflow: "hidden",
        borderRadius: 18,
        border: `1px solid ${BORDER}`,
        background: "#fff",
        boxShadow: "0 1px 2px rgba(21,21,21,0.04), 0 8px 16px -4px rgba(21,21,21,0.06), 0 32px 64px -16px rgba(21,21,21,0.14)",
      }}
    >
      {/* window chrome */}
      <div style={{ ...row, borderBottom: `1px solid ${border(0.7)}`, padding: "10px 16px" }}>
        <div style={{ display: "flex", width: 64, gap: 6 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 10, height: 10, borderRadius: 999, background: BORDER }} />
          ))}
        </div>
        <span style={{ margin: "0 auto", borderRadius: 999, border: `1px solid ${border(0.7)}`, background: "#fff", padding: "4px 12px", fontSize: 10, lineHeight: 1, color: MUTED_FG }}>console.prisma.io</span>
        <span style={{ width: 64 }} />
      </div>

      <div style={{ display: "flex" }}>
        {/* sidebar */}
        <aside style={{ display: "flex", flexDirection: "column", width: 208, flexShrink: 0, borderRight: `1px solid ${border(0.7)}`, background: "rgba(245,245,245,0.5)", padding: "16px 12px 12px" }}>
          <div style={{ ...row, gap: 8, padding: "0 6px" }}>
            <span style={{ width: 16, height: 16, borderRadius: 4, background: `conic-gradient(from 220deg, ${CYAN_400}, #f3c306, #f34a60, ${CYAN_400})` }} />
            <Bar t={t} w={56} tone={0.2} />
            <span style={{ height: 12, width: 28, borderRadius: 6, background: CYAN_100 }} />
            <ChevronsUpDown size={12} color={mutedFg(0.6)} style={{ marginLeft: "auto" }} />
          </div>

          <nav style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 2 }}>
            {NAV.map(({ Icon, bar, active }, i) => (
              <span key={i} style={{ ...row, gap: 8, borderRadius: 8, padding: "8px 6px", background: active ? "#f5f5f5" : undefined }}>
                <Icon size={14} color={active ? FG : MUTED_FG} />
                <Bar t={t} w={bar} tone={active ? 0.25 : 0.1} />
              </span>
            ))}
          </nav>

          <div style={{ ...row, gap: 8, marginTop: 20, padding: "0 6px" }}>
            <SectionLabel>Branch</SectionLabel>
            <span style={{ ...row, gap: 6, borderRadius: 8, border: `1px solid ${border(0.8)}`, background: "#fff", padding: "4px 6px" }}>
              <GitBranch size={10} color={MUTED_FG} />
              <Bar t={t} w={28} />
              <ChevronsUpDown size={10} color={mutedFg(0.6)} />
            </span>
          </div>

          <div style={{ ...row, justifyContent: "space-between", marginTop: 16, padding: "0 6px" }}>
            <SectionLabel>Apps</SectionLabel>
            <Plus size={12} color={mutedFg(0.6)} />
          </div>
          <span style={{ ...row, gap: 8, marginTop: 4, borderRadius: 8, padding: "4px 6px", fontSize: 11, color: MUTED_FG }}>
            <AppWindow size={14} />
            storefront
          </span>

          <div style={{ ...row, justifyContent: "space-between", marginTop: 12, padding: "0 6px" }}>
            <SectionLabel>Databases</SectionLabel>
            <Plus size={12} color={mutedFg(0.6)} />
          </div>
          <span style={{ ...row, gap: 8, marginTop: 4, borderRadius: 8, padding: "4px 6px", fontSize: 11, color: MUTED_FG }}>
            <Database size={14} />
            Primary database
            <span style={{ marginLeft: "auto", display: "flex" }}>
              <Dot t={t} />
            </span>
          </span>

          <div style={{ ...row, gap: 8, marginTop: "auto", borderTop: `1px solid ${border(0.7)}`, padding: "12px 6px 0" }}>
            <span style={{ width: 20, height: 20, borderRadius: 999, background: "rgba(21,21,21,0.8)" }} />
            <Bar t={t} w={80} h={4} />
          </div>
        </aside>

        {/* main */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
          <div style={{ ...row, justifyContent: "space-between", borderBottom: `1px solid ${border(0.7)}`, padding: "10px 16px" }}>
            <span style={{ ...row, gap: 6 }}>
              <Bar t={t} w={40} />
              <ChevronRight size={10} color={mutedFg(0.5)} />
              <Bar t={t} w={56} tone={0.2} />
            </span>
            <span style={{ ...row, gap: 6, borderRadius: 8, border: `1px solid ${border(0.8)}`, padding: "6px 8px" }}>
              <Search size={10} color={mutedFg(0.7)} />
              <Bar t={t} w={40} h={4} />
            </span>
          </div>

          <div style={{ margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 384, padding: "36px 16px", textAlign: "center" }}>
            <span style={{ ...row, gap: 6, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.14em", color: CYAN_600 }}>
              <Rocket size={12} style={{ transformOrigin: "center", transform: rocketBob(t) }} />
              Get started
            </span>
            <span style={{ marginTop: 8, fontFamily: SORA, fontSize: 15, color: FG }}>How would you like to start?</span>
            <span style={{ ...row, gap: 6, marginTop: 6, fontSize: 11, color: MUTED_FG }}>
              <Dot t={t} />
              Primary database ready in us-west-1
            </span>

            <div style={{ marginTop: 20, width: "100%", borderRadius: 10, border: `1px solid ${border(0.8)}`, background: "#fff", padding: 14, textAlign: "left" }}>
              <div style={{ ...row, justifyContent: "space-between" }}>
                <span style={{ ...row, gap: 6, fontSize: 12, fontWeight: 600 }}>
                  <Github size={14} />
                  Connect a GitHub repo
                </span>
                <span style={{ height: 12, width: 56, borderRadius: 6, background: CYAN_100 }} />
              </div>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                <Bar t={t} w="100%" h={4} />
                <Bar t={t} w="75%" h={4} />
              </div>
              <span style={{ ...row, justifyContent: "center", gap: 6, marginTop: 12, height: 28, borderRadius: 8, background: PRIMARY, fontSize: 11, fontWeight: 600, color: PAPER }}>
                <Github size={12} />
                Install Prisma on GitHub
              </span>
            </div>

            <div style={{ ...row, gap: 12, margin: "12px 0", width: "100%", fontSize: 10, color: mutedFg(0.6) }}>
              <span style={{ height: 1, flex: 1, background: border(0.7) }} />
              or
              <span style={{ height: 1, flex: 1, background: border(0.7) }} />
            </div>

            <div style={{ width: "100%", borderRadius: 10, border: `1px solid ${border(0.8)}`, background: "#fff", padding: 14, textAlign: "left" }}>
              <span style={{ ...row, gap: 6, fontSize: 12, fontWeight: 600 }}>
                <Bot size={14} />
                Deploy with your agent
              </span>
              <div style={{ marginTop: 10, display: "flex", flexDirection: "column", gap: 6 }}>
                <Bar t={t} w="100%" h={4} />
                <Bar t={t} w="66.67%" h={4} />
              </div>
              <span style={{ ...row, gap: 8, marginTop: 12, borderRadius: 8, background: PRIMARY, padding: "8px 12px", fontSize: 11, color: "rgba(249,250,245,0.9)" }}>
                <span style={{ color: CYAN_400 }}>$</span>
                <span style={{ ...row, minWidth: 0 }}>
                  bunx @prisma/cli app deploy
                  <span style={{ marginLeft: 4, display: "inline-block", height: 12, width: 6.4, flexShrink: 0, background: CYAN_400, opacity: caretOn(t) ? 1 : 0 }} />
                </span>
                <Copy size={12} color="rgba(249,250,245,0.5)" style={{ marginLeft: "auto" }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
