"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { BriefcaseBusiness, CodeXml, FileText, Mail, Menu, Monitor, Volume2, VolumeX, X } from "lucide-react";
import { brand, capabilityGroups, contacts, experience, identity, projects } from "@/data/portfolio";
import { RetroComputerTerminal } from "./macintosh-terminal";

const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

const routeLinks = [
  { label: "All work", href: "/work" },
  { label: "Writing", href: "/writing" },
  { label: "Guestbook", href: "/guestbook" },
  { label: "Contact", href: "/contact" },
  { label: "Résumé", href: "/resume" },
];

export function MenmaPortfolio() {
  const { theme, setTheme } = useTheme();
  const [retro, setRetro] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const frameId = requestAnimationFrame(() => setSound(localStorage.getItem("menma-sound") === "on"));
    return () => cancelAnimationFrame(frameId);
  }, []);

  useEffect(() => {
    const root = document.querySelector(".menma-scroll");
    if (!root) return;
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { root, threshold: [0.25, 0.55] });
    root.querySelectorAll("[data-home-section]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function toggleRetro() {
    const next = !retro;
    if (next && localStorage.getItem("menma-sound") === null) {
      setSound(true);
      localStorage.setItem("menma-sound", "on");
    }
    setRetro(next);
    setMenuOpen(false);
  }

  function toggleSound() {
    const next = !sound;
    setSound(next);
    localStorage.setItem("menma-sound", next ? "on" : "off");
  }

  function moveGlow(event: React.PointerEvent<HTMLElement>) {
    event.currentTarget.style.setProperty("--glow-x", `${event.clientX}px`);
    event.currentTarget.style.setProperty("--glow-y", `${event.clientY}px`);
  }

  function scrambleTitle(event: React.MouseEvent<HTMLElement>) {
    const target = event.currentTarget.querySelector("strong");
    if (!target) return;
    const original = target.dataset.value ?? target.textContent ?? "";
    const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
    let iteration = 0;
    const timer = window.setInterval(() => {
      target.textContent = original.split("").map((character, index) => index < iteration || character === " " ? character : alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
      iteration += 1;
      if (iteration > original.length) window.clearInterval(timer);
    }, 24);
  }

  return (
    <div className={`menma-experience ${retro ? "is-retro" : "is-modern"}`}>
      <section className="menma-modern" aria-hidden={retro} onPointerMove={moveGlow}>
        <div className="menma-glow" aria-hidden="true" />
        <header className="menma-routebar">
          <Link href="/" className="menma-mark">MENMA<span>/</span></Link>
          <nav aria-label="Portfolio routes">
            {routeLinks.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          </nav>
          <button type="button" onClick={() => setMenuOpen(true)} aria-label="Open navigation"><Menu /></button>
        </header>

        <aside className="menma-identity">
          <div>
            <p className="menma-handle">{brand.osName} / {identity.location}</p>
            <h1>{brand.name}</h1>
            <h2>{brand.realName} · {brand.tagline}</h2>
            <p>{brand.summary}</p>
          </div>
          <nav className="menma-section-nav" aria-label="Homepage sections">
            {sectionLinks.map((item) => (
              <a className={active === item.href.slice(1) ? "active" : ""} href={item.href} key={item.href}>
                <span aria-hidden="true" />{item.label}
              </a>
            ))}
          </nav>
          <div className="menma-socials">
            <a href="https://github.com/ljivesh" target="_blank" rel="noreferrer" aria-label="GitHub"><CodeXml /></a>
            <a href="https://linkedin.com/in/jivesh-lakhani" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness /></a>
            <a href={`mailto:${identity.email}`} aria-label="Email"><Mail /></a>
            <Link href="/resume" aria-label="Résumé"><FileText /></Link>
          </div>
        </aside>

        <div className="menma-scroll" tabIndex={-1}>
          <section id="about" data-home-section>
            <p className="menma-index">01 / PROFILE</p>
            <h2>About</h2>
            <p>{identity.intro}</p>
            <p>{identity.story}</p>
            <div className="menma-skills">
              {capabilityGroups.map((group) => <span key={group.label}>{group.label}</span>)}
            </div>
          </section>

          <section id="projects" data-home-section>
            <p className="menma-index">02 / SYSTEMS</p>
            <h2>Projects</h2>
            <p>Selected production systems I have architected, built, operated, or co-developed across AI commerce, sales automation, browser workflows, and personalized media.</p>
            <div className="menma-projects">
              {projects.map((project) => (
                <Link className="menma-project-row" href={`/work/${project.slug}`} key={project.slug} onMouseEnter={scrambleTitle}>
                  <strong data-value={project.title}>{project.title}</strong>
                  <span>{project.category}</span><i aria-hidden="true" /><small>{project.number}</small>
                </Link>
              ))}
            </div>
            <Link className="menma-text-link" href="/work">Open all case studies →</Link>
          </section>

          <section id="experience" data-home-section>
            <p className="menma-index">03 / EXPERIENCE</p>
            <h2>Experience</h2>
            {experience.map((item) => (
              <article className="menma-role" key={item.company}>
                <div><strong>{item.role}</strong><span>{item.company}</span><small>{item.period}</small></div>
                <p>{item.summary}</p>
                <ul>{item.bullets.slice(0, 4).map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              </article>
            ))}
          </section>

          <footer className="menma-inline-footer">
            <p>Built with Next.js, React, Tailwind CSS, and an embedded xterm.js shell.</p>
            <div>{contacts.filter((item) => item.label !== "Email").map((item) => <a href={item.href} key={item.label}>{item.label}</a>)}</div>
          </footer>
        </div>
      </section>

      {retro ? (
        <section className="menma-retro" aria-label="MENMA.OS retro terminal">
          <RetroComputerTerminal
            sound={sound}
            theme={theme === "green" ? "green" : "amber"}
            onSoundChange={(enabled) => {
              setSound(enabled);
              localStorage.setItem("menma-sound", enabled ? "on" : "off");
            }}
            onThemeChange={setTheme}
          />
        </section>
      ) : null}

      <div className="menma-controls">
        <button type="button" onClick={toggleSound} aria-label={sound ? "Mute terminal sounds" : "Enable terminal sounds"}>{sound ? <Volume2 /> : <VolumeX />}</button>
        <button className="menma-mode-toggle" type="button" onClick={toggleRetro} aria-label={retro ? "Return to modern portfolio" : "Open retro computer terminal"}>
          <Monitor /><span>{retro ? "Modern" : "Terminal"}</span>
        </button>
        <button type="button" onClick={() => setTheme(theme === "green" ? "amber" : "green")} aria-label="Change phosphor color"><span className="phosphor-dot" /></button>
      </div>

      {menuOpen ? (
        <div className="menma-menu" role="dialog" aria-modal="true" aria-label="Portfolio navigation">
          <button type="button" onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X /></button>
          <p>MENMA.OS / NAVIGATION</p>
          <nav>{[...sectionLinks, ...routeLinks].map((item, index) => <Link href={item.href} key={`${item.href}-${index}`} onClick={() => setMenuOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}</Link>)}</nav>
        </div>
      ) : null}
    </div>
  );
}
