'use client';

import React from 'react';
import { QualityTier } from '../../../Shared/types';
import { QUALITY_TIER_OPTIONS } from '../constants';

interface QualityTierSelectorProps {
  selected: QualityTier;
  onChange: (tier: QualityTier) => void;
}

export default function QualityTierSelector({ selected, onChange }: QualityTierSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-black uppercase tracking-wider text-gray-900">
        Quality Tier
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {QUALITY_TIER_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id as QualityTier)}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              selected === option.id
                ? 'border-red-600 bg-red-50'
                : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-full ${option.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-black text-xl">
                  {selected === option.id ? '✓' : option.id.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-black text-lg">{option.label}</h4>
                <p className="text-sm text-gray-600 mt-1">{option.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}