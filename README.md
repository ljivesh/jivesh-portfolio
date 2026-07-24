# Jivesh Lakhani — Portfolio

A recruiter-first engineering portfolio built with Next.js 16, React 19, TypeScript, and Tailwind CSS 4.

## Run locally

```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

## Content

Verified portfolio copy and project data live in `src/data/portfolio.ts`. Routes are statically generated from that data:

- `/` — recruiter-focused homepage
- `/work/[slug]` — four engineering case studies
- `/resume` — browser and print-ready résumé

## Deployment

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deploying. Copy `.env.example` to `.env.local` for local metadata testing.

The app is ready for Vercel or any host that supports Next.js.
