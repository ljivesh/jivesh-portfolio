import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BlurFadeProps = HTMLAttributes<HTMLDivElement> & {
  delay?: number;
};

export function BlurFade({ children, className, delay = 0, style, ...props }: BlurFadeProps) {
  return (
    <div
      className={cn("blur-fade", className)}
      style={{ ...style, "--blur-delay": `${delay}s` } as CSSProperties}
      {...props}
    >
      {children}
    </div>
  );
}
