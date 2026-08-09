# Portfolio OS redesign plan

Audit date: August 4, 2026  
Reference: `https://www.rsahani.space/`  
Target codebase: Jivesh Lakhani's Next.js portfolio

## Recommendation

Build an original **Portfolio OS** around Jivesh's existing recruiter-first content. Reuse the reference site's interaction principles—cinematic entry, system-like navigation, command palette, terminal, live guestbook, layered motion, and discoverable easter eggs—but not its personal copy, assets, story, route names, or exact visual composition.

The existing site already explains Jivesh's work unusually well. The redesign should change the shell and storytelling while preserving three things above the fold or one interaction away:

- AI product engineer positioning
- Production ownership and experience
- Direct access to the five case studies, resume, email, GitHub, and LinkedIn

## What the reference site does

### 1. Cinematic landing screen

- Full-viewport boot sequence before the home UI appears.
- Shader/noise-like animated background with a large distorted identity lockup.
- Numbered links, live system status, theme selector, glitch toggle, and terminal shortcut.
- Three home palettes: Monochrome, Amber Retro, and Matrix Green. Theme choice persists in local storage.
- Glitch effects can be disabled independently.
- Semantic/SEO content still exists behind the visual landing experience.

### 2. Persistent application shell

- Desktop: thin top rail with current local-style path, identity, eight numbered routes, and `SYS / Cmd+K`.
- Mobile: compact path/identity bar and a full-screen numbered menu.
- Command palette groups destinations into Navigation, Network, and System.
- Keyboard-first behavior: Cmd/Ctrl+K, arrow navigation, Enter selection, Escape close.

### 3. Distinct page templates

- About: personal narrative, technology cards, scrolling marquees, featured work, and contact footer.
- Projects: featured card, counters, compact project grid, and individual case-study routes.
- Gaming: scroll-led narrative, skill-map visualization, hover-reveal game cards, inventory grid, and terminal-styled conclusion.
- Hobbies: experimental photo/video/drawing collage rather than a conventional content grid.
- Guestbook: public form, curated peer endorsements, live visitor entries, timestamps, media lightbox, loading/error/success states.
- Writing: editorial article index with local posts and external posts; article pages include tags, reading time, code blocks, previous/next links, and contents navigation.
- Contact: availability status, social/contact cards, and validated message form.
- Resume: split identity/sidebar presentation with image preview and PDF actions.

### 4. Terminal behavior

The terminal is a functional virtual shell with history, autocomplete, arrow-key recall, Escape-to-close, responsive full-screen mode, and a simulated filesystem.

Visible commands:

- `help`, `ls`, `cd`, `cat`, `clear`
- `whoami`, `skills`, `echo`, `date`, `ping`
- `repo`, `matrix`

Discoverable commands and files:

- `cat secrets.txt` reveals unlinked experiences.
- `void` opens a sound-led horror-art page.
- `verity` opens a nine-entry interactive story with visitor-name interpolation, branching choices, auto-play, audio controls, progressive visual corruption, session progress, and a persistent ending state.
- `sudo rm -rf /` runs a harmless fake deletion and kernel-panic sequence.

### 5. Other easter eggs

- The Gaming page exposes and responds to the Konami sequence: Up, Up, Down, Down, Left, Right, Left, Right, B, A.
- Completion fires an achievement toast and increases the displayed level/XP.
- Hidden experiences deliberately use a different art direction from the main portfolio.

## Proposed information architecture for Jivesh

| No. | Route | Purpose |
| --- | --- | --- |
| 00 | `/` | Cinematic system home and fastest path to work/contact |
| 01 | `/about` | Identity, operating principles, skills, and personal context |
| 02 | `/work` | All five existing case studies |
| 03 | `/experience` | KandID progression, responsibilities, and education |
| 04 | `/lab` | AI/browser/commerce experiments, prototypes, and technical curiosities |
| 05 | `/guestbook` | Moderated visitor messages |
| 06 | `/writing` | Future technical notes; can launch as a useful empty-state/archive |
| 07 | `/contact` | Contact channels and message form |
| 08 | `/resume` | Preserve the current web/print resume and PDF download |

Keep `/work/[slug]` as the canonical project detail structure. Existing `/#work`, `/#experience`, and `/#contact` links should redirect or remain valid as anchors during migration.

## Visual direction

Use the reference's system language but make the identity specific to Jivesh:

- Base: near-black blue rather than pure black.
- Signal color: retain the current electric blue as the recognizable default.
- Alternate themes: phosphor green and warm terminal amber.
- Typography: large neutral grotesk for headlines, mono for system metadata, and one restrained serif only for editorial/hidden experiences.
- Background: lightweight Canvas 2D noise/scan field plus CSS masks and gradients; avoid making Three.js a baseline dependency.
- Signature graphic: evolve the existing pixel engineer into an animated system/avatar panel rather than copying the reference portrait treatment.
- Motion: precise boot lines, text decoding, panel reveals, route transitions, and hover distortions. Effects should support hierarchy, not obscure project copy.

## Component architecture

Suggested structure:

```text
src/
  app/
    about/page.tsx
    contact/page.tsx
    experience/page.tsx
    guestbook/page.tsx
    lab/page.tsx
    work/page.tsx
    work/[slug]/page.tsx
    writing/page.tsx
    hidden/[experience]/page.tsx
  components/
    shell/
      system-header.tsx
      desktop-nav.tsx
      mobile-menu.tsx
      command-palette.tsx
      route-transition.tsx
    home/
      boot-sequence.tsx
      identity-lockup.tsx
      system-status.tsx
      ambient-canvas.tsx
      theme-controls.tsx
    terminal/
      terminal-overlay.tsx
      terminal-input.tsx
      terminal-output.tsx
      command-registry.tsx
      virtual-filesystem.ts
    guestbook/
      guestbook-form.tsx
      guestbook-feed.tsx
      endorsement-carousel.tsx
    effects/
      scanlines.tsx
      noise-layer.tsx
      glitch-text.tsx
      achievement-toast.tsx
  data/
    portfolio.ts
    navigation.ts
    terminal.ts
    writing.ts
```

Do not rewrite `src/data/portfolio.ts` first. Treat it as the source of truth and split it only when a new route needs a clearer data boundary.

## Terminal design for Jivesh

Ship a smaller useful command set first:

- Navigation: `home`, `about`, `work`, `experience`, `lab`, `guestbook`, `writing`, `contact`, `resume`
- Information: `whoami`, `stack`, `projects`, `status`, `date`, `help`
- Shell: `ls`, `cd`, `cat`, `clear`, `echo`, `history`
- External: `github`, `linkedin`, `email`, `repo`
- Presentation: `theme blue|green|amber`, `fx on|off`, `matrix`

Virtual files:

- `README.md` — concise positioning
- `experience.log` — role progression
- `projects/` — one file per case study
- `contact.vcf` — contact details
- `.secrets` — clue to original easter eggs

Original easter-egg concepts:

1. `sudo deploy production` — fake deployment pipeline that ends with a successful release summary.
2. `cat .secrets` — reveals one hidden route.
3. Konami sequence — unlocks an “agent swarm” visual mode and achievement.
4. Hidden route — an interactive incident-response simulation or autonomous-agent control room, aligned with Jivesh's actual work instead of copying the reference horror experiences.

The terminal parser should be data-driven: each command has aliases, autocomplete values, an executor, help copy, and whether it navigates or renders output. Unit-test the parser independently from the UI.

## Guestbook and contact architecture

### Guestbook

Use a server-rendered approved feed and a server action for submissions.

Minimum record:

```text
id
name
message
status: pending | approved | rejected
createdAt
moderatedAt
ipHash or rateLimitKey
```

Requirements:

- Name and message validation with clear field errors.
- Honeypot, length limits, rate limiting, and duplicate suppression.
- New entries default to `pending`; never publish raw submissions automatically.
- Store a one-way hash/rate-limit key rather than a raw IP where possible.
- Optimistic “transmitted for review” success state, not optimistic public insertion.
- Admin moderation can initially be a protected script/database view rather than a full dashboard.
- Curated endorsements stay separate from public visitor messages.

### Contact

- Validated server action with name, email, subject, and message.
- Honeypot and rate limiting shared with guestbook infrastructure.
- Send email through the deployment's chosen mail provider; retain a visible direct-email fallback.
- Loading, success, and failure states must be announced to screen readers.

## Implementation phases

### Phase 0 — Content and art-direction lock

- Decide which personal material belongs in About and Lab.
- Choose the default system palette and two alternate palettes.
- Choose one original hidden experience; defer a second until after launch.
- Confirm guestbook moderation and email/database providers.

Acceptance: route map, copy map, theme tokens, and one-page mood board are approved.

### Phase 1 — System foundation

- Add theme/effects state and local persistence.
- Replace the current sticky header/footer with the responsive system shell.
- Build desktop navigation, mobile menu, command palette, focus trapping, and keyboard shortcuts.
- Add route-level metadata and preserve existing redirects/anchors.

Acceptance: every route is reachable by mouse, keyboard, mobile menu, and command palette; no content routes are yet dependent on animation.

### Phase 2 — Cinematic home

- Build session-aware boot sequence with a skip path for repeat visitors.
- Create ambient Canvas/CSS background and animated pixel-system identity.
- Add numbered primary navigation, system status, theme cycle, glitch toggle, and terminal trigger.
- Keep SSR text/links available for SEO and reduced-motion users.

Acceptance: home works at 360 px, 768 px, 1440 px, and ultrawide; repeat visits do not force the full intro; reduced motion produces a stable first frame.

### Phase 3 — Core content routes

- Move selected-work cards to `/work` while preserving all five case studies.
- Move progression/education to `/experience`.
- Recompose About from current identity, principles, capabilities, and a shorter work preview.
- Build Lab from real experiments rather than generic hobbies.
- Restyle resume without breaking print/PDF behavior.

Acceptance: a recruiter can understand role, impact, case studies, experience, stack, and contact path without opening the terminal.

### Phase 4 — Terminal and easter eggs

- Implement command registry, virtual filesystem, history, autocomplete, and navigation commands.
- Add theme/effects commands and external-link confirmation where appropriate.
- Add fake deployment easter egg, secret-file clue, and Konami achievement.
- Build one hidden route with its own reset/exit path and no irreversible client state.

Acceptance: all documented commands are tested; unknown commands fail gracefully; hidden experiences never trap navigation or audio.

### Phase 5 — Guestbook, contact, and writing shell

- Add database schema, migrations, validation, moderation state, and approved feed.
- Add contact delivery and shared anti-abuse controls.
- Add Writing index and article template even if launch content is limited.

Acceptance: spam controls, errors, empty states, moderation, and email delivery are verified in staging.

### Phase 6 — Performance, accessibility, and launch QA

- Lazy-load terminal, command palette, hidden routes, heavy media, and optional animation code.
- Ensure audio defaults off and starts only after explicit interaction.
- Support `prefers-reduced-motion`, visible focus, Escape close, focus return, semantic headings, and screen-reader status announcements.
- Test no-JavaScript/SSR content, Core Web Vitals, mobile GPU load, contrast, touch targets, sitemap, robots, metadata, and structured data.
- Run lint, typecheck, build, keyboard tests, and automated browser smoke tests.

Acceptance: the portfolio remains useful when animations fail or are disabled; no main route requires WebGL/audio; production build and smoke suite pass.

## Suggested order and estimate

| Milestone | Estimate |
| --- | ---: |
| Foundation and shell | 2–3 days |
| Home experience | 2–3 days |
| Core route redesign | 3–5 days |
| Terminal and first easter egg | 2–4 days |
| Guestbook/contact/writing shell | 2–4 days |
| QA and performance pass | 2–3 days |

Expected first complete version: roughly 13–22 focused development days, depending mainly on hidden-experience ambition and backend provider setup.

## Guardrails

- Do not copy the reference's personal writing, guestbook content, images, audio, horror story, or exact visual assets.
- Avoid a mandatory long intro on every visit.
- Do not hide the strongest case-study evidence behind terminal commands.
- Do not auto-publish guestbook submissions.
- Do not use animation as the only way to communicate state.
- Keep hidden routes removable and isolated so they cannot destabilize the main bundle.

## Screenshot index

### Baseline and controls

- [`02-home-loaded-desktop.png`](./screenshots/02-home-loaded-desktop.png)
- [`home-mobile.png`](./screenshots/home-mobile.png)
- [`home-theme-1.png`](./screenshots/home-theme-1.png)
- [`home-theme-2.png`](./screenshots/home-theme-2.png)
- [`home-glitch-off.png`](./screenshots/home-glitch-off.png)
- [`command-palette-desktop.png`](./screenshots/command-palette-desktop.png)
- [`mobile-menu.png`](./screenshots/mobile-menu.png)

### Main routes

- [`route-about-desktop.png`](./screenshots/route-about-desktop.png)
- [`route-projects-desktop.png`](./screenshots/route-projects-desktop.png)
- [`route-gaming-desktop.png`](./screenshots/route-gaming-desktop.png)
- [`route-hobbies-desktop.png`](./screenshots/route-hobbies-desktop.png)
- [`route-guestbook-desktop.png`](./screenshots/route-guestbook-desktop.png)
- [`route-writing-desktop.png`](./screenshots/route-writing-desktop.png)
- [`route-contact-desktop.png`](./screenshots/route-contact-desktop.png)
- [`route-resume-desktop.png`](./screenshots/route-resume-desktop.png)
- [`route-project-detail-desktop.png`](./screenshots/route-project-detail-desktop.png)
- [`route-blog-detail-desktop.png`](./screenshots/route-blog-detail-desktop.png)

### Terminal and easter eggs

- [`terminal-open-desktop.png`](./screenshots/terminal-open-desktop.png)
- [`terminal-help-desktop.png`](./screenshots/terminal-help-desktop.png)
- [`easter-konami-gaming.png`](./screenshots/easter-konami-gaming.png)
- [`easter-terminal-delete.png`](./screenshots/easter-terminal-delete.png)
- [`easter-terminal-panic.png`](./screenshots/easter-terminal-panic.png)
- [`easter-void-desktop.png`](./screenshots/easter-void-desktop.png)
- [`easter-void-descended.png`](./screenshots/easter-void-descended.png)
- [`easter-verity-desktop.png`](./screenshots/easter-verity-desktop.png)
- [`easter-verity-story-start.png`](./screenshots/easter-verity-story-start.png)

### Current portfolio comparison

- [`current-portfolio-desktop.png`](./screenshots/current-portfolio-desktop.png)
- [`current-portfolio-mobile.png`](./screenshots/current-portfolio-mobile.png)
