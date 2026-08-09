import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/page-hero";
import { contacts, identity } from "@/data/portfolio";

export const metadata = { title: "Contact", description: "Contact Jivesh Lakhani about applied AI, backend, platform, and product engineering work." };

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero kicker="04 / Direct channel" title="Contact" intro="Tell me what you are building, where the system is stuck, and what an excellent outcome would look like." />
      <section className="shell section-pad contact-grid">
        <aside className="contact-aside">
          <h2>Open to the right hard problem.</h2>
          <p>{identity.availability}</p>
          <div className="contact-links">
            {contacts.map((link) => <a href={link.href} key={link.label} target={link.external ? "_blank" : undefined} rel={link.external ? "noreferrer" : undefined}><span>{link.label}</span><span>↗</span></a>)}
          </div>
        </aside>
        <div className="contact-form-panel"><ContactForm /></div>
      </section>
    </main>
  );
}
