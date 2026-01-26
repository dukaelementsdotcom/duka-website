"use client";

import { useState } from 'react';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

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
              Get in <span className="text-red-600">Touch.</span>
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

              {/* Updated Studio Section */}
              <div>
                {/* Replaced text with image */}
                <img 
                  src="/images/studio-logo.png" 
                  alt="Duka Interiors Studio Location" 
                  className="w-16 h-16 object-contain mb-4"
                />
                {/* Clickable address with Google Maps link */}
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Djibouti+street,+Welela+building,+5th+floor,+suite+507,+Addis+Ababa,+Ethiopia" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-medium leading-snug hover:text-red-600 transition-colors block"
                >
                  Djibouti street, Welela building, 5th floor, suite 507,<br />
                  Addis Ababa, Ethiopia
                </a>
              </div>
            </div>

            {/* Social Icons Sidebar Style */}
            <div className="flex gap-6 pt-12">
              {['fab fa-whatsapp', 'fab fa-telegram', 'fab fa-instagram', 'fab fa-linkedin'].map((icon) => (
                <i key={icon} className={`${icon} text-xl text-gray-300 hover:text-black transition-colors cursor-pointer`}></i>
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
                {/* ... [form remains unchanged] ... */}
              </form>
            )}
          </div>
        </section>

        {/* --- MAP SECTION START (FIXED) --- */}
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
        {/* --- MAP SECTION END --- */}

      </main>

      <Footer />
    </>
  );
}