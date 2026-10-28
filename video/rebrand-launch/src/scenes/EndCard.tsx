import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Lockup } from "../components/Marks";
import { MaskLine, TYPE } from "../components/Type";
import { HERO_LOGO, useLayout } from "../components/layout";
import { GLIDE, clamp, ease, line, rise } from "../components/motion";
import { FooterWordmark, GlassGlide, SiteRay, SpectralBottom, Texture, Wrapped } from "../site/Surfaces";
import { C, INTER, SORA } from "../theme";
import { HERO, PROMPT, PromptCard } from "./Prompt";

// M-07 end card copy.
const HEADLINE = "From prompt to product.";
const SCROLL = 172;

// Bars 20-22. The M-07 end card on the hero's own ground, bookending the
// prompt scene: lockup in the same slot, the headline, the finished prompt.
// Then the page scrolls to the footer and the wordmark takes its stripes.
export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, height, cx, cy, u } = useLayout();
  const t = frame / fps;

  const scroll = ease(frame, SCROLL, SCROLL + 44, [0, 1], GLIDE);
  const lineH = 156 * u;
  const headTop = (HERO_LOGO.cy + HERO.cardTop) / 2 * u - lineH / 2 + 12 * u;
  const footW = Math.min(width - 360 * u, 1500 * u);
  // The letters fill the left 86.5% of the footer art; the rays run past
  // them. Centre the letters, not the art.
  const letters = 0.865;
  const footH = footW * (158 / 725);
  const colour = ease(frame, SCROLL + 30, SCROLL + 96, [0, 1]);
  const logoW = HERO_LOGO.width * u;

  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <AbsoluteFill style={{ transform: `translateY(${-scroll * height}px)` }}>
        <Wrapped u={u}>
          <SpectralBottom u={u} t={t} rise={ease(frame, 0, 50, [0.3, 1])} />
          <SiteRay x={width - 300 * u} y={height - 150 * u} length={1500 * u} thickness={140 * u} angle={-16} reveal={ease(frame, 10, 80, [0, 1])} fade="start" />
          <Texture opacity={0.04} />
          <div style={rise(frame, 0, u, 24, 30)}>
            <Lockup x={cx - logoW / 2} y={HERO_LOGO.cy * u} width={logoW} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: headTop, display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative", height: lineH }}>
              <GlassGlide p={interpolate(frame, [26, 26 + 100], [0, 1], clamp)} u={u} width={1500 * u} height={lineH} />
              <MaskLine p={line(frame, 6, Infinity, 34)}>
                <div style={{ fontFamily: SORA, fontWeight: 500, fontSize: 132 * u, lineHeight: `${lineH}px`, color: C.ink, whiteSpace: "nowrap" }}>{HEADLINE}</div>
              </MaskLine>
            </div>
          </div>
          <div style={{ position: "absolute", left: cx - (HERO.cardW * u) / 2, top: HERO.cardTop * u, ...rise(frame, 22, u, 50, 40) }}>
            <PromptCard u={u} t={t} text={PROMPT} cursor={Math.floor(frame / 16) % 2 === 0} ring={1} />
          </div>
        </Wrapped>
      </AbsoluteFill>

      {/* The footer, one screen below. */}
      <AbsoluteFill style={{ transform: `translateY(${(1 - scroll) * height}px)`, backgroundColor: C.white }}>
        <div style={{ position: "absolute", left: cx - (footW * letters) / 2, top: cy - (footH + 100 * u) / 2 }}>
          <FooterWordmark width={footW} p={colour} />
          <div style={{ width: footW * letters, marginTop: 56 * u, textAlign: "center", fontFamily: INTER, fontWeight: 500, fontSize: TYPE.kicker * 1.2 * u, color: C.muted, ...rise(frame, SCROLL + 50, u, 16, 30) }}>prisma.io</div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
