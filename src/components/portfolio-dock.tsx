"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BriefcaseBusiness, Code2, Home, MessageSquareText, Moon, Network, PenLine, Sun, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { Dock, DockIcon } from "@/components/magicui/dock";

const links: { href: string; label: string; icon: LucideIcon; external?: boolean }[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/#projects", label: "Work", icon: BriefcaseBusiness },
  { href: "/writing", label: "Writing", icon: PenLine },
  { href: "/guestbook", label: "Guestbook", icon: MessageSquareText },
  { href: "https://github.com/ljivesh", label: "GitHub", icon: Code2, external: true },
  { href: "https://linkedin.com/in/jivesh-lakhani", label: "LinkedIn", icon: Network, external: true },
];

export function PortfolioDock() {
  const pathname = usePathname();
  const { resolvedTheme, setTheme } = useTheme();
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-80 print:hidden">
      <Dock className="pointer-events-auto mx-auto border-line bg-card/88 shadow-dock backdrop-blur-2xl">
        {links.map((item) => (
          <DockIcon className="group" key={item.href}>
            <Link
              className="dock-button"
              href={item.href}
              aria-label={item.label}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noreferrer" : undefined}
            >
              <item.icon className="size-4.5" />
              <span className="dock-tooltip">{item.label}</span>
            </Link>
          </DockIcon>
        ))}
        <span className="mx-1 h-7 w-px bg-line" aria-hidden="true" />
        <DockIcon className="group">
          <button
            className="dock-button"
            type="button"
            aria-label="Toggle color theme"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            {resolvedTheme === "dark" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
            <span className="dock-tooltip">Theme</span>
          </button>
        </DockIcon>
      </Dock>
    </div>
  );
}
