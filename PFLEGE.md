# Anleitung für Thomas: Die Website selbst pflegen

Alles, was sich ändert – Preise, Maschinen, Fotos, Kontaktdaten –, erledigst du in einem Formular. Du musst nichts programmieren.

**Formular öffnen:** https://app.pagescms.org
Dort meldest du dich an (Einladung kommt per E-Mail, siehe unten) und wählst das Projekt **agroxx-website**.

Links im Menü findest du drei Bereiche:

| Bereich | Wofür |
|---|---|
| **Maschinen** | Alle Maschinen mit Preis, Status, Eckdaten und Fotos |
| **Firma & Kontakt** | Telefon, E-Mail, Öffnungszeiten, Impressum-Angaben, „Über uns“, „Live“-Schalter |
| **Grubber-Seite** | Preisliste der Sonderausrüstung |

## Nach jedem Speichern
Auf „Speichern“ klicken – fertig. Die Seite baut sich selbst neu auf und ist nach **etwa 1–2 Minuten** aktualisiert (Seite im Browser neu laden, bei Bedarf mit Strg + F5).

## Preis ändern
1. **Maschinen** öffnen, Maschine anklicken (oben gibt es ein Suchfeld).
2. Feld **Preis netto in Euro** ändern, z. B. `9900` (ohne Punkt, ohne €).
3. Speichern.

Preis leer lassen → auf der Seite steht „Preis auf Anfrage“.

## Maschine als verkauft oder reserviert markieren
- **Reserviert:** Feld **Status** auf „Reserviert“ stellen. Die Maschine bleibt sichtbar, bekommt eine orange Marke „Reserviert“.
- **Verkauft:** Feld **Status** auf „Verkauft“ stellen. Die Maschine verschwindet von der Seite. Die Daten bleiben gespeichert – falls der Verkauf platzt, einfach wieder auf „Verfügbar“ stellen.

## Neue Maschine anlegen
1. **Maschinen** → oben rechts **Neuer Eintrag**.
2. Ausfüllen:
   - **Bezeichnung** (Pflicht), z. B. `TRIPLE-X 4.0-13`
   - **Zusatz**, z. B. `Mulchgrubber Premium mit Dachringwalze`
   - **Kategorie** (Pflicht): bestimmt, wo die Maschine auf der Seite erscheint
   - **Preis**, **Arbeitsbreite** (z. B. `4,0 m`)
   - **Eckdaten**: pro Stichpunkt eine Zeile, z. B. `Dachringwalze Ø 600 mm`
   - **Fotos**: siehe unten
   - **Auf der Startseite zeigen**: Haken setzen, wenn die Maschine unter „Aktuell ab Lager“ erscheinen soll (am besten höchstens 6 Maschinen)
3. Speichern.

Tipp: Eine ähnliche Maschine öffnen und die Felder dort abschauen. Beim TRIPLE-X-Grubber (Kategorie **Grubber**, Bezeichnung beginnt mit `TRIPLE-X`) landet die Maschine automatisch in der Preistabelle auf der Grubber-Seite.

## Fotos hochladen
1. In der Maschine beim Feld **Fotos** auf **Hinzufügen / Hochladen** klicken.
2. Die Fotos vom Handy oder Computer auswählen (mehrere gleichzeitig möglich).
3. Das **erste Foto** ist das Titelbild auf der Karte. Mit dem Ziehen-Symbol lässt sich die Reihenfolge ändern, mit dem Papierkorb-Symbol ein Foto entfernen.
4. Speichern.

Du musst die Fotos **nicht verkleinern**: Die Seite macht daraus automatisch kleine Vorschaubilder und große Ansichten. Querformat sieht auf der Seite am besten aus. Ab etwa 4 Fotos pro Maschine erscheint sie zusätzlich in der Bildergalerie.

## Firma & Kontakt
Dort pflegst du Telefon, E-Mail, Öffnungszeiten, Rechtsform, Handelsregister, USt-ID, den Text „Über uns“ und ein Foto. Leere Felder werden auf der fertigen Seite einfach weggelassen.

### Seite „live“ schalten
Solange oben **Seite ist … Entwurf** steht, ist die Seite für Google gesperrt und zeigt gelbe Hinweise und einen Entwurfsbalken. Zum Livegang:
1. E-Mail-Adresse eintragen (Pflicht fürs Impressum), Öffnungszeiten usw. ergänzen.
2. Impressum und Datenschutzerklärung rechtlich prüfen lassen.
3. **Seite ist …** auf **Live** stellen und speichern.

Wenn bei „Live“ die E-Mail fehlt, wird die Seite absichtlich **nicht** aktualisiert (sie bleibt, wie sie war). Dann die E-Mail eintragen und erneut speichern.

## Wenn etwas nicht klappt
- **Die Änderung erscheint nach 5 Minuten nicht:** Seite mit Strg + F5 neu laden. Hilft das nicht, kurz bei dem melden, der die Seite eingerichtet hat – im Repository unter „Actions“ steht, was schiefging.
- **Eine Maschine fehlt auf der Seite:** Status auf „Verkauft“? Kategorie und Bezeichnung ausgefüllt?
- **Ein Foto fehlt:** Wurde es nach dem Hochladen gespeichert? Foto im Feld **Fotos** neu hinzufügen.

## Zugang einrichten (einmalig, durch den Betreuer der Seite)
1. Auf https://app.pagescms.org mit dem GitHub-Konto anmelden, das das Repository `agroxx-website` besitzt.
2. Das Projekt öffnen → **Collaborators** → die E-Mail-Adresse von Thomas hinzufügen. Er bekommt eine Einladung und braucht dafür **kein** GitHub-Konto.
