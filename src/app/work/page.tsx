import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { projects } from "@/data/portfolio";

export const metadata = { title: "Work", description: "Production AI, commerce, automation, and platform engineering case studies by Jivesh Lakhani." };

export default function WorkPage() {
  return (
    <main id="main-content">
      <PageHero kicker="01 / Production systems" title="Selected work" intro="Six things I've built or worked on, from AI shopping agents and ad-matched Shopify pages to cold-email tooling and tax software." />
      <section className="shell section-pad">
        <div className="work-grid">
          {projects.map((project) => (
            <Link className="work-card" href={`/work/${project.slug}`} key={project.slug}>
              <span className="work-card-number">{project.number}</span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
              <div className="work-card-meta"><span>{project.category}</span><span>Case study ↗</span></div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
