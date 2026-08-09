import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("inline-flex items-center rounded-full border border-stroke-soft bg-bg-white-5 px-2.5 py-1 font-mono text-[10px] tracking-wide text-text-sub-600 uppercase", className)} {...props} />;
}
