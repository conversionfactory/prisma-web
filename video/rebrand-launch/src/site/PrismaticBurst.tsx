import React, { useLayoutEffect, useRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { BURST_COLORS } from "../theme";

// Port of apps/site-redesign/src/components/brand/prismatic-burst.tsx.
// Same shader; time comes from the frame so every render is deterministic.
const VERT = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
precision highp int;
out vec4 fragColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uIntensity;
uniform float uSpeed;
uniform int   uColorCount;
uniform float uDistort;
uniform vec2  uOffset;
uniform sampler2D uGradient;
uniform float uNoiseAmount;
uniform int   uRayCount;

float hash21(vec2 p){ p = floor(p); float f = 52.9829189 * fract(dot(p, vec2(0.065, 0.005))); return fract(f); }
mat2 rot30(){ return mat2(0.8, -0.5, 0.5, 0.8); }
float layeredNoise(vec2 fragPx){
  vec2 p = mod(fragPx + vec2(uTime * 30.0, -uTime * 21.0), 1024.0);
  vec2 q = rot30() * p;
  float n = 0.0;
  n += 0.40 * hash21(q); n += 0.25 * hash21(q * 2.0 + 17.0); n += 0.20 * hash21(q * 4.0 + 47.0);
  n += 0.10 * hash21(q * 8.0 + 113.0); n += 0.05 * hash21(q * 16.0 + 191.0);
  return n;
}
vec3 rayDir(vec2 frag, vec2 res, vec2 offset, float dist){
  float focal = res.y * max(dist, 1e-3);
  return normalize(vec3(2.0 * (frag - offset) - res, focal));
}
float edgeFade(vec2 frag, vec2 res, vec2 offset){
  vec2 toC = frag - 0.5 * res - offset;
  float r = length(toC) / (0.5 * min(res.x, res.y));
  float x = clamp(r, 0.0, 1.0);
  float q = x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
  float s = q * 0.5; s = pow(s, 1.5);
  float tail = 1.0 - pow(1.0 - s, 2.0);
  s = mix(s, tail, 0.2);
  return clamp(s, 0.0, 1.0);
}
mat3 rotX(float a){ float c = cos(a), s = sin(a); return mat3(1.0,0.0,0.0, 0.0,c,-s, 0.0,s,c); }
mat3 rotY(float a){ float c = cos(a), s = sin(a); return mat3(c,0.0,s, 0.0,1.0,0.0, -s,0.0,c); }
mat3 rotZ(float a){ float c = cos(a), s = sin(a); return mat3(c,-s,0.0, s,c,0.0, 0.0,0.0,1.0); }
vec3 sampleGradient(float t){ return texture(uGradient, vec2(clamp(t, 0.0, 1.0), 0.5)).rgb; }
vec2 rot2(vec2 v, float a){ float s = sin(a), c = cos(a); return mat2(c, -s, s, c) * v; }
float bendAngle(vec3 q, float t){
  return 0.8 * sin(q.x * 0.55 + t * 0.6) + 0.7 * sin(q.y * 0.50 - t * 0.5) + 0.6 * sin(q.z * 0.60 + t * 0.7);
}
void main(){
  vec2 frag = gl_FragCoord.xy;
  float t = uTime * uSpeed;
  float jitterAmp = 0.1 * clamp(uNoiseAmount, 0.0, 1.0);
  vec3 dir = rayDir(frag, uResolution, uOffset, 1.0);
  float marchT = 0.0;
  vec3 col = vec3(0.0);
  float n = layeredNoise(frag);
  float amp = clamp(uDistort, 0.0, 50.0) * 0.15;
  vec3 ang = vec3(t * 0.31, t * 0.21, t * 0.17);
  mat3 rot3dMat = rotZ(ang.z) * rotY(ang.y) * rotX(ang.x);
  for (int i = 0; i < 44; ++i) {
    vec3 P = marchT * dir;
    P.z -= 2.0;
    float rad = length(P);
    vec3 Pl = P * (10.0 / max(rad, 1e-6));
    Pl = rot3dMat * Pl;
    float stepLen = min(rad - 0.3, n * jitterAmp) + 0.1;
    float grow = smoothstep(0.35, 3.0, marchT);
    float a1 = amp * grow * bendAngle(Pl * 0.6, t);
    float a2 = 0.5 * amp * grow * bendAngle(Pl.zyx * 0.5 + 3.1, t * 0.9);
    vec3 Pb = Pl;
    Pb.xz = rot2(Pb.xz, a1);
    Pb.xy = rot2(Pb.xy, a2);
    float rayPattern = smoothstep(0.5, 0.7, sin(Pb.x + cos(Pb.y) * cos(Pb.z)) * sin(Pb.z + sin(Pb.y) * cos(Pb.x + t)));
    if (uRayCount > 0) {
      float a = atan(Pb.y, Pb.x);
      float comb = pow(0.5 + 0.5 * cos(float(uRayCount) * a), 3.0);
      rayPattern *= smoothstep(0.15, 0.95, comb);
    }
    float saw = fract(marchT * 0.25);
    float tRay = saw * saw * (3.0 - 2.0 * saw);
    vec3 spectral = 2.0 * sampleGradient(tRay);
    vec3 base = (0.05 / (0.4 + stepLen)) * smoothstep(5.0, 0.0, rad) * spectral;
    col += base * rayPattern;
    marchT += stepLen;
  }
  col *= edgeFade(frag, uResolution, uOffset);
  col *= uIntensity;
  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const hexToRgb = (hex: string) => {
  const h = hex.replace("#", "");
  const v = parseInt(h, 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
};

type Gl = {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  loc: Record<string, WebGLUniformLocation | null>;
};

const setup = (canvas: HTMLCanvasElement, colors: string[]): Gl | null => {
  const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true, antialias: false, alpha: false });
  if (!gl) return null;
  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
    return s;
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

  const data = new Uint8Array(colors.length * 4);
  colors.forEach((c, i) => {
    const [r, g, b] = hexToRgb(c);
    data.set([r, g, b, 255], i * 4);
  });
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, colors.length, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  const names = ["uResolution", "uTime", "uIntensity", "uSpeed", "uColorCount", "uDistort", "uOffset", "uGradient", "uNoiseAmount", "uRayCount"];
  const loc: Gl["loc"] = {};
  for (const n of names) loc[n] = gl.getUniformLocation(program, n);
  gl.uniform1i(loc.uGradient, 0);
  gl.uniform1i(loc.uColorCount, colors.length);
  gl.uniform1f(loc.uNoiseAmount, 0.8);
  return { gl, program, loc };
};

type BurstProps = {
  width: number;
  height: number;
  intensity?: number;
  speed?: number;
  distort?: number;
  rayCount?: number;
  /** seconds added to the clock, so separate bursts don't look identical */
  seed?: number;
  /** render scale; the shader is soft, so half-res is indistinguishable */
  resolution?: number;
  colors?: string[];
  /** ray jitter 0..1 (the site uses 0.8); 0 renders the light smooth, no grain */
  noise?: number;
  style?: React.CSSProperties;
};

export const PrismaticBurst: React.FC<BurstProps> = ({
  width,
  height,
  intensity = 2,
  speed = 0.5,
  distort = 0,
  rayCount = 0,
  seed = 0,
  resolution = 0.5,
  colors = BURST_COLORS,
  noise = 0.8,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<Gl | null>(null);
  const w = Math.max(2, Math.round(width * resolution));
  const h = Math.max(2, Math.round(height * resolution));

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!glRef.current) glRef.current = setup(canvas, colors);
    const g = glRef.current;
    if (!g) return;
    const { gl, loc } = g;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(loc.uResolution, w, h);
    gl.uniform1f(loc.uTime, frame / fps + seed);
    gl.uniform1f(loc.uIntensity, intensity);
    gl.uniform1f(loc.uSpeed, speed);
    gl.uniform1f(loc.uDistort, distort);
    gl.uniform2f(loc.uOffset, 0, 0);
    gl.uniform1i(loc.uRayCount, rayCount);
    gl.uniform1f(loc.uNoiseAmount, noise);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }, [frame, fps, w, h, intensity, speed, distort, rayCount, seed, colors, noise]);

  return <canvas ref={canvasRef} width={w} height={h} style={{ width, height, display: "block", ...style }} />;
};
