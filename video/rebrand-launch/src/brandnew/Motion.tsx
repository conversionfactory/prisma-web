import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Glint } from "../components/Glint";
import { Lockup } from "../components/Marks";
import { useLayout } from "../components/layout";
import { GLIDE, LEAVE, RISE, clamp, ease } from "../components/motion";
import { Opener } from "../scenes/Opener";
import { REVEAL_LOCKUP, Reveal } from "../scenes/Reveal";
import { SpectralBottom, Texture, Wrapped } from "../site/Surfaces";
import { BAR, C } from "../theme";

// ---- Before -> after: the opener and reveal, ending on a held lockup. ----

export const BEFORE_AFTER_FRAMES = BAR * 4 + 150;

const Hold: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { cx, cy, u } = useLayout();
  const out = ease(frame, 120, 150, [0, 1], LEAVE);
  return (
    <Wrapped u={u}>
      <SpectralBottom u={u} t={(frame + BAR * 2) / fps} />
      <Texture opacity={0.04} />
      <div style={{ opacity: 1 - out }}>
        <Lockup x={cx - (REVEAL_LOCKUP * u) / 2} y={cy} width={REVEAL_LOCKUP * u} />
      </div>
      <Glint x={cx - (REVEAL_LOCKUP * u) / 2 + 200 * u} y={cy - 90 * u} size={130 * u} intensity={interpolate(frame, [20, 26, 70], [0, 1, 0], clamp)} />
    </Wrapped>
  );
};

export const BeforeAfterFilm: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    <Sequence durationInFrames={BAR * 2}>
      <Opener />
    </Sequence>
    <Sequence from={BAR * 2} durationInFrames={BAR * 2}>
      <Reveal />
    </Sequence>
    <Sequence from={BAR * 4} durationInFrames={150}>
      <Hold />
    </Sequence>
  </AbsoluteFill>
);

// ---- The mark as a window onto the brand's photography. ----
// Each band of the mark is a window: the hazy landscapes from the site drift
// through the three bands, the mark grows to fill the frame, then the light
// floods each band with its colour and the wordmark arrives.

const BANDS = [
  { d: "M57.3357 92.5003L0 149.939V53.5L53.2105 0.10425V0H149.524L57.3357 92.5003Z", fill: C.markCyan, photo: "brand/feature-orm.jpg" },
  { d: "M263 91.7452L91.0537 264H0V172.229L171.92 0H263V91.7452Z", fill: C.markRed, photo: "brand/feature-compute.jpg" },
  { d: "M209.686 264H113.373L156.453 220.773L263.001 114.034V210.5L209.686 264Z", fill: C.markYellow, photo: "brand/feature-postgres.jpg" },
];

export const WINDOW_FRAMES = 600;

export const MarkWindow: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);

  // The mark opens huge (one band fills the frame) and pulls back.
  const pull = ease(frame, 0, 300, [0, 1], GLIDE);
  const size = (2600 - (2600 - 560) * pull) * u;
  const settle = ease(frame, 380, 440, [0, 1], GLIDE);
  const lockW = 1100 * u;
  const finalMark = lockW * (67 / 264);
  const s = size + (finalMark - size) * settle;
  const left = (width - size) / 2 + 300 * u * (1 - pull) + ((width - lockW) / 2 - (width - size) / 2) * settle;
  const top = (height - size) / 2 - 200 * u * (1 - pull) + ((height - finalMark) / 2 - (height - size) / 2) * settle;
  const fill = (i: number) => ease(frame, 300 + i * 14, 350 + i * 14, [0, 1], RISE);
  const word = ease(frame, 420, 470, [0, 1]);
  const out = ease(frame, WINDOW_FRAMES - 30, WINDOW_FRAMES, [0, 1], LEAVE);

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <Texture opacity={0.05} />
      <AbsoluteFill style={{ opacity: 1 - out }}>
        <svg width={s} height={s * (264 / 263)} viewBox="0 0 263 264" style={{ position: "absolute", left, top, overflow: "visible" }}>
          <defs>
            {BANDS.map((b, i) => (
              <clipPath key={i} id={`win-${i}`}>
                <path d={b.d} />
              </clipPath>
            ))}
          </defs>
          {BANDS.map((b, i) => {
            // Each photo drifts slowly along the band's diagonal.
            const drift = interpolate(frame, [0, 380], [-18, 18], clamp) * (i % 2 ? -1 : 1);
            return (
              <g key={b.fill} clipPath={`url(#win-${i})`}>
                <image href={staticFile(b.photo)} x={-80 + drift} y={-60 - drift} width={423} height={384} preserveAspectRatio="xMidYMid slice" />
                <path d={b.d} fill={b.fill} opacity={fill(i)} />
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", left: (width - lockW) / 2, top: (height - finalMark) / 2, width: lockW, height: finalMark, clipPath: `inset(-20% ${(1 - word) * 72}% -20% 28%)` }}>
          <Img src={staticFile("logo/full-color.svg")} style={{ width: lockW, height: finalMark, transform: `translateX(${-(1 - word) * 46 * (lockW / 264)}px)` }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// ---- The live homepage, scrolled section by section in a browser window
// floating over the CTA sky. Source: a 1440px-wide capture at 1.5x. ----

const PAGE = { w: 2160, h: 8100 };
const STOPS = [0, 2420, 4160, 5440, 6860];
const MOVE = 54;
const HOLD = 56;
export const SITE_FRAMES = 40 + STOPS.length * HOLD + (STOPS.length - 1) * MOVE + 40;

export const SiteScroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);

  const winW = 1500 * u;
  const bar = 44 * u;
  const winH = 900 * u;
  const k = winW / PAGE.w;

  let y = STOPS[0];
  for (let i = 1; i < STOPS.length; i++) {
    const start = 40 + i * HOLD + (i - 1) * MOVE;
    y += (STOPS[i] - STOPS[i - 1]) * ease(frame, start, start + MOVE, [0, 1], GLIDE);
  }
  const enter = ease(frame, 0, 50, [0, 1], RISE);
  const out = ease(frame, SITE_FRAMES - 30, SITE_FRAMES, [0, 1], LEAVE);
  const drift = interpolate(frame, [0, SITE_FRAMES], [1.06, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <Img src={staticFile("brand/agent-loop.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `scale(${drift})` }} />
      <SpectralBottom u={u} t={frame / fps} strength={0.6} />
      <AbsoluteFill style={{ opacity: 1 - out }}>
        <div
          style={{
            position: "absolute",
            left: (width - winW) / 2,
            top: (height - winH) / 2 + 40 * u + (1 - enter) * 160 * u,
            width: winW,
            height: winH,
            opacity: enter,
            borderRadius: 22 * u,
            overflow: "hidden",
            background: C.white,
            boxShadow: `0 ${60 * u}px ${120 * u}px -${40 * u}px rgba(30,40,60,0.45)`,
            border: `${1.5 * u}px solid rgba(255,255,255,0.7)`,
          }}
        >
          <div style={{ height: bar, display: "flex", alignItems: "center", gap: 9 * u, paddingLeft: 20 * u, borderBottom: `${1.5 * u}px solid ${C.border}`, background: "#fbfbf9" }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ width: 12 * u, height: 12 * u, borderRadius: 99, background: "rgba(21,21,21,0.12)" }} />
            ))}
            <div style={{ position: "absolute", left: winW / 2 - 120 * u, width: 240 * u, height: 26 * u, borderRadius: 99, background: "rgba(21,21,21,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 * u, color: C.muted, fontFamily: "Inter, sans-serif" }}>
              prisma.io
            </div>
          </div>
          <div style={{ position: "relative", height: winH - bar, overflow: "hidden" }}>
            <Img src={staticFile("brandnew/home-tall.png")} style={{ position: "absolute", left: 0, top: -y * k, width: winW, height: PAGE.h * k }} />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
