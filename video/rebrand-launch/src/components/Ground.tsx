import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { C } from "../theme";

// Dark ground ("Ink") from the stat loops.
export const Ink: React.FC<{ children?: React.ReactNode; color?: string }> = ({ children, color = C.ink }) => (
  <AbsoluteFill style={{ backgroundColor: color }}>{children}</AbsoluteFill>
);

// Full-bleed photo with a slow Ken Burns move.
export const Photo: React.FC<{ src: string; progress: number; from?: number; to?: number; origin?: string }> = ({
  src,
  progress,
  from = 1.14,
  to = 1.04,
  origin = "50% 50%",
}) => (
  <Img
    src={staticFile(src)}
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: `scale(${from + (to - from) * progress})`,
      transformOrigin: origin,
    }}
  />
);
