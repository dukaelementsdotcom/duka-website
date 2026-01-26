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
        // This helps us see the actual error from Resend
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
      <main className="bg-white min-h-screen pt-20">
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Info Column */}
            <div className="space-y-8">
              <h1 className="text-5xl font-black uppercase tracking-tighter">Let's Build.</h1>
              <p className="text-gray-600 text-lg">Send us your project details and we'll get back to you within 24 hours.</p>
              <div className="pt-4 space-y-4">
                <p className="font-bold">contact@dukainteriors.com</p>
                <p className="font-bold">+251 940 607 055</p>
              </div>
            </div>

            {/* Form Column */}
            <div className="bg-gray-50 p-8 border border-gray-200">
              {status === "success" ? (
                <div className="text-center py-10">
                  <h2 className="text-2xl font-bold text-green-600 mb-2">Message Sent!</h2>
                  <p>We will contact you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="mt-4 text-red-600 font-bold underline">Send another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input name="name" placeholder="Full Name" required className="w-full p-3 border border-gray-300 outline-none focus:border-red-600" />
                  <input name="email" type="email" placeholder="Email Address" required className="w-full p-3 border border-gray-300 outline-none focus:border-red-600" />
                  <input name="phone" placeholder="Phone Number" className="w-full p-3 border border-gray-300 outline-none focus:border-red-600" />
                  <select name="project-type" required className="w-full p-3 border border-gray-300 outline-none focus:border-red-600">
                    <option value="">Select Project Type</option>
                    <option value="office">Office Fit-out</option>
                    <option value="residential">Residential Design</option>
                    <option value="furniture">Custom Furniture</option>
                  </select>
                  <textarea name="message" placeholder="Project Details" rows={4} required className="w-full p-3 border border-gray-300 outline-none focus:border-red-600"></textarea>
                  
                  <button 
                    disabled={status === "sending"}
                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-red-600 transition-colors"
                  >
                    {status === "sending" ? "Sending..." : "Send Inquiry"}
                  </button>

                  {status === "error" && (
                    <div className="bg-red-50 p-3 border border-red-200 text-red-600 text-sm font-bold">
                      Error: {errorMessage}
                    </div>
                  )}
                </form>
              )}
            </div>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}