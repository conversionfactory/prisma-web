import React from "react";
import { AbsoluteFill, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Photo } from "../components/Ground";
import { Glint } from "../components/Glint";
import { useLayout } from "../components/layout";
import { GLIDE, LEAVE, clamp, ease, punch } from "../components/motion";
import { Card, SpectralBottom, Wrapped } from "../site/Surfaces";
import { BAR, BEAT, C } from "../theme";

// Bars 14-17, one look per bar: the print paints on, the merch runs as a
// tilted marquee, the tote in the wild scrolls up into the Builder's Day
// card, then two pieces side by side and a push into Prismo's crossed rays.
export const Merch: React.FC = () => {
  const frame = useCurrentFrame();
  if (frame < BAR) return <Print frame={frame} />;
  if (frame < BAR * 2) return <Marquee frame={frame - BAR} />;
  if (frame < BAR * 3) return <InTheWild frame={frame - BAR * 2} />;
  return <Pair frame={frame - BAR * 3} />;
};

const Print: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const { cx, cy, height, u } = useLayout();
  const size = height * 0.98;
  const wipe = ease(frame, 0, BEAT + 6, [0, 1]);
  const p = punch(frame, [BEAT, BEAT * 2, BEAT * 3], 10);
  const zoom = interpolate(frame, [0, BAR], [0.96, 1.08], clamp);
  const mask = `linear-gradient(45deg, black ${wipe * 120 - 20}%, transparent ${wipe * 120}%)`;
  return (
    <Wrapped u={u} background={C.white}>
      <SpectralBottom u={u} t={frame / fps} rise={ease(frame, 0, 40, [0, 0.7])} strength={0.6} />
      <Img
        src={staticFile("figma/prisma-print.svg")}
        style={{
          position: "absolute",
          width: size,
          height: size,
          left: cx - size / 2,
          top: cy - size / 2,
          transform: `scale(${zoom + p * 0.025})`,
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      <Glint x={cx + 210 * u} y={cy - 260 * u} size={130 * u} intensity={interpolate(frame, [BEAT, BEAT + 6, BEAT + 40], [0, 1, 0], clamp)} />
      <Glint x={cx - 290 * u} y={cy + 230 * u} size={100 * u} intensity={interpolate(frame, [BEAT * 2, BEAT * 2 + 6, BEAT * 2 + 40], [0, 1, 0], clamp)} />
    </Wrapped>
  );
};

const ROWS = [
  ["figma/tee-wordmark.jpg", "figma/hoodie-stripe.jpg", "figma/tee-comet.jpg", "figma/hoodie-wordmark.jpg", "figma/tee-lines.jpg", "figma/hoodie-cross.jpg", "figma/tee-cross.jpg"],
  ["figma/hoodie-lines.jpg", "figma/tee-cross.jpg", "figma/hoodie-wordmark.jpg", "figma/tee-comet.jpg", "figma/hoodie-stripe.jpg", "figma/tee-wordmark.jpg", "figma/hoodie-cross.jpg"],
];

// Two rows on a -8deg tilt running in opposite directions, like the site
// marquee thrown off-axis. Big cards, few of them, so each piece reads.
const Marquee: React.FC<{ frame: number }> = ({ frame }) => {
  const { width, cx, cy, u } = useLayout();
  const cardW = 520 * u;
  const cardH = 600 * u;
  const gap = 36 * u;
  const pitch = cardW + gap;
  const rowLen = pitch * ROWS[0].length;
  const enter = ease(frame, 0, 30, [0, 1]);
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <AbsoluteFill style={{ transform: `rotate(-8deg) scale(${1.12 - enter * 0.04})`, transformOrigin: `${cx}px ${cy}px` }}>
        {ROWS.map((row, r) => {
          const dir = r === 0 ? -1 : 1;
          const travel = (frame * 4.2 * u + (1 - enter) * 600 * u) * dir;
          const y = cy + (r === 0 ? -cardH / 2 - gap / 2 : cardH / 2 + gap / 2);
          const offset = r === 1 ? pitch / 2 : 0;
          return row.map((src, i) => {
            const rel = (i - (row.length - 1) / 2) * pitch + travel + offset;
            const x = cx + ((((rel + rowLen / 2) % rowLen) + rowLen) % rowLen) - rowLen / 2;
            if (x < -cardW || x > width + cardW) return null;
            return (
              <div key={`${r}-${i}`} style={{ position: "absolute", left: x - cardW / 2, top: y - cardH / 2 }}>
                <Card u={u} radius={28} style={{ width: cardW, height: cardH }}>
                  <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Card>
              </div>
            );
          });
        })}
      </AbsoluteFill>
      <AbsoluteFill style={{ boxShadow: `inset 0 0 ${120 * u}px ${40 * u}px ${C.paper}` }} />
    </AbsoluteFill>
  );
};

const InTheWild: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const { height, cx, cy, u } = useLayout();
  const swap = BEAT * 2 - 10;
  const scroll = ease(frame, swap, swap + 26, [0, 1], GLIDE);

  const f = frame - swap;
  const pop = spring({ frame: f - 10, fps, config: { damping: 16, stiffness: 120 } });
  const cardW = 1240 * u;
  const cardH = cardW * (1235 / 2400);
  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      {/* The tote, full panel, scrolled up and away. */}
      <AbsoluteFill style={{ transform: `translateY(${-scroll * height * 0.35}px)` }}>
        <Wrapped u={u}>
          <Photo src="figma/totes.jpg" progress={frame / (BEAT * 2)} from={1.14} to={1.04} origin="58% 50%" />
        </Wrapped>
      </AbsoluteFill>

      {/* The CTA panel: agent-loop sky with the clouds loop, the event card on top. */}
      <AbsoluteFill style={{ transform: `translateY(${(1 - scroll) * height}px)` }}>
        <Wrapped u={u} background={`url(${staticFile("brand/agent-loop.jpg")}) center / cover`}>
          {frame >= swap - 2 ? (
            <OffthreadVideo src={staticFile("brand/cta-clouds-loop.mp4")} muted style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.85 }} />
          ) : null}
          <AbsoluteFill style={{ perspective: 1800 * u }}>
            <div
              style={{
                position: "absolute",
                left: cx - cardW / 2,
                top: cy - cardH / 2,
                opacity: Math.min(1, pop * 1.5),
                transform: `translateY(${(1 - pop) * 160 * u}px) rotateX(${(1 - pop) * 14}deg) rotateY(${interpolate(f, [0, BEAT * 2], [-4, 3], clamp)}deg)`,
              }}
            >
              <Card u={u} radius={26} style={{ width: cardW, height: cardH, boxShadow: `0 ${50 * u}px ${100 * u}px -${36 * u}px rgba(30,40,60,0.5)` }}>
                <Img src={staticFile("figma/builders-day.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </Card>
            </div>
          </AbsoluteFill>
        </Wrapped>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// The crossed-ray tee and hoodie rise in side by side, then the camera
// pushes into the hoodie's X; Prismo's scene opens on the same X.
// The hoodie's X, as a fraction of the frame.
const PAIR_FOCUS = { x: 0.725, y: 0.335 };
const Pair: React.FC<{ frame: number }> = ({ frame }) => {
  const { fps } = useVideoConfig();
  const { width, height, cx, cy, u } = useLayout();
  const cardW = 780 * u;
  const cardH = 900 * u;
  const gap = 40 * u;
  const inL = spring({ frame, fps, config: { damping: 16, stiffness: 130 } });
  const inR = spring({ frame: frame - 6, fps, config: { damping: 16, stiffness: 130 } });
  const q = interpolate(frame, [BEAT * 2, BAR], [0, 1], { ...clamp, easing: LEAVE });
  const push = 1 + q * 2.4;
  const fx = width * PAIR_FOCUS.x;
  const fy = height * PAIR_FOCUS.y;
  const cards = [
    { src: "figma/tee-cross.jpg", x: cx - gap / 2 - cardW, p: inL },
    { src: "figma/hoodie-cross.jpg", x: cx + gap / 2, p: inR },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <AbsoluteFill style={{ transform: `translate(${(cx - fx) * q}px, ${(cy - fy) * q}px) scale(${push})`, transformOrigin: `${fx}px ${fy}px` }}>
        {cards.map((c) => (
          <div key={c.src} style={{ position: "absolute", left: c.x, top: cy - cardH / 2 + (1 - c.p) * 300 * u, opacity: Math.min(1, c.p * 2) }}>
            <Card u={u} radius={30} style={{ width: cardW, height: cardH }}>
              <Img src={staticFile(c.src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Card>
          </div>
        ))}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
