'use client';

import React, { useState } from 'react';
import { SpacePlanner } from './SpacePlanner';
import { CostEstimator } from './CostEstimator';

type ActiveTab = 'space-planner' | 'cost-estimator';

export default function ProjectScopePro() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('space-planner');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              ProjectScope Pro
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
              Plan your space and get accurate cost estimates for your interior design project
            </p>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('space-planner')}
                className={`flex-1 py-6 px-4 text-center transition-all ${
                  activeTab === 'space-planner'
                    ? 'bg-red-600 text-white font-black'
                    : 'bg-white text-gray-700 hover:bg-gray-50 font-bold'
                }`}
              >
                <div className="text-3xl mb-2">📐</div>
                <div className="text-sm uppercase tracking-wider">Space Planner</div>
                <div className="text-xs mt-1 opacity-75">
                  {activeTab === 'space-planner' ? 'Calculate office area requirements' : 'Plan your workspace layout'}
                </div>
              </button>
              
              <div className="border-l border-gray-200"></div>
              
              <button
                onClick={() => setActiveTab('cost-estimator')}
                className={`flex-1 py-6 px-4 text-center transition-all ${
                  activeTab === 'cost-estimator'
                    ? 'bg-red-600 text-white font-black'
                    : 'bg-white text-gray-700 hover:bg-gray-50 font-bold'
                }`}
              >
                <div className="text-3xl mb-2">💰</div>
                <div className="text-sm uppercase tracking-wider">Cost Estimator</div>
                <div className="text-xs mt-1 opacity-75">
                  {activeTab === 'cost-estimator' ? 'Get detailed cost breakdown' : 'Estimate project budget'}
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-0">
            {activeTab === 'space-planner' ? <SpacePlanner /> : <CostEstimator />}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Get a detailed proposal tailored to your specific needs. Our team will contact you to discuss your project in detail.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors"
          >
            Contact Us for Detailed Quote
          </a>
        </div>
      </div>
    </div>
  );
}