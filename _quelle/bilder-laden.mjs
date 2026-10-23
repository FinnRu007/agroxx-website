// Lädt alle verwendeten Bilder einmalig von traktorpool.de in den Ordner bilder/:  node _quelle/bilder-laden.mjs
// k = Vorschaubild (640 px), g = große Ansicht (1600 px). Bereits vorhandene Dateien werden übersprungen.
import { mkdirSync, existsSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { BASE, KATEGORIEN, PRODUKTE, GALERIEN, dateiname } from './daten.mjs';

const ziel = join(dirname(fileURLToPath(import.meta.url)), '..', 'bilder');
const VARIANTEN = { k: '?width=640&height=480&crop', g: '?width=1600&height=1200' };
for (const v of Object.keys(VARIANTEN)) mkdirSync(join(ziel, v), { recursive: true });

const pfade = [...new Set([...KATEGORIEN.map((k) => k.bild), ...PRODUKTE.map((p) => p.bild), ...GALERIEN.flatMap((g) => g.bilder)])];
const aufgaben = pfade.flatMap((p) => Object.keys(VARIANTEN).map((v) => ({ p, v })));
let geladen = 0, uebersprungen = 0, bytes = 0;
const fehler = [];

async function lade({ p, v }) {
  const datei = join(ziel, v, dateiname(p));
  if (existsSync(datei) && statSync(datei).size > 1000) { uebersprungen++; return; }
  for (let versuch = 1; versuch <= 3; versuch++) {
    try {
      const r = await fetch(BASE + p + VARIANTEN[v], { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      if (buf.length < 1000 || buf[0] !== 0xff || buf[1] !== 0xd8) throw new Error('kein JPEG');
      writeFileSync(datei, buf);
      geladen++; bytes += buf.length;
      return;
    } catch (e) {
      if (versuch === 3) fehler.push(`${v}/${dateiname(p)}: ${e.message}`);
      else await new Promise((r) => setTimeout(r, 800 * versuch));
    }
  }
}

const warteschlange = [...aufgaben];
await Promise.all(Array.from({ length: 4 }, async () => { while (warteschlange.length) await lade(warteschlange.shift()); }));
console.log(`${pfade.length} Bilder · neu geladen: ${geladen} (${(bytes / 1048576).toFixed(1)} MB) · übersprungen: ${uebersprungen} · Fehler: ${fehler.length}`);
if (fehler.length) { console.log(fehler.join('\n')); process.exit(1); }
