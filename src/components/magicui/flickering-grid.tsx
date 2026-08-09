"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export function FlickeringGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let timer = 0;

    const draw = () => {
      const ratio = window.devicePixelRatio || 1;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.clearRect(0, 0, canvas.width, canvas.height);
      const color = getComputedStyle(document.documentElement).getPropertyValue("--foreground-rgb").trim() || "15 23 42";
      for (let y = 0; y < height; y += 7) {
        for (let x = 0; x < width; x += 7) {
          const opacity = media.matches ? 0.08 : Math.random() * 0.16;
          context.fillStyle = `rgb(${color} / ${opacity})`;
          context.fillRect(x * ratio, y * ratio, 2 * ratio, 2 * ratio);
        }
      }
    };

    const tick = () => {
      draw();
      timer = window.setTimeout(() => { frame = window.requestAnimationFrame(tick); }, 110);
    };
    tick();
    window.addEventListener("resize", draw);
    return () => {
      window.clearTimeout(timer);
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", draw);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("h-full w-full", className)} />;
}
