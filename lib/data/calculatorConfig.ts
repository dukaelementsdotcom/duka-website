// Pricing configuration for the calculator
// You can update these values in the admin panel

export const calculatorConfig = {
  // Currency settings
  currency: {
    primary: "ETB",
    secondary: "USD",
    exchangeRate: 56.5, // ETB to USD (update as needed)
    showSecondary: true
  },

  // Service categories
  serviceTypes: [
    { id: "office-design", name: "Office Design", icon: "🏢" },
    { id: "office-partitioning", name: "Office Partitioning", icon: "🚧" },
    { id: "custom-furniture", name: "Custom Furniture", icon: "🪑" },
    { id: "tech-integration", name: "Technology Integration", icon: "💻" },
    { id: "branding-signage", name: "Branding & Signage", icon: "🪧" },
    { id: "full-renovation", name: "Full Renovation", icon: "🔨" }
  ],

  // Quality tiers
  qualityTiers: [
    { id: "standard", name: "Standard", multiplier: 1.0, description: "Quality local materials" },
    { id: "premium", name: "Premium", multiplier: 1.5, description: "Mixed local & imported" },
    { id: "bespoke", name: "Bespoke", multiplier: 2.2, description: "Premium imported materials" }
  ],

  // Size ranges (square meters)
  sizeRanges: [
    { id: "small", name: "Small (1-50 m²)", min: 1, max: 50 },
    { id: "medium", name: "Medium (51-200 m²)", min: 51, max: 200 },
    { id: "large", name: "Large (201-500 m²)", min: 201, max: 500 },
    { id: "xlarge", name: "Extra Large (500+ m²)", min: 501, max: 5000 }
  ],

  // Project complexity
  complexityLevels: [
    { id: "simple", name: "Simple", multiplier: 1.0, description: "Minimal changes, open layout" },
    { id: "moderate", name: "Moderate", multiplier: 1.3, description: "Some partitioning, basic tech" },
    { id: "complex", name: "Complex", multiplier: 1.7, description: "Full renovation, custom solutions" }
  ],

  // Timeframe options (weeks)
  timeframeOptions: [
    { id: "standard", name: "Standard (8-12 weeks)", weeks: 10 },
    { id: "fast", name: "Fast Track (4-8 weeks)", weeks: 6, multiplier: 1.2 },
    { id: "urgent", name: "Urgent (2-4 weeks)", weeks: 3, multiplier: 1.5 }
  ]
};