import React from "react";
import { Img, staticFile } from "remotion";
import { C } from "../theme";

type NewMarkProps = {
  size: number;
  /** 0 = bands scattered, 1 = assembled */
  assemble?: number;
  /** how far (in mark units) the bands start from home */
  fly?: number;
  mono?: string;
  style?: React.CSSProperties;
};

// The refreshed mark, drawn inline so each band can fly in on its own.
// Cyan sits top-left, red runs the diagonal, yellow sits bottom-right.
export const NewMark: React.FC<NewMarkProps> = ({ size, assemble = 1, fly = 160, mono, style }) => {
  const d = (1 - assemble) * fly;
  return (
    <svg width={size} height={size * (264 / 263)} viewBox="0 0 263 264" style={{ overflow: "visible", ...style }}>
      <g transform={`translate(${-d * 0.7} ${-d * 0.7})`} opacity={Math.min(1, assemble * 3)}>
        <path d="M57.3357 92.5002L0 149.939V150.03L57.3357 92.5002Z" fill={mono ?? C.markCyan} />
        <path d="M57.3357 92.5003L0 149.939V53.5L53.2105 0.10425V0H149.524L57.3357 92.5003Z" fill={mono ?? C.markCyan} />
      </g>
      <g transform={`translate(${-d * 1.1} ${d * 1.1})`} opacity={Math.min(1, assemble * 3)}>
        <path d="M263 91.7452L91.0537 264H0V172.229L171.92 0H263V91.7452Z" fill={mono ?? C.markRed} />
      </g>
      <g transform={`translate(${d * 0.7} ${d * 0.7})`} opacity={Math.min(1, assemble * 3)}>
        <path d="M263.001 113.861V114.034L156.453 220.773L263.001 113.861Z" fill={mono ?? C.markYellow} />
        <path d="M209.686 264H113.373L156.453 220.773L263.001 114.034V210.5L209.686 264Z" fill={mono ?? C.markYellow} />
      </g>
    </svg>
  );
};

type OldMarkProps = {
  size: number;
  color?: string;
  style?: React.CSSProperties;
};

// The pre-rebrand triangular prism, as it shipped (indigo, 159x194).
export const OldMark: React.FC<OldMarkProps> = ({ size, color = C.oldIndigo, style }) => (
  <svg width={size * (159 / 194)} height={size} viewBox="0 0 159 194" style={style}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.39749 123.139C0.476293 126.272 0.506027 130.226 2.47414 133.331L38.0964 189.524C40.4083 193.171 44.8647 194.834 49.0006 193.593L151.798 162.754C157.408 161.071 160.23 154.813 157.778 149.494L91.6953 6.14463C88.4726 -0.846183 78.7573 -1.42002 74.734 5.14279L2.39749 123.139ZM89.9395 38.9158C88.535 35.6658 83.7788 36.1664 83.0817 39.6375L57.64 166.316C57.1035 168.987 59.6044 171.268 62.215 170.489L133.24 149.287C135.313 148.669 136.381 146.379 135.522 144.393L89.9395 38.9158Z"
      fill={color}
    />
  </svg>
);

type LockupProps = {
  /** left edge */
  x: number;
  /** vertical centre */
  y: number;
  width: number;
  /** 0..1 wordmark wipes out from behind the mark */
  word?: number;
  assemble?: number;
  fly?: number;
  /** alternate treatment: wordmark from another logo/*.svg, mark in one colour if given */
  mono?: { color?: string; src: string };
};

// The full-colour lockup (logo/full-color.svg, 264x67): the mark is drawn
// inline so it can assemble, the wordmark is the SVG clipped past the mark.
export const Lockup: React.FC<LockupProps> = ({ x, y, width, word = 1, assemble = 1, fly, mono }) => {
  const k = width / 264;
  const h = 67 * k;
  const split = (74 / 264) * 100;
  return (
    <div style={{ position: "absolute", left: x, top: y - h / 2, width, height: h }}>
      <NewMark size={67 * k} assemble={assemble} fly={fly} mono={mono?.color} style={{ position: "absolute", left: 0, top: 0 }} />
      {word > 0 ? (
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(-20% ${(1 - word) * (100 - split)}% -20% ${split}%)` }}>
          <Img src={staticFile(mono?.src ?? "logo/full-color.svg")} style={{ width, height: h, transform: `translateX(${-(1 - word) * 46 * k}px)` }} />
        </div>
      ) : null}
    </div>
  );
};
