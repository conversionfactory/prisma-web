import { Easing, interpolate } from "remotion";

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// The site's hero-rise curve.
export const RISE = Easing.bezier(0.22, 1, 0.36, 1);
// Camera moves and shared-element travel.
export const GLIDE = Easing.bezier(0.65, 0, 0.35, 1);
// Exits: accelerate away.
export const LEAVE = Easing.bezier(0.55, 0, 1, 0.45);
// Wipes: fast through the middle, soft at both ends.
export const SNAP = Easing.bezier(0.85, 0, 0.15, 1);

export const ease = (frame: number, from: number, to: number, out: [number, number], easing = RISE) =>
  interpolate(frame, [from, to], out, { ...clamp, easing });

// Fade + lift in, the way site sections reveal.
export const rise = (frame: number, start: number, u: number, distance = 40, length = 36) => {
  const t = ease(frame, start, start + length, [0, 1]);
  return { opacity: t, transform: `translateY(${(1 - t) * distance * u}px)` };
};

// Masked line reveal: 0 = below its clip, 1 = home, 2 = above its clip.
export const line = (frame: number, start: number, end = Infinity, length = 28) => {
  if (frame >= end) return 1 + ease(frame, end, end + length * 0.7, [0, 1], LEAVE);
  return ease(frame, start, start + length, [0, 1]);
};

// Decaying punch after the most recent hit: 1 on the hit frame, ~0 by `length`.
export const punch = (frame: number, hits: number[], length = 14) => {
  let last = -Infinity;
  for (const h of hits) if (h <= frame && h > last) last = h;
  const t = frame - last;
  if (!Number.isFinite(t) || t > length) return 0;
  return Math.exp((-t / length) * 4);
};
