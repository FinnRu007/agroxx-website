// Erzeugt die fertige Website im Ordner dist/ aus daten/ und bilder/original/:   node _quelle/build.mjs
// (Auf GitHub läuft das automatisch bei jeder Änderung, siehe .github/workflows/seite.yml)
import { cpSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { FIRMA, MODUS, TRAKTORPOOL, KATEGORIEN, PRODUKTE, GALERIEN, GRUBBER, WARNUNGEN, WURZEL, S, bilderVon, ERSATZBILD, dateiname, euro } from './daten.mjs';
import { verarbeiteBilder } from './bilder.mjs';

const ziel = join(WURZEL, 'dist');
const entwurf = MODUS === 'entwurf';

if (MODUS === 'live' && !FIRMA.email) throw new Error('Modus "Live": In "Firma & Kontakt" fehlt die E-Mail-Adresse (Pflichtangabe im Impressum). Bitte eintragen oder auf "Entwurf" stellen.');
if (!FIRMA.telefon) throw new Error('In "Firma & Kontakt" fehlt die Telefonnummer.');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// Bilder liegen in bilder/k (640 px) und bilder/g (1600 px); größere Anfragen nehmen die große Datei
const gross = (p) => `bilder/g/${dateiname(p)}`;
const klein = (p, w = 640) => (w > 800 ? gross(p) : `bilder/k/${dateiname(p)}`);
const platz = (t) => (entwurf ? `<mark class="platzhalter">${esc(t)}</mark>` : '');
const absaetze = (t) => t.split(/\n\s*\n/).map((a) => `<p>${esc(a.trim()).replace(/\n/g, '<br>')}</p>`).join('');
const zeile = (dt, dd) => (dd ? `<dt>${dt}</dt><dd>${dd}</dd>` : '');
const stand = new Date().toLocaleDateString('de-DE', { timeZone: 'Europe/Berlin' });

const adresseZeile = `${FIRMA.strasse}, ${FIRMA.plz} ${FIRMA.ort}`;
const routeLink = `https://www.openstreetmap.org/search?query=${encodeURIComponent(adresseZeile)}`;
const emailLink = FIRMA.email ? `<a href="mailto:${esc(FIRMA.email)}">${esc(FIRMA.email)}</a>` : platz('E-Mail-Adresse bitte ergänzen');
const oeffnung = FIRMA.oeffnungszeiten ? esc(FIRMA.oeffnungszeiten).replace(/\n/g, '<br>') : platz('Öffnungszeiten bitte ergänzen');
const waAnfrage = (t) => `${FIRMA.whatsapp}?text=${encodeURIComponent(t)}`;

const kategorienMitWare = KATEGORIEN.filter((k) => PRODUKTE.some((p) => p.kat === k.key));
const proKat = (k) => PRODUKTE.filter((p) => p.kat === k).length;
const titelZuBild = new Map(PRODUKTE.flatMap((p) => p.bilder.map((b) => [b, p.name])));
const hero = (datei, alt = '', extra = '') => {
  const p = S(datei) || ERSATZBILD;
  return p ? `<img src="${gross(p)}" alt="${esc(alt)}"${extra}>` : '';
};

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
${entwurf ? '<meta name="robots" content="noindex, nofollow">\n' : ''}<meta name="theme-color" content="#1f4a6e">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='10' fill='%231f4a6e'/%3E%3Ctext x='32' y='45' font-family='Georgia' font-size='34' font-weight='700' text-anchor='middle' fill='%23fff'%3Ea%3Ctspan fill='%23f0883a'%3EX%3C/tspan%3E%3C/text%3E%3C/svg%3E">
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<a class="skip" href="#inhalt">Zum Inhalt springen</a>
${entwurf ? '<div class="entwurf-hinweis">Entwurf zur Ansicht – Inhalte, Bilder und Rechtstexte sind noch nicht freigegeben.</div>\n' : ''}<div class="topleiste"><div class="wrap">
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
      <p>Telefon / WhatsApp: <a href="tel:${FIRMA.telefonLink}">${esc(FIRMA.telefon)}</a><br>E-Mail: ${FIRMA.email ? emailLink : platz('ergänzen')}</p>
    </div>
    <div>
      <h3>Maschinen</h3>
      <ul>${kategorienMitWare.slice(0, 6).map((k) => `<li><a href="produkte.html#${k.key}">${esc(k.titel)}</a></li>`).join('')}</ul>
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
  const wa = waAnfrage(`Guten Tag, ich interessiere mich für: ${p.name}${p.zusatz ? ` (${p.zusatz})` : ''}${p.inserat ? `, Inserat ${p.inserat}` : ''}.`);
  const bild = p.bild
    ? `<a class="bild" href="${gross(p.bild)}" data-lightbox="produkte-${p.kat}" data-caption="${esc(p.name)}"><img src="${klein(p.bild)}" alt="${esc(p.name)}" loading="lazy" width="640" height="480"></a>`
    : '<div class="bild kein-bild">Foto folgt</div>';
  const nr = p.inserat ? `Inserat-Nr. ${esc(p.inserat)}` : '';
  const preis = p.preis
    ? `<div class="preis">${esc(p.preis)} €<small>netto zzgl. 19&nbsp;% MwSt.${nr ? ` · ${nr}` : ''}</small></div>`
    : `<div class="preis preis-anfrage">Preis auf Anfrage${nr ? `<small>${nr}</small>` : ''}</div>`;
  return `<article class="karte">
  ${p.status === 'Reserviert' ? '<span class="status-marke">Reserviert</span>' : ''}${bild}
  <div class="inhalt">
    <h3>${esc(p.name)}</h3>
    ${p.zusatz ? `<p class="zusatz">${esc(p.zusatz)}</p>` : ''}
    ${p.specs.length ? `<ul>${p.specs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>` : ''}
    <div class="preiszeile">
      ${preis}
      <div class="aktionen"><a class="btn btn-orange btn-klein" href="${wa}">Per WhatsApp anfragen</a><a class="btn btn-rand-blau btn-klein" href="tel:${FIRMA.telefonLink}">Anrufen</a></div>
    </div>
  </div>
</article>`;
}

function galerieGitter(g, name, mitGross = true) {
  return `<div class="galerie">${g.bilder
    .map((b, i) => `<a href="${gross(b)}"${mitGross && i === 0 ? ' class="gross"' : ''} data-lightbox="${name}" data-caption="${esc(g.titel)}"><img src="${klein(b, i === 0 && mitGross ? 960 : 480)}" alt="${esc(g.titel)} – Bild ${i + 1}" loading="lazy"></a>`)
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

const heroKopf = (kicker, h1, p, bild, alt = '') => `<section class="hero hero-klein">
  ${hero(bild, alt)}
  <div class="wrap"><p class="kicker">${kicker}</p><h1>${h1}</h1><p>${p}</p></div>
</section>`;

// ---------- Startseite ----------
let aktuell = PRODUKTE.filter((p) => p.startseite).slice(0, 6);
if (!aktuell.length) aktuell = PRODUKTE.filter((p) => p.bild && p.preisZahl > 1000).slice(0, 6);
let mosaik = bilderVon('7373771-46402506.jpg', '7373770-46402451.jpg', '8335292-57833134.jpg', '8876326-65446972.jpg', '4995195-28536734.jpg', '8448821-59340483.jpg', '8428162-59086176.jpg', '8872720-65407764.jpg', '8335855-57840002.jpg', '8870254-65368729.jpg', '7373771-46402513.jpg', '8335292-57833135.jpg', '8876326-65446963.jpg');
mosaik = mosaik.slice(0, 1 + 4 * Math.floor((mosaik.length - 1) / 4)); // volle Zeilen im Raster
const schwerpunktBilder = bilderVon('7373771-46402562.jpg', '7373771-46402488.jpg', '7373771-46402487.jpg');

const index = seite({
  datei: 'index.html',
  titel: 'agroXX techniCCenter Ennigerloh – Grubber, Scheibeneggen, Pflüge ab Lager',
  beschreibung: 'agroXX techniCCenter in Ennigerloh: Mulchgrubber, Kurzscheibeneggen, Pflüge, Walzen und Tiefenlockerer – ständig 50 bis 80 Maschinen ab Lager. Beratung durch Thomas Schalkamp.',
  hero: `<section class="hero">
  ${hero('7373771-46402507.jpg', 'Mulchgrubber im Einsatz hinter dem Schlepper', ' fetchpriority="high"')}
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
    ${kategorienMitWare.map((k) => {
      const bildPfad = S(k.bild.split('/').pop()) || PRODUKTE.find((p) => p.kat === k.key && p.bild)?.bild;
      return `<a class="kachel" href="produkte.html#${k.key}">${bildPfad ? `<img src="${klein(bildPfad)}" alt="${esc(k.lang)}" loading="lazy">` : ''}<span class="titel"><strong>${esc(k.titel)}</strong><span>${proKat(k.key)} im Angebot</span></span></a>`;
    }).join('\n    ')}
  </div>
</div></section>

<section class="abschnitt hell"><div class="wrap schwerpunkt">
  ${schwerpunktBilder.length ? `<div class="bildreihe">
    ${schwerpunktBilder.map((b, i) => `<a href="${gross(b)}" data-lightbox="start-grubber" data-caption="Mulchgrubber TRIPLE-X Premium"><img src="${klein(b, i === 0 ? 960 : 640)}" alt="Mulchgrubber TRIPLE-X Premium" loading="lazy"></a>`).join('\n    ')}
  </div>` : ''}
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
  <div class="abschnitt-kopf"><h2>Aktuell ab Lager</h2><span class="unterstrich"></span><p>Eine Auswahl aus unserem Bestand. Den kompletten Bestand finden Sie unter <a href="produkte.html">Maschinen</a>.</p></div>
  <div class="karten">${aktuell.map(karte).join('\n')}</div>
  <div class="btn-reihe"><a class="btn btn-blau" href="produkte.html">Alle ${PRODUKTE.length} Maschinen ansehen</a></div>
</div></section>

${mosaik.length >= 5 ? `<section class="abschnitt hell"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Einblicke</h2><span class="unterstrich"></span><p>So sehen unsere Maschinen aus. Ein Klick auf ein Bild vergrößert es.</p></div>
  <div class="galerie">${mosaik.map((b, i) => `<a href="${gross(b)}"${i === 0 ? ' class="gross"' : ''} data-lightbox="start-mosaik" data-caption="${esc(titelZuBild.get(b) || FIRMA.name)}"><img src="${klein(b, i === 0 ? 960 : 480)}" alt="${esc(titelZuBild.get(b) || FIRMA.name)}" loading="lazy"></a>`).join('')}</div>
  <div class="btn-reihe"><a class="btn btn-rand-blau" href="galerie.html">Alle Bilder ansehen</a></div>
</div></section>` : ''}

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
      ${zeile('Öffnungszeiten', FIRMA.oeffnungszeiten || entwurf ? oeffnung : '')}
    </dl>
  </div>
</div></section>
${kontaktBand}`,
});

// ---------- Grubber ----------
const triple = PRODUKTE.filter((p) => p.kat === 'grubber' && /TRIPLE-X/i.test(p.name));
const speedline = PRODUKTE.find((p) => /Speedline/i.test(p.name));
const grubberGalerie = [...triple].sort((a, b) => b.bilder.length - a.bilder.length)[0];
const grubberKopf = bilderVon('7373771-46402506.jpg', '7373771-46402489.jpg', '7373771-46402491.jpg');
const sonder = GRUBBER.sonderausruestung;
const grubber = seite({
  datei: 'grubber.html',
  titel: 'Mulchgrubber TRIPLE-X Premium – agroXX techniCCenter Ennigerloh',
  beschreibung: 'Mulchgrubber TRIPLE-X Premium von agroXX: 3,0 bis 4,8 m Arbeitsbreite, Dachringwalze, Flügelschare, für Schlepper von 140 bis 300 PS. Ab Lager lieferbar.',
  hero: `<section class="hero hero-klein">
  ${hero('7373771-46402513.jpg', 'Mulchgrubber TRIPLE-X Premium')}
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
  ${grubberKopf.length ? `<div class="bildreihe">
    ${grubberKopf.map((b, i) => `<a href="${gross(b)}" data-lightbox="grubber-kopf" data-caption="Mulchgrubber TRIPLE-X Premium"><img src="${klein(b, i === 0 ? 960 : 640)}" alt="Mulchgrubber TRIPLE-X Premium" loading="lazy"></a>`).join('\n    ')}
  </div>` : ''}
</div></section>

${triple.length ? `<section class="abschnitt" id="modelle"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Modelle &amp; Preise</h2><span class="unterstrich"></span><p>Das vollständige Mulchgrubberprogramm gibt es von 3,0 bis 4,8 m Arbeitsbreite – mit Abscherschraubensicherung oder voll gefedert.</p></div>
  <div class="tabelle-scroll"><table class="tabelle">
    <thead><tr><th>Modell</th><th>Ausführung</th><th>Arbeitsbreite</th><th class="re">Preis netto</th></tr></thead>
    <tbody>${triple.map((p) => `<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.zusatz)}${p.status === 'Reserviert' ? ' <em>(reserviert)</em>' : ''}</td><td>${esc(p.breite)}</td><td class="re"><strong>${p.preis ? `${esc(p.preis)} €` : 'auf Anfrage'}</strong></td></tr>`).join('')}</tbody>
  </table></div>
  <p style="margin-top:1em;font-size:.95rem;color:var(--text-leise)">Preise zzgl. 19&nbsp;% MwSt., Stand ${stand}. Weitere Ausführungen (z. B. voll gefedert) auf Anfrage.</p>

  ${sonder.length || speedline ? `<div class="zweispaltig" style="margin-top:44px">
    ${sonder.length ? `<div class="karte-weiss">
      <h3>Sonderausrüstung gegen Mehrpreis</h3>
      <table class="tabelle" style="border:0"><tbody>
        ${sonder.map((s) => `<tr><td>${esc(s.bezeichnung)}</td><td class="re"><strong>${s.preis ? `${euro(s.preis)} €` : 'auf Anfrage'}</strong></td></tr>`).join('\n        ')}
      </tbody></table>
      <p style="margin:.8em 0 0;font-size:.92rem;color:var(--text-leise)">Alle Preise netto zzgl. 19&nbsp;% MwSt.</p>
    </div>` : ''}
    ${speedline ? `<div class="karte-weiss">
      <h3>Auch interessant: ${esc(speedline.name)}</h3>
      ${speedline.bild ? `<img class="rahmenbild" style="margin-bottom:14px" src="${klein(speedline.bild, 800)}" alt="${esc(speedline.name)}" loading="lazy">` : ''}
      <p>${[speedline.zusatz, ...speedline.specs].filter(Boolean).map(esc).join(' · ')}</p>
      <p style="margin:0"><strong>${speedline.preis ? `${esc(speedline.preis)} € netto` : 'Preis auf Anfrage'}</strong> · <a href="produkte.html#grubber">Zum Angebot</a></p>
    </div>` : ''}
  </div>` : ''}
</div></section>` : ''}

${grubberGalerie && grubberGalerie.bilder.length >= 4 ? `<section class="abschnitt hell"><div class="wrap">
  <div class="abschnitt-kopf"><h2>Bilder vom TRIPLE-X</h2><span class="unterstrich"></span><p>Ein Klick auf ein Bild vergrößert es. Mit den Pfeiltasten blättern Sie durch alle Bilder.</p></div>
  ${galerieGitter({ titel: grubberGalerie.zusatz ? `${grubberGalerie.name} – ${grubberGalerie.zusatz}` : grubberGalerie.name, bilder: grubberGalerie.bilder }, 'grubber-galerie')}
  <div class="btn-reihe"><a class="btn btn-rand-blau" href="galerie.html">Weitere Bilder ansehen</a></div>
</div></section>` : ''}
${kontaktBand}`,
});

// ---------- Maschinen ----------
const produkte = seite({
  datei: 'produkte.html',
  titel: 'Maschinen und Preise – agroXX techniCCenter Ennigerloh',
  beschreibung: `Alle Maschinen im Überblick: Mulchgrubber, Kurzscheibeneggen, Tiefenlockerer, Pflüge, Walzen, Kreiseleggen, Kipper und Reifen mit Preisen (Stand ${stand}).`,
  hero: `<section class="hero hero-klein">
  ${hero('8335292-57833137.jpg', 'Maschinenbestand')}
  <div class="wrap"><p class="kicker">Maschinenbestand</p><h1>Unsere Maschinen</h1><p>${PRODUKTE.length} Maschinen und Teile im Angebot. Alle Preise netto – fragen Sie gern nach Vorführgeräten und Sonderkonditionen.</p></div>
</section>
<nav class="kat-nav" aria-label="Maschinenkategorien"><div class="wrap"><ul>${kategorienMitWare.map((k) => `<li><a href="#${k.key}">${esc(k.titel)} (${proKat(k.key)})</a></li>`).join('')}</ul></div></nav>`,
  inhalt: `
<section class="abschnitt" style="padding-top:36px"><div class="wrap">
  <p class="hinweisbox">Alle Preise in Euro netto zzgl. 19&nbsp;% MwSt., Stand ${stand}. Angebot freibleibend, Zwischenverkauf, Irrtümer und Änderungen vorbehalten. Alle Angaben ohne Gewähr. Bitte nennen Sie bei Rückfragen die Inserat-Nummer, falls angegeben.</p>
  ${kategorienMitWare.map((k) => `<section class="kat-block" id="${k.key}">
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
  hero: heroKopf('Bilder', 'Unsere Maschinen im Bild', `${GALERIEN.reduce((s, x) => s + x.bilder.length, 0)} Fotos aus unserem Bestand. Ein Klick vergrößert das Bild.`, '8870254-65368730.jpg'),
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
  hero: heroKopf('Über uns', 'agroXX techniCCenter', 'Landtechnik für die Bodenbearbeitung – persönlich, direkt und ab Lager.', '4995195-28536732.jpg'),
  inhalt: `
<section class="abschnitt hell"><div class="wrap ${FIRMA.foto || entwurf ? 'zweispaltig' : 'rechtstext'}">
  <div>
    <h2>Wer wir sind</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Das agroXX techniCCenter ist die Anlaufstelle für Landwirte, die robuste Maschinen für die Bodenbearbeitung suchen. Unser Schwerpunkt sind Mulchgrubber, Kurzscheibeneggen, Cambridgewalzen, Großfederzinkeneggen und Tiefenlockerer.</p>
    <p>Ständig stehen 50 bis 80 verschiedene Maschinen ab Lager sofort für Sie bereit. Dazu kommen Pflüge, Kreiseleggen, Muldenkipper, Schlepperreifen und Verschleißteile.</p>
    <p>Inhaber und Ansprechpartner ist <strong>Thomas Schalkamp</strong>.</p>
    ${FIRMA.ueberUns ? absaetze(FIRMA.ueberUns) : `<p>${platz('Hier kann Thomas in eigenen Worten die Firmengeschichte erzählen: Gründung, Werdegang, was ihm wichtig ist. (Im Formular unter „Firma & Kontakt“ → „Über uns“.)')}</p>`}
  </div>
  ${FIRMA.foto ? `<a href="${gross(FIRMA.foto)}" data-lightbox="ueber-uns" data-caption="${esc(FIRMA.name)}"><img class="rahmenbild" src="${klein(FIRMA.foto, 960)}" alt="${esc(FIRMA.name)}" loading="lazy"></a>` : entwurf ? '<div class="platzhalter-box" role="img" aria-label="Platzhalter für ein Foto">Platz für ein Foto<br>von Thomas Schalkamp<br>oder dem Betriebsgelände</div>' : ''}
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
  ${FIRMA.marken.length ? `<div>
    <h2>Marken im Programm</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Neben den agroXX-Maschinen führen wir Maschinen und Teile weiterer Hersteller.</p>
    <ul class="chips">${FIRMA.marken.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
  </div>` : ''}
  ${FIRMA.sprachen.length ? `<div>
    <h2>Wir sprechen Ihre Sprache</h2><span class="unterstrich"></span>
    <p style="margin-top:1em">Auch Kunden aus dem Ausland sind bei uns richtig. Thomas Schalkamp spricht:</p>
    <ul class="chips">${FIRMA.sprachen.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
  </div>` : ''}
</div></section>
${kontaktBand}`,
});

// ---------- Kontakt ----------
const kontakt = seite({
  datei: 'kontakt.html',
  titel: 'Kontakt und Anfahrt – agroXX techniCCenter Ennigerloh',
  beschreibung: `Kontakt zum agroXX techniCCenter: ${adresseZeile}, Telefon ${FIRMA.telefon}, WhatsApp.`,
  hero: heroKopf('Kontakt', 'So erreichen Sie uns', 'Am schnellsten per Telefon oder WhatsApp. Gern auch direkt bei uns vorbeikommen.', '8448821-59340483.jpg'),
  inhalt: `
<section class="abschnitt"><div class="wrap zweispaltig">
  <div class="karte-weiss">
    <h2 style="font-size:1.6rem">${esc(FIRMA.name)}</h2>
    <dl class="daten">
      <dt>Ansprechpartner</dt><dd>${esc(FIRMA.inhaber)}</dd>
      <dt>Anschrift</dt><dd>${esc(FIRMA.strasse)}<br>${esc(FIRMA.plz)} ${esc(FIRMA.ort)}</dd>
      <dt>Telefon / WhatsApp</dt><dd><a href="tel:${FIRMA.telefonLink}" style="font-size:1.35rem;font-weight:700">${esc(FIRMA.telefon)}</a></dd>
      ${zeile('E-Mail', FIRMA.email || entwurf ? emailLink : '')}
      ${zeile('Öffnungszeiten', FIRMA.oeffnungszeiten || entwurf ? oeffnung : '')}
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
const rechtsangaben = [FIRMA.rechtsform, FIRMA.handelsregister].filter(Boolean).map(esc).join('<br>');
const impressum = seite({
  datei: 'impressum.html',
  titel: 'Impressum – agroXX techniCCenter',
  beschreibung: 'Impressum des agroXX techniCCenter, Thomas Schalkamp, Ennigerloh.',
  inhalt: `
<section class="abschnitt"><div class="wrap rechtstext">
  <h1>Impressum</h1>
  ${entwurf ? '<p class="hinweisbox">Entwurf: Die gelb markierten Angaben muss Thomas Schalkamp vor der Veröffentlichung ergänzen bzw. prüfen (Formular „Firma &amp; Kontakt“). Rechtstexte bitte vor dem Livegang rechtlich prüfen lassen.</p>' : ''}
  <h2>Angaben gemäß § 5 DDG</h2>
  <p><strong>${esc(FIRMA.name)}</strong><br>Inhaber: ${esc(FIRMA.inhaber)}<br>${esc(FIRMA.strasse)}<br>${esc(FIRMA.plz)} ${esc(FIRMA.ort)}<br>Deutschland</p>
  ${rechtsangaben ? `<p>${rechtsangaben}</p>` : entwurf ? `<p>${platz('Rechtsform bitte prüfen / ergänzen, z. B. Einzelunternehmen')}<br>${platz('Falls vorhanden: Handelsregister, Registergericht und Registernummer')}</p>` : ''}
  <h2>Kontakt</h2>
  <p>Telefon / WhatsApp: <a href="tel:${FIRMA.telefonLink}">${esc(FIRMA.telefon)}</a><br>E-Mail: ${emailLink}</p>
  ${FIRMA.ustId || entwurf ? `<h2>Umsatzsteuer-ID</h2>
  <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br>${FIRMA.ustId ? esc(FIRMA.ustId) : platz('DE ___ bitte ergänzen (falls vorhanden)')}</p>` : ''}
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
  ${entwurf ? '<p class="hinweisbox">Entwurf auf Basis einer reinen Informationsseite ohne Cookies, Tracking, Formulare und Karteneinbindung. Bitte vor dem Livegang rechtlich prüfen lassen. Falls später Formulare, Karten, Videos oder Statistik hinzukommen, muss der Text angepasst werden.</p>' : ''}
  <h2>1. Verantwortlicher</h2>
  <p>${esc(FIRMA.name)}, ${esc(FIRMA.inhaber)}<br>${esc(FIRMA.strasse)}, ${esc(FIRMA.plz)} ${esc(FIRMA.ort)}<br>Telefon: ${esc(FIRMA.telefon)}<br>E-Mail: ${emailLink}</p>
  <h2>2. Hosting und Server-Logfiles</h2>
  <p>Diese Website wird über den Dienst GitHub Pages der GitHub Inc. (88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, USA) bereitgestellt. Beim Aufruf verarbeitet GitHub technisch notwendige Daten, insbesondere die IP-Adresse, Datum und Uhrzeit, die aufgerufene Seite und den verwendeten Browser, um die Seite auszuliefern und abzusichern (Art. 6 Abs. 1 lit. f DSGVO). Dabei kann eine Übermittlung von Daten in die USA stattfinden. Näheres regelt die Datenschutzerklärung von GitHub. ${platz('Bitte rechtlich prüfen: Drittlandübermittlung und Vertrag mit dem Hosting-Anbieter.')}</p>
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
  <p>Stand: ${stand}</p>
</div></section>`,
});

// ---------- Schreiben ----------
// alles außer dem Bilder-Zwischenspeicher (dist/bilder) wird neu geschrieben
mkdirSync(ziel, { recursive: true });
for (const n of readdirSync(ziel).filter((n) => n !== 'bilder')) rmSync(join(ziel, n), { recursive: true, force: true });
cpSync(join(WURZEL, 'css'), join(ziel, 'css'), { recursive: true });
cpSync(join(WURZEL, 'js'), join(ziel, 'js'), { recursive: true });
const dateien = { 'index.html': index, 'grubber.html': grubber, 'produkte.html': produkte, 'galerie.html': galerie, 'ueber-uns.html': ueberUns, 'kontakt.html': kontakt, 'impressum.html': impressum, 'datenschutz.html': datenschutz };
for (const [name, html] of Object.entries(dateien)) writeFileSync(join(ziel, name), html);
writeFileSync(join(ziel, 'robots.txt'), entwurf ? 'User-agent: *\nDisallow: /\n' : 'User-agent: *\nAllow: /\n');

const b = await verarbeiteBilder(ziel);
console.log(`Modus: ${entwurf ? 'Entwurf (für Suchmaschinen gesperrt)' : 'Live'} · ${Object.keys(dateien).length} Seiten · ${PRODUKTE.length} Maschinen · ${GALERIEN.reduce((s, x) => s + x.bilder.length, 0)} Galeriebilder · Bilder: ${b.neu} neu verkleinert, ${b.uebersprungen} unverändert`);
for (const w of WARNUNGEN) console.warn('Hinweis: ' + w);
if (b.fehler.length) { console.error('Bilder, die nicht verarbeitet werden konnten:\n' + b.fehler.join('\n')); process.exitCode = 1; }
