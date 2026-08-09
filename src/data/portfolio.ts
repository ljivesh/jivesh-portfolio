export type ContactLink = {
  label: string;
  href: string;
  external?: boolean;
};

export const brand = {
  name: "Menma",
  osName: "MENMA.OS",
  realName: "Jivesh Lakhani",
  tagline: "AI Product Engineer",
  summary: "Production AI systems, commerce platforms, browser automation, and backend infrastructure.",
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  progression: { period: string; label: string }[];
};

export type ProjectSection = {
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type Project = {
  slug: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  collaboration?: string;
  coreTechnologies: string[];
  technologies: string[];
  architecture: string[];
  sections: ProjectSection[];
};

export const identity = {
  name: "Jivesh Lakhani",
  shortRole: "AI Product Engineer · Founding Engineer",
  headline: "I build AI products that survive contact with production.",
  intro:
    "Founding engineer with nearly three years of experience turning ambiguous product ideas into real systems across AI agents, commerce, backend platforms, browser automation, and cloud infrastructure.",
  story:
    "I joined KandidAI as the sole developer while finishing my B.Tech. Working directly with the CTO, I built and operated commerce agents, storefront tools, sales automation products, and the supporting infrastructure. I remained accountable for delivery, production debugging, and mentoring new engineers as the team grew.",
  availability:
    "Open to founding, applied AI, backend, platform, and full-stack engineering roles.",
  email: "ljivesh@gmail.com",
  location: "Jaipur, Rajasthan, India",
};

export const contacts: ContactLink[] = [
  { label: "Email", href: "mailto:ljivesh@gmail.com" },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jivesh-lakhani",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/ljivesh",
    external: true,
  },
  {
    label: "Download résumé",
    href: "/jivesh-lakhani-resume.pdf",
    external: true,
  },
];

export const experience: Experience[] = [
  {
    company: "KandidAI (YouseAI Tech)",
    role: "Founding Engineer",
    period: "Aug 2023 to Present",
    location: "Delhi, India",
    summary:
      "Primary engineer across KandidAI’s commerce agents, storefront personalization, sales automation products, and production platform.",
    bullets: [
      "Built a multi-channel AI commerce platform across web, WhatsApp, and Instagram for Shopify merchants and their customers.",
      "Owned the SaaS control plane, streaming agent services, embedded storefront widget, Shopify extensions, analytics, automations, and browser-based conversion tooling end to end.",
      "Designed multi-tenant PostgreSQL data models, APIs, asynchronous workflows, real-time communication, integrations, observability, and production diagnostics.",
      "Deployed and maintained production services across AWS, Azure, and Oracle Cloud using Docker, CI/CD, Nginx, and Linux.",
      "Owned intern hiring from job descriptions and interviews through final selection, then led and mentored the selected interns.",
    ],
    progression: [
      {
        period: "Aug 2023 to May 2025",
        label: "Sole developer while completing B.Tech",
      },
      {
        period: "Jun 2025 to Present",
        label: "Full-time founding engineer and primary owner",
      },
    ],
  },
];

export const education = {
  degree: "B.Tech. in Artificial Intelligence and Machine Learning",
  institution: "Maharaja Agrasen Institute of Technology",
  university: "Guru Gobind Singh Indraprastha University",
  period: "Dec 2021 to Jun 2025",
  score: "CGPA 8.8 / 10",
  location: "Delhi, India",
};

export const projects: Project[] = [
  {
    slug: "kandid-ai-agents",
    number: "01",
    title: "Kandid AI Commerce Platform",
    category: "Applied AI · Commerce",
    summary:
      "A Shopify app and merchant dashboard for running AI sales and support agents on storefronts, WhatsApp, and Instagram. Merchants can sync product and brand knowledge, configure agent behavior, review conversations, create broadcasts and automations, and track commerce activity.",
    role:
      "Architected and implemented the platform across the SaaS control plane, real-time communication services, embedded storefront widget, Shopify extensions, analytics, automations, and production infrastructure.",
    coreTechnologies: ["OpenAI", "Shopify", "WhatsApp", "Instagram", "Langfuse"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "OpenAI",
      "Azure OpenAI",
      "Azure Speech",
      "Langfuse",
      "Pinecone",
      "Socket.IO",
      "Shopify",
      "WhatsApp Cloud API",
      "Instagram Messaging API",
      "Docker",
    ],
    architecture: [
      "Shopper channels",
      "Streaming agent runtime",
      "Retrieval + memory",
      "Commerce tools",
      "Shopify + Meta",
      "Analytics + operations",
    ],
    sections: [
      {
        eyebrow: "Product overview",
        title: "What the platform does",
        paragraphs: [
          "The shopper experience runs across storefront web chat, WhatsApp, and Instagram. The channels share merchant knowledge and commerce capabilities while preserving channel-specific interactions, rich media, identity, and workflows.",
          "The merchant side covers onboarding, authentication, roles, billing, catalog and knowledge synchronization, agent configuration, prompt and skill management, conversations, analytics, customer segments, broadcasts, and automations.",
        ],
      },
      {
        eyebrow: "My work",
        title: "Agent runtime and commerce features",
        bullets: [
          "RAG and vector search over products, pages, files, FAQs, and brand knowledge.",
          "Persistent conversation memory and customer state across channels.",
          "Product recommendations, bundles, routines, cart operations, checkout, and order tracking.",
          "Text and voice conversations with customizable 3D avatars.",
          "Human-agent transfer with working hours and configurable notifications.",
          "Langfuse tracing, prompt management, and evaluation workflows.",
        ],
      },
      {
        eyebrow: "Production",
        title: "Deployment and operations",
        paragraphs: [
          "I operated and debugged the platform across its web applications, agent services, synchronization workers, browser services, databases, storage, and third-party providers. This included CI/CD, Docker, Linux, Nginx, cloud deployments, incident diagnosis, and production support.",
        ],
      },
    ],
  },
  {
    slug: "dynamic-shopify-storefronts",
    number: "02",
    title: "Dynamic Shopify Storefronts",
    category: "Agents · Browser automation",
    summary:
      "A Shopify landing-page personalization product that imports Meta ad creative and audience context, captures the existing product page with Playwright, proposes page changes with AI, gives merchants an interactive preview, and publishes approved variants through Shopify app extensions and metafields.",
    role:
      "Built the ad-data integration, multimodal analysis, browser capture, agentic planning, interactive preview, safe publishing, dynamic runtime, experimentation, and analytics systems.",
    coreTechnologies: ["OpenAI Agents SDK", "Shopify", "Meta Ads", "Playwright", "Langfuse"],
    technologies: [
      "Next.js",
      "TypeScript",
      "OpenAI Agents SDK",
      "Langfuse",
      "Playwright",
      "Cloakbrowser",
      "Shopify Admin API",
      "Shopify App Extensions",
      "Shopify Web Pixels",
      "Meta Marketing API",
      "PostgreSQL",
      "Docker",
    ],
    architecture: [
      "Meta ad context",
      "Shopify context",
      "Browser capture",
      "Page agent",
      "Merchant preview",
      "Publish + attribute",
    ],
    sections: [
      {
        eyebrow: "Product overview",
        title: "Ad-specific Shopify landing pages",
        paragraphs: [
          "A shopper may click an ad built around a specific audience, promise, product angle, or creative, then land on the same generic product page as everyone else. The system preserves that context and uses it to produce a more relevant storefront variant.",
        ],
      },
      {
        eyebrow: "My work",
        title: "Page capture, AI editing, and merchant review",
        bullets: [
          "Ingests campaign, audience, image, video, copy, and performance context from Meta Ads.",
          "Combines Shopify product, page, brand, and design data with merchant instructions.",
          "Captures visible mobile DOM, text, and screenshots through browser automation.",
          "Plans and applies copy, media, layout, and product-page changes.",
          "Presents side-by-side and interactive iframe previews for merchant review.",
        ],
      },
      {
        eyebrow: "Publishing",
        title: "Safe publishing and experiment attribution",
        paragraphs: [
          "Selector safety, visual verification, saved states, and health checks reduce the risk of modifying live storefronts. Approved variants publish through Shopify app extensions and metafields rather than brittle theme rewrites.",
          "Visitor assignment stays persistent, while Shopify Web Pixels connect page views, add-to-cart events, checkouts, and purchases back to each experiment variant.",
        ],
      },
    ],
  },
  {
    slug: "agent-sdr",
    number: "03",
    title: "AgentSDR",
    category: "AI workflows · SaaS",
    summary:
      "A multi-tenant cold-email platform that finds and enriches leads through Apollo, ingests website context, generates campaign messages, provisions mailboxes, processes Gmail replies and bounces, synchronizes Smartlead campaigns, classifies reply intent, and updates CRM state.",
    role:
      "Primarily architected and built the platform with the engineering team, owning major product areas across onboarding, knowledge workflows, AI outreach, email delivery, mailbox operations, and LLM observability.",
    collaboration:
      "Primarily architected and built by Jivesh in collaboration with the engineering team across multiple repository migrations.",
    coreTechnologies: ["OpenAI", "Apollo", "Gmail APIs", "Smartlead", "Langfuse"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Drizzle ORM",
      "OpenAI",
      "Langfuse",
      "Apollo",
      "Gmail APIs",
      "Smartlead",
      "Redis",
      "Azure Blob Storage",
      "Docker",
    ],
    architecture: [
      "Lead discovery",
      "ICP qualification",
      "Knowledge ingestion",
      "AI sequencing",
      "Mailbox events",
      "CRM state",
    ],
    sections: [
      {
        eyebrow: "Product overview",
        title: "Lead discovery and campaign workflow",
        bullets: [
          "Apollo-powered lead and company discovery and enrichment.",
          "Ideal-customer-profile configuration and website knowledge ingestion.",
          "AI-generated pitches, email sequences, calls to action, and message editing.",
          "Reply-intent classification, follow-up planning, and CRM state transitions.",
          "Timelines, notes, snoozing, and do-not-contact workflows.",
        ],
      },
      {
        eyebrow: "My work",
        title: "Mailbox and delivery infrastructure",
        paragraphs: [
          "I built domain provisioning, mailbox management, warm-up and sending queues, Gmail watch and history processing, inbound reply handling, bounce handling, inbox organization, and Smartlead campaign synchronization.",
        ],
      },
      {
        eyebrow: "Observability",
        title: "Tracing AI generation and classification",
        paragraphs: [
          "Langfuse tracing records the prompts, inputs, outputs, and execution paths behind outreach generation and classification. That made debugging, review, and prompt iteration part of the normal engineering workflow.",
        ],
      },
    ],
  },
  {
    slug: "linkbird",
    number: "04",
    title: "LinkBird",
    category: "Automation · Platform",
    summary:
      "A LinkedIn campaign management platform for connecting accounts, importing or searching leads, scheduling connection and follow-up sequences, synchronizing conversations into a unified inbox, and enforcing working hours, daily limits, retries, and account controls.",
    role:
      "Collaboratively designed and built the platform, contributing across account lifecycle management, campaigns, unified inbox, background jobs, diagnostics, controls, AI-assisted workflows, and browser reliability.",
    collaboration: "Collaboratively designed and built with the engineering team.",
    coreTechnologies: ["Unipile", "OpenAI", "Langfuse", "Playwright", "Azure Service Bus"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Drizzle ORM",
      "Prisma",
      "Unipile",
      "OpenAI",
      "Langfuse",
      "Playwright",
      "Azure Service Bus",
    ],
    architecture: [
      "Lead intake",
      "Campaign rules",
      "Account scheduling",
      "LinkedIn actions",
      "Conversation sync",
      "Diagnostics",
    ],
    sections: [
      {
        eyebrow: "Product overview",
        title: "LinkedIn campaigns and scheduled actions",
        bullets: [
          "Lead search, CSV import, filtering, and campaign assignment.",
          "Connection requests, acceptance messages, and follow-up sequences.",
          "Working-hour windows, daily limits, retry handling, and job monitoring.",
          "Campaign analytics, webhook processing, and operational diagnostics.",
        ],
      },
      {
        eyebrow: "Inbox",
        title: "Conversation synchronization and manual messaging",
        paragraphs: [
          "The platform synchronizes conversations into a unified inbox, supports manual messaging, and connects campaign state to the actual relationship history with each lead.",
        ],
      },
      {
        eyebrow: "Operations",
        title: "Account controls, retries, and diagnostics",
        paragraphs: [
          "I worked on account lifecycle and proxy reliability in the original implementation, then on limits, retries, webhook processing, diagnostics, and job visibility that made long-running campaign execution supportable.",
        ],
      },
    ],
  },
  {
    slug: "vivo-video-platform",
    number: "05",
    title: "VIVO Personalized Video Platform",
    category: "Automation · Media",
    summary:
      "A backend automation platform that combined campaign data with personalized assets, queued video-generation jobs, processed the outputs, and delivered personalized marketing videos for VIVO.",
    role:
      "Built the backend, deployment, and automation systems that powered personalized video generation at campaign scale.",
    coreTechnologies: [
      "Three.js",
      "Azure Speech STT",
      "Azure Speech TTS",
      "OpenAI",
      "WebSockets",
    ],
    technologies: [
      "Backend services",
      "Automation",
      "Video processing",
      "Cloud deployment",
      "Production operations",
    ],
    architecture: [
      "Campaign inputs",
      "Personalization data",
      "Generation jobs",
      "Video processing",
      "Output delivery",
      "Production monitoring",
    ],
    sections: [
      {
        eyebrow: "Product overview",
        title: "Automated personalized video generation",
        paragraphs: [
          "The platform automated the generation of personalized campaign videos for VIVO. My responsibility centered on the backend, deployment, and automation required to run that workflow reliably.",
        ],
      },
      {
        eyebrow: "My work",
        title: "Backend, automation, and deployment",
        bullets: [
          "Backend implementation for the generation workflow.",
          "Automation around repeatable video production.",
          "Deployment and production operation of the platform.",
        ],
      },
      {
        eyebrow: "Outcome",
        title: "Production delivery for a large video campaign",
        paragraphs: [
          "The project is a compact example of the kind of work I enjoy: turning a concrete business requirement into an automated system that can deliver at meaningful volume.",
        ],
      },
    ],
  },
];

export const capabilityGroups = [
  {
    number: "01",
    label: "AI systems",
    description:
      "Agent runtimes connected to product data, tools, memory, evaluation, and real user workflows.",
    items: [
      "AI agents",
      "RAG and embeddings",
      "Tool calling",
      "Prompt engineering",
      "OpenAI and Azure OpenAI",
      "Langfuse",
      "Pinecone and pgVector",
      "Voice AI",
    ],
  },
  {
    number: "02",
    label: "Product engineering",
    description:
      "Full-stack products built from data model and API through responsive interface and customer operations.",
    items: [
      "TypeScript and JavaScript",
      "React and Next.js",
      "Node.js and Express",
      "REST and GraphQL",
      "WebSockets",
      "PostgreSQL",
      "Redis and MongoDB",
      "Drizzle ORM and Prisma",
    ],
  },
  {
    number: "03",
    label: "Platforms + automation",
    description:
      "Integration-heavy systems that coordinate commerce, messaging, browsers, and background workflows.",
    items: [
      "Shopify Admin and Storefront APIs",
      "Shopify extensions and Web Pixels",
      "Meta Graph and Marketing APIs",
      "WhatsApp and Instagram",
      "Playwright and browser automation",
      "Background workers",
      "Queues and webhooks",
      "Third-party API integrations",
    ],
  },
  {
    number: "04",
    label: "Infrastructure",
    description:
      "Deployment and production ownership across cloud services, containers, observability, and debugging.",
    items: [
      "Docker and Docker Compose",
      "GitHub Actions and CI/CD",
      "AWS ECS, EC2, and S3",
      "Azure",
      "Oracle Cloud",
      "Linux and Nginx",
      "Coolify and Dokploy",
      "Production diagnostics",
    ],
  },
];

export const operatingModel = [
  {
    step: "Frame",
    title: "Turn ambiguity into a system boundary.",
    text: "Clarify the user, workflow, constraints, data, integrations, and operational risks before choosing the architecture.",
  },
  {
    step: "Build",
    title: "Ship the whole path, not an isolated feature.",
    text: "Move across interface, API, data model, AI workflow, background jobs, and integrations to deliver a usable product loop.",
  },
  {
    step: "Run",
    title: "Stay accountable after the deploy.",
    text: "Add tracing, diagnostics, retries, health checks, and practical guardrails, then debug the system against real production behavior.",
  },
  {
    step: "Improve",
    title: "Optimize for outcomes, not novelty.",
    text: "Use product evidence and operational feedback to simplify workflows, strengthen reliability, and focus engineering effort where it matters.",
  },
];

export const principles = [
  "Simplicity before novelty",
  "Production ownership",
  "Readable, maintainable systems",
  "Business outcomes over technical theater",
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
