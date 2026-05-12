# CHANGELOG — TrainR

Overzicht van alle wijzigingen per datum en tijd.
Nieuwste bovenaan.

---

## 2026-05-12

### 05:30 — Service worker: deploy direct live
**Bestanden:** `www/sw.js`
- `index.html` nu network-first: elke deploy is direct zichtbaar zonder cache te wissen
- Statische bestanden (icons, manifest) blijven cache-first voor offline gebruik
- `skipWaiting()` + `clients.claim()` toegevoegd: nieuwe SW wordt direct actief na update
- Geïnstalleerde PWA-gebruikers zien update bij eerste app-open na deploy

### 04:40 — Categorie-herindeling + PER SPIERGROEP + 12 nieuwe oefeningen
**Bestanden:** `www/index.html`, `DECISIONS.md`

**Categorieën:**
- Push + Pull samengevoegd tot **Armen**
- Cardio hernoemd naar **Full Body**
- 4 categorieën in plaats van 5: Core / Armen / Legs / Full Body

**12 nieuwe oefeningen** (3 per categorie):
- Core: Hollow body hold, Beenheffers, Russian twist
- Armen: Brede push-ups, Triceps dips vloer, Superman trekbeweging
- Legs: Sumo squat, Step-up (stoel), Kuitheffen
- Full Body: Bear crawl, Inchworm, Zijwaartse sprong

**PER SPIERGROEP sectie op home:**
- LICHAAMSDEEL-rij vervangen door pill-filter + 3 directe workout-kaarten per categorie
- Tik op CORE / ARMEN / LEGS / FULL BODY → 3 workouts verschijnen direct
- Elke workout heeft tijdsinschatting (~10/15/20/25 MIN)
- Sectienaam: "LICHAAMSDEEL" → "PER SPIERGROEP"

**Overig:**
- HIIT → HIT in workout-namen

---

## 2026-05-11

### 19:59 — Phase 3.5: Home-uitbreiding, Settings, Profile+Stats merge, Timer-polish
**Bestanden:** `www/index.html`, `ROADMAP.md`, `README.md`, `DECISIONS.md`

**Home-scherm:**
- Hero-card "Maak je eigen routine" bovenaan
- 3 vaste snel-starters: Quick Core (15M), Full Body (30M), Kracht & Conditie (45M)
- Alle eigen routines zichtbaar (was beperkt tot 4)

**Settings-scherm (nieuw):**
- Vervangt Stats-tab in bottom-nav (label: INST.)
- Training: niveau, geluid aan/uit, wake lock
- Notificaties: toggle, tijd, dagen
- Data: JSON-export van sessies, alle data wissen
- Account: onboarding opnieuw starten

**Profile + Stats samengevoegd:**
- Aparte Stats/History-tab verwijderd
- Laatste sessies nu zichtbaar in ProfileScreen
- ProfileEditModal: alleen nog persoonlijke data (naam, leeftijd, lengte, gewicht, doel)
- Dubbele "onboarding opnieuw"-knop verwijderd

**Timer:**
- Rustscherm toont nu de volgende oefening (naam, categorie-kleur, duur)
- Laatste rust voor finish: melding "LAATSTE — STRAKS KLAAR"

**Geluid:**
- Geluidsvoorkeur nu persistent opgeslagen in profiel (was tijdelijk lokale state)

### 19:09 — CLAUDE.md bijgewerkt
**Bestanden:** `CLAUDE.md`
- Verkeerde directory-paden gecorrigeerd (`Docs/` → `www/`)
- DB-stores bijgewerkt (2 → 4)
- Regelaantal bijgewerkt (~1600 → ~3000)
- Ontbrekende schermen en features toegevoegd

---

## 2026-05-08

### 22:34 — Oefenmodi uitgebreid (tijd / herhalingen / hybride)
- Elke oefening heeft nu `mode` (time/reps/hybrid) en targets per niveau
- Rep-stap tracking in de timer

### 22:20 — Herhalingen-modus + notificatie-reminder v1
- Timer ondersteunt reps-gebaseerde oefeningen
- Eerste versie herinnerings-flow

### 21:59 — Onboarding reset naar bovenkant profiel
- "Onboarding opnieuw"-knop verplaatst naar header van ProfileScreen

### 21:44 — Lokale analytics + KPI-debug
- Gebeurtenissen worden opgeslagen in IndexedDB `events`-store
- Debug-weergave zichtbaar in DEV_MODE

### 21:31 — Trainingsplannen uitgebreid + profielselectie
- Meerdere builtin-plannen met onboarding-gebaseerde standaardselectie
- Profielvelden voor niveau en doel gekoppeld aan plan-selectie

---

## Eerdere versies

Zie git-log voor wijzigingen vóór 2026-05-08.
