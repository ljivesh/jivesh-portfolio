import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-16 border border-stroke-soft bg-bg-weak-950/78 shadow-regular-xs backdrop-blur-xl", className)} {...props} />;
}
