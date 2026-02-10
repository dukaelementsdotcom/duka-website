'use client';

import React from 'react';
import { CostEstimateResult } from '../../../Shared/types';
import { formatCurrency, formatArea } from '../../../Shared/utils';

interface ResultsProps {
  result: CostEstimateResult;
}

export default function Results({ result }: ResultsProps) {
  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Estimated Total Cost</p>
          <h3 className="text-4xl font-black">{formatCurrency(result.breakdown.total)}</h3>
          <p className="text-xs opacity-75 mt-1">Including VAT (15%)</p>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Project Area</p>
          <h3 className="text-4xl font-black">{result.area ? formatArea(result.area) : 'N/A'}</h3>
          <p className="text-xs opacity-75 mt-1">Total usable space</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
          <p className="text-sm opacity-90 mb-2">Estimated Timeline</p>
          <h3 className="text-4xl font-black">{result.timeline.total}</h3>
          <p className="text-xs opacity-75 mt-1">From start to completion</p>
        </div>
      </div>

      {/* Cost Breakdown */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-black uppercase tracking-wider text-gray-900">
            Cost Breakdown
          </h3>
        </div>
        
        <div className="p-6">
          {result.breakdown.designServices && (
            <div className="mb-6">
              <h4 className="font-black text-gray-900 mb-3">Design Services</h4>
              <div className="space-y-3">
                {result.breakdown.designServices.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.notes && <p className="text-xs text-gray-500">{item.notes}</p>}
                    </div>
                    <p className="font-black text-red-600">{formatCurrency(item.cost)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.breakdown.materials && (
            <div className="mb-6">
              <h4 className="font-black text-gray-900 mb-3">Materials</h4>
              <div className="space-y-3">
                {result.breakdown.materials.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">
                        {getMaterialName(item.category)} ({item.quantity.toFixed(1)} {item.unit})
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(item.unitPrice)} per {item.unit} × Quality: {item.qualityTier}
                      </p>
                    </div>
                    <p className="font-black text-red-600">{formatCurrency(item.totalPrice)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.breakdown.furniture && (
            <div className="mb-6">
              <h4 className="font-black text-gray-900 mb-3">Furniture</h4>
              <div className="space-y-3">
                {result.breakdown.furniture.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{item.name} ({item.quantity} units)</p>
                      <p className="text-xs text-gray-500">
                        {formatCurrency(item.unitPrice)} per unit × Quality: {item.qualityTier}
                      </p>
                    </div>
                    <p className="font-black text-red-600">{formatCurrency(item.totalPrice)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary totals */}
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-black">{formatCurrency(result.breakdown.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contingency ({Math.round((result.breakdown.contingency / (result.breakdown.subtotal - result.breakdown.contingency)) * 100)}%)</span>
                <span className="font-black text-red-600">{formatCurrency(result.breakdown.contingency)}</span>
              </div>
              {result.breakdown.vat && (
                <div className="flex justify-between">
                  <span className="text-gray-600">VAT (15%)</span>
                  <span className="font-black text-red-600">{formatCurrency(result.breakdown.vat)}</span>
                </div>
              )}
              <div className="flex justify-between pt-4 border-t border-gray-200">
                <span className="font-black text-lg">TOTAL</span>
                <span className="font-black text-lg text-red-600">{formatCurrency(result.breakdown.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline & Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h4 className="font-black text-blue-900 mb-3">Project Timeline</h4>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-blue-800">Design Phase</p>
              <p className="font-bold">{result.timeline.designPhase}</p>
            </div>
            <div>
              <p className="text-sm text-blue-800">Construction/Installation</p>
              <p className="font-bold">{result.timeline.construction}</p>
            </div>
            <div className="pt-3 border-t border-blue-200">
              <p className="text-sm text-blue-800">Total Project Duration</p>
              <p className="font-black text-lg">{result.timeline.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
          <h4 className="font-black text-amber-900 mb-3">Important Notes</h4>
          <ul className="space-y-2">
            {result.notes.map((note, index) => (
              <li key={index} className="flex items-start gap-2 text-amber-800 text-sm">
                <svg className="w-4 h-4 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function getMaterialName(category: string): string {
  const names: Record<string, string> = {
    gwb_partitions: 'GWB Partitions',
    glass_partitions: 'Glass Partitions',
    ceiling_work: 'Ceiling Work',
    electrical_lighting: 'Electrical Lighting',
    electrical_power: 'Power Points',
    data_network: 'Data/Network',
    ac_systems: 'AC Systems',
    flooring_carpet: 'Carpet Flooring',
    flooring_spc: 'SPC Flooring',
    flooring_tiles: 'Tile Flooring',
    painting: 'Painting',
    doors: 'Doors',
    window_treatments: 'Window Treatments',
    signage: 'Signage'
  };
  return names[category] || category.replace('_', ' ');
}