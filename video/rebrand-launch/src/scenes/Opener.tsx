import React from "react";
import { AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Ink } from "../components/Ground";
import { OldMark } from "../components/Marks";
import { Glint } from "../components/Glint";
import { useLayout } from "../components/layout";
import { LEAVE, clamp, ease } from "../components/motion";
import { PrismaticBurst } from "../site/PrismaticBurst";
import { BAR, C, SPECTRUM_STOPS } from "../theme";

const WORD_OUT = 36;
const CENTRE = 90;
const BEAM = 96;
const BURST = BAR * 2 - 54;
const END = BAR * 2;

// Bars 1-2. The old indigo lockup; the wordmark slides back behind the mark; white light
// passes through the old prism and splits into the brand spectrum, which
// erupts into the prismatic burst.
export const Opener: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, cx, cy, u } = useLayout();

  // Old lockup is 605x194; its symbol occupies the first 159px.
  const lockupW = 760 * u;
  const k = lockupW / 605;
  const lockupLeft = cx - lockupW / 2;
  const lockupTop = cy - (194 * k) / 2;

  const lockupIn = ease(frame, 0, 22, [0, 1]);
  const wordOut = ease(frame, WORD_OUT, WORD_OUT + 26, [0, 1], LEAVE);
  const travel = ease(frame, WORD_OUT + 8, CENTRE, [0, 1], Easing.inOut(Easing.cubic));

  const symH = 194 * k + (430 * u - 194 * k) * travel;
  const symW = symH * (159 / 194);
  const symX0 = lockupLeft + (159 * k) / 2;
  const symCx = symX0 + (cx - symX0) * travel;
  const symCy = cy;

  const beamDraw = ease(frame, BEAM, BEAM + 14, [0, 1], Easing.out(Easing.quad));
  const spread = ease(frame, BEAM + 10, BEAM + 56, [0, 1], Easing.out(Easing.cubic));
  const prismGlow = interpolate(frame, [BEAM + 6, BURST], [0, 1], clamp);
  const push = interpolate(frame, [BEAM, END], [1, 1.25], { ...clamp, easing: Easing.in(Easing.quad) });

  const entry = { x: symCx - symW * 0.16, y: symCy + symH * 0.06 };
  const exit = { x: symCx + symW * 0.22, y: symCy - symH * 0.02 };
  const beamY0 = cy + 120 * u;
  const beamAngle = Math.atan2(entry.y - beamY0, entry.x) * (180 / Math.PI);
  const beamLen = Math.hypot(entry.x, entry.y - beamY0);
  const outLen = (width - exit.x + 400 * u) * spread;

  // The burst erupts from the exit point with a feathered radial reveal,
  // the way BurstFill builds in on the site's buttons.
  const reveal = ease(frame, BURST, END, [0, 130]);
  const burstMask = `radial-gradient(circle at ${exit.x}px ${exit.y}px, #000 ${reveal}%, transparent ${reveal + 32}%)`;

  return (
    <Ink color={C.night}>
      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: `${exit.x}px ${exit.y}px` }}>
        <div style={{ position: "absolute", left: lockupLeft + 170 * k, top: lockupTop, width: lockupW - 170 * k, height: 194 * k, overflow: "hidden", opacity: lockupIn }}>
          <Img
            src={staticFile("old/prisma-logo-indigo.svg")}
            style={{ position: "absolute", left: -170 * k, top: 0, width: lockupW, height: 194 * k, transform: `translateX(${-wordOut * (lockupW - 170 * k)}px)` }}
          />
        </div>

        {/* The light leaves the prism split into the five spectrum stops. */}
        {SPECTRUM_STOPS.map((color, i) => (
          <div
            key={color}
            style={{
              position: "absolute",
              left: exit.x,
              top: exit.y - 3 * u,
              width: outLen,
              height: (6 + 22 * spread) * u,
              background: `linear-gradient(to right, ${color}00 0%, ${color} 8%, ${color} 100%)`,
              transformOrigin: "0% 50%",
              transform: `rotate(${(-12 + i * 5.5) * (0.35 + 0.65 * spread)}deg)`,
              boxShadow: `0 0 ${36 * u}px ${color}`,
              opacity: spread,
            }}
          />
        ))}

        <div
          style={{
            position: "absolute",
            left: 0,
            top: beamY0 - 3 * u,
            width: beamLen * beamDraw,
            height: 6 * u,
            background: "linear-gradient(to right, rgba(255,255,255,0) 0%, #fff 30%, #fff 100%)",
            boxShadow: `0 0 ${24 * u}px rgba(255,255,255,0.9)`,
            transformOrigin: "0% 50%",
            transform: `rotate(${beamAngle}deg)`,
          }}
        />

        <div
          style={{
            position: "absolute",
            left: symCx - symW / 2,
            top: symCy - symH / 2,
            opacity: lockupIn,
            filter: `drop-shadow(0 0 ${prismGlow * 60 * u}px rgba(160,165,255,${0.25 + prismGlow * 0.5}))`,
          }}
        >
          <OldMark size={symH} />
          <OldMark size={symH} color="#ffffff" style={{ position: "absolute", left: 0, top: 0, opacity: prismGlow * 0.55, mixBlendMode: "screen" }} />
        </div>

        <Glint x={entry.x} y={entry.y} size={70 * u} intensity={beamDraw * (0.6 + 0.4 * Math.sin(frame / 3))} />
        <Glint x={exit.x} y={exit.y} size={110 * u} intensity={spread} rotate={frame * 0.6} />
      </AbsoluteFill>

      {frame >= BURST ? (
        <AbsoluteFill style={{ maskImage: burstMask, WebkitMaskImage: burstMask, mixBlendMode: "screen" }}>
          <PrismaticBurst width={width} height={height} intensity={3.2} speed={0.7} distort={1.4} />
        </AbsoluteFill>
      ) : null}
    </Ink>
  );
};
