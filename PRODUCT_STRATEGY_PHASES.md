# TRainR Product Strategy & Fases (v1)

> Bron: initiële fase-opzet en uitwerking vanuit brainstorm (mei 2026).
> Doel: één vaste plek in de repository voor productvisie, faseplanning en KPI-outcomes.

## 1) Scherpe productvisie (1-pager)

### Primaire doelgroep (ICP)
- Beginnende tot semi-ervaren sporters die moeite hebben met trainingsconsistentie.

### Kernprobleem
- Gebruikers weten niet altijd wat ze moeten doen, verliezen motivatie en zien progressie onvoldoende duidelijk.

### Unieke belofte
- TRainR maakt trainen simpel, persoonlijk en meetbaar, zodat gebruikers consequent vooruitgang boeken met minimale frictie.

### Productfilter voor roadmap-keuzes
- Alles dat niet direct bijdraagt aan activatie, retentie of consistente progressie komt niet op de korte-termijn roadmap.

---

## 2) Fase-indeling (nu → groei → schaal)

### Fase 1 — Fundament (0–3 maanden)
**Doel:** core value laten werken zonder frictie.

**Scope (must-have):**
- Snelle onboarding + doelstelling kiezen.
- Trainingsplan aanmaken/volgen.
- Progressie logging (gewicht, reps, duur, etc.).
- Basis notificaties/reminders.
- Simpel dashboard met voortgang.

**Outcome targets (voorbeeld):**
- Activatie (eerste training binnen 24 uur): 35–45%.
- Onboarding completion: 70%+.
- Week-1 consistentie (>=2 trainingen in 7 dagen): 25–30%.
- Logging completeness: 80%+.
- D7 retentie: 25%+.

**Niet doen in fase 1:**
- Zware social/challenge-systemen.
- Diepe AI-coaching.
- Complexe personalisatie.
- Grote integratie-scope.

### Fase 2 — Engagement & Retentie (3–6 maanden)
**Doel:** gebruikers structureel laten terugkomen.

**Scope (must-have):**
- Streaks, badges, weekdoelen.
- Persoonlijke aanbevelingen (plan aanpassen op gedrag).
- Eerste integraties (Apple Health / Google Fit / wearables, gefaseerd).
- Betere analytics voor gebruikers (waarom progressie stijgt/daalt).

**Outcome targets (voorbeeld):**
- D30 retentie: 18% → 28%.
- Trainingen per actieve gebruiker per week: +20–30% vs einde fase 1.
- Plan adherence: 60%+.
- Re-activatie binnen 7 dagen na inactiviteit: stijgende trend.

### Fase 3 — Monetisatie & Schaal (6–12 maanden)
**Doel:** duurzaam groeien.

**Scope (richting):**
- Premium features (advanced plans, coach feedback, diepere inzichten).
- Team/challenge functies.
- Coach/creator tools.
- Pricing- en paywall-experimenten.

**Voorwaarde om fase 3 te starten:**
- Fase-1/2 retentie- en consistentie-KPI’s stabiel op target of duidelijke stijgende trend.

---

## 3) Outcome-based roadmap (niet feature-based)

Per kwartaal 3–5 outcomes met baseline + target, bijvoorbeeld:
- Activatie: % gebruikers dat binnen 24 uur eerste training doet.
- Retentie: D7 / D30.
- Consistentie: trainingen per actieve gebruiker per week.
- Conversie: free → paid.
- Churn: opzegpercentage premium.

**Regel:** prioriteren op meetbaar effect, niet op aantal opgeleverde features.

---

## 4) Vast ritme

- Elke 2 weken: sprint met kleine, meetbare releases.
- Maandelijks: roadmap review op data + user feedback.
- Per kwartaal: herprioriteren op impact vs effort (RICE/ICE).

---

## 5) Werkafspraken voor GitHub (single source of truth)

Om dit eenvoudig terug te halen zonder losse mappen:

1. Dit document blijft in de repo-root als `PRODUCT_STRATEGY_PHASES.md`.
2. Updates altijd via PR met korte changelog onderaan.
3. ROADMAP verwijst naar dit bestand voor strategische context.
4. Gebruik vaste update-sectie met datum.

### Update log
- 2026-05-08: Eerste vastlegging van visie + fase 1/2/3 + outcome-kaders.
- 2026-05-08: KPI-formules geconcretiseerd voor lokale event-analytics:
  - Activatie24u = users met `workout_completed` binnen 24u na `onboarding_completed` / users met `onboarding_completed`.
  - D7 Retentie = users met activiteit op dag 7 / cohort dag 0.
  - Workouts per actieve user per week = aantal `workout_completed` in laatste 7 dagen / actieve users in laatste 7 dagen.
