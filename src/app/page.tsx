import Link from "next/link";
import { PixelSystemGraphic } from "@/components/pixel-system-graphic";
import { ProjectCard } from "@/components/project-card";
import {
  capabilityGroups,
  contacts,
  education,
  experience,
  identity,
  operatingModel,
  principles,
  projects,
} from "@/data/portfolio";

function SectionIntro({
  number,
  label,
  title,
  copy,
}: {
  number: string;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-[180px_1fr] lg:gap-10">
      <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">
        {number} / {label}
      </p>
      <div>
        <h2 className="max-w-210 text-[clamp(2.25rem,4.8vw,4.25rem)] leading-[1.02] font-medium tracking-[-0.055em]">
          {title}
        </h2>
        {copy ? <p className="mt-6 max-w-165 text-base leading-7 text-muted sm:text-lg sm:leading-8">{copy}</p> : null}
      </div>
    </div>
  );
}

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    jobTitle: "Founding Engineer",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    email: identity.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaipur",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
    },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
    sameAs: ["https://linkedin.com/in/jivesh-lakhani", "https://github.com/ljivesh"],
    knowsAbout: [
      "AI agents",
      "Retrieval-augmented generation",
      "Backend engineering",
      "Full-stack product engineering",
      "Shopify application development",
      "Browser automation",
      "Cloud infrastructure",
    ],
  };

  return (
    <main id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="hero-field relative overflow-hidden border-b border-line">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="hero-status flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-[10px] tracking-[0.08em] uppercase">
              <span className="inline-flex items-center gap-2 text-signal">
                <span className="status-dot size-2 rounded-full bg-signal" aria-hidden="true" />
                Available for the right role
              </span>
              <span className="text-dim">{identity.location}</span>
            </div>

            <p className="font-mono text-[11px] tracking-[0.1em] text-muted uppercase">{identity.shortRole}</p>
            <h1 className="hero-title">
              I build AI products that survive contact with <span className="text-signal">production.</span>
            </h1>
            <p className="hero-intro">{identity.intro}</p>

            <div className="hero-actions flex flex-wrap gap-3">
              <Link className="button-primary" href="#work">Explore the work <span aria-hidden="true">↓</span></Link>
              <a className="button-secondary" href={`mailto:${identity.email}`}>Email me <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <PixelSystemGraphic />
        </div>
      </section>

      <section className="shell py-20 sm:py-28 lg:py-32" id="work">
        <SectionIntro
          number="01"
          label="Selected systems"
          title="Products with workflows, users, integrations, and consequences."
          copy="Five products I have built or co-built, including customer-facing AI agents, Shopify storefront tools, sales platforms, and media automation."
        />
        <div className="grid overflow-hidden rounded-2xl border border-line lg:grid-cols-2">
          {projects.map((project) => (
            <div className="border-line lg:border-r lg:nth-[2n]:border-r-0 last:lg:col-span-2 last:lg:border-r-0" key={project.slug}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-raised" id="approach">
        <div className="shell py-20 sm:py-28 lg:py-32">
          <SectionIntro
            number="02"
            label="How I work"
            title="End-to-end is a responsibility, not a stack label."
            copy="I move across layers because the difficult part of product engineering is often the handoff between them."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operatingModel.map((item, index) => (
              <article className="rounded-xl border border-line bg-paper p-6 sm:min-h-72" key={item.step}>
                <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.08em] uppercase">
                  <span className="text-signal">0{index + 1}</span>
                  <span className="text-dim">{item.step}</span>
                </div>
                <h3 className="mt-10 text-xl leading-tight font-medium tracking-[-0.035em]">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-muted">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-28 lg:py-32" id="experience">
        <SectionIntro
          number="03"
          label="Experience"
          title="Broad ownership, with production responsibility attached."
          copy={identity.story}
        />
        {experience.map((item) => (
          <article className="overflow-hidden rounded-2xl border border-line" key={item.company}>
            <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14 lg:p-12">
              <div>
                <p className="font-mono text-[10px] tracking-[0.08em] text-signal uppercase">{item.period}</p>
                <h3 className="mt-4 text-[clamp(2rem,3.5vw,3.25rem)] leading-none font-medium tracking-[-0.05em]">{item.role}</h3>
                <p className="mt-3 text-sm text-muted">{item.company}</p>
                <p className="mt-1 font-mono text-[10px] text-dim">{item.location}</p>
                <div className="mt-8 border-l border-line pl-5">
                  {item.progression.map((point) => (
                    <div className="relative mb-6 last:mb-0" key={point.period}>
                      <span className="absolute top-1.5 -left-[1.43rem] size-2 rounded-full bg-signal" aria-hidden="true" />
                      <p className="font-mono text-[9px] text-dim">{point.period}</p>
                      <p className="mt-1 text-sm text-muted">{point.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="max-w-170 text-lg leading-8">{item.summary}</p>
                <ul className="mt-7 border-t border-line">
                  {item.bullets.map((bullet, index) => (
                    <li className="grid grid-cols-[28px_1fr] gap-3 border-b border-line py-4 text-sm leading-6 text-muted" key={bullet}>
                      <span className="font-mono text-[9px] text-signal">0{index + 1}</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="grid gap-5 border-t border-line bg-raised p-6 sm:p-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-14 lg:px-12">
              <p className="font-mono text-[10px] tracking-[0.08em] text-dim uppercase">Education</p>
              <div className="flex flex-col justify-between gap-4 sm:flex-row">
                <div>
                  <h3 className="font-medium">{education.degree}</h3>
                  <p className="mt-1 text-sm text-muted">{education.institution}</p>
                  <p className="mt-1 font-mono text-[9px] text-dim">{education.university}</p>
                </div>
                <div className="sm:text-right">
                  <p className="font-mono text-[10px] text-muted">{education.period}</p>
                  <p className="mt-1 text-sm text-signal">{education.score}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="border-y border-line bg-raised" id="capabilities">
        <div className="shell py-20 sm:py-28 lg:py-32">
          <SectionIntro
            number="04"
            label="Technical range"
            title="The useful skill is connecting the pieces."
            copy="My strongest work sits where product, AI, backend systems, third-party platforms, and production operations meet."
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {capabilityGroups.map((group) => (
              <article className="rounded-xl border border-line bg-paper p-6 sm:p-8" key={group.label}>
                <div className="flex items-start gap-5">
                  <p className="font-mono text-[10px] text-signal">{group.number}</p>
                  <div>
                    <h3 className="text-2xl font-medium tracking-[-0.04em]">{group.label}</h3>
                    <p className="mt-3 max-w-125 text-sm leading-6 text-muted">{group.description}</p>
                  </div>
                </div>
                <div className="mt-7 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-[9px] text-muted" key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 font-mono text-[9px] tracking-[0.05em] text-dim uppercase">
            {principles.map((principle) => <span className="before:mr-2 before:text-signal before:content-['+']" key={principle}>{principle}</span>)}
          </div>
        </div>
      </section>

      <section className="shell py-20 sm:py-32 lg:py-40" id="contact">
        <div className="max-w-230">
          <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">05 / Contact</p>
          <h2 className="mt-6 text-[clamp(2.8rem,6.2vw,6rem)] leading-[0.94] font-medium tracking-[-0.065em]">Need an engineer who can take the whole problem?</h2>
          <p className="mt-7 max-w-150 text-lg leading-8 text-muted">{identity.availability}</p>
          <a className="contact-link group mt-10 flex items-center justify-between gap-5 border-y border-line py-6" href={`mailto:${identity.email}`}>
            <span className="truncate text-[clamp(1.35rem,4vw,3.75rem)] leading-none tracking-[-0.045em] text-signal">{identity.email}</span>
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line-strong transition group-hover:border-signal group-hover:bg-signal group-hover:text-[#06101a]" aria-hidden="true">↗</span>
          </a>
          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] text-dim">{identity.location}</p>
            <div className="flex flex-wrap gap-5 text-sm text-muted">
              {contacts.filter((link) => link.label !== "Email").map((link) => (
                <a className="transition-colors hover:text-signal" key={link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}>{link.label} ↗</a>
              ))}
              <Link className="transition-colors hover:text-signal" href="/resume">Web résumé →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
