// ========================================
// COST ESTIMATOR - CONSTANTS
// Ethiopian Market Rates (October 2026)
// Sources: 2merkato.com, Jiji.com.et, Conmaret, supplier quotes
// ========================================

import { EthiopianMarketRates, PricingTier } from './types';
import { QUALITY_TIER_NAMES } from '@/components/ProjectScopePro/Shared/constants';

// Ethiopian Market Rates - Updated October 2026
// VERIFIED against actual Duka BOQs: FENOT (2022), Ethiojobs (2024), INTERPOL (2026), Precision (2026)
export const ETHIOPIAN_MARKET_RATES: EthiopianMarketRates = {
  designServices: {
    spacePlanningPerM2: {
      standard: 1000,
      premium: 1500,
      luxury: 2500
    },
    technicalDrawingsPerSheet: {
      standard: 1200,
      premium: 1800,
      luxury: 2800
    },
    visualizationPerView: {
      standard: 3500,
      premium: 5500,
      luxury: 9000
    },
    workingDrawingsPackage: {
      standard: 20000,
      premium: 35000,
      luxury: 55000
    },
    boqPreparation: {
      standard: 10000,
      premium: 15000,
      luxury: 25000
    },
    projectManagementPercentage: 0.10 // 10% of construction cost
  },
  materials: {
    // GWB partition - VERIFIED: FENOT 2,724; Ethiojobs 3,500; Precision 3,900-5,200
    gwbPartitionPerM2: {
      standard: 3500,  // Basic 90mm double-sided (Ethiojobs 2024)
      premium: 4200,   // Quality finish (Precision 2026)
      luxury: 5500     // Sound insulated (INTERPOL 4,800; Precision 5,200)
    },
    // Glass partition - VERIFIED: FENOT 9,000; Ethiojobs 15,295; INTERPOL 15,000; Precision 17,550
    glassPartitionPerM2: {
      standard: 13000, // Aluminum frame, 6mm glass
      premium: 16000,  // Tempered 10mm, U-channel (INTERPOL 15,000)
      luxury: 20000    // Tempered 10mm premium (Precision 17,550 + margin)
    },
    // False ceiling - VERIFIED: FENOT 2,004; Ethiojobs 3,500; Precision 3,640
    ceilingWorkPerM2: {
      standard: 2800,  // Local tiles, basic grid
      premium: 3600,   // Quality tiles (Ethiojobs/Precision ~3,500-3,640)
      luxury: 5000     // Acoustic tiles, concealed grid
    },
    // LED panel 600x600 - VERIFIED: FENOT 4,880; INTERPOL 5,400; Precision 4,550
    electricalLightingPerFixture: {
      standard: 4000,  // Basic 48W panel
      premium: 5000,   // Quality brand (INTERPOL 5,400)
      luxury: 7000     // Premium with dimming
    },
    // Socket outlet - VERIFIED: Ethiojobs 1,540-1,680; INTERPOL 1,200
    electricalPowerPerPoint: {
      standard: 1200,
      premium: 1600,
      luxury: 2200
    },
    // Data point - VERIFIED: INTERPOL 2,940/pt
    dataPointPerPort: {
      standard: 2500,
      premium: 3200,
      luxury: 4500
    },
    // Carpet tiles - VERIFIED: FENOT 2,280; Ethiojobs 1,974; INTERPOL 8,400 (premium)
    carpetFlooringPerM2: {
      standard: 2500,  // Economy bitumen-backed (FENOT/Ethiojobs ~2,000-2,300)
      premium: 5000,   // Mid-range branded
      luxury: 8500     // Premium (INTERPOL 8,400)
    },
    // SPC flooring - market survey based
    spcFlooringPerM2: {
      standard: 2200,
      premium: 3200,
      luxury: 4500
    },
    // Porcelain tiles - VERIFIED: FENOT 2,400
    tileFlooringPerM2: {
      standard: 2500,
      premium: 3500,
      luxury: 5000
    },
    // Painting - VERIFIED: FENOT 156; Ethiojobs 231; INTERPOL 420; Precision 325
    paintingPerM2: {
      standard: 250,   // Two coats emulsion (avg of recent BOQs)
      premium: 380,    // Three coats, prep included
      luxury: 550      // Premium finish, feature walls
    },
    // Doors - VERIFIED: FENOT wooden 21,600-24,000; INTERPOL wooden 48,000; Precision 41,600
    doorPerUnit: {
      standard: 25000, // Wooden flush door
      premium: 42000,  // Quality wooden (Precision 41,600)
      luxury: 65000    // Aluminum/glass framed
    }
  },
  furniture: {
    // Executive desk - VERIFIED: INTERPOL 62,843 (EBY-M1511 160cm)
    executiveDesk: {
      standard: 35000,
      premium: 55000,
      luxury: 95000
    },
    // Manager/L-type desk - VERIFIED: INTERPOL 52,973 (EB140 L-shape)
    managerDesk: {
      standard: 28000,
      premium: 45000,
      luxury: 75000
    },
    // Staff workstation - VERIFIED: INTERPOL 52,973 (with pedestal)
    workstation: {
      standard: 18000,
      premium: 28000,
      luxury: 45000
    },
    // Executive chair - VERIFIED: INTERPOL 32,414 (EBY-A3069 high back)
    executiveChair: {
      standard: 18000,
      premium: 32000,
      luxury: 50000
    },
    // Task chair - VERIFIED: INTERPOL 15,341 (EBY-AOD557 mid back)
    taskChair: {
      standard: 8000,
      premium: 15000,
      luxury: 25000
    },
    // Visitor/guest chair - VERIFIED: INTERPOL 17,640
    visitorChair: {
      standard: 6000,
      premium: 12000,
      luxury: 20000
    },
    // Conference table per seat
    conferenceTablePerSeat: {
      standard: 10000,
      premium: 18000,
      luxury: 30000
    },
    // Storage cabinet - VERIFIED: INTERPOL 38,430 (metal); Deluxe 94,448
    storageCabinet: {
      standard: 12000,
      premium: 25000,
      luxury: 50000
    },
    // Reception desk - VERIFIED: market survey
    receptionDesk: {
      standard: 35000,
      premium: 55000,
      luxury: 90000
    }
  }
};

export const SERVICE_CATEGORY_OPTIONS = [
  {
    id: 'design_services',
    label: 'Design Services Only',
    description: 'Space planning, 3D visuals, working drawings & BOQ',
    icon: '📐'
  },
  {
    id: 'design_and_build',
    label: 'Design + Build (Office)',
    description: 'Full turnkey solution including materials & installation',
    icon: '🏢'
  },
  {
    id: 'furniture_only',
    label: 'Furniture Only',
    description: 'Sourcing & installation of office furniture',
    icon: '🪑'
  },
  {
    id: 'renovation',
    label: 'Renovation',
    description: 'Partial or full renovation of existing space',
    icon: '🔨'
  }
];

export const PROJECT_TYPE_OPTIONS = [
  { id: 'office', label: 'Office', icon: '🏢' },
  { id: 'residential', label: 'Residential', icon: '🏠' },
  { id: 'retail', label: 'Retail', icon: '🛍️' },
  { id: 'hospitality', label: 'Hospitality', icon: '🏨' },
  { id: 'healthcare', label: 'Healthcare', icon: '🏥' },
  { id: 'education', label: 'Education', icon: '🏫' },
  { id: 'commercial', label: 'Commercial', icon: '🏦' }
];

export const QUALITY_TIER_OPTIONS = [
  {
    id: 'standard',
    label: 'Standard',
    description: 'Budget-friendly with local materials and standard finishes',
    color: 'bg-gray-500'
  },
  {
    id: 'premium',
    label: 'Premium',
    description: 'Mid-range with branded materials and enhanced finishes',
    color: 'bg-blue-500'
  },
  {
    id: 'luxury',
    label: 'Luxury',
    description: 'High-end with imported materials, custom designs, and premium finishes',
    color: 'bg-gold-500'
  }
];

export const DESIGN_SERVICE_OPTIONS = [
  {
    id: 'space_planning',
    label: 'Space Planning & Layout',
    description: 'Functional layout optimization based on your requirements',
    defaultSelected: true
  },
  {
    id: 'technical_drawings',
    label: '2D Technical Drawings',
    description: 'Detailed floor plans, elevations, and sections',
    defaultSelected: true
  },
  {
    id: 'visualizations_3d',
    label: '3D Visualizations',
    description: 'Photorealistic renders of key spaces (reception, meeting rooms)',
    defaultSelected: true,
    quantityOptions: { min: 2, max: 10, label: 'views' }
  },
  {
    id: 'material_boards',
    label: 'Material Boards & Selection',
    description: 'Curated material palettes with samples',
    defaultSelected: false
  },
  {
    id: 'lighting_design',
    label: 'Lighting Design Plan',
    description: 'Strategic lighting layout for ambiance and functionality',
    defaultSelected: false
  },
  {
    id: 'furniture_layout',
    label: 'Furniture Layout Plan',
    description: 'Detailed furniture placement and specification',
    defaultSelected: true
  },
  {
    id: 'working_drawings',
    label: 'Working Drawings Package',
    description: 'Complete construction documentation',
    defaultSelected: true
  },
  {
    id: 'boq',
    label: 'Bill of Quantities (BOQ)',
    description: 'Detailed material and labor breakdown',
    defaultSelected: true
  },
  {
    id: 'project_management',
    label: 'Project Management',
    description: 'Oversight from design through completion',
    defaultSelected: false
  },
  {
    id: 'site_supervision',
    label: 'Site Supervision',
    description: 'Regular site visits and quality control',
    defaultSelected: false,
    quantityOptions: { min: 4, max: 20, label: 'visits' }
  },
  {
    id: 'animated_video',
    label: 'Animated Walkthrough Video',
    description: '3D animated tour of the designed space',
    defaultSelected: false,
    quantityOptions: { min: 1, max: 3, label: 'minutes' }
  }
];