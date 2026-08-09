"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;

export function DialogContent({ className, children, title, description }: { className?: string; children: React.ReactNode; title: string; description?: string }) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-90 bg-black/70 backdrop-blur-md data-[state=open]:animate-fade-in" />
      <DialogPrimitive.Content className={cn("fixed top-1/2 left-1/2 z-100 max-h-[88svh] w-[min(calc(100%-2rem),44rem)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-20 border border-stroke-soft bg-bg-strong-950 p-5 shadow-regular-lg outline-none sm:p-6", className)}>
        <DialogPrimitive.Title className="font-mono text-xs tracking-[0.14em] text-signal uppercase">{title}</DialogPrimitive.Title>
        {description ? <DialogPrimitive.Description className="mt-2 text-sm text-text-sub-600">{description}</DialogPrimitive.Description> : null}
        {children}
        <DialogPrimitive.Close className="absolute top-4 right-4 grid size-9 place-items-center rounded-8 text-text-soft-400 transition hover:bg-bg-white-5 hover:text-text-strong-950" aria-label="Close"><X size={17} /></DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
