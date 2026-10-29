import React from "react";
import { AbsoluteFill, Img, Still, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { MaskLine } from "../components/Type";
import { GLIDE, clamp, ease, line } from "../components/motion";
import { C, SORA } from "../theme";

// "Go dream": six surreal scenes in the brand's photographic world (Flora,
// GPT Image 2.5), each carrying one of the campaign lines on open sky,
// never over the light. Lines are the client's, from the Loom review.
const STOP = ["Stop worrying about", "your database.", "Go dream."];
const BUILD = ["It's time to go", "dream and build."];
const GO = ["Go dream."];

// x/y place the headline block (its lockup sits under it, also on sky).
export const DREAMS: { src: string; lines: readonly string[]; x: number; y: number; right?: boolean }[] = [
  { src: "city", lines: STOP, x: 0.06, y: 0.09 },
  { src: "door", lines: BUILD, x: 0.06, y: 0.09 },
  { src: "saltflat", lines: GO, x: 0.06, y: 0.12 },
  { src: "bed", lines: GO, x: 0.06, y: 0.12 },
  { src: "island", lines: BUILD, x: 0.06, y: 0.09, right: true },
  { src: "stairs", lines: STOP, x: 0.06, y: 0.09 },
];

const Scene: React.FC<{ index: number; t: number; push?: number }> = ({ index, t, push = 1 }) => {
  const { width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);
  const d = DREAMS[index];
  const size = (d.lines.length === 1 ? 120 : 84) * u;
  return (
    <AbsoluteFill>
      <Img src={staticFile(`brandnew/dream/${d.src}.jpg`)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${push})` }} />
      <div
        style={{
          position: "absolute",
          top: d.y * height,
          ...(d.right ? { right: d.x * width, alignItems: "flex-end", textAlign: "right" } : { left: d.x * width, alignItems: "flex-start" }),
          display: "flex",
          flexDirection: "column",
          fontFamily: SORA,
          fontWeight: 400,
          fontSize: size,
          lineHeight: 1.06,
          letterSpacing: "-0.02em",
          color: C.ink,
        }}
      >
        {d.lines.map((l, i) => (
          <MaskLine key={l} p={line(t, 6 + i * 7, Infinity, 30)}>
            <div style={{ whiteSpace: "nowrap" }}>{l}</div>
          </MaskLine>
        ))}
        <Img src={staticFile("logo/full-color.svg")} style={{ marginTop: 36 * u, width: 190 * u, height: 190 * u * (67 / 264), opacity: interpolate(t, [24, 48], [0, 1], clamp) }} />
      </div>
    </AbsoluteFill>
  );
};

// Stills for the case study, lines fully set.
export const DreamStills: React.FC = () => (
  <>
    {DREAMS.map((d, i) => (
      <Still key={d.src} id={`DR-${i + 1}-${d.src}`} component={() => <Scene index={i} t={1000} />} width={2000} height={1125} />
    ))}
  </>
);

// The film: each scene holds 2.5s with a slow push, lines rising in, and a
// soft cross-dissolve into the next.
const HOLD = 150;
const MIX = 24;
export const DREAM_FRAMES = HOLD * DREAMS.length + MIX;

export const DreamFilm: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      {DREAMS.map((_, i) => {
        const start = i * HOLD;
        const local = frame - start;
        if (local < -MIX || local > HOLD + MIX) return null;
        const inn = i === 0 ? 1 : ease(frame, start - MIX, start, [0, 1], GLIDE);
        const push = interpolate(local, [-MIX, HOLD + MIX], [1.0, 1.06], clamp);
        return (
          <AbsoluteFill key={i} style={{ opacity: inn }}>
            <Scene index={i} t={local} push={push} />
          </AbsoluteFill>
        );
      })}
    </AbsoluteFill>
  );
};
