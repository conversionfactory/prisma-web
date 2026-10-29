import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { GLIDE, LEAVE, RISE, clamp, ease } from "../components/motion";
import { Texture } from "../site/Surfaces";
import { C, INTER } from "../theme";

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

// ---- The live homepage scrolling on a laptop on a desk (after Studio
// Kiln's Reset mockup). The photo is a Flora render with a flat green screen;
// the page is a 1440px-wide capture of the whole homepage, stitched viewport
// by viewport, scrolled in one smooth glide under the site's floating header.

// The green screen in the 1920x1080 frame, grown 1.5px to cover its fringe.
const SCREEN = { x: 647.25, y: 412.5, w: 661.5, h: 428.25 };
const PAGE = { w: 1440, h: 11454 };
const BAR = 30; // browser chrome, in page px

// The scroll stops at two sections, and at each one the camera pushes into
// the screen until the section fills the frame, holds, then pulls back:
// "Ship a production TypeScript app in three steps" and "What changes when
// your stack is built to work together" (offsets measured on the live page).
const STOPS = [0, 2701, 6138];
const SCROLLS = [
  [50, 190],
  [440, 600],
  [850, 1030],
];
const ZOOMS = [
  [196, 276, 360, 440],
  [606, 686, 770, 850],
];
export const SITE_FRAMES = 1140;

export const SiteScroll: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);

  const k = SCREEN.w / PAGE.w;
  const viewH = SCREEN.h / k - BAR;
  const ends = [...STOPS.slice(1), PAGE.h - viewH];
  let y = STOPS[0];
  SCROLLS.forEach(([a, b], i) => {
    y += (ends[i] - (i === 0 ? STOPS[0] : ends[i - 1])) * ease(frame, a, b, [0, 1], GLIDE);
  });
  // The site swaps its full-width header for the floating pill once scrolled.
  const pill = interpolate(y, [30, 140], [0, 1], clamp);

  // Camera: push in so the screen fills the frame height, centred.
  let z = 0;
  for (const [a, b, c, d] of ZOOMS) z = Math.max(z, interpolate(frame, [a, b, c, d], [0, 1, 1, 0], { ...clamp, easing: GLIDE }));
  const Z = 1 + (1000 / SCREEN.h - 1) * z;
  const sc = { x: (SCREEN.x + SCREEN.w / 2) * u, y: (SCREEN.y + SCREEN.h / 2) * u };
  const dx = (width / 2 - sc.x * Z) * z + (sc.x - sc.x * Z) * (1 - z);
  const dy = (height / 2 - sc.y * Z) * z + (sc.y - sc.y * Z) * (1 - z);

  return (
    <AbsoluteFill style={{ backgroundColor: "#e9d6bd", overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `translate(${dx}px, ${dy}px) scale(${Z})`, transformOrigin: "0 0" }}>
        <Img src={staticFile("brandnew/laptop.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        <div style={{ position: "absolute", left: SCREEN.x * u, top: SCREEN.y * u, width: SCREEN.w * u, height: SCREEN.h * u, overflow: "hidden", background: C.white }}>
          <div style={{ width: PAGE.w, height: SCREEN.h / k, transform: `scale(${k * u})`, transformOrigin: "0 0" }}>
            {/* Browser chrome. */}
            <div style={{ position: "relative", height: BAR, display: "flex", alignItems: "center", gap: 7, paddingLeft: 14, background: "#f1f1ef", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <span key={c} style={{ width: 11, height: 11, borderRadius: 99, background: c }} />
              ))}
              <span style={{ position: "absolute", left: PAGE.w / 2 - 130, width: 260, height: 20, borderRadius: 6, background: "rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: INTER, fontSize: 12, color: C.muted }}>
                prisma.io
              </span>
            </div>
            <div style={{ position: "relative", height: viewH, overflow: "hidden" }}>
              <Img src={staticFile("brandnew/home-scroll.png")} style={{ position: "absolute", left: 0, top: 0, width: PAGE.w, height: PAGE.h, transform: `translateY(${-y}px)` }} />
              <Img src={staticFile("brandnew/header-pill.png")} style={{ position: "absolute", left: 0, top: 0, width: PAGE.w, height: 100, opacity: pill }} />
            </div>
          </div>
          {/* A faint sheen across the glass. */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 38%)" }} />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
