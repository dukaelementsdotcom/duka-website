// ========================================
// COST ESTIMATOR - CALCULATION HOOK
// ========================================

import { useState, useCallback } from 'react';
import {
  CostEstimateResult,
  CostBreakdown,
  DesignServicesInput,
  DesignBuildInput,
  ServiceCategory,
  ProjectType,
  QualityTier,
  DesignService,
  MaterialEstimate,
  FurnitureItem,
  MaterialCategory
} from '@/components/ProjectScopePro/Shared/types';
import { ETHIOPIAN_MARKET_RATES } from '../constants';
import { formatCurrency } from '@/components/ProjectScopePro/Shared/utils';

export function useCostCalculator() {
  const [calculationResult, setCalculationResult] = useState<CostEstimateResult | null>(null);

  const calculateDesignServicesCost = useCallback((input: DesignServicesInput): CostBreakdown => {
    const { projectType, services, area = 100, complexity } = input;
    const qualityTier: QualityTier = QualityTier.PREMIUM; // Default for design services
    
    let designSubtotal = 0;
    const items: { name: string; cost: number; notes?: string }[] = [];

    // Space planning (per m²)
    const spacePlanningService = services.find(s => s.type === 'space_planning');
    if (spacePlanningService?.selected) {
      const rate = ETHIOPIAN_MARKET_RATES.designServices.spacePlanningPerM2[qualityTier];
      const cost = area * rate;
      designSubtotal += cost;
      items.push({
        name: 'Space Planning & Layout',
        cost,
        notes: `${formatCurrency(rate)} per m² × ${area}m²`
      });
    }

    // Technical drawings (per sheet)
    const technicalDrawingsService = services.find(s => s.type === 'technical_drawings');
    if (technicalDrawingsService?.selected) {
      const sheets = Math.max(8, Math.ceil(area / 25)); // 1 sheet per 25m² minimum 8
      const rate = ETHIOPIAN_MARKET_RATES.designServices.technicalDrawingsPerSheet[qualityTier];
      const cost = sheets * rate;
      designSubtotal += cost;
      items.push({
        name: '2D Technical Drawings',
        cost,
        notes: `${sheets} sheets × ${formatCurrency(rate)}`
      });
    }

    // 3D Visualizations
    const visualizationService = services.find(s => s.type === 'visualizations_3d');
    if (visualizationService?.selected && visualizationService.quantity) {
      const rate = ETHIOPIAN_MARKET_RATES.designServices.visualizationPerView[qualityTier];
      const cost = visualizationService.quantity * rate;
      designSubtotal += cost;
      items.push({
        name: '3D Visualizations',
        cost,
        notes: `${visualizationService.quantity} views × ${formatCurrency(rate)}`
      });
    }

    // Working drawings package
    const workingDrawingsService = services.find(s => s.type === 'working_drawings');
    if (workingDrawingsService?.selected) {
      const rate = ETHIOPIAN_MARKET_RATES.designServices.workingDrawingsPackage[qualityTier];
      designSubtotal += rate;
      items.push({
        name: 'Working Drawings Package',
        cost: rate
      });
    }

    // BOQ
    const boqService = services.find(s => s.type === 'boq');
    if (boqService?.selected) {
      const rate = ETHIOPIAN_MARKET_RATES.designServices.boqPreparation[qualityTier];
      designSubtotal += rate;
      items.push({
        name: 'Bill of Quantities (BOQ)',
        cost: rate
      });
    }

    // Project management (percentage of construction cost - placeholder)
    const pmService = services.find(s => s.type === 'project_management');
    if (pmService?.selected) {
      // Placeholder: assume construction cost is 5x design cost for estimation
      const constructionEstimate = designSubtotal * 5;
      const pmCost = constructionEstimate * ETHIOPIAN_MARKET_RATES.designServices.projectManagementPercentage;
      designSubtotal += pmCost;
      items.push({
        name: 'Project Management',
        cost: pmCost,
        notes: '8% of estimated construction cost'
      });
    }

    const contingency = designSubtotal * 0.1; // 10% contingency
    const subtotal = designSubtotal + contingency;
    const vat = subtotal * 0.15; // 15% VAT in Ethiopia
    const total = subtotal + vat;

    return {
      designServices: {
        items,
        subtotal: designSubtotal
      },
      materials: undefined,
      furniture: undefined,
      labor: undefined,
      contingency,
      subtotal,
      vat,
      total
    };
  }, []);

  const calculateDesignBuildCost = useCallback((input: DesignBuildInput): CostBreakdown => {
    const { headcount, rooms, qualityTier, includeAC, flooringPreferences } = input;
    
    // Placeholder implementation - will be expanded with detailed calculations
    const area = rooms.reduce((sum, room) => sum + (room.count * 15), 0); // Rough estimate
    
    // Materials estimation (placeholder)
    const gwbArea = headcount * 4; // Rough estimate: 4m² per person for partitions
    const glassArea = headcount * 1.5;
    const flooringArea = area * 0.9; // 90% of total area
    
    const materialsCost = 
      (gwbArea * ETHIOPIAN_MARKET_RATES.materials.gwbPartitionPerM2[qualityTier]) +
      (glassArea * ETHIOPIAN_MARKET_RATES.materials.glassPartitionPerM2[qualityTier]) +
      (flooringArea * ETHIOPIAN_MARKET_RATES.materials.carpetFlooringPerM2[qualityTier]);
    
    // Furniture estimation (placeholder)
    const furnitureCost = headcount * 25000; // Rough average per person
    
    // Labor (placeholder: 30% of materials + furniture)
    const laborCost = (materialsCost + furnitureCost) * 0.3;
    
    const subtotal = materialsCost + furnitureCost + laborCost;
    const contingency = subtotal * 0.15; // 15% contingency for build projects
    const vat = (subtotal + contingency) * 0.15;
    const total = subtotal + contingency + vat;

    return {
      materials: {
        items: [
          {
            category: MaterialCategory.GWB_PARTITIONS,
            quantity: gwbArea,
            unit: 'm²',
            qualityTier,
            unitPrice: ETHIOPIAN_MARKET_RATES.materials.gwbPartitionPerM2[qualityTier],
            totalPrice: gwbArea * ETHIOPIAN_MARKET_RATES.materials.gwbPartitionPerM2[qualityTier],
            notes: 'Estimated based on headcount'
          },
          {
            category: MaterialCategory.GLASS_PARTITIONS,
            quantity: glassArea,
            unit: 'm²',
            qualityTier,
            unitPrice: ETHIOPIAN_MARKET_RATES.materials.glassPartitionPerM2[qualityTier],
            totalPrice: glassArea * ETHIOPIAN_MARKET_RATES.materials.glassPartitionPerM2[qualityTier],
            notes: 'Reception & meeting rooms'
          },
          {
            category: MaterialCategory.FLOORING_CARPET,
            quantity: flooringArea,
            unit: 'm²',
            qualityTier,
            unitPrice: ETHIOPIAN_MARKET_RATES.materials.carpetFlooringPerM2[qualityTier],
            totalPrice: flooringArea * ETHIOPIAN_MARKET_RATES.materials.carpetFlooringPerM2[qualityTier],
            notes: 'Open plan areas'
          }
        ],
        subtotal: materialsCost
      },
      furniture: {
        items: [
          {
            name: 'Workstations & Desks',
            category: 'desk',
            quantity: headcount,
            qualityTier,
            unitPrice: 15000,
            totalPrice: headcount * 15000
          },
          {
            name: 'Task Chairs',
            category: 'chair',
            quantity: headcount,
            qualityTier,
            unitPrice: 6000,
            totalPrice: headcount * 6000
          }
        ],
        subtotal: furnitureCost
      },
      labor: laborCost,
      contingency,
      subtotal,
      vat,
      total
    };
  }, []);

  const calculateCost = useCallback((serviceCategory: ServiceCategory, input: any): CostEstimateResult => {
    let breakdown: CostBreakdown;
    let area = 100;

    if (serviceCategory === ServiceCategory.DESIGN_SERVICES) {
      const designInput = input as DesignServicesInput;
      area = designInput.area || 100;
      breakdown = calculateDesignServicesCost(designInput);
    } else if (serviceCategory === ServiceCategory.DESIGN_AND_BUILD) {
      const buildInput = input as DesignBuildInput;
      area = buildInput.rooms.reduce((sum, room) => sum + (room.count * 15), 0);
      breakdown = calculateDesignBuildCost(buildInput);
    } else {
      // Placeholder for other service categories
      breakdown = {
        subtotal: 50000,
        contingency: 5000,
        total: 55000,
        vat: 8250
      };
    }

    const result: CostEstimateResult = {
      projectType: input.projectType || ProjectType.OFFICE,
      serviceCategory,
      area,
      breakdown,
      timeline: {
        designPhase: serviceCategory === ServiceCategory.DESIGN_SERVICES ? '3-4 weeks' : '4-6 weeks',
        construction: serviceCategory === ServiceCategory.DESIGN_SERVICES ? 'N/A' : '8-12 weeks',
        total: serviceCategory === ServiceCategory.DESIGN_SERVICES ? '3-4 weeks' : '12-18 weeks'
      },
      notes: [
        'Estimate based on Ethiopian market rates (2026)',
        'Final pricing subject to site survey and detailed requirements',
        'VAT (15%) included in total'
      ]
    };

    setCalculationResult(result);
    return result;
  }, [calculateDesignServicesCost, calculateDesignBuildCost]);

  const reset = useCallback(() => {
    setCalculationResult(null);
  }, []);

  return {
    calculateCost,
    reset,
    result: calculationResult
  };
}