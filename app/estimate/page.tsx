// /app/estimate/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

/**
 * EstimatePage Component
 * Provides interactive tools for clients to plan office space and estimate costs
 * based on local Addis Ababa market standards.
 */
export default function EstimatePage() {
  // State for the interactive elements
  const [employees, setEmployees] = useState(10);
  const [selectedService, setSelectedService] = useState('office-partitioning');
  
  // Logic: Calculates required square meters based on employee headcount
  const calculateArea = () => employees * 10;
  
  // Logic: Calculates estimated cost in ETB based on area and service type
  const calculateCost = () => {
    const baseCosts = {
      'office-partitioning': 1500, // Price per m2
      'office-renovation': 2000,    // Price per m2
      'interior-decoration': 1200,  // Price per m2
    };
    const rate = baseCosts[selectedService as keyof typeof baseCosts] || 1500;
    return calculateArea() * rate;
  };

  return (
    <>
      <NavBar />
      
      <main className="min-h-screen pt-32 pb-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black mb-2 uppercase tracking-tighter text-gray-900">
              Project Estimator
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl font-medium">
              Use our interactive tools to plan your Ethiopian workspace requirements and get an instant budget range.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* --- SPACE PLANNER SECTION --- */}
            {/* scroll-mt-32 ensures the fixed NavBar doesn't cover the header when jumping to this ID */}
            <div id="planner" className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm scroll-mt-32">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900 flex items-center gap-3">
                <span className="text-red-600">01.</span> Space Planner
              </h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-4">
                    Target Headcount: <span className="text-red-600 text-xl ml-2">{employees} Employees</span>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={employees}
                    onChange={(e) => setEmployees(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <span>1 Staff</span>
                    <span>100 Staff</span>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-gray-100">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1">
                    Estimated Area Required
                  </label>
                  <div className="text-5xl font-black text-gray-900 tracking-tighter">
                    {calculateArea()} <span className="text-red-600">m²</span>
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 mt-3 leading-relaxed">
                    * Calculation based on standard 10m² per staff member including circulation and amenities.
                  </p>
                </div>
              </div>
            </div>
            
            {/* --- COST ESTIMATOR SECTION --- */}
            <div id="cost-estimator" className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm scroll-mt-32">
              <h2 className="text-2xl font-black mb-6 uppercase tracking-tight text-gray-900 flex items-center gap-3">
                <span className="text-red-600">02.</span> Cost Estimator
              </h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">
                    Select Scope of Work
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg font-bold text-sm focus:ring-2 focus:ring-red-600 outline-none transition-all cursor-pointer"
                  >
                    <option value="office-partitioning">Aluminum & Glass Partitioning</option>
                    <option value="office-renovation">Full Office Renovation</option>
                    <option value="interior-decoration">Interior Decoration & Finishing</option>
                  </select>
                </div>
                
                <div className="pt-6 border-t border-gray-100">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1">
                    Estimated Budget Range (ETB)
                  </label>
                  <div className="text-5xl font-black text-green-600 tracking-tighter">
                    {calculateCost().toLocaleString()}
                  </div>
                  <p className="text-[10px] uppercase font-bold text-gray-400 mt-3 leading-relaxed">
                    * Preliminary estimate for {calculateArea()}m². Final costs depend on material selection and site conditions.
                  </p>
                </div>
              </div>
            </div>

          </div>
          
          {/* --- FINAL ACTION CARD --- */}
          <div className="mt-12 p-10 bg-black text-white rounded-xl flex flex-col md:flex-row justify-between items-center gap-8 border border-white/10">
            <div className="text-center md:text-left">
              <h3 className="font-black text-2xl uppercase tracking-tight mb-2">Need a Formal Proposal?</h3>
              <p className="text-gray-400 font-medium">Schedule a site visit for a 100% accurate measurement and quote.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link
                href="/contact"
                className="bg-red-600 text-white px-10 py-5 rounded-lg font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-all text-center"
              >
                Book Site Survey
              </Link>
              <Link
                href="/"
                className="border border-white/20 px-10 py-5 rounded-lg font-black uppercase tracking-widest text-[11px] hover:bg-white hover:text-black transition-all text-center"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
              Duka Interiors PLC — Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}