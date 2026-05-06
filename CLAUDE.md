# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TrainR is a Dutch-language PWA fitness app for home training (no equipment needed). It is intentionally minimalist: **no build step, no bundler, no npm install** — just a single HTML file served directly.

## Running the App

```bash
# Serve the production app
npx serve www

# Or any local HTTP server:
python3 -m http.server 8080 --directory www
```

Open `http://localhost:PORT` for the app, or `http://localhost:PORT/Design/TrainR.html` for the interactive design prototype. There are no tests or linters.

## Architecture

### Production App (`www/index.html`)

One ~1600-line self-contained file. All React components, logic, and styles live here. Dependencies load from CDN (React 18, Babel standalone, Google Fonts). No JSX transpilation at build time — Babel runs in the browser.

**Key layers:**
- **DB**: `initDB` / `dbOp` / `dbGetAll` — thin wrappers around IndexedDB. Two object stores: `routines` (user-created workouts) and `sessions` (completion history).
- **Exercise library**: 31 exercises in 5 categories (Core, Push, Legs, Pull, Cardio), each with muscle group mappings for visualization.
- **Sequence builder**: `buildSequence()` generates the ordered exercise + rest segments (including a midpoint break) that the timer plays through.
- **Screens**: `HomeScreen`, `RoutinesScreen`, `RoutineBuilderScreen` (3-step wizard), `ActiveScreen` (timer), `FinishScreen`, `ExerciseDetailScreen`.
- **Shared UI**: `BodyDiagram` (SVG muscle map), `MuscleTags`, `Btn`, `Label`.
- **Audio**: Web Audio API beep cues during workout.
- **Streak**: `calcStreak()` counts consecutive training days from session history.

All data stays on-device; there are no external APIs.

### Design Prototype (`www/Design/`)

A separate Figma-style interactive canvas, also browser-rendered via Babel. `design-canvas.jsx` handles artboard pan/zoom; individual `screen-*.jsx` files are screen mockups. `tokens.css` is the master design system (60+ CSS variables).

The tokens from `tokens.css` are mirrored into `www/index.html` — keep them in sync when updating the design system.

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

## Key Conventions

- **Language**: All UI text is Dutch.
- **Mobile-first**: No desktop layout; designed for Android/iOS PWA install.
- **Offline-first**: Service worker (`sw.js`) uses cache-first strategy.
- **No splitting**: Keep production code in `www/index.html`. Do not extract to separate JS files unless the architecture is intentionally changed.
- **Inline SVG**: Icons are inline SVG elements, not an icon library.

Projectleider Context
Achtergrond
34 jaar, Hoofd Technische Dienst bij productiebedrijf
Leidinggevende van 8 man, dagelijks bezig met onderhoud + projecten
Werkt graag praktisch en gestructureerd, geen theorie zonder reden
Kennisniveau
Wel beheers ik:
Excel/Office 365, formules, basis VBA
Elektra (huisinstallatie, basis 3-fase), CV, loodgieten
Home Assistant op Unraid, automations, Docker
Netwerken (VLAN's, basis routing/DNS)
Fietstraining: zones, FTP (270W), wattage, Garmin
Niet (goed) bekend — leg uit, sla niet over:
React, JSX, hooks (basisbegrip)
Modern JavaScript (async/await, Promises, modules)
Build tooling (npm, bundlers, Capacitor, Android Studio)
Git workflows (branches, PR's)
Mobile development (manifests, signing keys, Play Console)
Service workers / PWA mechaniek (concept duidelijk, implementatie niet)
TypeScript
Werkstijl
Liever klein en werkend dan groot en perfect
Eén ding tegelijk afmaken voor het volgende start
Test op echt Android device, niet alleen emulator
Geen overengineering — als het werkt, blijft het zoals het is
Wil zelf snappen wat er gebeurt, niet blind code copy-pasten
Antwoordformat
Standaard structuur
Direct antwoord eerst (één of twee zinnen, geen inleiding)
Werkende code/oplossing als van toepassing — kant-en-klaar, niet pseudo
Korte uitleg van wat het doet en waarom (alleen wat nodig)
Alleen waarschuwen bij echte risico's (data loss, crashes, security)
Wel
Werkende voorbeelden die ik direct in index.html kan plakken en testen
Verklaring waarom we iets doen, niet alleen wat
Eerlijk zijn als iets niet werkt of een slecht idee is
Pushback geven als ik iets vraag dat niet bij het project past
Niet
Inleidingen ("Geweldige vraag!", "Laten we kijken naar...")
Disclaimers bij elke stap ("Houd er rekening mee dat...")
Meerdere alternatieven zonder aanbeveling — geef je voorkeur
Theorie eerst, code later — omgekeerd
Lange genummerde lijsten als prozatekst ook werkt
Codeblokken
Volledige werkende snippets, geen // ...rest van de code
Bij wijziging in index.html: laat zien waar het komt
Bij nieuwe file: bestandsnaam + pad bovenaan
Geen TypeScript tenzij we expliciet overstappen
React via CDN — geen import statements zonder reden
Diepte schaalt per roadmap-phase
Phase 1–2 (PWA, design): Voorbeelden + uitleg, ik leer dit nu
Phase 3 (features): Korter, ik begin patterns te zien
Phase 5–6 (Capacitor, Play Store): Stap-voor-stap, totaal nieuw
Bug fixes: Direct naar de fix, kort uitleggen, doorgaan
Werkafspraken
Aannames maken mag bij
Stijl/naming bij kleine wijzigingen → consistent met bestaande code
React patterns → kies wat past bij CDN-zonder-build setup
File locatie (www/ vs Design/) → gebruik bestaande conventies
Eerst vragen bij
Architectuurkeuzes (state management, data structuur, file splitting)
Externe dependencies toevoegen (nieuwe CDN imports)
Iets dat tegen design principes ingaat
Meerdere wegen mogelijk → vraag welke richting
Volgorde van waarheid bij conflicten
Mijn laatste bericht in deze chat (overrides alles)
Deze Claude.md (technische conventies)
Roadmap (welke phase, wat is doel)
Projectomschrijving (context)
Werkende code in index.html (wat er nu is)
Documenten die elkaar tegenspreken → vragen, niet aannemen.
Scope-checks
"Past dit in deze phase?" → check tegen roadmap
"Is dit overengineering?" → ja, waarschijnlijk wel
"Moet dit nu af?" → meestal nee, parkeer in v1.1