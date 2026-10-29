import React from "react";
import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { Lockup } from "../components/Marks";
import { GLIDE, LEAVE, RISE, clamp, ease } from "../components/motion";
import { C, INTER, SORA } from "../theme";
import { LED_101, LED_GB } from "./bentoLed";
import { LoopDiagram } from "./home/AgentLoop";
import { ConsoleIllustration } from "./home/ConsoleIllustration";

// The bento from Figma (Prisma Collateral, node 1041:21139), brought to life
// tile by tile the way Studio Kiln's Reset grid moves: every tile keeps its
// layout and does one thing, on a seamless 14s loop. Geometry is the Figma
// frame's, in 1920x1080 px. The agent loop and console are the homepage's
// own animated components; carousel page 1 and the globe are Figma exports;
// everything else is rebuilt here.

// 14s, the homepage agent loop's orbit.
export const BENTO_FRAMES = 840;

loadInter("normal", { weights: ["400", "500", "600"], subsets: ["latin"] });
const { fontFamily: MONO } = loadMono("normal", { weights: ["400"], subsets: ["latin"] });
// Installed locally (PP Neue Machina is a licensed face, so it isn't bundled).
const MACHINA = "'PP Neue Machina Inktrap', 'PP Neue Machina', sans-serif";

const COL = 613.333;
const COLS = [20, 653.333, 1286.667];
const loop = (f: number, period = BENTO_FRAMES) => (2 * Math.PI * f) / period;
const img = (name: string) => staticFile(`bento/${name}`);

const Tile: React.FC<{ x: number; y: number; h: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x, y, h, style, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: COL, height: h, borderRadius: 20, overflow: "hidden", ...style }}>{children}</div>
);

const Abs: React.FC<{ x: number; y: number; w?: number; h?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ x, y, w, h, style, children }) => (
  <div style={{ position: "absolute", left: x, top: y, width: w, height: h, ...style }}>{children}</div>
);

const Texture: React.FC<{ src: string; opacity: number; blend?: React.CSSProperties["mixBlendMode"] }> = ({ src, opacity, blend }) => (
  <Img src={img(src)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity, mixBlendMode: blend }} />
);

// ---- Logo: the lockup on paper. Once a loop the bands part and close. ----

const LogoTile: React.FC<{ f: number }> = ({ f }) => {
  const part = interpolate(f, [330, 362, 384, 430], [1, 0.9, 0.9, 1], { ...clamp, easing: GLIDE });
  const w = 385.417;
  return (
    <Tile x={COLS[0]} y={20} h={312} style={{ background: C.white }}>
      <Texture src="logo-texture.png" opacity={0.06} />
      <Lockup x={(COL - w) / 2} y={156} width={w} assemble={part} fly={46} />
    </Tile>
  );
};

// ---- Globe: the co-located regions ping in turn, LIVE pulses, and a pass
// of light runs along the ray. ----

const REGIONS = [
  { pin: "pin-sf.svg", code: "SF01", name: "San Francisco", color: "#d8ac01", w: 100.87 },
  { pin: "pin-iad.svg", code: "IAD1", name: "Washington", color: "#f00e5c", w: 88.87 },
  { pin: "pin-fra.svg", code: "FRA1", name: "Frankfurt", color: "#01d7e4", w: 74.87 },
  { pin: "pin-sin.svg", code: "sin1", name: "Singapore", color: "#f43531", w: 80.87 },
];

const Caps: React.FC<{ children: React.ReactNode; color?: string; size?: number; upper?: boolean; width?: number }> = ({ children, color = "#000", size = 12.075, upper = true, width }) => (
  <span style={{ fontFamily: MACHINA, fontSize: size, lineHeight: 1, color, textTransform: upper ? "uppercase" : undefined, whiteSpace: "nowrap", width }}>{children}</span>
);

const GlobeTile: React.FC<{ f: number }> = ({ f }) => {
  const live = 0.45 + 0.55 * (0.5 + 0.5 * Math.cos(loop(f, 60)));
  const float = Math.sin(loop(f)) * 4;
  const sweep = interpolate(f % 420, [40, 200], [-0.35, 1.35], { ...clamp, easing: GLIDE });
  const earthMask = `url(${img("earth.png")})`;
  return (
    <Tile x={COLS[0]} y={352} h={708} style={{ background: C.white }}>
      <Img src={img("globe-pattern@2x.png")} style={{ position: "absolute", left: 0, top: 0, width: 613.5, height: 442 }} />

      {/* "earth 1": the transparent source in Figma's crop (fitted against its export). */}
      <Abs x={-324.168} y={140.709 + float} w={1261.67} h={412.476} style={{ overflow: "hidden" }}>
        <Img src={img("earth.png")} style={{ position: "absolute", left: -5, top: -168, width: 1270, height: 719.7 }} />
        {/* Light running along the ray, clipped to the artwork. */}
        <div style={{ position: "absolute", inset: 0, maskImage: earthMask, WebkitMaskImage: earthMask, maskSize: "100% 100%", WebkitMaskSize: "100% 100%", mixBlendMode: "screen" }}>
          <div
            style={{
              position: "absolute",
              top: -100,
              bottom: -100,
              left: `${sweep * 100}%`,
              width: 140,
              marginLeft: -70,
              transform: "rotate(22deg)",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)",
              filter: "blur(10px)",
            }}
          />
        </div>
      </Abs>
      <div style={{ position: "absolute", inset: 0, borderRadius: 20, border: "1px solid #cccccc", pointerEvents: "none" }} />

      <Abs x={30.187} y={30.94} w={552.959} h={9} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7.547 }}>
          <Caps width={61.884}>Compute</Caps>
          <Img src={img("globe-live-sep.svg")} style={{ width: 5.82, height: 5.82 }} />
          <Caps>Prisma Postgres</Caps>
          <Img src={img("globe-dot.svg")} style={{ width: 3.019, height: 3.019 }} />
          <Caps>Co-Located</Caps>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6.037 }}>
          <span style={{ position: "relative", width: 4.887, height: 4.887 }}>
            <Img src={img("globe-live.svg")} style={{ position: "absolute", left: -2.113, top: -2.113, width: 9.113, height: 9.113, opacity: live }} />
          </span>
          <Caps>Live</Caps>
        </div>
      </Abs>

      <Abs x={37.523} y={654.707} w={538.287} h={23.106} style={{ display: "flex", gap: 32.135, alignItems: "flex-start" }}>
        {REGIONS.map((r, i) => {
          const t = (f - i * 210 + BENTO_FRAMES) % BENTO_FRAMES;
          const ping = t < 70 ? t / 70 : 0;
          return (
            <React.Fragment key={r.code}>
              {i > 0 ? <Img src={img("globe-divider.svg")} style={{ width: 1.17, height: 23.106, marginLeft: -0.585, marginRight: -0.585 }} /> : null}
              <div style={{ display: "flex", alignItems: "center", gap: 3.553, width: r.w }}>
                <span style={{ position: "relative", width: 21.317, height: 21.317, flexShrink: 0 }}>
                  {ping > 0 ? (
                    <span
                      style={{
                        position: "absolute",
                        left: 10.66 - 4 - ping * 10,
                        top: 9 - 4 - ping * 10,
                        width: 8 + ping * 20,
                        height: 8 + ping * 20,
                        borderRadius: 99,
                        border: `1.2px solid ${r.color}`,
                        opacity: (1 - ping) * 0.9,
                      }}
                    />
                  ) : null}
                  <Img src={img(r.pin)} style={{ position: "absolute", inset: 0, width: 21.317, height: 21.317 }} />
                </span>
                <span style={{ display: "flex", flexDirection: "column", gap: 4.45 }}>
                  <Caps size={10.659} color={r.color}>
                    {r.code}
                  </Caps>
                  <Caps size={10.659} upper={false}>
                    {r.name}
                  </Caps>
                </span>
              </div>
            </React.Fragment>
          );
        })}
      </Abs>
    </Tile>
  );
};

// ---- Agent: the homepage's agent loop (agent-loop.tsx), on the bento's sky. ----

const AgentTile: React.FC<{ f: number; t: number }> = ({ f, t }) => {
  const drift = 1.02 + Math.sin(loop(f)) * 0.02;
  return (
    <Tile x={COLS[1]} y={20} h={715} style={{ background: "#5e4444" }}>
      <Img src={img("agent-sky.png")} style={{ position: "absolute", left: "-17.5%", top: "-35%", width: "135%", height: "135%", transform: `scale(${drift})` }} />
      <Abs x={(COL - 594) / 2} y={(715 - 594) / 2}>
        <LoopDiagram t={t} size={594} />
      </Abs>
    </Tile>
  );
};

// ---- Storage: the LED lights column by column as the bar fills, holds,
// and powers down for the loop. ----

const LED_ON = [24, 120];
const LED_OFF = [784, 828];

const LedGrid: React.FC<{ grid: typeof LED_101; x: number; y: number; offset: number; span: number; f: number }> = ({ grid, x, y, offset, span, f }) => (
  <svg width={grid.w} height={grid.h} viewBox={`0 0 ${grid.w} ${grid.h}`} style={{ position: "absolute", left: x, top: y, overflow: "visible" }}>
    {grid.dots.map(([cx, cy, r, fill], i) => {
      if (!fill) return <circle key={i} cx={cx} cy={cy} r={r} fill="#ffffff" fillOpacity={0.06} />;
      const at = (offset + cx) / span;
      const on = ease(f, LED_ON[0] + at * (LED_ON[1] - LED_ON[0] - 12), LED_ON[0] + at * (LED_ON[1] - LED_ON[0] - 12) + 12, [0, 1], RISE);
      const off = ease(f, LED_OFF[0] + at * 24, LED_OFF[0] + at * 24 + 16, [0, 1], LEAVE);
      const v = on * (1 - off);
      return (
        <g key={i}>
          <circle cx={cx} cy={cy} r={r} fill="#ffffff" fillOpacity={0.06 * (1 - v)} />
          <circle cx={cx} cy={cy} r={r} fill={fill} opacity={v * 0.55} style={{ filter: `blur(${r * 0.6}px)` }} />
          <circle cx={cx} cy={cy} r={r} fill={fill} opacity={v} />
        </g>
      );
    })}
  </svg>
);

const LedTile: React.FC<{ f: number }> = ({ f }) => {
  const span = 348.81 + LED_GB.w - 59.34;
  const fill = ease(f, LED_ON[0], LED_ON[1] + 20, [0, 1], GLIDE) * (1 - ease(f, LED_OFF[0], LED_OFF[1], [0, 1], GLIDE));
  const label: React.CSSProperties = { position: "absolute", top: 253.94, fontFamily: INTER, fontWeight: 500, fontSize: 8.911, color: "rgba(255,255,255,0.5)", whiteSpace: "nowrap" };
  return (
    <Tile x={COLS[1]} y={755} h={305} style={{ background: "#121212" }}>
      <Img src={img("led-wash-1.svg")} style={{ position: "absolute", left: -53.76, top: -6.75, width: 514.078, height: 315.301 }} />
      <Img src={img("led-wash-2.svg")} style={{ position: "absolute", left: 269.52, top: 115.48, width: 397.58, height: 246.76 }} />
      <Abs x={59.34} y={35.32} w={65.117} h={16.526}>
        <Lockup x={0} y={0} width={65.117} mono={{ src: "logo/white.svg" }} />
      </Abs>
      <span style={{ position: "absolute", left: 59.34, top: 67.27, fontFamily: INTER, fontWeight: 500, fontSize: 13.023, color: "rgba(255,255,255,0.6)", whiteSpace: "pre" }}>{"Free plan  ·  storage"}</span>

      <LedGrid grid={LED_101} x={59.34} y={89.2} offset={0} span={span} f={f} />
      <LedGrid grid={LED_GB} x={348.81} y={132.16} offset={348.81 - 59.34} span={span} f={f} />

      <div style={{ position: "absolute", left: 59.34, top: 238.86, width: 488.945, height: 7.54, borderRadius: 3.77, background: "rgba(255,255,255,0.1)" }} />
      <div style={{ position: "absolute", left: 59.34, top: 238.86, width: 411.529, height: 7.54, borderRadius: 3.77, overflow: "hidden", clipPath: `inset(0 ${(1 - fill) * 100}% 0 0 round 3.77px)` }}>
        <div style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #01d7e4, #f3c306 50%, #f34a60)" }} />
      </div>
      <div style={{ position: "absolute", left: 262.72, top: 234.74, width: 0.685, height: 15.765, background: "rgba(255,255,255,0.35)" }} />
      <div style={{ position: "absolute", left: 466.45, top: 234.74, width: 0.685, height: 15.765, background: "rgba(255,255,255,0.35)" }} />
      <span style={{ ...label, left: 59.34 }}>0</span>
      <span style={{ ...label, left: 248.79 }}>0.5 GB</span>
      <span style={{ ...label, left: 457.22 }}>1 GB</span>
      <span style={{ position: "absolute", left: 458.32, top: 271.87, fontFamily: INTER, fontWeight: 600, fontSize: 10.967, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>prisma.io/pricing</span>
    </Tile>
  );
};

// ---- Console: the homepage's console illustration (console-illustration.tsx),
// at the bento's scale. ----

const CONSOLE_SCALE = 454.165 / 896;

const ConsoleTile: React.FC<{ t: number }> = ({ t }) => (
  <Tile x={COLS[2]} y={20} h={326} style={{ background: C.white }}>
    <Texture src="console-texture.png" opacity={0.06} />
    <div style={{ position: "absolute", left: (COL - 454.165) / 2, top: 32.22, transform: `scale(${CONSOLE_SCALE})`, transformOrigin: "0 0" }}>
      <ConsoleIllustration t={t} />
    </div>
  </Tile>
);

// ---- Carousel: the LinkedIn post swipes through its first three pages. ----

const PAGE = { w: 485.106, h: 606.383, gap: 35.934 };
const SWIPES = [240, 520, 800];

const Chip: React.FC<{ dot: string; children: React.ReactNode }> = ({ dot, children }) => (
  <div
    style={{
      position: "absolute",
      left: 39.53,
      top: 39.53,
      display: "flex",
      alignItems: "center",
      gap: 5.839,
      padding: "5.839px 10.511px 5.839px 9.343px",
      borderRadius: 5.839,
      background: C.white,
      border: "0.584px solid rgba(0,0,0,0.09)",
      filter: "drop-shadow(0 1.168px 1.168px rgba(21,21,21,0.06))",
    }}
  >
    <Img src={img(dot)} style={{ width: 5.839, height: 5.839 }} />
    <span style={{ fontFamily: INTER, fontWeight: 600, fontSize: 11.68, lineHeight: 1, color: C.ink, whiteSpace: "nowrap" }}>{children}</span>
  </div>
);

const Node: React.FC<{ top: number; dot: string; title: string; sub: string; accent?: boolean }> = ({ top, dot, title, sub, accent }) => (
  <div
    style={{
      position: "absolute",
      left: 39.53,
      top,
      width: 406.052,
      height: 58.392,
      borderRadius: 9.882,
      background: C.white,
      border: accent ? "0.898px solid #01d7e4" : "0.674px solid rgba(0,0,0,0.08)",
      boxShadow: "0 0.719px 2.156px 0 rgba(20,20,20,0.05), 0 8.624px 22.998px 0 rgba(20,20,20,0.07)",
      boxSizing: "border-box",
    }}
  >
    <Img src={img(dot)} style={{ position: "absolute", left: 13.7 - (accent ? 0.22 : 0), top: 16.39 - (accent ? 0.22 : 0), width: 7.187, height: 7.187 }} />
    <span style={{ position: "absolute", left: 28.07, top: 11, fontFamily: INTER, fontWeight: 600, fontSize: 14.374, color: C.ink, whiteSpace: "nowrap" }}>{title}</span>
    <span style={{ position: "absolute", left: 28.07, top: 32.56, fontFamily: MONO, fontSize: 9.882, color: C.muted, whiteSpace: "nowrap" }}>{sub}</span>
  </div>
);

const Connector: React.FC<{ top: number; h: number; from: string; to: string; arrow: string; arrowTop: number }> = ({ top, h, from, to, arrow, arrowTop }) => (
  <>
    <div style={{ position: "absolute", left: 241.65, top, width: 1.797, height: h, background: `linear-gradient(to bottom, ${from}, ${to})` }} />
    <Img src={img(arrow)} style={{ position: "absolute", left: 238.27, top: arrowTop + 1.797, width: 8.558, height: 5.39, transform: "rotate(180deg)" }} />
  </>
);

const PageFrame: React.FC<{ n: number; children: React.ReactNode }> = ({ n, children }) => (
  <div style={{ position: "relative", width: PAGE.w, height: PAGE.h, borderRadius: 10, overflow: "hidden", background: C.white, flexShrink: 0 }}>
    <Texture src="page-texture.jpg" opacity={0.04} blend="hard-light" />
    {children}
    <span style={{ position: "absolute", left: 420.2, top: 42.22, fontFamily: INTER, fontWeight: 600, fontSize: 11.678, color: C.muted, whiteSpace: "nowrap" }}>{n} / 5</span>
    <Img src={staticFile("logo/full-color.svg")} style={{ position: "absolute", left: 39.53, top: 553.35, width: 67.376, height: 17.099 }} />
    <span style={{ position: "absolute", left: 396.62, top: 555.18, fontFamily: INTER, fontWeight: 600, fontSize: 11.678, color: C.ink, whiteSpace: "nowrap" }}>Swipe →</span>
  </div>
);

const Title: React.FC<{ lines: string[] }> = ({ lines }) => (
  <div style={{ position: "absolute", left: 39.53, top: 89.83, width: 406.052, fontFamily: SORA, fontWeight: 500, fontSize: 28.747, lineHeight: 1.08, color: C.ink }}>
    {lines.map((l) => (
      <div key={l}>{l}</div>
    ))}
  </div>
);

const Small: React.FC<{ x: number; y: number; color?: string; weight?: number; size?: number; children: React.ReactNode }> = ({ x, y, color = C.muted, weight = 500, size = 10.78, children }) => (
  <span style={{ position: "absolute", left: x, top: y, fontFamily: INTER, fontWeight: weight, fontSize: size, color, whiteSpace: "nowrap" }}>{children}</span>
);

const Page1: React.FC = () => <Img src={img("page-1@2x.png")} style={{ width: PAGE.w, height: PAGE.h, borderRadius: 10, flexShrink: 0 }} />;

const Page2: React.FC = () => (
  <PageFrame n={2}>
    <Chip dot="page-dot-before.svg">Before · Prisma ORM 6</Chip>
    <Title lines={["Every query crossed from", "JavaScript into Rust."]} />
    <Node top={188.65} dot="node-dot-app.svg" title="Your app" sub="TypeScript" />
    <Connector top={247.04} h={38.629} from="#01d7e4" to="#f34a60" arrow="arrow-red.svg" arrowTop={284.78} />
    <Small x={255.13} y={262.32}>
      serialize
    </Small>
    <Img src={img("js-rust-boundary.svg")} style={{ position: "absolute", left: 26.95, top: 298.7, width: 431.206, height: 1.348 }} />
    <Small x={39.53} y={305.44} color="#f34a60" weight={600}>
      JS ↔ Rust boundary, on every query
    </Small>
    <Node top={332.39} dot="node-dot-engine.svg" title="Query engine" sub="Rust · loaded via Node-API" />
    <Connector top={390.78} h={38.629} from="#f34a60" to="#f3c306" arrow="arrow-yellow.svg" arrowTop={428.51} />
    <Small x={255.13} y={406.05}>
      SQL
    </Small>
    <Node top={444.68} dot="node-dot-db.svg" title="Database" sub="Postgres, MySQL, SQLite, …" />
  </PageFrame>
);

const Page3: React.FC = () => (
  <PageFrame n={3}>
    <Img src={img("page3-wash.svg")} style={{ position: "absolute", left: 274.0, top: -49.41, width: 332.388, height: 242.553 }} />
    <Chip dot="page-dot-cyan.svg">After · Prisma ORM 7</Chip>
    <Title lines={["No Rust engine.", "One less boundary."]} />
    <Node top={188.65} dot="node-dot-app.svg" title="Your app" sub="TypeScript" />
    <Connector top={247.04} h={38.629} from="#01d7e4" to="#01d7e4" arrow="arrow-cyan.svg" arrowTop={284.78} />
    <Node top={300.95} dot="node-dot-app.svg" title="Prisma Client" sub="no engine binary to ship" accent />
    <Connector top={359.34} h={38.629} from="#01d7e4" to="#f3c306" arrow="arrow-yellow.svg" arrowTop={397.07} />
    <Node top={413.24} dot="node-dot-db.svg" title="Driver adapter" sub="@prisma/adapter-pg, …" />
    <Connector top={471.63} h={20.662} from="#f3c306" to="#f3c306" arrow="arrow-yellow.svg" arrowTop={491.39} />
    <Small x={220.99} y={505.77} color={C.ink} weight={600} size={13.475}>
      Database
    </Small>
  </PageFrame>
);

const CarouselTile: React.FC<{ f: number }> = ({ f }) => {
  let pos = 0;
  for (const s of SWIPES) pos += ease(f, s, s + 40, [0, 1], GLIDE);
  const pages = [Page1, Page2, Page3, Page1, Page2];
  return (
    <Tile x={COLS[2]} y={366} h={694} style={{ background: "linear-gradient(131.47deg, #fff7e0 0%, #fef2d1 50%, #fcedc2 100%)" }}>
      <div style={{ position: "absolute", left: 55.333, top: 43.809, display: "flex", gap: PAGE.gap, transform: `translateX(${-pos * (PAGE.w + PAGE.gap)}px)` }}>
        {pages.map((P, i) => (
          <P key={i} />
        ))}
      </div>
    </Tile>
  );
};

export const Bento: React.FC = () => {
  const f = useCurrentFrame() % BENTO_FRAMES;
  const t = f / 60;
  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <LogoTile f={f} />
      <GlobeTile f={f} />
      <AgentTile f={f} t={t} />
      <LedTile f={f} />
      <ConsoleTile t={t} />
      <CarouselTile f={f} />
    </AbsoluteFill>
  );
};
