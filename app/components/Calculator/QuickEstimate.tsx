'use client';

import { useState } from 'react';
import Link from 'next/link';
import { calculateEstimate, formatCurrency } from '@/lib/data/pricingData';

export default function QuickEstimate() {
  const [inputs, setInputs] = useState({
    serviceType: 'office-design',
    size: 100,
    quality: 'premium'
  });

  const [quickEstimate, setQuickEstimate] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuick = () => {
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const result = calculateEstimate({
        serviceType: inputs.serviceType,
        size: inputs.size,
        quality: inputs.quality,
        complexity: 'moderate',
        timeframe: 'standard',
        location: 'addis-ababa',
        extras: []
      });
      
      setQuickEstimate(result.range.low);
      setIsCalculating(false);
    }, 500);
  };

  const services = [
    { id: 'office-design', name: 'Office Design', icon: '🏢' },
    { id: 'office-partitioning', name: 'Partitioning', icon: '🚧' },
    { id: 'full-renovation', name: 'Full Renovation', icon: '🔨' }
  ];

  const qualities = [
    { id: 'standard', name: 'Standard', color: 'bg-green-100 text-green-800' },
    { id: 'premium', name: 'Premium', color: 'bg-blue-100 text-blue-800' },
    { id: 'bespoke', name: 'Bespoke', color: 'bg-purple-100 text-purple-800' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden border border-gray-200">
      <div className="p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 bg-red-50 text-red-700 px-6 py-2 rounded-full mb-4">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-bold uppercase tracking-widest">Quick Estimate Tool</span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 mb-4">
            Get an Instant Estimate
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Answer 3 simple questions to get a ballpark figure for your project. For a detailed quote, use our full calculator.
          </p>
        </div>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Service Type */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm font-bold text-gray-700 mb-4">1. Project Type</div>
            <div className="space-y-3">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleInputChange('serviceType', service.id)}
                  className={`
                    w-full p-3 rounded-lg flex items-center gap-3 transition-all
                    ${inputs.serviceType === service.id
                      ? 'bg-red-50 border border-red-200'
                      : 'bg-gray-50 hover:bg-gray-100'
                    }
                  `}
                >
                  <span className="text-2xl">{service.icon}</span>
                  <span className="font-medium text-gray-900">{service.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm font-bold text-gray-700 mb-4">
              2. Size: <span className="text-red-600">{inputs.size} m²</span>
            </div>
            <div className="pt-8">
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={inputs.size}
                onChange={(e) => handleInputChange('size', parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 [&::-webkit-slider-thumb]:cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-6">
                <div className="text-center">
                  <div className="font-bold">Small</div>
                  <div>20-100 m²</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Medium</div>
                  <div>100-300 m²</div>
                </div>
                <div className="text-center">
                  <div className="font-bold">Large</div>
                  <div>300-500 m²</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quality */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="text-sm font-bold text-gray-700 mb-4">3. Quality Level</div>
            <div className="space-y-3">
              {qualities.map((quality) => (
                <button
                  key={quality.id}
                  onClick={() => handleInputChange('quality', quality.id)}
                  className={`
                    w-full p-4 rounded-lg transition-all text-left
                    ${inputs.quality === quality.id
                      ? 'ring-2 ring-offset-2 ring-red-500'
                      : 'hover:scale-[1.02]'
                    }
                    ${quality.color}
                  `}
                >
                  <div className="font-bold">{quality.name}</div>
                  <div className="text-xs opacity-75 mt-1">
                    {quality.id === 'standard' && 'Quality local materials'}
                    {quality.id === 'premium' && 'Mixed local & imported'}
                    {quality.id === 'bespoke' && 'Premium imported materials'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results & CTA */}
        <div className="text-center">
          <button
            onClick={calculateQuick}
            disabled={isCalculating}
            className={`
              px-12 py-4 rounded-xl font-black text-sm uppercase tracking-widest mb-8
              transition-all duration-300
              ${isCalculating
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700 hover:scale-105'
              }
              text-white shadow-lg
            `}
          >
            {isCalculating ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Calculating...
              </div>
            ) : (
              'Get Instant Estimate'
            )}
          </button>

          {quickEstimate && (
            <div className="animate-fade-in mb-8">
              <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-6 rounded-2xl shadow-xl">
                <div className="text-sm font-bold uppercase tracking-widest mb-2">
                  Estimated Starting From
                </div>
                <div className="text-4xl font-black mb-2">
                  {formatCurrency(quickEstimate)}
                </div>
                <div className="text-sm opacity-90">
                  For a {inputs.size} m² {services.find(s => s.id === inputs.serviceType)?.name?.toLowerCase()} project
                </div>
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-6">
              Need a detailed breakdown with exact specifications?
            </p>
            <Link
              href="/estimate-cost"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-black transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Use Full Detailed Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}