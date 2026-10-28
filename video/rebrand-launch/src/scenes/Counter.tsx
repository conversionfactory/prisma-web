import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Ink } from "../components/Ground";
import { DotMatrix } from "../components/DotMatrix";
import { Glint } from "../components/Glint";
import { MaskLine, TYPE } from "../components/Type";
import { useLayout } from "../components/layout";
import { clamp, ease, line, punch } from "../components/motion";
import { PrismaticBurst } from "../site/PrismaticBurst";
import { BAR, BEAT, SORA, SPECTRUM } from "../theme";

const TARGET = 1_000_000;
const LAND = BAR;
// Copy from the "1,000,000 products" stat loop, verbatim.
const LINE = "will be built on a stack that works as one.".split(" ");

const toCells = (value: number) => {
  const digits = String(Math.floor(value)).padStart(7, "0");
  const leading = 7 - String(Math.floor(value)).length;
  const cells: { ch: string; lit: number }[] = [];
  digits.split("").forEach((d, i) => {
    cells.push({ ch: d, lit: i < leading ? 0 : 1 });
    if (i === 0 || i === 3) cells.push({ ch: ",", lit: i < leading ? 0 : 1 });
  });
  return cells;
};

// Bars 11-13: the stat loop at full scale, hard cut onto Ink. The count
// runs for a bar and lands on the downbeat of bar 12; the light flares at
// the edges of the frame only, so the type always sits on clean Ink.
export const Counter: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, cx, cy, u } = useLayout();

  const progress = interpolate(frame, [0, LAND], [0, 1], { ...clamp, easing: Easing.out(Easing.exp) });
  const value = frame >= LAND ? TARGET : Math.min(TARGET - 1, progress * TARGET);
  const flare = punch(frame, [LAND], 60);
  const push = interpolate(frame, [0, BAR * 3], [0.97, 1.04], clamp);
  const sweep = ease(frame, LAND, LAND + 34, [-0.3, 1.3]);

  // Edge light: transparent centre, so nothing glows under the copy.
  const edgeMask = "radial-gradient(ellipse 62% 58% at center, transparent 45%, #000 100%)";
  const dot = 25 * u;
  const block = { top: cy - 290 * u };

  return (
    <Ink>
      <AbsoluteFill style={{ mixBlendMode: "screen", maskImage: edgeMask, WebkitMaskImage: edgeMask, opacity: 0.25 + flare * 0.75 }}>
        <PrismaticBurst width={width} height={height} intensity={1.2 + flare * 2.2} speed={0.6} distort={1.2} seed={8} />
      </AbsoluteFill>

      <AbsoluteFill style={{ transform: `scale(${push * (1 + flare * 0.02)})` }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: block.top, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <MaskLine p={line(frame, 0, Infinity, 24)}>
            <div style={{ fontFamily: SORA, fontWeight: 400, fontSize: TYPE.lead * u, color: "rgba(255,255,255,0.78)" }}>The next</div>
          </MaskLine>
          <div style={{ position: "relative", marginTop: 44 * u }}>
            <DotMatrix cells={toCells(value)} dot={dot} gap={9 * u} glyphGap={30 * u} flare={flare} />
            {/* A pass of spectrum light across the lit dots on the landing. */}
            <div
              style={{
                position: "absolute",
                top: -40 * u,
                bottom: -40 * u,
                left: `${sweep * 100}%`,
                width: 260 * u,
                marginLeft: -130 * u,
                backgroundImage: SPECTRUM(90),
                filter: `blur(${40 * u}px)`,
                mixBlendMode: "screen",
                opacity: frame >= LAND ? 0.55 : 0,
              }}
            />
          </div>
          <div style={{ marginTop: 52 * u }}>
            <MaskLine p={line(frame, LAND + BEAT, Infinity, 30)}>
              <div style={{ fontFamily: SORA, fontWeight: 500, fontSize: 104 * u, lineHeight: 1.1, color: "#fff" }}>products</div>
            </MaskLine>
          </div>
          <div style={{ display: "flex", gap: 0.28 * TYPE.lead * u, marginTop: 22 * u }}>
            {LINE.map((w, i) => (
              <MaskLine key={i} p={line(frame, LAND + BEAT * 2 + i * 5, Infinity, 22)}>
                <span style={{ display: "inline-block", fontFamily: SORA, fontWeight: 400, fontSize: TYPE.lead * u, color: "rgba(255,255,255,0.78)" }}>{w}</span>
              </MaskLine>
            ))}
          </div>
        </div>
      </AbsoluteFill>
      <Glint x={cx - 690 * u} y={block.top + 130 * u} size={150 * u} intensity={interpolate(frame, [LAND, LAND + 5, LAND + 44], [0, 1, 0], clamp)} rotate={frame * 0.6} />
      <Glint x={cx + 700 * u} y={block.top + 250 * u} size={90 * u} intensity={interpolate(frame, [LAND + 12, LAND + 17, LAND + 54], [0, 1, 0], clamp)} />
    </Ink>
  );
};
