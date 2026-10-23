// Liest alle Inhalte aus daten/ (werden im Pages-CMS-Formular bearbeitet) und stellt sie dem Seitenbau bereit.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const WURZEL = join(dirname(fileURLToPath(import.meta.url)), '..');
export const BILDER_QUELLE = join(WURZEL, 'bilder', 'original');
export const TRAKTORPOOL = 'https://www.traktorpool.de/agroxx/';

const lies = (...teile) => JSON.parse(readFileSync(join(WURZEL, ...teile), 'utf8'));
const text = (v) => (typeof v === 'string' ? v.trim() : '');
const zahl = (v) => {
  if (typeof v === 'number' && Number.isFinite(v) && v > 0) return v;
  if (typeof v === 'string' && v.trim()) {
    const n = Number(v.replace(/\./g, '').replace(',', '.'));
    return Number.isFinite(n) && n > 0 ? n : null;
  }
  return null;
};
export const euro = (n) => n.toLocaleString('de-DE', { maximumFractionDigits: 2 });

// ---------- Bilder ----------
// In den Daten steht z. B. "/bilder/original/abc.jpg". Die Originale liegen in bilder/original,
// ausgeliefert werden verkleinerte Fassungen: bilder/k/abc.jpg (Vorschau) und bilder/g/abc.jpg (groß).
export const bildName = (pfad) => basename(pfad).replace(/\.[^.]+$/, '');
export const dateiname = (pfad) => `${bildName(pfad)}.jpg`;
const bildVorhanden = (pfad) => typeof pfad === 'string' && pfad !== '' && existsSync(join(BILDER_QUELLE, basename(pfad)));
const bp = (datei) => `/bilder/original/${datei}`;

// ---------- Firma ----------
const f = lies('daten', 'firma.json');
export const MODUS = f.modus === 'Live' ? 'live' : 'entwurf';

function telefonLink(t) {
  let s = t.replace(/[^\d+]/g, '');
  if (s.startsWith('00')) s = '+' + s.slice(2);
  else if (s.startsWith('0')) s = '+49' + s.slice(1);
  return s;
}
const tel = text(f.telefon);
export const FIRMA = {
  name: 'agroXX techniCCenter',
  inhaber: 'Thomas Schalkamp',
  strasse: 'Büttrup 13',
  plz: '59320',
  ort: 'Ennigerloh',
  telefon: tel,
  telefonLink: telefonLink(tel),
  whatsapp: `https://wa.me/${telefonLink(tel).replace('+', '')}`,
  email: text(f.email) || null,
  oeffnungszeiten: text(f.oeffnungszeiten),
  rechtsform: text(f.rechtsform),
  handelsregister: text(f.handelsregister),
  ustId: text(f.ust_id),
  ueberUns: text(f.ueber_uns),
  foto: bildVorhanden(f.foto) ? f.foto : null,
  marken: Array.isArray(f.marken) ? f.marken.map(text).filter(Boolean) : [],
  sprachen: Array.isArray(f.sprachen) ? f.sprachen.map(text).filter(Boolean) : [],
};

// ---------- Grubber-Seite ----------
const g = lies('daten', 'grubber.json');
export const GRUBBER = {
  sonderausruestung: (g.sonderausruestung || [])
    .map((s) => ({ bezeichnung: text(s.bezeichnung), preis: zahl(s.preis) }))
    .filter((s) => s.bezeichnung),
};

// ---------- Kategorien (Reihenfolge = Reihenfolge auf der Seite; Namen müssen zur Auswahl im CMS passen) ----------
export const KATEGORIEN = [
  { key: 'grubber', titel: 'Grubber', lang: 'Mulchgrubber & Federzinkeneggen', text: 'Mulchgrubber und Federzinkeneggen für Stoppelbearbeitung und Saatbettbereitung.', bild: bp('7373771-46402507.jpg') },
  { key: 'scheibeneggen', titel: 'Kurzscheibeneggen', lang: 'Kurzscheibeneggen', text: 'Kurzscheibeneggen mit Dachring- oder Krumenpackerwalze.', bild: bp('8335292-57833137.jpg') },
  { key: 'tiefenlockerer', titel: 'Tiefenlockerer', lang: 'Tiefenlockerer', text: 'Tiefenlockerer zur Bodenlockerung bis in große Tiefen.', bild: bp('8876326-65446972.jpg') },
  { key: 'pfluege', titel: 'Pflüge', lang: 'Pflüge', text: 'Dreh-Schälpflüge in verschiedenen Größen.', bild: bp('4995195-28536732.jpg') },
  { key: 'walzen', titel: 'Walzen & Packer', lang: 'Walzen & Packer', text: 'Cambridgewalzen, Frontpacker und Messerwalzen.', bild: bp('8428162-59086179.jpg') },
  { key: 'kreiseleggen', titel: 'Kreiseleggen', lang: 'Kreiseleggen', text: 'Klappbare Kreiseleggen mit Zahnpackerwalze.', bild: bp('8448886-59341366.jpg') },
  { key: 'kipper', titel: 'Muldenkipper', lang: 'Muldenkipper', text: 'Wannen- und Halfpipe-Muldenkipper.', bild: bp('8335855-57839995.jpg') },
  { key: 'reifen', titel: 'Schlepperreifen', lang: 'Schlepperreifen', text: 'Schlepperreifen verschiedener Hersteller, teils als begrenzte Sonderposten.', bild: bp('2948657-51202157.jpg') },
  { key: 'verschleiss', titel: 'Verschleißteile', lang: 'Verschleißteile', text: 'Hohlscheiben, Meißelspitzen und weitere Verschleißteile.', bild: bp('4713206-36295899.jpg') },
];
const katNachTitel = Object.fromEntries(KATEGORIEN.map((k, i) => [k.titel, { key: k.key, pos: i }]));

// ---------- Maschinen ----------
export const WARNUNGEN = [];
const maschinenDir = join(WURZEL, 'daten', 'maschinen');
const alle = [];
for (const datei of readdirSync(maschinenDir).filter((n) => n.endsWith('.json')).sort()) {
  let d;
  try {
    d = lies('daten', 'maschinen', datei);
  } catch (e) {
    WARNUNGEN.push(`${datei}: Datei nicht lesbar (${e.message})`);
    continue;
  }
  const status = text(d.status) || 'Verfügbar';
  if (status === 'Verkauft') continue;
  const kat = katNachTitel[text(d.kategorie)];
  if (!text(d.titel)) { WARNUNGEN.push(`${datei}: keine Bezeichnung, übersprungen`); continue; }
  if (!kat) { WARNUNGEN.push(`${datei}: Kategorie "${d.kategorie}" unbekannt, übersprungen`); continue; }
  const bilder = (Array.isArray(d.bilder) ? d.bilder : []).filter((b) => {
    const ok = bildVorhanden(b);
    if (!ok) WARNUNGEN.push(`${datei}: Bild fehlt (${b})`);
    return ok;
  });
  const preisZahl = zahl(d.preis);
  alle.push({
    id: text(d.inserat) || datei.replace(/\.json$/, ''),
    inserat: text(d.inserat),
    kat: kat.key,
    katPos: kat.pos,
    name: text(d.titel),
    zusatz: text(d.zusatz),
    bilder,
    bild: bilder[0] || null,
    preisZahl,
    preis: preisZahl ? euro(preisZahl) : null,
    specs: (Array.isArray(d.eckdaten) ? d.eckdaten : []).map(text).filter(Boolean),
    breite: text(d.arbeitsbreite),
    status,
    startseite: d.startseite === true,
  });
}
// Preis aufsteigend, ohne Preis ans Ende
export const PRODUKTE = alle.sort((a, b) => (a.preisZahl ?? Infinity) - (b.preisZahl ?? Infinity) || a.name.localeCompare(b.name, 'de'));

// Bildergalerie: jede Maschine mit mindestens 4 Fotos bekommt einen Abschnitt
export const GALERIEN = [...PRODUKTE]
  .filter((p) => p.bilder.length >= 4)
  .sort((a, b) => a.katPos - b.katPos || (a.preisZahl ?? Infinity) - (b.preisZahl ?? Infinity))
  .map((p) => ({ titel: p.zusatz ? `${p.name} – ${p.zusatz}` : p.name, bilder: p.bilder }));

// ---------- Ausgewählte Seitenbilder (nach Dateiname; fehlt eins, wird es weggelassen) ----------
export const S = (datei) => (bildVorhanden(bp(datei)) ? bp(datei) : null);
export const bilderVon = (...dateien) => dateien.map(S).filter(Boolean);
export const ERSATZBILD = PRODUKTE.find((p) => p.bild)?.bild || null;
