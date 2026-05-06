# TrainR Roadmap: v1 → Google Play Store Release

**Startpunt**: `trainapp.html` (werkende v1)  
**Eindpunt**: Google Play Store release  
**Horizon**: 3-4 maanden iteratief werken

---

## Phase 0: Current State (Week 0)

**Huidige werkende features:**
- Home, Routines, Builder, Timer, Historie schermen
- 32 oefeningen in bibliotheek (Core, Push, Pull, Legs)
- Routines zelf samenstellen
- Timer met levels (Beginner/Intermediate/Expert)
- Trainingsgeschiedenis + streak in localStorage
- DB module (geïsoleerd, lokaal opslag)

**Huidige tekortkomingen:**
- Geen PWA (manifest/serviceworker)
- Geen offline werking
- Niet installeerbaar
- Design prototype != productie (kleurzaken)
- Oefeningen niet editabel
- Beperkte statistieken
- Geen permission-handling (wakelok, notification)

---

## Phase 1: Stabilisatie & PWA (Week 1–2)

### 1.1 PWA Setup
- **Wat**: `manifest.json` + `sw.js` toevoegen
- **Hoe**: 
  - Manifest: app name, icons (192px + 512px), theme-color, display: standalone
  - SW: cache-first strategy, offline fallback
  - Add to home screen testen op Android
- **Doel**: App installeerbaar, offline bruikbaar
- **Output**: `trainapp.html` + `manifest.json` + `sw.js`

### 1.2 Browser Permissions
- **Wat**: Wake lock (scherm blijft aan), notification rechten
- **Hoe**:
  - `navigator.wakeLock.request('screen')` bij timer start
  - Permission prompt bij app-first-open
  - Graceful fallback als niet beschikbaar
- **Doel**: Scherm blijft aan, meldingen werken
- **Output**: Timer componenten updated

### 1.3 Local Testing & Deployment
- **Wat**: Lokale serve testen, basis hosting checken
- **Hoe**:
  - `npx serve` voor lokale test
  - Android Chrome: devtools remote debug
  - Checklist: install, offline test, back button, data persist
- **Doel**: Stabiel, geen bugs
- **Output**: Testplan + buglog

**GO/NO-GO:** Alle 3 items werkend?  
✓ GO → Phase 2  
✗ NO-GO → Debug, retry 1.1–1.3

---

## Phase 2: Design Integration & Polish (Week 3–4)

### 2.1 Kleurenschema naar Productie
- **Wat**: Design tokens uit `Design/tokens.css` toepassen
- **Hoe**:
  - CSS variabelen definieren in productie-HTML
  - Background: `#000000` (OLED), Accent: `#E8FE3C` (geel)
  - Typography: Inter (body), Geist Mono (labels)
  - Alle schermen refactor naar CSS variables
- **Doel**: Eindhuis = designprototype visueel
- **Output**: `trainapp.html` met nieuwe kleurenset
- **Opmerking**: *Dit is een facelift, geen functionaliteit*

### 2.2 Typography & Spacing Audit
- **Wat**: Font sizes, line heights, padding consistent maken
- **Hoe**:
  - Audit alle schermen op spacing
  - Monospace data-labels (Geist Mono waar passend)
  - Grote headings, duidelijke CTA's
- **Doel**: Schoon, herkenbaar design
- **Output**: Updated component library (inline)

### 2.3 Icons & Visual Consistency
- **Wat**: Inline SVG icons reviewed, passende icons toevoegen
- **Hoe**:
  - Play/pause/skip/edit/trash icons
  - Iconen aligned op 24px grid
  - Hover/active states duidelijk
- **Doel**: UI voelt complete
- **Output**: Icon set (inline SVG)

**GO/NO-GO:** Ziet het er professioneel uit op Android?  
✓ GO → Phase 3  
✗ NO-GO → Design fixes, retry 2.1–2.3

---

## Phase 3: Feature Expansion (Week 5–7)

### 3.1 Oefeningen Editabel (Priority HIGH)
- **Wat**: Gebruiker kan oefeningen in routines aanpassen (tijd, reps, notes)
- **Hoe**:
  - Builder stap 3 uitbreiden: "Bewerk oefening" optie
  - Per oefening: duur (beginner/intermediate/expert), notities, instructies
  - Data opslaan in routine-object
  - UI: slide-in panel met edit-form
- **Doel**: Gebruiker voelt controle, kan routines personaliseren
- **Output**: Builder screen v2, updated DB schema
- **Effort**: 2 dagen (form states, validation)

### 3.2 Bibliotheek Uitbreiden
- **Wat**: Minimaal 50 oefeningen (nu 32)
- **Hoe**:
  - Systematisch per categorie: Core +5, Push +4, Legs +4, Pull +3, Cardio +2
  - Elk met: instructie, spiergroep-mapping, standaard-duraties
  - Format: JSON array in code
- **Doel**: Variatie, geen verveling
- **Output**: Uitgebreide `exerciseLibrary` array
- **Effort**: 1–2 dagen (copy-paste, testen)

### 3.3 Statistieken Layer (Priority MEDIUM)
- **Wat**: Per oefening, per routine, per week tracking
- **Hoe**:
  - Session-data uitbreiden: oefening-detail (sets/reps/completed)
  - Stats-scherm: Vorige week, totaal tonnage, meest uitgeoefende groepen
  - Body heatmap in stats (welke spiergroepen vorige week meest)
  - Grafiekjes: streak, sessies/week, voorkeur oefeningen
- **Doel**: Insight in voortgang, motivatie
- **Output**: Stats screen, uitgebreid session-schema
- **Effort**: 3 dagen (data aggregatie, charts)

### 3.4 Exercise Detail Screen
- **Wat**: Klik oefening → detail pagina met instructies, video-tip, spieren
- **Hoe**:
  - Per oefening: tekst-instructie, URL naar (YouTube? externe link?)
  - Spiergroepen visueel, mogelijk video-embed
  - Terug-button
- **Doel**: Gebruiker weet hoe te trainen, veiligheid
- **Output**: New screen + oefening-database extended
- **Effort**: 1 dag (UI + linking)

**GO/NO-GO:** Voelen de routines aanpasbaar en variatief?  
✓ GO → Phase 4  
✗ NO-GO → Feature snoeien of meer tijd, retry

---

## Phase 4: Refinement & User Testing (Week 8–9)

### 4.1 User Testing (Praktisch)
- **Wie**: Jezelf + eventueel vrienden/familie (niet-devs)
- **Hoe**:
  - Observeren: routines aanmaken, trainen, stats kijken
  - Feedback: UI duidelijk? Irritaties? Bugs?
  - Notities: verbeterproducten
- **Doel**: Echte feedback voordat naar Play Store
- **Output**: Buglist + improvement backlog
- **Effort**: 1–2 uur per persoon

### 4.2 Bug Triage & Fixes
- **Wat**: Alle bugs uit testing repareren
- **Hoe**:
  - Severity: Crash > data loss > UI > nice-to-have
  - Per bug: reproduce, debug, test, close
  - Performance audit (slow timer? memory leak?)
- **Doel**: Stabiel product
- **Output**: Clean codebase
- **Effort**: 2–3 dagen (afhankelijk van bugcount)

### 4.3 Offline Workflow Test
- **Wat**: Alles offline testen (geen internet)
- **Hoe**:
  - Routine aanmaken offline ✓
  - Trainen offline ✓
  - Data sync als internet terug (check: alle sessions terug in history?)
  - Service worker geeft offline.html of caching?
- **Doel**: App echt offline-first
- **Output**: SW-logica gevalideerd
- **Effort**: 1 dag

### 4.4 Dark Mode / Accessibility
- **Wat**: Dark mode (al standaard), extra accessibility check
- **Hoe**:
  - Color contrast check (WCAG AA minimum)
  - Font sizes lesbaar op kleine schermen?
  - Buttons groot genoeg (48px min)?
  - Toetsenbord navigation werkend?
- **Doel**: Breder publiek kan gebruiken
- **Output**: Updated CSS + beschrijving
- **Effort**: 1 dag

**GO/NO-GO:** Product feels stable & ready for wider testing?  
✓ GO → Phase 5  
✗ NO-GO → Fixes, retry 4.1–4.4

---

## Phase 5: Play Store Prep (Week 10–11)

### 5.1 Native App Build via Capacitor
- **Wat**: PWA → Android APK/AAB voor Play Store
- **Hoe**:
  - Capacitor installeren + init project
  - `trainapp.html` als web asset
  - Capacitor plugins: LocalNotifications, WakeLock, etc.
  - Build: `capacitor build android`
  - Output: `.apk` (testing) + `.aab` (Play Store)
- **Doel**: Echte app, niet PWA in browser
- **Output**: Android project, signed APK/AAB
- **Effort**: 2–3 dagen (Capacitor learning curve)

### 5.2 App Icon & Splash Screen
- **Wat**: Professionele iconen, splash screen
- **Hoe**:
  - Icon: 512px PNG, ronde/vierkante variant
  - Splash: traini-logo + laadscherm
  - Generate via Android Studio assets generator
- **Doel**: App ziet er native uit
- **Output**: Icon-bestanden, splash screen
- **Effort**: 1 dag (design + tooling)

### 5.3 Metadata & Privacy Policy
- **Wat**: Play Store listing content + privacy policy
- **Hoe**:
  - App description (Nederlands + Engels)
  - Screenshot gallery (5–6 beelden)
  - Privacy policy schrijven (data = lokaal, geen tracking)
  - Terms of service (optioneel, maar schoon)
- **Doel**: Compliant, professioneel
- **Output**: Markdown files, screenshots
- **Effort**: 1–2 dagen

### 5.4 Version Bump & Release Notes
- **Wat**: Versionering (1.0.0) + release notes
- **Hoe**:
  - Semantic versioning: `manifest.json` + `build.gradle` (Capacitor)
  - Changelog: wat is nieuw, bug fixes
  - Git tag: `v1.0.0`
- **Doel**: Tracking, future updates
- **Output**: Tagged release
- **Effort**: 0.5 dag

**GO/NO-GO:** APK bouwt, installeert, runt op Android device?  
✓ GO → Phase 6  
✗ NO-GO → Capacitor debug, troubleshoot 5.1

---

## Phase 6: Play Store Submission (Week 12–13)

### 6.1 Developer Account & Registration
- **Wat**: Google Play Developer account setup
- **Hoe**:
  - Google account (werk of privé?)
  - $25 eenmalig registratiefee
  - Tax info (eenvoudig, geen kosten)
  - Bank account koppelen (voor toekomstige monetisering)
- **Doel**: Toegang tot Play Console
- **Output**: Developer account
- **Effort**: 1 uur
- **Note**: *Vraag jezelf af: wil je dit achter je eigen naam, of los bedrijfje?*

### 6.2 Google Play Console Setup
- **Wat**: App-pagina aanmaken, metadata invoeren
- **Hoe**:
  - Create app (Nederlands, Engels)
  - Upload icon, screenshots
  - Vul description, category, rating (PEGI)
  - Copy privacy policy
  - Set price (gratis)
- **Doel**: Volledige app listing
- **Output**: Draft app in console
- **Effort**: 2–3 uur

### 6.3 Internal Testing Track
- **Wat**: Eerst intern testen (closed testing)
- **Hoe**:
  - Upload signed AAB naar interno internal testing track
  - Email testers (jezelf + vrienden)
  - Feedback: crashes? Performance?
  - Wacht op results (24–48 uur)
- **Doel**: Catch issues voor public
- **Output**: Tested, approved AAB
- **Effort**: 3–5 dagen wacht + 1 dag fixes
- **GO/NO-GO here**: Alles werkt op testdevices?  
  ✓ GO → 6.4  
  ✗ NO-GO → Fix, reupload, retry

### 6.4 Beta Testing Track (Optional)
- **Wat**: Breder publiek (optioneel)
- **Hoe**:
  - Promote internal → beta track
  - Open te enkele honderden testers (verwachting)
  - Wacht 1 week feedback
- **Doel**: Grotere test pool, meer feedback
- **Output**: Feedback consolidated
- **Effort**: 1 week wacht + 2 dagen fixes
- **Note**: *Kan skipped als je confidenthebt uit 6.3*

### 6.5 Production Release
- **Wat**: Live op Play Store
- **Hoe**:
  - Promote beta → production
  - Review start (Google: 24–72 uur)
  - Wacht op approval
  - Rollout optioneel (% users, staged)
  - Monitor: crashes, ratings
- **Doel**: Live!
- **Output**: App in Play Store
- **Effort**: 2–5 dagen Google review
- **GO/NO-GO**: App approved en live?  
  ✓ GO → Phase 7  
  ✗ NO-GO → Address rejection reason, resubmit

---

## Phase 7: Post-Launch (Week 14+)

### 7.1 Monitoring & Feedback
- **Wat**: Kijk naar crashes, ratings, reviews
- **Hoe**:
  - Play Console: crashes, ANRs (app not responding), crashes
  - App reviews lezen (ratings 1–2 stars → repareren?)
  - Build hotfix als crashes > 5%
- **Doel**: Stabil blijven
- **Output**: Hotfix releases als nodig
- **Cadence**: Wekelijks checken eerste maand, daarna maandelijks

### 7.2 Feature Requests & Roadmap v1.1
- **Wat**: Plan volgende versie
- **Hoe**:
  - Verzamel feedback (reviews, persoonlijke tests)
  - Prioritise: wat willen users? (stats? routines share? warmup-cooldown?)
  - Mogelijkheden voor toekomst:
    - Import/export routines
    - Wearable sync (Garmin?)
    - Cloud sync (optioneel, betaald?)
    - Video instructies per oefening
    - Trainingsschema's voorgesteld (AI-coach?)
- **Doel**: Groeiplan
- **Output**: Backlog voor v1.1

### 7.3 Monetization (Future, Optional)
- **Wat**: Revenue model overwegen
- **Hoe**:
  - Vrijblijvend: gratis voor altijd
  - Donatie model (in-app)
  - Premium features (geavanceerde stats, coach AI)
  - Subscription (niet aangeraden voor fitness apps, veel weerstand)
- **Doel**: Verdienmodel als gewenst
- **Output**: Decisie (nou nog nicht nodig, later overwegen)

---

## Key Decision Points (GO/NO-GO Moments)

| Moment | Vraag | Go → | No-Go → |
|--------|-------|------|---------|
| **1.3** | Stabiel werkend, offline, testable? | Phase 2 | Debug Phase 1 |
| **2.3** | Ziet design er professioneel uit? | Phase 3 | Design fixes |
| **4.4** | Geen ernstige bugs, feedback verwerkt? | Phase 5 | Bug fixes (4 herhalen) |
| **5.4** | APK bouwt en runt? | Phase 6 | Capacitor fixes |
| **6.3** | Intern testing geen crashes? | 6.4/6.5 | Fix bugs, retry |
| **6.5** | Google approval binnen 72h? | Phase 7 | Rejection adresseren, resubmit |

---

## Timeframe Samenvatting

- **Phase 0–1**: Week 1–2 (stabilisatie, PWA)
- **Phase 2**: Week 3–4 (design, polish)
- **Phase 3**: Week 5–7 (features)
- **Phase 4**: Week 8–9 (testing, bugs)
- **Phase 5**: Week 10–11 (native build)
- **Phase 6**: Week 12–13 (Play Store)
- **Phase 7**: Week 14+ (live, iterate)

**Total: 12–14 weken (3 maanden) realistisch, kan sneller met parallelle werk.**

---

## Tools & Resources Checklist

- [ ] Node.js + npm (lokale serve, Capacitor)
- [ ] Android Studio (signing key, emulator)
- [ ] VS Code + mobile debugging extensions
- [ ] Capacitor docs (capacitor.ionicframework.com)
- [ ] Play Console account (play.google.com/console)
- [ ] Git repo (lokaal of GitHub, voor versioning)
- [ ] Design tools (Figma, Photoshop, of eenvoudig online voor icons)
- [ ] Privacy policy template (boilerplate GDPR-compliant)

---

## Execution Tips

1. **Itereer per phase**: Finish 1, review, then 2. Niet alles tegelijk.
2. **Daily standup**: Elke dag 15 min notities wat gedaan, wat volgt.
3. **Test op echt device**: Niet alleen emulator; Android telefoon erbij.
4. **Feedback loop**: Na elke phase, eigenlijk meteen testen.
5. **Git commits**: Klein, frequent; easy rollback.
6. **Slack/Discord**: Hulp zoeken als stuck; community is groot.

---

## Success Criteria (Final Checklist)

- [ ] App installeerbaar via Play Store
- [ ] Offline werkend (geen internet nodig)
- [ ] Routines aanmaken, aanpassen, trainen
- [ ] Timer soepel, geen crashes
- [ ] Statistieken zichtbaar (streak, history, stats)
- [ ] Design polished (donker, accent-kleur consistent)
- [ ] 50+ oefeningen beschikbaar
- [ ] Privacy policy + disclaimer in app
- [ ] Rating ≥ 4.0 stars (ambitie)
- [ ] Geen critical bugs (Play Store stable)

---

**Klaar om te starten? Begin met Phase 1.1 (PWA setup) volgende week.**
