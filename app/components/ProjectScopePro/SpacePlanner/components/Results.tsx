'use client';

import React from 'react';
import { SpaceCalculationResult } from '../../../Shared/types';
import { formatArea, formatCurrency, formatPercentage } from '../../../Shared/utils';
import RoomBreakdown from './RoomBreakdown';

interface ResultsProps {
  result: SpaceCalculationResult;
}

export default function Results({ result }: ResultsProps) {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Total Usable Area</p>
          <h3 className="text-4xl font-black">{formatArea(result.totalUsableArea)}</h3>
          <p className="text-xs opacity-75 mt-1">Including circulation space</p>
        </div>

        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Total Rentable Area</p>
          <h3 className="text-4xl font-black">{formatArea(result.totalRentableArea)}</h3>
          <p className="text-xs opacity-75 mt-1">Including common areas</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Space Efficiency</p>
          <h3 className="text-4xl font-black">{formatPercentage(result.efficiencyRatio)}</h3>
          <p className="text-xs opacity-75 mt-1">Usable vs Rentable</p>
        </div>
      </div>

      {/* Room Breakdown */}
      <RoomBreakdown rooms={result.rooms} />

      {/* Circulation & Additional Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-black uppercase tracking-wider text-gray-900 mb-4">
          Space Analysis
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs text-gray-500 mb-2">Circulation Space</p>
            <p className="text-2xl font-black text-gray-900">{formatArea(result.circulationArea)}</p>
            <p className="text-sm text-gray-600 mt-1">
              {formatPercentage(result.circulationArea / (result.totalUsableArea))} of total area
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">Estimated Design Service Cost</p>
            <p className="text-2xl font-black text-red-600">{formatCurrency(result.designServiceCost || 0)}</p>
            <p className="text-sm text-gray-600 mt-1">
              Approximate design fee for {formatArea(result.totalUsableArea)} space
            </p>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {result.recommendations.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6">
          <h4 className="font-black text-blue-900 mb-3">Recommendations</h4>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2 text-blue-800">
                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}