# DECISIONS.md — TrainR

Logboek van technische en product-keuzes. Eén regel per beslissing, kort onderbouwd.
Doel: over 3 maanden weten waarom iets is zoals het is — voor jezelf én voor Claude.

## Hoe te gebruiken

- Eén entry per echte keuze (niet voor elke commit).
- Format: datum, wat, waarom, alternatief dat je hebt afgewezen.
- Schrijf het op het moment van beslissen — niet achteraf reconstrueren.
- Als je iets terugdraait: nieuwe entry toevoegen, oude laten staan.

## Wanneer wél loggen

- Architectuurkeuzes (DB-schema, state management, file-splitting)
- Externe dependencies toegevoegd of bewust niet
- Afwijken van bestaande conventies (Claude.md)
- Design-keuzes met impact op meerdere schermen
- Iets dat je later waarschijnlijk gaat heroverwegen

## Wanneer níet loggen

- Bugfixes (gewoon git commit message)
- Stijl-tweaks (kleur, spacing)
- Tekstwijzigingen
- Refactors zonder gedragsverandering

---

## Format

```
## YYYY-MM-DD — Korte titel
**Wat:** Wat is besloten (1-2 zinnen)
**Waarom:** Reden, context (2-3 zinnen)
**Alternatief:** Wat afgewezen en waarom
**Impact:** Welke files/schermen geraakt
```

---

## Beslissingen

## 2026-05-07 — Eén HTML-bestand voor productie
**Wat:** Productie-app blijft als één `www/index.html`, geen build-step, geen npm install.
**Waarom:** Snelle iteratie, geen tooling-overhead, ik (projectleider) kan zonder bundler-kennis werken. React via CDN is genoeg voor deze schaal.
**Alternatief:** Vite + npm setup. Afgewezen: te veel leercurve nu, voegt geen waarde toe vóór Play Store release.
**Impact:** Hele `www/` map. Heroverwegen bij Phase 5 (Capacitor).

## 2026-05-07 — Geen TypeScript
**Wat:** Project blijft in plain JavaScript met JSX via Babel-in-browser.
**Waarom:** TypeScript vereist build-step en typing-kennis die ik niet heb. Voor 1600 regels app is JS prima beheersbaar.
**Alternatief:** TS met `tsc --watch`. Afgewezen: kost weken leertijd, levert nu niets op.
**Impact:** Alle code blijft `.jsx` / inline JS.

## 2026-05-07 — IndexedDB als primaire opslag
**Wat:** Routines en sessies in IndexedDB, niet localStorage.
**Waarom:** localStorage heeft 5MB limiet en is synchroon (blokkeert UI). IndexedDB schaalt naar honderden sessies en is migreerbaar naar Capacitor SQLite later.
**Alternatief:** localStorage. Afgewezen: te beperkt voor stats-history op termijn.
**Impact:** `DB` module in `index.html`. Migratiepad naar Capacitor moet expliciet gepland in Phase 5.

## 2026-05-07 — Decision log + Testing checklist toegevoegd
**Wat:** `DECISIONS.md` en `TESTING.md` aangemaakt vóór Phase 1.1 begint.
**Waarom:** Zonder vangnet (Git + tests + waarom-log) wordt Phase 3 onbeheersbaar. Eén avond setup nu = uren bespaard later.
**Alternatief:** Gewoon beginnen met PWA-setup. Afgewezen: ik bouw dan op zand zonder rollback-mogelijkheid.
**Impact:** Werkwijze per wijziging vanaf nu.

## 2026-05-11 — Profile en Stats samenvoegd, HistoryScreen verwijderd
**Wat:** HistoryScreen bestaat niet meer als aparte tab. Sessie-overzicht (laatste 5) is geïntegreerd in ProfileScreen.
**Waarom:** Stats-tab had te weinig content om een eigen tab te rechtvaardigen. Gebruiker heeft context (wie ben ik + wat heb ik gedaan) beter op één plek. Vrijmaakt tab-slot voor Settings.
**Alternatief:** Stats als aparte tab uitbreiden (grafieken, heatmap). Afgewezen: te vroeg voor Phase 3.5, valt in Phase 4 roadmap.
**Impact:** BottomNav, App(), ProfileScreen, HistoryScreen (nog aanwezig in code als dode route, niet verwijderd voor veiligheid).

## 2026-05-11 — Settings als aparte tab (vervangt Stats-tab)
**Wat:** Nieuw SettingsScreen bereikbaar via bottom-nav tab (INST.), vervangt de STATS-tab.
**Waarom:** Instellingen waren verspreid over ProfileEditModal (notificaties, niveau) en TimerScreen (geluid). Vindbaarheid slecht. Eén centrale plek voor alles wat je maar één keer instelt.
**Alternatief:** Settings als modal via tandwiel-knop in Profile-header. Afgewezen: moeilijker te vinden, inconsistent met andere schermen.
**Impact:** SettingsScreen (nieuw), BottomNav, ProfileEditModal (level + notif verwijderd), TimerScreen (soundOn nu persistent in profile-store).

## 2026-05-11 — Home-scherm uitgebreid met engagement-content
**Wat:** HomeTab heeft nu: hero-card "Maak eigen routine", 3 vaste quick-workouts (15/30/45M), lichaamsdeel-rij, eigen routines.
**Waarom:** Origineel home-scherm had te weinig directe actie-opties. Doel: altijd iets te doen zien zonder te hoeven navigeren.
**Alternatief:** Alle content achter Routines-tab laten. Afgewezen: te veel clicks voor dagelijkse gebruiker.
**Impact:** HomeTab, QUICK_WORKOUTS constante (nieuw), RoutinesScreen (filterCat via nav-param).

---

## 2026-05-12 — Categorie-herindeling: Push+Pull→Armen, Cardio→Full Body
**Wat:** 5 categorieën teruggebracht naar 4. Push en Pull samengevoegd tot Armen, Cardio hernoemd naar Full Body.
**Waarom:** Push/Pull-onderscheid is technisch (bewegingsrichting), niet hoe een thuistrainer denkt. "Armen" is intuïtiever. "Full Body" is nauwkeuriger dan Cardio voor gemengde workouts met burpees en jumping jacks.
**Alternatief:** Categorieën laten staan. Afgewezen: gebruiker verwacht de taal van een fitness-app, niet van een kinesioloog.
**Impact:** CATS, CAT_COLORS, alle exercise-definities (cat-veld), PER SPIERGROEP sectie op Home.

## 2026-05-12 — PER SPIERGROEP sectie op Home + BODY_PART_WORKOUTS
**Wat:** LICHAAMSDEEL-rij vervangen door interactieve PER SPIERGROEP sectie met pill-filter en 3 vaste workouts per categorie (12 totaal). Sectie geëxtraheerd als eigen component `BodyPartSection`.
**Waarom:** Pure navigatie-knoppen naar RoutinesScreen hadden te weinig directe actiewaarde. Gebruiker wil altijd iets te doen zien op het homescherm zonder te hoeven navigeren.
**Alternatief:** Modale sheet per categorie. Afgewezen: te veel taps, pill-filter is direct en compact.
**Impact:** HomeTab, BodyPartSection (nieuw), BODY_PART_WORKOUTS constante (nieuw).

## 2026-05-12 — Coach-gepersonaliseerde 3 home-trainingen
**Wat:** De 3 hardcoded SNEL STARTEN-workouts (`QUICK_WORKOUTS`) vervangen door een coach-selector die op basis van het profiel (trainingGoal, level, weight/weightGoal, age) deterministisch 3 trainingen produceert. Seed = `(goal | level | dag-van-jaar)`: refresh op dezelfde dag = zelfde 3, volgende dag = nieuwe selectie. Age ≥ 55 filtert 6 high-impact oefeningen; weightDelta > 5kg in fatloss boost de Full-Body-share. Een coach-intro-regel boven de cards legt het profiel uit. Sectie hernoemd van SNEL STARTEN naar AANBEVOLEN.
**Waarom:** Onboarding vraagt 10 stappen aan persoonlijke data maar het home-scherm negeerde dat volledig. Generieke quick-starts voelen niet als een fitness-app maar als een sample-lijst. Een coach-selector hergebruikt bestaande data (geen extra UI-vragen) en levert direct merkbare personalisatie.
**Alternatief 1:** Random selectie elke render. Afgewezen: voelt verwarrend, "waar was die training die ik net zag?".
**Alternatief 2:** Selectie pas vernieuwen na voltooide sessie. Afgewezen: vereist nieuwe last-shown-state in profile-store; deterministische dag-seed is simpeler en geeft hetzelfde gevoel van "agenda".
**Alternatief 3:** ML-/regel-engine op alle profielvelden (gender, BMI, weight-history). Afgewezen: overengineering; trainingGoal + level + leeftijds-filter + weight-delta dekken 90% van het effect.
**Impact:** HomeScreen, HomeTab (nieuwe coachWorkouts/coachIntro props), nieuwe constanten (`COACH_TEMPLATES`, `HIGH_IMPACT_IDS`, `LEVEL_TIME_IDX`, `GOAL_LABEL`, `LEVEL_LABEL`), nieuwe helpers (`dayOfYear`, `hashStr`, `seededShuffle`, `buildCoachWorkouts`, `buildCoachIntro`). `QUICK_WORKOUTS` verwijderd. TimerScreen ongewijzigd (gebruikte al `params.routine` voor BUILTIN_PLANS).

## 2026-05-12 — Onboarding: `goal` en `trainingGoal` samenvoegen tot één canonical key
**Wat:** Onboarding-stap 7 vroeg eerst `goal` (fitness/core_strength/fat_loss) bij het doelgewicht. Stap 8 vroeg `trainingGoal` (core/fatloss/muscle). Twee overlappende vragen samengevoegd: stap 7 vraagt alleen nog doelgewicht; stap 8 heeft 4 tiles (AFVALLEN/SPIEROPBOUW/CORE/ALGEMENE FITHEID). `trainingGoal` is de canonical key; `goal` vervalt. Migratie via `migrateProfile()` in `getProfile()` mapt oude profielen: `fat_loss → fatloss`, `core_strength → core`, `fitness → fitness`. `selectDefaultPlan` leest `trainingGoal` met inline-fallback.
**Waarom:** Twee vragen die deels hetzelfde meten zijn verwarrend voor de gebruiker (kies ik fat_loss bij doelgewicht én fatloss bij trainingsdoel?) en voor de code (`selectDefaultPlan` gebruikte `goal`, `resolveStarterPlanProfile` `trainingGoal` — twee paden voor één concept). Bovendien sluit `trainingGoal` taalkundig beter aan op fysieke training.
**Alternatief:** DB_VERSION bump met store-migratie. Afgewezen: JS-laag migratie via `migrateProfile()` bij elke read is voldoende, geen schema-breaking change, makkelijker terug te draaien.
**Impact:** OnboardingScreen (stap 7 + 8), `getProfile` (migratie-aanroep), `saveProfile` FIELDS (`goal` weg), `selectDefaultPlan` (leest trainingGoal), `finish()` (geen goal meer opgeslagen).

<!-- Volgende entries komen hieronder. Nieuwste bovenaan onder deze comment, of chronologisch onderaan — kies één en houd vol. -->
