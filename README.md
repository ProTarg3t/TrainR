# TrainR

Thuistrainings-app zonder materiaal. Bouw je eigen routines, train met een timer en volg je voortgang.

## Wat doet de app

- **Routines** aanmaken met oefeningen uit 5 categorieën: Core, Push, Legs, Pull, Cardio
- **Timer** met automatische rust-pauzes en geluidssignalen
- **3 niveaus**: Beginner / Intermediate / Expert (bepaalt de duur per oefening)
- **Spiervisualisatie** per oefening en per routine
- **Streak en geschiedenis** bijhouden
- Werkt offline (PWA / Progressive Web App)
- Data wordt lokaal opgeslagen via IndexedDB (blijft op het apparaat)

## Hoe starten

Open `www/index.html` in een browser. Geen installatie nodig.

Voor de volledige PWA-ervaring (installeerbaar, offline):
- Serveer de `www/` map via een lokale webserver, bijv.:
  ```
  npx serve www
  ```
- Of gebruik een live server extensie in VS Code.

## Projectstructuur

```
www/
  index.html      — de volledige app (HTML + React + CSS in één bestand)
  manifest.json   — PWA-configuratie
  sw.js           — service worker voor offline gebruik
  icon-192.png    — app-icoon
  icon-512.png    — app-icoon (groot)
```

## Technische keuzes

- Eén HTML-bestand zonder build-stap — laagste instapdrempel
- React 18 via CDN (geen npm vereist)
- IndexedDB voor opslag — data blijft ook offline beschikbaar
- Geen externe API's of accounts

## Toekomstige plannen

- [ ] Oefeningen bewerkbaar maken in de app
- [ ] Code opsplitsen in losse bestanden
- [ ] Verpakken als native app via Capacitor
- [ ] Meer standaard-routines per categorie
