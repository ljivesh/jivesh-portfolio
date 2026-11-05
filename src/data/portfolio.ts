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
  summary: "I build AI agents, Shopify apps and the backend systems behind them.",
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  progression?: { period: string; label: string }[];
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
  headline: "I build AI products and keep them running in production.",
  intro:
    "I'm a software engineer from Jaipur. For three years I was the founding engineer at KandidAI, where I built AI shopping agents, Shopify apps and sales tools, and ran the servers they lived on. After that I spent a few months at KDK Softwares working on their tax filing products.",
  story:
    "I joined KandidAI in August 2023 as their only developer, while I was still in college. I worked directly with the CTO, so I ended up touching everything: the agent backend, the storefront widget, the merchant dashboard, deployments and production debugging. After graduating I went full-time, and later I hired our interns and mentored them. At KDK I switched to a very different domain, Income Tax, GST and TDS software in Go and React, where I fixed a lot of import and portal-sync bugs and built some internal AI tooling.",
  availability:
    "I'm looking for founding, applied AI, backend or full-stack roles.",
  email: "ljivesh@gmail.com",
  location: "Jaipur, India",
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
    company: "KDK Softwares",
    role: "AI-Assisted Developer",
    period: "Aug 2026 to Oct 2026",
    location: "Jaipur, Rajasthan, India",
    summary:
      "Worked on KDK's Income Tax, GST and TDS products, mostly fixing bugs in the Go services, React frontends and the desktop connector.",
    bullets: [
      "Fixed filing, import/export, reconciliation and portal-sync bugs across the ExpressIT, GST, TDS and connector codebases, and added ITR-6 JSON import for AY 2026–27.",
      "Brought a customer-matching step down from 534 MB to 55 MB of memory, and cut one client's lower-deduction certificate checks from 4,519 rows to 9.",
      "Built an internal LLM Management page where the team can edit and validate the prompt configs used by the tax backends. Configs are saved to S3 and the related ECS service gets reloaded.",
      "Wrote a Claude Code /bugfix command that we added to 12 repos. It takes a Zoho issue through reproduce, fix, test and PR using Zoho MCPs, Claude in Chrome and the GitHub CLI, and stops for approval before anything external.",
    ],
  },
  {
    company: "KandidAI (YouseAI Tech)",
    role: "Founding Engineer",
    period: "Aug 2023 to Aug 2026",
    location: "Delhi, India",
    summary:
      "I was the main engineer on almost everything KandidAI shipped: the AI agents, the storefront tools, the sales products and the platform underneath them.",
    bullets: [
      "Built our AI shopping assistant for Shopify brands on web chat, WhatsApp and Instagram. It ran on 40+ stores, with about 2M storefront sessions and 20K+ AI conversations a month.",
      "Owned the merchant dashboard, the agent services, the storefront widget and our Shopify extensions.",
      "Designed the multi-tenant Postgres schema, APIs, background jobs and real-time messaging.",
      "Deployed and ran 10+ services on AWS, Azure and Oracle Cloud with Docker, CI/CD and Nginx.",
      "Hired our interns (wrote the JDs, ran the interviews, picked the candidates) and mentored them after they joined.",
    ],
    progression: [
      {
        period: "Aug 2023 to May 2025",
        label: "Sole developer while completing B.Tech",
      },
      {
        period: "Jun 2025 to Aug 2026",
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

export const certifications = [
  {
    name: "Japanese Language NAT-TEST, 5Q",
    note: "Approximately JLPT N5",
  },
];

export const projects: Project[] = [
  {
    slug: "kandid-ai-agents",
    number: "01",
    title: "Kandid AI Commerce Platform",
    category: "Applied AI · Commerce",
    summary:
      "Kandid is a Shopify app that puts an AI sales assistant on a brand's website, WhatsApp and Instagram. Merchants sync their catalog, tune how the agent talks, read conversations and set up broadcasts and automations. By July 2026 it was live on 40+ stores and seeing roughly 2M storefront sessions a month.",
    role:
      "I built most of it: the merchant dashboard, the agent backend and real-time messaging, the storefront widget, the Shopify extensions and the infrastructure.",
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
      "Drizzle ORM",
      "Socket.IO",
      "Shopify",
      "Meta Graph API",
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
        title: "What it does",
        paragraphs: [
          "Shoppers can talk to the same agent on the website, WhatsApp or Instagram. It knows the same products and can do the same things on every channel, but each channel still behaves like itself: WhatsApp gets interactive replies, the website gets product cards and voice.",
          "Merchants get onboarding and billing, catalog and knowledge sync, agent settings, conversation history, analytics, customer segments, broadcasts and automations.",
        ],
      },
      {
        eyebrow: "My work",
        title: "The agent and what it can do",
        bullets: [
          "RAG over the store's products, pages, files, FAQs and brand docs.",
          "Memory that follows a customer across channels.",
          "Recommendations, bundles and routines, plus cart actions, checkout and order tracking.",
          "Text and voice chat with a customizable 3D avatar.",
          "Handoff to a human that respects the store's working hours and notifies the team.",
          "Instagram post analysis (images and video) and AI comment moderation. Merchants choose per category whether to ignore, hide, reply publicly or follow up in DMs.",
          "Journeys with triggers, branches, delays, webhooks and WhatsApp messages.",
          "Langfuse for tracing, prompt management and evals.",
        ],
      },
      {
        eyebrow: "Scale",
        title: "Numbers",
        bullets: [
          "40+ Shopify stores with the app installed (July 14, 2026).",
          "Over 40.8 million storefront sessions tracked since April 2024, about 2 million a month recently.",
          "20,000+ shopper conversations with the agent across web, Instagram and WhatsApp in the 30 days before July 14, 2026.",
        ],
      },
      {
        eyebrow: "Kandid CMS",
        title: "A CMS on Shopify Metaobjects",
        paragraphs: [
          "A smaller product next to the main app: a CMS that lets merchants manage the data our agents use, stored as Shopify Metaobjects. I did the architecture, the Shopify integration, the admin UI and the APIs.",
        ],
      },
      {
        eyebrow: "Production",
        title: "Running it",
        paragraphs: [
          "I deployed and looked after 10+ production services for Kandid: the web apps, agent services, sync workers, browser services, databases and storage. Day to day that meant CI/CD, Docker, Nginx, Linux servers on three clouds, and debugging live issues while merchants were waiting on a fix.",
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
      "Someone clicks an ad and lands on the same product page as everyone else. This Shopify feature changes that. It pulls the ad's creative and audience from Meta, captures the product page with Playwright, has an AI agent suggest edits that match the ad, and publishes the version the merchant approves.",
    role:
      "I built it end to end, from the Meta Ads integration and creative analysis to the page agent, preview, publishing and A/B analytics.",
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
        eyebrow: "The idea",
        title: "Landing pages that match the ad",
        paragraphs: [
          "If an ad makes a specific promise to a specific audience, the page should pick up where the ad left off. We keep the ad's context and use it to generate a variant of the product page for that ad.",
        ],
      },
      {
        eyebrow: "My work",
        title: "Capture, edit, review",
        bullets: [
          "Pull campaign, audience, creative, copy and performance data from Meta Ads.",
          "Combine it with the Shopify product, page and brand data, plus whatever the merchant asks for.",
          "Capture the mobile page (visible DOM, text and screenshots) in a real browser.",
          "Let the agent plan and apply copy, media and layout changes.",
          "Show the merchant a side-by-side view and a live iframe preview before anything goes out.",
        ],
      },
      {
        eyebrow: "Publishing",
        title: "Not breaking live stores",
        paragraphs: [
          "Editing someone's live storefront is risky, so every change goes through selector checks, visual verification, saved states and health checks. Approved variants are published through Shopify app extensions and metafields instead of rewriting the theme.",
          "Each visitor gets assigned a variant once and keeps it. Shopify Web Pixels report page views, add-to-carts, checkouts and purchases back to us, so merchants can see which variant actually sold more.",
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
      "A cold-email tool for B2B teams. It finds and enriches leads through Apollo, reads your website for context, writes the outreach, sets up mailboxes, handles Gmail replies and bounces, syncs with Smartlead and keeps CRM status up to date.",
    role:
      "I architected most of it and built the bigger pieces with the team: onboarding, knowledge ingestion, the AI outreach, email delivery, mailbox operations and Langfuse tracing.",
    collaboration:
      "Mostly architected and built by me, together with the engineering team, across a few repo migrations.",
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
        title: "How a campaign works",
        bullets: [
          "Find and enrich leads and companies with Apollo.",
          "Define your ideal customer and pull in your website content.",
          "Generate pitches, sequences and CTAs, then edit them.",
          "Classify replies by intent and plan the follow-up.",
          "Timelines, notes, snoozing and do-not-contact lists.",
        ],
      },
      {
        eyebrow: "My work",
        title: "Mailboxes and delivery",
        paragraphs: [
          "Most of my time went into the email side: provisioning domains, managing mailboxes, warm-up and sending queues, Gmail watch and history processing, replies, bounces, inbox organisation and Smartlead sync.",
        ],
      },
      {
        eyebrow: "Observability",
        title: "Tracing the AI",
        paragraphs: [
          "Every generation and classification is traced in Langfuse. When an email came out wrong we could look at the exact prompt, inputs and output, which made fixing prompts a normal part of the work.",
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
      "A LinkedIn outreach platform. You connect your accounts, import or search leads, set up connection and follow-up sequences, and read every conversation in one inbox. Working hours, daily limits and retries keep the accounts safe.",
    role:
      "Designed and built with the team. I worked on account management, campaigns, the unified inbox, background jobs, diagnostics, AI features and browser reliability.",
    collaboration: "Built together with the engineering team.",
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
        title: "Campaigns",
        bullets: [
          "Lead search, CSV import, filters and assigning leads to campaigns.",
          "A connection request, a message once it's accepted, then follow-ups.",
          "Working hours, daily limits, retries and job monitoring.",
          "Campaign analytics, webhooks and diagnostics.",
        ],
      },
      {
        eyebrow: "Inbox",
        title: "One inbox",
        paragraphs: [
          "Conversations sync into a single inbox where you can reply by hand, and each thread is linked to where that lead is in the campaign.",
        ],
      },
      {
        eyebrow: "Operations",
        title: "Keeping it running",
        paragraphs: [
          "In the first version I worked on account lifecycle and proxy reliability. Later it was limits, retries, webhook processing, diagnostics and job visibility, which is what made long-running campaigns supportable.",
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
      "A backend that made personalised marketing videos for VIVO. It took campaign data and per-person assets, queued the generation jobs, processed the output and delivered the videos.",
    role:
      "I built the backend, the deployment and the automation. It generated more than 60,000 videos.",
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
        title: "What it was",
        paragraphs: [
          "VIVO wanted a personalised video for each person in a campaign. My part was the backend, the deployment and the automation needed to produce them reliably.",
        ],
      },
      {
        eyebrow: "My work",
        title: "Backend, automation, deployment",
        bullets: [
          "The backend for the generation workflow.",
          "Automating the video production steps.",
          "Deploying it and keeping it running in production.",
        ],
      },
      {
        eyebrow: "Outcome",
        title: "60,000+ videos",
        paragraphs: [
          "The platform generated more than 60,000 personalised videos for VIVO.",
          "It's smaller than the other projects here, but I like it for how simple the brief was: a clear business requirement, an automated pipeline, and output you can count.",
        ],
      },
    ],
  },
  {
    slug: "kdk-tax-compliance",
    number: "06",
    title: "KDK Tax Compliance Engineering",
    category: "Fintech · AI tooling",
    summary:
      "From August to October 2026 I worked on KDK Softwares' Income Tax, GST and TDS software: filing and corrections, JSON and Excel import/export, reconciliation, government portal sync and reports. I also built two internal AI tools.",
    role:
      "AI-Assisted Developer. I worked across the ExpressIT, GST, TDS and desktop connector codebases, plus some internal reporting and data tools.",
    coreTechnologies: ["Go", "React", "AWS S3 + ECS", "Claude Code", "MCP"],
    technologies: [
      "Go",
      "React",
      "TypeScript",
      "AWS S3",
      "AWS ECS",
      "Claude Code",
      "Claude in Chrome",
      "Zoho MCPs",
      "GitHub CLI",
      "Desktop connectors",
    ],
    architecture: [
      "Zoho issue",
      "Code tracing",
      "Reproduction",
      "Root cause",
      "Tested fix",
      "Reviewed PR",
    ],
    sections: [
      {
        eyebrow: "Income Tax",
        title: "ITR import/export and financial statements",
        bullets: [
          "Added AY 2026–27 ITR-6 JSON import for company returns, covering schedules like business income, balance sheet, depreciation, capital gains, deductions, losses, MAT/MATC and advance tax.",
          "Fixed ITR-6 JSON round-trips that were losing data: representative country IDs, 194-IA buyer PAN/Aadhaar, firm type and negative intraday/F&O values.",
          "Fixed Schedule III fixed-asset imports that dropped repeated rows. In the QA sample only 3 of 21 rows were being saved; after the fix all 21 were. A follow-up merged matching opening and addition entries, which saved 41 assets from a 50-row sample.",
          "Smaller fixes in inventory notes, previous-year values, DTAA cess, foreign addresses, Zerodha ETF imports, audit report validation and Trial Balance import errors.",
        ],
      },
      {
        eyebrow: "GST + TDS",
        title: "Portal sync, reconciliation and reports",
        bullets: [
          "IMS imports were failing on out-of-range amounts coming from the portal. One affected sync went from 0 saved rows to 466.",
          "Improved WhatsApp GSTR-2B report delivery, GSTR-1/3B report consistency, GST reconciliation and Tally sync.",
          "Lower-deduction certificate verification was checking every transaction row. Deduplicating it took one client from 4,519 checks to 9, and the query from 52.5 ms to 40.5 ms.",
          "Fixed challan-list pagination and TRACES fetching on the new portal. A client with 1,335 challans now loads in two pages.",
          "Connector fixes for e-pay challans, tax-audit filing sync, Zerodha imports and finding Chrome on macOS.",
        ],
      },
      {
        eyebrow: "Data processing",
        title: "Memory",
        paragraphs: [
          "A customer-matching step went from 534 MB to 55 MB of memory, and database reads used about 35% less at production data size. I also batched GST, TDS and user reads and cut memory in Excel report generation, checking that the output sheets stayed the same.",
        ],
      },
      {
        eyebrow: "AI tooling",
        title: "LLM Management and /bugfix",
        paragraphs: [
          "The Income Tax, GST and TDS backends each read their prompts from per-workflow configs. I built an LLM Management page in the internal dashboard to browse and edit them. It checks the prompt and its required variables, saves to S3 and can reload the ECS service. I also added structured logs (workflow, config version, model, prompts) right before the model call in three AI workflows.",
          "I also wrote a Claude Code /bugfix command that ended up in 12 repos. You give it a Zoho issue and it walks through tracing the code, reproducing the bug, finding the root cause, fixing and testing locally, and preparing the PR, using Zoho MCPs, Claude in Chrome and the GitHub CLI. It stops for approval before doing anything external, masks customer identifiers, never runs DML or DDL on remote databases, and sends architecture or business-rule questions to a person.",
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
      "OpenAI Agents SDK and LangChain",
      "Claude Code and MCP workflows",
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
      "Go",
      "React and Next.js",
      "Node.js and Express",
      "REST and GraphQL",
      "WebSockets",
      "PostgreSQL",
      "Redis, MongoDB, and ClickHouse",
      "Drizzle ORM and Prisma",
    ],
  },
  {
    number: "03",
    label: "Platforms + automation",
    description:
      "Integration-heavy systems that coordinate commerce, messaging, browsers, and background workflows.",
    items: [
      "Shopify Admin, Storefront APIs, and Hydrogen",
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
      "Azure OpenAI, AI Foundry, and VMs",
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
