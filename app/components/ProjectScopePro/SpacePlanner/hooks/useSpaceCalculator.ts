// ========================================
// SPACE PLANNER - CALCULATION HOOK
// Ethiopian Office Space Calculator
// ========================================

import { useState, useCallback } from 'react';
import { 
  SpacePlannerInput, 
  RoomConfig, 
  RoomType, 
  WorkStyle,
  SpaceCalculationResult,
  RoomCalculation
} from '../../Shared/types';
import { 
  ETHIOPIAN_STANDARDS, 
  ROOM_STANDARDS,
  WORK_STYLE_DISTRIBUTION 
} from '../../Shared/constants';
import { 
  calculateRoomArea,
  calculateMeetingRoomSize,
  calculateReceptionSize,
  calculateCanteenSize,
  calculateBreakoutSpace,
  autoDistributeRooms,
  generateRecommendations,
  formatArea
} from '../../Shared/utils';

export function useSpaceCalculator() {
  const [calculationResult, setCalculationResult] = useState<SpaceCalculationResult | null>(null);

  const calculateSpace = useCallback((input: SpacePlannerInput): SpaceCalculationResult => {
    const { headcount, growthProjection, workStyle, rooms } = input;

    // Calculate total area from all rooms
    let totalArea = 0;
    const roomCalculations: RoomCalculation[] = [];

    rooms.forEach(room => {
      const area = calculateRoomArea(room);
      totalArea += area;

      // Get room name for display
      const roomName = getRoomDisplayName(room.type);
      
      roomCalculations.push({
        type: room.type,
        count: room.count,
        areaPerUnit: area / room.count,
        totalArea: area,
        standardUsed: getRoomStandardDescription(room.type, room),
        notes: room.notes
      });
    });

    // Calculate circulation space
    const circulationRatio = getCirculationRatio(workStyle);
    const circulationArea = totalArea * circulationRatio;
    
    // Calculate total usable and rentable area
    const totalUsableArea = totalArea + circulationArea;
    const totalRentableArea = totalUsableArea * 1.08; // Add 8% for common areas
    
    // Calculate efficiency ratio
    const efficiencyRatio = totalArea / totalUsableArea;

    // Generate recommendations
    const recommendations = generateRecommendations(headcount, workStyle, totalUsableArea);

    // Add design service cost estimation (placeholder - will be refined later)
    const designServiceCost = calculateDesignServiceCost(totalUsableArea);

    const result: SpaceCalculationResult = {
      rooms: roomCalculations,
      circulationArea,
      totalUsableArea,
      totalRentableArea,
      efficiencyRatio,
      designServiceCost,
      recommendations
    };

    setCalculationResult(result);
    return result;
  }, []);

  const reset = useCallback(() => {
    setCalculationResult(null);
  }, []);

  return {
    calculateSpace,
    reset,
    result: calculationResult
  };
}

// Helper functions

function getRoomDisplayName(type: RoomType): string {
  const names: Record<RoomType, string> = {
    private_office: 'Private Office',
    open_plan: 'Open Plan Area',
    meeting_small: 'Small Meeting Room',
    meeting_medium: 'Medium Meeting Room',
    meeting_large: 'Large Meeting Room',
    focus_room: 'Focus Room',
    reception: 'Reception',
    breakout: 'Breakout Space',
    archive: 'Archive Room',
    storage: 'Storage Room',
    canteen: 'Canteen',
    pantry: 'Pantry',
    print_room: 'Print Room',
    server_room: 'Server Room',
    wellness: 'Wellness Room',
    circulation: 'Circulation Space'
  };
  return names[type];
}

function getRoomStandardDescription(type: RoomType, room: RoomConfig): string {
  switch (type) {
    case RoomType.PRIVATE_OFFICE:
      return `${ROOM_STANDARDS[type].standard.default}m² per office`;
    case RoomType.OPEN_PLAN:
      return `${ROOM_STANDARDS[type].perPerson.default}m² per person`;
    case RoomType.MEETING_SMALL:
    case RoomType.MEETING_MEDIUM:
    case RoomType.MEETING_LARGE:
      return `${room.peoplePerRoom || 6} people @ ${ROOM_STANDARDS[type].perPerson}m² per person`;
    case RoomType.RECEPTION:
      return 'Standard reception size';
    case RoomType.CANTEEN:
      return `${ROOM_STANDARDS[RoomType.CANTEEN].perSeat}m² per seat + ${ROOM_STANDARDS[RoomType.CANTEEN].kitchenArea}m² kitchen`;
    default:
      return 'Standard calculation';
  }
}

function getCirculationRatio(workStyle: WorkStyle): number {
  const ratios: Record<WorkStyle, number> = {
    traditional: 0.28,
    hybrid: 0.24,
    modern: 0.20,
    activity_based: 0.22
  };
  return ratios[workStyle];
}

function calculateDesignServiceCost(totalArea: number): number {
  // Ethiopian market rates - placeholder values
  // Design service typically costs 8-15% of construction cost
  // For estimation, we use ETB per m²
  
  const ratePerM2 = 450; // ETB per m² for design services (Ethiopian market average)
  return Math.round(totalArea * ratePerM2);
}

export function getDefaultRoomConfiguration(
  headcount: number,
  workStyle: WorkStyle
): RoomConfig[] {
  return autoDistributeRooms(headcount, workStyle);
}