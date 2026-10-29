import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Lockup, NewMark } from "../components/Marks";
import { GLIDE, LEAVE, RISE, clamp, ease, punch } from "../components/motion";
import { PROMPT } from "../scenes/Prompt";
import { PRODUCTS } from "../site/products";
import { C, INTER, SORA } from "../theme";

// The system as a bento grid (after Studio Kiln's Reset grid): one ink
// frame, three equal columns, one gutter, one radius family. Each tile does
// one quiet thing, and together they tell prompt -> product on a seamless
// loop: the prompt types and sends, Prismo reacts, the database comes up,
// the product carousel keeps turning.

export const GRID_FRAMES = 600;

const W = 1920;
const H = 1080;
const M = 24; // frame margin
const G = 20; // gutter
const COL = (W - M * 2 - G * 2) / 3;
const ROW = H - M * 2;
const SHORT = 368;

const R = { tile: 20, card: 28, inner: 16 };

// Loop timeline.
const TYPE = [24, 132];
const SEND = 150;
const NOTIFY = 200;
// The last loop's notification clears as the next prompt starts.
const CLEAR = [0, 26];
const SLIDES = [100, 300, 500];
const MOODS: [number, string][] = [
  [0, "thinking"],
  [NOTIFY, "happy"],
  [430, "salute"],
];

const loop = (frame: number) => (2 * Math.PI * frame) / GRID_FRAMES;

const Tile: React.FC<{ x: number; y: number; w: number; h: number; bg: string; children?: React.ReactNode }> = ({ x, y, w, h, bg, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, borderRadius: R.tile, overflow: "hidden", background: bg }}>{children}</div>
);

const Cover: React.FC<{ src: string; blur?: number; scale?: number; style?: React.CSSProperties }> = ({ src, blur = 0, scale = 1, style }) => (
  <Img
    src={staticFile(src)}
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: blur ? `blur(${blur}px)` : undefined, transform: `scale(${scale})`, ...style }}
  />
);

const Arrow: React.FC<{ size: number; color: string; up?: boolean }> = ({ size, color, up }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ transform: up ? "rotate(-90deg)" : undefined }}>
    <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Plus: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <path d="M12 6v12M6 12h12" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </svg>
);

// A rounded rectangle with the mark's 45° chamfer on its top-left corner,
// every corner (chamfer included) softened by `r`.
const chamfer = (w: number, h: number, c: number, r: number) => {
  const pts = [
    [c, 0],
    [w, 0],
    [w, h],
    [0, h],
    [0, c],
  ];
  const n = pts.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const [px, py] = pts[(i - 1 + n) % n];
    const [x, y] = pts[i];
    const [nx, ny] = pts[(i + 1) % n];
    const toward = (ax: number, ay: number) => {
      const len = Math.hypot(ax - x, ay - y);
      const k = Math.min(r, len / 2) / len;
      return [x + (ax - x) * k, y + (ay - y) * k];
    };
    const [ax, ay] = toward(px, py);
    const [bx, by] = toward(nx, ny);
    d += `${i === 0 ? "M" : "L"}${ax},${ay} Q${x},${y} ${bx},${by} `;
  }
  return `${d}Z`;
};

// 1. The wordmark, ink on cyan. Once a loop the bands part along the
// diagonal and close again.
const WordmarkTile: React.FC<{ frame: number }> = ({ frame }) => {
  const part = interpolate(frame, [290, 320, 340, 380], [1, 0.9, 0.9, 1], { ...clamp, easing: GLIDE });
  const lw = 380;
  return (
    <Tile x={M} y={M} w={COL} h={SHORT} bg={C.markCyan}>
      <Lockup x={(COL - lw) / 2} y={SHORT / 2} width={lw} assemble={part} fly={50} mono={{ color: C.ink, src: "logo/black.svg" }} />
    </Tile>
  );
};

// 2. The campaign card on yellow: a site photograph in the chamfered frame,
// the end-card line, and the URL.
const CampaignTile: React.FC<{ frame: number }> = ({ frame }) => {
  const h = ROW - G - 242;
  const cw = 460;
  const iw = cw - 36;
  const ih = 300;
  const drift = Math.sin(loop(frame));
  return (
    <Tile x={M + COL + G} y={M} w={COL} h={h} bg={C.markYellow}>
      <div
        style={{
          position: "absolute",
          left: (COL - cw) / 2,
          top: (h - 560) / 2,
          width: cw,
          padding: 18,
          background: C.white,
          borderRadius: R.card,
          boxShadow: "0 30px 60px -34px rgba(90,60,0,0.45)",
        }}
      >
        <div style={{ position: "relative", width: iw, height: ih, clipPath: `path('${chamfer(iw, ih, 64, 14)}')`, overflow: "hidden" }}>
          <Cover src="brandnew/yoga.jpg" scale={1.12} style={{ objectPosition: "18% 60%", transform: `scale(1.12) translateX(${drift * 10}px)` }} />
        </div>
        <div style={{ padding: "26px 6px 0", fontFamily: SORA, fontWeight: 400, fontSize: 54, lineHeight: 1.04, letterSpacing: "-0.02em", color: C.ink }}>
          From prompt
          <br />
          to product.
        </div>
        <div style={{ marginTop: 34, padding: "0 6px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: INTER, fontSize: 19, color: C.muted }}>prisma.io</span>
          <span style={{ width: 44, height: 44, borderRadius: 99, background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Arrow size={20} color={C.white} />
          </span>
        </div>
      </div>
    </Tile>
  );
};

// 3. The prompt, typed into a glass bar over the yoga studio, under the mark.
const PromptTile: React.FC<{ frame: number }> = ({ frame }) => {
  const chars = Math.floor(interpolate(frame, TYPE, [0, PROMPT.length], clamp));
  const caret = frame < TYPE[1] || Math.floor(frame / 18) % 2 === 0;
  const press = punch(frame, [SEND], 16);
  const sent = ease(frame, SEND + 6, SEND + 24, [0, 1], LEAVE);
  const working = ease(frame, SEND, SEND + 10, [0, 1]) * (1 - ease(frame, NOTIFY - 10, NOTIFY, [0, 1]));
  const bw = 520;
  return (
    <Tile x={M + (COL + G) * 2} y={M} w={COL} h={SHORT} bg="#d9c7b0">
      <Cover src="brandnew/yoga.jpg" blur={26} scale={1.25} />
      <AbsoluteFill style={{ background: "rgba(60,40,20,0.12)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 70, display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        <NewMark size={52} />
        <div style={{ display: "flex", gap: 6, height: 6 }}>
          {[0, 1, 2].map((i) => (
            <span key={i} style={{ width: 6, height: 6, borderRadius: 99, background: C.white, opacity: working * (0.35 + 0.65 * Math.max(0, Math.sin(frame / 7 - i * 0.9))) }} />
          ))}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: (COL - bw) / 2,
          top: 214,
          width: bw,
          height: 68,
          borderRadius: R.inner,
          background: "rgba(255,255,255,0.62)",
          border: "1px solid rgba(255,255,255,0.7)",
          boxShadow: "0 18px 40px -24px rgba(40,25,10,0.45)",
          display: "flex",
          alignItems: "center",
          padding: "0 14px 0 22px",
          gap: 14,
        }}
      >
        <div style={{ flex: 1, overflow: "hidden", whiteSpace: "nowrap", fontFamily: INTER, fontSize: 19, color: C.ink, display: "flex", alignItems: "center" }}>
          {sent < 1 ? <span style={{ opacity: 1 - sent, transform: `translateY(${-sent * 14}px)` }}>{PROMPT.slice(0, chars)}</span> : null}
          <span style={{ marginLeft: 2, width: 2, height: 22, background: C.ink, opacity: caret ? 0.8 : 0 }} />
        </div>
        <span
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: C.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 - press * 0.12})`,
          }}
        >
          <Arrow size={18} color={C.white} up />
        </span>
      </div>
    </Tile>
  );
};

// 4. Prismo on paper, reacting as the story moves.
const PrismoTile: React.FC<{ frame: number }> = ({ frame }) => {
  let mood = MOODS[0][1];
  for (const [at, m] of MOODS) if (frame >= at) mood = m;
  const swap = punch(frame, MOODS.map(([at]) => at), 18);
  const bob = Math.sin(loop(frame) * 3) * 6;
  const size = 400;
  const top = SHORT + G + M;
  const h = ROW - SHORT - G;
  return (
    <Tile x={M} y={top} w={COL} h={h} bg={C.paper}>
      <div style={{ position: "absolute", left: (COL - 220) / 2, top: h / 2 + 170, width: 220, height: 26, borderRadius: "50%", background: "rgba(21,21,21,0.08)", filter: "blur(8px)", transform: `scaleX(${1 - bob / 60})` }} />
      <Img
        src={staticFile(`mascot/${mood}.png`)}
        style={{ position: "absolute", left: (COL - size) / 2, top: (h - size) / 2 - 20 + bob, width: size, height: size, transform: `scale(${1 - swap * 0.06})` }}
      />
    </Tile>
  );
};

// 5. The console's state, verbatim, landing as a notification once the
// prompt has sent.
const NotifyTile: React.FC<{ frame: number }> = ({ frame }) => {
  const x = M + COL + G;
  const h = 242;
  const top = M + ROW - h;
  const enter = ease(frame, NOTIFY, NOTIFY + 34, [0, 1], RISE);
  const p = frame < NOTIFY ? 1 - ease(frame, CLEAR[0], CLEAR[1], [0, 1], LEAVE) : enter;
  const cw = 500;
  const ch = 120;
  const card = (extra: React.CSSProperties, children?: React.ReactNode) => (
    <div
      style={{
        position: "absolute",
        left: (COL - cw) / 2,
        top: (h - ch) / 2,
        width: cw,
        height: ch,
        borderRadius: 22,
        background: "rgba(255,255,255,0.78)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 20px 40px -26px rgba(20,40,60,0.45)",
        ...extra,
      }}
    >
      {children}
    </div>
  );
  return (
    <Tile x={x} y={top} w={COL} h={h} bg="#dfe9ee">
      <Cover src="brand/agent-loop.jpg" blur={18} scale={1.2} />
      {card({ transform: `translateY(${16 + (1 - p) * 60}px) scale(0.92)`, opacity: 0.5 * p })}
      {card(
        { transform: `translateY(${(1 - p) * 150}px)`, opacity: p, display: "flex", alignItems: "center", gap: 20, padding: "0 20px" },
        <>
          <span style={{ width: 80, height: 80, flexShrink: 0, borderRadius: R.inner, background: C.white, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${C.border}` }}>
            <NewMark size={42} />
          </span>
          <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: INTER, fontSize: 16, color: C.muted }}>Prisma Postgres</span>
            <span style={{ fontFamily: SORA, fontWeight: 400, fontSize: 25, lineHeight: 1.2, color: C.ink, textWrap: "balance" }}>Primary database ready in us-west-1</span>
          </span>
        </>,
      )}
    </Tile>
  );
};

// 6. The three products as a carousel on the site's photography, turning
// one card at a time.
const ProductsTile: React.FC<{ frame: number }> = ({ frame }) => {
  const top = SHORT + G + M;
  const h = ROW - SHORT - G;
  const cw = 404;
  const ch = 528;
  const gap = 18;
  let pos = 0;
  for (const s of SLIDES) pos += ease(frame, s, s + 40, [0, 1], GLIDE);
  const n = PRODUCTS.length;
  return (
    <Tile x={M + (COL + G) * 2} y={top} w={COL} h={h} bg={C.paper}>
      {[-1, 0, 1, 2, 3, 4].map((slot) => {
        const p = PRODUCTS[(((slot % n) + n) % n)];
        const left = (COL - cw) / 2 + (slot - pos) * (cw + gap);
        return (
          <div key={slot} style={{ position: "absolute", left, top: (h - ch) / 2, width: cw, height: ch, borderRadius: R.card, overflow: "hidden" }}>
            <Cover src={p.panel} scale={1.05} />
            <div style={{ position: "absolute", left: 30, top: 28, fontFamily: SORA, fontWeight: 400, fontSize: 40, lineHeight: 1.05, letterSpacing: "-0.015em", color: C.ink }}>{p.name}</div>
            <Img src={staticFile(p.object)} style={{ position: "absolute", left: (cw - 250) / 2, top: 150, width: 250, height: 250, objectFit: "contain", filter: "drop-shadow(0 22px 24px rgba(21,21,21,0.18))" }} />
            <div style={{ position: "absolute", left: 30, right: 30, bottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: INTER, fontSize: 19, color: C.text }}>
                <span style={{ width: 8, height: 8, borderRadius: 99, background: p.dot }} />
                {p.role}
              </span>
              <span style={{ width: 40, height: 40, borderRadius: 99, background: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Plus size={18} color={C.ink} />
              </span>
            </div>
          </div>
        );
      })}
    </Tile>
  );
};

export const BrandGrid: React.FC = () => {
  const frame = useCurrentFrame() % GRID_FRAMES;
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink }}>
      <WordmarkTile frame={frame} />
      <CampaignTile frame={frame} />
      <PromptTile frame={frame} />
      <PrismoTile frame={frame} />
      <NotifyTile frame={frame} />
      <ProductsTile frame={frame} />
    </AbsoluteFill>
  );
};
