import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Lockup, OldMark } from "../components/Marks";
import { Glint } from "../components/Glint";
import { useLayout } from "../components/layout";
import { GLIDE, LEAVE, RISE, clamp, ease, punch } from "../components/motion";
import { REVEAL_LOCKUP } from "../scenes/Reveal";
import { PrismaticBurst } from "../site/PrismaticBurst";
import { SpectralFlow } from "../site/SpectralFlow";
import { C } from "../theme";

// Before -> after. The old lockup draws its wordmark back behind the prism;
// white light passes through it and disperses: the spectrum billows out of the
// prism like silk in water until it takes over the frame, then draws back in as
// the prism heats, collapses to a point of light and flashes; the new mark grows out of that
// point, each band taking its colour as a sweep of light crosses it. The hit
// throws the prismatic burst outwards as an organic, wavering front that keeps
// going until it settles around the edges of the frame, leaving the centre
// clear for the lockup, which opens and holds with the light alive at the edges.

export const BEFORE_AFTER_FRAMES = 760;

const RETRACT = [60, 112];
const TRAVEL = [84, 156];
const BEAM = [150, 172];
const FLOW = [166, 304]; // the dispersion opens until it takes over the frame
const INHALE = [326, 374]; // and draws back into the prism
const HEAT = [196, 300];
const COLLAPSE = [336, 376]; // the prism shrinks into a point of light
const FLASH = 376;
const GROW = [372, 420]; // the new mark grows out of the point
const SWEEP = 390; // + 12 per band: colour sweeps across each band
const WAVE = [382, 520]; // the burst travels outwards to the edges
const LOCKUP = [520, 582];

const NIGHT = "#07070b";
const NEW_MARK = 330;
const BANDS = [
  { fill: C.markCyan, d: "M57.3357 92.5003L0 149.939V53.5L53.2105 0.10425V0H149.524L57.3357 92.5003Z" },
  { fill: C.markRed, d: "M263 91.7452L91.0537 264H0V172.229L171.92 0H263V91.7452Z" },
  { fill: C.markYellow, d: "M209.686 264H113.373L156.453 220.773L263.001 114.034V210.5L209.686 264Z" },
];

// An elliptical ring of light with a wavering, organic inner and outer edge,
// as an SVG image for mask-image (filters render inside SVG images).
const ringMask = (w: number, h: number, cx: number, cy: number, inner: number, outer: number, t: number) => {
  const sx = w / h; // stretch so the ring follows the frame's shape
  const a = Math.max(0, Math.min(1, inner / outer));
  const b = Math.min(1, a + (1 - a) * 0.6);
  const freq = (0.0042 + 0.0006 * Math.sin(t * 0.7)).toFixed(5);
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><defs><radialGradient id='g' gradientUnits='userSpaceOnUse' cx='${cx}' cy='${cy}' r='${outer}' gradientTransform='translate(${cx} ${cy}) scale(${sx} 1) translate(${-cx} ${-cy})'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='${a.toFixed(4)}' stop-color='#fff' stop-opacity='0'/><stop offset='${b.toFixed(4)}' stop-color='#fff' stop-opacity='1'/><stop offset='${Math.max(b, 0.82).toFixed(4)}' stop-color='#fff' stop-opacity='1'/><stop offset='1' stop-color='#fff' stop-opacity='0'/></radialGradient><filter id='f' x='-20%' y='-20%' width='140%' height='140%'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='2' seed='7'/><feDisplacementMap in='SourceGraphic' scale='${(h * 0.16).toFixed(1)}' xChannelSelector='R' yChannelSelector='G'/></filter></defs><rect x='${-w * 0.2}' y='${-h * 0.2}' width='${w * 1.4}' height='${h * 1.4}' fill='url(#g)' filter='url(#f)'/></svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

export const BeforeAfter: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, cx, cy, u } = useLayout();
  const t = frame / 60;

  // Old lockup (605x194, symbol in the first 159px), centred.
  const lockupW = 760 * u;
  const k = lockupW / 605;
  const lockupLeft = cx - lockupW / 2;
  const lockupTop = cy - (194 * k) / 2;
  const fadeIn = ease(frame, 0, 30, [0, 1]);
  const retract = ease(frame, RETRACT[0], RETRACT[1], [0, 1], GLIDE);
  const travel = ease(frame, TRAVEL[0], TRAVEL[1], [0, 1], GLIDE);

  const symH = 194 * k + (400 * u - 194 * k) * travel;
  const symW = symH * (159 / 194);
  const symX0 = lockupLeft + (159 * k) / 2;
  const symCx = symX0 + (cx - symX0) * travel;

  // Light through the prism, as in the film.
  const beamDraw = ease(frame, BEAM[0], BEAM[1], [0, 1], RISE);
  const opening = ease(frame, FLOW[0], FLOW[1], [0, 1], GLIDE);
  const inhale = ease(frame, INHALE[0], INHALE[1], [0, 1], LEAVE);
  const flowSpread = opening * (1 - inhale);
  const flowGain = ease(frame, FLOW[0], FLOW[0] + 20, [0, 1]) * (1 - ease(frame, INHALE[1] - 16, INHALE[1] + 4, [0, 1]));
  const heat = ease(frame, HEAT[0], HEAT[1], [0, 1], GLIDE);
  const entry = { x: symCx - symW * 0.16, y: cy + symH * 0.06 };
  const exit = { x: symCx + symW * 0.31, y: cy - symH * 0.02 };
  const beamY0 = cy + 120 * u;
  const beamAngle = Math.atan2(entry.y - beamY0, entry.x) * (180 / Math.PI);
  const beamLen = Math.hypot(entry.x, entry.y - beamY0);

  // The prism collapses into a point; the light that was in it goes with it.
  const collapse = ease(frame, COLLAPSE[0], COLLAPSE[1], [0, 1], LEAVE);
  const lightOut = ease(frame, COLLAPSE[0], COLLAPSE[1] + 6, [0, 1], LEAVE);
  const flash = punch(frame, [FLASH], 30);
  const point = interpolate(frame, [COLLAPSE[0] + 10, FLASH, FLASH + 26], [0, 1, 0], clamp);

  // The new mark grows from that point, white, then takes its colour.
  const grow = ease(frame, GROW[0], GROW[1], [0, 1], RISE);
  const sweep = (i: number) => ease(frame, SWEEP + i * 12, SWEEP + i * 12 + 40, [0, 1], GLIDE);

  // The wave: outer edge leads, inner edge follows and stops short of the
  // edges, so the light ends up as a frame around a clear centre.
  const wave = ease(frame, WAVE[0], WAVE[1], [0, 1], RISE);
  const reach = Math.hypot(cx / (width / height), cy); // ellipse radius that reaches the corners
  const outer = interpolate(wave, [0, 1], [NEW_MARK * 0.5 * u, reach * 1.25]);
  // The inner edge rides just behind the front, so the light travels as a
  // ring and the centre never fills; it stops once it reaches the edges.
  const inner = Math.min(outer * 0.62, height * 0.36);
  const level = interpolate(frame, [WAVE[0], WAVE[0] + 30, WAVE[1]], [0.8, 3.4, 2.2], clamp) + 0.25 * Math.sin(t * 1.3);
  const ring = frame >= WAVE[0] ? ringMask(width, height, cx, cy, inner, outer, t) : undefined;

  // Then the lockup opens out from the mark, white wordmark on the night.
  const S = NEW_MARK * u;
  const open = ease(frame, LOCKUP[0], LOCKUP[1] + 10, [0, 1], GLIDE);
  const finalMark = REVEAL_LOCKUP * u * (67 / 264);
  const markSize = S + (finalMark - S) * open;
  const markLeft = cx - S / 2 + (cx - (REVEAL_LOCKUP * u) / 2 - (cx - S / 2)) * open;
  const word = ease(frame, LOCKUP[0] + 10, LOCKUP[1] + 20, [0, 1], GLIDE);
  const landed = frame >= LOCKUP[0] && sweep(2) >= 1;
  const markScale = (0.55 + 0.45 * grow) * (1 + flash * 0.03);

  return (
    <AbsoluteFill style={{ backgroundColor: NIGHT }}>
      {/* The burst, carried outwards by the wave and held at the edges. */}
      {ring ? (
        <AbsoluteFill style={{ maskImage: ring, WebkitMaskImage: ring, maskSize: "100% 100%", WebkitMaskSize: "100% 100%" }}>
          <PrismaticBurst width={width} height={height} intensity={level} speed={0.6} distort={1.4} noise={0} resolution={0.75} seed={2.4} />
        </AbsoluteFill>
      ) : null}

      {/* Old lockup, beam and spectrum. */}
      {frame < COLLAPSE[1] + 10 ? (
        <>
          <div style={{ position: "absolute", left: lockupLeft + 170 * k, top: lockupTop, width: lockupW - 170 * k, height: 194 * k, overflow: "hidden", opacity: fadeIn * (1 - retract * 0.6) }}>
            <Img
              src={staticFile("old/prisma-logo-indigo.svg")}
              style={{ position: "absolute", left: -170 * k, top: 0, width: lockupW, height: 194 * k, transform: `translateX(${-retract * (lockupW - 170 * k)}px)` }}
            />
          </div>

          {/* The dispersion: light billowing out of the prism. */}
          {flowGain > 0 ? (
            <AbsoluteFill style={{ mixBlendMode: "screen" }}>
              <SpectralFlow width={width} height={height} origin={exit} spread={flowSpread} gain={flowGain} />
            </AbsoluteFill>
          ) : null}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: beamY0 - 2 * u,
              width: beamLen * beamDraw,
              height: 4 * u,
              background: "linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 40%, #fff 100%)",
              boxShadow: `0 0 ${18 * u}px rgba(255,255,255,0.7)`,
              transformOrigin: "0% 50%",
              transform: `rotate(${beamAngle}deg)`,
              // The beam drains into the prism as it collapses.
              clipPath: `inset(0 0 0 ${lightOut * 100}%)`,
            }}
          />

          {/* The prism: heats, then collapses into its own light. */}
          <div
            style={{
              position: "absolute",
              left: symCx - symW / 2,
              top: cy - symH / 2,
              opacity: fadeIn * (1 - collapse * 0.6),
              transform: `scale(${1 - collapse}) rotate(${collapse * 30}deg)`,
              filter: `drop-shadow(0 0 ${heat * 60 * u}px rgba(255,255,255,${heat * 0.5}))`,
            }}
          >
            <OldMark size={symH} />
            <OldMark size={symH} color="#ffffff" style={{ position: "absolute", left: 0, top: 0, opacity: heat * 0.9 }} />
          </div>
          <Glint x={exit.x} y={exit.y} size={110 * u} intensity={flowGain * (1 - lightOut)} rotate={frame * 0.4} />
        </>
      ) : null}

      {/* The point of light the prism became, and the flash. */}
      <Glint x={cx} y={cy} size={220 * u} intensity={point} rotate={frame * 0.8} />
      <AbsoluteFill style={{ background: `radial-gradient(circle at ${cx}px ${cy}px, rgba(255,255,255,${flash * 0.35}) 0%, rgba(255,255,255,0) ${10 + flash * 14}%)` }} />

      {/* The new mark: grows from the point, white, colour sweeping each band. */}
      {frame >= GROW[0] && !landed ? (
        <svg
          width={S}
          height={S * (264 / 263)}
          viewBox="0 0 263 264"
          style={{ position: "absolute", left: cx - S / 2, top: cy - S / 2, overflow: "visible", transform: `scale(${markScale})`, opacity: grow, filter: `drop-shadow(0 0 ${(1 - grow) * 40 * u}px rgba(255,255,255,0.8))` }}
        >
          <defs>
            {BANDS.map((b, i) => {
              const p = -0.15 + sweep(i) * 1.3;
              return (
                <linearGradient key={b.fill} id={`ba-sweep-${i}`} gradientUnits="userSpaceOnUse" x1={0} y1={0} x2={263} y2={264}>
                  <stop offset={Math.max(0, Math.min(1, p - 0.12))} stopColor={b.fill} />
                  <stop offset={Math.max(0, Math.min(1, p))} stopColor="#ffffff" />
                </linearGradient>
              );
            })}
          </defs>
          {BANDS.map((b, i) => (
            <path key={b.fill} d={b.d} fill={`url(#ba-sweep-${i})`} />
          ))}
        </svg>
      ) : null}

      {landed ? <Lockup x={markLeft} y={cy} width={markSize * (264 / 67)} word={word} mono={{ src: "logo/white.svg" }} /> : null}
    </AbsoluteFill>
  );
};
