import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";
import "./MoltenMetal.css";

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16) / 255, parseInt(result[2], 16) / 255, parseInt(result[3], 16) / 255]
    : [1, 1, 1];
};

const colorModeToFloat = mode => (mode === "ember" ? 1 : mode === "frost" ? 2 : 0);

const vertex = `#version 300 es
in vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }
`;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution; uniform float iTime; uniform float uSpeed; uniform float uScale;
uniform float uDetail; uniform float uGlow; uniform float uCoreSize; uniform float uSwirl;
uniform float uFold; uniform float uBlackPoint; uniform float uBrightness; uniform float uColorMode;
uniform float uGrain; uniform float uGrainIntensity; uniform float uOpacity; uniform vec2 uMouse;
uniform float uMouseStrength; uniform bool uEnableMouse; uniform vec3 uColor1; uniform vec3 uColor2; uniform vec3 uColor3;
out vec4 fragColor;
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
void main() {
  float time = iTime * uSpeed;
  vec2 p = uScale * ((gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y) - 0.5;
  if (uEnableMouse) p += (uMouse - 0.5) * uMouseStrength * 2.0;
  vec2 i = p; float c = 0.0;
  float r = length(p + vec2(sin(time), sin(time * 0.3 + 5.0)) * 0.5);
  float d = length(p); float rot = d + time + p.x * uSwirl; float cosRot = cos(rot);
  mat2 warp = mat2(cos(rot - sin(time / 5.0)), sin(rot), -sin(cosRot - time), cosRot) * uFold;
  float glowCore = uGlow * uCoreSize;
  for (float n = 0.0; n < 8.0; n++) {
    if (n >= uDetail) break;
    p *= warp; float t = r - time / (n + 3.0);
    i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
    c += glowCore / length(vec2(sin(i.x + t), cos(i.y + t)));
  }
  float g = clamp(max(c / 6.0 - uBlackPoint, 0.0) * uBrightness, 0.0, 1.0);
  float mid = uColorMode > 1.5 ? 0.65 : (uColorMode > 0.5 ? 0.35 : 0.5);
  vec3 col = mix(uColor1, uColor2, smoothstep(0.0, mid, g));
  col = mix(col, uColor3, smoothstep(mid, 1.0, g));
  float a = g;
  if (uGrain > 0.5) a += (hash(gl_FragCoord.xy + iTime) - 0.5) * uGrainIntensity;
  a = clamp(a, 0.0, 1.0) * uOpacity;
  fragColor = vec4(col * a, a);
}`;

const ctxMap = new WeakMap();

function MoltenMetal({
  color1 = "#5227FF", color2 = "#FF9FFC", color3 = "#FFFFFF", speed = 0.35,
  scale = 4, detail = 3, glow = 1.6, coreSize = 0.1, swirl = 1, fold = -0.2,
  blackPoint = 0.05, brightness = 1.3, colorMode = "molten", grain = true,
  grainIntensity = 0.05, mouseInteraction = true, mouseStrength = 0.3, opacity = 1, className = ""
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    const renderer = new Renderer({ webgl: 2, alpha: true, premultipliedAlpha: true, antialias: false, dpr: Math.min(devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    const canvas = gl.canvas;
    Object.assign(canvas.style, { width: "100%", height: "100%", display: "block" });
    container.appendChild(canvas);
    const program = new Program(gl, { vertex, fragment, uniforms: {
      iTime: { value: 0 }, iResolution: { value: new Float32Array([1, 1]) }, uSpeed: { value: speed }, uScale: { value: scale }, uDetail: { value: detail }, uGlow: { value: glow }, uCoreSize: { value: Math.max(coreSize, 0.001) }, uSwirl: { value: swirl }, uFold: { value: fold }, uBlackPoint: { value: blackPoint }, uBrightness: { value: brightness }, uColorMode: { value: colorModeToFloat(colorMode) }, uGrain: { value: grain ? 1 : 0 }, uGrainIntensity: { value: grainIntensity }, uOpacity: { value: opacity }, uMouse: { value: new Float32Array([0.5, 0.5]) }, uMouseStrength: { value: mouseStrength }, uEnableMouse: { value: mouseInteraction }, uColor1: { value: new Float32Array(hexToRgb(color1)) }, uColor2: { value: new Float32Array(hexToRgb(color2)) }, uColor3: { value: new Float32Array(hexToRgb(color3)) }
    }});
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });
    ctxMap.set(container, { renderer, program });
    const resize = () => { const rect = container.getBoundingClientRect(); renderer.setSize(Math.max(1, Math.floor(rect.width)), Math.max(1, Math.floor(rect.height))); program.uniforms.iResolution.value.set([gl.drawingBufferWidth, gl.drawingBufferHeight]); };
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(container); resize();
    const targetMouse = [0.5, 0.5], currentMouse = [0.5, 0.5];
    const onMove = event => { const rect = canvas.getBoundingClientRect(); targetMouse[0] = (event.clientX - rect.left) / rect.width; targetMouse[1] = 1 - (event.clientY - rect.top) / rect.height; };
    const onLeave = () => { targetMouse[0] = 0.5; targetMouse[1] = 0.5; };
    canvas.addEventListener("mousemove", onMove); canvas.addEventListener("mouseleave", onLeave);
    let animationFrame = 0; const startedAt = performance.now();
    const render = now => { program.uniforms.iTime.value = (now - startedAt) / 1000; currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.05; currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.05; program.uniforms.uMouse.value.set(currentMouse); renderer.render({ scene: mesh }); animationFrame = requestAnimationFrame(render); };
    animationFrame = requestAnimationFrame(render);
    return () => { cancelAnimationFrame(animationFrame); resizeObserver.disconnect(); canvas.removeEventListener("mousemove", onMove); canvas.removeEventListener("mouseleave", onLeave); ctxMap.delete(container); canvas.remove(); gl.getExtension("WEBGL_lose_context")?.loseContext(); };
  }, [color1, color2, color3, speed, scale, detail, glow, coreSize, swirl, fold, blackPoint, brightness, colorMode, grain, grainIntensity, mouseInteraction, mouseStrength, opacity]);

  useEffect(() => {
    const context = ctxMap.get(containerRef.current);
    if (!context) return;
    const u = context.program.uniforms;
    Object.assign(u.uSpeed, { value: speed }); Object.assign(u.uScale, { value: scale }); Object.assign(u.uDetail, { value: detail }); Object.assign(u.uGlow, { value: glow }); Object.assign(u.uCoreSize, { value: Math.max(coreSize, 0.001) }); Object.assign(u.uSwirl, { value: swirl }); Object.assign(u.uFold, { value: fold }); Object.assign(u.uBlackPoint, { value: blackPoint }); Object.assign(u.uBrightness, { value: brightness }); Object.assign(u.uColorMode, { value: colorModeToFloat(colorMode) }); Object.assign(u.uGrain, { value: grain ? 1 : 0 }); Object.assign(u.uGrainIntensity, { value: grainIntensity }); Object.assign(u.uOpacity, { value: opacity }); Object.assign(u.uMouseStrength, { value: mouseStrength }); Object.assign(u.uEnableMouse, { value: mouseInteraction }); u.uColor1.value.set(hexToRgb(color1)); u.uColor2.value.set(hexToRgb(color2)); u.uColor3.value.set(hexToRgb(color3));
  }, [color1, color2, color3, speed, scale, detail, glow, coreSize, swirl, fold, blackPoint, brightness, colorMode, grain, grainIntensity, mouseInteraction, mouseStrength, opacity]);
  return <div ref={containerRef} className={`molten-metal-container ${className}`.trim()} />;
}

export default MoltenMetal;
