// ========================================
// SPACE PLANNER - TYPES
// Office Area Estimation
// ========================================

// Use absolute imports to avoid path resolution issues
import {
  RoomType,
  WorkStyle,
  RoomConfig,
  SpaceCalculationResult,
  SpacePlannerInput,
  RoomCalculation,
  ProjectType,
  ServiceCategory,
  QualityTier,
  MaterialCategory,
  DesignServiceType,
  EthiopianStandards
} from '@/components/ProjectScopePro/Shared/types';

// Space Planner specific types
export interface SpacePlannerFormState {
  headcount: number;
  growthProjection: number;
  workStyle: WorkStyle;
  customRooms: RoomConfig[];
  autoDistribute: boolean;
}

export interface RoomOption {
  type: RoomType;
  label: string;
  description: string;
  defaultCount: number;
  category: 'essential' | 'recommended' | 'optional';
}

export interface SpacePlannerResult extends SpaceCalculationResult {
  input: SpacePlannerInput;
  timestamp: string;
}

// Re-export shared types for convenience
export type {
  RoomType,
  WorkStyle,
  RoomConfig,
  SpaceCalculationResult,
  SpacePlannerInput,
  RoomCalculation,
  ProjectType,
  ServiceCategory,
  QualityTier,
  MaterialCategory,
  DesignServiceType,
  EthiopianStandards
};