"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contacts, identity } from "@/data/portfolio";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/" || pathname.startsWith("/admin")) return null;
  return (
    <footer className="site-footer print:hidden">
      <div><Link href="/" className="site-brand">MENMA<span>/</span></Link><p>{identity.shortRole} from Jaipur, India.</p></div>
      <div>{contacts.map((link) => <a href={link.href} key={link.label} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>{link.label}</a>)}</div>
      <p>© 2026 Jivesh Lakhani · Raw WebGL2 terminal adapted under MIT license.</p>
    </footer>
  );
}
