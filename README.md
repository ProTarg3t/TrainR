# TrainR

Offline-first bodyweight fitness PWA voor thuistraining zonder materiaal.
Bouw eigen routines, train met een automatische timer en volg je voortgang.

---

## Wat de app doet

- Onboarding bij eerste start (naam, geslacht, leeftijd, lengte, gewicht, doel, niveau)
- Routines aanmaken uit 53 oefeningen in 5 categorieën: Core, Push, Legs, Pull, Cardio
- 30-dagen trainingsplan (Core Plan) met dag-voor-dag voortgang
- Timer met automatische rustpauzes, geluidssignalen en wake lock
- 3 niveaus: Beginner / Intermediate / Expert
- Calorieverbranding per sessie (MET-gebaseerd, op basis van profiel)
- Spiergroepvisualisatie (heatmap voor + achter) per oefening en na sessie
- RPE-score na afloop (hoe voelde het, 1–10)
- Exercise detail scherm per oefening (instructies, spieren, duraties per niveau)
- Profiel met BMI, gewichtsdoel en voortgangstrack
- Streak en sessiegeschiedenis
- Stats-scherm: totaal sessies, streak, trainingstijd
- Werkt offline (PWA, cache-first)
- Data lokaal opgeslagen via IndexedDB — geen account, geen cloud

---

## Starten

```bash
npx serve www
```

Open `http://localhost:3000` in de browser.  
Voor Android PWA-installatie: open in Chrome → "Toevoegen aan startscherm".

Het designprototype (Figma-stijl canvas met alle schermen):

```bash
# vereist http:// vanwege Babel-transpiler
open www/Design/TrainR.html
```

---

## Projectstructuur

```
www/
  index.html          — productie-app (HTML + React + CSS, één bestand)
  manifest.json       — PWA-configuratie
  sw.js               — service worker (cache-first, offline)
  icon-192.png
  icon-512.png

  Design/
    TrainR.html                  — interactief design canvas
    tokens.css                   — design tokens (master)
    body-map.jsx                 — spiergroep-heatmap component
    design-canvas.jsx            — pan/zoom artboard canvas
    android-frame.jsx            — device frame
    tweaks-panel.jsx             — live tweak-paneel
    screen-home.jsx
    screen-routines.jsx
    screen-routine-detail.jsx
    screen-new-routine.jsx
    screen-active.jsx
    screen-finish.jsx
    screen-exercise-detail.jsx
    screen-onboarding.jsx
    screen-profile.jsx
```

---

## Design systeem

| Token | Waarde |
|---|---|
| Achtergrond | `#000000` (OLED true black) |
| Accent | `#E8FE3C` (signal yellow) |
| Primaire tekst | `#FAFAF9` |
| Font body | Inter |
| Font labels/data | Geist Mono |
| Status go | `#6BE89B` |
| Status rust | `#69A6FF` |
| Status waarschuw | `#FFB454` |
| Status kritiek | `#FF5A5A` |

Stijling via inline JS style-objecten met CSS-variabelen. Geen Tailwind, geen CSS-in-JS library.

---

## Technische keuzes

- Één HTML-bestand, geen build-stap — laagste instapdrempel
- React 18 via CDN + Babel standalone (transpilatie in browser)
- IndexedDB stores: `routines`, `sessions`, `profile`, `plans`
- Geen externe API's, geen accounts
- PWA: installeerbaar, offline bruikbaar via service worker

---

## Roadmap

| Fase | Status |
|---|---|
| Phase 1 — Stabilisatie & PWA | ✅ Afgerond |
| Phase 2 — Design integratie | ✅ Afgerond |
| Phase 3 — Feature expansion | ✅ Afgerond |
| Phase 4 — Refinement & testing | ← Huidig |
| Phase 5 — Native build (Capacitor) | Gepland |
| Phase 6 — Google Play Store | Gepland |

---

## Recente wijzigingen (Phase 3)

- Onboarding flow (8 stappen, eenmalig bij eerste start)
- Caloriëberekening per sessie op Finish-screen
- Exercise detail scherm met instructies, heatmap en niveau-duraties
- Profile scherm: BMI, gewichtsdoel, voortgangsbar
- Home screen v2 met HOME/PLAN tabs
- 30-dagen Core Plan in PLAN tab
- Audio verbeterd: duidelijkere geluiden tijdens workout
- Data layer: DB v4 migratie, profile KV-schema, sessie calories/RPE opslag
- Leesbaarheid verbeterd over alle schermen
