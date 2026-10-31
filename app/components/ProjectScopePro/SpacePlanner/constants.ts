// ========================================
// SPACE PLANNER - CONSTANTS
// Office Area Calculation Standards
// ========================================

import { ETHIOPIAN_STANDARDS } from '@/components/ProjectScopePro/Shared/constants';

export const SPACE_PLANNER_CONFIG = {
  minHeadcount: 1,
  maxHeadcount: 1000,
  defaultHeadcount: 25,
  defaultGrowthProjection: 15, // 15% growth
  defaultWorkStyle: 'hybrid' as const,
};

// Ethiopian circulation ratios - tighter than international standards
// Reflects local practice where space efficiency is prioritized
export const CIRCULATION_RATIOS = {
  traditional: 0.22,  // 22% circulation for traditional layouts (int'l: 28%)
  hybrid: 0.20,       // 20% circulation for hybrid layouts (int'l: 24%)
  modern: 0.18,       // 18% circulation for modern layouts (int'l: 20%)
  activityBased: 0.18, // 18% circulation for activity-based (int'l: 22%)
};

export const EFFICIENCY_TARGETS = {
  excellent: 0.80,    // 80% efficiency (20% circulation)
  good: 0.75,         // 75% efficiency (25% circulation)
  average: 0.70,      // 70% efficiency (30% circulation)
  poor: 0.65,         // 65% efficiency (35% circulation)
};

export const ROOM_CATEGORY_PRIORITIES = {
  essential: [
    'private_office',
    'open_plan',
    'meeting_small',
    'reception',
    'pantry'
  ],
  recommended: [
    'meeting_medium',
    'meeting_large',
    'breakout',
    'archive',
    'storage',
    'canteen'
  ],
  optional: [
    'focus_room',
    'print_room',
    'server_room',
    'wellness'
  ]
};