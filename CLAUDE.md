# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TrainR is an English-language PWA fitness app for home training (no equipment needed). It is intentionally minimalist: **no build step, no bundler, no npm install** — just a single HTML file served directly.

## Running the App

```bash
# Serve the production app
npx serve www

# Or any local HTTP server:
python3 -m http.server 8080 --directory www
```

Open `http://localhost:PORT` for the app, or `http://localhost:PORT/Design/TrainR.html` for the interactive design prototype.

**Test on a real Android device** (not desktop) — bugs are often in touch/viewport behavior. Use `http://[laptop-ip]:3000` via wifi, debug with Chrome remote debugging (`chrome://inspect`). See `TESTING.md` for the manual smoke-test checklist.

## Architecture

### Production App (`www/index.html`)

One ~3000-line self-contained file. All React components, logic, and styles live here. Dependencies load from CDN (React 18, Babel standalone, Google Fonts). No JSX transpilation at build time — Babel runs in the browser.

**Key layers:**
- **DB**: `initDB` / `dbOp` / `dbGetAll` — thin wrappers around IndexedDB (`DB_NAME = 'trainr_v1'`, `DB_VERSION = 5`). Four object stores: `routines`, `sessions`, `profile` (KV schema: `{ key, value }`), `events` (analytics log).
- **Exercise library**: 30+ exercises in 5 categories (Core, Push, Legs, Pull, Cardio), each with muscle group mappings for visualization.
- **Sequence builder**: `buildSequence()` generates the ordered exercise + rest segments (including a midpoint break) that the timer plays through.
- **Screens**: `OnboardingScreen` (first-run wizard), `HomeScreen`, `RoutinesScreen`, `RoutineBuilderScreen` (3-step wizard), `ActiveScreen` (timer), `FinishScreen`, `ExerciseDetailScreen`, history/stats screens.
- **Shared UI**: `BodyDiagram` (SVG muscle map), `MuscleTags`, `Btn`, `Label`.
- **Audio**: Web Audio API beep cues during workout.
- **Streak**: `calcStreak()` counts consecutive training days from session history.
- **Analytics**: `trackEventFactory` writes events to IndexedDB `events` store with localStorage fallback. All data stays on-device.
- **Calories**: `calcCalories()` / `calcSessionKcal()` using MET values per category.

### Design Prototype (`www/Design/`)

A separate Figma-style interactive canvas, also browser-rendered via Babel. `design-canvas.jsx` handles artboard pan/zoom; individual `screen-*.jsx` files are screen mockups. `tokens.css` is the master design system (60+ CSS variables).

The tokens from `tokens.css` are mirrored into `www/index.html` — keep them in sync when updating the design system.

### Other Key Files

- `www/sw.js` — Service worker, cache-first strategy
- `www/manifest.json` — PWA manifest (`display: standalone`, portrait)
- `DECISIONS.md` — Log of architectural/product decisions with rationale
- `TESTING.md` — Manual smoke-test checklist and regression scenarios
- `ROADMAP.md` — Phase-by-phase plan toward Google Play Store release (Phases 0–7)

## Design System

| Token | Value |
|---|---|
| Background | `#000000` (OLED black) |
| Accent | `#E8FE3C` (signal yellow) |
| Primary text | `#FAFAF9` |
| Fonts | Inter (body), Geist Mono (labels/data) |
| Status: Go | `#6BE89B` |
| Status: Rest | `#69A6FF` |
| Status: Warn | `#FFB454` |
| Status: Crit | `#FF5A5A` |

Styling is done via inline JS style objects referencing CSS variables (no CSS-in-JS library, no Tailwind).

## Git Workflow

- Na elke push: altijd een pull request aanmaken (of de bestaande PR updaten).
- PR naar `main`, vanuit de feature branch.
- PR-titel en -body in het Nederlands.

### Verificatie vóór commit (verplicht)

Vorige sessies hebben commit-berichten geschreven die features claimden die niet in de diff zaten (zie PR #29). Voorkom herhaling:

1. **`git diff --cached`** voor je committed — wat zit er werkelijk in de stage?
2. Als je commit-bericht een nieuwe constante, component of feature noemt: doe een `grep -n "<symbool>" www/index.html` en bevestig dat het in de huidige code staat. Niet alleen "ik heb het net geschreven" — verifieer.
3. CHANGELOG.md en DECISIONS.md pas bijwerken **na** de code-wijziging in dezelfde commit. Nooit docs vooruit op de code laten lopen.
4. Bij grote refactors: na de commit `git show --stat HEAD` checken — komt het aantal regels overeen met wat je verwacht?

### Verificatie vóór PR merge

- `git diff main...HEAD --stat` — komt de file-changelijst overeen met de PR-beschrijving?
- Als de PR een feature claimt: `grep` op het hoofd-symbool van die feature in de PR-branch. Niet matcht = niet gemerged.

### Branch-housekeeping

- Push na PR-merge geen losse commits meer naar dezelfde feature branch — maak een nieuwe branch. Anders blijven commits "hangen" zonder PR (oorzaak van het PR #29 incident).

## Sectie-structuur `www/index.html`

Vaste volgorde — nieuwe code op de juiste plek plaatsen, niet onderaan plakken:

1. **DB LAYER** — `initDB`, `dbOp`, `dbGetAll`, profile-helpers, MET-tabellen, kcal-helpers, analytics-factory.
2. **SPIERVISUALISATIE** — `MUSCLE_COLORS`, body-region config, `BodyDiagram`, `MuscleTags`.
3. **EXERCISE LIBRARY** — `EXERCISES` array, `CATS`, `CAT_COLORS`, `BODY_PART_WORKOUTS`.
4. **BUILTIN PLANS** — `BUILTIN_PLANS`, plan-helpers, default-plan-selector.
5. **AUDIO** — `beep` + Web Audio helpers.
6. **TIMER HELPERS** — `buildSequence`, format helpers, streak/kcal-calc voor sessies.
7. **DESIGN TOKENS** — `C` object (kleuren, fonts, spacing) — alleen verwijzen naar CSS-vars uit `<style>` blok.
8. **ICONS** — inline SVG iconen onder `Icon = { ... }`.
9. **SHARED COMPONENTS** — `Btn`, `Label`, `Loader`, `CatTags`, kleine herbruikbare componenten.
10. **SCREENS** — één blok per scherm in nav-volgorde: Home → Routines → RoutineBuilder → Timer → Finish → Profile → History → Settings → Onboarding → ExerciseDetail.
11. **APP** — root component, navigatie-state, service-worker registratie.

Banner-comment-stijl: `// ===` (64×), hoofdsecties alleen. Sub-secties → één-regel comment, geen banner.

## Wanneer welk docs-bestand updaten

- **`DECISIONS.md`** — alleen bij architectuur- of productkeuzes met afweging (Wat / Waarom / Alternatief / Impact). Niet voor bugfixes of cosmetische changes.
- **`CHANGELOG.md`** — bij elke user-visible feature of fix. Format: datum/tijd-blok, bestanden, bullets.
- **`TESTING.md`** — bijwerken als er nieuwe flow is die niet in de checklist staat. Vóór een PR-merge: de relevante secties van TESTING.md doorlopen op een echt Android-toestel.
- **`ROADMAP.md`** — raadplegen bij scope-vraag ("past dit in deze fase?"). Aanpassen alleen bij echte plan-wijziging.

## Key Conventions

- **Language**: All UI text is English. Docs (CHANGELOG, DECISIONS) and PR titles/bodies stay Dutch — see Git Workflow.
- **Mobile-first**: No desktop layout; designed for Android/iOS PWA install.
- **Offline-first**: Service worker (`sw.js`) uses cache-first strategy.
- **No splitting**: Keep production code in `www/index.html`. Do not extract to separate JS files unless the architecture is intentionally changed.
- **Inline SVG**: Icons are inline SVG elements, not an icon library.
- **No TypeScript**: Plain JavaScript with JSX via Babel-in-browser. No import statements (React via CDN).
- **Log decisions**: Architectural choices go in `DECISIONS.md`. Bugfixes do not.

## Projectleider Context

**Achtergrond:** 34 jaar, Hoofd Technische Dienst bij productiebedrijf. Werkt graag praktisch en gestructureerd.

**Wél bekend:** Excel/VBA, elektra, Home Assistant/Docker, netwerken, fietstraining (FTP 270W, Garmin).

**Uitleg nodig bij:** React/JSX/hooks, moderne JS (async/await, Promises), build tooling, git workflows, mobile dev (manifests, signing), service workers, TypeScript.

**Antwoordformat:**
- Direct antwoord eerst, daarna werkende code, dan korte uitleg
- Volledige werkende snippets — geen `// ...rest van de code`
- Bij wijziging in `index.html`: laat zien waar het komt
- Geen inleidingen, geen disclaimers bij elke stap, geen meerdere alternatieven zonder aanbeveling
- Waarschuwen alleen bij echte risico's (data loss, crashes, security)

**Werkafspraken — aannames maken mag bij:**
- Stijl/naming bij kleine wijzigingen → consistent met bestaande code
- React patterns → kies wat past bij CDN-zonder-build setup
- File locatie (`www/` vs `www/Design/`) → gebruik bestaande conventies

**Eerst vragen bij:**
- Architectuurkeuzes (state management, data structuur, file splitting)
- Externe dependencies toevoegen (nieuwe CDN imports)
- Iets dat tegen design principes ingaat
- Meerdere wegen mogelijk

**Scope-checks:** "Past dit in deze phase?" → check tegen roadmap. "Is dit overengineering?" → ja, waarschijnlijk wel.
