import Link from "next/link";
import { contacts, identity } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="border-t border-line print:hidden">
      <div className="shell grid gap-8 py-10 sm:grid-cols-[1fr_auto] sm:items-end sm:py-12">
        <div>
          <Link className="text-lg font-medium tracking-[-0.03em]" href="/">
            {identity.name}<span className="text-signal">.</span>
          </Link>
          <p className="mt-2 max-w-120 text-sm text-dim">
            AI products, backend systems, and production ownership from Jaipur, India.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] text-muted">
          {contacts.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="transition-colors hover:text-signal"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="shell flex flex-col gap-2 py-5 font-mono text-[10px] tracking-[0.04em] text-dim uppercase sm:flex-row sm:justify-between">
          <p>© 2026 {identity.name}</p>
          <p>AI products · Backend systems · Production ownership</p>
        </div>
      </div>
    </footer>
  );
}
