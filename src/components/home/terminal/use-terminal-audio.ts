"use client";

import { useCallback, useEffect, useRef } from "react";

export type TerminalSound = "ambient" | "boot" | "beep" | "keyboard";

export function useTerminalAudio(enabled: boolean) {
  const ambientRef = useRef<HTMLAudioElement>(null);
  const bootRef = useRef<HTMLAudioElement>(null);
  const beepRef = useRef<HTMLAudioElement>(null);
  const keyboardRef = useRef<HTMLAudioElement>(null);
  const enabledRef = useRef(enabled);
  const unlockedRef = useRef(false);
  const poolsRef = useRef<{ beep: HTMLAudioElement[]; keyboard: HTMLAudioElement[] }>({ beep: [], keyboard: [] });
  const poolIndexRef = useRef({ beep: 0, keyboard: 0 });

  useEffect(() => { enabledRef.current = enabled; }, [enabled]);

  useEffect(() => {
    const ambient = ambientRef.current;
    const boot = bootRef.current;
    const beep = beepRef.current;
    const keyboard = keyboardRef.current;
    if (!ambient || !boot || !beep || !keyboard) return;

    ambient.volume = 0.025;
    boot.volume = 0.38;
    beep.volume = 0.34;
    keyboard.volume = 0.28;
    for (const audio of [ambient, boot, beep, keyboard]) audio.muted = !enabled;

    const createPool = (source: HTMLAudioElement, volume: number, size: number) => Array.from({ length: size }, () => {
      const audio = new Audio(source.currentSrc || source.src);
      audio.preload = "auto";
      audio.volume = volume;
      audio.muted = !enabled;
      return audio;
    });
    poolsRef.current = {
      beep: createPool(beep, beep.volume, 2),
      keyboard: createPool(keyboard, keyboard.volume, 5),
    };

    if (enabled) ambient.play().catch(() => undefined);
    else ambient.pause();
  }, [enabled]);

  const unlock = useCallback(() => {
    if (!enabledRef.current || unlockedRef.current) return;
    unlockedRef.current = true;
    const ambient = ambientRef.current;
    if (ambient) {
      ambient.muted = false;
      ambient.play().catch(() => { unlockedRef.current = false; });
    }
  }, []);

  const play = useCallback((sound: Exclude<TerminalSound, "ambient">) => {
    if (!enabledRef.current) return;
    const audio = sound === "boot" ? bootRef.current : sound === "beep" ? beepRef.current : keyboardRef.current;
    if (!audio) return;
    if (sound === "boot") {
      audio.muted = false;
      audio.currentTime = 0;
      audio.play().catch(() => undefined);
      return;
    }

    const pool = poolsRef.current[sound];
    const index = poolIndexRef.current[sound] % Math.max(1, pool.length);
    poolIndexRef.current[sound] += 1;
    const channel = pool[index] ?? audio;
    channel.muted = false;
    channel.currentTime = 0;
    channel.play().catch(() => {
      audio.muted = false;
      audio.currentTime = 0;
      audio.play().catch(() => undefined);
    });
  }, []);

  return { ambientRef, bootRef, beepRef, keyboardRef, play, unlock };
}
