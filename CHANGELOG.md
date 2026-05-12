# CHANGELOG — TrainR

Overzicht van alle wijzigingen per datum en tijd.
Nieuwste bovenaan.

---

## 2026-05-12

### 21:35 — Coach-gepersonaliseerde 3 home-trainingen
**Bestanden:** `www/index.html`

Vervangt de hardcoded SNEL STARTEN-workouts door 3 trainingen die door een coach-selector worden samengesteld op basis van het onboarding-profiel.

**Coach-selector:**
- 12 templates verdeeld over 4 trainingGoals (fatloss / muscle / core / fitness), elk met `primaryCat` ~70% en `secondaryCat` ~30%.
- Duraties uit `times[level-index]` per oefening + 30s rust tussen oefeningen.
- Deterministisch op seed `(goal | level | dag-van-jaar)`: refresh = zelfde 3 trainingen, nieuwe dag = nieuwe selectie.
- Age ≥ 55: 6 high-impact oefeningen (burpees, jump-squat, lateral-jump, high-knees, butt-kicks, squat-jump-rep) eruit gefilterd.
- WeightDelta > 5kg in fatloss: 1 extra Full-Body oefening i.p.v. core.
- Coach-intro boven de cards: `Voor jouw doel: X. N× per week, Y.`

**Onboarding gesaneerd:**
- Stap 7: alleen doelgewicht-input (de overlappende DOEL-tiles verwijderd).
- Stap 8: 4 tiles in 2×2 grid (AFVALLEN / SPIEROPBOUW / CORE / ALGEMENE FITHEID). `trainingGoal` is nu canonical; `goal`-veld vervalt.

**Migratie bestaande profielen:**
- `migrateProfile()` in `getProfile()` mapt oude `goal`-waarden naar `trainingGoal` bij elke read. `saveProfile` schrijft `goal` niet meer; `selectDefaultPlan` leest `trainingGoal` met inline-fallback voor profielen die nog niet zijn gemigreerd.

**HomeTab:** SNEL STARTEN-sectie hernoemd naar AANBEVOLEN. Coach-workouts worden via `params.routine`-pad in TimerScreen gestart (geen DB-write voor dynamische routines).

### 21:18 — CLAUDE.md uitgebreid met verificatie-checklist en sectie-structuur
**Bestanden:** `CLAUDE.md`

Naar aanleiding van het PR #29-incident (commit-bericht beweerde features die niet in de diff zaten):
- Verplichte verificatie vóór commit: `git diff --cached`, grep op nieuwe symbolen, docs nooit voor code uit.
- Verplichte verificatie vóór PR-merge: diff-stats matchen met PR-beschrijving.
- Branch-housekeeping: geen losse commits naar al-gemergede branches.
- Vaste sectie-structuur voor `www/index.html` (11 secties in volgorde).
- Guidance per docs-bestand: wanneer DECISIONS / CHANGELOG / TESTING / ROADMAP bijwerken.

### 21:15 — MET-tabellen bijwerken voor nieuwe categorieën
**Bestanden:** `www/index.html`

`MET_BY_CAT` en `MET_SESSION` gebruikten nog Push/Pull/Cardio als keys na de categorie-herindeling. Calorieberekening viel daardoor terug op de default (4.0) voor Armen/Full Body workouts. Bug zat in commit c06934e zelf.
- Push (5.0) + Pull (5.0) → Armen (5.0)
- Cardio (8.0) → Full Body (8.0)

### 21:14 — Cleanup vibe code in index.html
**Bestanden:** `www/index.html`

8 low-risk leesbaarheids-fixes, geen gedragsverandering:
- Misleidende section header `ROUTINES SCREEN — redesigned` → `ROUTINE BUILDER`.
- Speculatieve comment over fetch()-migratie 'when going public' verwijderd.
- Dead-code-comments rond niet-aangemaakte plans-store verwijderd.
- Ongebruikte `EVENT_SCHEMA` constante verwijderd.
- Dubbele entries in `saveProfile` FIELDS-array gededupt.
- Ontbrekende `EXERCISE LIBRARY` banner toegevoegd boven `const EXERCISES`.
- `MSG_RESET_ONBOARDING` constante toegevoegd (was 2× letterlijke string).
- `console.log` → `console.warn` bij SW registration failure (consistent met andere warns).

### 06:40 — Categorie-herindeling + PER SPIERGROEP + 12 nieuwe oefeningen (cherry-pick c06934e)
**Bestanden:** `www/index.html`, `DECISIONS.md`

Cherry-pick van commit die hangend op `claude/init-project-setup-100wc` stond zonder PR (oorzaak van PR #29-mismatch tussen docs en code).

**Categorieën:**
- Push + Pull samengevoegd tot Armen
- Cardio hernoemd naar Full Body
- 4 categorieën in plaats van 5: Core / Armen / Legs / Full Body

**12 nieuwe oefeningen** (3 per categorie):
- Core: hollow-body, leg-raise, russian-twist
- Armen: wide-pushup, floor-dip, superman-pull
- Legs: sumo-squat, step-up, calf-raise
- Full Body: bear-crawl, inchworm, lateral-jump

**PER SPIERGROEP sectie op home:**
- `BodyPartSection` component met pill-filter (4 spiergroepen) + 3 directe workout-kaarten per categorie.
- `BODY_PART_WORKOUTS` constante: 12 voorgedefinieerde workouts totaal.

### 05:35 — Bugfixes nav en wake-lock (review #28)
**Bestanden:** `www/index.html`
- P1 fix: DETAILS-knop op FinishScreen navigeerde naar verwijderd 'history'-scherm → nu naar 'profile'
- P2 fix: wake-lock in TimerScreen negeerde de Settings-voorkeur → leest nu `profile.wakelock` op mount



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
