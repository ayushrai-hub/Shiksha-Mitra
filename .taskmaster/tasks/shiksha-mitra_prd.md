# Shiksha-Mitra — Product Requirements Document (PRD)

## Overview
Shiksha-Mitra is a two-person growth-companion platform inspired by the Vedic concept of mutual learning and accountability. It addresses isolation, inconsistency, and lack of supportive structure for self-improvement. Users pair as “Mitras” to check in, set goals, track progress, and support each other with compassion.

Primary audience: Students, early professionals, lifelong learners seeking gentle accountability and emotional support.

Value: Makes growth consistent and humane via simple shared tools and a culture of empathy.


## Core Features (MVP Focus)
1) Shared To‑Do List
- What: A simple task list visible to both Mitras.
- Why: Creates daily rhythm and mutual accountability with minimal friction.
- How: Local shared list initially (demo), later backed by real-time sync.

2) Daily Journal Space
- What: Private entries + optional shared excerpts.
- Why: Encourages reflection and context for check-ins.
- How: Local demo storage; later privacy controls and sync.

3) Goal Tracker with Check‑ins
- What: Define goals, targets, and periodic check-ins.
- Why: Structure and visibility on progress.
- How: Local model of goals with status and notes; later reminders and analytics.

4) Mood Status & Emotion Marker
- What: Quick emoji/mood selection and note.
- Why: Enables compassionate support and context-aware communication.
- How: Local component; later sharing rules and trends.

5) "Restart Together" Button
- What: A ritualized restart when momentum is lost.
- Why: Normalizes breaks and promotes compassionate consistency.
- How: Triggers a reset workflow across modules; later sends notifications.

6) Mitra Challenge Board
- What: Weekly shared mini-challenges (e.g., read 20 pages).
- Why: Adds fun, novelty, and shared momentum.
- How: Local list of challenges with completion tracking; later templates and streaks.


## User Experience
- Personas: Student, Early Professional, Accountability Seeker.
- Flows:
  - Pairing (placeholder now) → Land on dashboard → Daily: update mood, tasks, journal → Weekly: review goals + challenges → If off-track: use Restart Together.
- UI/UX:
  - Calm palette (emerald/blue/indigo).
  - Accessible, large CTAs; compassionate copy.
  - Mobile-first responsive grid.


## Technical Architecture
- SPA: React 18 + TypeScript + Vite + Tailwind.
- State: Local component state for MVP demo (no backend yet).
- Modules (under `src/features/`):
  - `SharedTodo`, `Journal`, `GoalTracker`, `MoodStatus`, `RestartTogether`, `ChallengeBoard`.
- Future:
  - Backend with auth and profiles; WebSocket/RTDB for sync; notifications.

Data models (MVP in-memory):
- Task { id, text, done }
- JournalEntry { id, date, text, shared }
- Goal { id, title, target, progress, notes }
- Mood { value, note, date }
- Challenge { id, title, week, done }

APIs & Integrations: None in MVP. Future: Email/push, calendar, video.

Infrastructure: Static hosting for SPA. Later: serverless functions / DB.


## Development Roadmap
- MVP (Demo, usable locally):
  - Build UI components for all six features with local state.
  - Add `FeatureShowcase` section to surface them on the landing page.
  - Accessibility passes for icon-only buttons.
- Phase 2 (Foundations):
  - Introduce routing and a basic dashboard page per feature.
  - Lift state to a context; persist to localStorage.
- Phase 3 (Sync & Accounts):
  - Auth; profile; Mitra pairing flow (manual initially).
  - Real-time sync for tasks/goals/journal/mood.
- Phase 4 (Intelligence & Growth):
  - Analytics, reminders, streaks; challenge templates.
  - “Restart Together” notifications and guided reset.


## Logical Dependency Chain
1) MVP UI components (independent, quick wins, visible).
2) Routing + dashboard shell to host features cleanly.
3) State management + local persistence for reliability.
4) Auth + pairing to make it multi-user.
5) Real-time sync and notifications for full experience.


## Risks and Mitigations
- Over-scoping MVP → Keep features local and UI-only initially.
- UX complexity → Start with a single page showcase, iterate with routing later.
- Data privacy → Delay sharing until auth and permissions exist.


## Appendix
- Design language: compassionate, non-judgmental copy; gentle animations only.
- References: lucide-react icons; Tailwind utility patterns.
