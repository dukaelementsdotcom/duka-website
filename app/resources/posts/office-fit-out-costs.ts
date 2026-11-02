// Article: Office fit-out costs in Addis Ababa
// All prices and the per-m² bands come from lib/rates.ts (the estimator uses the same bands).
import { RATES, FITOUT_BANDS, VAT_RATE, RATES_UPDATED, n, band, short, type RateKey } from '@/lib/rates';

// Worked example: 300 m² office at premium (mid-range) quality.
const AREA = 300;
const EXAMPLE: [string, number, string, number][] = (
  [
    ['Gypsum partitions', 120, 'm²', 'gypsumPartition'],
    ['Glass partitions', 50, 'm²', 'glassPartition'],
    ['Glass doors', 4, '', 'glassDoor'],
    ['Wooden doors', 6, '', 'woodenDoor'],
    ['Frosted film', 25, 'm²', 'frostedFilm'],
    ['Gypsum false ceiling', 280, 'm²', 'gypsumCeiling'],
    ['SPC flooring', 200, 'm²', 'spcFlooring'],
    ['Carpet tiles (mid-range)', 60, 'm²', 'carpetTilesTypical'],
    ['LED panels', 50, '', 'ledPanel'],
    ['Power points', 80, '', 'powerPoint'],
    ['Data points', 40, '', 'dataPoint'],
    ['Painting', 400, 'm²', 'paint'],
    ['4-seater workstations', 6, '', 'workstation4'],
    ['Manager desks', 4, '', 'managerDesk'],
    ['Staff chairs', 28, '', 'staffChair'],
    ['Manager chairs', 4, '', 'managerChair'],
    ['Reception desk', 1, '', 'receptionDesk'],
  ] as [string, number, string, RateKey][]
).map(([label, qty, unit, key]) => [label, qty, unit, RATES[key].from]);
EXAMPLE.push(['Conference table (10-seat, quoted)', 1, '', 150000]);

const roundK = (x: number) => Math.round(x / 1000) * 1000;
const BUILD = EXAMPLE.reduce((t, [, q, , r]) => t + q * r, 0);
const DESIGN = AREA * RATES.designOffice.from;
const VAT = (BUILD + DESIGN) * VAT_RATE;
const GRAND = BUILD + DESIGN + VAT;
const per = (x: number) => n(Math.round(x / AREA / 100) * 100);
const exampleRows = EXAMPLE.map(
  ([label, q, unit, r]) => `<tr><td>${label}</td><td>${q}${unit ? ` ${unit}` : ''}</td><td>${n(r)}</td><td>${n(q * r)}</td></tr>`,
).join('\n');

const row = (label: string, key: RateKey) => `<tr><td>${label}</td><td>${short(key)}</td></tr>`;

const content = `
<p class="lead">How much does it cost to fit out an office in Addis Ababa? It is the first question most clients ask, and one of the hardest to answer from a Google search. Global fit-out guides from JLL and Turner &amp; Townsend cover dozens of cities, but not Addis. This article gives you real numbers.</p>

<p>The figures below are Duka Interiors' 2026 rates for design-and-build projects in Addis Ababa. They come from actual bills of quantities, not estimates or international averages. Your project will vary depending on the building, the layout, the quality of finish and what is already there, but these numbers give you a working budget before you talk to anyone.</p>

<h2>The short answer</h2>

<p>For a typical rented office in Addis Ababa, you can expect to pay roughly:</p>

<div class="table-wrap"><table>
<thead><tr><th>Finish level</th><th>Fit-out cost per m²</th><th>What it includes</th></tr></thead>
<tbody>
<tr><td><strong>${FITOUT_BANDS.standard.label}</strong></td><td>${band('standard')} ETB</td><td>Gypsum partitions, basic ceiling, LED lighting, SPC or tile floor, paint, electrical points</td></tr>
<tr><td><strong>${FITOUT_BANDS.premium.label}</strong> (mid-range)</td><td>${band('premium')} ETB</td><td>Mix of glass and gypsum partitions, acoustic ceiling, carpet tiles in work areas, branded reception wall, better furniture</td></tr>
<tr><td><strong>${FITOUT_BANDS.luxury.label}</strong></td><td>${band('luxury')} ETB</td><td>More glass, soundproof meeting rooms, custom joinery, feature lighting, high-end furniture</td></tr>
</tbody></table></div>

<p>These are all-in rates for partitions, ceilings, flooring, painting, electrical work, data cabling and basic furniture. They are before 15% VAT and do <strong>not</strong> include rent, AC units, generator connections, IT equipment, or major structural work. Design fees, if separate, start at about ${n(RATES.designOffice.from)} ETB per m² for offices.</p>

<h2>What drives the price up or down</h2>

<h3>Glass partitions</h3>
<p>Glass costs about four times as much as gypsum. A gypsum partition runs about <strong>${short('gypsumPartition')}</strong> while a 10 mm tempered or aluminium-framed glass partition runs about <strong>${short('glassPartition')}</strong>. An office with glass meeting rooms and a glass reception front costs far more than one with gypsum throughout. Most offices end up with a 70/30 gypsum-to-glass mix, which keeps the office bright where visitors see it without paying for glass in the server room.</p>

<h3>Private offices vs open plan</h3>
<p>Every wall adds cost. An open-plan layout with a few glass meeting rooms is cheaper to build than one with many private offices. Of course, some teams need doors, so the savings only go so far. Read our guide on <a href="/resources/open-plan-vs-private-offices-addis-ababa/">open plan vs private offices</a> if you are deciding.</p>

<h3>The floor you start with</h3>
<p>A bare concrete shell needs more work than a floor with existing tiles and a working ceiling. If the previous tenant left decent flooring and you can reuse it, your fit-out cost drops. If you have to break out old tiles, lay screed and wait for it to cure, it climbs.</p>

<h3>Furniture</h3>
<p>Furniture can be a third of the budget or a tenth, depending on what you choose. A locally made 4-seater workstation costs about <strong>${n(RATES.workstation4.from)} ETB</strong>. An executive L-desk costs about <strong>${n(RATES.executiveDesk.from)} ETB</strong>, and imported pieces more. If you are watching the budget, local workstations and task chairs usually make more sense than imported furniture, and the quality has improved a lot in recent years.</p>

<h3>Building restrictions</h3>
<p>Some landlords limit working hours, charge for generator access, or have a small lift that makes bringing in large glass panels difficult. All of these add time and cost. Ask before you sign the lease.</p>

<h2>Line-by-line rates (2026)</h2>

<p>These are our current supply-and-install prices in Addis Ababa. Use them to build a rough budget for your own floor plan.</p>

<h3>Partitions and doors</h3>
<div class="table-wrap"><table>
<thead><tr><th>Item</th><th>Rate</th></tr></thead>
<tbody>
${row('Gypsum board partition (90 mm, double-sided)', 'gypsumPartition')}
${row('Sound-insulated gypsum partition', 'gypsumSoundproof')}
${row('Glass partition (10 mm tempered or aluminium-framed)', 'glassPartition')}
<tr><td>Double-glazed soundproof glass</td><td>from ${short('glassDoubleGlazed')}</td></tr>
${row('Tempered glass door with hardware', 'glassDoor')}
${row('Aluminium door with glass', 'aluminiumDoor')}
${row('Wooden flush door (900 × 2100)', 'woodenDoor')}
${row('Frosted film on glass', 'frostedFilm')}
</tbody></table></div>

<h3>Ceilings</h3>
<div class="table-wrap"><table>
<thead><tr><th>Item</th><th>Rate</th></tr></thead>
<tbody>
${row('Gypsum board false ceiling', 'gypsumCeiling')}
${row('Acoustic ceiling (concealed grid)', 'acousticCeiling')}
</tbody></table></div>

<h3>Flooring and walls</h3>
<div class="table-wrap"><table>
<thead><tr><th>Item</th><th>Rate</th></tr></thead>
<tbody>
${row('SPC flooring (locally made, click-fit)', 'spcFlooring')}
${row('Carpet tiles (economy to acoustic)', 'carpetTiles')}
<tr><td>Porcelain tiles (supply and install)</td><td>${short('porcelainTiles')} + adhesive</td></tr>
${row('Painting (primer and two coats)', 'paint')}
${row('WPC wall panel', 'wpcWallPanel')}
</tbody></table></div>

<h3>Electrical and data</h3>
<div class="table-wrap"><table>
<thead><tr><th>Item</th><th>Rate</th></tr></thead>
<tbody>
${row('LED panel 600 × 600 mm', 'ledPanel')}
${row('Power point (double socket)', 'powerPoint')}
${row('Data point (CAT6)', 'dataPoint')}
</tbody></table></div>

<h3>Furniture</h3>
<div class="table-wrap"><table>
<thead><tr><th>Item</th><th>Rate</th></tr></thead>
<tbody>
${row('2-seater workstation', 'workstation2')}
${row('4-seater workstation cluster', 'workstation4')}
${row('Manager desk (L-type 140 × 70)', 'managerDesk')}
${row('Executive L-desk (160 × 80)', 'executiveDesk')}
${row('Mesh staff chair', 'staffChair')}
${row('High-back manager chair', 'managerChair')}
${row('Reception desk', 'receptionDesk')}
</tbody></table></div>

<h2>A worked example: 300 m² mid-range office</h2>

<p>Here is what a typical 300 m² office might cost at mid-range quality, assuming a rented floor with existing tiles in the wet areas and a concrete floor elsewhere.</p>

<div class="table-wrap"><table>
<thead><tr><th>Item</th><th>Quantity</th><th>Rate</th><th>Cost</th></tr></thead>
<tbody>
${exampleRows}
<tr><td colspan="3"><strong>Construction and furniture total</strong></td><td><strong>${n(roundK(BUILD))} ETB</strong></td></tr>
<tr><td colspan="3">Per m²</td><td>~${per(BUILD)} ETB/m²</td></tr>
<tr><td colspan="3">Design fee (${n(RATES.designOffice.from)} ETB/m²)</td><td>${n(roundK(DESIGN))} ETB</td></tr>
<tr><td colspan="3">VAT (15%)</td><td>${n(roundK(VAT))} ETB</td></tr>
<tr><td colspan="3"><strong>Grand total with VAT</strong></td><td><strong>${n(roundK(GRAND))} ETB</strong></td></tr>
</tbody></table></div>

<p>That is about <strong>${per(BUILD)} ETB per m²</strong> before design and VAT, inside the ${FITOUT_BANDS.premium.label.toLowerCase()} band, or roughly <strong>${per(GRAND)} ETB per m² all-in</strong>. A simpler layout with less glass and more basic furniture would come in under ${n(FITOUT_BANDS.standard.max)} ETB/m². A luxury finish with more glass, custom joinery and imported furniture could reach ${n(FITOUT_BANDS.luxury.max)} ETB/m² or more.</p>

<h2>Design-only vs design-and-build</h2>

<p>Some clients hire us for drawings and 3D only, then find their own contractors. Others hire us to design <em>and</em> build. The costs look different:</p>

<ul>
<li><strong>Design only:</strong> from about ${n(RATES.designOffice.from)} ETB per m² for offices, covering space planning, 3D renders, working drawings and a bill of quantities. You then tender the work yourself.</li>
<li><strong>Design and build:</strong> one contract, one price, one company responsible for the result. The construction cost includes our margin, but you save time and avoid finger-pointing between designer and contractor.</li>
</ul>

<p>If you already have a contractor you trust, design-only may be cheaper. If you want one point of responsibility, design-and-build is simpler.</p>

<h2>What to check before you budget</h2>

<ol>
<li><strong>Measure the floor.</strong> Quotes are per m², so the area matters. Include corridors and wet areas, but not the stairwell or lift lobby if they are shared.</li>
<li><strong>Check the ceiling height.</strong> A 3.5 m ceiling gives room for a suspended ceiling and services. A 2.7 m ceiling may need a different approach.</li>
<li><strong>List the rooms.</strong> How many private offices, meeting rooms, a server room, a store? More rooms means more partitions and doors.</li>
<li><strong>Count the people.</strong> People drive electrical points, data points and furniture. A 300 m² office for 20 people costs less to fit out than the same space for 50.</li>
<li><strong>Know the building rules.</strong> Working hours, lift size, generator access, landlord approvals. These affect timing and sometimes cost.</li>
<li><strong>Decide on furniture.</strong> Reusing existing furniture, buying local, or importing? The difference can be millions of birr.</li>
</ol>

<h2>Why prices change</h2>

<p>The rates above are our ${RATES_UPDATED} prices, taken from our own recent bills of quantities. They move for three main reasons:</p>

<ul>
<li><strong>Exchange rate.</strong> Aluminium, glass, carpet tiles and some fittings are imported. When the birr weakens, those items cost more.</li>
<li><strong>Demand.</strong> When many offices are fitting out at once, labour and materials get scarcer and prices rise.</li>
<li><strong>Fuel and transport.</strong> Getting materials to site costs more when fuel prices climb.</li>
</ul>

<p>Most quotes are valid for 30 days. If your project will start later, ask which items are most likely to move.</p>

<div class="note"><p><strong>In short:</strong> plan for ${band('standard')} ETB/m² for a standard fit-out, ${band('premium')} ETB/m² for premium (mid-range), and ${band('luxury')} ETB/m² for luxury. Add 15% VAT. The number that matters most is the final all-in figure, so get an itemised quote before you commit.</p></div>

<p>Want to know what your floor will cost? Try our <a href="/estimate/">cost estimator</a> for a quick budget, or <a href="/contact/">send us your floor plan</a> for an itemised quote. You can also see the full list of <a href="/resources/materials/">2026 material prices</a> and our other <a href="/resources/">guides</a>.</p>
`;

export default content;
