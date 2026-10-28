import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Lockup } from "../components/Marks";
import { GLIDE, LEAVE, clamp, ease, punch, rise } from "../components/motion";
import { PROMPT, PromptCard } from "../scenes/Prompt";
import { SpectralBottom, Texture } from "../site/Surfaces";
import { C, INTER, SORA } from "../theme";

// From prompt to product, told with a person: the M-07 prompt typed by a
// yoga studio owner, then the console's own states (console-illustration.tsx,
// verbatim) rising over the open wall of her studio.

export const STORY_FRAMES = 780;
const TYPE = [80, 210];
const SEND = 236;
const CONSOLE = 268;
const DEPLOY = 372;
const CMD = "bunx @prisma/cli app deploy";
const END = 600;

const Card: React.FC<{ u: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ u, children, style }) => (
  <div
    style={{
      background: C.white,
      borderRadius: 22 * u,
      border: `${1.5 * u}px solid ${C.border}`,
      boxShadow: `0 ${30 * u}px ${70 * u}px -${30 * u}px rgba(40,30,20,0.4)`,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Story: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);
  const t = frame / fps;

  const push = interpolate(frame, [0, END], [1.1, 1], clamp);
  const photoIn = ease(frame, 0, 40, [0, 1]);
  const chars = Math.floor(interpolate(frame, TYPE, [0, PROMPT.length], clamp));
  const press = punch(frame, [SEND], 16);
  const cmdChars = Math.floor(interpolate(frame, [DEPLOY + 30, DEPLOY + 100], [0, CMD.length], clamp));
  const pulse = 0.55 + 0.45 * Math.sin(t * 5);
  const caret = Math.floor(frame / 16) % 2 === 0;
  const outUI = ease(frame, END - 30, END, [0, 1], LEAVE);
  const end = ease(frame, END, END + 50, [0, 1], GLIDE);

  // The UI column sits on the open wall, right of her.
  const k = 0.62;
  const colX = 1060 * u;
  const colW = 1160 * k * u;

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <AbsoluteFill style={{ opacity: photoIn }}>
        <Img src={staticFile("brandnew/yoga.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${push})`, transformOrigin: "30% 60%" }} />
      </AbsoluteFill>

      <AbsoluteFill style={{ opacity: 1 - outUI }}>
        <div style={{ position: "absolute", left: colX, top: 250 * u, width: colW, ...rise(frame, 50, u, 40, 36) }}>
          <div style={{ transform: `scale(${k})`, transformOrigin: "0 0", width: 1160 * u }}>
            <PromptCard u={u} t={t} text={PROMPT.slice(0, chars)} cursor={frame < TYPE[1] || caret} ring={ease(frame, 60, 90, [0, 1])} press={press} glow={ease(frame, SEND, SEND + 20, [0, 1])} />
          </div>
        </div>

        <div style={{ position: "absolute", left: colX, top: 360 * u, width: colW, ...rise(frame, CONSOLE, u, 50, 36) }}>
          <Card u={u} style={{ padding: `${34 * u}px ${36 * u}px`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 17 * u, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00a6b4" }}>Get started</span>
            <span style={{ marginTop: 12 * u, fontFamily: SORA, fontSize: 30 * u, color: C.ink }}>How would you like to start?</span>
            <span style={{ marginTop: 12 * u, display: "flex", alignItems: "center", gap: 10 * u, fontFamily: INTER, fontSize: 20 * u, color: C.muted }}>
              <span style={{ width: 10 * u, height: 10 * u, borderRadius: 99, background: C.cyan400, opacity: pulse }} />
              Primary database ready in us-west-1
            </span>

            <div style={{ width: "100%", maxHeight: ease(frame, DEPLOY - 6, DEPLOY + 30, [0, 260], GLIDE) * u, overflow: "hidden" }}>
            <div style={{ marginTop: 26 * u, width: "100%", textAlign: "left", ...rise(frame, DEPLOY, u, 30, 30) }}>
              <div style={{ borderRadius: 14 * u, border: `${1.5 * u}px solid ${C.border}`, padding: `${20 * u}px ${22 * u}px` }}>
                <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 21 * u, color: C.ink }}>Deploy with your agent</span>
                <div style={{ marginTop: 14 * u, display: "flex", flexDirection: "column", gap: 8 * u }}>
                  <span style={{ height: 6 * u, width: "100%", borderRadius: 99, background: "rgba(21,21,21,0.07)" }} />
                  <span style={{ height: 6 * u, width: "66%", borderRadius: 99, background: "rgba(21,21,21,0.07)" }} />
                </div>
                <div style={{ marginTop: 18 * u, display: "flex", alignItems: "center", gap: 12 * u, borderRadius: 10 * u, background: C.ink, padding: `${14 * u}px ${18 * u}px`, fontFamily: INTER, fontSize: 20 * u, color: "rgba(255,255,255,0.9)", whiteSpace: "pre" }}>
                  <span style={{ color: C.cyan400 }}>$</span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    {CMD.slice(0, cmdChars)}
                    <span style={{ marginLeft: 4 * u, width: 9 * u, height: 22 * u, background: C.cyan400, opacity: cmdChars < CMD.length || caret ? 1 : 0 }} />
                  </span>
                </div>
              </div>
            </div>
            </div>
          </Card>
        </div>
      </AbsoluteFill>

      {/* Lifts onto paper and the end line. */}
      <AbsoluteFill style={{ opacity: end, backgroundColor: C.paper }}>
        <SpectralBottom u={u} t={t} rise={end} />
        <Texture opacity={0.04} />
        <div style={{ position: "absolute", left: 0, right: 0, top: height / 2 - 150 * u, display: "flex", flexDirection: "column", alignItems: "center", ...rise(frame, END + 10, u, 40, 40) }}>
          <div style={{ position: "relative", width: 300 * u, height: 76 * u }}>
            <Lockup x={0} y={38 * u} width={300 * u} />
          </div>
          <div style={{ marginTop: 50 * u, fontFamily: SORA, fontWeight: 500, fontSize: 132 * u, color: C.ink, whiteSpace: "nowrap" }}>From prompt to product.</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
