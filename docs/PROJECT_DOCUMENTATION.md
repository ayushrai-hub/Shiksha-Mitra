# Shiksha-Mitra — Project Documentation

This document provides a comprehensive overview of the project: architecture, tech stack, file structure, components, styling, scripts, and development workflow.


## 1) Overview
- "Shiksha-Mitra" is a marketing/landing website for a growth-companion platform inspired by the Vedic concept of mutual learning and accountability.
- The current codebase is a static React (TypeScript) single-page site built with Vite and styled with Tailwind CSS.
- Content focuses on explaining the concept, benefits, features/tools, and how matching will work.


## 2) Tech Stack
- React 18 + TypeScript
- Vite 5 (bundler/dev server)
- Tailwind CSS 3 for styling
- lucide-react for icons
- ESLint + TypeScript-ESLint for linting

Key manifests:
- `package.json` — scripts and dependencies
- `tailwind.config.js` — Tailwind scanning paths
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` — TypeScript configs


## 3) Project Structure
```
Shiksha-Mitra/
├─ index.html                # Root HTML; mounts React at #root
├─ package.json              # Scripts & deps
├─ tailwind.config.js        # Tailwind setup (content globs)
├─ postcss.config.js         # PostCSS/Tailwind pipeline
├─ vite.config.ts            # Vite config
├─ tsconfig*.json            # TypeScript configuration
├─ src/
│  ├─ main.tsx               # React entry; mounts <App />
│  ├─ index.css              # Tailwind entry (base/components/utilities)
│  ├─ App.tsx                # Page composition, imports sections
│  └─ components/
│     ├─ Header.tsx
│     ├─ Hero.tsx
│     ├─ ConceptOverview.tsx
│     ├─ Benefits.tsx
│     ├─ HowItWorks.tsx
│     ├─ Activities.tsx
│     ├─ Tools.tsx
│     ├─ Compassion.tsx
│     ├─ FindMitra.tsx
│     └─ Footer.tsx
└─ docs/
   └─ PROJECT_DOCUMENTATION.md  # This doc
```


## 4) How it Renders
- `index.html` renders a single `<div id="root" />` and loads `src/main.tsx`.
- `src/main.tsx` mounts `<App />` under React StrictMode.
- `src/App.tsx` composes the page by rendering section components in order:
  - `Header`, `Hero`, `ConceptOverview`, `Benefits`, `HowItWorks`, `Activities`, `Tools`, `Compassion`, `FindMitra`, `Footer`.
- Tailwind classes provide layout/responsive design; icons come from `lucide-react`.


## 5) Components (purpose & notes)
- `Header.tsx`
  - Sticky top nav with brand and anchors to sections (`#concept`, `#how-it-works`, `#tools`).
  - “Find Your Mitra” button (non-functional in current static build).

- `Hero.tsx`
  - Primary headline and CTA (“Find Your Shiksha-Mitra”, “Learn the Concept”).
  - Three highlight cards: People, Endless Growth, Shared Purpose.

- `ConceptOverview.tsx`
  - Explains “Shiksha” and “Mitra” concepts.
  - Modern need section and the “Shiksha-Mitra Promise”.

- `Benefits.tsx`
  - Lists benefits with icons.
  - Shows transparent challenges and how the platform addresses them.

- `HowItWorks.tsx`
  - Four-step journey from understanding to growing together.
  - CTA banner to start the journey.

- `Activities.tsx`
  - Grid of activity ideas (daily check-ins, goals, pomodoro, etc.).
  - Highlight on Meditation & Mindfulness habit.

- `Tools.tsx`
  - Showcases built-in tools (shared todo, journal, goal tracker, mood status, restart together, challenge board).
  - “Coming Soon” advanced features preview.

- `Compassion.tsx`
  - Emphasizes consistency with compassion; process to gently return after breaks.

- `FindMitra.tsx`
  - Explains matching criteria and interim community pairing approaches.
  - CTA “Join the Waitlist” (non-functional stub button).

- `Footer.tsx`
  - Brand, brief description, social placeholders, and quick links.


## 6) Styling & Theming
- Tailwind CSS utility-first classes.
- Config: `tailwind.config.js` with `content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']`.
- Global CSS only includes Tailwind layers in `src/index.css`.
- Color usage favors emerald/blue/indigo gradients for a calm, growth-oriented theme.


## 7) Scripts & Development
Defined in `package.json`:
- `dev` — start Vite dev server with HMR.
- `build` — production bundle via Vite.
- `preview` — preview the production build locally.
- `lint` — run ESLint on the project.

Typical workflow:
```bash
# Install
npm install

# Develop (http://localhost:5173 by default)
npm run dev

# Lint
npm run lint

# Build
npm run build

# Preview the build
npm run preview
```


## 8) TypeScript
- Strict React + TS setup.
- `vite-env.d.ts` included for Vite type helpers.
- Components are functional components typed as `React.FC`.


## 9) Assets & Icons
- Icons are from `lucide-react` and imported per component. Example:
```tsx
import { Users, Heart } from 'lucide-react';
```
- Favicon currently `vite.svg` from Vite starter.


## 10) Accessibility & Semantics (current state)
- Uses semantic sectioning (`<section>`, headings in logical order).
- High-contrast CTAs and large tap targets.
- Next steps to improve:
  - Add `aria-label`s where needed (e.g., icon-only buttons/links in `Footer.tsx`).
  - Ensure focus styles on all interactive elements.
  - Provide skip-to-content link in `Header`.


## 11) Performance Considerations
- Static site; minimal JS beyond render and icons.
- Opportunities:
  - Purge unused Tailwind classes (already handled by content scanning in production mode).
  - Consider icon tree-shaking (lucide-react already supports per-icon imports).


## 12) Environment & Config
- No runtime environment variables required at present.
- No API calls or backend integration in current version.


## 13) Deployment
- Any static hosting works (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
- Build outputs to `dist/`.
- Ensure the server serves `index.html` for SPA routes (though current app uses only anchors and no client routing).


## 14) Roadmap Ideas
- Matching system (goals, timezone, interests, communication style, support preferences).
- Auth and profiles.
- Persistent data (tasks, journals, goals, mood) via backend or hosted DB.
- Real-time collaboration (WebSocket) for shared features.
- Email/Push reminders with “Restart Together” action.
- Accessibility enhancements, i18n.


## 15) Contributing & Code Style
- Prefer small, focused components.
- Keep presentational components stateless; lift state only when needed.
- Run `npm run lint` before commits.


## 16) Known Limitations
- Static-only: buttons/CTAs are placeholders.
- No router/state management.
 
## 16) Testing & Coverage
- Test runner: Vitest + Testing Library + jsdom (see `src/setupTests.ts`).
- Current coverage focuses on interactive feature widgets and core pages/sections.
- Implemented tests (unit + hydration where applicable):
  - Features: `SharedTodo`, `MoodStatus`, `Journal`, `GoalTracker`, `ChallengeBoard`, `RestartTogether`, `FeatureShowcase`.
  - Sections: `Header`, `Footer`, `Hero`, `ConceptOverview`, `Benefits`, `HowItWorks`, `Activities`, `Tools`, `Compassion`, `FindMitra` (section).
  - Pages: `Dashboard`, `FindMitra`, `NotFound`.
  - App shell: route rendering on `/`, `/dashboard`, `/find-mitra`, unknown route.

Planned next steps:
- Keep smoke tests updated as copy changes.
- Add more accessibility assertions (roles/names/labels) where helpful.
- Consider snapshot tests for large presentational sections sparingly.


## 17) Quick Reference
- Entry: `src/main.tsx`
- Composition: `src/App.tsx`
- Styles: `src/index.css`, Tailwind utilities
- Icons: lucide-react, imported per-component
- Dev: `npm run dev`
- Build: `npm run build`


---
If you want, I can:
- Link CTAs to forms or routes.
- Add a router and basic pages.
- Implement a minimal mock matching flow.
- Set up deployment (e.g., Netlify/Vercel).
