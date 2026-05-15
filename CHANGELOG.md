# CHANGELOG — TrainR

Overzicht van alle wijzigingen per datum en tijd.
Nieuwste bovenaan.

---

## 2026-05-15

### 6 vaste presets op Home + coach-strip hernoemd
**Bestanden:** `www/index.html`

Op Home staat nu een tweede horizontale strip **PRESETS** met 6 vaste routines van 5/10/15/20/25/30 minuten (intermediate als ijkpunt; minuten schalen automatisch met `profile.level`). De bestaande gepersonaliseerde coach-strip is hernoemd `QUICK START` → **`COACH PICKS`** om verwarring met de vaste presets te voorkomen.

**Presets** (alle uit de uitgebreide library van 52 oefeningen):
1. Core Express · ~5 MIN · 5 oef.
2. Arms Push Pump · ~10 MIN · 9 oef.
3. Legs Builder · ~15 MIN · 13 oef.
4. Full Body Flow · ~20 MIN · 17 oef.
5. Full Body Power · ~25 MIN · 21 oef.
6. Full Body Endurance · ~30 MIN · 25 oef.

**Implementatie:**
- `PRESET_ROUTINES`-constante na `BODY_PART_WORKOUTS`.
- `presetMin(preset, level)`-helper: `SUM(ex.times[idx]) + (n-1)·30s` → minuten op het profiel-level.
- Volgorde top-to-bottom op Home: `COACH PICKS` → `PRESETS` → `MY ROUTINES` → `BY MUSCLE GROUP`.
- Builder-toggle label `SHOW ON QUICK START` hernoemd naar `SHOW IN MY ROUTINES` (functie ongewijzigd — `routine.quickStart`-flag stuurt sinds vroeger eigenlijk de MY ROUTINES-strip aan).

### Library-uitbreiding 2025-2026: 8 nieuwe oefeningen
**Bestanden:** `www/index.html`

8 oefeningen toegevoegd om gaten in de progressie te vullen (knie-vriendelijker varianten, glute-progressies boven bridge, hamstring zonder equipment, push-progressie naar 1-arm). Library staat nu op **52 oefeningen totaal** (10 → 12 Core, 15 → 16 Arms, 10 → 14 Legs, 9 → 10 Full Body).

- **Core**: `copenhagen-plank` (adductor-isolatie), `hollow-rock` (dynamische hollow-body).
- **Arms**: `archer-pushup` (push-progressie richting 1-arm).
- **Legs**: `reverse-lunge` (knie-vriendelijker), `hip-thrust` (glute-progressie boven bridge), `nordic-curl-neg` (hamstring negatief zonder equipment), `cossack-squat` (mobility + unilateraal).
- **Full Body**: `wall-walk` (schouder/core/mobility).

`EXERCISE_CONFIGS` aangevuld voor alle 8 (6 reps, 2 time). Spier-mapping volgt `MUSCLE_CONFIG`; adductors heeft geen aparte muscle-key dus copenhagen-plank toont `quads` primair met `obliques`/`glutes` secundair.

### Reps-mode telt automatisch af + brede herclassificatie reps/time
**Bestanden:** `www/index.html`

Reps-oefeningen bleven hangen op `timeLeft = 0` en vroegen om een handmatige DONE-tap, waardoor de workout-flow stokte. Daarnaast viel 26 van de 44 oefeningen impliciet terug op time-mode terwijl ze natuurlijker reps zijn (incline-pushup, jump-squat, glute-single, calf-raise, inchworm, sumo-squat, etc.).

**Wijzigingen:**
- `EXERCISE_CONFIGS` van 10 → **44 entries** (één per bestaande oefening). Resultaat: **30 reps, 13 time, 1 hybrid** (was: 4/5/1 expliciet + 26 fallback-time).
- `EXERCISES` `times`-arrays bijgesteld naar `targets × seconds-per-rep` voor reps-oefeningen (~3s strict / ~5s slow / ~2.5s alternerend / ~2-3s plyo).
- `buildSequence()`: voor reps/hybrid is `duration` nu `times[levelIdx]` i.p.v. `0` → progress-bar en totaal-tijd kloppen, timer ring vult lineair.
- Timer-loop: short-circuit `return 0` voor reps/hybrid verwijderd; aftellen + auto-advance werkt nu in alle modes.
- Display: onder het grote `REPS`-getal staat nu een kleine `M:SS`-countdown (Geist mono) zodat de gebruiker ziet hoeveel tijd er nog is — DONE-knop blijft beschikbaar voor early-exit.

---

## 2026-05-14

### Service worker auto-update bij nieuwe deploy
**Bestanden:** `www/sw.js`, `www/index.html`

PWA's bleven hangen op oude versies — gebruikers zagen na een deploy nog de oude app. Toegevoegd:

- `sw.js`: `CACHE_NAME` opgehoogd naar `trainr-2026-05-14`; `message`-handler voor `SKIP_WAITING` zodat de nieuwe SW direct kan overnemen zonder dat de gebruiker een tab moet sluiten.
- `index.html`: SW-registratie roept `reg.update()` aan op elke pagina-load, luistert op `updatefound` → postMessage `SKIP_WAITING`, en bij `controllerchange` doet `window.location.reload()`. Resultaat: elke deploy waarbij `sw.js` of `index.html` byte-veranderd is, leidt automatisch tot een refresh op het toestel.

Eerste transitie van oude naar nieuwe SW: nog één keer handmatig refreshen op het toestel. Daarna volledig automatisch.

### UI volledig vertaald naar Engels
**Bestanden:** `www/index.html`, `www/manifest.json`

Alle gebruikerszichtbare teksten omgezet van Nederlands naar Engels. Directe vervangingen op de plek waar ze staan, geen i18n-laag toegevoegd.

**Scope:**
- `<html lang>` `nl` → `en`; `manifest.json` description vertaald.
- `EXERCISES`: 40 namen en 47 beschrijvingen handmatig vertaald, elke zin nagelopen op vakterm en spelling.
- `BUILTIN_PLANS`, `COACH_TEMPLATES`, `BODY_PART_WORKOUTS`, `GOAL_LABEL`/`LEVEL_LABEL`, `MET_BY_CAT`/`MET_SESSION`/`CAT_COLORS`: categoriekey `Armen` → `Arms` (door hele bestand), workoutnamen en goal/level-labels vertaald.
- BMI-labels: `ONDERGEWICHT`/`GEZOND`/`OVERGEWICHT`/`OBESITAS` → `UNDERWEIGHT`/`HEALTHY`/`OVERWEIGHT`/`OBESE`.
- Spierlabels in `MUSCLE_CONFIG`, `VOOR`/`ACHTER` → `FRONT`/`BACK`, `PRIMAIR`/`SECUNDAIR` → `PRIMARY`/`SECONDARY`.
- Alle schermen: Home, Plan, Routines, Builder, Timer (idle/countdown/running/paused), Finish, Profile, History, Settings, Onboarding (10 stappen), ExerciseDetail, BottomNav.
- `toLocaleDateString('nl-NL')` → `'en-US'`.
- `MSG_RESET_ONBOARDING` + alle confirm/alert-strings vertaald.
- Gender-waardes in onboarding/profile-edit: `man`/`vrouw`/`anders` → `male`/`female`/`other`.
- Notification reminder body en follow-up vertaald.

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
