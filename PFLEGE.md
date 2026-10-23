# Anleitung für Thomas: Die Website selbst pflegen

Alles, was sich ändert – Preise, Maschinen, Fotos, Kontaktdaten –, erledigst du in einem Formular. Du musst nichts programmieren.

**Formular öffnen:** https://app.pagescms.org
Dort meldest du dich an (Einladung kommt per E-Mail, siehe unten) und wählst das Projekt **agroxx-website**.

> Die Knöpfe von Pages CMS sind auf Englisch (z. B. **Save**, **Add an entry**, **Upload**). Die Felder und Hilfetexte der Seite selbst sind auf Deutsch.

Links im Menü findest du:

| Bereich | Wofür |
|---|---|
| **Maschinen** | Alle Maschinen mit Preis, Status, Eckdaten und Fotos |
| **Firma & Kontakt** | Telefon, E-Mail, Öffnungszeiten, Impressum-Angaben, „Über uns“, Schalter Entwurf/Live |
| **Grubber-Seite** | Preisliste der Sonderausrüstung |
| **Fotos** (unter „Media“) | Alle hochgeladenen Fotos |

## Nach jeder Änderung
Oben rechts auf **Save** klicken – fertig. Die Seite baut sich selbst neu auf und ist nach **etwa 1–2 Minuten** aktualisiert (im Browser neu laden, bei Bedarf mit Strg + F5).

## Preis ändern
1. **Maschinen** öffnen, in der Liste auf **Edit** neben der Maschine klicken (oben gibt es ein Suchfeld).
2. Feld **Preis netto in Euro** ändern, z. B. `9900` (ohne Punkt, ohne €).
3. **Save**.

Preis leer lassen → auf der Seite steht „Preis auf Anfrage“.

## Maschine als verkauft oder reserviert markieren
- **Reserviert:** Feld **Status** auf „Reserviert“ stellen. Die Maschine bleibt sichtbar und bekommt eine orange Marke „Reserviert“.
- **Verkauft:** Feld **Status** auf „Verkauft“ stellen. Die Maschine verschwindet von der Seite. Die Daten bleiben gespeichert – platzt der Verkauf, einfach wieder auf „Verfügbar“ stellen.

## Neue Maschine anlegen
1. **Maschinen** → oben rechts **Add an entry**.
2. Ausfüllen:
   - **Bezeichnung** (Pflicht), z. B. `TRIPLE-X 4.0-13`
   - **Zusatz**, z. B. `mit Dachringwalze`
   - **Kategorie** (Pflicht): bestimmt, wo die Maschine auf der Seite erscheint
   - **Status** (Pflicht): normalerweise „Verfügbar“
   - **Preis** und **Arbeitsbreite** (z. B. `4,0 m`)
   - **Eckdaten**: pro Stichpunkt ein Feld, mit **Add an item** kommt ein weiteres dazu
   - **Fotos**: siehe unten
   - **Auf der Startseite zeigen**: Schalter einschalten, wenn die Maschine unter „Aktuell ab Lager“ erscheinen soll (am besten höchstens 6 Maschinen)
3. **Save**.

Tipp: Eine ähnliche Maschine öffnen und die Felder dort abschauen. Eine Maschine der Kategorie **Grubber**, deren Bezeichnung mit `TRIPLE-X` beginnt, erscheint automatisch in der Preistabelle auf der Grubber-Seite.

## Fotos hochladen
1. In der Maschine ganz unten beim Feld **Fotos**:
   - **Upload**: neue Fotos vom Computer oder Handy hochladen
   - **Select**: ein schon hochgeladenes Foto auswählen
2. Das **erste Foto** ist das Titelbild auf der Karte. Die Reihenfolge änderst du, indem du ein Foto mit der Maus an eine andere Stelle ziehst. Mit dem Papierkorb-Symbol am Foto nimmst du es aus der Maschine.
3. **Save**.

Du musst die Fotos **nicht verkleinern**: Die Seite macht daraus automatisch kleine Vorschaubilder und große Ansichten (der Standort aus Handyfotos wird dabei entfernt). Querformat sieht am besten aus. Ab 4 Fotos pro Maschine erscheint sie zusätzlich in der Bildergalerie.

## Firma & Kontakt
Dort pflegst du Telefon, E-Mail, Öffnungszeiten, Rechtsform, Handelsregister, USt-ID, den Text „Über uns“ und ein Foto. Leere Felder werden auf der fertigen Seite einfach weggelassen.

### Seite „live“ schalten
Solange oben **Seite ist …** auf **Entwurf** steht, ist die Seite für Google gesperrt und zeigt gelbe Hinweise und einen Entwurfsbalken. Zum Livegang:
1. E-Mail-Adresse eintragen (Pflicht fürs Impressum), Öffnungszeiten usw. ergänzen.
2. Impressum und Datenschutzerklärung rechtlich prüfen lassen.
3. **Seite ist …** auf **Live** stellen und **Save**.

Fehlt bei „Live“ die E-Mail, wird die Seite absichtlich **nicht** aktualisiert (sie bleibt, wie sie war). Dann E-Mail eintragen und erneut speichern.

## Wenn etwas nicht klappt
- **Die Änderung erscheint nach 5 Minuten nicht:** Seite mit Strg + F5 neu laden. Hilft das nicht, bei dem melden, der die Seite eingerichtet hat – im Repository unter „Actions“ steht, was schiefging.
- **Eine Maschine fehlt auf der Seite:** Steht der Status auf „Verkauft“? Sind Bezeichnung und Kategorie ausgefüllt?
- **Ein Foto fehlt:** Wurde nach dem Hochladen gespeichert (**Save**)? Foto im Feld **Fotos** noch einmal hinzufügen.

## Zugang einrichten (einmalig, durch den Betreuer der Seite)
1. Auf https://app.pagescms.org mit dem GitHub-Konto anmelden, das das Repository `agroxx-website` besitzt (die GitHub-App von Pages CMS muss für dieses Repository freigegeben sein).
2. Das Projekt öffnen → **Collaborators** → die E-Mail-Adresse von Thomas hinzufügen. Er bekommt eine Einladung und braucht dafür **kein** GitHub-Konto.
