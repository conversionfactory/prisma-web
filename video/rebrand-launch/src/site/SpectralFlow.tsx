import React, { useLayoutEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

// Light dispersing out of a prism as something alive rather than five rigid
// rays: a fan of spectrum that billows outwards from `origin` like silk in
// water. Domain-warped noise bends the fan and breaks it into filaments, the
// hue drifts with distance (dispersion), and `spread` 0..1 opens it from a
// narrow prism fan to light that takes over the whole frame. Time comes from
// the frame, so renders are deterministic. Paint it with mix-blend screen.

const VERT = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uRes;
uniform vec2 uOrigin;
uniform float uTime;
uniform float uSpread;
uniform float uGain;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
// Brand spectrum: cyan, yellow, orange, red, magenta.
vec3 spectrum(float x) {
  x = clamp(x, 0.0, 1.0) * 4.0;
  vec3 c0 = vec3(0.004, 0.843, 0.894), c1 = vec3(0.953, 0.765, 0.024), c2 = vec3(0.953, 0.478, 0.012);
  vec3 c3 = vec3(0.957, 0.208, 0.192), c4 = vec3(0.941, 0.055, 0.361);
  if (x < 1.0) return mix(c0, c1, x);
  if (x < 2.0) return mix(c1, c2, x - 1.0);
  if (x < 3.0) return mix(c2, c3, x - 2.0);
  return mix(c3, c4, x - 3.0);
}

void main() {
  vec2 frag = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 p = (frag - uOrigin) / uRes.y;
  float r = length(p);
  float a = atan(p.y, p.x);
  float t = uTime;
  float s = smoothstep(0.0, 1.0, uSpread);

  // Flowing outwards: noise stretched along the radius, so it reads as long
  // strands streaming away from the origin rather than blobs.
  vec2 q = vec2(a * 5.0, r * 1.2 - t * 0.35);
  float w = fbm(q * vec2(1.0, 0.6) + vec2(0.0, t * 0.05));

  // The fan opens from a prism's narrow wedge to nearly all the way round;
  // the far side (behind the prism, where the light comes from) stays dark.
  float halfW = mix(0.2, 2.9, s);
  float billow = (w - 0.5) * (0.35 + 0.9 * s) * (0.2 + r * 0.8);
  float aw = a + billow;
  float fan = smoothstep(halfW, halfW * 0.55, abs(aw));

  // Reach: a soft, warped front travelling outwards.
  float reach = mix(0.12, 2.6, s);
  float rr = r + (w - 0.5) * 0.35;
  float front = smoothstep(reach, reach * 0.55, rr);

  // Strands: bright streaks radiating out and drifting outwards, with fine
  // filaments threaded through them, dark between.
  float st = fbm(vec2(aw * 9.0, r * 0.9 - t * 0.5));
  float strands = smoothstep(0.42, 0.82, st);
  float fine = pow(0.5 + 0.5 * sin(aw * 60.0 + w * 4.0), 8.0) * 0.45;
  float fil = clamp(strands + fine * strands, 0.0, 1.2);

  // Across the fan -> spectrum, with hue drifting by distance (dispersion).
  // The whole spectrum sits across the middle of the fan, so every hue shows.
  float u = clamp(aw / (halfW * 0.62) * 0.5 + 0.5 + (w - 0.5) * 0.15 + r * 0.05, 0.0, 1.0);
  vec3 col = spectrum(u);
  float body = fan * front * (0.03 + 1.1 * fil * fil) * (0.45 + 0.55 * exp(-r * 0.5));
  col *= body;

  // White where strands gather near the prism, and a hot core at the exit.
  col += vec3(1.0) * pow(fil, 4.0) * fan * front * 0.45 * exp(-r * 1.2);
  col += vec3(1.0, 0.97, 0.92) * exp(-r * 22.0) * 0.9;

  col *= uGain;
  col = 1.0 - exp(-col * 2.2);
  outColor = vec4(col, 1.0);
}`;

type Gl = { gl: WebGL2RenderingContext; loc: Record<string, WebGLUniformLocation | null> };

const setup = (canvas: HTMLCanvasElement): Gl | null => {
  const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true, antialias: false, alpha: false });
  if (!gl) return null;
  const compile = (type: number, src: string) => {
    const sh = gl.createShader(type)!;
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh) ?? "shader");
    return sh;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
  gl.linkProgram(program);
  gl.useProgram(program);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const pos = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(pos);
  gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
  const loc: Gl["loc"] = {};
  for (const n of ["uRes", "uOrigin", "uTime", "uSpread", "uGain"]) loc[n] = gl.getUniformLocation(program, n);
  return { gl, loc };
};

type Props = {
  width: number;
  height: number;
  /** where the light leaves the prism, in px */
  origin: { x: number; y: number };
  /** 0 = narrow prism fan, 1 = takes over the frame */
  spread: number;
  gain?: number;
  resolution?: number;
  style?: React.CSSProperties;
};

export const SpectralFlow: React.FC<Props> = ({ width, height, origin, spread, gain = 1, resolution = 0.75, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ref = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<Gl | null>(null);
  const w = Math.max(2, Math.round(width * resolution));
  const h = Math.max(2, Math.round(height * resolution));

  useLayoutEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (!glRef.current) glRef.current = setup(canvas);
    const g = glRef.current;
    if (!g) return;
    const { gl, loc } = g;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(loc.uRes, w, h);
    gl.uniform2f(loc.uOrigin, origin.x * resolution, origin.y * resolution);
    gl.uniform1f(loc.uTime, frame / fps);
    gl.uniform1f(loc.uSpread, spread);
    gl.uniform1f(loc.uGain, gain);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, [frame, fps, w, h, origin.x, origin.y, spread, gain, resolution]);

  return <canvas ref={ref} width={w} height={h} style={{ width, height, display: "block", ...style }} />;
};
