'use client';

import { useState } from 'react';
import { calculatorConfig } from '@/lib/data/calculatorConfig';
import { calculateEstimate, formatCurrency } from '@/lib/data/pricingData';

export default function CalculatorForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: 'office-design',
    size: 100,
    quality: 'premium',
    complexity: 'moderate',
    timeframe: 'standard',
    location: 'addis-ababa',
    extras: [] as string[]
  });

  const [estimate, setEstimate] = useState<any>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleExtraToggle = (extra: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extra)
        ? prev.extras.filter(e => e !== extra)
        : [...prev.extras, extra]
    }));
  };

  const calculate = () => {
    const result = calculateEstimate(formData);
    setEstimate(result);
    setStep(5); // Go to results step
  };

  const resetCalculator = () => {
    setFormData({
      serviceType: 'office-design',
      size: 100,
      quality: 'premium',
      complexity: 'moderate',
      timeframe: 'standard',
      location: 'addis-ababa',
      extras: []
    });
    setEstimate(null);
    setStep(1);
  };

  const steps = [
    { number: 1, title: 'Type', aria: 'Select project type' },
    { number: 2, title: 'Size & Quality', aria: 'Set size and quality level' },
    { number: 3, title: 'Details', aria: 'Add project details' },
    { number: 4, title: 'Extras', aria: 'Select additional features' },
    { number: 5, title: 'Estimate', aria: 'View your estimate' }
  ];

  // Service type icons for better visual
  const serviceIcons = {
    'office-design': '🏢',
    'partitioning': '🚧',
    'renovation': '🔨',
    'technology': '💡',
    'furniture': '🪑',
    'consultancy': '📋'
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
      {/* Progress Bar - Mobile Optimized */}
      <div className="px-4 sm:px-8 pt-6 sm:pt-8">
        <div className="flex justify-between mb-6 sm:mb-8">
          {steps.map((s) => (
            <div key={s.number} className="flex flex-col items-center flex-1 max-w-[20%]">
              <div 
                role="progressbar"
                aria-label={`Step ${s.number}: ${s.aria}`}
                aria-valuenow={step === s.number ? 100 : step > s.number ? 100 : 0}
                aria-valuemin={0}
                aria-valuemax={100}
                className={`
                  w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2
                  transition-all duration-300
                  ${step >= s.number ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500'}
                  ${step === s.number ? 'ring-4 ring-red-100 scale-110' : ''}
                `}
              >
                {s.number}
              </div>
              <span className="text-[10px] sm:text-xs font-medium text-gray-600 text-center px-1">
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="px-4 sm:px-8 pb-6 sm:pb-8">
        {/* Step 1: Project Type */}
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-4 sm:mb-6">
              Select Project Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {calculatorConfig.serviceTypes.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleInputChange('serviceType', service.id)}
                  aria-label={`Select ${service.name} project type`}
                  aria-pressed={formData.serviceType === service.id}
                  className={`
                    p-4 sm:p-6 rounded-xl border-2 transition-all duration-300
                    focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2
                    ${formData.serviceType === service.id
                      ? 'border-red-600 bg-red-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">
                    {serviceIcons[service.id as keyof typeof serviceIcons] || service.icon}
                  </div>
                  <div className="font-bold text-gray-900 text-sm sm:text-base">{service.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Size & Quality - FIXED ACCESSIBILITY */}
        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-4 sm:mb-6">
              Size & Quality Level
            </h3>
            
            {/* Size Input - FIXED: Added proper labels */}
            <div className="mb-6 sm:mb-8">
              <label 
                htmlFor="projectSize"
                className="block text-gray-900 font-bold mb-3 sm:mb-4 text-base sm:text-lg"
              >
                Project Size: <span className="text-red-600">{formData.size} m²</span>
              </label>
              <input
                id="projectSize"
                type="range"
                min="10"
                max="1000"
                step="10"
                value={formData.size}
                onChange={(e) => handleInputChange('size', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer 
                         [&::-webkit-slider-thumb]:appearance-none 
                         [&::-webkit-slider-thumb]:h-5 
                         [&::-webkit-slider-thumb]:w-5 
                         [&::-webkit-slider-thumb]:rounded-full 
                         [&::-webkit-slider-thumb]:bg-red-600
                         [&::-webkit-slider-thumb]:border-2
                         [&::-webkit-slider-thumb]:border-white
                         [&::-webkit-slider-thumb]:shadow-lg
                         focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                aria-valuemin={10}
                aria-valuemax={1000}
                aria-valuenow={formData.size}
                aria-valuetext={`${formData.size} square meters`}
              />
              <div className="flex justify-between text-xs sm:text-sm text-gray-600 mt-2">
                <span>10 m²</span>
                <span>500 m²</span>
                <span>1000 m²</span>
              </div>
            </div>

            {/* Quality Selection - FIXED: Better contrast */}
            <div>
              <h4 className="block text-gray-900 font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                Quality Level
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {calculatorConfig.qualityTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => handleInputChange('quality', tier.id)}
                    aria-label={`Select ${tier.name} quality: ${tier.description}`}
                    aria-pressed={formData.quality === tier.id}
                    className={`
                      p-4 rounded-xl border-2 text-left transition-all
                      focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2
                      ${formData.quality === tier.id
                        ? 'border-red-600 bg-red-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{tier.name}</div>
                    <div className="text-xs sm:text-sm text-gray-700 mb-2">{tier.description}</div>
                    <div className="text-xs sm:text-sm font-medium text-red-600">
                      {tier.multiplier === 1 ? 'Base Rate' : `${tier.multiplier}× multiplier`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Project Details */}
        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-4 sm:mb-6">
              Project Details
            </h3>
            
            {/* Complexity */}
            <div className="mb-6 sm:mb-8">
              <h4 className="block text-gray-900 font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                Complexity Level
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {calculatorConfig.complexityLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleInputChange('complexity', level.id)}
                    aria-label={`Select ${level.name} complexity: ${level.description}`}
                    aria-pressed={formData.complexity === level.id}
                    className={`
                      p-4 rounded-xl border-2 text-left transition-all
                      focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2
                      ${formData.complexity === level.id
                        ? 'border-red-600 bg-red-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="font-bold text-gray-900 mb-1 text-sm sm:text-base">{level.name}</div>
                    <div className="text-xs sm:text-sm text-gray-700">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe */}
            <div className="mb-6 sm:mb-8">
              <h4 className="block text-gray-900 font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                Timeline
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                {calculatorConfig.timeframeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleInputChange('timeframe', option.id)}
                    aria-label={`Select ${option.name} timeline`}
                    aria-pressed={formData.timeframe === option.id}
                    className={`
                      p-4 rounded-xl border-2 text-left
                      focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2
                      ${formData.timeframe === option.id
                        ? 'border-red-600 bg-red-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="font-bold text-gray-900 text-sm sm:text-base">{option.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label 
                htmlFor="locationSelect"
                className="block text-gray-900 font-bold mb-3 sm:mb-4 text-base sm:text-lg"
              >
                Location
              </label>
              <select
                id="locationSelect"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-xl 
                         focus:border-red-600 focus:ring-2 focus:ring-red-600 focus:ring-offset-2
                         text-sm sm:text-base"
                aria-label="Select project location"
              >
                <option value="addis-ababa">Addis Ababa (General)</option>
                <option value="bole">Bole Area</option>
                <option value="kazanchis">Kazanchis</option>
                <option value="megenagna">Megenagna</option>
                <option value="piassa">Piassa</option>
                <option value="outside-addis">Outside Addis Ababa</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Extras */}
        {step === 4 && (
          <div className="animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-4 sm:mb-6">
              Additional Features
            </h3>
            <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base">
              Select any additional features you'd like to include:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {[
                { id: 'acoustic', label: 'Acoustic Treatment', description: 'Sound-absorbing panels for meetings' },
                { id: 'smart-lighting', label: 'Smart Lighting System', description: 'Programmable LED lighting' },
                { id: 'executive-chairs', label: 'Executive Chairs (2 units)', description: 'Premium ergonomic chairs' },
                { id: 'meeting-table', label: 'Conference Table', description: 'Large meeting table for 10+ people' }
              ].map((extra) => (
                <div
                  key={extra.id}
                  role="checkbox"
                  aria-checked={formData.extras.includes(extra.id)}
                  tabIndex={0}
                  onClick={() => handleExtraToggle(extra.id)}
                  onKeyDown={(e) => e.key === 'Enter' && handleExtraToggle(extra.id)}
                  className={`
                    p-4 rounded-xl border-2 cursor-pointer transition-all
                    focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2
                    ${formData.extras.includes(extra.id)
                      ? 'border-red-600 bg-red-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-start">
                    <div className={`
                      w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 mr-3 mt-0.5 flex items-center justify-center flex-shrink-0
                      ${formData.extras.includes(extra.id)
                        ? 'border-red-600 bg-red-600'
                        : 'border-gray-300'
                      }
                    `}>
                      {formData.extras.includes(extra.id) && (
                        <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm sm:text-base">{extra.label}</div>
                      <div className="text-xs sm:text-sm text-gray-700 mt-1">{extra.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Results - FIXED: Better formatting */}
        {step === 5 && estimate && (
          <div className="animate-fade-in">
            <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter mb-4 sm:mb-6">
              Your Estimate
            </h3>
            
            {/* Price Range */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 sm:p-8 rounded-2xl mb-6 sm:mb-8 text-center border border-red-100">
              <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-red-700 mb-2">
                Estimated Project Cost
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-2">
                {formatCurrency(estimate.range.low)} - {formatCurrency(estimate.range.high)}
              </div>
              {calculatorConfig.currency.showSecondary && (
                <div className="text-sm sm:text-lg text-gray-700 mt-2">
                  ≈ ${(estimate.range.low / 56.5).toLocaleString('en-US', {maximumFractionDigits: 0})} - ${(estimate.range.high / 56.5).toLocaleString('en-US', {maximumFractionDigits: 0})} USD
                </div>
              )}
              <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-700">
                Includes 15% contingency for unexpected expenses
              </div>
            </div>

            {/* Breakdown */}
            <div className="mb-6 sm:mb-8">
              <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-lg">Cost Breakdown</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                  <span className="text-sm sm:text-base">Base Construction ({formData.size} m²)</span>
                  <span className="font-bold text-sm sm:text-base">{formatCurrency(estimate.baseCost)}</span>
                </div>
                {estimate.extrasCost > 0 && (
                  <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                    <span className="text-sm sm:text-base">Additional Features</span>
                    <span className="font-bold text-sm sm:text-base">{formatCurrency(estimate.extrasCost)}</span>
                  </div>
                )}
                <div className="flex justify-between py-2 sm:py-3 border-b border-gray-100">
                  <span className="text-sm sm:text-base">Contingency (15%)</span>
                  <span className="font-bold text-sm sm:text-base">{formatCurrency(estimate.totalCost - (estimate.baseCost + estimate.extrasCost))}</span>
                </div>
                <div className="flex justify-between py-3 sm:py-4 bg-gray-50 rounded-lg px-3 sm:px-4">
                  <span className="font-bold text-gray-900 text-sm sm:text-base">Total Estimated Range</span>
                  <span className="font-bold text-red-600 text-sm sm:text-base">
                    {formatCurrency(estimate.range.low)} - {formatCurrency(estimate.range.high)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="/contact"
                className="flex-1 bg-red-600 text-white py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-red-700 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
              >
                Get Exact Quote
              </a>
              <button
                onClick={resetCalculator}
                className="flex-1 bg-gray-100 text-gray-700 py-3 sm:py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
              >
                Start New Estimate
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons - Mobile Optimized */}
        {step < 5 && (
          <div className="flex justify-between mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-100">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-4 sm:px-8 py-2.5 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                aria-label="Go back to previous step"
              >
                ← Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 sm:px-12 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                aria-label={`Continue to ${steps[step]?.title} step`}
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={calculate}
                className="px-6 sm:px-12 py-2.5 sm:py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
                aria-label="Calculate estimate"
              >
                Calculate Estimate
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}