// app/terms-of-service/page.tsx

import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="py-20 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-700 mb-6">
          By accessing or using Duka Interiors’ website and services, you agree to be bound by these Terms of Service. If you do not agree, please do not use our site or services.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Services</h2>
        <p className="text-gray-700 mb-6">
          Duka Interiors provides interior design and construction services. All projects are subject to written agreements outlining scope, timeline, and cost.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Pricing & Payment</h2>
        <p className="text-gray-700 mb-6">
          All pricing is fixed and transparent. Payment terms are outlined in your contract. Late payments may incur fees.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
        <p className="text-gray-700 mb-6">
          All designs, drawings, and concepts created by Duka Interiors are our intellectual property until final payment is received.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Limitation of Liability</h2>
        <p className="text-gray-700 mb-6">
          Duka Interiors is not liable for any indirect, incidental, or consequential damages arising from your use of our services.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Governing Law</h2>
        <p className="text-gray-700 mb-6">
          These terms are governed by the laws of Ethiopia. Any disputes will be resolved in Addis Ababa courts.
        </p>
        <p className="text-gray-700">
          For questions about these Terms, please contact us at <a href="mailto:welcome@dukainteriors.com" className="text-red-600 hover:text-red-700">welcome@dukainteriors.com</a>.
        </p>
      </main>
      <Footer />
    </div>
  );
}