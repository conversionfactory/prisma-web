import React from "react";
import { AbsoluteFill, Img, staticFile, useVideoConfig } from "remotion";
import { C, RAY_BANDS, SORA, SPECTRUM } from "../theme";

// Brand grain, as the site uses it: 0.06 multiply on colour-washed panels.
// Never over photography or mockups.
export const Texture: React.FC<{ opacity?: number }> = ({ opacity = 0.06 }) => (
  <Img
    src={staticFile("brand/texture.jpg")}
    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity, mixBlendMode: "multiply", pointerEvents: "none" }}
  />
);

// The hero / CTA "spectral bottom": a three-hue wash hugging the bottom
// edge plus a fan of soft beams, dispersing to clean white above
// (hero-home.tsx, cta-burst.tsx). It stays in the lower third so copy
// always sits on white. `rise` 0..1 blooms it in; `t` (seconds) keeps it alive.
export const SpectralBottom: React.FC<{ u: number; rise?: number; t: number; strength?: number }> = ({ u, rise = 1, t, strength = 1 }) => {
  const sway = (p: number) => Math.sin(t * 0.6 + p) * 3;
  const beam = (left: string, w: number, h: number, angle: number, color: string, blur: number, p: number): React.CSSProperties => ({
    position: "absolute",
    bottom: -h * 0.45 * u,
    left,
    width: w * u,
    height: h * u * (0.5 + 0.5 * rise),
    transformOrigin: "50% 100%",
    transform: `translateX(-50%) rotate(${angle + sway(p)}deg)`,
    background: color,
    filter: `blur(${blur * u}px)`,
    opacity: 0.42 * rise * strength,
  });
  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: "-20%",
          right: "-20%",
          bottom: `${-30 + (1 - rise) * -30}%`,
          height: "75%",
          opacity: strength * rise,
          background: [
            `radial-gradient(42% 60% at ${24 + sway(0)}% 100%, color-mix(in srgb, ${C.cyan400} 30%, transparent), transparent 70%)`,
            `radial-gradient(32% 46% at ${51 + sway(2)}% 100%, color-mix(in srgb, ${C.yellow300} 22%, transparent), transparent 66%)`,
            `radial-gradient(40% 58% at ${78 + sway(4)}% 100%, color-mix(in srgb, ${C.red400} 26%, transparent), transparent 70%)`,
          ].join(","),
        }}
      />
      <div style={beam("22%", 220, 820, -26, C.cyan300, 90, 0)} />
      <div style={beam("50%", 170, 860, 4, C.yellow200, 80, 2)} />
      <div style={beam("78%", 220, 820, 26, C.red300, 90, 4)} />
    </AbsoluteFill>
  );
};

// The wrapped panel: content sits in a rounded, hairline-bordered panel
// inset from the frame, on a white page. Children are laid out in frame
// coordinates; the panel only clips them.
export const Wrapped: React.FC<{ u: number; inset?: number; background?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({
  u,
  inset = 28,
  background = C.paper,
  children,
  style,
}) => {
  const { width, height } = useVideoConfig();
  return (
  <AbsoluteFill style={{ backgroundColor: C.white }}>
    <div
      style={{
        position: "absolute",
        inset: inset * u,
        borderRadius: 32 * u,
        border: `${1.5 * u}px solid ${C.border}`,
        overflow: "hidden",
        background,
        ...style,
      }}
    >
      <div style={{ position: "absolute", left: -inset * u - 1.5 * u, top: -inset * u - 1.5 * u, width, height }}>{children}</div>
    </div>
  </AbsoluteFill>
  );
};

// White card: hairline border, the site's soft drop shadow.
export const Card: React.FC<{ u: number; style?: React.CSSProperties; children?: React.ReactNode; radius?: number }> = ({ u, style, children, radius = 24 }) => (
  <div
    style={{
      position: "relative",
      background: C.white,
      borderRadius: radius * u,
      border: `${1.5 * u}px solid ${C.border}`,
      boxShadow: `0 ${16 * u}px ${42 * u}px -${18 * u}px rgba(21,21,21,0.22)`,
      overflow: "hidden",
      ...style,
    }}
  >
    {children}
  </div>
);

// The spectrum ring: the brand gradient sliding along a 1px border
// (.spectrum-border-on). `t` in seconds; one loop every 2.5s like the site.
export const SpectrumRing: React.FC<{ u: number; t: number; radius: number; width?: number; opacity?: number; glow?: number }> = ({
  u,
  t,
  radius,
  width = 2,
  opacity = 1,
  glow = 0,
}) => {
  const pos = ((t / 2.5) % 1) * 200;
  const ring: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: radius,
    padding: width * u,
    backgroundImage: "linear-gradient(85deg, #01d7e4, #f3c306, #f37a03, #f43531, #f00e5c, #01d7e4)",
    backgroundSize: "200% 100%",
    backgroundPosition: `${pos}% 50%`,
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    pointerEvents: "none",
  };
  return (
    <>
      {glow > 0 ? <div style={{ ...ring, inset: -6 * u, padding: 10 * u, filter: `blur(${18 * u}px)`, opacity: glow * opacity }} /> : null}
      <div style={{ ...ring, opacity }} />
    </>
  );
};

// Glass glide: a feathered pocket of white light with a faint prism
// dispersion, passing behind a headline (glass-glide.tsx). `p` 0..1 is the
// pass, the light lives behind the text.
export const GlassGlide: React.FC<{ p: number; u: number; width: number; height: number }> = ({ p, u, width, height }) => {
  const opacity = p <= 0 || p >= 1 ? 0 : Math.min(1, p * 6, (1 - p) * 4);
  const w = width * 0.42;
  return (
    <div style={{ position: "absolute", top: -0.35 * height, height: height * 1.7, width: w, left: -0.2 * width + p * width, opacity, pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: "6%", right: "6%", top: "18%", bottom: "18%", borderRadius: 999, background: "rgba(0,0,0,0.07)", filter: `blur(${40 * u}px)` }} />
      <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "rgba(255,255,255,0.8)", filter: `blur(${24 * u}px)` }} />
      <div style={{ position: "absolute", left: "8%", right: "8%", top: "20%", height: "60%", borderRadius: 999, opacity: 0.4, filter: `blur(${40 * u}px)`, backgroundImage: SPECTRUM() }} />
    </div>
  );
};

// prism-ray.tsx: the triple-band ray, with the site's intensity presets and
// end fades. `reveal` 0..1 sweeps the mask in from the right like the hero.
export const SiteRay: React.FC<{
  x: number;
  y: number;
  length: number;
  thickness: number;
  angle?: number;
  intensity?: "whisper" | "structural" | "hero";
  reveal?: number;
  fade?: "both" | "start" | "end" | "none";
}> = ({ x, y, length, thickness, angle = -16, intensity = "hero", reveal = 1, fade = "both" }) => {
  const I = { whisper: { opacity: 0.3, blur: 3 }, structural: { opacity: 0.6, blur: 1 }, hero: { opacity: 0.9, blur: 0.5 } }[intensity];
  const fades = {
    both: "linear-gradient(to right, transparent 2%, black 18%, black 82%, transparent 98%)",
    start: "linear-gradient(to right, transparent 2%, black 22%)",
    end: "linear-gradient(to right, black 78%, transparent 98%)",
    none: "linear-gradient(black, black)",
  }[fade];
  const sweep = `linear-gradient(to right, transparent ${(1 - reveal) * 100}%, black ${(1 - reveal) * 100 + 8}%)`;
  return (
    <div
      style={{
        position: "absolute",
        left: x - length / 2,
        top: y - thickness / 2,
        width: length,
        height: thickness,
        transform: `rotate(${angle}deg)`,
        opacity: I.opacity,
        filter: `blur(${I.blur}px)`,
        background: RAY_BANDS(),
        maskImage: `${fades}, ${sweep}`,
        WebkitMaskImage: `${fades}, ${sweep}`,
        maskComposite: "intersect",
        WebkitMaskComposite: "source-in",
      }}
    />
  );
};

// Product role kicker: the colour lives in the dot, the label stays ink.
export const RoleKicker: React.FC<{ u: number; color: string; size?: number; children: React.ReactNode }> = ({ u, color, size = 22, children }) => (
  <div style={{ display: "flex", alignItems: "center", gap: size * 0.45 * u, fontFamily: SORA, fontWeight: 500, fontSize: size * u, color: "rgba(58,59,60,0.7)" }}>
    <span style={{ width: size * 0.45 * u, height: size * 0.45 * u, borderRadius: 999, background: color }} />
    {children}
  </div>
);

// The footer wordmark (animated-wordmark.tsx): solid letters, with the prism
// stripes and trailing rays clipped in from the right. `p` 0..1.
export const FooterWordmark: React.FC<{ width: number; p: number }> = ({ width, p }) => {
  const height = width * (158 / 725);
  return (
    <div style={{ position: "relative", width, height }}>
      <Img src={staticFile("logo/prisma-footer-black.svg")} style={{ position: "absolute", inset: 0, width, height }} />
      <Img src={staticFile("logo/prisma-footer-color.svg")} style={{ position: "absolute", inset: 0, width, height, clipPath: `inset(0 0 0 ${(1 - p) * 100}%)` }} />
    </div>
  );
};

// Full-frame transition: the three ray bands sweep across on the site's
// -16deg angle and cover the frame at p = 0.5, so the cut hides under them.
export const RayWipe: React.FC<{ p: number; u: number; angle?: number }> = ({ p, u, angle = -16 }) => {
  const { width, height } = useVideoConfig();
  if (p <= 0 || p >= 1) return null;
  const rad = (Math.abs(angle) * Math.PI) / 180;
  const extent = width * Math.sin(rad) + height * Math.cos(rad);
  const band = (extent / 3) * 1.18;
  const travel = extent / 2 + band * 1.5 + 40 * u;
  const colors = [C.cyan400, C.yellow300, C.red500];
  return (
    <AbsoluteFill style={{ overflow: "hidden", pointerEvents: "none" }}>
      <div style={{ position: "absolute", left: width / 2, top: height / 2, transform: `rotate(${angle}deg)` }}>
        {colors.map((color, i) => {
          const y = travel - p * travel * 2 + (i - 1) * band;
          return (
            <div
              key={color}
              style={{
                position: "absolute",
                left: -width * 1.5,
                width: width * 3,
                top: y - band / 2 - 1,
                height: band + 2,
                background: color,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
