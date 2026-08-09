import { MenmaPortfolio } from "@/components/home/menma-portfolio";
import { education, identity } from "@/data/portfolio";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    alternateName: "Menma",
    jobTitle: "AI Product Engineer",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    email: identity.email,
    alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
    sameAs: ["https://linkedin.com/in/jivesh-lakhani", "https://github.com/ljivesh"],
  };

  return (
    <main id="main-content" className="menma-home">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <MenmaPortfolio />
    </main>
  );
}
