import React from "react";
import { C } from "../theme";

// 5x7 glyphs, one string per row.
const GLYPHS: Record<string, string[]> = {
  "0": ["01110", "10001", "10011", "10101", "11001", "10001", "01110"],
  "1": ["00100", "01100", "00100", "00100", "00100", "00100", "01110"],
  "2": ["01110", "10001", "00001", "00010", "00100", "01000", "11111"],
  "3": ["11111", "00010", "00100", "00010", "00001", "10001", "01110"],
  "4": ["00010", "00110", "01010", "10010", "11111", "00010", "00010"],
  "5": ["11111", "10000", "11110", "00001", "00001", "10001", "01110"],
  "6": ["00110", "01000", "10000", "11110", "10001", "10001", "01110"],
  "7": ["11111", "00001", "00010", "00100", "01000", "01000", "01000"],
  "8": ["01110", "10001", "10001", "01110", "10001", "10001", "01110"],
  "9": ["01110", "10001", "10001", "01111", "00001", "00010", "01100"],
  ",": ["00", "00", "00", "00", "00", "01", "10"],
};

// The stat loops colour each row band: cyan on top, yellow through the
// middle, red at the base.
const rowColor = (r: number) => (r < 2 ? C.cyan400 : r < 5 ? C.yellow300 : C.red500);

type Cell = { ch: string; lit: number };

type DotMatrixProps = {
  cells: Cell[];
  dot: number;
  gap: number;
  glyphGap: number;
  /** 0..1 brightness boost for hits */
  flare?: number;
};

export const DotMatrix: React.FC<DotMatrixProps> = ({ cells, dot, gap, glyphGap, flare = 0 }) => {
  const pitch = dot + gap;
  return (
    <div style={{ display: "flex", gap: glyphGap, alignItems: "flex-start" }}>
      {cells.map((cell, ci) => {
        const g = GLYPHS[cell.ch] ?? GLYPHS["0"];
        const cols = g[0].length;
        return (
          <svg key={ci} width={cols * pitch} height={7 * pitch} style={{ overflow: "visible" }}>
            {g.map((row, r) =>
              row.split("").map((bit, c) => {
                const on = bit === "1";
                const color = rowColor(r);
                const a = on ? cell.lit : 0;
                return (
                  <g key={`${r}-${c}`}>
                    <circle cx={c * pitch + dot / 2} cy={r * pitch + dot / 2} r={dot / 2} fill="#ffffff" opacity={0.06} />
                    {a > 0 ? (
                      <>
                        <circle cx={c * pitch + dot / 2} cy={r * pitch + dot / 2} r={dot * (0.9 + flare * 0.5)} fill={color} opacity={a * (0.18 + flare * 0.25)} />
                        <circle cx={c * pitch + dot / 2} cy={r * pitch + dot / 2} r={dot / 2} fill={color} opacity={a} />
                      </>
                    ) : null}
                  </g>
                );
              }),
            )}
          </svg>
        );
      })}
    </div>
  );
};
