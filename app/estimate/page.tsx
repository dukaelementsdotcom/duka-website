'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

// ============================================================================
// DUKA OFFICE FIT-OUT ESTIMATOR
// Ethiopian commercial projects - realistic local standards
// Last updated: October 2026
// Sources: 2merkato, Jiji.com.et, Conmaret, Duka project data
// ============================================================================

// Ethiopian workspace standards - tighter than international norms
// Reflects local practice where rent is expensive relative to wages
const SPACE_STANDARDS = {
  // m² per person by work style (Ethiopian practice, not int'l standards)
  perPerson: {
    traditional: 8,   // Private offices, formal hierarchy (int'l would be 12)
    hybrid: 6,        // Mix of private and open (int'l would be 9)
    openPlan: 5,      // Modern open layout, hot-desking (int'l would be 7)
  },
  // Additional space allowances - Ethiopian norms
  circulation: 0.18,        // 18% for corridors (tighter than 22% int'l)
  reception: 12,            // Base reception area (m²)
  receptionPerStaff: 0.2,   // Additional per staff for waiting
  meetingPerStaff: 1.0,     // Meeting room space per staff member
  amenities: 0.6,           // Kitchen, prayer room, storage per staff
};

// Budget ranges per m² (ETB) - based on Oct 2026 Addis Ababa market research
// These are FULL FIT-OUT costs including materials and labor
// Sources: 2merkato.com, Jiji.com.et, Conmaret, supplier quotes
const BUDGET_RANGES = {
  standard: {
    min: 9000,
    max: 14000,
    label: 'Standard',
    desc: 'Local materials, functional finishes'
  },
  premium: {
    min: 14000,
    max: 22000,
    label: 'Premium',
    desc: 'Branded materials, professional finish'
  },
  luxury: {
    min: 22000,
    max: 35000,
    label: 'Luxury',
    desc: 'Imported materials, custom details'
  },
};

// Scope multipliers - what percentage of full fit-out cost each scope represents
// Based on typical Duka project cost breakdowns
const SCOPE_WEIGHTS = {
  partitioning: 0.28,   // GWB + glass partitions (glass is expensive)
  furniture: 0.27,      // Desks, chairs, storage, reception
  flooring: 0.12,       // Carpet tiles, SPC, porcelain
  electrical: 0.15,     // LED panels, sockets, data points
  ceiling: 0.08,        // Mineral fiber false ceiling
  painting: 0.05,       // Wall finishes (2 coats)
  branding: 0.05,       // Logo, signage, sandblasted glass
};

export default function EstimatePage() {
  // ===== FORM STATE =====
  const [step, setStep] = useState(1);

  // Step 1: Basic info
  const [headcount, setHeadcount] = useState<number | ''>('');
  const [workStyle, setWorkStyle] = useState<'traditional' | 'hybrid' | 'openPlan'>('hybrid');
  const [hasSpace, setHasSpace] = useState<'yes' | 'no' | ''>('');
  const [existingArea, setExistingArea] = useState<number | ''>('');

  // Step 2: Scope
  const [scope, setScope] = useState({
    partitioning: true,
    furniture: true,
    flooring: false,
    electrical: true,
    ceiling: false,
    painting: true,
    branding: false,
  });
  const [quality, setQuality] = useState<'standard' | 'premium' | 'luxury'>('premium');

  // Step 3: Contact (lead capture)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Check if returning user
  useEffect(() => {
    try {
      const saved = localStorage.getItem('duka-estimator-lead');
      if (saved) setSubmitted(true);
    } catch {}
  }, []);

  // ===== CALCULATIONS =====

  const calculateSpace = () => {
    if (!headcount) return null;
    const hc = Number(headcount);

    // Core workspace
    const workspaceArea = hc * SPACE_STANDARDS.perPerson[workStyle];

    // Reception (scales slightly with company size)
    const receptionArea = SPACE_STANDARDS.reception + (hc * SPACE_STANDARDS.receptionPerStaff);

    // Meeting rooms (scales with headcount)
    const meetingArea = hc * SPACE_STANDARDS.meetingPerStaff;

    // Amenities (kitchen, storage, etc.)
    const amenitiesArea = hc * SPACE_STANDARDS.amenities;

    // Subtotal before circulation
    const subtotal = workspaceArea + receptionArea + meetingArea + amenitiesArea;

    // Add circulation
    const circulationArea = subtotal * SPACE_STANDARDS.circulation;
    const totalArea = subtotal + circulationArea;

    return {
      workspace: Math.round(workspaceArea),
      reception: Math.round(receptionArea),
      meeting: Math.round(meetingArea),
      amenities: Math.round(amenitiesArea),
      circulation: Math.round(circulationArea),
      total: Math.round(totalArea),
      // Provide a range
      min: Math.round(totalArea * 0.85),
      max: Math.round(totalArea * 1.15),
    };
  };

  const calculateBudget = () => {
    // Use existing area if they have a space, otherwise calculated
    const spaceCalc = calculateSpace();
    const area = hasSpace === 'yes' && existingArea ? Number(existingArea) : (spaceCalc?.total || 0);

    if (!area) return null;

    // Calculate scope multiplier (what % of full fit-out)
    const scopeMultiplier = Object.entries(scope)
      .filter(([_, included]) => included)
      .reduce((sum, [key]) => sum + SCOPE_WEIGHTS[key as keyof typeof SCOPE_WEIGHTS], 0);

    // Get base rates for quality tier
    const rates = BUDGET_RANGES[quality];

    // Calculate range
    const minBudget = Math.round(area * rates.min * scopeMultiplier);
    const maxBudget = Math.round(area * rates.max * scopeMultiplier);

    // Round to nearest 10,000 ETB for cleaner numbers
    const roundTo = 10000;

    return {
      area,
      scopePercent: Math.round(scopeMultiplier * 100),
      min: Math.round(minBudget / roundTo) * roundTo,
      max: Math.round(maxBudget / roundTo) * roundTo,
      quality: rates,
    };
  };

  const spaceResult = calculateSpace();
  const budgetResult = calculateBudget();

  // ===== HANDLERS =====

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setSubmitting(true);

    try {
      await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          email: email || undefined,
          'project-type': 'Estimator inquiry',
          headcount: headcount || undefined,
          area: budgetResult?.area || spaceResult?.total || undefined,
          budget: budgetResult
            ? `${budgetResult.min.toLocaleString()} – ${budgetResult.max.toLocaleString()} ETB (${quality})`
            : undefined,
          message: `Estimator: ${headcount} staff, ${workStyle} layout, ${quality} quality. Scope: ${Object.entries(scope).filter(([,v]) => v).map(([k]) => k).join(', ')}.`,
        }),
      });

      try { localStorage.setItem('duka-estimator-lead', '1'); } catch {}
      setSubmitted(true);
    } catch (err) {
      // Still show results even if API fails
      setSubmitted(true);
    }

    setSubmitting(false);
  };

  const scopeCount = Object.values(scope).filter(Boolean).length;
  const canProceedStep1 = headcount && (hasSpace === 'no' || (hasSpace === 'yes' && existingArea));
  const canProceedStep2 = scopeCount > 0;

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-gray-50">

        {/* Header */}
        <section className="bg-gray-900 text-white py-10">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
              Office Fit-Out Estimator
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Plan your space requirements and budget.
              Get realistic estimates based on Ethiopian market rates.
            </p>
          </div>
        </section>

        {/* Progress indicator */}
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-2 text-sm">
            {[
              { n: 1, label: 'Team & Space' },
              { n: 2, label: 'Scope & Quality' },
              { n: 3, label: 'Your Estimate' },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center">
                <button
                  onClick={() => s.n < step && setStep(s.n)}
                  disabled={s.n > step}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors ${
                    step === s.n
                      ? 'bg-red-600 text-white font-medium'
                      : step > s.n
                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                    step > s.n ? 'bg-green-500 text-white' : ''
                  }`}>
                    {step > s.n ? '✓' : s.n}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
                {i < 2 && <div className="w-8 h-px bg-gray-300 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto px-4 pb-16">

          {/* ================================================================ */}
          {/* STEP 1: Team & Space */}
          {/* ================================================================ */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Tell us about your team
              </h2>

              {/* Headcount */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many people will work in this office?
                </label>
                <input
                  type="number"
                  value={headcount}
                  onChange={(e) => setHeadcount(e.target.value ? parseInt(e.target.value) : '')}
                  min="1"
                  max="500"
                  placeholder="e.g. 25"
                  className="w-full max-w-xs px-4 py-3 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Include everyone who needs a workspace: staff, management, and regular visitors.
                </p>
              </div>

              {/* Work style */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What work style fits your organization?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'traditional',
                      label: 'Traditional',
                      desc: 'Private offices for managers, enclosed workspaces',
                      space: `${SPACE_STANDARDS.perPerson.traditional}m² per person`
                    },
                    {
                      id: 'hybrid',
                      label: 'Hybrid',
                      desc: 'Mix of private offices and open areas',
                      space: `${SPACE_STANDARDS.perPerson.hybrid}m² per person`
                    },
                    {
                      id: 'openPlan',
                      label: 'Open Plan',
                      desc: 'Modern open layout, shared spaces',
                      space: `${SPACE_STANDARDS.perPerson.openPlan}m² per person`
                    },
                  ].map((style) => (
                    <button
                      key={style.id}
                      type="button"
                      onClick={() => setWorkStyle(style.id as typeof workStyle)}
                      className={`p-4 rounded-lg border-2 text-left transition-all ${
                        workStyle === style.id
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium text-gray-900">{style.label}</div>
                      <div className="text-sm text-gray-600 mt-1">{style.desc}</div>
                      <div className="text-xs text-red-600 font-medium mt-2">{style.space}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Existing space */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Do you already have a space?
                </label>
                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setHasSpace('no')}
                    className={`px-5 py-2.5 rounded-lg border-2 font-medium transition-all ${
                      hasSpace === 'no'
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    No, I need to find one
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasSpace('yes')}
                    className={`px-5 py-2.5 rounded-lg border-2 font-medium transition-all ${
                      hasSpace === 'yes'
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700'
                    }`}
                  >
                    Yes, I have a space
                  </button>
                </div>

                {hasSpace === 'yes' && (
                  <div className="ml-4 p-4 bg-gray-50 rounded-lg">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What's the area of your space?
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={existingArea}
                        onChange={(e) => setExistingArea(e.target.value ? parseInt(e.target.value) : '')}
                        min="20"
                        placeholder="e.g. 300"
                        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <span className="text-gray-600">m²</span>
                    </div>
                  </div>
                )}

                {hasSpace === 'no' && headcount && spaceResult && (
                  <div className="ml-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm text-green-800 font-medium mb-1">
                      Recommended space for {headcount} people:
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      {spaceResult.min}–{spaceResult.max} m²
                    </div>
                    <p className="text-sm text-green-700 mt-2">
                      This includes workspace, reception, meeting rooms, and circulation.
                    </p>
                  </div>
                )}
              </div>

              {/* Continue button */}
              <div className="flex justify-end pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(2)}
                  disabled={!canProceedStep1}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    canProceedStep1
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 2: Scope & Quality */}
          {/* ================================================================ */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                What work do you need?
              </h2>

              {/* Scope checkboxes */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select all that apply:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'partitioning', label: 'Partitioning', desc: 'Walls, glass partitions, doors' },
                    { id: 'furniture', label: 'Furniture', desc: 'Desks, chairs, storage, reception' },
                    { id: 'electrical', label: 'Electrical', desc: 'Lighting, sockets, data points' },
                    { id: 'flooring', label: 'Flooring', desc: 'Carpet, tiles, vinyl' },
                    { id: 'ceiling', label: 'Ceiling', desc: 'False ceiling installation' },
                    { id: 'painting', label: 'Painting', desc: 'Wall and ceiling finishes' },
                    { id: 'branding', label: 'Branding', desc: 'Logo, signage, graphics' },
                  ].map((item) => (
                    <label
                      key={item.id}
                      className={`flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        scope[item.id as keyof typeof scope]
                          ? 'border-red-600 bg-red-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={scope[item.id as keyof typeof scope]}
                        onChange={(e) => setScope({ ...scope, [item.id]: e.target.checked })}
                        className="mt-0.5 w-5 h-5 text-red-600 rounded border-gray-300 focus:ring-red-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-600">{item.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Quality tier */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  What quality level are you targeting?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(['standard', 'premium', 'luxury'] as const).map((tier) => {
                    const info = BUDGET_RANGES[tier];
                    return (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setQuality(tier)}
                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                          quality === tier
                            ? 'border-red-600 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium text-gray-900">{info.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{info.desc}</div>
                        <div className="text-xs text-red-600 font-medium mt-2">
                          {info.min.toLocaleString()}–{info.max.toLocaleString()} ETB/m²
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Preview */}
              {budgetResult && (
                <div className="mb-8 p-5 bg-gray-900 text-white rounded-xl">
                  <div className="text-sm text-gray-400 mb-1">Estimated budget range</div>
                  <div className="text-3xl font-bold">
                    {budgetResult.min.toLocaleString()} – {budgetResult.max.toLocaleString()} ETB
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    For {budgetResult.area}m² • {budgetResult.scopePercent}% of full fit-out • {BUDGET_RANGES[quality].label} quality
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  onClick={() => setStep(1)}
                  className="px-5 py-2.5 text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!canProceedStep2}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    canProceedStep2
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  See Full Estimate →
                </button>
              </div>
            </div>
          )}

          {/* ================================================================ */}
          {/* STEP 3: Results */}
          {/* ================================================================ */}
          {step === 3 && (
            <div className="space-y-6">

              {/* Lead capture (if not submitted) */}
              {!submitted && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    Your estimate is ready
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Enter your details to see the full breakdown.
                    We may call to discuss your project — no obligation.
                  </p>

                  <form onSubmit={handleSubmitLead} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Your name *
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          autoComplete="name"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone *
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          autoComplete="tel"
                          placeholder="+251 9..."
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={submitting || !name || !phone}
                      className={`w-full py-3 rounded-lg font-medium transition-colors ${
                        submitting || !name || !phone
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      {submitting ? 'Please wait...' : 'Show My Estimate'}
                    </button>
                  </form>

                  <button
                    onClick={() => setStep(2)}
                    className="w-full mt-3 py-2 text-gray-500 hover:text-gray-700 text-sm"
                  >
                    ← Go back and adjust
                  </button>
                </div>
              )}

              {/* Results (shown after submission) */}
              {submitted && spaceResult && budgetResult && (
                <>
                  {/* Space breakdown */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Space Requirements
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="bg-gray-900 text-white rounded-xl p-5">
                        <div className="text-sm text-gray-400 mb-1">Recommended area</div>
                        <div className="text-4xl font-bold">
                          {spaceResult.total} <span className="text-xl">m²</span>
                        </div>
                        <div className="text-sm text-gray-400 mt-2">
                          Range: {spaceResult.min}–{spaceResult.max} m²
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-5">
                        <div className="text-sm font-medium text-gray-900 mb-3">Breakdown</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Workspaces</span>
                            <span className="font-medium">{spaceResult.workspace} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Reception & waiting</span>
                            <span className="font-medium">{spaceResult.reception} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Meeting rooms</span>
                            <span className="font-medium">{spaceResult.meeting} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Amenities</span>
                            <span className="font-medium">{spaceResult.amenities} m²</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Circulation (20%)</span>
                            <span className="font-medium">{spaceResult.circulation} m²</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-gray-200 font-medium">
                            <span>Total</span>
                            <span>{spaceResult.total} m²</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      Based on {headcount} people with a {workStyle === 'openPlan' ? 'open plan' : workStyle} layout
                      ({SPACE_STANDARDS.perPerson[workStyle]}m² per person).
                    </p>
                  </div>

                  {/* Budget breakdown */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Budget Estimate
                    </h2>

                    <div className="bg-gray-900 text-white rounded-xl p-5 mb-6">
                      <div className="text-sm text-gray-400 mb-1">Estimated total</div>
                      <div className="text-4xl font-bold">
                        {budgetResult.min.toLocaleString()} – {budgetResult.max.toLocaleString()} <span className="text-xl">ETB</span>
                      </div>
                      <div className="text-sm text-gray-400 mt-2">
                        Including VAT • {BUDGET_RANGES[quality].label} quality
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-medium text-gray-900 mb-3">What's included:</div>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(scope)
                          .filter(([_, included]) => included)
                          .map(([key]) => (
                            <span
                              key={key}
                              className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium"
                            >
                              {key.charAt(0).toUpperCase() + key.slice(1)}
                            </span>
                          ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-amber-800">
                          <strong>This is a planning estimate.</strong> Final pricing depends on site conditions,
                          material choices, and detailed requirements. We'll provide an accurate quote after a site visit.
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500">Area</div>
                        <div className="font-bold text-gray-900">{budgetResult.area} m²</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500">Team size</div>
                        <div className="font-bold text-gray-900">{headcount} people</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500">Quality</div>
                        <div className="font-bold text-gray-900">{BUDGET_RANGES[quality].label}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-gray-500">Scope</div>
                        <div className="font-bold text-gray-900">{budgetResult.scopePercent}% of fit-out</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-red-600 text-white rounded-xl p-6 md:p-8 text-center">
                    <h3 className="text-xl font-bold mb-2">
                      Ready for a detailed quote?
                    </h3>
                    <p className="text-red-100 mb-6 max-w-lg mx-auto">
                      This estimate gives you a realistic budget range.
                      For accurate pricing with material options and timelines, let's schedule a free site visit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Link
                        href="/contact/"
                        className="inline-block px-6 py-3 bg-white text-red-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        Request Site Visit
                      </Link>
                      <a
                        href="tel:+251911123456"
                        className="inline-block px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
                      >
                        Call Us Now
                      </a>
                    </div>
                  </div>

                  {/* Start over */}
                  <div className="text-center">
                    <button
                      onClick={() => {
                        setStep(1);
                        setHeadcount('');
                        setHasSpace('');
                        setExistingArea('');
                        setScope({
                          partitioning: true,
                          furniture: true,
                          flooring: false,
                          electrical: true,
                          ceiling: false,
                          painting: true,
                          branding: false,
                        });
                        setQuality('premium');
                        setSubmitted(false);
                        try { localStorage.removeItem('duka-estimator-lead'); } catch {}
                      }}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      Start a new estimate →
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
