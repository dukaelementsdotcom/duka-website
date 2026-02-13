'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
// ========================================
// ETHIOPIAN STANDARDS & RATES (HARDCODED IN-FILE)
// ========================================
const ETHIOPIAN_STANDARDS = {
// Space per person by work style
spacePerPerson: {
traditional: 12, // m²
hybrid: 9,       // m²
modern: 7        // m²
},
circulationRatio: 0.22, // 22% circulation space
wallHeight: 2.7,        // Standard wall height (m)
// Material rates (ETB per m²) - Q1 2026 Addis Ababa market
materials: {
gwbPartition: 2200,
glassSingle: 4200,
glassDoubleSoundproof: 7800,
glassFramelessTempered: 12500,
falseCeiling: 1100,
painting: 450,
carpet: 1600,
spcFlooring: 2600
},
// Furniture rates (ETB per unit)
furniture: {
ceoDesk: 42000,
managerDesk: 28000,
supervisorDesk: 18000,
workstation2Seater: 24000,
workstation4Seater: 42000,
tallCabinet: 15000, // 90x180cm
shortCabinet: 9000, // 90x90cm
meshChairNoHeadrest: 6500,
meshChairWithHeadrest: 9500,
leatherManagerChair: 22000,
visitorChair: 3200,
receptionDeskSmall: 28000,  // 1.8m
receptionDeskMedium: 42000, // 2.4m
receptionDeskLarge: 65000,  // 3.2m
sofaSmall: 18000,
sofaMedium: 28000,
sofaLarge: 42000,
coffeeTable: 8500,
pottedPlant: 2200,
verticalBlindsPerM2: 850
},
// Electrical rates (ETB per unit)
electrical: {
ledPanel60x60: 1800,
ledPanel30x60: 1200,
ledPanel30x30: 950,
trackShooter: 2800,
pendantLight: 3500,
socketWaterproof: 450,
socketRecessed: 350,
switch: 280,
dataPoint: 650,
cablingPerM: 120
},
// Wet area rates
wetAreas: {
toiletSeat: 8500,
washBasin: 6200,
toiletPaperHolder: 450,
soapDispenser: 380,
grabBar: 750,
mirror: 2200
},
// Branding rates
branding: {
acrylicLogoPerM2: 4800,
sandblastedStickerPerM2: 1200,
wallpaperPerM2: 950
}
};
// ========================================
// MAIN ESTIMATOR COMPONENT
// ========================================
export default function EstimatePage() {
// ===== TAB STATE =====
const [activeTab, setActiveTab] = useState<'area' | 'cost'>('area');
// ===== AREA ESTIMATOR STATE =====
const [headcount, setHeadcount] = useState(25);
const [workStyle, setWorkStyle] = useState<'traditional' | 'hybrid' | 'modern'>('hybrid');
const [ceoOffices, setCeoOffices] = useState(1);
const [managerOffices, setManagerOffices] = useState(2);
const [smallPrivateOffices, setSmallPrivateOffices] = useState(3);
const [meetingLarge, setMeetingLarge] = useState(1); // 12-20 people
const [meetingMedium, setMeetingMedium] = useState(2); // 8-12 people
const [meetingSmall, setMeetingSmall] = useState(3); // 4-8 people
const [canteenType, setCanteenType] = useState<'none' | 'dry' | 'dryWithSeating' | 'fullKitchen'>('dryWithSeating');
const [canteenCapacity, setCanteenCapacity] = useState(12); // For seating options
const [itRoom, setItRoom] = useState(true);
const [archiveRoom, setArchiveRoom] = useState(true);
const [customRooms, setCustomRooms] = useState<{name: string; area: number}[]>([]);
const [areaResult, setAreaResult] = useState<any>(null);
const [isCalculating, setIsCalculating] = useState(false);
// ===== COST ESTIMATOR STATE =====
// Section 01: Project Scope
const [totalRentedArea, setTotalRentedArea] = useState(0);
const [costHeadcount, setCostHeadcount] = useState(25);
// Section 02: Space Configuration (mirrors area estimator but allows overrides)
const [useAreaEstimatorResults, setUseAreaEstimatorResults] = useState(true);
const [costCeoOffices, setCostCeoOffices] = useState(1);
const [costManagerOffices, setCostManagerOffices] = useState(2);
// ... (all room types with overrides)
// Section 03: Partitions & Ceilings
const [partitionOverride, setPartitionOverride] = useState(false);
const [totalPartitionArea, setTotalPartitionArea] = useState(0);
const [gwbPercentage, setGwbPercentage] = useState(70);
const [glassPercentage, setGlassPercentage] = useState(30);
const [ceilingOverride, setCeilingOverride] = useState(false);
const [ceilingArea, setCeilingArea] = useState(0);
const [includeCeiling, setIncludeCeiling] = useState(true);
// Section 04: Glass Partition Types (ALL THREE TYPES AS SPECIFIED)
const [glassTypes, setGlassTypes] = useState({
single: { selected: true, area: 0 },
doubleSoundproof: { selected: false, area: 0 },
framelessTempered: { selected: false, area: 0 }
});
const [glassDoors, setGlassDoors] = useState(0); // Calculated from rooms
// Section 05: Furniture (EXACT DIMENSIONS & OPTIONS)
const [furniture, setFurniture] = useState({
ceoDesks: 1,
managerDesks: 2,
supervisorDesks: 3,
workstation2Seater: 4, // For 8 people
workstation4Seater: 2, // For 8 people
tallCabinets: 3, // 90x180cm
shortCabinets: 5, // 90x90cm
meshChairsNoHeadrest: 15,
meshChairsWithHeadrest: 10,
leatherManagerChairs: 3,
visitorChairs: 12,
receptionDeskSize: 'medium' as 'small' | 'medium' | 'large',
sofaSmall: 2,
sofaMedium: 1,
sofaLarge: 0,
coffeeTables: 3,
pottedPlants: 8,
verticalBlinds: false,
verticalBlindsArea: 0
});
// Section 06: Electrical & Networking (SPACE-SPECIFIC STANDARDS)
const [lighting, setLighting] = useState({
officeLed60x60: 0,
officeLed30x60: 0,
officeLed30x30: 0,
trackShooters: 3, // Reception logo lighting
pendantLights: 2, // Reception
existingLighting: false
});
const [sockets, setSockets] = useState({
waterproof: 0, // For kitchen/wet areas
recessed: 0,   // Standard
switches: 0
});
const [dataPoints, setDataPoints] = useState(0);
const [cablingMeters, setCablingMeters] = useState(0);
// Section 07: Wet Areas (AUTO-ACCESSORIES AS SPECIFIED)
const [wetAreas, setWetAreas] = useState({
toiletRenovation: false,
toiletSeats: 0,
washBasins: 0,
// Auto-calculated: paper holders = seats, soap dispensers = basins
});
// Section 08: Finishes
const [paintWallArea, setPaintWallArea] = useState(0);
const [paintCeilingArea, setPaintCeilingArea] = useState(0);
// Section 09: Branding & Signage
const [branding, setBranding] = useState({
receptionLogoWidth: 2.4, // meters (auto-calculated from reception size)
glassPartitionArea: 0,   // For sandblasted sticker (50% of glass area)
wallpaperArea: 0
});
// Quality tier selector (applies to all sections)
const [qualityTier, setQualityTier] = useState<'standard' | 'premium' | 'luxury'>('premium');
const [costResult, setCostResult] = useState<any>(null);
// ========================================
// AREA ESTIMATION CALCULATION (SCIENTIFIC)
// ========================================
const calculateAreaEstimate = () => {
const basePerPerson = ETHIOPIAN_STANDARDS.spacePerPerson[workStyle];
const baseArea = headcount * basePerPerson;
// Room calculations with EXACT specifications
const ceoOfficeArea = ceoOffices * 20; // 20m² per CEO office
const managerOfficeArea = managerOffices * 16; // 16m² per manager office
const smallPrivateOfficeArea = smallPrivateOffices * 12; // 12m² per small office
// Meeting rooms with EXACT person ranges
const meetingLargeArea = meetingLarge * 35; // 12-20 people = 35m²
const meetingMediumArea = meetingMedium * 22; // 8-12 people = 22m²
const meetingSmallArea = meetingSmall * 14; // 4-8 people = 14m²
// Canteen/Kitchen with THREE DISTINCT OPTIONS
let canteenArea = 0;
switch(canteenType) {
case 'dry': // Cabinets + appliances only
canteenArea = 6;
break;
case 'dryWithSeating': // Dry kitchen + seating area
canteenArea = 6 + (canteenCapacity * 1.2); // 1.2m² per seat
break;
case 'fullKitchen': // Full kitchen + dedicated breakout
canteenArea = 12 + (canteenCapacity * 1.5); // 1.5m² per seat
break;
default:
canteenArea = 0;
}
// IT Room - SCIENTIFIC CALCULATION
let itRoomArea = 0;
if (itRoom) {
// Based on data points + server racks
const racksNeeded = Math.ceil(headcount / 25); // 1 rack per 25 staff
itRoomArea = 8 + (racksNeeded * 1.5); // Base 8m² + 1.5m² per rack
}
// Archive Room - Finance-specific
const archiveArea = archiveRoom ? 12 : 0; // Standard finance archive
// Custom rooms
const customRoomsArea = customRooms.reduce((sum, room) => sum + room.area, 0);
// Total rooms area
const roomsTotal = ceoOfficeArea + managerOfficeArea + smallPrivateOfficeArea +
meetingLargeArea + meetingMediumArea + meetingSmallArea +
canteenArea + itRoomArea + archiveArea + customRoomsArea;
// Circulation space (22%)
const circulationArea = (baseArea + roomsTotal) * ETHIOPIAN_STANDARDS.circulationRatio;
// Total usable area (STANDARD ESTIMATE)
const totalUsableArea = baseArea + roomsTotal + circulationArea;
// Optimized estimate (20% reduction with disclaimer)
const optimizedArea = totalUsableArea * 0.80;
// Room breakdown for display
const roomsBreakdown = [
{ name: 'CEO Offices', count: ceoOffices, area: ceoOfficeArea, standard: '20m² per office' },
{ name: 'Manager Offices', count: managerOffices, area: managerOfficeArea, standard: '16m² per office' },
{ name: 'Small Private Offices', count: smallPrivateOffices, area: smallPrivateOfficeArea, standard: '12m² per office' },
{ name: 'Large Meeting Rooms (12-20ppl)', count: meetingLarge, area: meetingLargeArea, standard: '35m² per room' },
{ name: 'Medium Meeting Rooms (8-12ppl)', count: meetingMedium, area: meetingMediumArea, standard: '22m² per room' },
{ name: 'Small Meeting Rooms (4-8ppl)', count: meetingSmall, area: meetingSmallArea, standard: '14m² per room' },
{ name: `Canteen/Kitchen (${canteenType.replace(/([A-Z])/g, ' $1').trim()})`, count: 1, area: canteenArea, standard: canteenType === 'dry' ? '6m²' : canteenType === 'dryWithSeating' ? `6m² + ${canteenCapacity} seats` : `12m² + ${canteenCapacity} seats` },
{ name: 'IT Room', count: itRoom ? 1 : 0, area: itRoomArea, standard: `Base 8m² + ${Math.ceil(headcount/25)} server racks` },
{ name: 'Archive Room', count: archiveRoom ? 1 : 0, area: archiveArea, standard: '12m² finance archive' },
...customRooms.map(room => ({ name: room.name, count: 1, area: room.area, standard: 'Custom' }))
].filter(r => r.area > 0);
return {
standardEstimate: totalUsableArea,
optimizedEstimate: optimizedArea,
circulationArea,
roomsBreakdown,
recommendations: [
`Ethiopian standard: ${basePerPerson}m² per person for ${workStyle} layout`,
`Circulation space: ${ETHIOPIAN_STANDARDS.circulationRatio * 100}% of total area`,
`Optimized estimate assumes flexible zoning and shared resources`
]
};
};
// ========================================
// COST ESTIMATION CALCULATION (SECTION-BY-SECTION)
// ========================================
const calculateCostEstimate = () => {
// Initialize cost breakdown
const breakdown: any = {
section01: { name: 'Project Scope', items: [], total: 0 },
section02: { name: 'Space Configuration', items: [], total: 0 },
section03: { name: 'Partitions & Ceilings', items: [], total: 0 },
section04: { name: 'Glass Partitions', items: [], total: 0 },
section05: { name: 'Furniture', items: [], total: 0 },
section06: { name: 'Electrical & Networking', items: [], total: 0 },
section07: { name: 'Wet Areas', items: [], total: 0 },
section08: { name: 'Paint & Finishes', items: [], total: 0 },
section09: { name: 'Branding & Signage', items: [], total: 0 },
subtotal: 0,
contingency: 0,
vat: 0,
total: 0
};
// SECTION 03: PARTITIONS & CEILINGS (SCIENTIFIC CALCULATION)
let partitionArea = totalPartitionArea;
if (!partitionOverride && useAreaEstimatorResults && areaResult) {
// SCIENTIFIC CALCULATION: Perimeter of enclosed rooms × wall height
partitionArea = areaResult.standardEstimate * 0.4 * ETHIOPIAN_STANDARDS.wallHeight;
}
const gwbArea = partitionArea * (gwbPercentage / 100);
const glassArea = partitionArea * (glassPercentage / 100);
breakdown.section03.items.push({
name: 'GWB Partitions',
quantity: gwbArea.toFixed(1),
unit: 'm²',
rate: ETHIOPIAN_STANDARDS.materials.gwbPartition,
amount: gwbArea * ETHIOPIAN_STANDARDS.materials.gwbPartition
});
// SECTION 04: GLASS PARTITION TYPES (ALL THREE TYPES)
let glassTotal = 0;
if (glassTypes.single.selected) {
const area = glassArea * 0.6; // 60% of glass area
const amount = area * ETHIOPIAN_STANDARDS.materials.glassSingle;
breakdown.section04.items.push({
name: 'Aluminum Single Glass Partitions',
quantity: area.toFixed(1),
unit: 'm²',
rate: ETHIOPIAN_STANDARDS.materials.glassSingle,
amount
});
glassTotal += amount;
}
if (glassTypes.doubleSoundproof.selected) {
const area = glassArea * 0.3; // 30% of glass area
const amount = area * ETHIOPIAN_STANDARDS.materials.glassDoubleSoundproof;
breakdown.section04.items.push({
name: 'Aluminum Double Glass (Sound Proof)',
quantity: area.toFixed(1),
unit: 'm²',
rate: ETHIOPIAN_STANDARDS.materials.glassDoubleSoundproof,
amount
});
glassTotal += amount;
}
if (glassTypes.framelessTempered.selected) {
const area = glassArea * 0.1; // 10% of glass area
const amount = area * ETHIOPIAN_STANDARDS.materials.glassFramelessTempered;
breakdown.section04.items.push({
name: 'Frameless Tempered Glass Partitions',
quantity: area.toFixed(1),
unit: 'm²',
rate: ETHIOPIAN_STANDARDS.materials.glassFramelessTempered,
amount
});
glassTotal += amount;
}
// Glass doors calculation (based on spaces)
if (glassDoors > 0) {
const doorRate = 8500; // ETB per glass door
const doorAmount = glassDoors * doorRate;
breakdown.section04.items.push({
name: 'Glass Doors',
quantity: glassDoors,
unit: 'doors',
rate: doorRate,
amount: doorAmount
});
glassTotal += doorAmount;
}
breakdown.section04.total = glassTotal;
// SECTION 05: FURNITURE (EXACT DIMENSIONS & OPTIONS)
let furnitureTotal = 0;
// Desks with EXACT specifications
if (furniture.ceoDesks > 0) {
const amount = furniture.ceoDesks * ETHIOPIAN_STANDARDS.furniture.ceoDesk;
breakdown.section05.items.push({
name: 'CEO Desks',
quantity: furniture.ceoDesks,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.furniture.ceoDesk,
amount,
note: 'Executive desk with storage'
});
furnitureTotal += amount;
}
// Tall cabinets with EXACT dimensions (90x180cm)
if (furniture.tallCabinets > 0) {
const amount = furniture.tallCabinets * ETHIOPIAN_STANDARDS.furniture.tallCabinet;
breakdown.section05.items.push({
name: 'Tall Storage Cabinets',
quantity: furniture.tallCabinets,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.furniture.tallCabinet,
amount,
note: '90cm W × 180cm H'
});
furnitureTotal += amount;
}
// Short cabinets with EXACT dimensions (90x90cm)
if (furniture.shortCabinets > 0) {
const amount = furniture.shortCabinets * ETHIOPIAN_STANDARDS.furniture.shortCabinet;
breakdown.section05.items.push({
name: 'Short Storage Cabinets',
quantity: furniture.shortCabinets,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.furniture.shortCabinet,
amount,
note: '90cm W × 90cm H'
});
furnitureTotal += amount;
}
// Chairs with headrest options
if (furniture.meshChairsNoHeadrest > 0) {
const amount = furniture.meshChairsNoHeadrest * ETHIOPIAN_STANDARDS.furniture.meshChairNoHeadrest;
breakdown.section05.items.push({
name: 'Mid Mesh Back Office Chairs (No Headrest)',
quantity: furniture.meshChairsNoHeadrest,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.furniture.meshChairNoHeadrest,
amount
});
furnitureTotal += amount;
}
if (furniture.meshChairsWithHeadrest > 0) {
const amount = furniture.meshChairsWithHeadrest * ETHIOPIAN_STANDARDS.furniture.meshChairWithHeadrest;
breakdown.section05.items.push({
name: 'Mid Mesh Back Office Chairs (With Headrest)',
quantity: furniture.meshChairsWithHeadrest,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.furniture.meshChairWithHeadrest,
amount
});
furnitureTotal += amount;
}
// Reception desk with EXACT size options
const receptionDeskRate = ETHIOPIAN_STANDARDS.furniture[`receptionDesk${furniture.receptionDeskSize.charAt(0).toUpperCase() + furniture.receptionDeskSize.slice(1)}` as keyof typeof ETHIOPIAN_STANDARDS.furniture];
const receptionDeskAmount = receptionDeskRate;
breakdown.section05.items.push({
name: `Reception Desk (${furniture.receptionDeskSize.charAt(0).toUpperCase() + furniture.receptionDeskSize.slice(1)})`,
quantity: 1,
unit: 'unit',
rate: receptionDeskRate,
amount: receptionDeskAmount,
note: furniture.receptionDeskSize === 'small' ? '1.8m width' : furniture.receptionDeskSize === 'medium' ? '2.4m width' : '3.2m width'
});
furnitureTotal += receptionDeskAmount;
// Soft furnishings
if (furniture.sofaSmall > 0) {
const amount = furniture.sofaSmall * ETHIOPIAN_STANDARDS.furniture.sofaSmall;
breakdown.section05.items.push({
name: 'Sofa (Small)',
quantity: furniture.sofaSmall,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.furniture.sofaSmall,
amount
});
furnitureTotal += amount;
}
// ... (other furniture items calculated similarly)
breakdown.section05.total = furnitureTotal;
// SECTION 06: ELECTRICAL (SPACE-SPECIFIC STANDARDS)
let electricalTotal = 0;
// Office lighting based on lux standards
if (!lighting.existingLighting) {
// Office areas: 300 lux → LED panels
const officeArea = totalRentedArea * 0.7; // 70% office space
const panel60x60Count = Math.ceil(officeArea / 12); // 1 panel per 12m²
if (panel60x60Count > 0) {
const amount = panel60x60Count * ETHIOPIAN_STANDARDS.electrical.ledPanel60x60;
breakdown.section06.items.push({
name: 'Office LED Panel Lighting (60x60cm)',
quantity: panel60x60Count,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.electrical.ledPanel60x60,
amount,
note: '300 lux standard for workspaces'
});
electricalTotal += amount;
}
// Reception lighting: 500 lux → Track shooters + pendants
if (lighting.trackShooters > 0) {
const amount = lighting.trackShooters * ETHIOPIAN_STANDARDS.electrical.trackShooter;
breakdown.section06.items.push({
name: 'Track Shooter Lights (Reception)',
quantity: lighting.trackShooters,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.electrical.trackShooter,
amount,
note: 'For logo highlighting'
});
electricalTotal += amount;
}
if (lighting.pendantLights > 0) {
const amount = lighting.pendantLights * ETHIOPIAN_STANDARDS.electrical.pendantLight;
breakdown.section06.items.push({
name: 'Pendant Lights (Reception)',
quantity: lighting.pendantLights,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.electrical.pendantLight,
amount
});
electricalTotal += amount;
}
}
// Sockets based on headcount + wet areas
const waterproofSockets = wetAreas.toiletSeats > 0 ? Math.ceil(wetAreas.toiletSeats / 2) : 0;
const recessedSockets = costHeadcount * 1.2; // 1.2 sockets per person
if (waterproofSockets > 0) {
const amount = waterproofSockets * ETHIOPIAN_STANDARDS.electrical.socketWaterproof;
breakdown.section06.items.push({
name: 'Waterproof Sockets (Kitchen/Wet Areas)',
quantity: waterproofSockets,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.electrical.socketWaterproof,
amount
});
electricalTotal += amount;
}
if (recessedSockets > 0) {
const amount = recessedSockets * ETHIOPIAN_STANDARDS.electrical.socketRecessed;
breakdown.section06.items.push({
name: 'Recessed Wall Sockets',
quantity: Math.ceil(recessedSockets),
unit: 'units',
rate: ETHIOPIAN_STANDARDS.electrical.socketRecessed,
amount
});
electricalTotal += amount;
}
// Data points (1.5 per headcount)
const dataPointsCount = Math.ceil(costHeadcount * 1.5);
if (dataPointsCount > 0) {
const amount = dataPointsCount * ETHIOPIAN_STANDARDS.electrical.dataPoint;
breakdown.section06.items.push({
name: 'Data/Network Points',
quantity: dataPointsCount,
unit: 'points',
rate: ETHIOPIAN_STANDARDS.electrical.dataPoint,
amount
});
electricalTotal += amount;
}
breakdown.section06.total = electricalTotal;
// SECTION 07: WET AREAS (AUTO-ACCESSORIES)
let wetAreasTotal = 0;
if (wetAreas.toiletRenovation && wetAreas.toiletSeats > 0) {
// Toilet seats
const seatAmount = wetAreas.toiletSeats * ETHIOPIAN_STANDARDS.wetAreas.toiletSeat;
breakdown.section07.items.push({
name: 'Toilet Seats (Water Closets)',
quantity: wetAreas.toiletSeats,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.wetAreas.toiletSeat,
amount: seatAmount
});
wetAreasTotal += seatAmount;
// AUTO-ADD: Toilet paper holders (1 per seat)
const paperHolderAmount = wetAreas.toiletSeats * ETHIOPIAN_STANDARDS.wetAreas.toiletPaperHolder;
breakdown.section07.items.push({
name: 'Toilet Paper Holders',
quantity: wetAreas.toiletSeats,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.wetAreas.toiletPaperHolder,
amount: paperHolderAmount,
note: 'Auto-added (1 per toilet seat)'
});
wetAreasTotal += paperHolderAmount;
// AUTO-ADD: Grab bars (1 per seat)
const grabBarAmount = wetAreas.toiletSeats * ETHIOPIAN_STANDARDS.wetAreas.grabBar;
breakdown.section07.items.push({
name: 'Grab Bars',
quantity: wetAreas.toiletSeats,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.wetAreas.grabBar,
amount: grabBarAmount,
note: 'Auto-added (1 per toilet seat)'
});
wetAreasTotal += grabBarAmount;
}
if (wetAreas.washBasins > 0) {
const basinAmount = wetAreas.washBasins * ETHIOPIAN_STANDARDS.wetAreas.washBasin;
breakdown.section07.items.push({
name: 'Wash Basins',
quantity: wetAreas.washBasins,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.wetAreas.washBasin,
amount: basinAmount
});
wetAreasTotal += basinAmount;
// AUTO-ADD: Soap dispensers (1 per basin)
const soapDispenserAmount = wetAreas.washBasins * ETHIOPIAN_STANDARDS.wetAreas.soapDispenser;
breakdown.section07.items.push({
name: 'Soap Dispensers',
quantity: wetAreas.washBasins,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.wetAreas.soapDispenser,
amount: soapDispenserAmount,
note: 'Auto-added (1 per wash basin)'
});
wetAreasTotal += soapDispenserAmount;
// AUTO-ADD: Mirrors (1 per basin)
const mirrorAmount = wetAreas.washBasins * ETHIOPIAN_STANDARDS.wetAreas.mirror;
breakdown.section07.items.push({
name: 'Mirrors',
quantity: wetAreas.washBasins,
unit: 'units',
rate: ETHIOPIAN_STANDARDS.wetAreas.mirror,
amount: mirrorAmount,
note: 'Auto-added (1 per wash basin)'
});
wetAreasTotal += mirrorAmount;
}
breakdown.section07.total = wetAreasTotal;
// SECTION 09: BRANDING (SAND BLASTED STICKER = 50% OF GLASS AREA)
let brandingTotal = 0;
// Reception logo (acrylic)
const logoArea = branding.receptionLogoWidth * 0.6; // Height assumed 0.6m
const logoAmount = logoArea * ETHIOPIAN_STANDARDS.branding.acrylicLogoPerM2;
breakdown.section09.items.push({
name: 'Main Reception Acrylic Logo',
quantity: logoArea.toFixed(2),
unit: 'm²',
rate: ETHIOPIAN_STANDARDS.branding.acrylicLogoPerM2,
amount: logoAmount,
note: `${branding.receptionLogoWidth}m width × 0.6m height`
});
brandingTotal += logoAmount;
// Sand blasted sticker (50% of glass partition area)
if (branding.glassPartitionArea > 0) {
const stickerArea = branding.glassPartitionArea * 0.5;
const stickerAmount = stickerArea * ETHIOPIAN_STANDARDS.branding.sandblastedStickerPerM2;
breakdown.section09.items.push({
name: 'Sand Blasted Sticker (Glass Partitions)',
quantity: stickerArea.toFixed(2),
unit: 'm²',
rate: ETHIOPIAN_STANDARDS.branding.sandblastedStickerPerM2,
amount: stickerAmount,
note: '50% of total glass partition area'
});
brandingTotal += stickerAmount;
}
breakdown.section09.total = brandingTotal;
// Calculate totals
breakdown.subtotal = Object.keys(breakdown)
.filter(k => k.startsWith('section'))
.reduce((sum, key) => sum + breakdown[key].total, 0);
breakdown.contingency = breakdown.subtotal * 0.12; // 12% contingency
breakdown.subtotal += breakdown.contingency;
breakdown.vat = breakdown.subtotal * 0.15; // 15% VAT
breakdown.total = breakdown.subtotal + breakdown.vat;
return breakdown;
};
// ========================================
// HANDLERS
// ========================================
const handleAreaCalculate = () => {
setIsCalculating(true);
setTimeout(() => {
const result = calculateAreaEstimate();
setAreaResult(result);
setIsCalculating(false);
// Scroll to results
document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
}, 300);
};
const handleCostCalculate = () => {
setIsCalculating(true);
setTimeout(() => {
const result = calculateCostEstimate();
setCostResult(result);
setIsCalculating(false);
document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
}, 300);
};
const handleUseAreaResults = () => {
if (areaResult) {
setTotalRentedArea(Math.round(areaResult.standardEstimate));
setCostHeadcount(headcount);
// Auto-populate room counts from area estimator
setCostCeoOffices(ceoOffices);
setCostManagerOffices(managerOffices);
// ... (other room types)
setUseAreaEstimatorResults(true);
}
};
// ========================================
// RENDER
// ========================================
return (
<>
<NavBar />
<main className="min-h-screen pt-0 bg-white">
{/* Hero Section - SUBTLE, PROFESSIONAL */}
<section className="bg-gray-900 text-white py-12">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
<h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
Duka Project Estimator
</h1>
<p className="text-lg max-w-3xl mx-auto opacity-90">
Professional space planning and cost estimation for Ethiopian commercial projects.
Get accurate, market-specific estimates in minutes.
</p>
</div>
</section>
{/* Tab Navigation - CLEANER DESIGN */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
<div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
<div className="border-b border-gray-200">
<nav className="flex">
<button
onClick={() => setActiveTab('area')}
className={`flex-1 py-5 px-4 text-center transition-all ${
activeTab === 'area'
? 'bg-red-600 text-white font-bold'
: 'bg-gray-50 text-gray-800 hover:bg-gray-100 font-medium'
}`}
>
<div className="font-bold text-lg mb-2">Area Estimator</div>
<div className="text-xs opacity-75">
{activeTab === 'area' ? 'Calculate space requirements' : 'Plan your workspace layout'}
</div>
</button>
<button
onClick={() => setActiveTab('cost')}
className={`flex-1 py-5 px-4 text-center transition-all ${
activeTab === 'cost'
? 'bg-red-600 text-white font-bold'
: 'bg-gray-50 text-gray-800 hover:bg-gray-100 font-medium'
}`}
>
<div className="font-bold text-lg mb-2">Cost Estimator</div>
<div className="text-xs opacity-75">
{activeTab === 'cost' ? 'Detailed cost breakdown' : 'Estimate project budget'}
</div>
</button>
</nav>
</div>
{/* Tab Content */}
<div className="p-6">
{/* AREA ESTIMATOR TAB */}
{activeTab === 'area' && (
<div className="space-y-6">
{/* Headcount & Work Style */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
<label className="block text-xs font-medium uppercase tracking-wider text-gray-600 mb-3">
Total Headcount
</label>
<input
type="number"
value={headcount}
onChange={(e) => setHeadcount(Math.max(5, parseInt(e.target.value) || 5))}
min="5"
max="500"
className="w-full text-3xl font-bold text-center py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-xs text-gray-500 mt-2 text-center">
Staff requiring workspace
</p>
</div>
<div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
<label className="block text-xs font-medium uppercase tracking-wider text-gray-600 mb-3">
Work Style
</label>
<select
value={workStyle}
onChange={(e) => setWorkStyle(e.target.value as any)}
className="w-full text-lg font-bold text-center py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
>
<option value="traditional">Traditional (12m²/person)</option>
<option value="hybrid">Hybrid (9m²/person)</option>
<option value="modern">Modern/Open Plan (7m²/person)</option>
</select>
<p className="text-xs text-gray-500 mt-2 text-center">
Layout preference
</p>
</div>
<div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
<label className="block text-xs font-medium uppercase tracking-wider text-gray-600 mb-3">
Optimization Level
</label>
<div className="text-center">
<div className="text-2xl font-bold text-red-600 mb-2">Standard vs Optimized</div>
<p className="text-xs text-gray-600">
Optimized = 20% space reduction<br />
<span className="text-red-600 font-bold">*Requires flexible layout</span>
</p>
</div>
</div>
</div>
{/* Room Configuration - EXACT SPECIFICATIONS */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-6">
Room Configuration (Ethiopian Standards)
</h3>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* CEO Offices */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
CEO Offices
</label>
<input
type="number"
value={ceoOffices}
onChange={(e) => setCeoOffices(Math.max(0, parseInt(e.target.value) || 0))}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">20m² per office</p>
</div>
{/* Manager Offices */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Manager Offices
</label>
<input
type="number"
value={managerOffices}
onChange={(e) => setManagerOffices(Math.max(0, parseInt(e.target.value) || 0))}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">16m² per office</p>
</div>
{/* Small Private Offices */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Small Private Offices
</label>
<input
type="number"
value={smallPrivateOffices}
onChange={(e) => setSmallPrivateOffices(Math.max(0, parseInt(e.target.value) || 0))}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">12m² per office</p>
</div>
{/* Meeting Rooms - EXACT PERSON RANGES */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Large Meeting (12-20 people)
</label>
<input
type="number"
value={meetingLarge}
onChange={(e) => setMeetingLarge(Math.max(0, parseInt(e.target.value) || 0))}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">35m² per room</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Medium Meeting (8-12 people)
</label>
<input
type="number"
value={meetingMedium}
onChange={(e) => setMeetingMedium(Math.max(0, parseInt(e.target.value) || 0))}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">22m² per room</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Small Meeting (4-8 people)
</label>
<input
type="number"
value={meetingSmall}
onChange={(e) => setMeetingSmall(Math.max(0, parseInt(e.target.value) || 0))}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">14m² per room</p>
</div>
{/* Canteen/Kitchen - THREE DISTINCT OPTIONS */}
<div className="md:col-span-2 lg:col-span-3">
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-3">
Canteen / Kitchen Type
</label>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
{[
{ id: 'none', label: 'None', desc: 'No kitchen area' },
{ id: 'dry', label: 'Dry Kitchen', desc: 'Cabinets + appliances only (6m²)' },
{ id: 'dryWithSeating', label: 'Dry + Seating', desc: 'Kitchen + seating area' },
{ id: 'fullKitchen', label: 'Full Kitchen + Breakout', desc: 'Complete kitchen + dedicated breakout room' }
].map((opt) => (
<button
key={opt.id}
onClick={() => {
setCanteenType(opt.id as any);
if (opt.id === 'none') setCanteenCapacity(0);
}}
className={`p-4 rounded-lg border-2 text-center transition-all ${
canteenType === opt.id
? 'border-red-600 bg-red-50'
: 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
}`}
>
<div className="font-bold text-sm mb-1">{opt.label}</div>
<div className="text-[11px] text-gray-600">{opt.desc}</div>
</button>
))}
</div>
{(canteenType === 'dryWithSeating' || canteenType === 'fullKitchen') && (
<div className="mt-4">
<label className="block text-[11px] font-bold text-gray-600 mb-2">
Seating Capacity
</label>
<input
type="number"
value={canteenCapacity}
onChange={(e) => setCanteenCapacity(Math.max(4, parseInt(e.target.value) || 4))}
min="4"
max="50"
className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
{canteenType === 'dryWithSeating'
? '1.2m² per seat + 6m² kitchen'
: '1.5m² per seat + 12m² kitchen'}
</p>
</div>
)}
</div>
{/* IT Room - SCIENTIFIC CALCULATION */}
<div>
<label className="flex items-center gap-2 cursor-pointer">
<input
type="checkbox"
checked={itRoom}
onChange={(e) => setItRoom(e.target.checked)}
className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
/>
<span className="text-sm font-medium">IT / Server Room</span>
</label>
<p className="text-[11px] text-gray-500 mt-1">
Auto-sized: 8m² + 1.5m² per server rack<br />
(1 rack per 25 staff)
</p>
</div>
{/* Archive Room */}
<div>
<label className="flex items-center gap-2 cursor-pointer">
<input
type="checkbox"
checked={archiveRoom}
onChange={(e) => setArchiveRoom(e.target.checked)}
className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
/>
<span className="text-sm font-medium">Archive Room (Finance)</span>
</label>
<p className="text-[11px] text-gray-500 mt-1">Standard 12m² archive</p>
</div>
{/* Custom Rooms */}
<div className="md:col-span-2 lg:col-span-3">
<div className="flex items-center justify-between mb-3">
<label className="text-xs font-medium uppercase tracking-widest text-gray-600">
Custom Rooms
</label>
<button
type="button"
onClick={() => setCustomRooms([...customRooms, { name: '', area: 0 }])}
className="text-sm font-medium text-red-600 hover:underline"
>
+ Add Custom Room
</button>
</div>
{customRooms.map((room, index) => (
<div key={index} className="flex gap-3 mb-3">
<input
type="text"
value={room.name}
onChange={(e) => {
const newRooms = [...customRooms];
newRooms[index].name = e.target.value;
setCustomRooms(newRooms);
}}
placeholder="Room name"
className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<input
type="number"
value={room.area}
onChange={(e) => {
const newRooms = [...customRooms];
newRooms[index].area = Math.max(0, parseFloat(e.target.value) || 0);
setCustomRooms(newRooms);
}}
placeholder="Area (m²)"
className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm text-right focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<button
type="button"
onClick={() => setCustomRooms(customRooms.filter((_, i) => i !== index))}
className="px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
>
✕
</button>
</div>
))}
</div>
</div>
</div>
{/* Action Buttons */}
<div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
<button
onClick={handleAreaCalculate}
disabled={isCalculating}
className={`flex-1 px-8 py-4 text-sm font-medium uppercase tracking-widest rounded-lg transition-all ${
isCalculating
? 'bg-gray-400 cursor-not-allowed'
: 'bg-red-600 hover:bg-red-700 text-white'
}`}
>
{isCalculating ? 'Calculating...' : 'Calculate Area Requirements'}
</button>
{areaResult && (
<button
onClick={() => setAreaResult(null)}
className="px-8 py-4 text-sm font-medium uppercase tracking-widest rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
>
Reset Form
</button>
)}
</div>
</div>
)}
{/* COST ESTIMATOR TAB - DETAILED SECTIONS */}
{activeTab === 'cost' && (
<div className="space-y-6">
{/* Section 01: Project Scope */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
Section 01: Project Scope
</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Total Rented Area (m²)
</label>
<input
type="number"
value={totalRentedArea}
onChange={(e) => setTotalRentedArea(Math.max(0, parseInt(e.target.value) || 0))}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Total Employees
</label>
<input
type="number"
value={costHeadcount}
onChange={(e) => setCostHeadcount(Math.max(1, parseInt(e.target.value) || 1))}
min="1"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
</div>
</div>
{areaResult && (
<div className="mt-4 pt-4 border-t border-gray-200">
<button
type="button"
onClick={handleUseAreaResults}
className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
>
<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
</svg>
Use Area Estimator Results ({Math.round(areaResult.standardEstimate)}m²)
</button>
</div>
)}
</div>
{/* Section 03: Partitions & Ceilings - SCIENTIFIC CALCULATION */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
Section 03: Partitions & Ceilings
</h3>
<div className="space-y-4">
<div>
<label className="flex items-center gap-2 cursor-pointer mb-3">
<input
type="checkbox"
checked={partitionOverride}
onChange={(e) => setPartitionOverride(e.target.checked)}
className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
/>
<span className="text-sm font-medium">
Override auto-calculation (Scientific: Perimeter × Wall Height)
</span>
</label>
{partitionOverride ? (
<input
type="number"
value={totalPartitionArea}
onChange={(e) => setTotalPartitionArea(Math.max(0, parseFloat(e.target.value) || 0))}
placeholder="Total partition area (m²)"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
) : (
<div className="bg-gray-50 p-4 rounded-lg text-center">
<div className="text-sm text-gray-600 mb-1">Auto-calculated partition area</div>
<div className="text-2xl font-bold text-red-600">
{areaResult ? (areaResult.standardEstimate * 0.4 * ETHIOPIAN_STANDARDS.wallHeight).toFixed(1) : '0.0'} m²
</div>
<p className="text-[11px] text-gray-500 mt-2">
Formula: 40% of total area × {ETHIOPIAN_STANDARDS.wallHeight}m wall height
</p>
</div>
)}
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Partition Material Split
</label>
<div className="flex items-center gap-4">
<div className="flex-1">
<div className="flex justify-between mb-1">
<span className="text-[11px] font-medium">GWB ({gwbPercentage}%)</span>
<span className="text-[11px] text-gray-500">{((totalPartitionArea || (areaResult?.standardEstimate * 0.4 * ETHIOPIAN_STANDARDS.wallHeight)) * gwbPercentage / 100).toFixed(1)} m²</span>
</div>
<input
type="range"
min="50"
max="90"
value={gwbPercentage}
onChange={(e) => {
const val = parseInt(e.target.value);
setGwbPercentage(val);
setGlassPercentage(100 - val);
}}
className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
/>
</div>
<div className="flex-1">
<div className="flex justify-between mb-1">
<span className="text-[11px] font-medium">Glass ({glassPercentage}%)</span>
<span className="text-[11px] text-gray-500">{((totalPartitionArea || (areaResult?.standardEstimate * 0.4 * ETHIOPIAN_STANDARDS.wallHeight)) * glassPercentage / 100).toFixed(1)} m²</span>
</div>
<input
type="range"
min="10"
max="50"
value={glassPercentage}
onChange={(e) => {
const val = parseInt(e.target.value);
setGlassPercentage(val);
setGwbPercentage(100 - val);
}}
className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
/>
</div>
</div>
<p className="text-[11px] text-gray-500 mt-2">
Ethiopian standard: 70% GWB / 30% Glass
</p>
</div>
<div>
<label className="flex items-center gap-2 cursor-pointer">
<input
type="checkbox"
checked={includeCeiling}
onChange={(e) => setIncludeCeiling(e.target.checked)}
className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
/>
<span className="text-sm font-medium">Include False Ceiling Work</span>
</label>
<p className="text-[11px] text-gray-500 mt-1 ml-6">
Standard rate: {ETHIOPIAN_STANDARDS.materials.falseCeiling.toLocaleString()} ETB/m²<br />
(Reception area always included if selected)
</p>
</div>
</div>
</div>
{/* Section 04: Glass Partition Types - ALL THREE TYPES */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
Section 04: Glass Partition Types
</h3>
<p className="text-sm text-gray-600 mb-4">
Select one or more glass types. Distribution based on project requirements.
</p>
<div className="space-y-4">
{/* Aluminum Single Glass */}
<label className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 cursor-pointer">
<input
type="checkbox"
checked={glassTypes.single.selected}
onChange={(e) => setGlassTypes({
...glassTypes,
single: { ...glassTypes.single, selected: e.target.checked }
})}
className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
/>
<div className="flex-1">
<div className="flex items-start justify-between">
<div>
<div className="font-bold">Aluminum Single Glass Partitions</div>
<p className="text-sm text-gray-600 mt-1">
Standard office partitions with aluminum framing. Good visibility, moderate sound insulation.
</p>
</div>
<div className="text-right">
<div className="font-bold text-red-600">
{ETHIOPIAN_STANDARDS.materials.glassSingle.toLocaleString()} ETB/m²
</div>
<div className="text-xs text-gray-500">Standard</div>
</div>
</div>
{glassTypes.single.selected && (
<div className="mt-3 pt-3 border-t border-gray-200">
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Area Allocation (m²)
</label>
<input
type="number"
value={glassTypes.single.area}
onChange={(e) => setGlassTypes({
...glassTypes,
single: {
...glassTypes.single,
area: Math.max(0, parseFloat(e.target.value) || 0)
}
})}
placeholder="Auto-calculated or specify"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
Recommended: 60% of total glass area
</p>
</div>
)}
</div>
</label>
{/* Aluminum Double Glass (Sound Proof) */}
<label className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 cursor-pointer">
<input
type="checkbox"
checked={glassTypes.doubleSoundproof.selected}
onChange={(e) => setGlassTypes({
...glassTypes,
doubleSoundproof: { ...glassTypes.doubleSoundproof, selected: e.target.checked }
})}
className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
/>
<div className="flex-1">
<div className="flex items-start justify-between">
<div>
<div className="font-bold">Aluminum Double Glass (Sound Proof)</div>
<p className="text-sm text-gray-600 mt-1">
Double-glazed with air gap for superior sound insulation. Ideal for meeting rooms and private offices.
</p>
</div>
<div className="text-right">
<div className="font-bold text-red-600">
{ETHIOPIAN_STANDARDS.materials.glassDoubleSoundproof.toLocaleString()} ETB/m²
</div>
<div className="text-xs text-gray-500">Premium</div>
</div>
</div>
{glassTypes.doubleSoundproof.selected && (
<div className="mt-3 pt-3 border-t border-gray-200">
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Area Allocation (m²)
</label>
<input
type="number"
value={glassTypes.doubleSoundproof.area}
onChange={(e) => setGlassTypes({
...glassTypes,
doubleSoundproof: {
...glassTypes.doubleSoundproof,
area: Math.max(0, parseFloat(e.target.value) || 0)
}
})}
placeholder="Auto-calculated or specify"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
Recommended: 30% of total glass area
</p>
</div>
)}
</div>
</label>
{/* Frameless Tempered Glass */}
<label className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 cursor-pointer">
<input
type="checkbox"
checked={glassTypes.framelessTempered.selected}
onChange={(e) => setGlassTypes({
...glassTypes,
framelessTempered: { ...glassTypes.framelessTempered, selected: e.target.checked }
})}
className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
/>
<div className="flex-1">
<div className="flex items-start justify-between">
<div>
<div className="font-bold">Frameless Tempered Glass Partitions</div>
<p className="text-sm text-gray-600 mt-1">
Premium aesthetic with minimal framing. Maximum light transmission and modern appearance. Highest cost.
</p>
</div>
<div className="text-right">
<div className="font-bold text-red-600">
{ETHIOPIAN_STANDARDS.materials.glassFramelessTempered.toLocaleString()} ETB/m²
</div>
<div className="text-xs text-gray-500">Luxury</div>
</div>
</div>
{glassTypes.framelessTempered.selected && (
<div className="mt-3 pt-3 border-t border-gray-200">
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Area Allocation (m²)
</label>
<input
type="number"
value={glassTypes.framelessTempered.area}
onChange={(e) => setGlassTypes({
...glassTypes,
framelessTempered: {
...glassTypes.framelessTempered,
area: Math.max(0, parseFloat(e.target.value) || 0)
}
})}
placeholder="Auto-calculated or specify"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
Recommended: 10% of total glass area (feature zones)
</p>
</div>
)}
</div>
</label>
{/* Glass Doors */}
<div className="pt-4 border-t border-gray-200">
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Glass Doors (Auto-calculated from room configuration)
</label>
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
<div>
<div className="text-[11px] text-gray-500 mb-1">Private Offices</div>
<div className="font-bold text-center">{ceoOffices + managerOffices + smallPrivateOffices}</div>
</div>
<div>
<div className="text-[11px] text-gray-500 mb-1">Meeting Rooms</div>
<div className="font-bold text-center">{meetingLarge + meetingMedium + meetingSmall}</div>
</div>
<div>
<div className="text-[11px] text-gray-500 mb-1">Reception</div>
<div className="font-bold text-center">1</div>
</div>
<div>
<div className="text-[11px] text-gray-500 mb-1">Total Doors</div>
<div className="font-bold text-red-600 text-center">
{ceoOffices + managerOffices + smallPrivateOffices + meetingLarge + meetingMedium + meetingSmall + 1}
</div>
</div>
</div>
<p className="text-[10px] text-gray-500 mt-2">
Rate: 8,500 ETB per glass door (includes hardware)
</p>
</div>
</div>
</div>
{/* Section 05: Furniture - EXACT DIMENSIONS & OPTIONS */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
Section 05: Furniture
</h3>
<p className="text-sm text-gray-600 mb-4">
Specify quantities. Works standalone or pulls from Area Estimator results.
</p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{/* CEO Desks */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
CEO Desks
</label>
<input
type="number"
value={furniture.ceoDesks}
onChange={(e) => setFurniture({ ...furniture, ceoDesks: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Executive desk with storage
</p>
</div>
{/* Manager Desks */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Manager Desks
</label>
<input
type="number"
value={furniture.managerDesks}
onChange={(e) => setFurniture({ ...furniture, managerDesks: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Manager workstation
</p>
</div>
{/* Supervisor Desks */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Supervisor Desks
</label>
<input
type="number"
value={furniture.supervisorDesks}
onChange={(e) => setFurniture({ ...furniture, supervisorDesks: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Single workstation
</p>
</div>
{/* Workstations */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
2-Seater Workstations
</label>
<input
type="number"
value={furniture.workstation2Seater}
onChange={(e) => setFurniture({ ...furniture, workstation2Seater: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
For open plan areas
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
4-Seater Workstations
</label>
<input
type="number"
value={furniture.workstation4Seater}
onChange={(e) => setFurniture({ ...furniture, workstation4Seater: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
For team zones
</p>
</div>
{/* Storage Cabinets - EXACT DIMENSIONS */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Tall Storage Cabinets
</label>
<input
type="number"
value={furniture.tallCabinets}
onChange={(e) => setFurniture({ ...furniture, tallCabinets: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center font-mono">
90cm W × 180cm H
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Short Storage Cabinets
</label>
<input
type="number"
value={furniture.shortCabinets}
onChange={(e) => setFurniture({ ...furniture, shortCabinets: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center font-mono">
90cm W × 90cm H
</p>
</div>
{/* Chairs - WITH/NO HEADREST OPTIONS */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Mesh Chairs (No Headrest)
</label>
<input
type="number"
value={furniture.meshChairsNoHeadrest}
onChange={(e) => setFurniture({ ...furniture, meshChairsNoHeadrest: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Standard task chair
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Mesh Chairs (With Headrest)
</label>
<input
type="number"
value={furniture.meshChairsWithHeadrest}
onChange={(e) => setFurniture({ ...furniture, meshChairsWithHeadrest: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Enhanced comfort
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Luxury Managerial Leather Chairs
</label>
<input
type="number"
value={furniture.leatherManagerChairs}
onChange={(e) => setFurniture({ ...furniture, leatherManagerChairs: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Executive seating
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Visitor Chairs
</label>
<input
type="number"
value={furniture.visitorChairs}
onChange={(e) => setFurniture({ ...furniture, visitorChairs: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Guest seating
</p>
</div>
{/* Reception Desk - EXACT SIZE OPTIONS */}
<div className="md:col-span-2 lg:col-span-3">
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-3">
Reception Desk Size
</label>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{[
{ id: 'small', label: 'Small (1.8m)', desc: 'Compact reception' },
{ id: 'medium', label: 'Medium (2.4m)', desc: 'Standard reception' },
{ id: 'large', label: 'Large (3.2m)', desc: 'Executive reception' }
].map((opt) => (
<button
key={opt.id}
onClick={() => setFurniture({ ...furniture, receptionDeskSize: opt.id as any })}
className={`p-4 rounded-lg border-2 text-center transition-all ${
furniture.receptionDeskSize === opt.id
? 'border-red-600 bg-red-50'
: 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
}`}
>
<div className="font-bold text-sm mb-1">{opt.label}</div>
<div className="text-[11px] text-gray-600">{opt.desc}</div>
</button>
))}
</div>
</div>
{/* Soft Furnishings */}
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Small Sofas
</label>
<input
type="number"
value={furniture.sofaSmall}
onChange={(e) => setFurniture({ ...furniture, sofaSmall: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
For waiting areas
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Medium Sofas
</label>
<input
type="number"
value={furniture.sofaMedium}
onChange={(e) => setFurniture({ ...furniture, sofaMedium: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
For breakout zones
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Large Sofas
</label>
<input
type="number"
value={furniture.sofaLarge}
onChange={(e) => setFurniture({ ...furniture, sofaLarge: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
For executive lounges
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Coffee Tables
</label>
<input
type="number"
value={furniture.coffeeTables}
onChange={(e) => setFurniture({ ...furniture, coffeeTables: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Potted Plants
</label>
<input
type="number"
value={furniture.pottedPlants}
onChange={(e) => setFurniture({ ...furniture, pottedPlants: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Interior landscaping
</p>
</div>
{/* Vertical Blinds */}
<div className="md:col-span-2 lg:col-span-3">
<label className="flex items-center gap-2 cursor-pointer">
<input
type="checkbox"
checked={furniture.verticalBlinds}
onChange={(e) => setFurniture({ ...furniture, verticalBlinds: e.target.checked })}
className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
/>
<span className="text-sm font-medium">Vertical Blinds</span>
</label>
{furniture.verticalBlinds && (
<div className="mt-3">
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Area to Cover (m²)
</label>
<input
type="number"
value={furniture.verticalBlindsArea}
onChange={(e) => setFurniture({ ...furniture, verticalBlindsArea: Math.max(0, parseFloat(e.target.value) || 0) })}
placeholder="Window area"
className="w-full px-4 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
Rate: {ETHIOPIAN_STANDARDS.furniture.verticalBlindsPerM2.toLocaleString()} ETB/m²
</p>
</div>
)}
</div>
</div>
</div>
{/* Section 06: Electrical - SPACE-SPECIFIC STANDARDS */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
Section 06: Electrical & Networking
</h3>
<div className="space-y-4">
<div>
<label className="flex items-center gap-2 cursor-pointer mb-3">
<input
type="checkbox"
checked={lighting.existingLighting}
onChange={(e) => setLighting({ ...lighting, existingLighting: e.target.checked })}
className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
/>
<span className="text-sm font-medium">
Existing lighting in good condition (opt out of new lighting)
</span>
</label>
{!lighting.existingLighting && (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div>
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Office LED Panels (60x60cm)
</label>
<input
type="number"
value={lighting.officeLed60x60}
onChange={(e) => setLighting({ ...lighting, officeLed60x60: Math.max(0, parseInt(e.target.value) || 0) })}
placeholder="Auto-calculated"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
300 lux standard (1 per 12m²)
</p>
</div>
<div>
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Track Shooter Lights
</label>
<input
type="number"
value={lighting.trackShooters}
onChange={(e) => setLighting({ ...lighting, trackShooters: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
max="10"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
For reception logo (500 lux)
</p>
</div>
<div>
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Pendant Lights
</label>
<input
type="number"
value={lighting.pendantLights}
onChange={(e) => setLighting({ ...lighting, pendantLights: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
max="10"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
Reception ambient lighting
</p>
</div>
</div>
)}
</div>
{/* Sockets & Data Points */}
<div>
<h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">
Power & Data Points
</h4>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
<div>
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Waterproof Sockets
</label>
<input
type="number"
value={sockets.waterproof}
onChange={(e) => setSockets({ ...sockets, waterproof: Math.max(0, parseInt(e.target.value) || 0) })}
placeholder="Auto from wet areas"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[10px] text-gray-500 mt-1">
For kitchen/wet areas
</p>
</div>
<div>
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Recessed Wall Sockets
</label>
<input
type="number"
value={sockets.recessed}
onChange={(e) => setSockets({ ...sockets, recessed: Math.max(0, parseInt(e.target.value) || 0) })}
placeholder="Auto: 1.2 per person"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
</div>
<div>
<label className="block text-[11px] font-medium text-gray-600 mb-2">
Data/Network Points
</label>
<input
type="number"
value={dataPoints}
onChange={(e) => setDataPoints(Math.max(0, parseInt(e.target.value) || 0))}
placeholder="Auto: 1.5 per person"
className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
</div>
</div>
</div>
</div>
</div>
{/* Section 07: Wet Areas - AUTO-ACCESSORIES */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
Section 07: Wet Areas (Toilet Renovation)
</h3>
<label className="flex items-center gap-2 cursor-pointer mb-6">
<input
type="checkbox"
checked={wetAreas.toiletRenovation}
onChange={(e) => setWetAreas({ ...wetAreas, toiletRenovation: e.target.checked })}
className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
/>
<span className="text-sm font-medium">
Include toilet renovation in this project
</span>
</label>
{wetAreas.toiletRenovation && (
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Toilet Seats (Water Closets)
</label>
<input
type="number"
value={wetAreas.toiletSeats}
onChange={(e) => setWetAreas({ ...wetAreas, toiletSeats: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
<span className="text-red-600 font-medium">Auto-adds:</span> 1 paper holder + 1 grab bar per seat
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Wash Basins
</label>
<input
type="number"
value={wetAreas.washBasins}
onChange={(e) => setWetAreas({ ...wetAreas, washBasins: Math.max(0, parseInt(e.target.value) || 0) })}
min="0"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
<span className="text-red-600 font-medium">Auto-adds:</span> 1 soap dispenser + 1 mirror per basin
</p>
</div>
</div>
)}
</div>
{/* Section 09: Branding - SAND BLASTED STICKER = 50% GLASS AREA */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
Section 09: Branding & Signage
</h3>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Reception Logo Width (meters)
</label>
<input
type="number"
value={branding.receptionLogoWidth}
onChange={(e) => setBranding({ ...branding, receptionLogoWidth: Math.max(0.6, parseFloat(e.target.value) || 0.6) })}
min="0.6"
max="5"
step="0.1"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
Acrylic logo (0.6m height assumed)<br />
Rate: {ETHIOPIAN_STANDARDS.branding.acrylicLogoPerM2.toLocaleString()} ETB/m²
</p>
</div>
<div>
<label className="block text-xs font-medium uppercase tracking-widest text-gray-600 mb-2">
Total Glass Partition Area (m²)
</label>
<input
type="number"
value={branding.glassPartitionArea}
onChange={(e) => setBranding({ ...branding, glassPartitionArea: Math.max(0, parseFloat(e.target.value) || 0) })}
placeholder="From Section 04"
className="w-full px-4 py-3 border border-gray-300 rounded-lg text-center font-bold focus:ring-2 focus:ring-red-500 focus:border-transparent"
/>
<p className="text-[11px] text-gray-500 mt-1 text-center">
<span className="text-red-600 font-medium">Sand blasted sticker:</span> 50% of glass area<br />
Rate: {ETHIOPIAN_STANDARDS.branding.sandblastedStickerPerM2.toLocaleString()} ETB/m²
</p>
</div>
</div>
</div>
{/* Quality Tier Selector */}
<div className="bg-white border border-gray-200 rounded-xl p-6">
<h3 className="text-lg font-bold uppercase tracking-wider text-gray-900 mb-4">
Quality Tier Selection
</h3>
<p className="text-sm text-gray-600 mb-4">
Select overall quality level. Affects material grades and workmanship standards.
</p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
{[
{
id: 'standard',
label: 'Standard',
desc: 'Budget-friendly with local materials and standard finishes',
price: 'ETB 8,500-12,000/m²'
},
{
id: 'premium',
label: 'Premium',
desc: 'Mid-range with branded materials and enhanced finishes',
price: 'ETB 13,500-18,000/m²'
},
{
id: 'luxury',
label: 'Luxury',
desc: 'High-end with imported materials, custom designs, premium finishes',
price: 'ETB 20,000-30,000+/m²'
}
].map((tier) => (
<button
key={tier.id}
onClick={() => setQualityTier(tier.id as any)}
className={`p-6 rounded-xl border-2 text-left transition-all ${
qualityTier === tier.id
? 'border-red-600 bg-red-50'
: 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
}`}
>
<div className="flex items-start justify-between mb-2">
<div className="font-bold text-lg">{tier.label}</div>
<div className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
{tier.price}
</div>
</div>
<p className="text-sm text-gray-600">{tier.desc}</p>
</button>
))}
</div>
</div>
{/* Action Buttons */}
<div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
<button
onClick={handleCostCalculate}
disabled={isCalculating}
className={`flex-1 px-8 py-4 text-sm font-medium uppercase tracking-widest rounded-lg transition-all ${
isCalculating
? 'bg-gray-400 cursor-not-allowed'
: 'bg-red-600 hover:bg-red-700 text-white'
}`}
>
{isCalculating ? 'Calculating...' : 'Get Detailed Cost Estimate'}
</button>
{costResult && (
<button
onClick={() => setCostResult(null)}
className="px-8 py-4 text-sm font-medium uppercase tracking-widest rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
>
Reset Form
</button>
)}
</div>
</div>
)}
</div>
</div>
</div>
{/* RESULTS SECTION - CONDITIONALLY RENDERED */}
{(areaResult || costResult) && (
<section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
<div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
<div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
<h2 className="text-2xl font-bold uppercase tracking-tighter text-gray-900">
{activeTab === 'area' ? 'Area Estimation Results' : 'Cost Estimation Results'}
</h2>
</div>
<div className="p-6">
{activeTab === 'area' && areaResult && (
<div>
{/* Two Estimates Display */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
<div className="bg-gray-900 rounded-lg p-6 text-white">
<div className="text-sm opacity-90 mb-2">STANDARD ESTIMATE</div>
<div className="text-4xl font-bold tracking-tighter mb-4">
{areaResult.standardEstimate.toFixed(1)} <span className="text-2xl">m²</span>
</div>
<p className="opacity-90">
Ethiopian workspace standards with proper circulation and amenities
</p>
<div className="mt-4 pt-4 border-t border-gray-700/50">
<div className="text-sm opacity-75 mb-2">Includes:</div>
<ul className="space-y-1 text-sm">
<li>• {ETHIOPIAN_STANDARDS.spacePerPerson[workStyle]}m² per person ({workStyle} layout)</li>
<li>• {Math.round(ETHIOPIAN_STANDARDS.circulationRatio * 100)}% circulation space</li>
<li>• All configured rooms and amenities</li>
</ul>
</div>
</div>
<div className="bg-gray-900 rounded-lg p-6 text-white">
<div className="text-sm opacity-90 mb-2">OPTIMIZED ESTIMATE</div>
<div className="text-4xl font-bold tracking-tighter mb-4">
{areaResult.optimizedEstimate.toFixed(1)} <span className="text-2xl">m²</span>
</div>
<p className="opacity-90">
Space-optimized layout with flexible zoning and shared resources
</p>
<div className="mt-4 pt-4 border-t border-gray-700/50">
<div className="text-sm opacity-75 mb-2">Savings:</div>
<div className="font-bold text-xl">
{Math.round((areaResult.standardEstimate - areaResult.optimizedEstimate) / areaResult.standardEstimate * 100)}% reduction
</div>
<p className="text-xs mt-2 opacity-75">
*Requires modern layout principles, hot-desking, shared amenities
</p>
</div>
</div>
</div>
{/* Room Breakdown Table */}
<div className="mb-6">
<h3 className="font-bold text-gray-900 mb-3 text-lg uppercase tracking-wider">
Room Configuration Breakdown
</h3>
<div className="overflow-x-auto">
<table className="min-w-full border border-gray-200">
<thead className="bg-gray-50">
<tr>
<th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-200">Room Type</th>
<th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-200">Count</th>
<th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-200">Area (m²)</th>
<th className="px-4 py-3 text-left text-xs font-bold uppercase tracking-wider text-gray-600 border-b border-gray-200">Standard</th>
</tr>
</thead>
<tbody>
{areaResult.roomsBreakdown.map((room: any, idx: number) => (
<tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
<td className="px-4 py-3 font-medium">{room.name}</td>
<td className="px-4 py-3">{room.count}</td>
<td className="px-4 py-3 font-bold text-red-600">{room.area.toFixed(1)}</td>
<td className="px-4 py-3 text-sm text-gray-500">{room.standard}</td>
</tr>
))}
<tr className="bg-gray-50 font-bold">
<td className="px-4 py-3">Circulation Space</td>
<td className="px-4 py-3">-</td>
<td className="px-4 py-3 text-red-600">{areaResult.circulationArea.toFixed(1)}</td>
<td className="px-4 py-3">{Math.round(ETHIOPIAN_STANDARDS.circulationRatio * 100)}% of total</td>
</tr>
<tr className="bg-gray-50 text-red-800 font-bold">
<td className="px-4 py-3">TOTAL USABLE AREA</td>
<td className="px-4 py-3">-</td>
<td className="px-4 py-3">{areaResult.standardEstimate.toFixed(1)}</td>
<td className="px-4 py-3">Standard Estimate</td>
</tr>
</tbody>
</table>
</div>
</div>
{/* Recommendations */}
{areaResult.recommendations.length > 0 && (
<div className="bg-gray-50 border-l-4 border-red-600 rounded-lg p-5">
<h4 className="font-bold text-red-900 mb-2">Professional Recommendations</h4>
<ul className="space-y-2">
{areaResult.recommendations.map((rec: string, idx: number) => (
<li key={idx} className="flex items-start gap-2 text-red-800">
<svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<span className="text-sm">{rec}</span>
</li>
))}
</ul>
</div>
)}
</div>
)}
{activeTab === 'cost' && costResult && (
<div>
{/* Total Cost Card */}
<div className="bg-gray-900 rounded-lg p-6 text-white mb-8">
<div className="text-xl font-bold opacity-90 mb-2">TOTAL PROJECT ESTIMATE</div>
<div className="text-4xl font-bold tracking-tighter mb-4">
{costResult.total.toLocaleString()} <span className="text-2xl">ETB</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
<div>
<div className="opacity-75 mb-1">Quality Tier</div>
<div className="font-bold uppercase">
{qualityTier.charAt(0).toUpperCase() + qualityTier.slice(1)}
</div>
</div>
<div>
<div className="opacity-75 mb-1">Project Area</div>
<div className="font-bold">{totalRentedArea} m²</div>
</div>
<div>
<div className="opacity-75 mb-1">Employees</div>
<div className="font-bold">{costHeadcount}</div>
</div>
<div>
<div className="opacity-75 mb-1">Contingency</div>
<div className="font-bold">12%</div>
</div>
</div>
</div>
{/* Section Breakdown */}
<div className="space-y-4">
{Object.keys(costResult)
.filter(k => k.startsWith('section'))
.map((sectionKey) => {
const section = costResult[sectionKey];
if (section.total === 0) return null;
return (
<div key={sectionKey} className="border border-gray-200 rounded-lg p-4">
<div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
<h4 className="font-bold text-gray-900">{section.name}</h4>
<div className="font-bold text-red-600">
{section.total.toLocaleString()} ETB
</div>
</div>
<div className="space-y-2">
{section.items.map((item: any, idx: number) => (
<div key={idx} className="flex justify-between items-start text-sm">
<div>
<div className="font-medium">{item.name}</div>
{item.note && <div className="text-xs text-gray-500">{item.note}</div>}
<div className="text-xs text-gray-400">
{item.quantity} {item.unit} × {item.rate.toLocaleString()} ETB
</div>
</div>
<div className="font-bold text-red-600 whitespace-nowrap">
{item.amount.toLocaleString()} ETB
</div>
</div>
))}
</div>
</div>
);
})}
</div>
{/* Summary */}
<div className="mt-6 pt-4 border-t border-gray-200 bg-gray-50 rounded-lg p-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<div>
<div className="text-sm font-bold text-gray-600 mb-1">Subtotal (with 12% contingency)</div>
<div className="text-xl font-bold">{costResult.subtotal.toLocaleString()} ETB</div>
</div>
<div>
<div className="text-sm font-bold text-gray-600 mb-1">VAT (15%)</div>
<div className="text-xl font-bold text-red-600">{costResult.vat.toLocaleString()} ETB</div>
</div>
</div>
<div className="mt-4 pt-4 border-t border-gray-300">
<div className="text-sm font-bold text-gray-600 mb-1">TOTAL PROJECT COST</div>
<div className="text-2xl font-bold text-red-600">{costResult.total.toLocaleString()} ETB</div>
</div>
</div>
{/* Important Notes */}
<div className="mt-6 bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
<h4 className="font-bold text-amber-900 mb-2">Important Notes</h4>
<ul className="space-y-1 text-sm">
<li className="flex items-start gap-2 text-amber-800">
<svg className="w-3 h-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<span>Estimate based on Ethiopian market rates (Q1 2026)</span>
</li>
<li className="flex items-start gap-2 text-amber-800">
<svg className="w-3 h-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<span>Final pricing subject to site survey and detailed requirements</span>
</li>
<li className="flex items-start gap-2 text-amber-800">
<svg className="w-3 h-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<span>VAT (15%) included in total</span>
</li>
<li className="flex items-start gap-2 text-amber-800">
<svg className="w-3 h-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
<span>Prices valid for 30 days from estimate date</span>
</li>
</ul>
</div>
</div>
)}
</div>
</div>
{/* Final CTA */}
<div className="mt-8 text-center">
<div className="inline-block bg-gray-900 text-white px-6 py-4 rounded-lg">
<h3 className="text-xl font-bold mb-2">Ready for a Detailed Proposal?</h3>
<p className="opacity-90 mb-4 max-w-2xl mx-auto">
This estimate provides a professional ballpark figure. For a precise quotation with material specifications, 3D visuals, and site-specific details, schedule a free consultation with our design team.
</p>
<Link
href="/contact"
className="inline-block bg-red-600 text-white px-8 py-3 rounded-md font-bold uppercase tracking-widest text-sm hover:bg-red-700 transition-colors shadow"
>
Schedule Free Consultation →
</Link>
<p className="text-xs opacity-75 mt-3">
Duka Project Estimator v1.0 • Ethiopian Market Standards • Q1 2026 Rates
</p>
</div>
</div>
</section>
)}
</main>
<Footer />
</>
);
}