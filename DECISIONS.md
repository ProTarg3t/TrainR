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

---

<!-- Volgende entries komen hieronder. Nieuwste bovenaan onder deze comment, of chronologisch onderaan — kies één en houd vol. -->
