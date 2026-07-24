import Link from "next/link";

const navigation = [
  { label: "Work", href: "/#work" },
  { label: "Approach", href: "/#approach", desktopOnly: true },
  { label: "Experience", href: "/#experience", desktopOnly: true },
  { label: "Résumé", href: "/resume" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/88 backdrop-blur-xl print:hidden">
      <div className="shell flex min-h-16 items-center justify-between md:min-h-18">
        <Link
          className="group inline-flex min-h-11 items-center gap-3"
          href="/"
          aria-label="Jivesh Lakhani, home"
        >
          <span className="font-mono text-base font-bold tracking-[-0.04em]">
            Menma<span className="text-signal">/</span>
          </span>
          <span className="hidden text-xs text-dim sm:block">
            AI product engineer
          </span>
        </Link>

        <nav className="flex items-center gap-4 text-xs text-muted sm:gap-7" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              className={`${item.desktopOnly ? "hidden md:inline-flex" : "inline-flex"} min-h-11 items-center transition-colors hover:text-ink`}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="inline-flex min-h-9 items-center rounded-full bg-signal px-4 font-semibold text-[#06101a] transition hover:-translate-y-0.5 hover:bg-signal-bright"
            href="/#contact"
          >
            Let&apos;s talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
