# TRAINR — Roadmap

> Standalone HTML fitness-timer app. Geen server, geen account, geen gedoe.

---

## Milestones

### v1.1 – PWA & Fundament
*Doel: installeerbaar als echte app op Android, offline bruikbaar*

- [ ] `manifest.json` aanmaken
- [ ] Service worker implementeren (cache-first, offline)
- [ ] App iconen genereren (192px + 512px)
- [ ] Installatie-prompt tonen op Home
- [ ] Bug: streak bij nachttraining na middernacht

---

### v1.2 – Builder uitbreiden
*Doel: meer controle over wat en hoe lang je traint*

- [ ] Aangepaste tijden per oefening in de builder
- [ ] Oefeningen herordenen via drag-and-drop
- [ ] Oefening dupliceren (circuit-stijl)
- [ ] Bibliotheek uitbreiden met 20+ oefeningen
- [ ] Zoekfunctie in oefening-picker

---

### v1.3 – Statistieken & Progressie
*Doel: zichtbaar maken dat je vooruitgaat*

- [ ] Progressie per oefening (PR's)
- [ ] 8-weken sessiegrafiek (pure SVG)
- [ ] Totale trainingstijd per routine
- [ ] Persoonlijke records scherm
- [ ] Rustpauze instelbaar per routine
- [ ] Haptic feedback (vibrate API)

---

### v2.0 – Programma's & Planning
*Doel: richting geven aan de training met meerweekse schema's*

- [ ] Datamodel programma's (IndexedDB migratie)
- [ ] 4-weken schema builder
- [ ] Actief programma op Home-scherm
- [ ] Voortgang programma bijhouden
- [ ] Export naar JSON
- [ ] Import van JSON
- [ ] Refactor: DB-laag voorbereiden op fetch()-backend

---

## Design principes

- Altijd één HTML-bestand
- Opslag via geïsoleerde DB-laag (nu IndexedDB, later swappable)
- Monospace dark UI, oranje accent `#ff4d00`
- Mobiel first — geen toeters en bellen
- Minimale wrijving vóór de workout, maximale duidelijkheid tijdens

---

## Tech stack

| Onderdeel | Keuze |
|---|---|
| Framework | React 18 via CDN |
| Transpiler | Babel standalone |
| Opslag | IndexedDB (via wrapper) |
| Styling | Inline JS objects |
| Bundler | Geen — single HTML file |
