'use client';

import React, { useState } from 'react';
import { ServiceCategory, ProjectType, QualityTier, DesignServiceType } from '@/components/ProjectScopePro/Shared/types';
import { useCostCalculator } from './hooks/useCostCalculator';
import ProjectTypeSelector from './components/ProjectTypeSelector';
import QualityTierSelector from './components/QualityTierSelector';
import Results from './components/Results';
import { SERVICE_CATEGORY_OPTIONS, DESIGN_SERVICE_OPTIONS } from './constants';

export default function CostEstimator() {
  const { calculateCost, reset, result } = useCostCalculator();
  const [isCalculating, setIsCalculating] = useState(false);

  // Form state
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>(ServiceCategory.DESIGN_SERVICES);
  const [projectType, setProjectType] = useState<ProjectType>(ProjectType.OFFICE);
  const [qualityTier, setQualityTier] = useState<QualityTier>(QualityTier.PREMIUM);
  const [area, setArea] = useState(100);
  const [designServices, setDesignServices] = useState(() => 
    DESIGN_SERVICE_OPTIONS.map(service => ({
      type: service.id as DesignServiceType,
      selected: service.defaultSelected || false,
      quantity: undefined,
      customNotes: ''
    }))
  );

  const handleServiceToggle = (type: DesignServiceType) => {
    setDesignServices(prev => 
      prev.map(service => 
        service.type === type 
          ? { ...service, selected: !service.selected }
          : service
      )
    );
  };

  const handleServiceQuantityChange = (type: DesignServiceType, quantity: number) => {
    setDesignServices(prev => 
      prev.map(service => 
        service.type === type 
          ? { ...service, quantity }
          : service
      )
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    if (serviceCategory === ServiceCategory.DESIGN_SERVICES) {
      const input = {
        projectType,
        services: designServices,
        area,
        complexity: 'medium' as const
      };

      calculateCost(ServiceCategory.DESIGN_SERVICES, input);
    } else {
      // Placeholder for other service categories
      const input = {
        projectType,
        area,
        complexity: 'medium' as const
      };

      calculateCost(serviceCategory, input);
    }

    setIsCalculating(false);

    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('cost-estimator-results');
      resultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleReset = () => {
    reset();
    setServiceCategory(ServiceCategory.DESIGN_SERVICES);
    setProjectType(ProjectType.OFFICE);
    setQualityTier(QualityTier.PREMIUM);
    setArea(100);
    setDesignServices(
      DESIGN_SERVICE_OPTIONS.map(service => ({
        type: service.id as DesignServiceType,
        selected: service.defaultSelected || false,
        quantity: undefined,
        customNotes: ''
      }))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 mb-4">
          Cost Estimator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Get accurate cost estimates for your interior design project
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {/* Service Category Selection */}
        <div className="p-6 md:p-8 border-b border-gray-200 bg-gray-50">
          <h2 className="text-lg font-black uppercase tracking-wider text-gray-900 mb-4">
            Select Service Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SERVICE_CATEGORY_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setServiceCategory(option.id as ServiceCategory)}
                className={`p-6 rounded-xl border-2 text-left transition-all ${
                  serviceCategory === option.id
                    ? 'border-red-600 bg-red-50'
                    : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{option.icon}</span>
                  <div className="flex-1">
                    <h3 className="font-black text-lg">{option.label}</h3>
                    <p className="text-xs text-gray-600 mt-1">{option.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6 md:p-8">
          <div className="space-y-8">
            {/* Project Type */}
            <ProjectTypeSelector selected={projectType} onChange={setProjectType} />

            {/* Quality Tier */}
            <QualityTierSelector selected={qualityTier} onChange={setQualityTier} />

            {/* Area Input */}
            <div>
              <label className="block text-xs text-gray-600 mb-2 uppercase tracking-wider">
                Project Area (m²)
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max="5000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-bold focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Total area to be designed/renovated
              </p>
            </div>

            {/* Design Services Selection (only for Design Services category) */}
            {serviceCategory === ServiceCategory.DESIGN_SERVICES && (
              <div>
                <h3 className="text-lg font-black uppercase tracking-wider text-gray-900 mb-4">
                  Design Services
                </h3>
                
                <div className="space-y-3">
                  {designServices.map((service) => {
                    const option = DESIGN_SERVICE_OPTIONS.find(opt => opt.id === service.type);
                    if (!option) return null;

                    return (
                      <div key={service.type} className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <label className="flex items-start gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={service.selected}
                                onChange={() => handleServiceToggle(service.type)}
                                className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                              />
                              <div>
                                <h4 className="font-bold text-gray-900">{option.label}</h4>
                                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
                                
                                {/* Quantity Input (if applicable) */}
                                {option.quantityOptions && service.selected && (
                                  <div className="mt-3">
                                    <label className="block text-xs text-gray-600 mb-1">
                                      Number of {option.quantityOptions.label}
                                    </label>
                                    <input
                                      type="number"
                                      value={service.quantity || option.quantityOptions.min}
                                      onChange={(e) => handleServiceQuantityChange(
                                        service.type,
                                        Math.max(option.quantityOptions!.min, Math.min(option.quantityOptions!.max, parseInt(e.target.value) || option.quantityOptions!.min))
                                      )}
                                      min={option.quantityOptions.min}
                                      max={option.quantityOptions.max}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    />
                                  </div>
                                )}
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
              <button
                type="submit"
                disabled={isCalculating}
                className={`flex-1 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-lg transition-all ${
                  isCalculating
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {isCalculating ? 'Calculating...' : 'Get Cost Estimate'}
              </button>
              {result && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-4 text-sm font-black uppercase tracking-widest rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Start Over
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Results Section */}
        {result && (
          <div id="cost-estimator-results" className="p-6 md:p-8 bg-gray-50">
            <Results result={result} />
          </div>
        )}
      </div>
    </div>
  );
}