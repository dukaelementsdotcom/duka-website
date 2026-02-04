import CalculatorForm from '@/app/components/Calculator/CalculatorForm';
import NavBar from '@/app/components/NavBar'; // ADD THIS
import Footer from '@/app/components/Footer'; // ADD THIS
import Link from 'next/link';

export const metadata = {
  title: 'Project Cost Calculator | Duka Interiors',
  description: 'Get an instant estimate for your office design, partitioning, or renovation project in Addis Ababa.',
};

export default function EstimateCostPage() {
  return (
    <>
      {/* ADD NAVBAR */}
      <NavBar />
      
      <main className="min-h-screen pt-32 md:pt-48 px-4 md:px-20 pb-20">
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-red-50 text-red-700 px-6 py-3 rounded-full mb-6">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-bold uppercase tracking-widest">Cost Calculator</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-gray-950 mb-6">
              Project Cost Calculator
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Get a detailed, transparent estimate for your interior design project in Addis Ababa. 
              Our calculator considers size, materials, complexity, and location for accurate budgeting.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                🏢 Office Design
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                🚧 Partitioning
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                🔨 Renovation
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                💡 Technology
              </div>
              <div className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">
                🪑 Custom Furniture
              </div>
            </div>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <CalculatorForm />
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">How It Works</h3>
              <p className="text-gray-600">
                Our calculator uses current Addis Ababa market rates, material costs, and labor estimates to give you a realistic budget range.
              </p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Transparent Pricing</h3>
              <p className="text-gray-600">
                See exactly how your estimate is calculated with our detailed breakdown of construction, materials, and contingency costs.
              </p>
            </div>
            
            <div className="p-8 bg-gray-50 rounded-2xl">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Next Steps</h3>
              <p className="text-gray-600">
                Use your estimate to discuss with our team. We'll refine it based on exact specifications and provide a formal quote.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-12 bg-gradient-to-r from-gray-900 to-black text-white rounded-3xl">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-6">
              Ready for an Exact Quote?
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10">
              Our detailed calculator gives you a realistic range. Contact us for a precise quote tailored to your exact requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 bg-red-600 text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Schedule a Call
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/30 text-white px-10 py-5 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-colors"
              >
                View Our Projects
              </Link>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-16 max-w-3xl mx-auto">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-center mb-10">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-white border-2 border-gray-200 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-3">How accurate is this estimate?</h4>
                <p className="text-gray-600">
                  Our calculator provides a realistic range (±10%) based on current Addis Ababa market rates. For an exact quote, we'll need to visit your space and discuss specific requirements.
                </p>
              </div>
              <div className="p-6 bg-white border-2 border-gray-200 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-3">What's included in the estimate?</h4>
                <p className="text-gray-600">
                  The estimate includes design, materials, labor, project management, and a 15% contingency for unexpected expenses. It doesn't include VAT or special permits.
                </p>
              </div>
              <div className="p-6 bg-white border-2 border-gray-200 rounded-2xl">
                <h4 className="font-bold text-gray-900 mb-3">Can I update the prices?</h4>
                <p className="text-gray-600">
                  Yes! We regularly update our pricing database. If you notice any discrepancies, please contact us and we'll adjust the calculator accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* ADD FOOTER */}
      <Footer />
    </>
  );
}