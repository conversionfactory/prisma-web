import React from "react";

// Type scale on the 1920 grid, sized to read on a phone in a feed.
export const TYPE = {
  display: 150,
  h1: 112,
  h2: 84,
  lead: 46,
  body: 40,
  kicker: 30,
};

// A line of type that slides up from behind its own clip edge. `p` comes
// from `line()`: 0 hidden below, 1 home, 2 gone above. The padding keeps
// descenders and accents inside the clip.
export const MaskLine: React.FC<{ p: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ p, children, style }) => (
  <div style={{ overflow: "hidden", padding: "0.14em 0.06em", margin: "-0.14em -0.06em", ...style }}>
    <div style={{ transform: `translateY(${(1 - p) * 118}%)`, willChange: "transform" }}>{children}</div>
  </div>
);
