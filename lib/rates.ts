// lib/rates.ts
// ONE source for every price the website publishes: the materials page, the homepage FAQ,
// service-page FAQs, price hints and the blog posts all read from here, so a change made
// here shows up everywhere at once (and search engines / AI answers see one set of numbers).
//
// Duka's 2026 supply-and-install rates in Addis Ababa, before 15% VAT.
// Taken from real Duka BOQs priced after the July 2024 birr float:
//   Ethiojobs (Sep 2024), INTERPOL (Apr 2026), Precision (Sep 2026).
// Older (2022) BOQ prices predate the float and are not used.
// Items without a 2024+ BOQ price are Duka's current quoting rates.

export const RATES_UPDATED = 'October 2026';
export const RATES_UPDATED_ISO = '2026-10-31';

/** A price: a single figure (`from` only) or a range. */
export type Rate = { from: number; to?: number; unit: string };

const r = (from: number, unit: string, to?: number): Rate => ({ from, to, unit });

export const RATES = {
  // Design
  designOffice: r(800, 'm²'),
  designHome: r(1000, 'm²'),

  // Partitions and doors
  gypsumPartition: r(3900, 'm²', 4500), // 90 mm double-sided (Precision 3,900)
  gypsumSoundproof: r(4800, 'm²', 5200), // insulated (INTERPOL 4,800; Precision 5,200)
  glassPartition: r(15000, 'm²', 17500), // 10 mm tempered / aluminium-framed (INTERPOL 15,000; Precision 17,550)
  glassDoubleGlazed: r(20000, 'm²'), // double-glazed sound-proof, from
  glassDoor: r(32500, 'each', 36000), // 10 mm tempered with hardware (Precision 32,500; INTERPOL 36,000)
  aluminiumDoor: r(45500, 'each'), // single aluminium door with glass (Precision)
  woodenDoor: r(41600, 'each', 48000), // flush laminated 900 × 2100 (Precision 41,600; INTERPOL 48,000)
  frostedFilm: r(1900, 'm²'), // CNC-cut frosted sticker (INTERPOL 1,920)

  // Ceilings
  gypsumCeiling: r(3600, 'm²'), // gypsum board false ceiling (Ethiojobs 3,500; Precision 3,640)
  acousticCeiling: r(4500, 'm²', 5000), // acoustic tiles, concealed grid

  // Floors and walls
  spcFlooring: r(2500, 'm²'), // locally made, click-fit
  carpetTiles: r(2500, 'm²', 8500), // economy to acoustic (INTERPOL acoustic 8,400)
  carpetTilesTypical: r(4500, 'm²'), // mid-range, used in worked examples
  porcelainTiles: r(4500, 'm²'), // plus adhesive and grout
  paint: r(325, 'm²', 420), // primer + two coats emulsion / mica (Precision 325; INTERPOL 420)
  wpcWallPanel: r(4550, 'm²'), // (Precision)

  // Electrical and data
  ledPanel: r(4550, 'each', 5400), // 600 × 600, 48 W (Precision 4,550; INTERPOL 5,400)
  powerPoint: r(1200, 'each', 1700), // recessed double socket incl. wiring point
  dataPoint: r(2500, 'each', 2950), // CAT6 to rack (INTERPOL 2,940)

  // Furniture
  workstation2: r(24000, 'each'),
  workstation4: r(42000, 'each'),
  staffChair: r(15000, 'each'), // mid-back mesh (INTERPOL 15,340)
  managerChair: r(32000, 'each'), // high-back mesh (INTERPOL 32,410)
  managerDesk: r(53000, 'each'), // L-type 140 × 70 (INTERPOL 52,970)
  executiveDesk: r(63000, 'each'), // executive L-desk 160 × 80 (INTERPOL 62,840)
  receptionDesk: r(50000, 'each', 80000),

  // Branding
  logoSign: r(26000, 'm²'), // foam board with acrylic face, per m² of sign (Precision 26,000)
  printedWallpaper: r(3900, 'm²'), // (Precision)
} as const;

export type RateKey = keyof typeof RATES;

/** Fit-out budget bands per m² of floor, construction + furniture, before design fee and VAT.
 *  Checked against Duka BOQs: Precision 2026 ≈ 12,000–16,000 ETB/m², INTERPOL 2026 ≈ 22,000+ ETB/m². */
export const FITOUT_BANDS = {
  standard: { min: 10000, max: 15000, label: 'Standard', desc: 'Local materials, functional finishes' },
  premium: { min: 15000, max: 24000, label: 'Premium', desc: 'Branded materials, more glass, professional finish' },
  luxury: { min: 24000, max: 40000, label: 'Luxury', desc: 'Imported materials, custom joinery and details' },
} as const;

export const VAT_RATE = 0.15;

/** 14500 -> "14,500" */
export const n = (x: number) => x.toLocaleString('en-US');

/** "3,900–4,500" or "3,900" */
export const amount = (key: RateKey) => {
  const { from, to } = RATES[key];
  return to ? `${n(from)}–${n(to)}` : n(from);
};

const unitLabel = (unit: string) => (unit === 'each' ? 'each' : `per ${unit}`);

/** "3,900–4,500 ETB per m²" */
export const price = (key: RateKey) => `${amount(key)} ETB ${unitLabel(RATES[key].unit)}`;

/** "about 3,900–4,500 ETB per m²" / "about 1,900 ETB per m²" */
export const about = (key: RateKey) => `about ${price(key)}`;

/** "from 3,900 ETB per m²" */
export const fromPrice = (key: RateKey) => `from ${n(RATES[key].from)} ETB ${unitLabel(RATES[key].unit)}`;

/** Compact form for tables: "3,900–4,500 ETB / m²", "32,500–36,000 ETB each" */
export const short = (key: RateKey) => {
  const u = RATES[key].unit;
  return `${amount(key)} ETB${u === 'each' ? ' each' : ` / ${u}`}`;
};

/** Midpoint used in worked examples. */
export const mid = (key: RateKey) => {
  const { from, to } = RATES[key];
  return to ? Math.round((from + to) / 2 / 100) * 100 : from;
};

export const band = (k: keyof typeof FITOUT_BANDS) => `${n(FITOUT_BANDS[k].min)}–${n(FITOUT_BANDS[k].max)}`;
