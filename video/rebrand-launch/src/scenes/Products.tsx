import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Photo } from "../components/Ground";
import { Glint } from "../components/Glint";
import { MaskLine, TYPE } from "../components/Type";
import { useLayout } from "../components/layout";
import { GLIDE, clamp, ease, line } from "../components/motion";
import { PRODUCTS } from "../site/products";
import { RoleKicker, SiteRay, SpectralBottom, Texture } from "../site/Surfaces";
import { BAR, C, SORA } from "../theme";

const H2 = ["The TypeScript stack,", "integrated by design"];
const STACK = BAR * 3;
// The wrapped panel's inset and radius (Surfaces.Wrapped).
const WRAP = { inset: 28, radius: 32 };

// 1920-grid geometry for each aspect. Text sits on white beside (or below)
// the media panel; nothing is ever laid over the photography.
const GEO = {
  wide: {
    panel: { x: 820, y: 110, w: 980, h: 860 },
    text: { x: 140, kicker: 352, name: 404 },
    lineH: 140,
    nameSize: 128,
    h2Top: 112,
    slots: [
      { x: 520, y: 660 },
      { x: 960, y: 640 },
      { x: 1400, y: 624 },
    ],
    slotScale: 0.76,
    ray: { y: 668 },
  },
  tall: {
    panel: { x: 110, y: 110, w: 1700, h: 1180 },
    text: { x: 140, kicker: 1420, name: 1480 },
    lineH: 150,
    nameSize: 140,
    h2Top: 260,
    slots: [
      { x: 520, y: 1280 },
      { x: 960, y: 1260 },
      { x: 1400, y: 1240 },
    ],
    slotScale: 0.6,
    ray: { y: 1270 },
  },
};

// Bars 7-10: one product per downbeat. "Prisma" holds while the product
// word rolls; the media panel scrolls to the next photo and the 3D object
// drops in with a settle. Bar 10 opens the panel out to the frame and the
// three objects line up on the ray (the M-07 composition).
export const Products: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, height, u, tall } = useLayout();
  const g = tall ? GEO.tall : GEO.wide;
  const t = frame / fps;

  // Panel rect, opening out to the wrapped panel on bar 10.
  const open = ease(frame, STACK - 8, STACK + 30, [0, 1], GLIDE);
  const enter = ease(frame, 4, 40, [0, 1]);
  const from = g.panel;
  const to = { x: WRAP.inset, y: WRAP.inset, w: width / u - WRAP.inset * 2, h: height / u - WRAP.inset * 2 };
  const lerp = (a: number, b: number) => a + (b - a) * open;
  const panel = {
    x: lerp(from.x, to.x) * u,
    y: lerp(from.y, to.y) * u + (1 - enter) * 80 * u,
    w: lerp(from.w, to.w) * u,
    h: lerp(from.h, to.h) * u,
    r: lerp(40, WRAP.radius) * u,
  };
  const photoFade = ease(frame, STACK, STACK + 26, [1, 0]);

  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <TextColumn frame={frame} />

      <div
        style={{
          position: "absolute",
          left: panel.x,
          top: panel.y,
          width: panel.w,
          height: panel.h,
          borderRadius: panel.r,
          overflow: "hidden",
          opacity: enter,
          background: C.paper,
          border: `${1.5 * u}px solid ${C.border}`,
          boxShadow: `0 ${24 * u}px ${60 * u}px -${30 * u}px rgba(21,21,21,${0.28 * (1 - open)})`,
        }}
      >
        {/* Stack ground, revealed as the photos fade. */}
        <div style={{ position: "absolute", left: -panel.x, top: -panel.y, width, height }}>
          <SpectralBottom u={u} t={t} rise={ease(frame, STACK, STACK + 60, [0, 1])} strength={0.8} />
          <SiteRay x={width / 2} y={g.ray.y * u} length={width * 1.3} thickness={230 * u} angle={-16} intensity="hero" fade="both" reveal={ease(frame, STACK + 6, STACK + 50, [0, 1])} />
          <Texture opacity={0.04} />
        </div>

        {PRODUCTS.map((p, i) => {
          const inAt = i * BAR;
          const slideIn = i === 0 ? 1 : ease(frame, inAt - 16, inAt + 12, [0, 1], GLIDE);
          const slideOut = i === PRODUCTS.length - 1 ? 0 : ease(frame, inAt + BAR - 16, inAt + BAR + 12, [0, 1], GLIDE);
          const y = ((1 - slideIn) - slideOut) * from.h * u;
          if (slideIn <= 0 || slideOut >= 1) return null;
          return (
            <div key={p.name} style={{ position: "absolute", left: 0, top: y, width: panel.w, height: panel.h, opacity: i === PRODUCTS.length - 1 ? photoFade : 1 }}>
              <Photo src={p.panel} progress={interpolate(frame, [inAt - 20, inAt + BAR], [0, 1], clamp)} from={1.14} to={1.04} />
              <SiteRay x={panel.w * (((t / 7 + i * 0.33) % 1) * 2 - 0.5)} y={panel.h * 0.64} length={panel.w * 0.9} thickness={110 * u} angle={-16} intensity="structural" />
            </div>
          );
        })}
      </div>

      <Objects frame={frame} panel={panel} />
    </AbsoluteFill>
  );
};

const TextColumn: React.FC<{ frame: number }> = ({ frame }) => {
  const { u, tall } = useLayout();
  const g = tall ? GEO.tall : GEO.wide;
  const exit = STACK - 14;
  const nameStyle: React.CSSProperties = { fontFamily: SORA, fontWeight: 500, fontSize: g.nameSize * u, lineHeight: `${g.lineH * u}px`, color: C.ink, whiteSpace: "nowrap" };

  return (
    <>
      {/* Kicker and product word swap per product; "Prisma" holds. */}
      {PRODUCTS.map((p, i) => {
        const inAt = i === 0 ? 14 : i * BAR - 2;
        const outAt = i === PRODUCTS.length - 1 ? exit : (i + 1) * BAR - 12;
        const word = p.name.replace("Prisma ", "");
        return (
          <React.Fragment key={p.name}>
            <div style={{ position: "absolute", left: g.text.x * u, top: g.text.kicker * u }}>
              <MaskLine p={line(frame, inAt + 4, outAt, 24)}>
                <RoleKicker u={u} color={p.dot} size={TYPE.kicker}>
                  {p.role}
                </RoleKicker>
              </MaskLine>
            </div>
            <div style={{ position: "absolute", left: g.text.x * u, top: (g.text.name + g.lineH) * u }}>
              <MaskLine p={line(frame, inAt, outAt, 30)}>
                <div style={nameStyle}>{word}</div>
              </MaskLine>
            </div>
          </React.Fragment>
        );
      })}
      <div style={{ position: "absolute", left: g.text.x * u, top: g.text.name * u }}>
        <MaskLine p={line(frame, 8, exit + 4, 30)}>
          <div style={nameStyle}>Prisma</div>
        </MaskLine>
      </div>

      {/* Progress: three short bars, one per product, coloured by its dot. */}
      <div style={{ position: "absolute", left: g.text.x * u, top: (g.text.name + g.lineH * 2 + 70) * u, display: "flex", gap: 12 * u, opacity: ease(frame, 20, 40, [0, 1]) * ease(frame, exit, exit + 16, [1, 0]) }}>
        {PRODUCTS.map((p, i) => {
          const fill = ease(frame, i * BAR - 4, i * BAR + 20, [0, 1]);
          return (
            <div key={p.name} style={{ position: "relative", width: 64 * u, height: 6 * u, borderRadius: 99, background: "rgba(21,21,21,0.08)", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, width: `${fill * 100}%`, background: p.dot, borderRadius: 99 }} />
            </div>
          );
        })}
      </div>
    </>
  );
};

// The 3D objects live above the panel so they can travel out of it into
// the stack line-up.
const Objects: React.FC<{ frame: number; panel: { x: number; y: number; w: number; h: number; r: number } }> = ({ frame, panel }) => {
  const { fps } = useVideoConfig();
  const { width, height, u, tall } = useLayout();
  const g = tall ? GEO.tall : GEO.wide;
  const t = frame / fps;
  const home = { x: (g.panel.x + g.panel.w / 2) * u, y: (g.panel.y + g.panel.h / 2) * u };

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {PRODUCTS.map((p, i) => {
        const last = i === PRODUCTS.length - 1;
        const inAt = i * BAR;
        const k = p.fit * u * (tall ? 1.5 : 1);
        const w = p.w * k;
        const h = p.h * k;

        // Panel phase: drop in on the downbeat, scroll out with the photo.
        const land = spring({ frame: frame - (inAt - (i === 0 ? -6 : 8)), fps, config: { damping: 14, stiffness: 110 } });
        const out = last ? 0 : ease(frame, inAt + BAR - 18, inAt + BAR + 8, [0, 1], GLIDE);
        let x = home.x;
        let y = home.y + (1 - land) * 260 * u - out * g.panel.h * u * 1.2;
        let s = 1;
        let o = Math.min(1, land * 2);

        // Stack phase: everything travels to its slot on the ray.
        const stackLand = last
          ? ease(frame, STACK - 4, STACK + 34, [0, 1], GLIDE)
          : spring({ frame: frame - (STACK + 10 + i * 8), fps, config: { damping: 14, stiffness: 120 } });
        if (frame >= STACK - 4) {
          const slot = { x: g.slots[i].x * u, y: g.slots[i].y * u };
          if (last) {
            x = home.x + (slot.x - home.x) * stackLand;
            y = home.y + (slot.y - home.y) * stackLand;
            s = 1 + (g.slotScale - 1) * stackLand;
            o = 1;
          } else {
            x = slot.x;
            y = slot.y + (1 - stackLand) * 360 * u;
            s = g.slotScale;
            o = Math.min(1, stackLand * 2);
          }
        } else if (frame < inAt - 20 || out >= 1) {
          return null;
        }

        const bob = Math.sin(t * 2.2 + i * 1.7) * 9 * u;
        const glint = frame < STACK ? interpolate(frame, [inAt + 18, inAt + 23, inAt + 56], [0, 1, 0], clamp) : interpolate(frame, [STACK + 40 + i * 10, STACK + 45 + i * 10, STACK + 80 + i * 10], [0, 1, 0], clamp);
        // Clipped to the panel while it is still a panel, so objects scroll
        // under its edges.
        const clip = frame < STACK - 4 ? `inset(${panel.y}px ${width - panel.x - panel.w}px ${height - panel.y - panel.h}px ${panel.x}px round ${panel.r}px)` : "none";
        return (
          <AbsoluteFill key={p.name} style={{ clipPath: clip }}>
            <Img
              src={staticFile(p.object)}
              style={{
                position: "absolute",
                width: w,
                height: h,
                left: x - w / 2,
                top: y - h / 2 + bob,
                opacity: o,
                transform: `scale(${s})`,
                filter: `drop-shadow(0 ${30 * u}px ${36 * u}px rgba(0,0,0,0.2))`,
              }}
            />
            <Glint x={x + w * s * 0.22} y={y - h * s * 0.24 + bob} size={110 * u} intensity={glint} rotate={frame * 0.5} />
          </AbsoluteFill>
        );
      })}

      <H2Lines frame={frame} />
    </AbsoluteFill>
  );
};

const H2Lines: React.FC<{ frame: number }> = ({ frame }) => {
  const { u, tall } = useLayout();
  const g = tall ? GEO.tall : GEO.wide;
  if (frame < STACK) return null;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: g.h2Top * u, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {H2.map((text, i) => (
        <MaskLine key={text} p={line(frame, STACK + 22 + i * 6, Infinity, 32)}>
          <div style={{ fontFamily: SORA, fontWeight: 500, fontSize: 96 * u, lineHeight: `${108 * u}px`, color: C.ink, whiteSpace: "nowrap", textAlign: "center" }}>{text}</div>
        </MaskLine>
      ))}
    </div>
  );
};
