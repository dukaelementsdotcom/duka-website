'use client';

import { useState, useEffect } from 'react';
import { basePricing } from '@/lib/data/pricingData';

// Password protection
const ADMIN_PASSWORD = 'DukaAdmin2026';

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [pricingData, setPricingData] = useState(basePricing);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Check if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('duka_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('duka_admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('duka_admin_auth');
  };

  const handlePriceChange = (category: string, key: string, value: number) => {
    setPricingData(prev => ({
      ...prev,
      [category]: {
        ...(prev as any)[category],
        [key]: value
      }
    }));
  };

  const handleAdditionalChange = (key: string, value: number) => {
    setPricingData(prev => ({
      ...prev,
      additionalFactors: {
        ...prev.additionalFactors,
        [key]: value
      }
    }));
  };

  const saveChanges = () => {
    setIsSaving(true);
    
    // In a real app, you would save to a database or file
    // For now, we'll just save to localStorage and show a message
    localStorage.setItem('duka_pricing_data', JSON.stringify(pricingData));
    
    setTimeout(() => {
      setIsSaving(false);
      setSaveMessage('Prices updated successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    }, 1000);
  };

  const resetToDefaults = () => {
    if (confirm('Reset all prices to default values?')) {
      setPricingData(basePricing);
      localStorage.removeItem('duka_pricing_data');
      setSaveMessage('Reset to default prices');
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  // Load saved prices
  useEffect(() => {
    const saved = localStorage.getItem('duka_pricing_data');
    if (saved) {
      try {
        setPricingData(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved prices:', e);
      }
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">Admin Access</h2>
            <p className="text-gray-600">Enter password to update pricing</p>
          </div>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full p-4 border-2 border-gray-200 rounded-xl mb-4 focus:border-red-600 focus:ring-red-600"
            />
            {error && (
              <div className="text-red-600 text-sm mb-4">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-4 rounded-xl font-bold hover:bg-red-700 transition-colors"
            >
              Access Admin Panel
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Default password: <code className="bg-gray-100 px-2 py-1 rounded">DukaAdmin2026</code></p>
            <p className="mt-2 text-xs">Change this in the code for security</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 p-6 bg-white rounded-2xl shadow">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter text-gray-900 mb-2">
              Pricing Admin Panel
            </h1>
            <p className="text-gray-600">Update all calculator prices here</p>
          </div>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            {saveMessage && (
              <div className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                {saveMessage}
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:border-gray-400 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Service Rates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Rates */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
              Service Rates (ETB per m²)
            </h3>
            <div className="space-y-4">
              {Object.entries(pricingData.serviceRates).map(([service, rate]) => (
                <div key={service} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-bold text-gray-900 capitalize">
                      {service.replace('-', ' ')}
                    </div>
                    <div className="text-sm text-gray-600">
                      Base construction cost
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold">ETB</span>
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => handlePriceChange('serviceRates', service, parseInt(e.target.value) || 0)}
                      className="w-32 p-3 border-2 border-gray-200 rounded-lg text-right font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Minimum Fees */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
              Minimum Project Fees (ETB)
            </h3>
            <div className="space-y-4">
              {Object.entries(pricingData.minimumFees).map(([service, fee]) => (
                <div key={service} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-bold text-gray-900 capitalize">
                      {service.replace('-', ' ')}
                    </div>
                    <div className="text-sm text-gray-600">
                      Minimum charge
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold">ETB</span>
                    <input
                      type="number"
                      value={fee}
                      onChange={(e) => handlePriceChange('minimumFees', service, parseInt(e.target.value) || 0)}
                      className="w-32 p-3 border-2 border-gray-200 rounded-lg text-right font-bold"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Factors */}
          <div className="bg-white rounded-2xl shadow p-6 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b">
              Additional Cost Factors
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(pricingData.additionalFactors).map(([item, cost]) => (
                <div key={item} className="p-4 border-2 border-gray-200 rounded-xl">
                  <div className="font-bold text-gray-900 mb-2 capitalize">
                    {item.replace(/([A-Z])/g, ' $1').replace('-', ' ')}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold">ETB</span>
                      <input
                        type="number"
                        value={cost}
                        onChange={(e) => handleAdditionalChange(item, parseInt(e.target.value) || 0)}
                        className="w-28 p-2 border border-gray-300 rounded text-right"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-8 border-t">
          <button
            onClick={saveChanges}
            disabled={isSaving}
            className={`
              px-12 py-4 rounded-xl font-bold text-white
              ${isSaving ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'}
              transition-colors
            `}
          >
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
          
          <button
            onClick={resetToDefaults}
            className="px-12 py-4 rounded-xl font-bold border-2 border-gray-300 text-gray-700 hover:border-gray-400 transition-colors"
          >
            Reset to Defaults
          </button>
        </div>

        {/* Instructions */}
        <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
          <h4 className="font-bold text-gray-900 mb-3">How to Update Prices:</h4>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Update any price by typing in the input fields</li>
            <li>Click "Save All Changes" to store the new prices</li>
            <li>The calculator will immediately use the new prices</li>
            <li>To revert to original prices, use "Reset to Defaults"</li>
            <li>For security, change the password in the code (line 6 of this file)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}