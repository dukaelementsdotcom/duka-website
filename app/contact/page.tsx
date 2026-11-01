"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { CONTACT, whatsappLink } from '@/lib/siteConfig';

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");



  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Submission failed");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Check your internet connection.");
    }
  }

  return (
    <>
      <Navbar />
      
      <main className="bg-white min-h-screen">
        {/* Header Hero */}
        <div className="pt-32 pb-12 px-6 md:px-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
              Get in <span className="text-red-600">Touch</span>
            </h1>
            <p className="text-gray-400 font-medium tracking-[0.2em] uppercase text-xs">
              07 — Contact Us
            </p>
          </div>
        </div>

        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[70vh]">
          
          {/* Left Side: Contact Information (4 Columns) */}
          <div className="lg:col-span-4 p-6 md:p-12 border-r border-gray-100 flex flex-col justify-between space-y-12">
            <div className="space-y-10">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">General Inquiries</h3>
                <a href="mailto:contact@dukainteriors.com" className="text-xl font-bold hover:text-red-600 transition-colors block underline underline-offset-8 decoration-1">
                  contact@dukainteriors.com
                </a>
              </div>

              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Direct Line</h3>
                <div className="space-y-2">
                  <a href="tel:+251940607055" className="text-xl font-bold block hover:text-red-600 transition-colors">+251 940 607 055</a>
                  <a href="tel:+251929144290" className="text-xl font-bold block hover:text-red-600 transition-colors">+251 929 144 290</a>
                </div>
              </div>

              {/* ✅ FIXED: Removed trailing spaces in Google Maps URL */}
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-6">Visit Our Studio</h3>
                <a 
                  href="https://maps.app.goo.gl/FNBrMacYUefLEH7k8" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium leading-snug hover:text-red-600 transition-colors block"
                >
                  Djibouti street, Welela building, 5th floor, suite 507,<br />
                  Addis Ababa, Ethiopia
                </a>
              </div>
            </div>

            {/* ✅ FIXED: Removed ALL trailing spaces in social URLs */}
            <div className="flex gap-6 pt-12">
              {[
                { icon: 'fab fa-whatsapp', href: 'https://wa.me/251940607055' },
                { icon: 'fab fa-telegram', href: 'https://t.me/dukainteriorsplc' },
                { icon: 'fab fa-instagram', href: 'https://www.instagram.com/dukainteriors' },
                { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/company/duka-interiors' }
              ].map((social) => (
                <a 
                  key={social.icon} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xl text-gray-300 hover:text-black transition-colors"
                  aria-label={`Contact us on ${social.icon.split(' ')[1]}`}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: The Form (8 Columns) */}
          <div className="lg:col-span-8 p-6 md:p-12 bg-gray-50/50">
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-3xl">
                  ✓
                </div>
                <h2 className="text-4xl font-black uppercase tracking-tighter">Inquiry Received</h2>
                <p className="text-gray-500 max-w-sm">Our design team has been notified. We will reach out within one business day.</p>
                <button 
                  onClick={() => setStatus("idle")} 
                  className="px-10 py-4 border border-black font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-3xl space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Full Name</label>
                    <input 
                      name="name" 
                      required 
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-all font-medium text-lg" 
                      placeholder="e.g. Dagmawi Tilahun"
                    />
                  </div>
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Email Address</label>
                    <input 
                      name="email" 
                      type="email" 
                      required 
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-all font-medium text-lg" 
                      placeholder="name@domain.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Phone Number</label>
                    <input 
                      name="phone" 
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-all font-medium text-lg" 
                      placeholder="+251 --- --- ---"
                    />
                  </div>
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Project Type</label>
                    <select 
                      name="project-type" 
                      required 
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-all font-medium text-lg appearance-none cursor-pointer"
                    >
                      <option value="">Select Service</option>
                      <option value="Office Fit-out">Office Fit-out</option>
                      <option value="Office Partitioning">Office Partitioning</option>
                      <option value="Renovation">Renovation</option>
                      <option value="Residential Design">Residential Design</option>
                      <option value="Custom Furniture">Custom Furniture</option>
                      <option value="Branding & Signage">Branding & Signage</option>
                      <option value="Technology">Technology (lighting, network, AV)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Area (m²)</label>
                    <input
                      name="area"
                      type="number"
                      min="1"
                      inputMode="numeric"
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-all font-medium text-lg"
                      placeholder="e.g. 250"
                    />
                  </div>
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Budget (ETB)</label>
                    <select
                      name="budget"
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-all font-medium text-lg appearance-none cursor-pointer"
                    >
                      <option value="">Select range</option>
                      <option value="Under 500,000 ETB">Under 500,000</option>
                      <option value="500,000 – 1,000,000 ETB">500,000 – 1M</option>
                      <option value="1M – 3M ETB">1M – 3M</option>
                      <option value="3M – 10M ETB">3M – 10M</option>
                      <option value="Over 10M ETB">Over 10M</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                  </div>
                  <div className="relative group">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Timeline</label>
                    <select
                      name="timeline"
                      className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-all font-medium text-lg appearance-none cursor-pointer"
                    >
                      <option value="">When to start?</option>
                      <option value="As soon as possible">As soon as possible</option>
                      <option value="Within 1–3 months">Within 1–3 months</option>
                      <option value="In 3–6 months">In 3–6 months</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </div>
                </div>

                <div className="relative group">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-focus-within:text-red-600 transition-colors">Project Brief</label>
                  <textarea 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full bg-transparent border-b border-gray-300 py-3 outline-none focus:border-black transition-all font-medium text-lg resize-none" 
                    placeholder="Tell us about your space..."
                  ></textarea>
                </div>

                <div className="pt-6">
                  <button 
                    disabled={status === "sending"}
                    className="group relative overflow-hidden bg-black text-white px-12 py-5 font-black uppercase tracking-widest text-xs transition-all flex items-center gap-4"
                  >
                    <span className="relative z-10">
                      {status === "sending" ? "Processing..." : "Submit Inquiry"}
                    </span>
                    <span className="text-xl group-hover:translate-x-2 transition-transform">→</span>
                    <div className="absolute inset-0 bg-red-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </button>
                </div>

                {status === "error" && (
                  <div role="alert" className="p-4 bg-red-50 text-red-700 text-sm border border-red-100 space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-widest">Your message could not be sent ({errorMessage})</p>
                    <p>
                      Please reach us directly on{' '}
                      <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="font-bold underline">WhatsApp</a>,
                      call <a href={`tel:${CONTACT.phones[0].number}`} className="font-bold underline">{CONTACT.phones[0].label}</a>,
                      or email <a href={`mailto:${CONTACT.email}`} className="font-bold underline">{CONTACT.email}</a>.
                    </p>
                  </div>
                )}
              </form>
            )}
          </div>
        </section>

        {/* ✅ FIXED: Removed space after pb= in Google Maps URL */}
        <section className="w-full h-[450px] border-t border-gray-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.694146403223!2d38.783185449027535!3d9.00026526647423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b853122071a1d%3A0x9a618cb0a0a76b04!2sDuka%20Interiors%20P.L.C!5e0!3m2!1sen!2set!4v1769465498662!5m2!1sen!2set" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </main>

      <Footer />
    </>
  );
}