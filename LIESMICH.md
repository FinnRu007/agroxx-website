# agroXX techniCCenter – Website-Entwurf

Reine HTML/CSS-Seite ohne Cookies, Tracking oder externe Schriften. `index.html` im Browser öffnen genügt.

## Seiten
`index.html` Start · `grubber.html` Mulchgrubber TRIPLE-X · `produkte.html` alle 36 Maschinen mit Preisen · `galerie.html` 137 Bilder · `ueber-uns.html` · `kontakt.html` · `impressum.html` · `datenschutz.html`

## Inhalte ändern
Texte, Preise und Bildlisten stehen in `_quelle/daten.mjs` (Firma, Produkte, Galerien) und `_quelle/build.mjs` (Seitentexte).
Danach neu erzeugen (Node.js nötig):

    node _quelle/build.mjs

Vorschau im Browser unter http://localhost:8123 :

    node _quelle/serve.mjs

Farben und Schrift: oben in `css/style.css` (`:root`).

## Vor dem Livegang erledigen
- [ ] Gelb markierte Platzhalter ausfüllen (E-Mail, Öffnungszeiten, USt-IdNr., Rechtsform, Firmengeschichte, Foto von Thomas).
- [ ] Bilder lokal speichern (aktuell werden sie von traktorpool.de geladen – das gibt Datenschutz- und Ausfallrisiko).
- [ ] Impressum und Datenschutz rechtlich prüfen lassen.
- [ ] Preise prüfen (Stand 23.10.2026, quelle: traktorpool.de/agroxx) – oder ganz entfernen, wenn sie nicht dauerhaft gepflegt werden.
- [ ] `<meta name="robots" content="noindex">` in `_quelle/build.mjs` entfernen und den gelben „Entwurf“-Balken löschen.
- [ ] Domain, Hosting und ggf. Anfrageformular klären.
