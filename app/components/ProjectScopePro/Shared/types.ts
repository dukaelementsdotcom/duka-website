// ========================================
// PROJECTSCOPE PRO - SHARED TYPES
// Ethiopian Interior Design Standards
// ========================================

// ==================== ENUMS ====================

export enum ProjectType {
  RESIDENTIAL = 'residential',
  OFFICE = 'office',
  RETAIL = 'retail',
  HOSPITALITY = 'hospitality',
  HEALTHCARE = 'healthcare',
  EDUCATION = 'education',
  COMMERCIAL = 'commercial',
}

export enum ServiceCategory {
  DESIGN_SERVICES = 'design_services',
  DESIGN_AND_BUILD = 'design_and_build',
  FURNITURE_ONLY = 'furniture_only',
  RENOVATION = 'renovation',
}

export enum QualityTier {
  STANDARD = 'standard',    // Budget-friendly, local materials
  PREMIUM = 'premium',      // Mid-range, branded materials
  LUXURY = 'luxury',        // High-end, imported, custom
}

export enum WorkStyle {
  TRADITIONAL = 'traditional',    // Mostly private offices
  HYBRID = 'hybrid',              // Mix of private + open
  MODERN = 'modern',              // Open plan focused
  ACTIVITY_BASED = 'activity_based', // Activity-based working
}

// ==================== ROOM TYPES ====================

export enum RoomType {
  PRIVATE_OFFICE = 'private_office',
  OPEN_PLAN = 'open_plan',
  MEETING_SMALL = 'meeting_small',      // 4-6 people
  MEETING_MEDIUM = 'meeting_medium',    // 8-12 people
  MEETING_LARGE = 'meeting_large',      // 15-20 people
  FOCUS_ROOM = 'focus_room',
  RECEPTION = 'reception',
  BREAKOUT = 'breakout',
  ARCHIVE = 'archive',
  STORAGE = 'storage',
  CANTEEN = 'canteen',
  PANTRY = 'pantry',
  PRINT_ROOM = 'print_room',
  SERVER_ROOM = 'server_room',
  WELLNESS = 'wellness',
  CIRCULATION = 'circulation',
}

// ==================== SPACE PLANNER TYPES ====================

export interface RoomConfig {
  type: RoomType;
  count: number;
  areaPerUnit?: number;        // m² per room or per person
  customSize?: number;         // Custom size override (m²)
  peoplePerRoom?: number;      // For meeting rooms
  notes?: string;
}

export interface SpacePlannerInput {
  headcount: number;
  growthProjection: number;    // 1-3 years growth (%)
  workStyle: WorkStyle;
  rooms: RoomConfig[];
  location?: string;           // Addis Ababa area
}

export interface RoomCalculation {
  type: RoomType;
  count: number;
  areaPerUnit: number;
  totalArea: number;
  standardUsed: string;
  notes?: string;
}

export interface SpaceCalculationResult {
  rooms: RoomCalculation[];
  circulationArea: number;
  totalUsableArea: number;
  totalRentableArea: number;
  efficiencyRatio: number;
  designServiceCost?: number;
  recommendations: string[];
}

// ==================== COST ESTIMATOR TYPES ====================

// Design Services
export enum DesignServiceType {
  SPACE_PLANNING = 'space_planning',
  TECHNICAL_DRAWINGS = 'technical_drawings',
  VISUALIZATIONS_3D = 'visualizations_3d',
  MATERIAL_BOARDS = 'material_boards',
  LIGHTING_DESIGN = 'lighting_design',
  FURNITURE_LAYOUT = 'furniture_layout',
  WORKING_DRAWINGS = 'working_drawings',
  BOQ = 'boq',
  PROJECT_MANAGEMENT = 'project_management',
  SITE_SUPERVISION = 'site_supervision',
  ANIMATED_VIDEO = 'animated_video',
}

export interface DesignService {
  type: DesignServiceType;
  selected: boolean;
  quantity?: number;        // For per-view, per-sheet, etc.
  customNotes?: string;
}

export interface DesignServicesInput {
  projectType: ProjectType;
  services: DesignService[];
  area?: number;            // m² for area-based pricing
  complexity: 'low' | 'medium' | 'high';
}

// Design + Build - Materials & Work
export enum MaterialCategory {
  GWB_PARTITIONS = 'gwb_partitions',
  GLASS_PARTITIONS = 'glass_partitions',
  CEILING_WORK = 'ceiling_work',
  ELECTRICAL_LIGHTING = 'electrical_lighting',
  ELECTRICAL_POWER = 'electrical_power',
  DATA_NETWORK = 'data_network',
  AC_SYSTEMS = 'ac_systems',
  FLOORING_CARPET = 'flooring_carpet',
  FLOORING_SPC = 'flooring_spc',
  FLOORING_TILES = 'flooring_tiles',
  PAINTING = 'painting',
  DOORS = 'doors',
  WINDOW_TREATMENTS = 'window_treatments',
  SIGNAGE = 'signage',
}

export interface MaterialEstimate {
  category: MaterialCategory;
  quantity: number;         // m², linear meters, count, etc.
  unit: string;             // 'm²', 'lm', 'each', 'fixture'
  qualityTier: QualityTier;
  unitPrice: number;        // ETB per unit
  totalPrice: number;
  notes?: string;
}

export interface FurnitureItem {
  name: string;
  category: string;         // 'desk', 'chair', 'storage', etc.
  quantity: number;
  qualityTier: QualityTier;
  unitPrice: number;        // ETB
  totalPrice: number;
  notes?: string;
}

export interface DesignBuildInput extends SpacePlannerInput {
  qualityTier: QualityTier;
  includeAC: boolean;
  flooringPreferences: {
    carpetAreas: string[];    // Room types for carpet
    spcAreas: string[];       // Room types for SPC
    tileAreas: string[];      // Room types for tiles
  };
  furnitureQuality: QualityTier;
  specialRequirements?: string;
}

export interface CostBreakdown {
  designServices?: {
    items: { name: string; cost: number; notes?: string }[];
    subtotal: number;
  };
  materials?: {
    items: MaterialEstimate[];
    subtotal: number;
  };
  furniture?: {
    items: FurnitureItem[];
    subtotal: number;
  };
  labor?: number;
  contingency: number;
  subtotal: number;
  vat?: number;
  total: number;
}

export interface CostEstimateResult {
  projectType: ProjectType;
  serviceCategory: ServiceCategory;
  area?: number;
  breakdown: CostBreakdown;
  timeline: {
    designPhase: string;      // e.g., "4-6 weeks"
    construction: string;     // e.g., "8-12 weeks"
    total: string;
  };
  notes: string[];
}

// ==================== SHARED RESPONSE TYPES ====================

export interface EstimateResult {
  type: ServiceCategory;
  spaceCalculation?: SpaceCalculationResult;
  costEstimate?: CostEstimateResult;
  createdAt: string;
  id: string;
}

// ==================== FORM STATE TYPES ====================

export interface ProjectScopeFormState {
  currentStep: number;
  totalSteps: number;
  serviceCategory: ServiceCategory | null;
  spaceInput?: SpacePlannerInput;
  costInput?: DesignBuildInput | DesignServicesInput;
  result?: EstimateResult;
}

// ==================== ETHIOPIAN CONTEXT ====================

export interface EthiopianStandards {
  currency: 'ETB';
  currencySymbol: 'Br';
  defaultVAT: number;              // 15% VAT in Ethiopia
  circulationPercentage: number;   // 20-25% standard
  electricalStandards: {
    voltage: string;               // 220V
    socketPerDesk: number;
    dataPointPerDesk: number;
  };
  addisAbabaAreas: string[];
}