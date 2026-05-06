# TrainR

Thuistrainings-app zonder materiaal. Bouw je eigen routines, train met een timer en volg je voortgang.

## Wat doet de app

- **Routines** aanmaken met oefeningen uit 5 categorieën: Core, Push, Legs, Pull, Cardio
- **Timer** met automatische rust-pauzes en geluidssignalen
- **3 niveaus**: Beginner / Intermediate / Expert (bepaalt de duur per oefening)
- **Spiervisualisatie** per oefening en per routine
- **Streak en geschiedenis** bijhouden
- Werkt offline (PWA / Progressive Web App)
- Data wordt lokaal opgeslagen via IndexedDB (blijft op het apparaat)

## Hoe starten

Open `www/index.html` in een browser. Geen installatie nodig.

Voor de volledige PWA-ervaring (installeerbaar, offline):
- Serveer de `www/` map via een lokale webserver, bijv.:
  ```
  npx serve www
  ```
- Of gebruik een live server extensie in VS Code.

Het designprototype openen: open `www/Design/TrainR.html` in een browser (óók via een lokale server — de Babel-transpiler vereist `http://`).

## Projectstructuur

```
www/
  index.html        — productie-app (HTML + React + CSS in één bestand)
  manifest.json     — PWA-configuratie
  sw.js             — service worker voor offline gebruik
  icon-192.png      — app-icoon
  icon-512.png      — app-icoon (groot)

  Design/
    TrainR.html          — interactief design canvas (alle schermen naast elkaar)
    tokens.css           — design tokens (kleuren, typografie, spacing, radius)
    body-map.jsx         — spiergroep-heatmap component (heat 0–4)
    design-canvas.jsx    — Figma-achtige canvas (pan/zoom, artboards, focus-mode)
    android-frame.jsx    — Android device frame voor artboards
    tweaks-panel.jsx     — zwevend tweak-paneel (density, kleur, etc.)
    screen-home.jsx      — Home scherm
    screen-routines.jsx  — Routines lijst (gefilterd)
    screen-routine-detail.jsx — Routine detail + start CTA
    screen-new-routine.jsx    — Nieuwe routine builder (3 stappen)
    screen-active.jsx    — Actieve workout (timer ring, segmented progress)
    screen-finish.jsx    — Sessie voltooid (heatmap + RPE slider)
    screen-exercise-detail.jsx — Oefening detail (instructies + spieren)
    screen-onboarding.jsx — Onboarding (Typeform-stijl, 8 stappen)
    screen-profile.jsx   — Profiel (BMI, gewichtsdoel, stats)
```

## Design richting

Het `Design/`-prototype werkt met een eigen design system:

| Token | Waarde |
|---|---|
| Achtergrond | `#000000` (OLED true black) |
| Accent | `#E8FE3C` (signal yellow) |
| Primaire tekst | `#FAFAF9` |
| Font body | Inter |
| Font labels/nummers | Geist Mono |

De productie-app (`index.html`) loopt nog op het originele thema. Visuele integratie staat gepland.

## Technische keuzes

- Productie: één HTML-bestand zonder build-stap — laagste instapdrempel
- React 18 via CDN (geen npm vereist)
- IndexedDB voor opslag — data blijft ook offline beschikbaar
- Geen externe API's of accounts
- Design-prototype: losse JSX-bestanden, getranspileerd via Babel in de browser

## Toekomstige plannen

- [ ] Visuele integratie: design tokens uit `Design/tokens.css` doorvoeren in `index.html`
- [ ] Oefeningen bewerkbaar maken in de app
- [ ] Code opsplitsen in losse bestanden
- [ ] Verpakken als native app via Capacitor
- [ ] Meer standaard-routines per categorie
