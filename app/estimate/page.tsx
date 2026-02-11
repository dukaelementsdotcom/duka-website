// app/estimate/page.tsx (ENHANCED VERSION)
'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function EstimatePage() {
  // ===== SPACE PLANNER STATE =====
  const [employees, setEmployees] = useState(25);
  const [workStyle, setWorkStyle] = useState<'traditional' | 'hybrid' | 'modern'>('hybrid');
  const [privateOffices, setPrivateOffices] = useState(5);
  const [meetingRooms, setMeetingRooms] = useState(2);
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  // ===== COST ESTIMATOR STATE =====
  const [serviceType, setServiceType] = useState<'design' | 'build' | 'full'>('full');
  const [qualityTier, setQualityTier] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [includeFurniture, setIncludeFurniture] = useState(true);
  const [includeAC, setIncludeAC] = useState(false);
  
  // ===== CALCULATIONS =====
  const calculateArea = () => {
    const basePerPerson = workStyle === 'traditional' ? 12 : workStyle === 'hybrid' ? 9 : 7;
    const privateOfficeArea = privateOffices * 15;
    const meetingRoomArea = meetingRooms * 20;
    const circulation = employees * basePerPerson * 0.22; // 22% circulation
    
    return Math.round((employees * basePerPerson) + privateOfficeArea + meetingRoomArea + circulation);
  };
  
  const calculateCost = () => {
    const area = calculateArea();
    const baseRates = {
      standard: { design: 400, build: 6500 },
      premium: { design: 650, build: 9500 },
      luxury: { design: 950, build: 14500 }
    };
    
    const rate = baseRates[qualityTier];
    let total = 0;
    
    if (serviceType === 'design') {
      total = area * rate.design;
    } else if (serviceType === 'build') {
      total = area * rate.build;
    } else { // full
      total = (area * rate.design) + (area * rate.build);
    }
    
    if (includeFurniture) total += employees * 22000;
    if (includeAC) total += area * 3500;
    
    return Math.round(total);
  };

  return (
    <>
      <NavBar />
      
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <header className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 bg-red-50 text-red-700 px-6 py-3 rounded-full mb-6 mx-auto">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-bold uppercase tracking-widest">Ethiopian Standards</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tighter text-gray-900">
              Office Space & Cost Estimator
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto font-medium">
              Plan your workspace requirements and get accurate cost estimates based on Addis Ababa market rates and international space planning standards.
            </p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* SPACE PLANNER */}
            <div id="planner" className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900 flex items-center gap-3">
                <span className="text-red-600">01.</span> Space Planner
              </h2>
              
              <div className="space-y-6">
                {/* Headcount */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    Total Headcount: <span className="text-red-600 ml-2">{employees}</span>
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                    <span>5 Staff</span>
                    <span>200 Staff</span>
                  </div>
                </div>
                
                {/* Work Style */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                    Work Style Preference
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['traditional', 'hybrid', 'modern'].map((style) => (
                      <button
                        key={style}
                        onClick={() => setWorkStyle(style as any)}
                        className={`p-4 rounded-lg border text-left font-bold uppercase text-[11px] tracking-widest ${
                          workStyle === style
                            ? 'border-red-600 bg-red-50 text-red-800'
                            : 'border-gray-300 hover:border-red-300'
                        }`}
                      >
                        {style.charAt(0).toUpperCase() + style.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Advanced Options */}
                {showAdvanced && (
                  <div className="space-y-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Private Offices
                        </label>
                        <input
                          type="number"
                          value={privateOffices}
                          onChange={(e) => setPrivateOffices(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-600 mb-1">
                          Meeting Rooms
                        </label>
                        <input
                          type="number"
                          value={meetingRooms}
                          onChange={(e) => setMeetingRooms(Math.max(0, parseInt(e.target.value) || 0))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-[11px] font-black uppercase tracking-widest text-red-600 hover:underline"
                >
                  {showAdvanced ? 'Hide Advanced Options' : 'Show Advanced Options'}
                </button>
                
                {/* Results */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
                        Estimated Area
                      </label>
                      <div className="text-4xl font-black text-gray-900">
                        {calculateArea()} <span className="text-red-600">m²</span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
                        Circulation Space
                      </label>
                      <div className="text-2xl font-black text-blue-600">
                        {Math.round(calculateArea() * 0.22)} m²
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-3">
                    * Based on Ethiopian workspace standards: {workStyle === 'traditional' ? '12m²' : workStyle === 'hybrid' ? '9m²' : '7m²'} per person + 22% circulation
                  </p>
                </div>
              </div>
            </div>
            
            {/* COST ESTIMATOR */}
            <div id="cost-estimator" className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900 flex items-center gap-3">
                <span className="text-red-600">02.</span> Cost Estimator
              </h2>
              
              <div className="space-y-6">
                {/* Service Type */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                    Service Scope
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'design', label: 'Design Only' },
                      { id: 'build', label: 'Build Only' },
                      { id: 'full', label: 'Design + Build' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setServiceType(opt.id as any)}
                        className={`p-3 rounded-lg border text-center font-bold uppercase text-[10px] tracking-widest ${
                          serviceType === opt.id
                            ? 'border-red-600 bg-red-50 text-red-800'
                            : 'border-gray-300 hover:border-red-300'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quality Tier */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                    Quality Tier
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'standard', label: 'Standard', desc: 'Local materials' },
                      { id: 'premium', label: 'Premium', desc: 'Branded materials' },
                      { id: 'luxury', label: 'Luxury', desc: 'Imported/custom' }
                    ].map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setQualityTier(tier.id as any)}
                        className={`p-4 rounded-lg border text-center ${
                          qualityTier === tier.id
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-300 hover:border-red-300'
                        }`}
                      >
                        <div className="font-black uppercase text-[11px] tracking-widest">{tier.label}</div>
                        <div className="text-[9px] text-gray-600 mt-1">{tier.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Add-ons */}
                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-3">
                    Additional Services
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeFurniture}
                        onChange={(e) => setIncludeFurniture(e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-[11px] font-bold">Office Furniture ({employees} workstations)</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeAC}
                        onChange={(e) => setIncludeAC(e.target.checked)}
                        className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                      />
                      <span className="text-[11px] font-bold">AC Installation (Split units)</span>
                    </label>
                  </div>
                </div>
                
                {/* Results */}
                <div className="pt-6 border-t border-gray-200">
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1">
                    Estimated Total Cost (ETB)
                  </label>
                  <div className="text-5xl font-black text-green-600">
                    {calculateCost().toLocaleString()}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-[10px] font-bold uppercase text-blue-800">Design Phase</div>
                      <div className="font-black mt-1">4-6 weeks</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-[10px] font-bold uppercase text-purple-800">Construction</div>
                      <div className="font-black mt-1">10-14 weeks</div>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-4">
                    * Estimate includes 15% VAT. Final pricing subject to site survey and detailed requirements.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA */}
          <div className="mt-16 p-8 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl text-center">
            <h3 className="text-2xl font-black text-white mb-3">Ready for an Accurate Quote?</h3>
            <p className="text-red-100 max-w-2xl mx-auto mb-6">
              This estimator provides ballpark figures. For a precise quotation with material specifications and 3D visuals, schedule a free consultation with our design team.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors"
            >
              Get Detailed Proposal →
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}