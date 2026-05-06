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
