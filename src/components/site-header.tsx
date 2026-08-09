"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, Palette } from "lucide-react";
import { useState } from "react";

const navigation = [
  ["Work", "/work"],
  ["Writing", "/writing"],
  ["Guestbook", "/guestbook"],
  ["Contact", "/contact"],
  ["Résumé", "/resume"],
];

export function SiteHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  if (pathname === "/" || pathname.startsWith("/admin")) return null;

  return (
    <header className="site-header print:hidden">
      <div className="site-header-inner">
        <Link className="site-brand" href="/">MENMA<span>/</span><small>Jivesh Lakhani</small></Link>
        <nav className={open ? "open" : ""} aria-label="Primary navigation">
          {navigation.map(([label, href]) => <Link className={pathname === href ? "active" : ""} href={href} key={href} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <div className="site-actions">
          <button type="button" onClick={() => setTheme(theme === "green" ? "amber" : "green")} aria-label="Change phosphor color"><Palette /></button>
          <button className="site-menu-button" type="button" onClick={() => setOpen(!open)} aria-label="Toggle navigation"><Menu /></button>
        </div>
      </div>
    </header>
  );
}
