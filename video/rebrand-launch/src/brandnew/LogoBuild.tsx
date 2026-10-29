import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { GLIDE, RISE, clamp, ease } from "../components/motion";
import { C } from "../theme";

// The mark in its own 263x264 units (components/Marks.tsx).
const BANDS = [
  { d: "M57.3357 92.5003L0 149.939V53.5L53.2105 0.10425V0H149.524L57.3357 92.5003Z", fill: C.markCyan, a: 53.3, b: 149.9 },
  { d: "M263 91.7452L91.0537 264H0V172.229L171.92 0H263V91.7452Z", fill: C.markRed, a: 172.2, b: 354.8 },
  { d: "M209.686 264H113.373L156.453 220.773L263.001 114.034V210.5L209.686 264Z", fill: C.markYellow, a: 377.2, b: 473.9 },
];
const SQUARE = "M0 0H263V264H0Z";
const FAR = 900;

// The wordmark's letters, as horizontal spans of logo/full-color.svg (from
// the Figma lockup's vectors), so each can arrive on its own.
const LETTERS = [
  [33.72, 44.54],
  [46.21, 52.06],
  [53.12, 56.79],
  [57.93, 67.3],
  [69.1, 86.52],
  [88.32, 100],
];

export const LOGO_BUILD_FRAMES = 480;

// Logo build, 8s at 60fps on paper:
// 0-1s      the square draws in, hairline
// 0.6-2.4s  six 45deg beams shoot through it, each in the colour of the band
//           it bounds, alternating direction, and lock in with a flash
// 2.3-3.8s  each band grows out from its centre line to its two beams:
//           light turning solid
// 3.6-4.4s  the beams and the square burn off, the mark glides into the lockup
// 5-6.2s    the letters rise into place one after another, each from behind
//           its own baseline
// 6.2-8s    holds
const DRAW = [0, 60];
const BEAMS = 36; // + 16 per beam, 22 long
const FORM = 140; // + 22 per band, 52 long
const BURN = [216, 262];
const SETTLE = [252, 314];
const LETTERS_IN = 300; // + 6 per letter, 38 long

export const LogoBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);

  const big = 460 * u;
  const lockW = 1100 * u;
  const finalMark = lockW * (67 / 264);
  const settle = ease(frame, SETTLE[0], SETTLE[1], [0, 1], GLIDE);
  const markSize = big + (finalMark - big) * settle;
  const markX = (width - big) / 2 + ((width - lockW) / 2 - (width - big) / 2) * settle;
  const markY = (height - big) / 2 + ((height - finalMark) / 2 - (height - big) / 2) * settle;
  const s = markSize / 263;

  const square = ease(frame, DRAW[0], DRAW[1], [0, 1], GLIDE);
  const burn = ease(frame, BURN[0], BURN[1], [0, 1], GLIDE);
  const hair = (1.25 * u) / s;

  // One beam per band edge, coloured by its band; odd ones come the other way.
  const beams = BANDS.flatMap((b, bi) => [b.a, b.b].map((c, j) => ({ c, fill: b.fill, i: bi * 2 + j })));
  const beam = (i: number) => ease(frame, BEAMS + i * 16, BEAMS + i * 16 + 22, [0, 1], RISE);
  const lock = (i: number) => interpolate(frame, [BEAMS + i * 16 + 18, BEAMS + i * 16 + 24, BEAMS + i * 16 + 60], [0, 1, 0], clamp);
  const form = (i: number) => ease(frame, FORM + i * 22, FORM + i * 22 + 52, [0, 1], GLIDE);

  const wordLeft = (width - lockW) / 2;
  const wordTop = (height - finalMark) / 2;

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <svg width={markSize} height={markSize * (264 / 263)} viewBox="0 0 263 264" style={{ position: "absolute", left: markX, top: markY, overflow: "visible" }}>
        <defs>
          <clipPath id="lb-square">
            <path d={SQUARE} />
          </clipPath>
          <filter id="lb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={4 / Math.max(s, 0.1)} />
          </filter>
        </defs>

        {/* The square, hairline. */}
        <rect x={0} y={0} width={263} height={264} fill="none" stroke="rgba(21,21,21,0.4)" strokeWidth={hair} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - square} opacity={1 - burn} />

        {/* Bands grow out from their centre line to the beams, inside the square. */}
        <g clipPath="url(#lb-square)">
          {BANDS.map((b, i) => {
            const mid = (b.a + b.b) / 2;
            const half = ((b.b - b.a) / 2) * form(i);
            const a = mid - half;
            const z = mid + half;
            return (
              <g key={b.fill} opacity={form(i) > 0 ? 1 : 0}>
                <path d={`M${a + FAR},${-FAR} L${z + FAR},${-FAR} L${z - FAR},${FAR} L${a - FAR},${FAR} Z`} fill={b.fill} />
              </g>
            );
          })}
        </g>
        {/* Then the mark's own outline takes over (it has the chamfers). */}
        {BANDS.map((b, i) => (
          <path key={`m-${b.fill}`} d={b.d} fill={b.fill} opacity={form(i) >= 1 ? 1 : 0} />
        ))}

        {/* The beams: thin light on x + y = c, shooting in along the diagonal. */}
        <g opacity={1 - burn}>
          {beams.map(({ c, fill, i }) => {
            const p = beam(i);
            if (p <= 0) return null;
            const from = i % 2 === 0 ? 1 : -1;
            // Head runs from far off one end to far off the other.
            const head = from * FAR * (1 - 2 * p);
            const tail = from * FAR;
            const x1 = c / 2 + tail;
            const y1 = c / 2 - tail;
            const x2 = c / 2 + head;
            const y2 = c / 2 - head;
            const glow = lock(i);
            return (
              <g key={c}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={fill} strokeWidth={hair * (3 + glow * 6)} opacity={0.35 + glow * 0.4} filter="url(#lb-glow)" />
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={fill} strokeWidth={hair * 1.6} />
              </g>
            );
          })}
        </g>
      </svg>

      {/* The wordmark, letter by letter, each rising from behind its baseline. */}
      {LETTERS.map(([l, r], i) => {
        const t = ease(frame, LETTERS_IN + i * 6, LETTERS_IN + i * 6 + 38, [0, 1], RISE);
        return (
          <div
            key={l}
            style={{
              position: "absolute",
              left: wordLeft,
              top: wordTop,
              width: lockW,
              height: finalMark,
              // Clipped at the baseline (the bottom of the lockup box) and the letter's own sides.
              clipPath: `inset(-30% ${100 - r - 0.3}% 0% ${l - 0.3}%)`,
            }}
          >
            <Img src={staticFile("logo/full-color.svg")} style={{ width: lockW, height: finalMark, transform: `translateY(${(1 - t) * 100}%)` }} />
          </div>
        );
      })}

    </AbsoluteFill>
  );
};
