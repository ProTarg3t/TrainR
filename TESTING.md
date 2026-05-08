# TESTING.md — TrainR

Handmatige test-checklist. Geen automated tests — die zijn overkill voor een single-file app.
Doel: na elke wijziging in 5 minuten weten of je iets gesloopt hebt.

## Wanneer doorlopen

- **Volledig (smoke-test, ~5 min):** vóór elke `git commit` op `main` branch
- **Verkort (alleen geraakt scherm):** tijdens ontwikkeling, na elke Claude Code wijziging
- **Volledig + offline-test:** vóór elke Phase-afronding (zie roadmap)

## Hoe testen

Test op **Android telefoon via lokale serve** (`npx serve www`, dan via wifi naar `http://[laptop-ip]:3000`).
Niet alleen op desktop — bugs zitten vaak in touch/viewport gedrag.
Open DevTools console via Chrome remote debugging (`chrome://inspect`).

---

## Smoke-test checklist (volledig)

### Opstarten
- [ ] App opent zonder errors in console
- [ ] Geen rode errors, geel/oranje warnings mogen
- [ ] Home scherm laadt binnen 2 seconden
- [ ] Streak en weekoverzicht tonen geen `undefined` of `NaN`
- [ ] Sessietellers kloppen (vergelijk met vorige sessie)

### Routines beheren
- [ ] Routines lijst toont alle aangemaakte routines
- [ ] Filter (Alle/Core/Push/Legs/Pull/Cardio) werkt
- [ ] Nieuwe routine aanmaken: 3 stappen doorlopen, opslaan lukt
- [ ] Bestaande routine: openen, oefeningen zichtbaar
- [ ] Routine verwijderen: bevestigingsprompt + verdwijnt uit lijst
- [ ] Na refresh: routines nog steeds aanwezig (DB werkt)

### Workout uitvoeren
- [ ] Routine starten op Beginner: timer telt af
- [ ] Beep-geluid hoorbaar bij start/eind oefening
- [ ] Skip-knop slaat oefening over
- [ ] Pauze-knop pauzeert timer (niet stiekem doortikken)
- [ ] Midpoint break verschijnt halverwege
- [ ] Wake lock actief: scherm blijft aan tijdens timer
- [ ] Workout afronden → finish-scherm verschijnt
- [ ] RPE slider werkt en slaat op
- [ ] Sessie verschijnt in geschiedenis na afronding

### Niveaus
- [ ] Beginner-Intermediate-Expert: tijden per oefening verschillen zichtbaar
- [ ] Geselecteerd niveau blijft staan tussen sessies (of wordt expliciet gereset)

### Data-integriteit
- [ ] Browser refresh midden in workout: state weg is OK, maar geen crash
- [ ] DB clear (DevTools → Application → IndexedDB) en reload: app start fris zonder errors

### Visueel
- [ ] OLED-zwart achtergrond consistent
- [ ] Gele accent (#E8FE3C) op CTA's
- [ ] Tekst leesbaar op 360px viewport (smalle Android)
- [ ] Buttons minimaal 48px tap-target
- [ ] Geen horizontaal scrollen waar het niet hoort

---

## Verkorte test (alleen geraakt scherm)

Per Phase / per feature: schrijf hieronder welke 3-5 stappen relevant zijn.

### Builder (na wijziging routine-aanmaak)
- [ ] Stap 1 (naam + categorie) accepteert input
- [ ] Stap 2 (oefening kiezen) toont volledige bibliotheek
- [ ] Stap 3 (volgorde) drag of buttons werken
- [ ] Opslaan → routine verschijnt in lijst
- [ ] Annuleren → terug naar lijst zonder save

### Timer (na wijziging actieve workout)
- [ ] Eerste oefening start automatisch
- [ ] Progress ring vult juist
- [ ] Beep bij laatste 3 seconden
- [ ] Rest-segment heeft andere kleur dan werk
- [ ] Laatste oefening → finish scherm

### Stats (na wijziging history/streak)
- [ ] Streak telt correct (test: vandaag + gisteren = 2)
- [ ] Weekoverzicht toont juiste dagen
- [ ] Geen `undefined` waardes
- [ ] Lege staat (geen sessies) crasht niet

---

## Offline-test (per Phase-afronding)

1. App openen, één routine starten
2. Wifi/data uit zetten op telefoon
3. Workout afronden — moet gewoon werken
4. Sessie opslaan — moet in DB komen
5. App afsluiten + heropenen offline — sessie zichtbaar in history
6. Wifi weer aan — geen sync nodig (alles is lokaal)

---

## Bug rapporteren

Als je tijdens testen iets vindt: niet gelijk fixen, eerst noteren.

Maak een file `docs/bugs/BUG-YYYYMMDD-korte-titel.md`:

```
## Bug: [korte titel]
**Scherm:** Home / Routines / Builder / Timer / Finish / Detail
**Stappen om te reproduceren:**
1. ...
2. ...
**Verwacht:** ...
**Werkelijk:** ...
**Console errors:** [plak hier of "geen"]
**Screenshot:** [pad naar screenshot in docs/screenshots/]
**Severity:** crash / data-loss / UI-broken / nice-to-have
```

Daarna pas in chat (Opus) of Claude Code laten oplossen.

---

## Checklist vóór Phase-afronding

Naast smoke-test ook:
- [ ] Alle bugs in `docs/bugs/` opgelost of expliciet uitgesteld
- [ ] DECISIONS.md bijgewerkt met deze phase's keuzes
- [ ] Git: alle changes gecommit, branch gemerged naar `main`
- [ ] Backup IndexedDB-data via export-knop in app
- [ ] GO/NO-GO uit roadmap voor deze phase: alle items ✓?

---

## Regressiescenario's — Stats/Home logica

Gebruik deze mini-scenario's na elke wijziging in `calcStreak`, `HomeTab`, of de HistoryScreen.

### Scenario A — Lege staat (geen sessies)

**Voorbereiding:** Wis IndexedDB via DevTools → Application → IndexedDB → delete database → reload.

Verwacht:
- Streak toont `0d`, niet `00d` of leeg
- Stats-scherm toont `0` sessies, `0d` streak, `0m` totaal
- Geen `undefined` of `NaN` zichtbaar op enig scherm
- App crasht niet

### Scenario B — Streak op opeenvolgende dagen

**Voorbereiding:** Maak via DevTools console drie nep-sessies aan:

```js
// open console op de app-pagina
const db = await new Promise(r => { const req = indexedDB.open('trainr'); req.onsuccess = e => r(e.target.result); });
const tx = db.transaction('sessions', 'readwrite');
const store = tx.objectStore('sessions');
const now = Date.now();
const day = 86400000;
store.add({ id: 'test-1', routineName: 'Test', levelIdx: 0, duration: 600, exercises: [], completedAt: now - 2 * day });
store.add({ id: 'test-2', routineName: 'Test', levelIdx: 0, duration: 600, exercises: [], completedAt: now - 1 * day });
store.add({ id: 'test-3', routineName: 'Test', levelIdx: 0, duration: 600, exercises: [], completedAt: now });
```

Refresh app. Verwacht:
- Streak toont `3d`
- Stats-scherm toont `3` sessies
- History toont alle 3 sessies in aflopende volgorde

### Scenario C — Streak gebroken (gisteren overgeslagen)

Gebruik zelfde methode als B maar voeg alleen `now - 2 * day` en `now` toe (niet gisteren).

Verwacht:
- Streak toont `1d` (alleen vandaag telt)

---

## Bekende issues (actief)

<!-- Korte lijst van bugs die je kent maar nog niet hebt opgelost. Houd kort. -->

<!-- Vink af wanneer opgelost en verplaats naar git history. -->
