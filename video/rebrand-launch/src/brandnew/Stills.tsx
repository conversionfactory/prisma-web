import React from "react";
import { AbsoluteFill, Img, Still, staticFile } from "remotion";
import { DotMatrix } from "../components/DotMatrix";
import { Lockup, NewMark } from "../components/Marks";
import { FooterWordmark, SiteRay, SpectralBottom, Texture } from "../site/Surfaces";
import { PRODUCTS } from "../site/products";
import { C, INTER, SORA } from "../theme";

// Brand New publishes at 2000px wide; every case-study frame is 16:9.
const W = 2000;
const H = 1125;

// Mark fills, ink and paper, as hex.
const SWATCHES = [
  { hex: "#04D5E7", fg: C.ink },
  { hex: "#FEBE29", fg: C.ink },
  { hex: "#FE4352", fg: C.white },
  { hex: "#151515", fg: C.white },
  { hex: "#F9FAF5", fg: C.ink },
];

const Center: React.FC<{ bg?: string; children: React.ReactNode }> = ({ bg = C.white, children }) => (
  <AbsoluteFill style={{ backgroundColor: bg, alignItems: "center", justifyContent: "center" }}>{children}</AbsoluteFill>
);

// Brand New's own before/after format: white, one logo per half.
const BeforeAfter: React.FC = () => {
  const oldW = 640;
  const newW = 600;
  return (
    <AbsoluteFill style={{ backgroundColor: C.white }}>
      <div style={{ position: "absolute", left: W / 4 - oldW / 2, top: H / 2 - (oldW * (194 / 605)) / 2 }}>
        <Img src={staticFile("old/prisma-logo-indigo.svg")} style={{ width: oldW, height: oldW * (194 / 605) }} />
      </div>
      <Lockup x={(W * 3) / 4 - newW / 2} y={H / 2} width={newW} />
    </AbsoluteFill>
  );
};

const LockupHero: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.white }}>
    <Lockup x={W / 2 - 600} y={H / 2} width={1200} />
  </AbsoluteFill>
);

const MarkInk: React.FC = () => (
  <Center bg={C.ink}>
    <NewMark size={560} />
  </Center>
);

const Variations: React.FC = () => {
  const panels = [
    { bg: C.paper, src: "logo/full-color.svg", border: true },
    { bg: C.ink, src: "logo/white.svg" },
    { bg: C.white, src: "logo/black.svg", border: true },
  ];
  const gap = 24;
  const pw = (W - gap * 2 - 80 * 2) / 3;
  const ph = H - 80 * 2;
  return (
    <AbsoluteFill style={{ backgroundColor: C.white, padding: 80, flexDirection: "row", gap }}>
      {panels.map((p) => (
        <div
          key={p.bg}
          style={{
            width: pw,
            height: ph,
            borderRadius: 28,
            background: p.bg,
            border: p.border ? `2px solid ${C.border}` : undefined,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img src={staticFile(p.src)} style={{ width: 400, height: 400 * (67 / 264) }} />
        </div>
      ))}
    </AbsoluteFill>
  );
};

// The palette as light: the three ray bands crossing paper, labelled clear
// of the ray, with ink and paper alongside.
const Colour: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.paper }}>
    <SpectralBottom u={1} t={0} strength={0.5} />
    <SiteRay x={W / 2 + 120} y={760} length={W * 1.5} thickness={330} angle={-16} intensity="hero" fade="none" />
    <Texture opacity={0.05} />
    <div style={{ position: "absolute", left: 140, top: 140, display: "flex", flexDirection: "column", gap: 26 }}>
      {SWATCHES.map((s) => (
        <div key={s.hex} style={{ display: "flex", alignItems: "center", gap: 22, fontFamily: INTER, fontWeight: 500, fontSize: 34, color: C.text }}>
          <span style={{ width: 44, height: 44, borderRadius: 99, background: s.hex, border: `2px solid ${C.border}` }} />
          {s.hex}
        </div>
      ))}
    </div>
  </AbsoluteFill>
);

const Type: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.paper, padding: "120px 140px", flexDirection: "row", gap: 120 }}>
    <Texture opacity={0.05} />
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
      <div style={{ fontFamily: SORA, fontWeight: 500, fontSize: 520, lineHeight: 0.9, color: C.ink, marginLeft: -20 }}>Aa</div>
      <div style={{ display: "flex", gap: 64, fontFamily: INTER, fontSize: 30, color: C.muted }}>
        <span>Sora Medium</span>
        <span>Inter Regular</span>
      </div>
    </div>
    <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 56 }}>
      <div style={{ fontFamily: SORA, fontWeight: 500, fontSize: 132, lineHeight: 1.06, color: C.ink }}>From prompt to product.</div>
      <div style={{ fontFamily: INTER, fontWeight: 400, fontSize: 40, lineHeight: 1.6, color: C.text, maxWidth: 1000 }}>
        Give your coding agent a type-safe ORM, managed Postgres, and app hosting that work together natively.
      </div>
    </div>
  </AbsoluteFill>
);

const Prismo: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.white, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 0 }}>
    <SpectralBottom u={1} t={0} strength={0.55} />
    {["salute", "happy", "thinking", "surprised"].map((m) => (
      <Img key={m} src={staticFile(`mascot/${m}.png`)} style={{ width: 470, height: 470, position: "relative", filter: "drop-shadow(0 30px 40px rgba(21,21,21,0.16))" }} />
    ))}
  </AbsoluteFill>
);

const Objects: React.FC = () => {
  const slots = [
    { x: 560, y: 600 },
    { x: 1000, y: 580 },
    { x: 1440, y: 560 },
  ];
  return (
    <AbsoluteFill style={{ backgroundColor: C.paper }}>
      <SpectralBottom u={1} t={0} strength={0.8} />
      <SiteRay x={W / 2} y={612} length={W * 1.3} thickness={250} angle={-16} intensity="hero" fade="both" />
      <Texture opacity={0.04} />
      {PRODUCTS.map((p, i) => {
        const k = p.fit * 0.86;
        return (
          <Img
            key={p.name}
            src={staticFile(p.object)}
            style={{
              position: "absolute",
              width: p.w * k,
              height: p.h * k,
              left: slots[i].x - (p.w * k) / 2,
              top: slots[i].y - (p.h * k) / 2,
              filter: "drop-shadow(0 30px 36px rgba(0,0,0,0.2))",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Wordmark: React.FC = () => (
  <Center>
    <div style={{ marginLeft: 1640 * (1 - 0.865) }}>
      <FooterWordmark width={1640} p={1} />
    </div>
  </Center>
);

const MERCH = ["figma/hoodie-wordmark.jpg", "figma/tee-comet.jpg", "figma/hoodie-stripe.jpg", "figma/tee-cross.jpg"];
const Merch: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.paper, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 28 }}>
    {MERCH.map((src) => (
      <div key={src} style={{ width: 430, height: 520, borderRadius: 26, overflow: "hidden", background: C.white, border: `2px solid ${C.border}`, boxShadow: "0 18px 44px -20px rgba(21,21,21,0.25)" }}>
        <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    ))}
  </AbsoluteFill>
);

const PhotoFrame: React.FC<{ src: string; position?: string }> = ({ src, position = "50% 50%" }) => (
  <AbsoluteFill>
    <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position }} />
  </AbsoluteFill>
);

const BuildersDay: React.FC = () => (
  <AbsoluteFill>
    <Img src={staticFile("brand/agent-loop.jpg")} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 1400, height: 1400 * (1235 / 2400), borderRadius: 30, overflow: "hidden", boxShadow: "0 60px 120px -40px rgba(30,40,60,0.55)" }}>
        <Img src={staticFile("figma/builders-day.jpg")} style={{ width: "100%", height: "100%" }} />
      </div>
    </AbsoluteFill>
  </AbsoluteFill>
);

// A desktop browser window around a live-site screenshot (1440x900 @2x).
const Browser: React.FC<{ src: string; width: number; style?: React.CSSProperties }> = ({ src, width, style }) => (
  <div style={{ width, borderRadius: 22, overflow: "hidden", background: C.white, border: `2px solid ${C.border}`, boxShadow: "0 40px 90px -40px rgba(21,21,21,0.35)", ...style }}>
    <div style={{ height: width * 0.03, display: "flex", alignItems: "center", gap: width * 0.006, paddingLeft: width * 0.014, borderBottom: `2px solid ${C.border}` }}>
      {[0, 1, 2].map((i) => (
        <span key={i} style={{ width: width * 0.008, height: width * 0.008, borderRadius: 99, background: "rgba(21,21,21,0.12)" }} />
      ))}
    </div>
    <Img src={staticFile(src)} style={{ width, height: width * (900 / 1440), display: "block" }} />
  </div>
);

const SiteHome: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.paper, alignItems: "center", paddingTop: 110, overflow: "hidden" }}>
    <SpectralBottom u={1} t={0} strength={0.7} />
    <Browser src="brandnew/site-home.png" width={1640} style={{ position: "relative" }} />
  </AbsoluteFill>
);

const SitePages: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.ink, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 40 }}>
    <Browser src="brandnew/site-pricing.png" width={880} />
    <Browser src="brandnew/site-postgres.png" width={880} />
  </AbsoluteFill>
);

const LED: React.FC = () => {
  const cells = "1000000".split("").flatMap((d, i) => (i === 0 || i === 3 ? [{ ch: d, lit: 1 }, { ch: ",", lit: 1 }] : [{ ch: d, lit: 1 }]));
  return (
    <Center bg={C.ink}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ fontFamily: SORA, fontSize: 50, color: "rgba(255,255,255,0.78)", marginBottom: 46 }}>The next</div>
        <DotMatrix cells={cells} dot={26} gap={9.5} glyphGap={32} />
        <div style={{ fontFamily: SORA, fontWeight: 500, fontSize: 110, color: C.white, marginTop: 52 }}>products</div>
        <div style={{ fontFamily: SORA, fontSize: 50, color: "rgba(255,255,255,0.78)", marginTop: 18 }}>will be built on a stack that works as one.</div>
      </div>
    </Center>
  );
};

// ---- Flora inputs: flat artwork the mockups carry unchanged. ----

const MarkFlat: React.FC = () => (
  <Center>
    <NewMark size={1300} />
  </Center>
);

const LockupFlat: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.white }}>
    <Lockup x={300} y={500} width={2400} />
  </AbsoluteFill>
);

// 48-sheet billboard, 3:1: the M-07 end card laid out wide.
const Billboard: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.paper }}>
    <SpectralBottom u={1.4} t={0} strength={0.8} />
    <SiteRay x={2420} y={640} length={2100} thickness={300} angle={-16} intensity="hero" fade="start" />
    <Texture opacity={0.05} />
    <Lockup x={200} y={250} width={520} />
    <div style={{ position: "absolute", left: 190, top: 380, fontFamily: SORA, fontWeight: 500, fontSize: 210, lineHeight: 1.04, color: C.ink }}>
      From prompt
      <br />
      to product.
    </div>
    {PRODUCTS.map((p, i) => {
      const k = p.fit * 0.95;
      const x = [1880, 2340, 2780][i];
      const y = [640, 560, 470][i];
      return (
        <Img
          key={p.name}
          src={staticFile(p.object)}
          style={{ position: "absolute", width: p.w * k, height: p.h * k, left: x - (p.w * k) / 2, top: y - (p.h * k) / 2, filter: "drop-shadow(0 30px 36px rgba(0,0,0,0.2))" }}
        />
      );
    })}
  </AbsoluteFill>
);

// Billboard without the product objects: the line, and the ray running
// off the edge of the board.
const BillboardRay: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.paper }}>
    <SpectralBottom u={1.4} t={0} strength={0.7} />
    <SiteRay x={2500} y={720} length={1900} thickness={340} angle={-16} intensity="hero" fade="start" />
    <Texture opacity={0.05} />
    <Lockup x={200} y={240} width={500} />
    <div style={{ position: "absolute", left: 186, top: 360, fontFamily: SORA, fontWeight: 500, fontSize: 250, lineHeight: 1.02, color: C.ink }}>
      From prompt
      <br />
      to product.
    </div>
  </AbsoluteFill>
);

// 6-sheet portrait poster: the million-products stat on Ink.
const Poster: React.FC = () => {
  const cells = "1000000".split("").flatMap((d, i) => (i === 0 || i === 3 ? [{ ch: d, lit: 1 }, { ch: ",", lit: 1 }] : [{ ch: d, lit: 1 }]));
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, padding: 90 }}>
      <Img src={staticFile("logo/white.svg")} style={{ width: 300, height: 300 * (67 / 264) }} />
      <div style={{ position: "absolute", left: 90, right: 90, top: 520, display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <div style={{ fontFamily: SORA, fontSize: 64, color: "rgba(255,255,255,0.78)", marginBottom: 50 }}>The next</div>
        <DotMatrix cells={cells} dot={15.5} gap={5.6} glyphGap={19} />
        <div style={{ fontFamily: SORA, fontWeight: 500, fontSize: 150, color: C.white, marginTop: 60, lineHeight: 1 }}>products</div>
        <div style={{ fontFamily: SORA, fontSize: 64, lineHeight: 1.25, color: "rgba(255,255,255,0.78)", marginTop: 40 }}>
          will be built on a stack
          <br />
          that works as one.
        </div>
      </div>
      <div style={{ position: "absolute", left: 90, bottom: 90, fontFamily: INTER, fontWeight: 500, fontSize: 40, color: "rgba(255,255,255,0.6)" }}>prisma.io</div>
    </AbsoluteFill>
  );
};

// Sticker sheet: die-cut stickers with white borders on a pale ground.
const Sticker: React.FC<{ children: React.ReactNode; x: number; y: number; rotate?: number; radius?: number | string; pad?: number }> = ({ children, x, y, rotate = 0, radius = 40, pad = 26 }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      background: C.white,
      padding: pad,
      borderRadius: radius,
      boxShadow: "0 10px 24px -8px rgba(21,21,21,0.25)",
      display: "flex",
    }}
  >
    {children}
  </div>
);

const Stickers: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#e9ebe6" }}>
    <Sticker x={520} y={500} rotate={-8} radius={70}>
      <NewMark size={560} />
    </Sticker>
    <Sticker x={1440} y={480} rotate={6} radius="50%" pad={10}>
      <Img src={staticFile("mascot/salute.png")} style={{ width: 640, height: 640 }} />
    </Sticker>
    <Sticker x={980} y={1060} rotate={-3} radius={36} pad={40}>
      <Img src={staticFile("logo/full-color.svg")} style={{ width: 900, height: 900 * (67 / 264) }} />
    </Sticker>
    <Sticker x={520} y={1560} rotate={7} radius={40} pad={10}>
      <Img src={staticFile("figma/prisma-print.svg")} style={{ width: 640, height: 640 }} />
    </Sticker>
    <Sticker x={1460} y={1540} rotate={-6} radius="50%" pad={10}>
      <Img src={staticFile("mascot/happy.png")} style={{ width: 560, height: 560 }} />
    </Sticker>
  </AbsoluteFill>
);

// Die-cut stickers: the white border follows each artwork's own outline
// (alpha blurred, then thresholded, so the contour is smooth and rounded)
// instead of sitting on a square or circle card.
const DieCutDefs: React.FC = () => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <defs>
      {[18, 30, 44].map((r) => (
        <filter key={r} id={`diecut-${r}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation={r / 2} result="blur" />
          <feComponentTransfer in="blur" result="cut">
            <feFuncA type="linear" slope={40} intercept={-1.2} />
          </feComponentTransfer>
          <feFlood floodColor="#ffffff" />
          <feComposite in2="cut" operator="in" result="paper" />
          <feGaussianBlur in="cut" stdDeviation={10} result="soft" />
          <feOffset in="soft" dy={10} result="drop" />
          <feFlood floodColor="rgba(21,21,21,0.28)" />
          <feComposite in2="drop" operator="in" result="shadow" />
          <feMerge>
            <feMergeNode in="shadow" />
            <feMergeNode in="paper" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      ))}
    </defs>
  </svg>
);

const DieCut: React.FC<{ x: number; y: number; rotate: number; r?: 18 | 30 | 44; children: React.ReactNode }> = ({ x, y, rotate, r = 30, children }) => (
  <div style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) rotate(${rotate}deg)`, filter: `url(#diecut-${r})`, display: "flex" }}>{children}</div>
);

const StickersDieCut: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#e9ebe6" }}>
    <DieCutDefs />
    <DieCut x={540} y={520} rotate={-8} r={30}>
      <NewMark size={540} />
    </DieCut>
    <DieCut x={1440} y={500} rotate={6} r={18}>
      <Img src={staticFile("mascot/salute.png")} style={{ width: 640, height: 640 }} />
    </DieCut>
    <DieCut x={1000} y={1060} rotate={-3} r={30}>
      <Img src={staticFile("logo/full-color.svg")} style={{ width: 880, height: 880 * (67 / 264) }} />
    </DieCut>
    <DieCut x={540} y={1560} rotate={7} r={44}>
      <Img src={staticFile("figma/prisma-print.svg")} style={{ width: 680, height: 680 }} />
    </DieCut>
    <DieCut x={1460} y={1540} rotate={-6} r={18}>
      <Img src={staticFile("mascot/happy.png")} style={{ width: 560, height: 560 }} />
    </DieCut>
  </AbsoluteFill>
);

export const BrandNewStills: React.FC = () => (
  <>
    <Still id="BN01-before-after" component={BeforeAfter} width={W} height={H} />
    <Still id="BN02-lockup" component={LockupHero} width={W} height={H} />
    <Still id="BN03-mark-ink" component={MarkInk} width={W} height={H} />
    <Still id="BN04-variations" component={Variations} width={W} height={H} />
    <Still id="BN05-colour" component={Colour} width={W} height={H} />
    <Still id="BN06-type" component={Type} width={W} height={H} />
    <Still id="BN07-objects" component={Objects} width={W} height={H} />
    <Still id="BN08-prismo" component={Prismo} width={W} height={H} />
    <Still id="BN09-wordmark" component={Wordmark} width={W} height={H} />
    <Still id="BN10-led" component={LED} width={W} height={H} />
    <Still id="BN11-site-home" component={SiteHome} width={W} height={H} />
    <Still id="BN12-site-pages" component={SitePages} width={W} height={H} />
    <Still id="BN13-merch" component={Merch} width={W} height={H} />
    <Still id="BN14-totes" component={() => <PhotoFrame src="figma/totes.jpg" position="60% 50%" />} width={W} height={H} />
    <Still id="BN15-builders-day" component={BuildersDay} width={W} height={H} />
    <Still id="FL-mark" component={MarkFlat} width={2048} height={2048} />
    <Still id="FL-lockup" component={LockupFlat} width={3000} height={1000} />
    <Still id="FL-billboard" component={Billboard} width={3000} height={1000} />
    <Still id="FL-billboard-ray" component={BillboardRay} width={3000} height={1000} />
    <Still id="FL-poster" component={Poster} width={1200} height={1800} />
    <Still id="FL-stickers" component={Stickers} width={2000} height={2000} />
    <Still id="FL-stickers-diecut" component={StickersDieCut} width={2000} height={2000} />
  </>
);
