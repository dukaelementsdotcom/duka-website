// Base pricing data for Addis Ababa market
// ALL prices are in ETB per square meter unless noted
// These are ESTIMATES - update via admin panel

export const basePricing = {
  // Base rates per service type (ETB/m²)
  serviceRates: {
    "office-design": 2500,
    "office-partitioning": 3500,
    "custom-furniture": 4500,
    "tech-integration": 3000,
    "branding-signage": 1800,
    "full-renovation": 6500
  },

  // Minimum project fees (ETB)
  minimumFees: {
    "office-design": 75000,
    "office-partitioning": 50000,
    "custom-furniture": 100000,
    "tech-integration": 60000,
    "branding-signage": 40000,
    "full-renovation": 150000
  },

  // Location multipliers
  locationMultipliers: {
    "addis-ababa": 1.0,
    "bole": 1.1,
    "kazanchis": 1.05,
    "megenagna": 1.0,
    "piassa": 0.95,
    "outside-addis": 1.15
  },

  // Additional cost factors
  additionalFactors: {
    // Electrical/plumbing per point
    electricalPoint: 3500,
    plumbingPoint: 8500,
    dataPoint: 2800,
    
    // Furniture per unit
    executiveChair: 45000,
    meetingTable: 120000,
    storageUnit: 75000,
    
    // Special features
    acousticTreatment: 5500, // per m²
    smartLighting: 4200, // per m²
    customArtwork: 25000 // per piece
  }
};

// Calculation functions
export function calculateEstimate(params: {
  serviceType: string;
  size: number;
  quality: string;
  complexity: string;
  timeframe: string;
  location: string;
  extras?: string[];
}) {
  const { serviceType, size, quality, complexity, timeframe, location, extras = [] } = params;
  
  // Get base rate
  let baseRate = basePricing.serviceRates[serviceType as keyof typeof basePricing.serviceRates] || 3000;
  
  // Apply multipliers
  const qualityMultiplier = getQualityMultiplier(quality);
  const complexityMultiplier = getComplexityMultiplier(complexity);
  const timeframeMultiplier = getTimeframeMultiplier(timeframe);
  const locationMultiplier = basePricing.locationMultipliers[location as keyof typeof basePricing.locationMultipliers] || 1.0;
  
  // Calculate base cost
  let baseCost = baseRate * size * qualityMultiplier * complexityMultiplier * locationMultiplier;
  
  // Apply timeframe multiplier (rush projects cost more)
  baseCost *= timeframeMultiplier;
  
  // Add minimum fee if applicable
  const minimumFee = basePricing.minimumFees[serviceType as keyof typeof basePricing.minimumFees] || 50000;
  if (baseCost < minimumFee) {
    baseCost = minimumFee;
  }
  
  // Add extras
  let extrasCost = 0;
  extras.forEach(extra => {
    switch(extra) {
      case "acoustic":
        extrasCost += basePricing.additionalFactors.acousticTreatment * size * 0.3; // 30% of area
        break;
      case "smart-lighting":
        extrasCost += basePricing.additionalFactors.smartLighting * size;
        break;
      case "executive-chairs":
        extrasCost += basePricing.additionalFactors.executiveChair * 2; // Assume 2 chairs
        break;
      case "meeting-table":
        extrasCost += basePricing.additionalFactors.meetingTable;
        break;
    }
  });
  
  const totalCost = baseCost + extrasCost;
  
  // Add 15% contingency
  const withContingency = totalCost * 1.15;
  
  // Create range (±10%)
  const lowerBound = withContingency * 0.9;
  const upperBound = withContingency * 1.1;
  
  return {
    baseCost,
    extrasCost,
    totalCost: withContingency,
    range: {
      low: Math.round(lowerBound / 1000) * 1000,
      high: Math.round(upperBound / 1000) * 1000
    },
    breakdown: {
      serviceRate: baseRate,
      size,
      qualityMultiplier,
      complexityMultiplier,
      locationMultiplier,
      timeframeMultiplier
    }
  };
}

// Helper functions
function getQualityMultiplier(quality: string): number {
  switch(quality) {
    case "standard": return 1.0;
    case "premium": return 1.5;
    case "bespoke": return 2.2;
    default: return 1.0;
  }
}

function getComplexityMultiplier(complexity: string): number {
  switch(complexity) {
    case "simple": return 1.0;
    case "moderate": return 1.3;
    case "complex": return 1.7;
    default: return 1.0;
  }
}

function getTimeframeMultiplier(timeframe: string): number {
  switch(timeframe) {
    case "standard": return 1.0;
    case "fast": return 1.2;
    case "urgent": return 1.5;
    default: return 1.0;
  }
}

// Format currency
export function formatCurrency(amount: number, currency: string = "ETB"): string {
  if (currency === "ETB") {
    return `ETB ${amount.toLocaleString('en-ET')}`;
  } else {
    const usdAmount = amount / 56.5; // Using exchange rate from config
    return `$${usdAmount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  }
}