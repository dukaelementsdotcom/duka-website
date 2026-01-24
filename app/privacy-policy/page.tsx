// app/privacy-policy/page.tsx

import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      <NavBar />
      <main className="py-20 px-4 md:px-8 lg:px-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-6">
          At Duka Interiors, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website or engage with our services.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Information We Collect</h2>
        <p className="text-gray-700 mb-6">
          We may collect personal information such as your name, email address, phone number, and project details when you contact us or request a consultation.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">How We Use Your Information</h2>
        <p className="text-gray-700 mb-6">
          Your information is used to respond to your inquiries, provide services, and improve our offerings. We do not sell or share your data with third parties without your consent.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
        <p className="text-gray-700 mb-6">
          We implement industry-standard security measures to protect your data from unauthorized access or disclosure.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
        <p className="text-gray-700 mb-6">
          We may update this policy from time to time. Any changes will be posted on this page with an updated effective date.
        </p>
        <p className="text-gray-700">
          For questions about this Privacy Policy, please contact us at <a href="mailto:welcome@dukainteriors.com" className="text-red-600 hover:text-red-700">welcome@dukainteriors.com</a>.
        </p>
      </main>
      <Footer />
    </div>
  );
}