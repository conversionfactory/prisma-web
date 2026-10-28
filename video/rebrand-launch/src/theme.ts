import { loadFont as loadSora } from "@remotion/google-fonts/Sora";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";

// Site type rules: headings are Sora at Medium (500) with natural tracking;
// body is Inter, regular.
export const { fontFamily: SORA } = loadSora("normal", { weights: ["400", "500"], subsets: ["latin"] });
export const { fontFamily: INTER } = loadInter("normal", { weights: ["400", "500"], subsets: ["latin"] });

// Cut to 120 BPM in 4/4 at 60fps: one beat is exactly 30 frames, one bar 2s.
export const FPS = 60;
export const BPM = 120;
export const BEAT = (FPS * 60) / BPM;
export const BAR = BEAT * 4;
export const TOTAL_BARS = 22;
export const DURATION = TOTAL_BARS * BAR;

// 1-indexed bar number -> frame where that bar's downbeat lands.
export const bar = (n: number) => (n - 1) * BAR;

// apps/site-redesign/src/app/globals.css
export const C = {
  ink: "#151515", // --primary, headings
  text: "#3a3b3c", // --foreground
  muted: "#646567", // --muted-foreground
  paper: "#f9faf5",
  white: "#ffffff",
  border: "rgba(0,0,0,0.06)",
  night: "#07070b",
  cyan50: "#eeffff",
  cyan200: "#b3f4f9",
  cyan300: "#7be7f0",
  cyan400: "#01d7e4",
  yellow200: "#f8da85",
  yellow300: "#f3c306",
  yellow400: "#eaa700",
  red300: "#ff9fa4",
  red400: "#ff7682",
  red500: "#f34a60",
  // New mark fills
  markCyan: "#04D5E7",
  markRed: "#FE4352",
  markYellow: "#FEBE29",
  // The pre-rebrand mark
  oldIndigo: "#4C51BF",
};

// The brand CTA glow / glass-glide spectrum.
export const SPECTRUM_STOPS = ["#01d7e4", "#f3c306", "#f37a03", "#f43531", "#f00e5c"];
export const SPECTRUM = (deg = 85) =>
  `linear-gradient(${deg}deg, #01d7e4 0%, #f3c306 25%, #f37a03 50%, #f43531 74%, #f00e5c 100%)`;
// Burst palette from burst-fill.tsx.
export const BURST_COLORS = [...SPECTRUM_STOPS, "#ffffff"];

// The canonical triple-band ray (prism-ray.tsx).
export const RAY_BANDS = (direction = "to bottom") =>
  `linear-gradient(${direction}, ${C.cyan400} 0% 33%, ${C.yellow300} 33% 66%, ${C.red500} 66% 100%)`;
