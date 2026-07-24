import Link from "next/link";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      className="project-card group relative grid min-h-105 overflow-hidden border-b border-line p-6 sm:p-8 lg:min-h-118 lg:p-9"
      href={`/work/${project.slug}`}
    >
      <div className="flex items-start justify-between gap-5">
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.08em] uppercase">
          <span className="text-signal">{project.number}</span>
          <span className="text-dim">{project.category}</span>
        </div>
        <span
          className="grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-base text-muted transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:border-signal group-hover:bg-signal group-hover:text-[#06101a]"
          aria-hidden="true"
        >
          ↗
        </span>
      </div>

      <div className="my-auto py-10">
        <h3 className="max-w-150 text-[clamp(1.75rem,3vw,2.65rem)] leading-[1.06] font-medium tracking-[-0.05em]">
          {project.title}
        </h3>
        <p className="mt-5 max-w-145 text-[15px] leading-7 text-muted sm:text-base">
          {project.summary}
        </p>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line pt-6">
        <div className="flex flex-wrap gap-2" aria-label={`${project.title} core technologies`}>
          {project.coreTechnologies.map((technology) => (
            <span
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] text-muted"
              key={technology}
            >
              {technology}
            </span>
          ))}
        </div>
        <span className="font-mono text-[10px] tracking-[0.08em] text-dim uppercase transition-colors group-hover:text-signal">
          Read case study
        </span>
      </div>
    </Link>
  );
}
