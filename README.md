# Menma — Jivesh Lakhani Portfolio

A dual-interface engineering portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, PostgreSQL, and an embedded xterm.js terminal.

## Features

- Responsive modern portfolio with recruiter-focused content and five case studies.
- Original LuckeyDuckey-style 3D CRT workstation backed by xterm.js. Its live 55×30 terminal buffer is rendered into the monitor's WebGL screen texture, with a virtual filesystem, command history, cursor editing, scrollback, audio, and themes.
- MDX writing, moderated guestbook, contact delivery, web/PDF résumé, and SEO metadata.
- Better Auth administration with roles, 2FA, moderation, contact inbox, and audit logs.

## Development

```bash
cp .env.example .env.local
pnpm install
pnpm db:migrate
pnpm dev
```

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

## Deployment

The included Dockerfile produces a standalone Next.js image. Configure the variables in `.env.example`, run database migrations as an explicit release step, and bootstrap the first administrator with `pnpm admin:bootstrap`.

See `THIRD_PARTY_NOTICES.md` for the licenses covering the terminal and retro audio assets.
