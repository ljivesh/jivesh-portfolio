import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/portfolio";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} | Jivesh Lakhani`,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main id="main-content">
      <header className="hero-field relative overflow-hidden border-b border-line">
        <div className="shell py-12 sm:py-18 lg:py-22">
          <Link className="inline-flex min-h-11 items-center font-mono text-[11px] text-muted transition-colors hover:text-signal" href="/work">
            ← Back to selected work
          </Link>

          <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[180px_1fr] lg:gap-10">
            <div>
              <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">
                Case study {project.number}
              </p>
              <p className="mt-3 font-mono text-[10px] tracking-[0.08em] text-dim uppercase">
                {project.category}
              </p>
            </div>
            <div>
              <h1 className="mt-5 max-w-230 text-[clamp(2.8rem,6.5vw,6rem)] leading-[0.94] font-medium tracking-[-0.065em]">
                {project.title}
              </h1>
              <p className="mt-7 max-w-175 text-[clamp(1.05rem,1.8vw,1.35rem)] leading-8 text-muted">
                {project.summary}
              </p>
            </div>
          </div>
        </div>
      </header>

      <section className="shell grid gap-8 border-b border-line py-10 lg:grid-cols-[180px_1fr_0.7fr] lg:gap-10 lg:py-14" aria-label="Project facts">
        <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">My role</p>
        <div>
          <p className="text-lg leading-8 text-muted">{project.role}</p>
          {project.collaboration ? <p className="mt-5 font-mono text-[10px] leading-5 text-dim">{project.collaboration}</p> : null}
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.08em] text-dim uppercase">Core technologies</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span className="rounded-full border border-line-strong px-2.5 py-1.5 font-mono text-[10px] text-muted" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-raised" aria-label="System architecture">
        <div className="shell py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:gap-10">
            <div>
              <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">System path</p>
              <p className="mt-4 max-w-55 text-sm leading-6 text-muted">A simplified view of the product workflow.</p>
            </div>
            <ol className="grid overflow-hidden rounded-xl border border-line sm:grid-cols-2 lg:grid-cols-3">
              {project.architecture.map((step, index) => (
                <li className="relative min-h-30 border-b border-r border-line bg-paper p-5 lg:min-h-34" key={step}>
                  <span className="font-mono text-[10px] text-signal">0{index + 1}</span>
                  <p className="mt-9 max-w-40 text-sm font-medium leading-5">{step}</p>
                  {index < project.architecture.length - 1 ? (
                    <span className="absolute right-4 bottom-4 text-dim" aria-hidden="true">→</span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <div className="shell py-12 sm:py-18 lg:py-22">
        {project.sections.map((section, index) => (
          <section className="grid gap-6 border-b border-line py-10 first:pt-0 lg:grid-cols-[180px_1fr] lg:gap-10 lg:py-14" key={section.title}>
            <div>
              <p className="font-mono text-[10px] text-signal">0{index + 1}</p>
              <p className="mt-2 font-mono text-[10px] tracking-[0.08em] text-dim uppercase">{section.eyebrow}</p>
            </div>
            <div>
              <h2 className="max-w-190 text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.05] font-medium tracking-[-0.05em]">{section.title}</h2>
              <div className="mt-8 max-w-190">
                {section.paragraphs?.map((paragraph) => (
                  <p className="mb-5 text-[17px] leading-8 text-muted" key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="border-t border-line">
                    {section.bullets.map((bullet, bulletIndex) => (
                      <li className="grid gap-3 border-b border-line py-4 text-[16px] leading-7 text-muted sm:grid-cols-[34px_1fr]" key={bullet}>
                        <span className="font-mono text-[10px] text-signal">{String(bulletIndex + 1).padStart(2, "0")}</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </section>
        ))}
      </div>

      <aside className="border-t border-line bg-raised">
        <div className="shell py-14 sm:py-20">
          <p className="font-mono text-[11px] tracking-[0.1em] text-signal uppercase">Next system</p>
          <Link className="group mt-7 flex items-end justify-between gap-7 border-b border-line-strong pb-7" href={`/work/${nextProject.slug}`}>
            <span>
              <span className="mb-3 block font-mono text-[10px] text-dim">{nextProject.number} / {nextProject.category}</span>
              <span className="block max-w-220 text-[clamp(2rem,4.5vw,4rem)] leading-none tracking-[-0.055em] transition-colors group-hover:text-signal">{nextProject.title}</span>
            </span>
            <span className="grid size-12 shrink-0 place-items-center rounded-full border border-line-strong text-xl transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-signal group-hover:bg-signal group-hover:text-[#06101a]" aria-hidden="true">↗</span>
          </Link>
        </div>
      </aside>
    </main>
  );
}
