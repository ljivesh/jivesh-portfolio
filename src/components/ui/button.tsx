import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-10 px-4 text-sm font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        primary: "bg-signal text-signal-contrast hover:-translate-y-0.5 hover:brightness-110",
        neutral: "border border-stroke-soft bg-bg-white-5 text-text-strong-950 hover:border-stroke-strong hover:bg-bg-white-10",
        ghost: "text-text-sub-600 hover:bg-bg-white-5 hover:text-text-strong-950",
        danger: "bg-error-base text-white hover:bg-error-dark",
      },
      size: { sm: "min-h-8 rounded-8 px-3 text-xs", md: "min-h-10", lg: "min-h-12 rounded-12 px-5" },
    },
    defaultVariants: { variant: "neutral", size: "md" },
  },
);

type Props = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({ className, variant, size, asChild, ...props }: Props) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
