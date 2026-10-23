// Alle Inhalte der Seite an einer Stelle. Quelle: traktorpool.de/agroxx (Stand 23.10.2026)

export const FIRMA = {
  name: 'agroXX techniCCenter',
  inhaber: 'Thomas Schalkamp',
  strasse: 'Büttrup 13',
  plz: '59320',
  ort: 'Ennigerloh',
  telefon: '+49 170 7324661',
  telefonLink: '+491707324661',
  whatsapp: 'https://wa.me/491707324661',
  email: null, // TODO: E-Mail-Adresse von Thomas
  sprachen: ['Deutsch', 'Englisch', 'Französisch', 'Spanisch', 'Italienisch', 'Portugiesisch', 'Polnisch', 'Rumänisch', 'Bulgarisch', 'Ungarisch', 'Japanisch'],
  marken: ['agroXX', 'Quivogne', 'Escudero', 'Pronar', 'Michelin', 'Alliance', 'Ascenso'],
  stand: '23.10.2026',
};

export const TRAKTORPOOL = 'https://www.traktorpool.de/agroxx/';
export const BASE = 'https://www.traktorpool.de';

export const KATEGORIEN = [
  { key: 'grubber', titel: 'Grubber', lang: 'Mulchgrubber & Federzinkeneggen', text: 'Mulchgrubber TRIPLE-X von 3,0 bis 4,8 m und die Großfederzinkenegge Speedline.', bild: '/media/3771/7373771/46402507/1695327669.jpg' },
  { key: 'scheibeneggen', titel: 'Kurzscheibeneggen', lang: 'Kurzscheibeneggen AVATERRA', text: 'Kurzscheibeneggen mit 4,5 bis 5,0 m Arbeitsbreite, mit Dachring- oder Krumenpackerwalze.', bild: '/media/5292/8335292/57833137/1750960664.jpg' },
  { key: 'tiefenlockerer', titel: 'Tiefenlockerer', lang: 'Tiefenlockerer NITRO-X', text: 'Tiefenlockerer von 3,0 bis 6,0 m, Arbeitstiefe bis 55 cm.', bild: '/media/6326/8876326/65446972/1784202633.jpg' },
  { key: 'pfluege', titel: 'Pflüge', lang: 'Drehpflüge ESCUDERO', text: 'Dreh-Schälpflüge mit 6 bis 10 Scharen, wahlweise mit hydropneumatischer Steinsicherung.', bild: '/media/5195/4995195/28536732/1573373573.jpg' },
  { key: 'walzen', titel: 'Walzen & Packer', lang: 'Walzen & Packer', text: 'Cambridgewalzen, Frontpacker und Messerwalze, bis 9,50 m Arbeitsbreite.', bild: '/media/8162/8428162/59086179/1757064418.jpg' },
  { key: 'kreiseleggen', titel: 'Kreiseleggen', lang: 'Kreiseleggen MEKFOLD', text: 'Klappbare Kreiseleggen mit 6,0 m Arbeitsbreite und Zahnpackerwalze.', bild: '/media/8886/8448886/59341366/1758312677.jpg' },
  { key: 'kipper', titel: 'Muldenkipper', lang: 'Muldenkipper', text: 'Wannen- und Halfpipe-Muldenkipper mit 11,7 bis 15 t Nutzlast.', bild: '/media/5855/8335855/57839995/1751011487.jpg' },
  { key: 'reifen', titel: 'Schlepperreifen', lang: 'Schlepperreifen', text: 'Schlepperreifen verschiedener Hersteller, teils als begrenzte Sonderposten.', bild: '/media/8657/2948657/51202157/1720114747.jpg' },
  { key: 'verschleiss', titel: 'Verschleißteile', lang: 'Verschleißteile', text: 'Hohlscheiben und Carbid-Meißelspitzen, passend für viele Fabrikate.', bild: '/media/3206/4713206/36295899/1621159082.jpg' },
];

// preis: netto in Euro, wie auf traktorpool.de
export const PRODUKTE = [
  // --- Grubber
  { id: '4269391', kat: 'grubber', name: 'TRIPLE-X 3.0-10 Mulchgrubber Premium', zusatz: 'mit Dachringwalze', bild: '/media/9391/4269391/46402095/1695320660.jpg', preis: '7.900', specs: ['Baujahr 2025', 'Arbeitsbreite 3,0 m · 10 Zinken', 'Arbeitstiefe bis 30 cm', 'Flügelschare, Steinsicherung'] },
  { id: '7453016', kat: 'grubber', name: 'TRIPLE-X 3.0-13 Mulchgrubber Premium', zusatz: 'mit Dachringwalze', bild: '/media/3016/7453016/47208305/1699744284.jpg', preis: '8.400', specs: ['Baujahr 2026', 'Arbeitsbreite 3,0 m · 13 Zinken', 'Arbeitstiefe bis 30 cm', 'Flügelschare, Steinsicherung'] },
  { id: '8870251', kat: 'grubber', name: 'TRIPLE-X 4.0-13 Mulchgrubber Premium', zusatz: 'mit Schleppzinken 70 × 12 mm und Rohrstabwalze', bild: '/media/0251/8870251/65368671/1783777138.jpg', preis: '9.900', specs: ['Baujahr 2023', 'Arbeitsbreite 4,0 m · 13 Zinken', 'Arbeitstiefe bis 30 cm', 'klappbar, Beleuchtung, Steinsicherung'] },
  { id: '8870254', kat: 'grubber', name: 'TRIPLE-X 4.0-13 Mulchgrubber Premium', zusatz: 'mit STS-U-Ringwalze · Demomaschine', bild: '/media/0254/8870254/65368730/1783779276.jpg', preis: '11.750', specs: ['Baujahr 2025 · Vorführmaschine', 'Arbeitsbreite 4,0 m · 13 Zinken', 'Arbeitstiefe bis 30 cm', 'klappbar, Beleuchtung, Steinsicherung'] },
  { id: '7373771', kat: 'grubber', name: 'TRIPLE-X 4.0-13 Mulchgrubber Premium', zusatz: 'mit Dachringwalze', bild: '/media/3771/7373771/46402562/1695330048.jpg', preis: '13.700', specs: ['Baujahr 2025', 'Arbeitsbreite 4,0 m · 13 Zinken', 'Arbeitstiefe bis 30 cm', 'klappbar, Beleuchtung, Steinsicherung'] },
  { id: '7373770', kat: 'grubber', name: 'TRIPLE-X 4.8-16 Mulchgrubber Premium', zusatz: 'mit Dachringwalze', bild: '/media/3770/7373770/47166260/1699543925.jpg', preis: '16.500', specs: ['Baujahr 2025', 'Arbeitsbreite 4,8 m · 16 Zinken', 'Arbeitstiefe bis 30 cm', 'klappbar, Beleuchtung, Steinsicherung'] },
  { id: '8872720', kat: 'grubber', name: 'Speedline 6.0 XC Großfederzinkenegge', zusatz: 'mit Herkuleszinken 70 × 12 mm', bild: '/media/2720/8872720/65407772/1784058399.jpg', preis: '11.900', specs: ['Baujahr 2026', 'Arbeitsbreite 6,0 m', 'Arbeitstiefe bis 12 cm', 'Rohrstabwalze, klappbar, Steinsicherung'] },

  // --- Kurzscheibeneggen
  { id: '8335352', kat: 'scheibeneggen', name: 'AVATERRA 5.0 K-XL', zusatz: 'Maschine in Vollausstattung · Sonder-Einführungspreis', bild: '/media/5352/8335352/57833815/1750972698.jpg', preis: '32.500', specs: ['Baujahr 2024', 'Arbeitsbreite 5,0 m · Scheiben Ø 560 mm', 'Krumenpackerwalze', 'Transportstützrad, klappbar, Beleuchtung'] },
  { id: '8335331', kat: 'scheibeneggen', name: 'AVATERRA 4.5 Gen4 HD', zusatz: 'mit Dachringwalze', bild: '/media/5331/8335331/57833592/1750965016.jpg', preis: '16.900', specs: ['Baujahr 2025', 'Arbeitsbreite 4,5 m · Scheiben Ø 560 mm', 'Dachringwalze', 'klappbar, Beleuchtung'] },
  { id: '8335292', kat: 'scheibeneggen', name: 'AVATERRA 5.0 Gen4', zusatz: 'ab Lager sofort verfügbar', bild: '/media/5292/8335292/57833131/1750960654.jpg', preis: '17.900', specs: ['Baujahr 2025', 'Arbeitsbreite 5,0 m · Scheiben Ø 560 mm', 'Dachringwalze', 'klappbar, Beleuchtung'] },

  // --- Tiefenlockerer
  { id: '8880350', kat: 'tiefenlockerer', name: 'NITRO-X PARAPLOW-HD 6.0-10', zusatz: 'aufgepanzerte Spitzen, Stützräder, hydraulisches Hubwerk Kat. 3 hinten', bild: '/media/0350/8880350/65497670/1784391610.jpg', preis: '18.400', specs: ['Baujahr 2026', 'Arbeitsbreite 6,0 m · 10 Zinken', 'Arbeitstiefe bis 55 cm', 'klappbar, Beleuchtung, Steinsicherung'] },
  { id: '8876387', kat: 'tiefenlockerer', name: 'NITRO-X 3.0-4 Flachscharsystem', zusatz: '4 Füße à 380 mm breit, hydraulisches Hubwerk 4000 kg', bild: '/media/6387/8876387/65447301/1784204748.jpg', preis: '5.880', specs: ['Baujahr 2026', 'Arbeitsbreite 3,0 m · 4 Zinken', 'Arbeitstiefe bis 45 cm', 'Flügelschare, Steinsicherung'] },
  { id: '8876326', kat: 'tiefenlockerer', name: 'NITRO-X PARAPLOW-HD 3.0-6', zusatz: 'hydraulisches Hubwerk 4000 kg', bild: '/media/6326/8876326/65446967/1784202617.jpg', preis: '6.890', specs: ['Baujahr 2026', 'Arbeitsbreite 3,0 m · 6 Zinken', 'Arbeitstiefe bis 55 cm', 'Zapfwellendurchtrieb, Steinsicherung'] },

  // --- Pflüge
  { id: '7257845', kat: 'pfluege', name: 'ESCUDERO CHRF 6 Schar', zusatz: 'Ecologic Onland Dreh-Schälpflug', bild: '/media/7845/7257845/45194671/1688142711.jpg', preis: '13.900', specs: ['Baujahr 2025', 'Arbeitsbreite 2,22 m · Furchenbreite 37 cm', 'Körperabstand 65 cm · Rahmenhöhe 70 cm', 'Steinsicherung'] },
  { id: '4995116', kat: 'pfluege', name: 'ESCUDERO CHRF 7 Schar', zusatz: 'Ecologic Onland Dreh-Schälpflug', bild: '/media/5116/4995116/28536172/1573372991.jpg', preis: '14.900', specs: ['Baujahr 2025', 'Arbeitsbreite 2,59 m · Furchenbreite 37 cm', 'Körperabstand 65 cm · Rahmenhöhe 70 cm', 'Steinsicherung'] },
  { id: '4995195', kat: 'pfluege', name: 'ESCUDERO CHRF 8 Schar', zusatz: 'Ecologic Onland Dreh-Schälpflug', bild: '/media/5195/4995195/28536746/1573373652.jpg', preis: '16.500', specs: ['Baujahr 2025', 'Arbeitsbreite 2,96 m · Furchenbreite 37 cm', 'Körperabstand 65 cm · Rahmenhöhe 70 cm', 'Steinsicherung'] },
  { id: '5020356', kat: 'pfluege', name: 'ESCUDERO CHRF 9 Schar', zusatz: 'Ecologic Onland Dreh-Schälpflug', bild: '/media/0356/5020356/28720868/1574423730.jpg', preis: '17.500', specs: ['Baujahr 2025', 'Arbeitsbreite 3,33 m · Furchenbreite 37 cm', 'Körperabstand 65 cm · Rahmenhöhe 70 cm', 'Steinsicherung'] },
  { id: '6495283', kat: 'pfluege', name: 'ESCUDERO CHRF 10 Schar', zusatz: 'Ecologic Onland Dreh-Schälpflug', bild: '/media/5283/6495283/39246017/1645520311.jpg', preis: '18.500', specs: ['Baujahr 2025', 'Arbeitsbreite 3,70 m · Furchenbreite 37 cm', 'Körperabstand 65 cm · Rahmenhöhe 70 cm', 'Steinsicherung'] },
  { id: '7453367', kat: 'pfluege', name: 'ESCUDERO CHRH 7 Schar', zusatz: 'mit hydropneumatischer Steinsicherung', bild: '/media/3367/7453367/47210279/1699777201.jpg', preis: '19.600', specs: ['Baujahr 2025', 'Arbeitsbreite 2,59 m · Furchenbreite 37 cm', 'Körperabstand 65 cm · Rahmenhöhe 70 cm', 'Hydropneumatische Steinsicherung'] },

  // --- Walzen & Packer
  { id: '8448825', kat: 'walzen', name: 'agroXX SlashCut Tandem-Messerwalze 5,0 m', zusatz: 'Hydro mit Lenkbock', bild: '/media/8825/8448825/59340533/1758304878.jpg', preis: '11.500', specs: ['Baujahr 2022 · Frontanbau', 'Arbeitsbreite 5,0 m · Ø 460 mm', 'Gewicht 1.730 kg', 'klappbar, Beleuchtung'] },
  { id: '8428170', kat: 'walzen', name: 'Quivogne ROLLFIRST 8,20 m', zusatz: '520-mm-Ringe · XL-Bereifung · sofort ab Lager', bild: '/media/8170/8428170/59086229/1757064772.jpg', preis: '13.900', specs: ['Baujahr 2025 · Cambridgewalze', 'Arbeitsbreite 8,20 m · Ø 520 mm', 'Gewicht 3.800 kg', 'klappbar, Beleuchtung'] },
  { id: '8428157', kat: 'walzen', name: 'Quivogne ROLLMAX 8,30 m', zusatz: '620-mm-Ringe · Pendelausgleich · sofort lieferbar', bild: '/media/8157/8428157/59086111/1757063800.jpg', preis: '19.500', specs: ['Baujahr 2025 · Cambridgewalze', 'Arbeitsbreite 8,30 m · Ø 620 mm', 'Gewicht 4.800 kg', 'klappbar, Beleuchtung'] },
  { id: '8428162', kat: 'walzen', name: 'Quivogne ROLLMAX 9,50 m', zusatz: '620-mm-Ringe · Pendelausgleich · sofort lieferbar', bild: '/media/8162/8428162/59086182/1757064424.jpg', preis: '22.500', specs: ['Baujahr 2025 · Cambridgewalze', 'Arbeitsbreite 9,50 m · Ø 620 mm', 'Gewicht 5.700 kg', 'klappbar, Beleuchtung'] },
  { id: '8448821', kat: 'walzen', name: 'agroXX FRONTPACKER 6,0 m', zusatz: 'Hydro mit Lenkbock · 700-mm-Ringe', bild: '/media/8821/8448821/59340481/1758303049.jpg', preis: '11.500', specs: ['Baujahr 2025 · Frontpacker', 'Arbeitsbreite 6,0 m · Ø 700 mm', 'klappbar, Beleuchtung'] },
  { id: '8448819', kat: 'walzen', name: 'agroXX MAXXIMUS Cambridge-Frontpacker 3,0 m', zusatz: 'mit Lenkbock · 525-mm-Ringe', bild: '/media/8819/8448819/59340434/1758301622.jpg', preis: '3.550', specs: ['Baujahr 2025 · Frontpacker', 'Arbeitsbreite 3,0 m · Ø 525 mm'] },

  // --- Kreiseleggen
  { id: '8448886', kat: 'kreiseleggen', name: 'Quivogne MEKFOLD 240-600 Hydro Plus', zusatz: 'hydraulische Tiefen- und Planierschienenverstellung', bild: '/media/8886/8448886/59341366/1758312677.jpg', preis: '28.900', specs: ['Baujahr 2025', 'Arbeitsbreite 6,0 m', '550-mm-Zahnpackerwalze', 'Walterscheid-Gelenkwelle mit Nockenschaltkupplung'] },
  { id: '8448881', kat: 'kreiseleggen', name: 'Quivogne MEKFOLD 260-600', zusatz: 'mit Zahnpackerwalze', bild: '/media/8881/8448881/59341321/1758311405.jpg', preis: '27.900', specs: ['Baujahr 2025', 'Arbeitsbreite 6,0 m', '500-mm-Zahnpackerwalze', 'Walterscheid-Gelenkwelle mit Nockenschaltkupplung'] },

  // --- Muldenkipper
  { id: '8335855', kat: 'kipper', name: 'Pronar T669XL Wannen-Muldenkipper', zusatz: 'mit Aufsätzen und Bereifung 600/55-22.5', bild: '/media/5855/8335855/57840000/1751011491.jpg', preis: '32.750', specs: ['Baujahr 2024', 'Ladevolumen 30,3 m³ · Nutzlast 15 t', 'Druckluftbremse · bis 40 km/h', 'automatische Rückwand, hydraulische Bordwandverriegelung'] },
  { id: '8335816', kat: 'kipper', name: 'Pronar T679M Halfpipe-Muldenkipper', zusatz: 'mit Aufsätzen und Bereifung 500/60R22.5', bild: '/media/5816/8335816/57839758/1751009273.jpg', preis: '28.900', specs: ['Baujahr 2024', 'Ladevolumen 19,45 m³ · Nutzlast 11,7 t', 'Druckluftbremse · bis 40 km/h', 'automatische Rückwand, hydraulische Bordwandverriegelung'] },

  // --- Reifen
  { id: '2948657', kat: 'reifen', name: 'Michelin MachXBIB 650/85R38 173B', zusatz: 'Neureifen · Sonderposten, begrenzte Stückzahl', bild: '/media/8657/2948657/51202157/1720114747.jpg', preis: '2.900', specs: ['Radial · 38 Zoll', 'Profil MachXBib · DOT 4722'] },
  { id: '7969618', kat: 'reifen', name: 'Michelin MachXBIB 600/70R28 157D', zusatz: 'Neureifen · Sonderposten, begrenzte Stückzahl', bild: '/media/9618/7969618/52839338/1727973703.jpg', preis: '1.550', specs: ['Radial · 28 Zoll', 'Profil MachXBib'] },
  { id: '2948219', kat: 'reifen', name: 'Alliance 600/70R28 161D Agri Star II', zusatz: 'High Power Tire', bild: '/media/8219/2948219/45194910/1688152963.jpg', preis: '898', specs: ['Radial · 28 Zoll', 'Baujahr 2024'] },
  { id: '7619346', kat: 'reifen', name: 'Ascenso 600/65R28 154D XLR 880', zusatz: 'High Speed', bild: '/media/9346/7619346/49002696/1710252016.jpg', preis: '839', specs: ['Radial · 28 Zoll', 'Baujahr 2024'] },

  // --- Verschleißteile
  { id: '4713206', kat: 'verschleiss', name: 'agroXX Meißelspitze CARBID, plasmabeschichtet', zusatz: 'passend für agroXX, Quivogne, Rabe, Saphir, Mandam, Bremer', bild: '/media/3206/4713206/36295899/1621159082.jpg', preis: '135', specs: ['60 × 40 × 590 mm', '80 mm Abstand'] },
  { id: '2455856', kat: 'verschleiss', name: 'agroXX Avaterra Hohlscheibe 560 mm, gezackt', zusatz: 'passend für agroXX, Mandam, Bremer, Saphir, Meyer', bild: '/media/5856/2455856/36377214/1621792438.jpg', preis: '54', specs: ['Ø 560 mm · 4 Loch', 'Lochkreis 115 mm'] },
  { id: '2020720', kat: 'verschleiss', name: 'agroXX Avaterra Hohlscheibe 610 mm, gezackt', zusatz: 'passend für agroXX, Mandam, Bremer, Saphir, Meyer', bild: '/media/0720/2020720/36296431/1621172975.jpg', preis: '74', specs: ['Ø 610 mm · 4 Loch', 'Lochkreis 115 mm'] },
];

// Bildergalerien: [Basis, Titel, Bilder 'id/datei']
const g = (base, titel, liste) => ({ titel, bilder: liste.map((s) => `${base}/${s}.jpg`) });

export const GALERIEN = [
  g('/media/3771/7373771', 'Mulchgrubber TRIPLE-X 4.0-13 Premium mit Dachringwalze', [
    '46402562/1695330048', '46402507/1695327669', '46402506/1695327667', '46402488/1695327645', '46402494/1695327653', '46402513/1695327676',
    '46402485/1695327641', '46402486/1695327643', '46402487/1695327644', '46402489/1695327647', '46402490/1695327648', '46402491/1695327649',
    '46402492/1695327650', '46402515/1695327678', '46402510/1695327672', '46402511/1695327673', '46402495/1695327654', '46402496/1695327655',
    '46402497/1695327656', '46402498/1695327657', '46402499/1695327659', '46402500/1695327660', '46402501/1695327662', '46402502/1695327663',
    '46402503/1695327664', '46402504/1695327665', '46402505/1695327666', '46402508/1695327670', '46402509/1695327671']),
  g('/media/3770/7373770', 'Mulchgrubber TRIPLE-X 4.8-16 Premium', [
    '47166260/1699543925', '46402451/1695325976', '47166268/1699544017', '46402453/1695325980', '46402458/1695326022', '46402456/1695326020',
    '46402480/1695326053', '46402463/1695326028', '46402467/1695326033', '47166266/1699544012', '46402454/1695325981', '46402455/1695325983']),
  g('/media/0254/8870254', 'Mulchgrubber TRIPLE-X 4.0-13 mit STS-U-Ringwalze (Demomaschine)', [
    '65368730/1783779276', '65368729/1783779273', '65368727/1783779267', '65368718/1783779241', '65368720/1783779247', '65368712/1783779227',
    '65368714/1783779229', '65368708/1783779222', '65368725/1783779262', '65368745/1783779324', '65368738/1783779302', '65368706/1783779220']),
  g('/media/2720/8872720', 'Großfederzinkenegge Speedline 6.0 XC', [
    '65407772/1784058399', '65407764/1784058377', '65407784/1784058438', '65407780/1784058426', '65407770/1784058393', '65407783/1784058434',
    '65407778/1784058419', '65407777/1784058415', '65407789/1784058456', '65407796/1784058476', '65407792/1784058464', '65407775/1784058409']),
  g('/media/5292/8335292', 'Kurzscheibenegge AVATERRA 5.0 Gen4', [
    '57833131/1750960654', '57833137/1750960664', '57833134/1750960661', '57833138/1750960670', '57833135/1750960663', '57833132/1750960655',
    '57833123/1750960642', '57833127/1750960651', '57833121/1750960635', '57833122/1750960636', '57833129/1750960652', '57833128/1750960652']),
  g('/media/6326/8876326', 'Tiefenlockerer NITRO-X PARAPLOW-HD 3.0-6', [
    '65446967/1784202617', '65446972/1784202633', '65446973/1784202636', '65446963/1784202604', '65446964/1784202608', '65446961/1784202599',
    '65446965/1784202611', '65446960/1784202596', '65446950/1784202569', '65446968/1784202620', '65446977/1784202651', '65446943/1784202554']),
  g('/media/5195/4995195', 'Drehpflug ESCUDERO CHRF 8 Schar', [
    '28536746/1573373652', '28536732/1573373573', '28536734/1573373573', '28536721/1573373564', '28536731/1573373571', '28536722/1573373564',
    '28536720/1573373562', '28536723/1573373564', '28536724/1573373566', '28536725/1573373567', '28536726/1573373567', '28536727/1573373568']),
  g('/media/8821/8448821', 'agroXX FRONTPACKER 6,0 m', [
    '59340481/1758303049', '59340483/1758303052', '59340482/1758303050', '59340470/1758303032', '59340471/1758303034', '59340473/1758303037',
    '59340476/1758303041', '59340469/1758303031', '59340475/1758303040', '59340477/1758303043', '59340474/1758303038', '59340478/1758303044']),
  g('/media/8162/8428162', 'Cambridgewalze Quivogne ROLLMAX 9,50 m', [
    '59086182/1757064424', '59086179/1757064418', '59086176/1757064413', '59086177/1757064414', '59086175/1757064412', '59086183/1757064426',
    '59086188/1757064437', '59086172/1757064408', '59086184/1757064428', '59086189/1757064439', '59086185/1757064430', '59086186/1757064432']),
  g('/media/5855/8335855', 'Muldenkipper Pronar T669XL', [
    '57840000/1751011491', '57839995/1751011487', '57840002/1751011493', '57839998/1751011489', '57840019/1751011599', '57840025/1751011604',
    '57839996/1751011488', '57839999/1751011490', '57840001/1751011492', '57839994/1751011486', '57840027/1751011605', '57840005/1751011496']),
];

// Dateiname eines Bildes im Ordner bilder/k (klein) bzw. bilder/g (groß)
export const dateiname = (pfad) => {
  const t = pfad.split('/');
  return `${t[3]}-${t[4]}.jpg`;
};
