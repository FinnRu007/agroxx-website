// Verkleinert alle Fotos aus bilder/original nach <ziel>/bilder/k (Vorschau, 640 px) und /g (groß, 1600 px).
// Ausrichtung wird korrigiert, Metadaten (z. B. GPS-Standort aus Handyfotos) werden entfernt.
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { BILDER_QUELLE, bildName } from './daten.mjs';

export async function verarbeiteBilder(ziel) {
  const kDir = join(ziel, 'bilder', 'k');
  const gDir = join(ziel, 'bilder', 'g');
  mkdirSync(kDir, { recursive: true });
  mkdirSync(gDir, { recursive: true });

  const quellen = readdirSync(BILDER_QUELLE).filter((n) => /\.(jpe?g|png|webp)$/i.test(n));
  const warteschlange = [...quellen];
  let neu = 0, uebersprungen = 0;
  const fehler = [];

  async function einBild(datei) {
    const quelle = join(BILDER_QUELLE, datei);
    const k = join(kDir, `${bildName(datei)}.jpg`);
    const g = join(gDir, `${bildName(datei)}.jpg`);
    const stand = statSync(quelle).mtimeMs;
    if (existsSync(k) && existsSync(g) && statSync(k).mtimeMs >= stand && statSync(g).mtimeMs >= stand) { uebersprungen++; return; }
    try {
      const bild = () => sharp(quelle).rotate();
      await bild().resize({ width: 640, height: 480, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 78, progressive: true }).toFile(k);
      await bild().resize({ width: 1600, height: 1200, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 82, progressive: true }).toFile(g);
      neu++;
    } catch (e) {
      fehler.push(`${datei}: ${e.message}`);
    }
  }

  await Promise.all(Array.from({ length: 4 }, async () => { while (warteschlange.length) await einBild(warteschlange.shift()); }));
  return { gesamt: quellen.length, neu, uebersprungen, fehler };
}
