import React from "react";

type GlintProps = {
  x: number;
  y: number;
  size: number;
  /** 0..1 */
  intensity: number;
  rotate?: number;
  color?: string;
};

// Four-point star sparkle, the "prism glint" from the collateral components.
export const Glint: React.FC<GlintProps> = ({ x, y, size, intensity, rotate = 0, color = "#ffffff" }) => {
  if (intensity <= 0.001) return null;
  const s = size * (0.6 + 0.4 * intensity);
  return (
    <svg
      width={s * 2}
      height={s * 2}
      viewBox="-100 -100 200 200"
      style={{
        position: "absolute",
        left: x - s,
        top: y - s,
        opacity: intensity,
        transform: `rotate(${rotate}deg)`,
        mixBlendMode: "screen",
        overflow: "visible",
      }}
    >
      <defs>
        <radialGradient id="glint-core">
          <stop offset="0%" stopColor={color} stopOpacity="1" />
          <stop offset="35%" stopColor={color} stopOpacity="0.5" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="42" fill="url(#glint-core)" />
      <path d="M-100 0 L0 -5 L100 0 L0 5 Z" fill={color} />
      <path d="M0 -62 L4 0 L0 62 L-4 0 Z" fill={color} />
      <path d="M-30 -30 L2 -2 L30 30 L-2 2 Z" fill={color} opacity="0.55" />
      <path d="M30 -30 L2 2 L-30 30 L-2 -2 Z" fill={color} opacity="0.55" />
    </svg>
  );
};
