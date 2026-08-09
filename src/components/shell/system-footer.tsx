"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contacts, identity } from "@/data/portfolio";

export function SystemFooter() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <footer className="border-t border-line print:hidden"><div className="shell flex flex-col gap-6 py-10 sm:flex-row sm:items-end sm:justify-between"><div><Link href="/" className="font-semibold tracking-[-.025em]">{identity.name}<span className="text-signal">.</span></Link><p className="mt-2 text-xs text-text-soft-400">AI products, backend systems, and production ownership.</p></div><div className="flex flex-wrap gap-4 text-xs text-text-sub-600">{contacts.map((contact) => <a key={contact.label} href={contact.href} target={contact.external ? "_blank" : undefined} rel={contact.external ? "noreferrer" : undefined} className="hover:text-signal">{contact.label}</a>)}</div></div><div className="border-t border-line"><div className="shell py-4 font-mono text-[9px] text-text-soft-400">© 2026 {identity.name} · Jaipur, India</div></div></footer>;
}
