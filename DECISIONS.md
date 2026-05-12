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
**Wat:** LICHAAMSDEEL-rij vervangen door interactieve PER SPIERGROEP sectie met pill-filter en 3 vaste workouts per categorie (12 totaal).
**Waarom:** Pure navigatie-knoppen naar RoutinesScreen hadden te weinig directe actiewaarde. Gebruiker wil altijd iets te doen zien op het homescherm zonder te hoeven navigeren.
**Alternatief:** Modale sheet per categorie. Afgewezen: te veel taps, pill-filter is direct en compact.
**Impact:** HomeTab, BodyPartSection (nieuw), BODY_PART_WORKOUTS constante (nieuw).

<!-- Volgende entries komen hieronder. Nieuwste bovenaan onder deze comment, of chronologisch onderaan — kies één en houd vol. -->
