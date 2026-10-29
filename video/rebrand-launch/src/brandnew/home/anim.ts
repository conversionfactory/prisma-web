import { Easing } from "remotion";

// The homepage's CSS keyframes (apps/site-redesign/src/app/globals.css) as
// functions of time, so they render frame-accurately. Periods are rounded to
// divide the 14s bento loop: shimmer 2.2s -> 2s, pulse and bob 2.6s -> 2.8s,
// caret 1.1s -> 1s.
export const LOOP_S = 14;

const inOut = Easing.bezier(0.42, 0, 0.58, 1);
const phase = (t: number, period: number, delay = 0) => ((((t - delay) % period) + period) % period) / period;

// 0 -> 1 -> 0 over a cycle, ease-in-out on each half.
const there = (p: number) => (p < 0.5 ? inOut(p / 0.5) : 1 - inOut((p - 0.5) / 0.5));

// line-shimmer: translateX -100% -> 100% by 55%, then rest.
export const shimmer = (t: number) => -100 + 200 * inOut(Math.min(phase(t, 2) / 0.55, 1));

// status-pulse: opacity 1 -> .45, scale 1 -> .82 at 50%.
export const statusPulse = (t: number) => {
  const k = there(phase(t, 2.8));
  return { opacity: 1 - 0.55 * k, transform: `scale(${1 - 0.18 * k})` };
};

// rocket-bob: up 2.5px and -8deg at 50%.
export const rocketBob = (t: number) => {
  const k = there(phase(t, 2.8));
  return `translateY(${-2.5 * k}px) rotate(${-8 * k}deg)`;
};

// caret-blink, step-end: on for the first 55%.
export const caretOn = (t: number) => phase(t, 1) < 0.55;

// loop-breathe: opacity .14 -> .3 -> .14 over 7s.
export const breathe = (t: number) => 0.14 + 0.16 * there(phase(t, 7));

// loop-flare, linear over the 14s orbit: 0 -> .3 (4%) -> .9 (9%) -> 0 (20%).
export const flare = (t: number, delay: number) => {
  const p = phase(t, LOOP_S, delay);
  if (p < 0.04) return (p / 0.04) * 0.3;
  if (p < 0.09) return 0.3 + ((p - 0.04) / 0.05) * 0.6;
  if (p < 0.2) return 0.9 * (1 - (p - 0.09) / 0.11);
  return 0;
};

// spin: one turn per orbit.
export const orbit = (t: number) => (360 * phase(t, LOOP_S)) % 360;
