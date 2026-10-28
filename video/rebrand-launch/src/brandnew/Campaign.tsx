import React from "react";
import { AbsoluteFill, Img, Still, interpolate, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Lockup } from "../components/Marks";
import { MaskLine } from "../components/Type";
import { clamp, ease, line, rise } from "../components/motion";
import { RayWipe, SiteRay, SpectralBottom, Texture } from "../site/Surfaces";
import { C, INTER, SORA } from "../theme";

// Campaign lines, verbatim: the M-07 end card and the homepage hero.
export const POSTERS = [
  { lines: ["From", "prompt", "to product."], size: 196, ground: "paper" },
  { lines: ["One", "platform,", "one stack,", "one bill"], size: 196, ground: "ink" },
  { lines: ["The ORM", "is free,", "always"], size: 226, ground: "paper" },
  { lines: ["Your", "TypeScript", "app, from", "prompt to", "production"], size: 182, ground: "ink" },
] as const;

const PW = 1200;
const PH = 1800;

// A 6-sheet-proportioned poster: the line fills the top of the sheet, the
// ray crosses the space beneath it, lockup and URL sit on the foot.
export const Poster: React.FC<{ index: number; style?: React.CSSProperties }> = ({ index, style }) => {
  const p = POSTERS[index];
  const ink = p.ground === "ink";
  return (
    <div style={{ position: "relative", width: PW, height: PH, overflow: "hidden", background: ink ? C.ink : C.paper, ...style }}>
      {!ink ? <SpectralBottom u={1} t={index} strength={0.55} /> : null}
      <SiteRay x={PW * 0.62} y={PH - 470} length={PW * 1.9} thickness={250} angle={-16} intensity="hero" fade="none" />
      {!ink ? <Texture opacity={0.05} /> : null}
      <div style={{ position: "absolute", left: 76, top: 92, fontFamily: SORA, fontWeight: 500, fontSize: p.size, lineHeight: 0.98, letterSpacing: "-0.01em", color: ink ? C.white : C.ink }}>
        {p.lines.map((l) => (
          <div key={l} style={{ whiteSpace: "nowrap" }}>
            {l}
          </div>
        ))}
      </div>
      <Img src={staticFile(ink ? "logo/white.svg" : "logo/full-color.svg")} style={{ position: "absolute", left: 80, bottom: 84, width: 300, height: 300 * (67 / 264) }} />
      <div style={{ position: "absolute", right: 80, bottom: 96, fontFamily: INTER, fontWeight: 500, fontSize: 40, color: ink ? "rgba(255,255,255,0.7)" : C.muted }}>prisma.io</div>
    </div>
  );
};

// All four posters side by side on paper, for the case study.
const PostersFourUp: React.FC = () => {
  const k = 430 / PW;
  return (
    <AbsoluteFill style={{ backgroundColor: "#ecebe4", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 30 }}>
      {POSTERS.map((_, i) => (
        <div key={i} style={{ width: PW * k, height: PH * k, boxShadow: "0 30px 60px -30px rgba(21,21,21,0.35)" }}>
          <Poster index={i} style={{ transform: `scale(${k})`, transformOrigin: "0 0" }} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

// The row of posters as one flat artwork, for the wheat-paste mockup.
const PosterStrip: React.FC = () => (
  <AbsoluteFill style={{ flexDirection: "row", backgroundColor: C.white }}>
    {POSTERS.map((_, i) => (
      <Poster key={i} index={i} />
    ))}
  </AbsoluteFill>
);

// Prismo's nine expressions on the three ray colours, as a system grid.
const MOODS = ["salute", "happy", "laughing", "thinking", "surprised", "relieved", "laughing-tears", "annoyed", "sad"];
const TINTS = ["#d6f6f8", "#fbecc0", "#ffd9db"];
const PrismoGrid: React.FC = () => {
  const tile = 330;
  const gap = 14;
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper, alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: `repeat(3, ${tile}px)`, gap }}>
        {MOODS.map((m, i) => (
          <div key={m} style={{ width: tile, height: tile, borderRadius: 26, background: TINTS[(i + Math.floor(i / 3)) % 3], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Img src={staticFile(`mascot/${m}.png`)} style={{ width: tile * 0.86, height: tile * 0.86, filter: "drop-shadow(0 16px 20px rgba(21,21,21,0.14))" }} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const CampaignStills: React.FC = () => (
  <>
    {POSTERS.map((_, i) => (
      <Still key={i} id={`CP-poster-${i + 1}`} component={() => <Poster index={i} />} width={PW} height={PH} />
    ))}
    <Still id="BN-posters" component={PostersFourUp} width={2000} height={1125} />
    <Still id="FL-poster-strip" component={PosterStrip} width={PW * 4} height={PH} />
    <Still id="BN-prismo-grid" component={PrismoGrid} width={2000} height={1125} />
  </>
);

// ---- The campaign lines as kinetic type: each line takes the frame in
// turn, the ray wipes between them, and the lockup closes. ----

const CARD = 150;
const WIPE = 26;
export const CAMPAIGN_FRAMES = CARD * POSTERS.length + 150;

const KineticCard: React.FC<{ index: number; frame: number }> = ({ index, frame }) => {
  const { width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);
  const p = POSTERS[index];
  const ink = p.ground === "ink";
  const size = (p.lines.length > 3 ? 168 : 200) * u;
  return (
    <AbsoluteFill style={{ backgroundColor: ink ? C.ink : C.paper }}>
      {!ink ? <SpectralBottom u={u} t={frame / 60 + index} strength={0.5} /> : null}
      <SiteRay x={width * 0.7} y={height - 150 * u} length={width * 1.2} thickness={180 * u} angle={-16} intensity="hero" fade="start" reveal={ease(frame, 10, 70, [0, 1])} />
      {!ink ? <Texture opacity={0.05} /> : null}
      <div style={{ position: "absolute", left: 120 * u, top: 100 * u, fontFamily: SORA, fontWeight: 500, fontSize: size, lineHeight: 1.0, letterSpacing: "-0.01em", color: ink ? C.white : C.ink }}>
        {p.lines.map((l, i) => (
          <MaskLine key={l} p={line(frame, 4 + i * 6, Infinity, 30)}>
            <div style={{ whiteSpace: "nowrap" }}>{l}</div>
          </MaskLine>
        ))}
      </div>
    </AbsoluteFill>
  );
};

export const CampaignFilm: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const u = Math.min(width / 1920, height / 1080);
  const i = Math.min(POSTERS.length, Math.floor(frame / CARD));
  const local = frame - i * CARD;
  // Wipes centred on each cut, including the cut to the closing lockup.
  const cut = Math.round(frame / CARD) * CARD;
  const wipe = cut > 0 && cut <= CARD * POSTERS.length ? interpolate(frame, [cut - WIPE, cut + WIPE], [0, 1], clamp) : 0;
  const lockW = 900 * u;
  return (
    <AbsoluteFill>
      {i < POSTERS.length ? (
        <KineticCard index={i} frame={local} />
      ) : (
        <AbsoluteFill style={{ backgroundColor: C.paper }}>
          <SpectralBottom u={u} t={frame / 60} rise={ease(local, 0, 60, [0, 1])} />
          <Texture opacity={0.04} />
          <div style={rise(local, 16, u, 30, 36)}>
            <Lockup x={(width - lockW) / 2} y={height / 2} width={lockW} />
          </div>
        </AbsoluteFill>
      )}
      <RayWipe p={wipe} u={u} />
    </AbsoluteFill>
  );
};
