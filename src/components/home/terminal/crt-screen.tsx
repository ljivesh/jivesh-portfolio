"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  ShaderMaterial,
  Vector2,
} from "three";
import type { ThemeMode } from "@/lib/terminal";

type Props = {
  geometry: BufferGeometry;
  texture: CanvasTexture;
  theme: ThemeMode;
  freezeAnimation: boolean;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTextTexture;
  uniform float uTime;
  uniform vec3 uPhosphor;
  uniform vec2 uSafeInset;
  uniform float uGlowStrength;
  uniform float uNoiseStrength;
  uniform float uReflectionStrength;

  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;

  float random(vec2 seed) {
    float tick = mod(uTime, 1.0) + 1.0;
    return fract(sin(dot(seed * tick, vec2(11.9898, 78.233))) * 43758.5453);
  }

  float insideUnitSquare(vec2 uv) {
    return step(0.0, uv.x) * step(0.0, uv.y) * step(uv.x, 1.0) * step(uv.y, 1.0);
  }

  float glyph(vec2 uv) {
    return texture2D(uTextTexture, clamp(uv, 0.0, 1.0)).a * insideUnitSquare(uv);
  }

  void main() {
    vec2 textUv = (vUv - uSafeInset) / (vec2(1.0) - uSafeInset * 2.0);
    float textMask = insideUnitSquare(textUv);
    vec2 sampledUv = clamp(textUv, 0.0, 1.0);

    float scanPhase = fract(vUv.y * 115.0);
    float scanLines = smoothstep(0.08, 0.34, abs(scanPhase - 0.22));
    float textScan = 0.72 + scanLines * 0.28;

    float noise = (random(vUv * vec2(751.0, 419.0)) - 0.5) * uNoiseStrength;
    float scanPosition = 1.0 - mod(uTime / 5.0, 2.0);
    float sweepDistance = (vUv.y - scanPosition) / 0.2;
    float sweep = exp(-sweepDistance * sweepDistance);

    // The canvas is transparent outside glyphs. Read alpha only so the
    // terminal's rectangular texture bounds can never tint the CRT glass.
    float direct = glyph(textUv);
    vec2 texel = vec2(1.0 / 1280.0, 1.0 / 1024.0);
    vec2 nearStep = texel * 4.0;
    vec2 midStep = texel * 10.0;
    vec2 farStep = texel * 20.0;
    float nearGlow = glyph(textUv + vec2(nearStep.x, 0.0)) + glyph(textUv - vec2(nearStep.x, 0.0));
    nearGlow += glyph(textUv + vec2(0.0, nearStep.y)) + glyph(textUv - vec2(0.0, nearStep.y));
    nearGlow += glyph(textUv + nearStep) + glyph(textUv - nearStep);
    nearGlow += glyph(textUv + vec2(nearStep.x, -nearStep.y)) + glyph(textUv + vec2(-nearStep.x, nearStep.y));
    float midGlow = glyph(textUv + vec2(midStep.x, 0.0)) + glyph(textUv - vec2(midStep.x, 0.0));
    midGlow += glyph(textUv + vec2(0.0, midStep.y)) + glyph(textUv - vec2(0.0, midStep.y));
    midGlow += glyph(textUv + midStep) + glyph(textUv - midStep);
    midGlow += glyph(textUv + vec2(midStep.x, -midStep.y)) + glyph(textUv + vec2(-midStep.x, midStep.y));
    float farGlow = glyph(textUv + vec2(farStep.x, 0.0)) + glyph(textUv - vec2(farStep.x, 0.0));
    farGlow += glyph(textUv + vec2(0.0, farStep.y)) + glyph(textUv - vec2(0.0, farStep.y));
    float glow = direct * 0.35 + nearGlow * 0.085 + midGlow * 0.045 + farGlow * 0.025;

    vec2 centered = vUv * 2.0 - 1.0;
    float backlight = max(0.0, 1.7 - length(centered / vec2(0.72, 0.62)));
    // A switched-on tube has one continuous, faint phosphor-black base over
    // the full physical glass—not a separate background behind the text.
    vec3 color = vec3(0.004, 0.004, 0.003) + uPhosphor * backlight * 0.009;
    color += uPhosphor * scanLines * backlight * 0.016;
    color += uPhosphor * sweep * backlight * 0.014;
    color += vec3(noise);

    vec3 hotCore = mix(uPhosphor, vec3(1.0, 0.72, 0.28), smoothstep(0.4, 1.0, direct));
    color += hotCore * direct * textScan;
    color += uPhosphor * glow * uGlowStrength * textScan;
    color *= 0.78 + scanLines * 0.22;

    vec3 normal = normalize(vWorldNormal);
    vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
    vec3 lightDirection = normalize(vec3(-0.45, 0.8, 0.55));
    vec3 halfDirection = normalize(viewDirection + lightDirection);
    float specular = pow(max(dot(normal, halfDirection), 0.0), 24.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDirection), 0.0), 3.0);

    // Reflect fixed lights in world space. Unlike a UV-painted highlight,
    // these lobes travel across the curved glass as the camera orbits.
    vec3 reflectedDirection = reflect(-viewDirection, normal);
    vec3 overheadSource = normalize(vec3(-0.35, 0.88, 0.3));
    vec3 sideSource = normalize(vec3(0.82, 0.38, 0.42));
    float overheadReflection = pow(max(dot(reflectedDirection, overheadSource), 0.0), 18.0);
    float overheadHalo = pow(max(dot(reflectedDirection, overheadSource), 0.0), 5.0);
    float sideReflection = pow(max(dot(reflectedDirection, sideSource), 0.0), 28.0);
    vec3 reflectedLight = (
      vec3(0.48, 0.41, 0.31) * (overheadReflection * 0.13 + overheadHalo * 0.018) +
      vec3(0.3, 0.34, 0.38) * sideReflection * 0.07 +
      vec3(0.12) * specular * 0.08 +
      vec3(0.035) * fresnel
    ) * uReflectionStrength;
    color += reflectedLight;

    float edgeDistance = min(min(vUv.x, 1.0 - vUv.x), min(vUv.y, 1.0 - vUv.y));
    float edgeFalloff = smoothstep(0.0, 0.14, edgeDistance);
    float roundedFalloff = 1.0 - smoothstep(0.78, 1.15, length(centered * vec2(0.88, 1.0)));
    color *= mix(0.16, 1.0, edgeFalloff * roundedFalloff);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function CrtScreen({ geometry, texture, theme, freezeAnimation }: Props) {
  const materialRef = useRef<ShaderMaterial | null>(null);
  const material = useMemo(() => {
    const shader = new ShaderMaterial({
      uniforms: {
        uTextTexture: { value: texture },
        uTime: { value: freezeAnimation ? 3.4 : 0 },
        uPhosphor: { value: new Color(0xff9632) },
        uSafeInset: { value: new Vector2(0.075, 0.105) },
        uGlowStrength: { value: 0.82 },
        uNoiseStrength: { value: 0.022 },
        uReflectionStrength: { value: 0.9 },
      },
      vertexShader,
      fragmentShader,
      side: DoubleSide,
      depthWrite: true,
      depthTest: true,
      transparent: false,
      toneMapped: false,
    });
    return shader;
  }, [freezeAnimation, texture]);

  useEffect(() => {
    material.uniforms.uPhosphor.value.set(theme === "green" ? 0x7dff32 : 0xff9632);
  }, [material, theme]);

  useFrame(({ clock }) => {
    if (!freezeAnimation && materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh geometry={geometry} renderOrder={2}>
      <primitive ref={materialRef} object={material} attach="material" />
    </mesh>
  );
}
