// Erzeugt die fertigen HTML-Seiten im Ordner darüber:  node _quelle/build.mjs
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { FIRMA, TRAKTORPOOL, KATEGORIEN, PRODUKTE, GALERIEN, dateiname } from './daten.mjs';

const ziel = join(dirname(fileURLToPath(import.meta.url)), '..');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Bilder liegen lokal in bilder/k (640 px) und bilder/g (1600 px); größere Anfragen nehmen die große Datei
const gross = (p) => `bilder/g/${dateiname(p)}`;
const klein = (p, w = 640) => (w > 800 ? gross(p) : `bilder/k/${dateiname(p)}`);
const platz = (t) => `<mark class="platzhalter">${esc(t)}</mark>`;
const katByKey = Object.fromEntries(KATEGORIEN.map((k) => [k.key, k]));

const adresseZeile = `${FIRMA.strasse}, ${FIRMA.plz} ${FIRMA.ort}`;
const routeLink = `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseZeile)}`;
const emailZeile = FIRMA.email ? `<a href="mailto:${FIRMA.email}">${FIRMA.email}</a>` : platz('E-Mail-Adresse bitte ergänzen');

function waAnfrage(text) {
  return `${FIRMA.whatsapp}?text=${encodeURIComponent(text)}`;
}

const NAV = [
  ['index.html', 'Start'],
  ['grubber.html', 'Grubber'],
  ['produkte.html', 'Maschinen'],
  ['galerie.html', 'Bilder'],
  ['ueber-uns.html', 'Über uns'],
  ['kontakt.html', 'Kontakt'],
];

const ICONS = {
  lager: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M5 20 24 8l19 12v22H5z"/><path d="M15 42V28h18v14M15 35h18"/></svg>',
  auge: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M3 24S12 10 24 10s21 14 21 14-9 14-21 14S3 24 3 24z"/><circle cx="24" cy="24" r="6"/></svg>',
  tausch: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 17h30M31 9l8 8-8 8M40 31H10M17 23l-8 8 8 8"/></svg>',
  lkw: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M3 12h28v24H3zM31 20h9l5 8v8H31z"/><circle cx="14" cy="37" r="4"/><circle cx="37" cy="37" r="4"/></svg>',
};

function seite({ datei, titel, beschreibung, inhalt, hero = '' }) {
  const navHtml = NAV.map(([d, t]) => `<li><a href="${d}"${d === datei ? ' aria-current="page"' : ''}>${t}</a></li>`).join('');
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(titel)}</title>
<meta name="description" content="${esc(beschreibung)}">
<meta name="robots" content="noindex, nofollow"><!-- ENTWURF: vor der Veröffentlichung entfernen -->
<meta name="theme-color" content="#1f4a6e">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='10' fill='%231f4a6e'/%3E%3Ctext x='32' y='45' font-family='Georgia' font-size='34' font-weight='700' text-anchor='middle' fill='%23fff'%3Ea%3Ctspan fill='%23f0883a'%3EX%3C/tspan%3E%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
<div class="entwurf-hinweis">Entwurf zur Ansicht – Inhalte, Bilder und Rechtstexte sind noch nicht freigegeben.</div>
<div class="topleiste"><div class="wrap">
  <span class="adresse">${esc(FIRMA.strasse)} · ${esc(FIRMA.plz)} ${esc(FIRMA.ort)}</span>
  <span>Beratung &amp; Verkauf: <a href="tel:${FIRMA.telefonLink}">${esc(FIRMA.telefon)}</a> &nbsp;|&nbsp; <a href="${FIRMA.whatsapp}">WhatsApp</a></span>
</div></div>
<header class="kopf"><div class="wrap">
  <a class="logo" href="index.html" aria-label="agroXX techniCCenter – zur Startseite"><span class="marke">agro<b>XX</b></span><span class="zusatz">techniCCenter</span></a>
  <button class="nav-toggle" aria-expanded="false" aria-controls="hauptnav">Menü</button>
  <nav class="nav" id="hauptnav" aria-label="Hauptmenü"><ul>${navHtml}</ul></nav>
</div></header>
<main id="inhalt">
${hero}${inhalt}
</main>
<footer class="fuss"><div class="wrap">
  <div class="spalten">
    <div>
      <h3>${esc(FIRMA.name)}</h3>
      <p>${esc(FIRMA.inhaber)}<br>${esc(FIRMA.strasse)}<br>${esc(FIRMA.plz)} ${esc(FIRMA.ort)}</p>
      <p>Telefon / WhatsApp: <a href="tel:${FIRMA.telefonLink}">${esc(FIRMA.telefon)}</a><br>E-Mail: ${FIRMA.email ? `<a href="mailto:${FIRMA.email}">${FIRMA.email}</a>` : platz('ergänzen')}</p>
    </div>
    <div>
      <h3>Maschinen</h3>
      <ul>${KATEGORIEN.slice(0, 6).map((k) => `<li><a href="produkte.html#${k.key}">${esc(k.titel)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h3>Die Firma</h3>
      <ul>
        <li><a href="ueber-uns.html">Über uns</a></li>
        <li><a href="galerie.html">Bilder</a></li>
        <li><a href="kontakt.html">Kontakt &amp; Anfahrt</a></li>
        <li><a href="impressum.html">Impressum</a></li>
        <li><a href="datenschutz.html">Datenschutz</a></li>
      </ul>
    </div>
  </div>
  <div class="klein"><span>© ${new Date().getFullYear()} ${esc(FIRMA.name)}</span><span>Alle Preise netto zzgl. gesetzl. MwSt. · Irrtümer und Zwischenverkauf vorbehalten</span></div>
</div></footer>
<script src="js/main.js"></script>
</body>
</html>
`;
}

// ---------- Bausteine ----------
function karte(p) {
  const wa = waAnfrage(`Guten Tag, ich interessiere mich für: ${p.name} (Inserat ${p.id}).`);
  return `<article class="karte">
  <a class="bild" href="${gross(p.bild)}" data-lightbox="produkte-${p.kat}" data-caption="${esc(p.name)}"><img src="${klein(p.bild)}" alt="${esc(p.name)}" loading="lazy" width="640" height="480"></a>
  <div class="inhalt">
    <h3>${esc(p.name)}</h3>
    <p class="zusatz">${esc(p.zusatz)}</p>
    <ul>${p.specs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
    <div class="preiszeile">
      <div class="preis">${esc(p.preis)} €<small>netto zzgl. 19&nbsp;% MwSt. · Inserat-Nr. ${p.id}</small></div>
      <div class="aktionen"><a class="btn btn-orange btn-klein" href="${wa}">Per WhatsApp anfragen</a><a class="btn btn-rand-blau btn-klein" href="tel:${FIRMA.telefonLink}">Anrufen</a></div>
    </div>
  </div>
</article>`;
}

function galerieGitter(g, name, mitGross = true) {
  return `<div class="galerie">${g.bilder
    .map((b, i) => `<a href="${gross(b)}"${mitGross && i === 0 ? ' class="gross"' : ''} data-lightbox="${name}" data-caption="${esc(g.titel)}"><img src="${klein(b, i === 0 && mitGross ? 960 : 480, i === 0 && mitGross ? 720 : 360)}" alt="${esc(g.titel)} – Bild ${i + 1}" loading="lazy"></a>`)
    .join('')}</div>`;
}

const kontaktBand = `<section class="kontaktband"><div class="wrap"><div class="spalten">
  <div>
    <h2>Sprechen Sie mit uns.</h2>
    <p>Welche Maschine passt zu Ihrem Schlepper und Ihren Flächen? Thomas Schalkamp berät Sie gern – am Telefon, per WhatsApp oder direkt bei uns auf dem Hof in ${esc(FIRMA.ort)}.</p>
    <div class="btn-reihe"><a class="btn btn-orange" href="${FIRMA.whatsapp}">WhatsApp schreiben</a><a class="btn btn-rand" href="kontakt.html">Kontakt &amp; Anfahrt</a></div>
  </div>
  <div>
    <p style="margin:0 0 .2em;color:#cfe0ee">Direkt anrufen:</p>
    <a class="tel" href="tel:${FIRMA.telefonLink}">${esc(FIRMA.telefon)}</a>
    <p style="margin-top:.8em;color:#cfe0ee">${esc(FIRMA.name)}<br>${esc(FIRMA.strasse)}, ${esc(FIRMA.plz)} ${esc(FIRMA.ort)}</p>
  </div>
</div></div></section>`;

// ---------- Startseite ----------
const proKat = (k) => PRODUKTE.filter((p) => p.kat === k).length;
const aktuell = ['7373771', '8335292', '4995195', '8876326', '8428157', '8872720'].map((id) => PRODUKTE.find((p) => p.id === id));
const mosaik = [
  [GALERIEN[0], 2], [GALERIEN[1], 1], [GALERIEN[4], 2], [GALERIEN[5], 1], [GALERIEN[6], 2], [GALERIEN[7], 1],
  [GALERIEN[8], 2], [GALERIEN[3], 1], [GALERIEN[9], 2], [GALERIEN[2], 1], [GALERIEN[0], 5], [GALERIEN[4], 4], [GALERIEN[5], 3],
].map(([g, i]) => ({ titel: g.titel, bild: g.bilder[i] }));

const index = seite({
  datei: 'index.html',
  titel: 'agroXX techniCCenter Ennigerloh – Grubber, Scheibeneggen, Pflüge ab Lager',
  beschreibung: 'agroXX techniCCenter in Ennigerloh: Mulchgrubber, Kurzscheibeneggen, Pflüge, Walzen und Tiefenlockerer – ständig 50 bis 80 Maschinen ab Lager. Beratung durch Thomas Schalkamp.',
  hero: `<section class="hero">
  <img src="${gross(GALERIEN[0].bilder[1])}" alt="Mulchgrubber TRIPLE-X im Einsatz hinter dem Schlepper" fetchpriority="high">
  <div class="wrap">
    <p class="kicker">Landtechnik aus Ennigerloh</p>
    <h1>Bodenbearbeitung, auf die Sie sich verlassen können.</h1>
    <p>Mulchgrubber, Kurzscheibeneggen, Pflüge, Walzen und Tiefenlockerer – ständig 50 bis 80 Maschinen ab Lager. Persönlich beraten von Thomas Schalkamp.</p>
    <div class="btn-reihe"><a class="btn btn-orange" href="produkte.html">Unsere Maschinen ansehen</a><a class="btn btn-rand" href="tel:${FIRMA.telefonLink}">Jetzt anrufen: ${esc(FIRMA.telefon)}</a></div>
  </div>
</section>
<section class="vorteile"><div class="wrap"><ul>
  <li>${ICONS.lager}<h3>Ab Lager lieferbar</h3><p>Mulchgrubber, Kurzscheibeneggen, Cambridgewalzen, Großfederzinkeneggen und Tiefenlockerer sofort verfügbar.</p></li>
  <li>${ICONS.auge}<h3>Ausstellung &amp; Vorführung</h3><p>Besuchen Sie unsere Ausstellung. Vorführgeräte und einzelne Maschinen auch zu Sonderkonditionen.</p></li>
  <li>${ICONS.tausch}<h3>Inzahlungnahme</h3><p>Ihre Altmaschine nehmen wir nach Absprache gern in Zahlung.</p></li>
  <li>${ICONS.lkw}<h3>Lieferung &amp; Transport</h3><p>Lieferung möglich, günstige Transportmöglichkeiten vorhanden.</p></li>
</ul></div></section>`,
  inhalt: `
<section class="abschnitt"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Unsere Maschinen</h2><span class="unterstrich"></span><p>Alles für Stoppelbearbeitung, Saatbettbereitung und Grundbodenbearbeitung – vom Mulchgrubber bis zum Muldenkipper.</p></div>
  <div class="kacheln">
    ${KATEGORIEN.map((k) => `<a class="kachel" href="produkte.html#${k.key}"><img src="${klein(k.bild)}" alt="${esc(k.lang)}" loading="lazy"><span class="titel"><strong>${esc(k.titel)}</strong><span>${proKat(k.key)} im Angebot</span></span></a>`).join('\n    ')}
  </div>
</div></section>

<section class="abschnitt hell"><div class="wrap schwerpunkt">
  <div class="bildreihe">
    <a href="${gross(GALERIEN[0].bilder[0])}" data-lightbox="start-grubber" data-caption="Mulchgrubber TRIPLE-X 4.0-13 Premium"><img src="${klein(GALERIEN[0].bilder[0], 960, 720)}" alt="Mulchgrubber TRIPLE-X 4.0-13 Premium" loading="lazy"></a>
    <a href="${gross(GALERIEN[0].bilder[3])}" data-lightbox="start-grubber" data-caption="Mulchgrubber TRIPLE-X Premium"><img src="${klein(GALERIEN[0].bilder[3])}" alt="Mulchgrubber TRIPLE-X Premium, Seitenansicht" loading="lazy"></a>
    <a href="${gross(GALERIEN[0].bilder[8])}" data-lightbox="start-grubber" data-caption="Mulchgrubber TRIPLE-X Premium"><img src="${klein(GALERIEN[0].bilder[8])}" alt="Mulchgrubber TRIPLE-X Premium, Detail" loading="lazy"></a>
  </div>
  <div>
    <p class="kicker" style="color:var(--orange-dunkel);text-transform:uppercase;letter-spacing:.14em;font-weight:700;font-size:.9rem;margin-bottom:.4em">Unser Schwerpunkt</p>
    <h2>Mulchgrubber TRIPLE-X Premium</h2>
    <span class="unterstrich"></span>
    <p style="margin-top:1em">Für ganzflächiges Arbeiten bei intensiver Mischarbeit, zügiges Auslaufen von Ausfallgetreide und ein sauberes Strohmanagement. Für Schlepper von 140 bis 300 PS.</p>
    <ul class="haken">
      <li>Dreibalkiger Rohrrahmen 100 × 100 mm aus S355-Feinkornstahl</li>
      <li>Abwechselnd rechts/links gedrehte Scharleitbleche</li>
      <li>315 mm breite Flügelschare, leicht zu demontieren</li>
      <li>Dachringwalze Premium, Ø 600 mm, mit Abstreifer</li>
      <li>Arbeitsbreiten von 3,0 bis 4,8 m</li>
    </ul>
    <div class="btn-reihe"><a class="btn btn-blau" href="grubber.html">Mehr zum Grubber</a><a class="btn btn-rand-blau" href="${waAnfrage('Guten Tag, ich interessiere mich für den Mulchgrubber TRIPLE-X.')}">Preis anfragen</a></div>
  </div>
</div></section>

<section class="abschnitt"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Aktuell ab Lager</h2><span class="unterstrich"></span><p>Eine Auswahl aus unserem Bestand. Den kompletten Bestand mit allen Preisen finden Sie unter <a href="produkte.html">Maschinen</a>.</p></div>
  <div class="karten">${aktuell.map(karte).join('\n')}</div>
  <div class="btn-reihe"><a class="btn btn-blau" href="produkte.html">Alle ${PRODUKTE.length} Maschinen ansehen</a></div>
</div></section>

<section class="abschnitt hell"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Einblicke</h2><span class="unterstrich"></span><p>So sehen unsere Maschinen aus. Ein Klick auf ein Bild vergrößert es.</p></div>
  <div class="galerie">${mosaik.map((m, i) => `<a href="${gross(m.bild)}"${i === 0 ? ' class="gross"' : ''} data-lightbox="start-mosaik" data-caption="${esc(m.titel)}"><img src="${klein(m.bild, i === 0 ? 960 : 480, i === 0 ? 720 : 360)}" alt="${esc(m.titel)}" loading="lazy"></a>`).join('')}</div>
  <div class="btn-reihe"><a class="btn btn-rand-blau" href="galerie.html">Alle Bilder ansehen</a></div>
</div></section>

<section class="abschnitt"><div class="wrap zweispaltig">
  <div>
    <h2>Ihr Ansprechpartner vor Ort</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Das agroXX techniCCenter von <strong>Thomas Schalkamp</strong> sitzt in Ennigerloh im Münsterland. Hier stehen die Maschinen, hier können Sie sie in Ruhe ansehen und sich beraten lassen.</p>
    <p>Wir sprechen mit unseren Kunden in elf Sprachen – darunter Deutsch, Englisch, Polnisch, Französisch und Rumänisch.</p>
    <div class="btn-reihe"><a class="btn btn-blau" href="ueber-uns.html">Mehr über uns</a></div>
  </div>
  <div class="karte-weiss">
    <h3>Das Wichtigste auf einen Blick</h3>
    <dl class="daten">
      <dt>Anschrift</dt><dd>${esc(FIRMA.name)}<br>${esc(FIRMA.strasse)}, ${esc(FIRMA.plz)} ${esc(FIRMA.ort)}</dd>
      <dt>Telefon / WhatsApp</dt><dd><a href="tel:${FIRMA.telefonLink}">${esc(FIRMA.telefon)}</a></dd>
      <dt>Öffnungszeiten</dt><dd>${platz('bitte ergänzen')}</dd>
    </dl>
  </div>
</div></section>
${kontaktBand}`,
});

// ---------- Grubber ----------
const grubberModelle = [
  ['TRIPLE-X 3.0-10', '3,0 m', '10', 'bis 30 cm', 'Dachringwalze', '7.900 €'],
  ['TRIPLE-X 3.0-13', '3,0 m', '13', 'bis 30 cm', 'Dachringwalze', '8.400 €'],
  ['TRIPLE-X 4.0-13', '4,0 m', '13', 'bis 30 cm', 'Dachringwalze', '13.700 €'],
  ['TRIPLE-X 4.8-16', '4,8 m', '16', 'bis 30 cm', 'Dachringwalze', '16.500 €'],
];
const grubber = seite({
  datei: 'grubber.html',
  titel: 'Mulchgrubber TRIPLE-X Premium – agroXX techniCCenter Ennigerloh',
  beschreibung: 'Mulchgrubber TRIPLE-X Premium von agroXX: 3,0 bis 4,8 m Arbeitsbreite, Dachringwalze, Flügelschare, für Schlepper von 140 bis 300 PS. Ab Lager lieferbar.',
  hero: `<section class="hero hero-klein">
  <img src="${gross(GALERIEN[0].bilder[5])}" alt="Mulchgrubber TRIPLE-X Premium">
  <div class="wrap"><p class="kicker">Unser Schwerpunkt</p><h1>Mulchgrubber TRIPLE-X Premium</h1><p>Intensive Mischarbeit, sauberes Strohmanagement und zügiges Auslaufen von Ausfallgetreide – für Schlepper von 140 bis 300 PS.</p>
  <div class="btn-reihe"><a class="btn btn-orange" href="${waAnfrage('Guten Tag, ich interessiere mich für den Mulchgrubber TRIPLE-X.')}">Preis anfragen</a><a class="btn btn-rand" href="#modelle">Modelle &amp; Preise</a></div></div>
</section>`,
  inhalt: `
<section class="abschnitt hell"><div class="wrap schwerpunkt">
  <div>
    <h2>Das steckt im TRIPLE-X</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Der agroXX-Premium-Mulchgrubber ist ein Dreibalkengerät mit kräftigem Rahmen und einem durchdachten Zinken- und Scharsystem. Ausgelegt für den ganzflächigen Einsatz bei intensiver Mischarbeit.</p>
    <ul class="haken">
      <li><strong>Rahmen:</strong> 3 Balken, 100 × 100 mm Rohrrahmen aus S355-Feinkornstahl</li>
      <li><strong>Zinken &amp; Schare:</strong> TOPMIX-Zinken- und Scharsystem von Industriehof Scherenbostel</li>
      <li><strong>Flügelschar:</strong> 315 mm breit, leicht zu demontieren</li>
      <li><strong>Scharleitbleche:</strong> abwechselnd rechts/links gedreht</li>
      <li><strong>Anbau:</strong> HD-Dreipunktbock Kat. 2 und 3, verstärkte Arme für den Nachläufer</li>
      <li><strong>Rahmen:</strong> 82 cm Rahmenhöhe, 80 cm Rahmenabstand</li>
      <li><strong>Nachläufer:</strong> Dachringwalze Premium Ø 600 mm mit Abstreifer (STS-Walze ebenfalls erhältlich)</li>
      <li><strong>Randscheiben:</strong> serienmäßig 10 gezackte Hohlscheiben Ø 465 mm, davon 2 teleskopierbare Randscheiben</li>
    </ul>
  </div>
  <div class="bildreihe">
    <a href="${gross(GALERIEN[0].bilder[2])}" data-lightbox="grubber-kopf" data-caption="Mulchgrubber TRIPLE-X 4.0-13 Premium"><img src="${klein(GALERIEN[0].bilder[2], 960, 720)}" alt="Mulchgrubber TRIPLE-X im Einsatz" loading="lazy"></a>
    <a href="${gross(GALERIEN[0].bilder[9])}" data-lightbox="grubber-kopf" data-caption="Mulchgrubber TRIPLE-X Premium"><img src="${klein(GALERIEN[0].bilder[9])}" alt="Mulchgrubber TRIPLE-X, Detailansicht" loading="lazy"></a>
    <a href="${gross(GALERIEN[0].bilder[11])}" data-lightbox="grubber-kopf" data-caption="Mulchgrubber TRIPLE-X Premium"><img src="${klein(GALERIEN[0].bilder[11])}" alt="Mulchgrubber TRIPLE-X, Detailansicht" loading="lazy"></a>
  </div>
</div></section>

<section class="abschnitt" id="modelle"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Modelle &amp; Preise</h2><span class="unterstrich"></span><p>Das vollständige Mulchgrubberprogramm gibt es von 3,0 bis 4,8 m Arbeitsbreite – mit Abscherschraubensicherung oder voll gefedert.</p></div>
  <div class="tabelle-scroll"><table class="tabelle">
    <thead><tr><th>Modell</th><th>Arbeitsbreite</th><th>Zinken</th><th>Arbeitstiefe</th><th>Nachläufer</th><th class="re">Preis netto</th></tr></thead>
    <tbody>${grubberModelle.map((m) => `<tr><td><strong>${m[0]}</strong></td><td>${m[1]}</td><td>${m[2]}</td><td>${m[3]}</td><td>${m[4]}</td><td class="re"><strong>${m[5]}</strong></td></tr>`).join('')}</tbody>
  </table></div>
  <p style="margin-top:1em;font-size:.95rem;color:var(--text-leise)">Preise zzgl. 19&nbsp;% MwSt., Stand ${FIRMA.stand}. Weitere Ausführungen (z. B. Rohrstabwalze, STS-U-Ringwalze, voll gefedert) auf Anfrage.</p>

  <div class="zweispaltig" style="margin-top:44px">
    <div class="karte-weiss">
      <h3>Sonderausrüstung gegen Mehrpreis</h3>
      <table class="tabelle" style="border:0"><tbody>
        <tr><td>Dachringwalze 600 mm mit aufgeschweißten Stegen</td><td class="re"><strong>200 €</strong></td></tr>
        <tr><td>STS-U-Profilringwalze 600 mm</td><td class="re"><strong>650 €</strong></td></tr>
        <tr><td>Striegelzinkenbalken nach dem Nachläufer, in Höhe und Neigung verstellbar</td><td class="re"><strong>1.700 €</strong></td></tr>
        <tr><td>LED-Beleuchtung und Warntafeln mit verzinkten Spezialhaltern</td><td class="re"><strong>250 €</strong></td></tr>
      </tbody></table>
      <p style="margin:.8em 0 0;font-size:.92rem;color:var(--text-leise)">Alle Preise netto zzgl. 19&nbsp;% MwSt.</p>
    </div>
    <div class="karte-weiss">
      <h3>Auch interessant: Speedline 6.0 XC</h3>
      <img class="rahmenbild" style="margin-bottom:14px" src="${klein(PRODUKTE.find((p) => p.id === '8872720').bild, 800, 600)}" alt="Großfederzinkenegge Speedline 6.0 XC" loading="lazy">
      <p>Großfederzinkenegge mit Herkuleszinken 70 × 12 mm, 6,0 m Arbeitsbreite, bis 12 cm Arbeitstiefe und Rohrstabwalze. Hydraulisch klappbar, mit Steinsicherung.</p>
      <p style="margin:0"><strong>11.900 €</strong> netto · <a href="produkte.html#grubber">Zum Angebot</a></p>
    </div>
  </div>
</div></section>

<section class="abschnitt hell"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Bilder vom TRIPLE-X</h2><span class="unterstrich"></span><p>Ein Klick auf ein Bild vergrößert es. Mit den Pfeiltasten blättern Sie durch alle Bilder.</p></div>
  ${galerieGitter(GALERIEN[0], 'grubber-galerie')}
  <div class="btn-reihe"><a class="btn btn-rand-blau" href="galerie.html">Weitere Bilder ansehen</a></div>
</div></section>
${kontaktBand}`,
});

// ---------- Maschinen ----------
const produkte = seite({
  datei: 'produkte.html',
  titel: 'Maschinen und Preise – agroXX techniCCenter Ennigerloh',
  beschreibung: `Alle Maschinen im Überblick: Mulchgrubber, Kurzscheibeneggen, Tiefenlockerer, Pflüge, Walzen, Kreiseleggen, Kipper und Reifen mit Preisen (Stand ${FIRMA.stand}).`,
  hero: `<section class="hero hero-klein">
  <img src="${gross(GALERIEN[4].bilder[1])}" alt="Maschinenbestand">
  <div class="wrap"><p class="kicker">Maschinenbestand</p><h1>Unsere Maschinen</h1><p>${PRODUKTE.length} Maschinen und Teile ab Lager. Alle Preise netto – fragen Sie gern nach Vorführgeräten und Sonderkonditionen.</p></div>
</section>
<nav class="kat-nav" aria-label="Maschinenkategorien"><div class="wrap"><ul>${KATEGORIEN.map((k) => `<li><a href="#${k.key}">${esc(k.titel)} (${proKat(k.key)})</a></li>`).join('')}</ul></div></nav>`,
  inhalt: `
<section class="abschnitt" style="padding-top:36px"><div class="wrap">
  <p class="hinweisbox">Alle Preise in Euro netto zzgl. 19&nbsp;% MwSt., Stand ${FIRMA.stand}. Angebot freibleibend, Zwischenverkauf, Irrtümer und Änderungen vorbehalten. Alle Angaben ohne Gewähr. Bitte nennen Sie bei Rückfragen die Inserat-Nummer.</p>
  ${KATEGORIEN.map((k) => `<section class="kat-block" id="${k.key}">
    <h2>${esc(k.lang)}</h2>
    <p style="color:var(--text-leise);margin:.6em 0 1.4em">${esc(k.text)}</p>
    <div class="karten">${PRODUKTE.filter((p) => p.kat === k.key).map(karte).join('\n')}</div>
  </section>`).join('\n')}
  <p style="margin-top:3em">Den aktuellen Gesamtbestand finden Sie auch bei <a href="${TRAKTORPOOL}">traktorpool.de</a>.</p>
</div></section>
${kontaktBand}`,
});

// ---------- Galerie ----------
const galerie = seite({
  datei: 'galerie.html',
  titel: 'Bilder unserer Maschinen – agroXX techniCCenter Ennigerloh',
  beschreibung: 'Bildergalerie des agroXX techniCCenter: Mulchgrubber, Scheibeneggen, Pflüge, Walzen, Tiefenlockerer und Kipper aus Ennigerloh.',
  hero: `<section class="hero hero-klein">
  <img src="${gross(GALERIEN[2].bilder[0])}" alt="">
  <div class="wrap"><p class="kicker">Bilder</p><h1>Unsere Maschinen im Bild</h1><p>${GALERIEN.reduce((s, g) => s + g.bilder.length, 0)} Fotos aus unserem Bestand. Ein Klick vergrößert das Bild.</p></div>
</section>`,
  inhalt: `
<section class="abschnitt"><div class="wrap">
  ${GALERIEN.map((g, i) => `<h2 class="galerie-titel" id="g${i + 1}">${esc(g.titel)} <span class="zaehler">· ${g.bilder.length} Bilder</span></h2>
  ${galerieGitter(g, 'galerie-' + (i + 1), i === 0)}`).join('\n')}
</div></section>
${kontaktBand}`,
});

// ---------- Über uns ----------
const ueberUns = seite({
  datei: 'ueber-uns.html',
  titel: 'Über uns – agroXX techniCCenter Ennigerloh',
  beschreibung: 'Das agroXX techniCCenter von Thomas Schalkamp in Ennigerloh: Landtechnik für Bodenbearbeitung, persönliche Beratung, Ausstellung und Lieferung.',
  hero: `<section class="hero hero-klein">
  <img src="${gross(GALERIEN[6].bilder[1])}" alt="">
  <div class="wrap"><p class="kicker">Über uns</p><h1>agroXX techniCCenter</h1><p>Landtechnik für die Bodenbearbeitung – persönlich, direkt und ab Lager.</p></div>
</section>`,
  inhalt: `
<section class="abschnitt hell"><div class="wrap zweispaltig">
  <div>
    <h2>Wer wir sind</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Das agroXX techniCCenter ist die Anlaufstelle für Landwirte, die robuste Maschinen für die Bodenbearbeitung suchen. Unser Schwerpunkt sind Mulchgrubber, Kurzscheibeneggen, Cambridgewalzen, Großfederzinkeneggen und Tiefenlockerer.</p>
    <p>Ständig stehen 50 bis 80 verschiedene Maschinen ab Lager sofort für Sie bereit. Dazu kommen Pflüge, Kreiseleggen, Muldenkipper, Schlepperreifen und Verschleißteile.</p>
    <p>Inhaber und Ansprechpartner ist <strong>Thomas Schalkamp</strong>.</p>
    <p>${platz('Hier kann Thomas in eigenen Worten die Firmengeschichte erzählen: Gründung, Werdegang, was ihm wichtig ist.')}</p>
  </div>
  <div class="platzhalter-box" role="img" aria-label="Platzhalter für ein Foto von Thomas Schalkamp">Platz für ein Foto<br>von Thomas Schalkamp<br>oder dem Betriebsgelände</div>
</div></section>

<section class="abschnitt"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Das bieten wir Ihnen</h2><span class="unterstrich"></span></div>
  <div class="raster2">
    <div class="karte-weiss"><h3>Beratung</h3><p style="margin:0">Passt die Maschine zu Ihrem Schlepper (der TRIPLE-X ist für 140 bis 300 PS ausgelegt) und Ihren Flächen? Wir beraten Sie ehrlich und direkt.</p></div>
    <div class="karte-weiss"><h3>Ausstellung</h3><p style="margin:0">Sehen Sie sich die Maschinen vor Ort an. Vorführgeräte und einzelne Maschinen gibt es auch zu Sonderkonditionen.</p></div>
    <div class="karte-weiss"><h3>Inzahlungnahme</h3><p style="margin:0">Sie möchten Ihre alte Maschine abgeben? Eine Inzahlungnahme ist nach Absprache möglich.</p></div>
    <div class="karte-weiss"><h3>Lieferung</h3><p style="margin:0">Lieferung ist möglich, günstige Transportmöglichkeiten sind vorhanden. Sprechen Sie uns einfach an.</p></div>
  </div>
</div></section>

<section class="abschnitt hell"><div class="wrap zweispaltig">
  <div>
    <h2>Marken im Programm</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Neben den agroXX-Maschinen führen wir Maschinen und Teile weiterer Hersteller.</p>
    <ul class="chips">${FIRMA.marken.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
  </div>
  <div>
    <h2>Wir sprechen Ihre Sprache</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Auch Kunden aus dem Ausland sind bei uns richtig. Thomas Schalkamp spricht:</p>
    <ul class="chips">${FIRMA.sprachen.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
  </div>
</div></section>
${kontaktBand}`,
});

// ---------- Kontakt ----------
const kontakt = seite({
  datei: 'kontakt.html',
  titel: 'Kontakt und Anfahrt – agroXX techniCCenter Ennigerloh',
  beschreibung: `Kontakt zum agroXX techniCCenter: ${adresseZeile}, Telefon ${FIRMA.telefon}, WhatsApp.`,
  hero: `<section class="hero hero-klein">
  <img src="${gross(GALERIEN[7].bilder[1])}" alt="">
  <div class="wrap"><p class="kicker">Kontakt</p><h1>So erreichen Sie uns</h1><p>Am schnellsten per Telefon oder WhatsApp. Gern auch direkt bei uns vorbeikommen.</p></div>
</section>`,
  inhalt: `
<section class="abschnitt"><div class="wrap zweispaltig">
  <div class="karte-weiss">
    <h2 style="font-size:1.6rem">${esc(FIRMA.name)}</h2>
    <dl class="daten">
      <dt>Ansprechpartner</dt><dd>${esc(FIRMA.inhaber)}</dd>
      <dt>Anschrift</dt><dd>${esc(FIRMA.strasse)}<br>${esc(FIRMA.plz)} ${esc(FIRMA.ort)}</dd>
      <dt>Telefon / WhatsApp</dt><dd><a href="tel:${FIRMA.telefonLink}" style="font-size:1.35rem;font-weight:700">${esc(FIRMA.telefon)}</a></dd>
      <dt>E-Mail</dt><dd>${emailZeile}</dd>
      <dt>Öffnungszeiten</dt><dd>${platz('bitte ergänzen, z. B. Mo–Fr 8–17 Uhr, Sa nach Vereinbarung')}</dd>
    </dl>
    <div class="btn-reihe"><a class="btn btn-orange" href="${FIRMA.whatsapp}">WhatsApp schreiben</a><a class="btn btn-blau" href="tel:${FIRMA.telefonLink}">Anrufen</a></div>
  </div>
  <div>
    <h2>Anfahrt</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Sie finden uns in ${esc(FIRMA.ort)}, ${esc(FIRMA.strasse)}. Wir freuen uns über Ihren Besuch – am besten rufen Sie vorher kurz an.</p>
    <p>Aus Datenschutzgründen binden wir hier keine Karte ein. Mit diesem Link öffnet sich die Karte in einem neuen Fenster:</p>
    <p><a class="btn btn-rand-blau" href="${routeLink}" target="_blank" rel="noopener">Karte öffnen (OpenStreetMap)</a></p>
    <p style="margin-top:1.6em">Bei Rückfragen zu einer bestimmten Maschine nennen Sie uns bitte die Inserat-Nummer aus der <a href="produkte.html">Maschinenliste</a>.</p>
  </div>
</div></section>`,
});

// ---------- Impressum ----------
const impressum = seite({
  datei: 'impressum.html',
  titel: 'Impressum – agroXX techniCCenter',
  beschreibung: 'Impressum des agroXX techniCCenter, Thomas Schalkamp, Ennigerloh.',
  inhalt: `
<section class="abschnitt"><div class="wrap rechtstext">
  <h1>Impressum</h1>
  <p class="hinweisbox">Entwurf: Die gelb markierten Angaben muss Thomas Schalkamp vor der Veröffentlichung ergänzen bzw. prüfen. Rechtstexte bitte vor dem Livegang rechtlich prüfen lassen.</p>
  <h2>Angaben gemäß § 5 DDG</h2>
  <p><strong>${esc(FIRMA.name)}</strong><br>Inhaber: ${esc(FIRMA.inhaber)}<br>${esc(FIRMA.strasse)}<br>${esc(FIRMA.plz)} ${esc(FIRMA.ort)}<br>Deutschland</p>
  <p>${platz('Rechtsform bitte prüfen / ergänzen, z. B. Einzelunternehmen')}<br>${platz('Falls vorhanden: Handelsregister, Registergericht und Registernummer')}</p>
  <h2>Kontakt</h2>
  <p>Telefon / WhatsApp: <a href="tel:${FIRMA.telefonLink}">${esc(FIRMA.telefon)}</a><br>E-Mail: ${emailZeile}</p>
  <h2>Umsatzsteuer-ID</h2>
  <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br>${platz('DE ___ bitte ergänzen')}</p>
  <h2>Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
  <p>${esc(FIRMA.inhaber)}, Anschrift wie oben.</p>
  <h2>Verbraucherstreitbeilegung</h2>
  <p>${platz('Bitte prüfen:')} Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
  <h2>Haftung für Inhalte</h2>
  <p>Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben unberührt. Alle Angaben zu Maschinen, Preisen und Verfügbarkeit sind freibleibend und ohne Gewähr.</p>
  <h2>Haftung für Links</h2>
  <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.</p>
  <h2>Urheberrecht</h2>
  <p>Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. ${platz('Bildnachweis: Fotos agroXX techniCCenter – bitte bestätigen, dass alle Bilder selbst aufgenommen wurden oder Nutzungsrechte vorliegen.')}</p>
</div></section>`,
});

// ---------- Datenschutz ----------
const datenschutz = seite({
  datei: 'datenschutz.html',
  titel: 'Datenschutzerklärung – agroXX techniCCenter',
  beschreibung: 'Datenschutzerklärung des agroXX techniCCenter, Ennigerloh.',
  inhalt: `
<section class="abschnitt"><div class="wrap rechtstext">
  <h1>Datenschutzerklärung</h1>
  <p class="hinweisbox">Entwurf auf Basis einer reinen Informationsseite ohne Cookies, Tracking, Formulare und Karteneinbindung. Bitte vor dem Livegang prüfen lassen und die gelben Angaben ergänzen. Falls später Formulare, Karten, Videos oder Statistik hinzukommen, muss der Text angepasst werden.</p>
  <h2>1. Verantwortlicher</h2>
  <p>${esc(FIRMA.name)}, ${esc(FIRMA.inhaber)}<br>${esc(FIRMA.strasse)}, ${esc(FIRMA.plz)} ${esc(FIRMA.ort)}<br>Telefon: ${esc(FIRMA.telefon)}<br>E-Mail: ${emailZeile}</p>
  <h2>2. Hosting und Server-Logfiles</h2>
  <p>Beim Aufruf dieser Seiten verarbeitet der Server unseres Hosting-Anbieters (${platz('Anbieter eintragen')}) technisch notwendige Daten, insbesondere die IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite und den verwendeten Browser. Die Verarbeitung dient dem sicheren und stabilen Betrieb der Seite (Art. 6 Abs. 1 lit. f DSGVO). Die Logdaten werden nach ${platz('Frist eintragen, z. B. 7 Tagen')} gelöscht.</p>
  <h2>3. Cookies und Tracking</h2>
  <p>Wir setzen keine Cookies zu Werbe- oder Analysezwecken ein und verwenden keine Tracking-Dienste. Es werden keine externen Schriften und keine eingebetteten Karten geladen.</p>
  <h2>4. Kontaktaufnahme per Telefon, E-Mail oder WhatsApp</h2>
  <p>Wenn Sie uns anrufen, anschreiben oder über WhatsApp kontaktieren, verarbeiten wir Ihre Angaben (z. B. Name, Telefonnummer, Nachricht) zur Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b bzw. f DSGVO). Bei Nutzung von WhatsApp gelten zusätzlich die Datenschutzbestimmungen des Anbieters WhatsApp (Meta). Die Nutzung ist freiwillig; Sie können uns jederzeit auch telefonisch oder per E-Mail erreichen. Ihre Daten löschen wir, sobald die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
  <h2>5. Externe Links</h2>
  <p>Diese Seite enthält Links zu anderen Websites (z. B. traktorpool.de, OpenStreetMap). Erst wenn Sie einen Link anklicken, werden Daten an den jeweiligen Anbieter übermittelt. Dafür sind die Anbieter selbst verantwortlich.</p>
  <h2>6. Ihre Rechte</h2>
  <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Wenden Sie sich dazu an die oben genannte Adresse.</p>
  <h2>7. Beschwerderecht</h2>
  <p>Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren. Zuständig ist für uns die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf.</p>
  <p>Stand: Oktober 2026</p>
</div></section>`,
});

const dateien = { 'index.html': index, 'grubber.html': grubber, 'produkte.html': produkte, 'galerie.html': galerie, 'ueber-uns.html': ueberUns, 'kontakt.html': kontakt, 'impressum.html': impressum, 'datenschutz.html': datenschutz };
for (const [name, html] of Object.entries(dateien)) writeFileSync(join(ziel, name), html);
console.log(`${Object.keys(dateien).length} Seiten geschrieben, ${PRODUKTE.length} Produkte, ${GALERIEN.reduce((s, g) => s + g.bilder.length, 0)} Galeriebilder.`);
