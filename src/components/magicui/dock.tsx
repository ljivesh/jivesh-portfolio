"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type DockContextValue = { mouseX: MotionValue<number> };
const DockContext = createContext<DockContextValue | null>(null);

export function Dock({ children, className }: { children: ReactNode; className?: string }) {
  const mouseX = useMotionValue(Infinity);
  return (
    <DockContext.Provider value={{ mouseX }}>
      <motion.div
        className={cn("flex h-14 w-max items-end gap-1 rounded-full border p-2", className)}
        onMouseMove={(event) => mouseX.set(event.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {children}
      </motion.div>
    </DockContext.Provider>
  );
}

export function DockIcon({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const context = useContext(DockContext);
  if (!context) throw new Error("DockIcon must be used inside Dock");

  const distance = useTransform(context.mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return value - bounds.x - bounds.width / 2;
  });
  const size = useSpring(useTransform(distance, [-90, 0, 90], [38, 54, 38]), {
    mass: 0.1,
    stiffness: 170,
    damping: 14,
  });

  return (
    <motion.div ref={ref} style={{ width: size, height: size }} className={cn("relative grid shrink-0 place-items-center rounded-full", className)}>
      {children}
    </motion.div>
  );
}
