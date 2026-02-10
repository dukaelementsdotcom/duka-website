// ========================================
// COST ESTIMATOR - CONSTANTS
// Ethiopian Market Rates (2026)
// ========================================

import { EthiopianMarketRates, PricingTier } from './types';
import { QUALITY_TIER_NAMES } from '../../Shared/constants';

// Ethiopian Market Rates - PLACEHOLDER VALUES (to be refined with real data)
export const ETHIOPIAN_MARKET_RATES: EthiopianMarketRates = {
  designServices: {
    spacePlanningPerM2: {
      standard: 300,
      premium: 450,
      luxury: 650
    },
    technicalDrawingsPerSheet: {
      standard: 800,
      premium: 1200,
      luxury: 1800
    },
    visualizationPerView: {
      standard: 2500,
      premium: 4000,
      luxury: 6500
    },
    workingDrawingsPackage: {
      standard: 15000,
      premium: 25000,
      luxury: 40000
    },
    boqPreparation: {
      standard: 8000,
      premium: 12000,
      luxury: 18000
    },
    projectManagementPercentage: 0.08 // 8% of construction cost
  },
  materials: {
    gwbPartitionPerM2: {
      standard: 1800,
      premium: 2800,
      luxury: 4200
    },
    glassPartitionPerM2: {
      standard: 3500,
      premium: 5500,
      luxury: 8500
    },
    ceilingWorkPerM2: {
      standard: 950,
      premium: 1500,
      luxury: 2400
    },
    electricalLightingPerFixture: {
      standard: 1200,
      premium: 2200,
      luxury: 3800
    },
    electricalPowerPerPoint: {
      standard: 450,
      premium: 650,
      luxury: 950
    },
    dataPointPerPort: {
      standard: 650,
      premium: 950,
      luxury: 1400
    },
    carpetFlooringPerM2: {
      standard: 1100,
      premium: 1900,
      luxury: 3200
    },
    spcFlooringPerM2: {
      standard: 1400,
      premium: 2400,
      luxury: 4100
    },
    tileFlooringPerM2: {
      standard: 1300,
      premium: 2200,
      luxury: 3800
    },
    paintingPerM2: {
      standard: 350,
      premium: 550,
      luxury: 850
    },
    doorPerUnit: {
      standard: 4500,
      premium: 7500,
      luxury: 12500
    }
  },
  furniture: {
    executiveDesk: {
      standard: 18000,
      premium: 32000,
      luxury: 55000
    },
    managerDesk: {
      standard: 12000,
      premium: 22000,
      luxury: 38000
    },
    workstation: {
      standard: 8500,
      premium: 15000,
      luxury: 26000
    },
    executiveChair: {
      standard: 9500,
      premium: 18000,
      luxury: 32000
    },
    taskChair: {
      standard: 4500,
      premium: 8500,
      luxury: 15000
    },
    visitorChair: {
      standard: 2800,
      premium: 5200,
      luxury: 9500
    },
    conferenceTablePerSeat: {
      standard: 6500,
      premium: 11000,
      luxury: 19000
    },
    storageCabinet: {
      standard: 7500,
      premium: 13000,
      luxury: 22000
    },
    receptionDesk: {
      standard: 28000,
      premium: 48000,
      luxury: 82000
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