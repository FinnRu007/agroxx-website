// Kleiner Vorschau-Server:  node _quelle/serve.mjs   →  http://localhost:8123
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, join, normalize, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const wurzel = join(dirname(fileURLToPath(import.meta.url)), '..');
const typen = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png' };

createServer(async (req, res) => {
  let pfad = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (pfad.endsWith('/')) pfad += 'index.html';
  const datei = normalize(join(wurzel, pfad));
  if (!datei.startsWith(wurzel) || datei.includes('_quelle')) { res.writeHead(403).end('Verboten'); return; }
  try {
    const inhalt = await readFile(datei);
    res.writeHead(200, { 'Content-Type': typen[extname(datei)] || 'application/octet-stream' }).end(inhalt);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Nicht gefunden');
  }
}).listen(8123, () => console.log('Vorschau: http://localhost:8123'));
