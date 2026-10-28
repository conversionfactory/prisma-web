import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Ink } from "../components/Ground";
import { Glint } from "../components/Glint";
import { Lockup } from "../components/Marks";
import { useLayout } from "../components/layout";
import { GLIDE, RISE, clamp, ease, punch } from "../components/motion";
import { PrismaticBurst } from "../site/PrismaticBurst";
import { GlassGlide, SpectralBottom, Texture, Wrapped } from "../site/Surfaces";
import { BAR, BEAT } from "../theme";

const OPEN = BAR - 8;
// Width of the lockup once it settles; the prompt scene picks it up here.
export const REVEAL_LOCKUP = 880;

// Bars 3-4. The new mark assembles inside the prismatic burst while the
// light pulls in towards it. On bar 4 the light irises open from the mark
// onto the paper hero, and the wordmark slides out from behind the mark.
export const Reveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, height, cx, cy, u } = useLayout();
  const t = frame / fps;

  const assemble = spring({ frame: frame - 2, fps, config: { damping: 15, stiffness: 140 } });
  const settle = punch(frame, [16], 22);
  const inhale = ease(frame, 0, 70, [1.3, 1]);
  const burstLevel = interpolate(frame, [0, 40, OPEN], [3.4, 2.8, 2.5], clamp);
  const darkMark = 300 * u;

  // Light state: the lockup starts as the bare mark, exactly where the dark
  // mark sits, then widens to the full lockup while the word slides out.
  const grow = ease(frame, OPEN + 16, OPEN + 58, [0, 1], GLIDE);
  const markSize = darkMark + (REVEAL_LOCKUP * u * (67 / 264) - darkMark) * grow;
  const lockW = markSize * (264 / 67);
  const startX = cx - darkMark / 2;
  const endX = cx - (REVEAL_LOCKUP * u) / 2;
  const lockX = startX + (endX - startX) * grow;
  const word = ease(frame, OPEN + 24, OPEN + 62, [0, 1]);

  const open = ease(frame, OPEN, OPEN + 34, [0, 150], RISE);
  const darkMask = frame < OPEN ? "none" : `radial-gradient(circle at ${cx}px ${cy}px, transparent ${open}%, #000 ${open + 18}%)`;
  const bloom = ease(frame, OPEN, OPEN + 70, [0, 1]);

  return (
    <AbsoluteFill>
      {/* Light state, underneath. */}
      <Wrapped u={u}>
        <SpectralBottom u={u} rise={bloom} t={t} />
        <Texture opacity={0.04} />
        <div style={{ position: "absolute", left: cx - (REVEAL_LOCKUP * u) / 2, top: cy - 110 * u }}>
          <GlassGlide p={interpolate(frame, [OPEN + 40, BAR * 2 + 10], [0, 1], clamp)} u={u} width={REVEAL_LOCKUP * u} height={220 * u} />
        </div>
        <Lockup x={lockX} y={cy} width={lockW} word={word} />
      </Wrapped>

      {/* Dark state on top, irising open from the mark. */}
      <AbsoluteFill style={{ maskImage: darkMask, WebkitMaskImage: darkMask }}>
        <Ink color="#07070b">
          <AbsoluteFill style={{ mixBlendMode: "screen", transform: `scale(${inhale})` }}>
            <PrismaticBurst width={width} height={height} intensity={burstLevel} speed={0.8} distort={1.4} seed={3.2} />
          </AbsoluteFill>
          <AbsoluteFill style={{ background: `radial-gradient(circle at center, rgba(7,7,11,0.92) 0%, rgba(7,7,11,0.55) 16%, transparent 34%)` }} />
          <div style={{ position: "absolute", left: cx - darkMark / 2, top: cy - darkMark / 2, width: darkMark, height: darkMark, transform: `scale(${(1 + settle * 0.06) * interpolate(frame, [0, OPEN], [0.92, 1], clamp)})` }}>
            <Lockup x={0} y={darkMark / 2} width={darkMark * (264 / 67)} word={0} assemble={assemble} fly={700} />
          </div>
          <Glint x={cx + darkMark * 0.36} y={cy - darkMark * 0.38} size={170 * u} intensity={interpolate(frame, [16, 21, 58], [0, 1, 0], clamp)} rotate={frame * 0.8} />
          <Glint x={cx - darkMark * 0.38} y={cy + darkMark * 0.4} size={110 * u} intensity={interpolate(frame, [BEAT * 2, BEAT * 2 + 5, BEAT * 2 + 40], [0, 1, 0], clamp)} />
        </Ink>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
