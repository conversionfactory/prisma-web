import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Glint } from "../components/Glint";
import { GLIDE, LEAVE, clamp, ease } from "../components/motion";
import { Texture } from "../site/Surfaces";
import { C } from "../theme";

// The mark in its own 263x264 units (components/Marks.tsx).
const BANDS = [
  { d: "M57.3357 92.5003L0 149.939V53.5L53.2105 0.10425V0H149.524L57.3357 92.5003Z", fill: C.markCyan },
  { d: "M263 91.7452L91.0537 264H0V172.229L171.92 0H263V91.7452Z", fill: C.markRed },
  { d: "M209.686 264H113.373L156.453 220.773L263.001 114.034V210.5L209.686 264Z", fill: C.markYellow },
];
// Every edge of the mark that isn't the square sits on a 45deg line x + y = k:
// the two chamfers and both sides of both gaps.
const DIAGONALS = [53.3, 149.9, 172.2, 354.8, 377.2, 473.9];

export const LOGO_BUILD_FRAMES = 600;

// Logo build, 10s at 60fps on paper:
// 0-1.5s   the square and its six 45deg construction lines draw in
// 1.5-3s   the three bands trace along the lines
// 3-4.5s   light sweeps the diagonal and floods each band with its colour
// 4.5-6s   construction falls away, the mark settles, the wordmark slides out
// 6-10s    lockup holds with a glint, then breathes out
export const LogoBuild: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);

  // Mark geometry on screen.
  const big = 520 * u;
  const k = big / 263;
  const settle = ease(frame, 270, 330, [0, 1], GLIDE);
  const lockW = 1100 * u;
  const finalMark = lockW * (67 / 264);
  const markSize = big + (finalMark - big) * settle;
  const markX = (width - big) / 2 + ((width - lockW) / 2 - (width - big) / 2) * settle;
  const markY = (height - big) / 2 + ((height - finalMark) / 2 - (height - big) / 2) * settle;
  const s = markSize / 263;

  const grid = ease(frame, 0, 60, [0, 1]);
  const lines = (i: number) => ease(frame, 10 + i * 7, 70 + i * 7, [0, 1], GLIDE);
  const trace = (i: number) => ease(frame, 90 + i * 14, 170 + i * 14, [0, 1], GLIDE);
  const flood = (i: number) => ease(frame, 190 + i * 12, 236 + i * 12, [0, 1]);
  const sweep = ease(frame, 180, 250, [-0.4, 1.4]);
  const construct = 1 - ease(frame, 250, 300, [0, 1]);
  const word = ease(frame, 300, 350, [0, 1]);
  const pop = spring({ frame: frame - 236, fps, config: { damping: 12, stiffness: 160 } });
  const out = ease(frame, LOGO_BUILD_FRAMES - 30, LOGO_BUILD_FRAMES, [0, 1], LEAVE);

  const hair = 1.2 / s;
  const ink = "rgba(21,21,21,0.5)";
  const guide = "rgba(21,21,21,0.12)";

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <Texture opacity={0.05} />

      {/* Fine background grid. */}
      <AbsoluteFill
        style={{
          opacity: grid * construct * 0.9,
          backgroundImage: `linear-gradient(${guide} 1px, transparent 1px), linear-gradient(90deg, ${guide} 1px, transparent 1px)`,
          backgroundSize: `${(263 / 8) * k}px ${(263 / 8) * k}px`,
          backgroundPosition: `${(width - big) / 2}px ${(height - big) / 2}px`,
          maskImage: "radial-gradient(circle at center, #000 20%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at center, #000 20%, transparent 62%)",
        }}
      />

      <AbsoluteFill style={{ opacity: 1 - out, transform: `scale(${1 + out * 0.03})` }}>
        <svg
          width={markSize}
          height={markSize * (264 / 263)}
          viewBox="0 0 263 264"
          style={{ position: "absolute", left: markX, top: markY, overflow: "visible", transform: `scale(${1 + (pop - 1) * 0.04})`, transformOrigin: "50% 50%" }}
        >
          <defs>
            <linearGradient id="lb-sweep" gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={263} y2={264}>
              <stop offset={Math.max(0, sweep - 0.18)} stopColor="#fff" stopOpacity={0} />
              <stop offset={Math.min(1, Math.max(0, sweep))} stopColor="#fff" stopOpacity={0.95} />
              <stop offset={Math.min(1, sweep + 0.18)} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Construction: the square and the 45deg lines. */}
          <g opacity={construct}>
            <rect x={0} y={0} width={263} height={264} fill="none" stroke={ink} strokeWidth={hair} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - lines(0)} />
            {DIAGONALS.map((c, i) => {
              const p = lines(i + 1);
              // Line x + y = c, extended 40 units past the square each way.
              const x1 = Math.min(263, c) + 40;
              const y1 = c - Math.min(263, c) - 40;
              const x2 = Math.max(0, c - 264) - 40;
              const y2 = c - Math.max(0, c - 264) + 40;
              return <line key={c} x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={ink} strokeWidth={hair} strokeDasharray={`${12 / s} ${12 / s}`} />;
            })}
          </g>

          {BANDS.map((b, i) => (
            <g key={b.fill}>
              <path d={b.d} fill={b.fill} opacity={flood(i)} />
              <path d={b.d} fill="none" stroke={C.ink} strokeWidth={hair * 1.6} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - trace(i)} opacity={construct} />
            </g>
          ))}
          {/* The light pass that fills the bands. */}
          {sweep > -0.3 && sweep < 1.3
            ? BANDS.map((b) => <path key={`s-${b.fill}`} d={b.d} fill="url(#lb-sweep)" style={{ mixBlendMode: "screen" }} />)
            : null}
        </svg>

        {/* Wordmark slides out from behind the mark. */}
        <div
          style={{
            position: "absolute",
            left: (width - lockW) / 2,
            top: (height - finalMark) / 2,
            width: lockW,
            height: finalMark,
            clipPath: `inset(-20% ${(1 - word) * 72}% -20% 28%)`,
          }}
        >
          <Img src={staticFile("logo/full-color.svg")} style={{ width: lockW, height: finalMark, transform: `translateX(${-(1 - word) * 46 * (lockW / 264)}px)` }} />
        </div>

        <Glint
          x={markX + markSize * 0.82}
          y={markY + markSize * 0.12}
          size={150 * u}
          intensity={interpolate(frame, [236, 242, 290], [0, 1, 0], clamp)}
          rotate={frame * 0.6}
          color="#ffffff"
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
