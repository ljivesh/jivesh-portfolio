import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("min-h-11 w-full rounded-10 border border-stroke-soft bg-bg-strong-950/60 px-3.5 text-sm text-text-strong-950 outline-none transition placeholder:text-text-soft-400 focus:border-signal focus:ring-2 focus:ring-signal/15", className)} {...props} />;
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn("min-h-32 w-full resize-y rounded-10 border border-stroke-soft bg-bg-strong-950/60 px-3.5 py-3 text-sm leading-6 text-text-strong-950 outline-none transition placeholder:text-text-soft-400 focus:border-signal focus:ring-2 focus:ring-signal/15", className)} {...props} />;
}
