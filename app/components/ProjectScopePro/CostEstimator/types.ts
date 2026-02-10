// ========================================
// COST ESTIMATOR - TYPES
// ========================================

import {
  ProjectType,
  ServiceCategory,
  QualityTier,
  DesignServiceType,
  MaterialCategory,
  DesignService,
  DesignServicesInput,
  DesignBuildInput,
  CostBreakdown,
  CostEstimateResult,
  EthiopianStandards
} from '../../Shared/types';

// Cost Estimator specific types
export interface CostEstimatorFormState {
  serviceCategory: ServiceCategory;
  projectType: ProjectType;
  qualityTier: QualityTier;
  designServices?: DesignService[];
  designBuildInput?: DesignBuildInput;
  area?: number;
  step: number;
}

export interface PricingTier {
  standard: number;
  premium: number;
  luxury: number;
}

export interface MaterialPricing {
  category: MaterialCategory;
  name: string;
  description: string;
  unit: string;
  pricing: PricingTier;
  notes?: string;
}

export interface ServicePricing {
  type: DesignServiceType;
  name: string;
  description: string;
  pricingModel: 'fixed' | 'per_m2' | 'per_item' | 'package';
  basePrice: PricingTier;
  perUnitPrice?: PricingTier;
  minQuantity?: number;
  maxQuantity?: number;
}

export interface EthiopianMarketRates {
  designServices: {
    spacePlanningPerM2: PricingTier;
    technicalDrawingsPerSheet: PricingTier;
    visualizationPerView: PricingTier;
    workingDrawingsPackage: PricingTier;
    boqPreparation: PricingTier;
    projectManagementPercentage: number; // % of construction cost
  };
  materials: {
    gwbPartitionPerM2: PricingTier;
    glassPartitionPerM2: PricingTier;
    ceilingWorkPerM2: PricingTier;
    electricalLightingPerFixture: PricingTier;
    electricalPowerPerPoint: PricingTier;
    dataPointPerPort: PricingTier;
    carpetFlooringPerM2: PricingTier;
    spcFlooringPerM2: PricingTier;
    tileFlooringPerM2: PricingTier;
    paintingPerM2: PricingTier;
    doorPerUnit: PricingTier;
  };
  furniture: {
    executiveDesk: PricingTier;
    managerDesk: PricingTier;
    workstation: PricingTier;
    executiveChair: PricingTier;
    taskChair: PricingTier;
    visitorChair: PricingTier;
    conferenceTablePerSeat: PricingTier;
    storageCabinet: PricingTier;
    receptionDesk: PricingTier;
  };
}

// Re-export shared types
export type {
  ProjectType,
  ServiceCategory,
  QualityTier,
  DesignServiceType,
  MaterialCategory,
  DesignService,
  DesignServicesInput,
  DesignBuildInput,
  CostBreakdown,
  CostEstimateResult,
  EthiopianStandards
};