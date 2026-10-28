import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Glint } from "../components/Glint";
import { useLayout } from "../components/layout";
import { GLIDE, LEAVE, clamp, ease } from "../components/motion";
import { BAR, BEAT, C } from "../theme";

// Bars 18-19: opens on the X the merch push landed on, pulls back, and
// Prismo pops in between the crossed rays, looking around the way he does
// on the site. Lifts out onto the end card's paper.
export const Prismo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { cx, cy, height, u } = useLayout();
  const t = frame / fps;

  const stripeH = height * 1.5;
  const stripeW = stripeH * (607 / 4096);
  const pull = ease(frame, 0, 50, [2.2, 1], GLIDE);
  const drift = interpolate(frame, [0, BAR * 2], [-3, 4], clamp);

  const pop = spring({ frame: frame - BEAT, fps, config: { damping: 11, stiffness: 120 } });
  const size = 660 * u;
  const bob = Math.sin(t * 2.6) * 10 * u;
  // mascot-look: swivel left, hold, centre, right.
  const look = interpolate(frame, [BEAT * 3, BEAT * 3 + 20, BEAT * 4 + 10, BEAT * 4 + 30, BEAT * 5 + 20, BEAT * 5 + 40], [0, -22, -22, 0, 0, 18], clamp);

  const out = ease(frame, BAR * 2 - 14, BAR * 2, [0, 1], LEAVE);

  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <AbsoluteFill style={{ backgroundColor: C.white, opacity: 1 - out, transform: `scale(${1 + out * 0.12})` }}>
        <div style={{ position: "absolute", inset: 0, transform: `rotate(${drift}deg) scale(${pull})` }}>
          {[38, -38].map((angle) => (
            <Img
              key={angle}
              src={staticFile("figma/prisma-stripe.svg")}
              style={{
                position: "absolute",
                width: stripeW,
                height: stripeH,
                left: cx - stripeW / 2,
                top: cy - stripeH / 2,
                transform: `rotate(${angle}deg)`,
                opacity: 0.9,
              }}
            />
          ))}
        </div>
        <div style={{ position: "absolute", left: cx - size / 2, top: cy - size / 2 + bob, width: size, height: size, perspective: 900 * u }}>
          <Img
            src={staticFile("mascot/salute.png")}
            style={{
              width: size,
              height: size,
              transformOrigin: "50% 85%",
              transform: `scale(${pop}) rotate(${(1 - pop) * -14}deg) rotateY(${look}deg)`,
              filter: `drop-shadow(0 ${30 * u}px ${40 * u}px rgba(21,21,21,0.16))`,
            }}
          />
        </div>
        <Glint x={cx + 120 * u} y={cy - 160 * u} size={140 * u} intensity={interpolate(frame, [BEAT * 2, BEAT * 2 + 6, BEAT * 2 + 40], [0, 1, 0], clamp)} />
        <Glint x={cx - 250 * u} y={cy + 50 * u} size={90 * u} intensity={interpolate(frame, [BEAT * 5, BEAT * 5 + 6, BEAT * 5 + 40], [0, 1, 0], clamp)} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
