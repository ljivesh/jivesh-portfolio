import type { Metadata } from "next";
import { PrintButton } from "@/components/print-button";

export const metadata: Metadata = {
  title: "Résumé",
  description: "Résumé for Jivesh Lakhani, AI Product Engineer and Founding Engineer.",
  alternates: { canonical: "/resume" },
};

const resumePath = "/jivesh-lakhani-resume.pdf";

const experienceBullets = [
  "Joined as the sole developer while completing B.Tech; transitioned full-time in June 2025 and owned architecture and delivery with the CTO.",
  "Built a multi-channel AI commerce platform across web, WhatsApp, and Instagram for 40+ Shopify stores, processing approximately 2M monthly storefront sessions and 20K+ monthly shopper interactions.",
  "Owned the SaaS control plane, real-time agent services, embedded storefront widget, Shopify extensions, analytics, automations, and browser-based conversion tooling end to end.",
  "Deployed and maintained 10+ production services across AWS, Azure, and Oracle Cloud using Docker, CI/CD, Dokploy, Nginx, and Linux.",
  "Owned the hiring process for interns by preparing job descriptions, conducting interviews, and finalizing candidates; subsequently led and mentored the selected interns.",
];

const selectedProjects = [
  {
    title: "Kandid AI Agents",
    stack: "Next.js, PostgreSQL, OpenAI, Langfuse, Shopify, WhatsApp Business, Instagram Business",
    bullets: [
      "Designed a streaming agent runtime combining RAG, tool calling, memory, product recommendations, cart and order actions, voice, and human handoff across web, WhatsApp, and Instagram.",
      "Built merchant onboarding and Shopify synchronization for products, pages, files, FAQs, and brand knowledge, with configurable prompts, skills, and channel-specific agent behavior.",
      "Delivered analytics, segmentation, WhatsApp broadcasts, event-driven automations, cross-channel memory, order tracking, and human-agent handoff. Built Instagram comment moderation and multimodal post analysis for images and videos.",
    ],
  },
  {
    title: "Dynamic Shopify Storefronts",
    stack: "OpenAI Agents SDK, Langfuse, Playwright, Shopify, Meta Ads",
    bullets: [
      "Built an interactive Page Agent that combines Meta ad context, Shopify product and brand data, captured page state, and merchant instructions to plan and apply storefront changes.",
      "Created automated ad-to-landing-page workflows that analyze image and video creatives and generate audience-specific copy, media, and layout improvements.",
      "Engineered Playwright services for mobile DOM and screenshot capture, interactive previews, visual verification, and safe publishing through Shopify app extensions and metafields.",
      "Implemented a storefront runtime, visitor-level variant assignment, Web Pixel attribution, and A/B-test analytics across page views, carts, checkouts, and purchases.",
    ],
  },
  {
    title: "AgentSDR",
    stack: "Next.js, PostgreSQL, OpenAI, Langfuse, Apollo, Gmail, Smartlead, Redis",
    bullets: [
      "Primarily architected and built an AI sales-development platform for Apollo-powered lead discovery, ICP qualification, website-informed personalization, campaign sequencing, and follow-up planning.",
      "Created AI workflows for pitches, email sequences, calls to action, reply-intent classification, and CRM state transitions using OpenAI with Langfuse tracing.",
      "Engineered domain provisioning, mailbox warm-up and queues, Gmail watch and history processing, inbound replies, bounce handling, Smartlead synchronization, and multi-tenant onboarding.",
    ],
  },
  {
    title: "LinkBird",
    stack: "Next.js, PostgreSQL, OpenAI, Langfuse, Playwright, Azure Service Bus",
    bullets: [
      "Co-developed a multi-account LinkedIn outreach platform with lead search and CSV import, campaign assignment, connection requests, acceptance messages, and scheduled follow-ups.",
      "Built unified inbox and conversation synchronization, campaign analytics, background-job diagnostics, daily limits, working-hour controls, retries, and account-health workflows.",
    ],
  },
];

const skillGroups = [
  ["Languages", "TypeScript, JavaScript, Python, Go, Java, C++"],
  ["AI and LLM", "OpenAI, OpenAI Agents SDK, Azure AI Foundry, Langfuse"],
  ["Backend and data", "Node.js, REST APIs, GraphQL, WebSockets, PostgreSQL, Drizzle ORM, Redis, MongoDB"],
  ["Frontend", "React, Next.js, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, Three.js"],
  ["Cloud and DevOps", "Git, GitHub, Docker, CI/CD with GitHub Actions and Dokploy, AWS, Azure, Oracle Cloud, Linux, Nginx"],
];

export default function ResumePage() {
  return (
    <main id="main-content" className="mx-auto w-[min(calc(100%-2rem),68rem)] py-8 sm:w-[min(calc(100%-3rem),68rem)] sm:py-12 lg:pb-24">
      <div className="mb-6 flex flex-col items-stretch justify-between gap-4 print:hidden sm:flex-row sm:items-center">
        <div>
          <p className="font-mono text-[10px] tracking-[0.1em] text-signal uppercase">Web résumé</p>
          <p className="mt-1 text-xs text-dim">Same content as the one-page PDF, formatted for the web.</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line-strong px-5 text-sm font-semibold transition hover:border-signal hover:text-signal"
            href={resumePath}
            target="_blank"
            rel="noreferrer"
          >
            Download PDF ↗
          </a>
          <PrintButton />
        </div>
      </div>

      <article className="resume-sheet bg-[#f4f2e9] p-6 text-[#161a17] shadow-2xl sm:p-10 lg:p-14 print:p-0 print:shadow-none">
        <header className="border-b-2 border-[#161a17] pb-7 text-center">
          <h1 className="text-[clamp(2.6rem,7vw,4.75rem)] leading-none font-semibold tracking-[-0.065em]">Jivesh Lakhani</h1>
          <p className="mt-3 text-sm font-medium text-[#374039]">AI Product Engineer | Founding Engineer</p>
          <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1 font-mono text-[9px] text-[#515b54] sm:text-[10px]">
            <a href="tel:+919929902867">+91 99299 02867</a>
            <span>|</span>
            <a href="mailto:ljivesh@gmail.com">ljivesh@gmail.com</a>
            <span>|</span>
            <a href="https://linkedin.com/in/jivesh-lakhani">linkedin.com/in/jivesh-lakhani</a>
            <span>|</span>
            <a href="https://github.com/ljivesh">github.com/ljivesh</a>
          </div>
        </header>

        <section className="resume-pdf-section">
          <h2 className="resume-pdf-heading">Experience</h2>
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div>
              <h3 className="text-base font-semibold">KandidAI (YouseAI Tech)</h3>
              <p className="mt-1 text-xs italic text-[#4d5850]">Founding Engineer</p>
            </div>
            <div className="text-left font-mono text-[10px] text-[#4d5850] sm:text-right">
              <p>Delhi, India</p>
              <p className="mt-1">Aug 2023 to Present</p>
            </div>
          </div>
          <ul className="resume-pdf-list mt-4">
            {experienceBullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
          </ul>
        </section>

        <section className="resume-pdf-section">
          <h2 className="resume-pdf-heading">Selected Product Work</h2>
          <div className="space-y-6">
            {selectedProjects.map((project) => (
              <article key={project.title}>
                <h3 className="text-sm font-semibold">
                  {project.title}
                  <span className="font-normal italic text-[#4d5850]"> | {project.stack}</span>
                </h3>
                <ul className="resume-pdf-list mt-2">
                  {project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-pdf-section">
          <h2 className="resume-pdf-heading">Technical Skills</h2>
          <div className="space-y-1.5">
            {skillGroups.map(([label, items]) => (
              <p className="text-[10px] leading-[1.5] text-[#3f4942] sm:text-[11px]" key={label}>
                <strong className="text-[#161a17]">{label}:</strong> {items}
              </p>
            ))}
          </div>
        </section>

        <section className="pt-6">
          <h2 className="resume-pdf-heading">Education</h2>
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div>
              <h3 className="text-sm font-semibold">Maharaja Agrasen Institute of Technology</h3>
              <p className="mt-1 text-[11px] text-[#4d5850]">B.Tech. in Artificial Intelligence and Machine Learning; CGPA: 8.8/10</p>
            </div>
            <div className="font-mono text-[10px] text-[#4d5850] sm:text-right">
              <p>Delhi, India</p>
              <p className="mt-1">Dec 2021 to Jun 2025</p>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
