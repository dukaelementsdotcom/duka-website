// ========================================
// PROJECTSCOPE PRO - UTILITY FUNCTIONS
// ========================================

import { 
  EthiopianStandards, 
  RoomType, 
  RoomConfig, 
  RoomCalculation,
  SpaceCalculationResult,
  WorkStyle,
  ETHIOPIAN_STANDARDS,
  ROOM_STANDARDS,
  WORK_STYLE_DISTRIBUTION
} from './types';
import { DEFAULT_ROOM_CONFIGS } from './constants';

// ==================== FORMATTING UTILS ====================

export function formatCurrency(amount: number, currency: string = 'ETB'): string {
  const formatter = new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formatter.format(amount);
}

export function formatArea(area: number): string {
  return `${area.toFixed(1)} m²`;
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

// ==================== SPACE CALCULATION UTILS ====================

export function calculateMeetingRoomSize(people: number): number {
  const perPerson = ROOM_STANDARDS[RoomType.MEETING_SMALL].perPerson;
  
  if (people <= 6) {
    return Math.max(ROOM_STANDARDS[RoomType.MEETING_SMALL].minArea, people * perPerson);
  } else if (people <= 12) {
    return Math.max(ROOM_STANDARDS[RoomType.MEETING_MEDIUM].minArea, people * perPerson);
  } else {
    return Math.max(ROOM_STANDARDS[RoomType.MEETING_LARGE].minArea, people * perPerson);
  }
}

export function calculateReceptionSize(headcount: number): number {
  if (headcount < 20) return ROOM_STANDARDS[RoomType.RECEPTION].small.default;
  if (headcount < 50) return ROOM_STANDARDS[RoomType.RECEPTION].medium.default;
  return ROOM_STANDARDS[RoomType.RECEPTION].large.default;
}

export function calculateCanteenSize(headcount: number): number {
  // Assume 30% of staff eat at once
  const seatsNeeded = Math.ceil(headcount * 0.3);
  const diningArea = seatsNeeded * ROOM_STANDARDS[RoomType.CANTEEN].perSeat;
  return diningArea + ROOM_STANDARDS[RoomType.CANTEEN].kitchenArea;
}

export function calculateBreakoutSpace(headcount: number): number {
  // 10-15% of headcount × 4m² per breakout area
  const breakoutCount = Math.ceil(headcount * 0.12);
  return breakoutCount * ROOM_STANDARDS[RoomType.BREAKOUT].minArea;
}

// ==================== AUTO-DISTRIBUTION LOGIC ====================

export function autoDistributeRooms(
  headcount: number,
  workStyle: WorkStyle,
  existingRooms: RoomConfig[] = []
): RoomConfig[] {
  const distribution = WORK_STYLE_DISTRIBUTION[workStyle];
  const existingRoomTypes = new Set(existingRooms.map(r => r.type));
  
  const rooms: RoomConfig[] = [...existingRooms];
  
  // Calculate private offices
  if (!existingRoomTypes.has(RoomType.PRIVATE_OFFICE)) {
    const privateOfficeCount = Math.ceil(headcount * distribution.privateOfficeRatio);
    if (privateOfficeCount > 0) {
      rooms.push({
        type: RoomType.PRIVATE_OFFICE,
        count: privateOfficeCount,
      });
    }
  }
  
  // Calculate open plan staff
  if (!existingRoomTypes.has(RoomType.OPEN_PLAN)) {
    const openPlanCount = Math.ceil(headcount * distribution.openPlanRatio);
    if (openPlanCount > 0) {
      rooms.push({
        type: RoomType.OPEN_PLAN,
        count: openPlanCount,
      });
    }
  }
  
  // Add meeting rooms based on headcount
  if (!existingRoomTypes.has(RoomType.MEETING_SMALL) && 
      !existingRoomTypes.has(RoomType.MEETING_MEDIUM) &&
      !existingRoomTypes.has(RoomType.MEETING_LARGE)) {
    
    if (headcount <= 20) {
      rooms.push({ type: RoomType.MEETING_SMALL, count: 1, peoplePerRoom: 6 });
    } else if (headcount <= 50) {
      rooms.push({ type: RoomType.MEETING_SMALL, count: 2, peoplePerRoom: 6 });
      rooms.push({ type: RoomType.MEETING_MEDIUM, count: 1, peoplePerRoom: 10 });
    } else {
      rooms.push({ type: RoomType.MEETING_SMALL, count: 3, peoplePerRoom: 6 });
      rooms.push({ type: RoomType.MEETING_MEDIUM, count: 2, peoplePerRoom: 10 });
      rooms.push({ type: RoomType.MEETING_LARGE, count: 1, peoplePerRoom: 18 });
    }
  }
  
  // Add reception if not exists
  if (!existingRoomTypes.has(RoomType.RECEPTION)) {
    rooms.push({ type: RoomType.RECEPTION, count: 1 });
  }
  
  // Add breakout spaces
  if (!existingRoomTypes.has(RoomType.BREAKOUT) && distribution.breakoutRatio > 0) {
    const breakoutCount = Math.ceil(headcount * distribution.breakoutRatio / 8); // 8 people per breakout
    if (breakoutCount > 0) {
      rooms.push({ type: RoomType.BREAKOUT, count: breakoutCount });
    }
  }
  
  // Add focus rooms for activity-based working
  if (workStyle === WorkStyle.ACTIVITY_BASED && !existingRoomTypes.has(RoomType.FOCUS_ROOM)) {
    const focusRoomCount = Math.ceil(headcount * distribution.focusRoomRatio / 2); // 2 people per focus room
    if (focusRoomCount > 0) {
      rooms.push({ type: RoomType.FOCUS_ROOM, count: focusRoomCount });
    }
  }
  
  // Add pantry
  if (!existingRoomTypes.has(RoomType.PANTRY)) {
    rooms.push({ type: RoomType.PANTRY, count: 1 });
  }
  
  // Add archive for larger offices
  if (headcount > 25 && !existingRoomTypes.has(RoomType.ARCHIVE)) {
    rooms.push({ type: RoomType.ARCHIVE, count: 1 });
  }
  
  // Add canteen for larger offices
  if (headcount > 40 && !existingRoomTypes.has(RoomType.CANTEEN)) {
    rooms.push({ type: RoomType.CANTEEN, count: 1 });
  }
  
  return rooms;
}

// ==================== ROOM CALCULATION LOGIC ====================

export function calculateRoomArea(room: RoomConfig): number {
  const standard = ROOM_STANDARDS[room.type];
  
  if (room.customSize) {
    return room.customSize;
  }
  
  switch (room.type) {
    case RoomType.PRIVATE_OFFICE:
      return room.count * standard.standard.default;
    
    case RoomType.OPEN_PLAN:
      return room.count * standard.perPerson.default;
    
    case RoomType.MEETING_SMALL:
    case RoomType.MEETING_MEDIUM:
    case RoomType.MEETING_LARGE:
      if (room.peoplePerRoom) {
        return room.count * calculateMeetingRoomSize(room.peoplePerRoom);
      }
      return room.count * standard.minArea;
    
    case RoomType.FOCUS_ROOM:
      return room.count * standard.area.default;
    
    case RoomType.RECEPTION:
      return room.count * standard.medium.default;
    
    case RoomType.BREAKOUT:
      return room.count * standard.minArea;
    
    case RoomType.ARCHIVE:
      return room.count * standard.medium.default;
    
    case RoomType.STORAGE:
      return room.count * standard.medium.default;
    
    case RoomType.CANTEEN:
      return room.count * 30; // Default 30m²
    
    case RoomType.PANTRY:
      return room.count * standard.area.default;
    
    case RoomType.PRINT_ROOM:
      return room.count * standard.area.default;
    
    case RoomType.SERVER_ROOM:
      return room.count * standard.area.default;
    
    case RoomType.WELLNESS:
      return room.count * standard.area.default;
    
    default:
      return 0;
  }
}

// ==================== VALIDATION UTILS ====================

export function validateHeadcount(headcount: number): boolean {
  return headcount > 0 && headcount <= 1000;
}

export function validateRoomCount(count: number): boolean {
  return count >= 0 && count <= 100;
}

// ==================== RECOMMENDATION GENERATOR ====================

export function generateRecommendations(
  headcount: number,
  workStyle: WorkStyle,
  totalArea: number
): string[] {
  const recommendations: string[] = [];
  
  // Growth recommendation
  if (headcount < 50) {
    recommendations.push('Consider adding 15-20% buffer space for future growth');
  } else if (headcount < 100) {
    recommendations.push('Plan for 10-15% additional space to accommodate team expansion');
  } else {
    recommendations.push('Include 8-12% flexible space for organizational changes');
  }
  
  // Work style recommendations
  if (workStyle === WorkStyle.TRADITIONAL) {
    recommendations.push('Traditional layout may require more circulation space (25-30%)');
  } else if (workStyle === WorkStyle.MODERN || workStyle === WorkStyle.ACTIVITY_BASED) {
    recommendations.push('Modern layouts can achieve 15-20% circulation efficiency');
  }
  
  // Area-based recommendations
  if (totalArea < 200) {
    recommendations.push('For spaces under 200m², consider multi-functional rooms to maximize efficiency');
  } else if (totalArea > 500) {
    recommendations.push('Larger spaces benefit from zoning and clear circulation paths');
  }
  
  return recommendations;
}

// ==================== ID GENERATOR ====================

export function generateEstimateId(): string {
  return `est_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}