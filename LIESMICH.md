# agroXX techniCCenter – Website

Statische Seite ohne Cookies, Tracking oder externe Schriften. Die Inhalte stehen als JSON-Dateien im Ordner `daten/` und werden von Thomas über ein Formular ([Pages CMS](https://app.pagescms.org), siehe **[PFLEGE.md](PFLEGE.md)**) gepflegt. Bei jeder Änderung baut GitHub die Seite automatisch neu und veröffentlicht sie.

Live: https://finnru007.github.io/agroxx-website/

## So hängt alles zusammen

| Ordner / Datei | Inhalt |
|---|---|
| `daten/maschinen/*.json` | Eine Datei pro Maschine (Bezeichnung, Kategorie, Status, Preis, Eckdaten, Fotos, Startseite-Haken) |
| `daten/firma.json` | Telefon, E-Mail, Öffnungszeiten, Impressum-Angaben, Über-uns-Text und -Foto, Schalter **Entwurf/Live** |
| `daten/grubber.json` | Preisliste Sonderausrüstung |
| `bilder/original/` | Alle Fotos in Originalgröße (Upload über das Formular) |
| `.pages.yml` | Aufbau des Formulars in Pages CMS |
| `.github/workflows/seite.yml` | Baut bei jedem Commit auf `main` die Seite und veröffentlicht sie auf GitHub Pages |
| `_quelle/` | Der Seitengenerator: `daten.mjs` (liest die JSON-Dateien), `build.mjs` (Seitentexte und -layout), `bilder.mjs` (verkleinert die Fotos), `serve.mjs` (Vorschau) |
| `css/`, `js/` | Gestaltung und Lightbox/Menü |
| `dist/` | Fertige Seite (wird erzeugt, nicht im Repository) |

Ablauf: Speichern im Formular → Commit auf `main` → GitHub Action: `npm ci`, `npm run build` (Seiten erzeugen, Fotos auf 640 px und 1600 px verkleinern, GPS-/EXIF-Daten entfernen) → Veröffentlichung. Dauer ca. 1–2 Minuten. Schlägt der Bau fehl (z. B. Live ohne E-Mail), bleibt die alte Seite online, und GitHub schickt dem Repository-Besitzer eine E-Mail.

## Lokal arbeiten (Node.js ≥ 22)

    npm ci
    npm run build        # erzeugt dist/
    npm start            # Vorschau auf http://localhost:8123

Texte und Aufbau der Seiten: `_quelle/build.mjs`. Farben und Schrift: oben in `css/style.css` (`:root`). Die Kategorien (Reihenfolge, Texte) stehen in `_quelle/daten.mjs`; die Namen müssen zur Auswahlliste „Kategorie“ in `.pages.yml` passen.

## Modus Entwurf / Live
In `daten/firma.json` (im Formular: „Firma & Kontakt → Seite ist …“):
- **Entwurf** (Standard): `noindex`, `robots.txt` sperrt alles, gelber Entwurfsbalken, gelb markierte Platzhalter.
- **Live**: Platzhalter, Balken und Sperren entfallen, `robots.txt` erlaubt alles. Der Bau bricht ab, wenn die E-Mail-Adresse fehlt.

## Vor dem Livegang erledigen
- [ ] E-Mail, Öffnungszeiten, USt-IdNr., Rechtsform, Firmengeschichte und Foto im Formular ausfüllen.
- [ ] Impressum und Datenschutz rechtlich prüfen lassen (Hosting über GitHub Pages / USA ist im Datenschutztext erwähnt).
- [ ] Preise prüfen (Stand der Übernahme: 23.10.2026, Quelle: traktorpool.de/agroxx).
- [ ] Eigene Domain? Sonst bleibt es bei der github.io-Adresse.
- [ ] **Seite ist … auf „Live“ stellen.**

## Hinweise
- traktorpool.de blockiert automatische Abrufe, deshalb gibt es keinen automatischen Abgleich mit den Inseraten. Bestand und Preise werden im Formular gepflegt.
- Fotos bleiben in Originalgröße im Repository. GitHub empfiehlt Repositories unter 1 GB; bei durchschnittlich 3 MB pro Foto reicht das für einige hundert Bilder.
