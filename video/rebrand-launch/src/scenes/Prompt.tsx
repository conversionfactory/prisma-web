import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Lockup } from "../components/Marks";
import { MaskLine, TYPE } from "../components/Type";
import { HERO_LOGO, useLayout } from "../components/layout";
import { GLIDE, clamp, ease, line, punch, rise } from "../components/motion";
import { Card, GlassGlide, SiteRay, SpectralBottom, SpectrumRing, Texture, Wrapped } from "../site/Surfaces";
import { BAR, BEAT, C, INTER, SORA, SPECTRUM } from "../theme";
import { REVEAL_LOCKUP } from "./Reveal";

// The site's H1, and the M-07 prompt.
const H1 = ["Your TypeScript app, from", "prompt to production"];
export const PROMPT = "Build me a booking app for my yoga studio";

const LOGO_MOVE = 34;
const TYPE_START = 50;
const TYPE_END = 140;
const SEND = BAR + BEAT * 2;

// Hero geometry, 1920 grid. Shared with the end card so the two bookend.
export const HERO = { h1Top: 292, lineH: 128, cardTop: 636, cardW: 1160, cardH: 132 };

// Bars 5-6: the homepage hero. On the downbeat the lockup lifts into its
// slot above the headline, the H1 slides up line by line, the prompt types
// and sends, and the camera leans in towards the card before the ray wipe.
export const Prompt: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { width, height, cx, cy, u } = useLayout();
  const t = frame / fps;

  const move = ease(frame, 0, LOGO_MOVE, [0, 1], GLIDE);
  const logoW = (REVEAL_LOCKUP + (HERO_LOGO.width - REVEAL_LOCKUP) * move) * u;
  const logoY = cy + (HERO_LOGO.cy * u - cy) * move;

  const chars = Math.floor(interpolate(frame, [TYPE_START, TYPE_END], [0, PROMPT.length], clamp));
  const cursorOn = (frame >= TYPE_START && frame < TYPE_END) || Math.floor(frame / 16) % 2 === 0;
  const press = punch(frame, [SEND], 16);
  const sent = ease(frame, SEND, SEND + 20, [0, 1]);
  const lean = ease(frame, SEND - 10, BAR * 2, [1, 1.06], GLIDE);

  const cardW = HERO.cardW * u;
  const cardH = HERO.cardH * u;

  return (
    <Wrapped u={u}>
      <SpectralBottom u={u} t={t} />
      <SiteRay x={width - 300 * u} y={height - 150 * u} length={1500 * u} thickness={140 * u} angle={-16} reveal={ease(frame, 20, 100, [0, 1])} fade="start" />
      <Texture opacity={0.04} />

      <AbsoluteFill style={{ transform: `scale(${lean})`, transformOrigin: `${cx}px ${(HERO.cardTop + HERO.cardH / 2) * u}px` }}>
        <Lockup x={cx - logoW / 2} y={logoY} width={logoW} />

        <div style={{ position: "absolute", left: 0, right: 0, top: HERO.h1Top * u, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {H1.map((text, i) => (
            <div key={text} style={{ position: "relative", height: HERO.lineH * u }}>
              {i === 1 ? <GlassGlide p={interpolate(frame, [52, 52 + BAR * 0.9], [0, 1], clamp)} u={u} width={1100 * u} height={HERO.lineH * u} /> : null}
              <MaskLine p={line(frame, 16 + i * 6, Infinity, 32)}>
                <div style={{ fontFamily: SORA, fontWeight: 500, fontSize: TYPE.h1 * u, lineHeight: `${HERO.lineH * u}px`, color: C.ink, whiteSpace: "nowrap" }}>{text}</div>
              </MaskLine>
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", left: cx - cardW / 2, top: HERO.cardTop * u, width: cardW, ...rise(frame, 34, u, 60, 40) }}>
          <PromptCard u={u} t={t} text={PROMPT.slice(0, chars)} cursor={cursorOn} ring={ease(frame, TYPE_START - 10, TYPE_START + 10, [0, 1])} press={press} glow={sent} />
        </div>
      </AbsoluteFill>
    </Wrapped>
  );
};

// The hero prompt card with the site's primary send button.
export const PromptCard: React.FC<{ u: number; t: number; text: string; cursor: boolean; ring: number; press?: number; glow?: number }> = ({
  u,
  t,
  text,
  cursor,
  ring,
  press = 0,
  glow = 0,
}) => (
  <div style={{ position: "relative" }}>
    <div style={{ position: "absolute", inset: -24 * u, borderRadius: 52 * u, backgroundImage: SPECTRUM(), filter: `blur(${40 * u}px)`, opacity: glow * 0.35 + press * 0.3 }} />
    <Card u={u} radius={30} style={{ width: HERO.cardW * u, height: HERO.cardH * u, display: "flex", alignItems: "center", padding: `0 ${24 * u}px 0 ${48 * u}px`, boxSizing: "border-box" }}>
      <SpectrumRing u={u} t={t} radius={30 * u} width={2} opacity={ring} />
      <div style={{ flex: 1, fontFamily: INTER, fontWeight: 400, fontSize: TYPE.body * u, color: C.text, whiteSpace: "pre", display: "flex", alignItems: "center" }}>
        {text}
        <span style={{ display: "inline-block", width: 3 * u, height: 48 * u, marginLeft: 4 * u, background: C.ink, opacity: cursor ? 1 : 0 }} />
      </div>
      <div style={{ position: "relative", width: 84 * u, height: 84 * u }}>
        <div style={{ position: "absolute", inset: -8 * u, borderRadius: 999, backgroundImage: SPECTRUM(), filter: `blur(${12 * u}px)`, opacity: 0.45 + press * 0.55 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 999,
            background: C.ink,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${1 - press * 0.14})`,
          }}
        >
          <svg width={36 * u} height={36 * u} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      </div>
    </Card>
  </div>
);
