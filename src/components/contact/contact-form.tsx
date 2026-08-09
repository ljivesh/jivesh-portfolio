"use client";

import { useMutation } from "@tanstack/react-query";
import { Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

export function ContactForm() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const submit = useMutation({ mutationFn: async (form: HTMLFormElement) => { const response = await fetch("/api/contact", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) }); const body = await response.json(); if (!response.ok) throw new Error(body.error ?? "Message failed"); return body; }, onSuccess: (_, form) => { form.reset(); setMessage({ type: "success", text: "Message stored and transmitted. I’ll respond as soon as I can." }); }, onError: (cause) => setMessage({ type: "error", text: cause instanceof Error ? cause.message : "Message failed" }) });
  return <form className="space-y-4" onSubmit={(event) => { event.preventDefault(); setMessage(null); submit.mutate(event.currentTarget); }}><div className="grid gap-4 sm:grid-cols-2"><label><span className="mb-1.5 block font-mono text-[9px] text-text-soft-400">YOUR NAME</span><Input name="name" required maxLength={80} placeholder="What should I call you?" /></label><label><span className="mb-1.5 block font-mono text-[9px] text-text-soft-400">EMAIL *</span><Input type="email" name="email" required maxLength={160} placeholder="you@example.com" /></label></div><label className="block"><span className="mb-1.5 block font-mono text-[9px] text-text-soft-400">SUBJECT *</span><Input name="subject" required maxLength={140} placeholder="Role, product idea, or collaboration" /></label><label className="block"><span className="mb-1.5 block font-mono text-[9px] text-text-soft-400">MESSAGE *</span><Textarea name="message" required maxLength={4000} rows={7} placeholder="Tell me what you're building and where I can help..." /></label><input name="website" className="hidden" tabIndex={-1} autoComplete="off"/><div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"><p className={`text-sm ${message?.type === "error" ? "text-error-base" : "text-success-base"}`} role="status">{message?.text}</p><Button variant="primary" size="lg" disabled={submit.isPending} type="submit"><Send size={16}/>{submit.isPending ? "Sending..." : "Send message"}</Button></div></form>;
}
