import React from "react";
import { Img, staticFile } from "remotion";
import { INTER, SORA } from "../../theme";
import { LOOP_S, breathe, flare, orbit } from "./anim";

// Port of LoopDiagram from apps/site-redesign/src/components/sections/agent-loop.tsx:
// five verb chips on a hairline ring, the agent card at centre, and the
// spectrum comet circling the ring, flaring each chip as it passes.

const SPECTRUM = "linear-gradient(85deg, #01d7e4 0%, #f3c306 25%, #f37a03 50%, #f43531 74%, #f00e5c 100%)";
const COMET_HEAD = 50.4;

const STEPS = [
  { label: "Build", x: 50, y: 10, angle: 270 },
  { label: "Deploy", x: 88, y: 37.6, angle: 342 },
  { label: "Debug", x: 73.5, y: 82.4, angle: 54 },
  { label: "Fix", x: 26.5, y: 82.4, angle: 126 },
  { label: "Redeploy", x: 12, y: 37.6, angle: 198 },
];

const passDelay = (angle: number) => (((angle - COMET_HEAD + 360) % 360) / 360) * LOOP_S;

// The look-around WebP, decoded to frames (152 at 33ms); three plays per loop.
const ROBOT_FRAMES = 152;
const robotFrame = (t: number) => Math.floor(((t % LOOP_S) / (LOOP_S / 3)) * ROBOT_FRAMES) % ROBOT_FRAMES;

export const LoopDiagram: React.FC<{ t: number; size: number }> = ({ t, size }) => (
  <div style={{ position: "relative", width: size, height: size, fontFamily: INTER }}>
    <svg viewBox="0 0 400 400" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="loop-spectrum" gradientUnits="userSpaceOnUse" x1="360" y1="200" x2="302" y2="323">
          <stop offset="0%" stopColor="#01d7e4" />
          <stop offset="50%" stopColor="#f3c306" />
          <stop offset="100%" stopColor="#f34a60" />
        </linearGradient>
      </defs>
      <g stroke="rgba(58,59,60,0.15)" strokeWidth="1">
        {STEPS.map(({ label, x, y }) => (
          <line key={label} x1="200" y1="200" x2={x * 4} y2={y * 4} />
        ))}
        <circle cx="200" cy="200" r="160" />
      </g>
      <g transform={`rotate(${orbit(t)} 200 200)`}>
        <circle cx="200" cy="200" r="160" pathLength="100" strokeDasharray="14 86" strokeLinecap="round" stroke="url(#loop-spectrum)" strokeWidth="8" opacity="0.5" style={{ filter: "blur(5px)" }} />
        <circle cx="200" cy="200" r="160" pathLength="100" strokeDasharray="14 86" strokeLinecap="round" stroke="url(#loop-spectrum)" strokeWidth="3" />
      </g>
    </svg>

    {STEPS.map(({ label, x, y, angle }) => (
      <span key={label} style={{ position: "absolute", left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}>
        <span style={{ position: "absolute", inset: -4, borderRadius: 999, backgroundImage: SPECTRUM, filter: "blur(6px)", opacity: flare(t, passDelay(angle)) }} />
        <span
          style={{
            position: "relative",
            display: "block",
            borderRadius: 999,
            border: "1px solid #e5e5e5",
            background: "#fff",
            padding: "6px 14px",
            fontSize: 12,
            lineHeight: "16px",
            color: "#3a3b3c",
            whiteSpace: "nowrap",
            boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
          }}
        >
          {label}
        </span>
      </span>
    ))}

    {/* nudged below true centre so the card and the protruding head read as one block */}
    <div style={{ position: "absolute", left: "50%", top: "calc(50% + 32px)", transform: "translate(-50%, -50%)" }}>
      <div style={{ position: "absolute", inset: -6, borderRadius: 20, backgroundImage: SPECTRUM, filter: "blur(18px)", opacity: breathe(t) }} />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 18,
          border: "1px solid #e5e5e5",
          background: "#fff",
          padding: "56px 28px 24px",
          boxShadow: "0 16px 32px -12px rgba(21,21,21,0.12)",
        }}
      >
        <Img
          src={staticFile(`bento/home/robot-look/${String(robotFrame(t)).padStart(3, "0")}.webp`)}
          style={{ position: "absolute", top: -64, left: "50%", width: 112, transform: "translateX(-50%)", filter: "drop-shadow(0 10px 16px rgba(21,21,21,0.18))" }}
        />
        <p style={{ margin: 0, fontFamily: SORA, fontSize: 18, lineHeight: 1, color: "#3a3b3c", whiteSpace: "nowrap" }}>Your agent</p>
        <code style={{ marginTop: 10, borderRadius: 8, border: "1px solid rgba(229,229,229,0.7)", background: "rgba(245,245,245,0.6)", padding: "4px 8px", fontFamily: INTER, fontSize: 10, lineHeight: 1, color: "#646567", whiteSpace: "nowrap" }}>
          one CLI + API
        </code>
      </div>
    </div>
  </div>
);
