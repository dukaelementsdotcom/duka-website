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
  const [estimate, setEstimate] = useState(null);

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
    { number: 1, title: 'Project Type' },
    { number: 2, title: 'Size & Quality' },
    { number: 3, title: 'Details' },
    { number: 4, title: 'Extras' },
    { number: 5, title: 'Estimate' }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="flex justify-between mb-8">
        {steps.map((s) => (
          <div key={s.number} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                step >= s.number ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-500'
              } ${step === s.number ? 'ring-4 ring-red-100' : ''}`}
            >
              {s.number}
            </div>
            <span className="text-xs text-gray-500">{s.title}</span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="px-8 pb-8 bg-white rounded-2xl shadow-lg">
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Select Project Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {calculatorConfig.serviceTypes.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleInputChange('serviceType', service.id)}
                  className={`
                    p-6 rounded-xl border-2 transition-all duration-300
                    ${formData.serviceType === service.id
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                    hover:scale-[1.02] active:scale-95
                  `}
                >
                  <div className="text-3xl mb-3">{service.icon}</div>
                  <div className="font-bold text-gray-900">{service.name}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Size & Quality Level</h3>
            
            {/* Size Input - ✅ FIXED: Added proper label with htmlFor and id */}
            <div className="mb-8">
              <label htmlFor="projectSize" className="block text-gray-700 font-bold mb-4">
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
                aria-label={`Select project size from 10 to 1000 square meters. Current value: ${formData.size} square meters`}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>10 m²</span>
                <span>500 m²</span>
                <span>1000 m²</span>
              </div>
            </div>

            {/* Quality Selection */}
            <div>
              <label className="block text-gray-700 font-bold mb-4">Quality Level</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {calculatorConfig.qualityTiers.map((tier) => (
                  <button
                    key={tier.id}
                    onClick={() => handleInputChange('quality', tier.id)}
                    className={`
                      p-4 rounded-xl border-2 text-left transition-all
                      ${formData.quality === tier.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="font-bold text-gray-900 mb-1">{tier.name}</div>
                    <div className="text-sm text-gray-600">{tier.description}</div>
                    <div className="mt-2 text-sm font-medium text-red-600">
                      {tier.multiplier === 1 ? 'Base Rate' : `×${tier.multiplier}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Project Details</h3>
            
            {/* Complexity */}
            <div className="mb-8">
              <label className="block text-gray-700 font-bold mb-4">Complexity Level</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {calculatorConfig.complexityLevels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleInputChange('complexity', level.id)}
                    className={`
                      p-4 rounded-xl border-2 text-left
                      ${formData.complexity === level.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="font-bold text-gray-900 mb-1">{level.name}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe */}
            <div className="mb-8">
              <label className="block text-gray-700 font-bold mb-4">Timeline</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {calculatorConfig.timeframeOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleInputChange('timeframe', option.id)}
                    className={`
                      p-4 rounded-xl border-2 text-left
                      ${formData.timeframe === option.id
                        ? 'border-red-600 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="font-bold text-gray-900 mb-1">{option.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="projectLocation" className="block text-gray-700 font-bold mb-4">Location</label>
              <select
                id="projectLocation"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:ring-red-600"
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

        {step === 4 && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Additional Features</h3>
            <p className="text-gray-600 mb-8">Select any additional features you'd like to include:</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'acoustic', label: 'Acoustic Treatment', description: 'Sound-absorbing panels for meetings' },
                { id: 'smart-lighting', label: 'Smart Lighting System', description: 'Programmable LED lighting' },
                { id: 'executive-chairs', label: 'Executive Chairs (2 units)', description: 'Premium ergonomic chairs' },
                { id: 'meeting-table', label: 'Conference Table', description: 'Large meeting table for 10+ people' }
              ].map((extra) => (
                <div
                  key={extra.id}
                  onClick={() => handleExtraToggle(extra.id)}
                  className={`
                    p-4 rounded-xl border-2 cursor-pointer transition-all
                    ${formData.extras.includes(extra.id) 
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center
                      ${formData.extras.includes(extra.id)
                        ? 'border-red-600 bg-red-600'
                        : 'border-gray-300'
                      }
                    `}>
                      {formData.extras.includes(extra.id) && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{extra.label}</div>
                      <div className="text-sm text-gray-600">{extra.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && estimate && (
          <div className="animate-fade-in">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6">Your Estimate</h3>
            
            {/* Price Range */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-2xl mb-8 text-center">
              <div className="text-sm font-bold uppercase tracking-widest text-red-700 mb-2">
                Estimated Project Cost
              </div>
              <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
                {formatCurrency(estimate.range.low)} - {formatCurrency(estimate.range.high)}
              </div>
              {calculatorConfig.currency.showSecondary && (
                <div className="text-lg text-gray-600">
                  ≈ ${(estimate.range.low / 56.5).toLocaleString('en-US', {maximumFractionDigits: 0})} - ${(estimate.range.high / 56.5).toLocaleString('en-US', {maximumFractionDigits: 0})} USD
                </div>
              )}
              <div className="mt-4 text-sm text-gray-500">
                Includes 15% contingency for unexpected expenses
              </div>
            </div>

            {/* Breakdown */}
            <div className="mb-8">
              <h4 className="font-bold text-gray-900 mb-4">Cost Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between py-3 border-b">
                  <span>Base Construction ({formData.size} m²)</span>
                  <span className="font-bold">{formatCurrency(estimate.baseCost)}</span>
                </div>
                {estimate.extrasCost > 0 && (
                  <div className="flex justify-between py-3 border-b">
                    <span>Additional Features</span>
                    <span className="font-bold">{formatCurrency(estimate.extrasCost)}</span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-b">
                  <span>Contingency (15%)</span>
                  <span className="font-bold">{formatCurrency(estimate.totalCost - (estimate.baseCost + estimate.extrasCost))}</span>
                </div>
                <div className="flex justify-between py-3 bg-gray-50 rounded-lg px-4">
                  <span className="font-bold">Total Estimated Range</span>
                  <span className="font-bold text-red-600">
                    {formatCurrency(estimate.range.low)} - {formatCurrency(estimate.range.high)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.location.href = '/contact'}
                className="flex-1 bg-red-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                Get Exact Quote
              </button>
              <button
                onClick={resetCalculator}
                className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
              >
                Start New Estimate
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 5 && (
          <div className="flex justify-between mt-8 pt-8 border-t">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div></div>
            )}
            
            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-12 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={calculate}
                className="px-12 py-3 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
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