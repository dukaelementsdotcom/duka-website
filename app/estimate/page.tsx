// app/estimate/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// Simple currency formatter
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function EstimatePage() {
  // ===== STATE MANAGEMENT =====
  const [activeTab, setActiveTab] = useState<'space-planner' | 'cost-estimator'>('space-planner');
  
  // Space Planner State
  const [headcount, setHeadcount] = useState(25);
  const [growthProjection, setGrowthProjection] = useState(15);
  const [workStyle, setWorkStyle] = useState<'traditional' | 'hybrid' | 'modern' | 'activity_based'>('hybrid');
  const [privateOffices, setPrivateOffices] = useState(5);
  const [openPlanSeats, setOpenPlanSeats] = useState(15);
  const [meetingSmall, setMeetingSmall] = useState(2);
  const [meetingMedium, setMeetingMedium] = useState(1);
  const [reception, setReception] = useState(1);
  const [breakoutSpaces, setBreakoutSpaces] = useState(2);
  const [canteen, setCanteen] = useState(0);
  const [archive, setArchive] = useState(1);
  const [showAdvancedRooms, setShowAdvancedRooms] = useState(false);
  
  // Cost Estimator State
  const [serviceCategory, setServiceCategory] = useState<'design' | 'build' | 'full'>('full');
  const [qualityTier, setQualityTier] = useState<'standard' | 'premium' | 'luxury'>('premium');
  const [includeFurniture, setIncludeFurniture] = useState(true);
  const [includeAC, setIncludeAC] = useState(false);
  const [include3DVisuals, setInclude3DVisuals] = useState(true);
  const [includeBOQ, setIncludeBOQ] = useState(true);
  
  // Calculation Results
  const [spaceResult, setSpaceResult] = useState<any>(null);
  const [costResult, setCostResult] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // ===== CALCULATION LOGIC =====
  const calculateSpace = () => {
    // Ethiopian Standards
    const spacePerPerson = {
      traditional: 12,
      hybrid: 9,
      modern: 7,
      activity_based: 8
    };
    
    const baseArea = headcount * spacePerPerson[workStyle];
    
    // Room calculations
    const privateOfficeArea = privateOffices * 15;
    const openPlanArea = openPlanSeats * 7;
    const meetingSmallArea = meetingSmall * 15;
    const meetingMediumArea = meetingMedium * 25;
    const receptionArea = reception * 20;
    const breakoutArea = breakoutSpaces * 12;
    const canteenArea = canteen * 30;
    const archiveArea = archive * 12;
    
    const roomsTotal = privateOfficeArea + openPlanArea + meetingSmallArea + 
                      meetingMediumArea + receptionArea + breakoutArea + 
                      canteenArea + archiveArea;
    
    const circulationRatio = {
      traditional: 0.28,
      hybrid: 0.24,
      modern: 0.20,
      activity_based: 0.22
    };
    
    const circulationArea = (baseArea + roomsTotal) * circulationRatio[workStyle];
    const totalUsableArea = baseArea + roomsTotal + circulationArea;
    const totalRentableArea = totalUsableArea * 1.08; // +8% common areas
    const efficiencyRatio = (baseArea + roomsTotal) / totalUsableArea;
    
    // Design service cost estimate
    const designRate = qualityTier === 'standard' ? 350 : qualityTier === 'premium' ? 550 : 750;
    const designServiceCost = Math.round(totalUsableArea * designRate);
    
    return {
      baseArea,
      rooms: [
        { name: 'Private Offices', area: privateOfficeArea, count: privateOffices },
        { name: 'Open Plan Workstations', area: openPlanArea, count: openPlanSeats },
        { name: 'Small Meeting Rooms', area: meetingSmallArea, count: meetingSmall },
        { name: 'Medium Meeting Rooms', area: meetingMediumArea, count: meetingMedium },
        { name: 'Reception Area', area: receptionArea, count: reception },
        { name: 'Breakout Spaces', area: breakoutArea, count: breakoutSpaces },
        { name: 'Canteen', area: canteenArea, count: canteen },
        { name: 'Archive Room', area: archiveArea, count: archive }
      ].filter(r => r.area > 0),
      circulationArea,
      totalUsableArea,
      totalRentableArea,
      efficiencyRatio,
      designServiceCost,
      recommendations: [
        `Plan for ${growthProjection}% growth with flexible space allocation`,
        `${(efficiencyRatio * 100).toFixed(0)}% space efficiency - ${efficiencyRatio > 0.75 ? 'Excellent' : efficiencyRatio > 0.70 ? 'Good' : 'Average'} utilization`,
        `Ethiopian standard: ${spacePerPerson[workStyle]}m² per person for ${workStyle.replace('_', ' ')} layout`
      ]
    };
  };

  const calculateCost = (spaceData: any) => {
    const area = spaceData.totalUsableArea;
    
    // Material rates per m² (ETB) - Ethiopian market 2026
    const materialRates = {
      standard: {
        partitions: 2200,
        ceiling: 1100,
        electrical: 1800,
        flooring: 1600,
        painting: 450
      },
      premium: {
        partitions: 3500,
        ceiling: 1800,
        electrical: 2800,
        flooring: 2600,
        painting: 750
      },
      luxury: {
        partitions: 5200,
        ceiling: 2800,
        electrical: 4200,
        flooring: 4100,
        painting: 1200
      }
    };
    
    const rates = materialRates[qualityTier];
    const materialsCost = area * (rates.partitions + rates.ceiling + rates.electrical + rates.flooring + rates.painting);
    
    // Furniture cost
    const furnitureCost = includeFurniture ? headcount * (qualityTier === 'standard' ? 18000 : qualityTier === 'premium' ? 28000 : 42000) : 0;
    
    // Design services
    const designServicesCost = (() => {
      let cost = 0;
      const designRate = qualityTier === 'standard' ? 400 : qualityTier === 'premium' ? 650 : 950;
      
      // Base design fee
      cost += area * designRate;
      
      // 3D Visualizations
      if (include3DVisuals) {
        const views = Math.max(3, Math.ceil(area / 50));
        cost += views * (qualityTier === 'standard' ? 2500 : qualityTier === 'premium' ? 4000 : 6500);
      }
      
      // BOQ
      if (includeBOQ) {
        cost += qualityTier === 'standard' ? 8000 : qualityTier === 'premium' ? 12000 : 18000;
      }
      
      return cost;
    })();
    
    // Labor (35% of materials + furniture)
    const laborCost = (materialsCost + furnitureCost) * 0.35;
    
    // AC (if selected)
    const acCost = includeAC ? area * 3800 : 0;
    
    // Subtotal
    let subtotal = materialsCost + furnitureCost + designServicesCost + laborCost + acCost;
    
    // Contingency (12%)
    const contingency = subtotal * 0.12;
    subtotal += contingency;
    
    // VAT (15%)
    const vat = subtotal * 0.15;
    const total = subtotal + vat;
    
    return {
      breakdown: {
        materials: {
          partitions: area * rates.partitions,
          ceiling: area * rates.ceiling,
          electrical: area * rates.electrical,
          flooring: area * rates.flooring,
          painting: area * rates.painting,
          total: materialsCost
        },
        furniture: furnitureCost,
        designServices: {
          base: area * (qualityTier === 'standard' ? 400 : qualityTier === 'premium' ? 650 : 950),
          visuals: include3DVisuals ? (Math.max(3, Math.ceil(area / 50)) * (qualityTier === 'standard' ? 2500 : qualityTier === 'premium' ? 4000 : 6500)) : 0,
          boq: includeBOQ ? (qualityTier === 'standard' ? 8000 : qualityTier === 'premium' ? 12000 : 18000) : 0,
          total: designServicesCost
        },
        labor: laborCost,
        ac: acCost,
        contingency,
        vat,
        total
      },
      timeline: {
        design: serviceCategory === 'design' ? '3-4 weeks' : '5-7 weeks',
        construction: serviceCategory === 'design' ? 'N/A' : '10-14 weeks',
        total: serviceCategory === 'design' ? '3-4 weeks' : '15-21 weeks'
      },
      notes: [
        'Estimate based on Ethiopian market rates (Q1 2026)',
        'Final pricing subject to site survey and detailed requirements',
        'VAT (15%) included in total',
        'Prices valid for 30 days from estimate date'
      ]
    };
  };

  const handleCalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      const spaceData = calculateSpace();
      setSpaceResult(spaceData);
      
      if (activeTab === 'cost-estimator' || serviceCategory !== 'design') {
        const costData = calculateCost(spaceData);
        setCostResult(costData);
      }
      
      // Scroll to results
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
      setIsCalculating(false);
    }, 500);
  };

  const handleReset = () => {
    setSpaceResult(null);
    setCostResult(null);
  };

  // Auto-calculate open plan seats based on headcount
  useEffect(() => {
    const totalAssigned = privateOffices + meetingSmall * 6 + meetingMedium * 10;
    setOpenPlanSeats(Math.max(0, headcount - totalAssigned));
  }, [headcount, privateOffices, meetingSmall, meetingMedium]);

  return (
    <>
      <NavBar />
      
      <main className="min-h-screen pt-32 bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="font-black uppercase tracking-widest">Ethiopian Standards</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Duka Estimator Pro
            </h1>
            <p className="text-xl max-w-3xl mx-auto opacity-90">
              Professional space planning and cost estimation for Ethiopian commercial projects. 
              Get accurate, market-specific estimates in minutes.
            </p>
          </div>
        </section>

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
                    {activeTab === 'cost-estimator' ? 'Detailed cost breakdown' : 'Estimate project budget'}
                  </div>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-8">
              {/* SPACE PLANNER TAB */}
              {activeTab === 'space-planner' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Headcount */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-3">
                        Total Headcount
                      </label>
                      <input
                        type="number"
                        value={headcount}
                        onChange={(e) => setHeadcount(Math.max(5, parseInt(e.target.value) || 5))}
                        min="5"
                        max="500"
                        className="w-full text-3xl font-black text-center py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Staff requiring workspace
                      </p>
                    </div>
                    
                    {/* Growth Projection */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-3">
                        Growth Projection (%)
                      </label>
                      <input
                        type="number"
                        value={growthProjection}
                        onChange={(e) => setGrowthProjection(Math.max(0, parseInt(e.target.value) || 0))}
                        min="0"
                        max="100"
                        className="w-full text-3xl font-black text-center py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Expected growth in 1-3 years
                      </p>
                    </div>
                    
                    {/* Work Style */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-3">
                        Work Style
                      </label>
                      <select
                        value={workStyle}
                        onChange={(e) => setWorkStyle(e.target.value as any)}
                        className="w-full text-lg font-black text-center py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent appearance-none"
                      >
                        <option value="traditional">Traditional</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="modern">Modern/Open Plan</option>
                        <option value="activity_based">Activity-Based</option>
                      </select>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Layout preference
                      </p>
                    </div>
                  </div>
                  
                  {/* Room Configuration */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-black uppercase tracking-wider text-gray-900">
                        Room Configuration
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowAdvancedRooms(!showAdvancedRooms)}
                        className="text-sm font-black text-red-600 hover:underline"
                      >
                        {showAdvancedRooms ? 'Hide Advanced' : 'Show Advanced Options'}
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <RoomInput 
                        label="Private Offices" 
                        value={privateOffices} 
                        onChange={setPrivateOffices}
                        description="Executive/Manager offices"
                      />
                      <RoomInput 
                        label="Open Plan Seats" 
                        value={openPlanSeats} 
                        onChange={setOpenPlanSeats}
                        description="Workstations (auto-calculated)"
                        disabled
                      />
                      <RoomInput 
                        label="Small Meeting" 
                        value={meetingSmall} 
                        onChange={setMeetingSmall}
                        description="4-6 people rooms"
                      />
                      <RoomInput 
                        label="Medium Meeting" 
                        value={meetingMedium} 
                        onChange={setMeetingMedium}
                        description="8-12 people rooms"
                      />
                      {showAdvancedRooms && (
                        <>
                          <RoomInput 
                            label="Reception" 
                            value={reception} 
                            onChange={setReception}
                            description="Main reception area"
                          />
                          <RoomInput 
                            label="Breakout Spaces" 
                            value={breakoutSpaces} 
                            onChange={setBreakoutSpaces}
                            description="Collaboration zones"
                          />
                          <RoomInput 
                            label="Canteen" 
                            value={canteen} 
                            onChange={setCanteen}
                            description="Dining area"
                          />
                          <RoomInput 
                            label="Archive Room" 
                            value={archive} 
                            onChange={setArchive}
                            description="Storage/Records"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleCalculate}
                      disabled={isCalculating}
                      className={`flex-1 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-lg transition-all ${
                        isCalculating
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {isCalculating ? 'Calculating...' : 'Calculate Space Requirements'}
                    </button>
                    {spaceResult && (
                      <button
                        onClick={handleReset}
                        className="px-8 py-4 text-sm font-black uppercase tracking-widest rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Reset Form
                      </button>
                    )}
                  </div>
                </div>
              )}
              
              {/* COST ESTIMATOR TAB */}
              {activeTab === 'cost-estimator' && (
                <div className="space-y-8">
                  {/* Service Category */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-4">
                      Service Scope
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { id: 'design', label: 'Design Services Only', desc: 'Space planning, 3D visuals, working drawings' },
                        { id: 'build', label: 'Build Only', desc: 'Construction with client-provided designs' },
                        { id: 'full', label: 'Design + Build (Full)', desc: 'Complete turnkey solution' }
                      ].map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => setServiceCategory(opt.id as any)}
                          className={`p-6 rounded-xl border-2 text-left transition-all ${
                            serviceCategory === opt.id
                              ? 'border-red-600 bg-red-50'
                              : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="font-black text-lg mb-2">{opt.label}</div>
                          <p className="text-sm text-gray-600">{opt.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Quality Tier */}
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-4">
                      Quality Tier
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { 
                          id: 'standard', 
                          label: 'Standard', 
                          desc: 'Budget-friendly with local materials and standard finishes',
                          price: 'ETB 8,500-12,000/m²'
                        },
                        { 
                          id: 'premium', 
                          label: 'Premium', 
                          desc: 'Mid-range with branded materials and enhanced finishes',
                          price: 'ETB 13,500-18,000/m²'
                        },
                        { 
                          id: 'luxury', 
                          label: 'Luxury', 
                          desc: 'High-end with imported materials, custom designs, premium finishes',
                          price: 'ETB 20,000-30,000+/m²'
                        }
                      ].map((tier) => (
                        <button
                          key={tier.id}
                          onClick={() => setQualityTier(tier.id as any)}
                          className={`p-6 rounded-xl border-2 text-left transition-all ${
                            qualityTier === tier.id
                              ? 'border-red-600 bg-red-50'
                              : 'border-gray-200 hover:border-red-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-black text-lg">{tier.label}</div>
                            <div className="bg-red-100 text-red-800 text-xs font-bold px-3 py-1 rounded-full">
                              {tier.price}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{tier.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Additional Services */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-black uppercase tracking-wider text-gray-900 mb-4">
                      Additional Services
                    </h3>
                    <div className="space-y-4">
                      <ServiceCheckbox
                        label="Office Furniture Package"
                        checked={includeFurniture}
                        onChange={setIncludeFurniture}
                        description={`Complete furniture for ${headcount} workstations (desks, chairs, storage)`}
                        price={qualityTier === 'standard' ? 18000 : qualityTier === 'premium' ? 28000 : 42000}
                      />
                      <ServiceCheckbox
                        label="3D Visualizations"
                        checked={include3DVisuals}
                        onChange={setInclude3DVisuals}
                        description="Photorealistic renders of key spaces (reception, meeting rooms, workspaces)"
                        price={qualityTier === 'standard' ? 2500 : qualityTier === 'premium' ? 4000 : 6500}
                        unit="per view"
                      />
                      <ServiceCheckbox
                        label="Bill of Quantities (BOQ)"
                        checked={includeBOQ}
                        onChange={setIncludeBOQ}
                        description="Detailed material and labor breakdown for procurement"
                        price={qualityTier === 'standard' ? 8000 : qualityTier === 'premium' ? 12000 : 18000}
                        fixed
                      />
                      <ServiceCheckbox
                        label="AC Installation"
                        checked={includeAC}
                        onChange={setIncludeAC}
                        description="Split unit AC systems (less common in Ethiopia, available on request)"
                        price={3800}
                        unit="per m²"
                      />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={handleCalculate}
                      disabled={isCalculating}
                      className={`flex-1 px-8 py-4 text-sm font-black uppercase tracking-widest rounded-lg transition-all ${
                        isCalculating
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-700 text-white'
                      }`}
                    >
                      {isCalculating ? 'Calculating...' : 'Get Detailed Cost Estimate'}
                    </button>
                    {costResult && (
                      <button
                        onClick={handleReset}
                        className="px-8 py-4 text-sm font-black uppercase tracking-widest rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        Reset Form
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RESULTS SECTION */}
        {(spaceResult || costResult) && (
          <section id="results-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
              <div className="px-8 py-6 bg-gray-50 border-b border-gray-200">
                <h2 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
                  Estimate Results
                </h2>
              </div>
              
              <div className="p-8">
                {spaceResult && (
                  <div className="mb-12">
                    <h3 className="text-xl font-black mb-6 uppercase tracking-wider text-gray-900 flex items-center gap-2">
                      <span className="text-red-600">📐</span> Space Planning Results
                    </h3>
                    
                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <ResultCard 
                        label="Total Usable Area" 
                        value={`${spaceResult.totalUsableArea.toFixed(1)} m²`}
                        subtext="Including circulation space"
                        color="red"
                      />
                      <ResultCard 
                        label="Total Rentable Area" 
                        value={`${spaceResult.totalRentableArea.toFixed(1)} m²`}
                        subtext="Including common areas"
                        color="blue"
                      />
                      <ResultCard 
                        label="Space Efficiency" 
                        value={`${(spaceResult.efficiencyRatio * 100).toFixed(0)}%`}
                        subtext={spaceResult.efficiencyRatio > 0.75 ? 'Excellent utilization' : spaceResult.efficiencyRatio > 0.70 ? 'Good utilization' : 'Average utilization'}
                        color="green"
                      />
                      <ResultCard 
                        label="Design Service Estimate" 
                        value={formatCurrency(spaceResult.designServiceCost)}
                        subtext="Preliminary design fee"
                        color="purple"
                      />
                    </div>
                    
                    {/* Room Breakdown */}
                    <div className="mb-8">
                      <h4 className="font-black text-gray-900 mb-4">Room Breakdown</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-gray-600 border-b border-gray-200">Room Type</th>
                              <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-gray-600 border-b border-gray-200">Count</th>
                              <th className="px-4 py-3 text-left text-xs font-black uppercase tracking-wider text-gray-600 border-b border-gray-200">Area (m²)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {spaceResult.rooms.map((room: any, idx: number) => (
                              <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium">{room.name}</td>
                                <td className="px-4 py-3">{room.count}</td>
                                <td className="px-4 py-3 font-black text-red-600">{room.area.toFixed(1)}</td>
                              </tr>
                            ))}
                            <tr className="bg-gray-50 font-black">
                              <td className="px-4 py-3">Circulation Space</td>
                              <td className="px-4 py-3">-</td>
                              <td className="px-4 py-3 text-red-600">{spaceResult.circulationArea.toFixed(1)}</td>
                            </tr>
                            <tr className="bg-red-50 text-red-800 font-black">
                              <td className="px-4 py-3">TOTAL USABLE AREA</td>
                              <td className="px-4 py-3">-</td>
                              <td className="px-4 py-3">{spaceResult.totalUsableArea.toFixed(1)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    {/* Recommendations */}
                    {spaceResult.recommendations.length > 0 && (
                      <div className="bg-blue-50 border-l-4 border-blue-600 rounded-xl p-6">
                        <h4 className="font-black text-blue-900 mb-3">Professional Recommendations</h4>
                        <ul className="space-y-2">
                          {spaceResult.recommendations.map((rec: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 text-blue-800">
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
                )}
                
                {costResult && (
                  <div>
                    <h3 className="text-xl font-black mb-6 uppercase tracking-wider text-gray-900 flex items-center gap-2">
                      <span className="text-red-600">💰</span> Cost Estimation Results
                    </h3>
                    
                    {/* Total Cost Card */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-8 text-white mb-8">
                      <div className="text-2xl font-black opacity-90 mb-2">TOTAL PROJECT ESTIMATE</div>
                      <div className="text-5xl font-black tracking-tighter mb-4">{formatCurrency(costResult.breakdown.total)}</div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="opacity-75 mb-1">Service Scope</div>
                          <div className="font-black uppercase">
                            {serviceCategory === 'design' ? 'Design Services Only' : 
                             serviceCategory === 'build' ? 'Build Only' : 'Design + Build (Full)'}
                          </div>
                        </div>
                        <div>
                          <div className="opacity-75 mb-1">Quality Tier</div>
                          <div className="font-black uppercase">{qualityTier.charAt(0).toUpperCase() + qualityTier.slice(1)}</div>
                        </div>
                        <div>
                          <div className="opacity-75 mb-1">Project Area</div>
                          <div className="font-black">{spaceResult?.totalUsableArea.toFixed(1)} m²</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Cost Breakdown */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="font-black text-gray-900 mb-4">Cost Breakdown</h4>
                        <div className="space-y-3">
                          <BreakdownItem 
                            label="Materials & Finishes" 
                            amount={costResult.breakdown.materials.total}
                            items={[
                              { name: 'Partitions', amount: costResult.breakdown.materials.partitions },
                              { name: 'Ceiling Work', amount: costResult.breakdown.materials.ceiling },
                              { name: 'Electrical', amount: costResult.breakdown.materials.electrical },
                              { name: 'Flooring', amount: costResult.breakdown.materials.flooring },
                              { name: 'Painting', amount: costResult.breakdown.materials.painting }
                            ]}
                          />
                          {includeFurniture && (
                            <BreakdownItem 
                              label="Office Furniture" 
                              amount={costResult.breakdown.furniture}
                              items={[
                                { name: 'Workstations', amount: headcount * (qualityTier === 'standard' ? 12000 : qualityTier === 'premium' ? 19000 : 28000) },
                                { name: 'Chairs & Storage', amount: headcount * (qualityTier === 'standard' ? 6000 : qualityTier === 'premium' ? 9000 : 14000) }
                              ]}
                            />
                          )}
                          <BreakdownItem 
                            label="Design Services" 
                            amount={costResult.breakdown.designServices.total}
                            items={[
                              { name: 'Space Planning & Drawings', amount: costResult.breakdown.designServices.base },
                              include3DVisuals && { name: '3D Visualizations', amount: costResult.breakdown.designServices.visuals },
                              includeBOQ && { name: 'Bill of Quantities', amount: costResult.breakdown.designServices.boq }
                            ].filter(Boolean)}
                          />
                          <BreakdownItem 
                            label="Labor & Installation" 
                            amount={costResult.breakdown.labor}
                          />
                          {includeAC && (
                            <BreakdownItem 
                              label="AC Installation" 
                              amount={costResult.breakdown.ac}
                            />
                          )}
                          <BreakdownItem 
                            label="Contingency (12%)" 
                            amount={costResult.breakdown.contingency}
                            highlight
                          />
                          <BreakdownItem 
                            label="VAT (15%)" 
                            amount={costResult.breakdown.vat}
                            highlight
                          />
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-black text-gray-900 mb-4">Project Timeline</h4>
                        <div className="bg-gray-50 rounded-xl p-6">
                          <div className="space-y-4">
                            <TimelineItem 
                              phase="Design Phase" 
                              duration={costResult.timeline.design}
                              description={serviceCategory === 'design' 
                                ? 'Space planning, 3D visuals, working drawings, BOQ preparation'
                                : 'Complete design development including all deliverables'}
                            />
                            {serviceCategory !== 'design' && (
                              <TimelineItem 
                                phase="Construction Phase" 
                                duration={costResult.timeline.construction}
                                description="Site preparation, MEP works, partitions, finishes, furniture installation, final handover"
                              />
                            )}
                            <div className="pt-4 border-t border-gray-200">
                              <div className="text-sm font-black text-gray-600 mb-1">TOTAL PROJECT DURATION</div>
                              <div className="text-2xl font-black text-red-600">{costResult.timeline.total}</div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Important Notes */}
                        <div className="mt-8 bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6">
                          <h4 className="font-black text-amber-900 mb-3">Important Notes</h4>
                          <ul className="space-y-2">
                            {costResult.notes.map((note: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2 text-amber-800 text-sm">
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
                  </div>
                )}
              </div>
            </div>
            
            {/* Final CTA */}
            <div className="mt-12 text-center">
              <div className="inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-6 rounded-2xl">
                <h3 className="text-2xl font-black mb-3">Ready for a Detailed Proposal?</h3>
                <p className="opacity-90 mb-6 max-w-2xl mx-auto">
                  This estimate provides a professional ballpark figure. For a precise quotation with material specifications, 3D visuals, and site-specific details, schedule a free consultation with our design team.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-white text-red-600 px-10 py-4 rounded-lg font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Schedule Free Consultation →
                </Link>
                <p className="text-xs opacity-75 mt-4">
                  Duka Estimator Pro v1.0 • Ethiopian Market Standards • Q1 2026 Rates
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </>
  );
}

// ===== REUSABLE COMPONENTS =====

function RoomInput({ label, value, onChange, description, disabled = false }: any) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <label className="block text-xs font-black uppercase tracking-widest text-gray-600 mb-1">
        {label}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value) || 0))}
        min="0"
        disabled={disabled}
        className={`w-full text-2xl font-black text-center py-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
      />
      <p className="text-xs text-gray-500 mt-1 text-center">{description}</p>
    </div>
  );
}

function ServiceCheckbox({ label, checked, onChange, description, price, unit, fixed = false }: any) {
  return (
    <label className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-red-300 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
      />
      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-black">{label}</div>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
          <div className="text-right">
            <div className="font-black text-red-600">
              {fixed ? formatCurrency(price) : `${formatCurrency(price)}/${unit}`}
            </div>
            {!fixed && <div className="text-xs text-gray-500">{unit}</div>}
          </div>
        </div>
      </div>
    </label>
  );
}

function ResultCard({ label, value, subtext, color }: any) {
  const colorClasses = {
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800'
  };
  
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 text-center">
      <div className="text-xs font-black uppercase tracking-wider text-gray-500 mb-2">{label}</div>
      <div className={`text-3xl font-black ${colorClasses[color as keyof typeof colorClasses]}`}>{value}</div>
      <div className="text-xs text-gray-500 mt-1">{subtext}</div>
    </div>
  );
}

function BreakdownItem({ label, amount, items = [], highlight = false }: any) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={`border-l-4 pl-4 py-2 ${highlight ? 'border-red-600 bg-red-50' : 'border-gray-300'}`}>
      <div className="flex items-center justify-between">
        <div 
          className={`font-black ${highlight ? 'text-red-800' : 'text-gray-900'} ${items.length > 0 ? 'cursor-pointer hover:underline' : ''}`}
          onClick={() => items.length > 0 && setExpanded(!expanded)}
        >
          {label}
          {items.length > 0 && (
            <span className="ml-2 text-xs text-gray-500">
              {expanded ? '▼' : '▶'}
            </span>
          )}
        </div>
        <div className={`font-black text-lg ${highlight ? 'text-red-600' : 'text-gray-900'}`}>
          {formatCurrency(amount)}
        </div>
      </div>
      
      {expanded && items.length > 0 && (
        <div className="mt-3 space-y-2 pl-4 border-l-2 border-gray-200">
          {items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between text-sm">
              <span className="text-gray-600">{item.name}</span>
              <span className="font-medium">{formatCurrency(item.amount)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TimelineItem({ phase, duration, description }: any) {
  return (
    <div className="border-l-4 border-red-600 pl-4 py-3 relative">
      <div className="absolute -left-2 top-3 w-4 h-4 bg-red-600 rounded-full border-4 border-white"></div>
      <div className="font-black text-gray-900">{phase}</div>
      <div className="text-2xl font-black text-red-600 mt-1">{duration}</div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
}