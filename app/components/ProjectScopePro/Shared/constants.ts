// ========================================
// PROJECTSCOPE PRO - SHARED CONSTANTS
// Ethiopian Interior Design Standards
// ========================================

import { EthiopianStandards, RoomType, WorkStyle } from './types';

// ==================== ETHIOPIAN STANDARDS ====================

export const ETHIOPIAN_STANDARDS: EthiopianStandards = {
  currency: 'ETB',
  currencySymbol: 'Br',
  defaultVAT: 0.15,
  circulationPercentage: 0.18, // 18% circulation space (Ethiopian practice)
  electricalStandards: {
    voltage: '220V',
    socketPerDesk: 2,
    dataPointPerDesk: 1.5,
  },
  addisAbabaAreas: [
    'Bole',
    'Kazanchis',
    'Piassa',
    'CMC',
    'Old Airport',
    'Gerji',
    'Yeka',
    'Kirkos',
    'Arada',
    'Lemi Kura',
    'Sar Bet',
    'Megenagna',
    'Kotebe',
    'Lafto',
    'Nifas Silk',
  ],
};

// ==================== ROOM SIZE STANDARDS (m²) ====================
// Ethiopian standards - more compact than international norms
// Reflects local practice where rent is expensive relative to wages

export const ROOM_STANDARDS = {
  [RoomType.PRIVATE_OFFICE]: {
    executive: { min: 15, max: 20, default: 16 },      // Manager/Director (int'l: 20-25)
    senior: { min: 12, max: 16, default: 14 },         // Senior staff (int'l: 16-20)
    standard: { min: 9, max: 12, default: 10 },        // Regular staff (int'l: 12-16)
  },
  [RoomType.OPEN_PLAN]: {
    perPerson: { min: 5, max: 7, default: 6 },         // Desk + circulation (int'l: 7-8)
    deskSize: 1.2,                                     // m² per workstation
  },
  [RoomType.MEETING_SMALL]: {
    perPerson: 1.6,                                    // 4-6 people
    tableSize: { width: 1.6, length: 1.0 },            // 6-seater table
    minArea: 10,
    maxArea: 14,
  },
  [RoomType.MEETING_MEDIUM]: {
    perPerson: 1.6,                                    // 8-12 people
    tableSize: { width: 2.2, length: 1.0 },            // 10-seater table
    minArea: 16,
    maxArea: 24,
  },
  [RoomType.MEETING_LARGE]: {
    perPerson: 1.6,                                    // 15-20 people
    tableSize: { width: 2.8, length: 1.0 },            // 18-seater table
    minArea: 28,
    maxArea: 40,
  },
  [RoomType.FOCUS_ROOM]: {
    area: { min: 5, max: 7, default: 6 },              // Single person focus
  },
  [RoomType.RECEPTION]: {
    small: { min: 10, max: 15, default: 12 },          // < 20 staff
    medium: { min: 15, max: 22, default: 18 },         // 20-50 staff
    large: { min: 22, max: 30, default: 25 },          // 50+ staff
  },
  [RoomType.BREAKOUT]: {
    perPerson: 3,                                      // Lounge seating
    minArea: 12,
  },
  [RoomType.ARCHIVE]: {
    small: { min: 6, max: 10, default: 8 },            // < 500 files
    medium: { min: 10, max: 15, default: 12 },         // 500-1500 files
    large: { min: 15, max: 25, default: 20 },          // 1500+ files
  },
  [RoomType.STORAGE]: {
    small: { min: 5, max: 8, default: 6 },             // General storage
    medium: { min: 8, max: 12, default: 10 },
    large: { min: 12, max: 20, default: 15 },
  },
  [RoomType.CANTEEN]: {
    perSeat: 1.3,                                      // Dining space (tighter)
    kitchenArea: 8,                                    // Fixed kitchen area
    minSeats: 6,
  },
  [RoomType.PANTRY]: {
    area: { min: 5, max: 8, default: 6 },              // Tea/coffee area
  },
  [RoomType.PRINT_ROOM]: {
    area: { min: 5, max: 8, default: 6 },
  },
  [RoomType.SERVER_ROOM]: {
    area: { min: 6, max: 10, default: 8 },
  },
  [RoomType.WELLNESS]: {
    area: { min: 6, max: 10, default: 8 },             // Mother's room, etc.
  },
};

// ==================== WORK STYLE DISTRIBUTION ====================

export const WORK_STYLE_DISTRIBUTION = {
  [WorkStyle.TRADITIONAL]: {
    privateOfficeRatio: 0.7,    // 70% private offices
    openPlanRatio: 0.2,         // 20% open plan
    breakoutRatio: 0.1,         // 10% breakout/collaboration
  },
  [WorkStyle.HYBRID]: {
    privateOfficeRatio: 0.4,    // 40% private offices
    openPlanRatio: 0.4,         // 40% open plan
    breakoutRatio: 0.2,         // 20% breakout/collaboration
  },
  [WorkStyle.MODERN]: {
    privateOfficeRatio: 0.15,   // 15% private offices
    openPlanRatio: 0.65,        // 65% open plan
    breakoutRatio: 0.2,         // 20% breakout/collaboration
  },
  [WorkStyle.ACTIVITY_BASED]: {
    privateOfficeRatio: 0.1,    // 10% private offices
    openPlanRatio: 0.5,         // 50% open plan
    breakoutRatio: 0.3,         // 30% breakout/collaboration
    focusRoomRatio: 0.1,        // 10% focus rooms
  },
};

// ==================== DEFAULT ROOM CONFIGURATIONS ====================

export const DEFAULT_ROOM_CONFIGS = {
  smallOffice: {
    headcount: 10,
    workStyle: WorkStyle.HYBRID,
    rooms: [
      { type: RoomType.PRIVATE_OFFICE, count: 2 },
      { type: RoomType.OPEN_PLAN, count: 6 },
      { type: RoomType.MEETING_SMALL, count: 1, peoplePerRoom: 6 },
      { type: RoomType.RECEPTION, count: 1 },
      { type: RoomType.PANTRY, count: 1 },
    ],
  },
  mediumOffice: {
    headcount: 30,
    workStyle: WorkStyle.HYBRID,
    rooms: [
      { type: RoomType.PRIVATE_OFFICE, count: 6 },
      { type: RoomType.OPEN_PLAN, count: 18 },
      { type: RoomType.MEETING_SMALL, count: 2, peoplePerRoom: 6 },
      { type: RoomType.MEETING_MEDIUM, count: 1, peoplePerRoom: 10 },
      { type: RoomType.RECEPTION, count: 1 },
      { type: RoomType.BREAKOUT, count: 1 },
      { type: RoomType.PANTRY, count: 1 },
      { type: RoomType.ARCHIVE, count: 1 },
    ],
  },
  largeOffice: {
    headcount: 80,
    workStyle: WorkStyle.MODERN,
    rooms: [
      { type: RoomType.PRIVATE_OFFICE, count: 8 },
      { type: RoomType.OPEN_PLAN, count: 60 },
      { type: RoomType.MEETING_SMALL, count: 3, peoplePerRoom: 6 },
      { type: RoomType.MEETING_MEDIUM, count: 2, peoplePerRoom: 10 },
      { type: RoomType.MEETING_LARGE, count: 1, peoplePerRoom: 18 },
      { type: RoomType.RECEPTION, count: 1 },
      { type: RoomType.BREAKOUT, count: 3 },
      { type: RoomType.CANTEEN, count: 1 },
      { type: RoomType.PANTRY, count: 2 },
      { type: RoomType.ARCHIVE, count: 2 },
      { type: RoomType.STORAGE, count: 2 },
      { type: RoomType.PRINT_ROOM, count: 1 },
    ],
  },
};

// ==================== PROJECT TYPE NAMES ====================

export const PROJECT_TYPE_NAMES = {
  residential: 'Residential',
  office: 'Office',
  retail: 'Retail',
  hospitality: 'Hospitality',
  healthcare: 'Healthcare',
  education: 'Education',
  commercial: 'Commercial',
};

export const SERVICE_CATEGORY_NAMES = {
  design_services: 'Design Services',
  design_and_build: 'Design + Build',
  furniture_only: 'Furniture Only',
  renovation: 'Renovation',
};

// ==================== QUALITY TIER NAMES ====================

export const QUALITY_TIER_NAMES = {
  standard: 'Standard',
  premium: 'Premium',
  luxury: 'Luxury',
};

export const QUALITY_TIER_DESCRIPTIONS = {
  standard: 'Budget-friendly with local materials and standard finishes',
  premium: 'Mid-range with branded materials and enhanced finishes',
  luxury: 'High-end with imported materials, custom designs, and premium finishes',
};