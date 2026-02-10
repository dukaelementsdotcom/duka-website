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
  circulationPercentage: 0.22, // 22% circulation space
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

export const ROOM_STANDARDS = {
  [RoomType.PRIVATE_OFFICE]: {
    executive: { min: 18, max: 25, default: 20 },      // Manager/Director
    senior: { min: 15, max: 20, default: 16 },         // Senior staff
    standard: { min: 12, max: 16, default: 14 },       // Regular staff
  },
  [RoomType.OPEN_PLAN]: {
    perPerson: { min: 6, max: 8, default: 7 },         // Desk + circulation
    deskSize: 1.4,                                     // m² per workstation
  },
  [RoomType.MEETING_SMALL]: {
    perPerson: 1.8,                                    // 4-6 people
    tableSize: { width: 1.8, length: 1.2 },            // 6-seater table
    minArea: 12,
    maxArea: 18,
  },
  [RoomType.MEETING_MEDIUM]: {
    perPerson: 1.8,                                    // 8-12 people
    tableSize: { width: 2.4, length: 1.2 },            // 10-seater table
    minArea: 20,
    maxArea: 30,
  },
  [RoomType.MEETING_LARGE]: {
    perPerson: 1.8,                                    // 15-20 people
    tableSize: { width: 3.0, length: 1.2 },            // 18-seater table
    minArea: 35,
    maxArea: 50,
  },
  [RoomType.FOCUS_ROOM]: {
    area: { min: 6, max: 8, default: 7 },              // Single person focus
  },
  [RoomType.RECEPTION]: {
    small: { min: 12, max: 18, default: 15 },          // < 20 staff
    medium: { min: 18, max: 25, default: 20 },         // 20-50 staff
    large: { min: 25, max: 35, default: 30 },          // 50+ staff
  },
  [RoomType.BREAKOUT]: {
    perPerson: 4,                                      // Lounge seating
    minArea: 15,
  },
  [RoomType.ARCHIVE]: {
    small: { min: 8, max: 12, default: 10 },           // < 500 files
    medium: { min: 12, max: 20, default: 15 },         // 500-1500 files
    large: { min: 20, max: 30, default: 25 },          // 1500+ files
  },
  [RoomType.STORAGE]: {
    small: { min: 6, max: 10, default: 8 },            // General storage
    medium: { min: 10, max: 15, default: 12 },
    large: { min: 15, max: 25, default: 20 },
  },
  [RoomType.CANTEEN]: {
    perSeat: 1.5,                                      // Dining space
    kitchenArea: 10,                                   // Fixed kitchen area
    minSeats: 8,
  },
  [RoomType.PANTRY]: {
    area: { min: 6, max: 10, default: 8 },             // Tea/coffee area
  },
  [RoomType.PRINT_ROOM]: {
    area: { min: 6, max: 10, default: 8 },
  },
  [RoomType.SERVER_ROOM]: {
    area: { min: 8, max: 12, default: 10 },
  },
  [RoomType.WELLNESS]: {
    area: { min: 8, max: 12, default: 10 },            // Mother's room, etc.
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