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

## Veröffentlichen (GitHub Pages)
Entwurf online: https://finnru007.github.io/agroxx-website/ (Repo: https://github.com/FinnRu007/agroxx-website, öffentlich).
Die fertigen Seiten liegen im Hauptordner. Nach jeder Änderung neu erzeugen und hochladen:

    node _quelle/build.mjs
    git add -A
    git commit -m "Preise aktualisiert"
    git push

Nach etwa einer Minute ist die Änderung online.

Neue Maschine mit Bildern: Bildpfade in `_quelle/daten.mjs` eintragen, dann `node _quelle/bilder-laden.mjs` (lädt die Bilder von traktorpool in `bilder/`) und neu erzeugen.

## Vor dem Livegang erledigen
- [x] Bilder lokal gespeichert (`bilder/k` Vorschau, `bilder/g` groß).
- [ ] Gelb markierte Platzhalter ausfüllen (E-Mail, Öffnungszeiten, USt-IdNr., Rechtsform, Firmengeschichte, Foto von Thomas).
- [ ] Impressum und Datenschutz rechtlich prüfen lassen.
- [ ] Preise prüfen (Stand 23.10.2026, Quelle: traktorpool.de/agroxx) – oder ganz entfernen, wenn sie nicht dauerhaft gepflegt werden.
- [ ] Entwurfsschutz aufheben: `<meta name="robots" content="noindex">` in `_quelle/build.mjs` entfernen, `robots.txt` löschen, gelben „Entwurf“-Balken entfernen.
- [ ] Eigene Domain? Sonst bleibt es bei der github.io-Adresse.
- [ ] Pflege für Thomas klären (Formular-Oberfläche, nur traktorpool-Link oder manuell).
