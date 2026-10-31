// ========================================
// COST ESTIMATOR - CONSTANTS
// Ethiopian Market Rates (October 2026)
// Sources: 2merkato.com, Jiji.com.et, Conmaret, supplier quotes
// ========================================

import { EthiopianMarketRates, PricingTier } from './types';
import { QUALITY_TIER_NAMES } from '@/components/ProjectScopePro/Shared/constants';

// Ethiopian Market Rates - Updated October 2026
// Based on research from 2merkato, Jiji.com.et, Conmaret price guides
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
    // GWB partition installed: board (~120 ETB/m²) + framing + labor
    gwbPartitionPerM2: {
      standard: 2500,  // Local gypsum, basic finish
      premium: 3200,   // Branded board, smooth finish
      luxury: 4500     // Moisture/fire resistant, premium finish
    },
    // Glass partition: 6mm clear (~2,500 ETB/m²) + aluminum frame + labor
    // Single glass: 12,000-14,000; Double soundproof: 16,000-20,000
    glassPartitionPerM2: {
      standard: 12000, // Single glass, aluminum frame
      premium: 15000,  // Single glass, powder-coated frame
      luxury: 20000    // Double glass soundproof / frameless tempered
    },
    // False ceiling: mineral fiber tiles + grid + labor
    ceilingWorkPerM2: {
      standard: 2000,  // Local tiles, basic grid
      premium: 2800,   // Branded tiles (Armstrong), T-grid
      luxury: 4000     // Acoustic tiles, concealed grid
    },
    // LED panel 60x60: 2,000-2,500 ETB each
    electricalLightingPerFixture: {
      standard: 2000,
      premium: 2800,
      luxury: 4500
    },
    // Socket outlet: 80-350 ETB + installation
    electricalPowerPerPoint: {
      standard: 450,
      premium: 650,
      luxury: 1000
    },
    // Data point: 650 ETB + cabling
    dataPointPerPort: {
      standard: 800,
      premium: 1200,
      luxury: 1800
    },
    // Carpet tiles installed: 3,500-5,500 ETB/m²
    carpetFlooringPerM2: {
      standard: 3500,  // Local/economy tiles
      premium: 4500,   // Branded (Interface, Milliken)
      luxury: 6500     // Premium acoustic/modular
    },
    // SPC flooring: 1,500-3,500 ETB/m² installed
    spcFlooringPerM2: {
      standard: 2000,
      premium: 2800,
      luxury: 4000
    },
    // Porcelain tiles: 2,500-5,000 ETB/m² installed
    tileFlooringPerM2: {
      standard: 2800,
      premium: 4000,
      luxury: 5500
    },
    // Painting: 150-250 ETB/m² (2 coats, including prep)
    paintingPerM2: {
      standard: 180,
      premium: 250,
      luxury: 400
    },
    // Glass door with hardware: 8,500 ETB
    doorPerUnit: {
      standard: 6500,  // Wooden door
      premium: 9000,   // Glass door, aluminum frame
      luxury: 15000    // Frameless glass, premium hardware
    }
  },
  furniture: {
    // Executive desk: Jiji shows 35,000-250,000 ETB
    executiveDesk: {
      standard: 28000,
      premium: 45000,
      luxury: 85000
    },
    // Manager desk: Jiji shows 35,000-42,000 ETB
    managerDesk: {
      standard: 22000,
      premium: 35000,
      luxury: 55000
    },
    // Staff desk / workstation: 13,000-27,000 ETB
    workstation: {
      standard: 14000,
      premium: 22000,
      luxury: 35000
    },
    // Managerial leather chair: ~38,000 ETB; Ergonomic: 42,000-49,000
    executiveChair: {
      standard: 15000,
      premium: 28000,
      luxury: 45000
    },
    // Task chair: Jiji shows ~6,500 ETB basic, mesh with headrest ~9,500
    taskChair: {
      standard: 6500,
      premium: 9500,
      luxury: 18000
    },
    // Visitor/guest chair: 3,200-6,000 ETB
    visitorChair: {
      standard: 3500,
      premium: 5500,
      luxury: 9000
    },
    // Conference table per seat
    conferenceTablePerSeat: {
      standard: 8000,
      premium: 14000,
      luxury: 24000
    },
    // Storage cabinet: tall 90x180 ~15,000; short 90x90 ~9,000
    storageCabinet: {
      standard: 9000,
      premium: 15000,
      luxury: 25000
    },
    // Reception desk: small 1.8m ~28,000; medium 2.4m ~42,000; large 3.2m ~65,000
    receptionDesk: {
      standard: 28000,
      premium: 45000,
      luxury: 75000
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