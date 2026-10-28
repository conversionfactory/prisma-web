import React from "react";
import { AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame } from "remotion";
import { Opener } from "./scenes/Opener";
import { Reveal } from "./scenes/Reveal";
import { Prompt } from "./scenes/Prompt";
import { Products } from "./scenes/Products";
import { Counter } from "./scenes/Counter";
import { Merch } from "./scenes/Merch";
import { Prismo } from "./scenes/Prismo";
import { EndCard } from "./scenes/EndCard";
import { RayWipe } from "./site/Surfaces";
import { useLayout } from "./components/layout";
import { BAR, bar } from "./theme";

// Bar map at 120 BPM (1 bar = 2s). Every scene starts on a downbeat.
export const TIMELINE = [
  { name: "Before + refraction", from: 1, bars: 2, Scene: Opener },
  { name: "New mark", from: 3, bars: 2, Scene: Reveal },
  { name: "Prompt", from: 5, bars: 2, Scene: Prompt },
  { name: "Products", from: 7, bars: 4, Scene: Products },
  { name: "Counter", from: 11, bars: 3, Scene: Counter },
  { name: "Merch", from: 14, bars: 4, Scene: Merch },
  { name: "Prismo", from: 18, bars: 2, Scene: Prismo },
  { name: "End card", from: 20, bars: 3, Scene: EndCard },
];

// The send lands on bar 6 beat 3; the ray bands sweep the frame and the
// cut to the stack hides under them on the bar 7 downbeat.
const WIPE = 26;
const Wipe: React.FC = () => {
  const frame = useCurrentFrame();
  const { u } = useLayout();
  const p = interpolate(frame, [0, WIPE * 2], [0, 1], { easing: Easing.bezier(0.6, 0, 0.4, 1) });
  return <RayWipe p={p} u={u} />;
};

export const RebrandLaunch: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#000" }}>
    {TIMELINE.map(({ name, from, bars, Scene }) => (
      <Sequence key={name} name={name} from={bar(from)} durationInFrames={bars * BAR} premountFor={30}>
        <Scene />
      </Sequence>
    ))}
    <Sequence name="Ray wipe" from={bar(7) - WIPE} durationInFrames={WIPE * 2}>
      <Wipe />
    </Sequence>
  </AbsoluteFill>
);
