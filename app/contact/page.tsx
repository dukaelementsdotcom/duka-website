"use client";

import { useState } from 'react';
import Navbar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      // Points to your internal API route
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  }

  return (
    <>
      <Navbar />
      
      <main className="bg-white">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight text-gray-900 mb-6">
                Let’s Build Your <span className="text-red-600">Precision Workspace</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                We respond to all inquiries within 24 hours. For urgent requests, message us directly on Telegram.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              
              {/* Left: Contact Info */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Direct Channels</h2>
                  
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                          <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900">Email</h3>
                        <a href="mailto:contact@dukainteriors.com" className="text-gray-600 hover:text-red-600 transition-colors">
                          contact@dukainteriors.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293 .97c-.135.101-.164.249-.126.352a11.288 11.288 0 0 0 6.691 6.691c.103.038.251.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.819V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900">Phone</h3>
                        <div className="text-gray-600 space-y-1">
                          <div><a href="tel:+251940607055" className="hover:text-red-600 transition-colors">+251 940 607 055</a></div>
                          <div><a href="tel:+251929144290" className="hover:text-red-600 transition-colors">+251 929 144 290</a></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-red-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm2.394 13.394a1 1 0 0 1-1.414 0L12 14.414l-.98.98a1 1 0 1 1-1.414-1.414l.98-.98a1 1 0 0 1 1.414 0l.98.98a1 1 0 0 1 0 1.414Z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-900">Telegram</h3>
                        <a href="https://t.me/dukainteriorsplc" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors">
                          @dukainteriorsplc
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-sm overflow-hidden border border-gray-200">
                  <div className="bg-gray-100 p-3">
                    <h3 className="font-bold text-gray-900 text-sm">Our Bole Office</h3>
                  </div>
                  <div className="aspect-video w-full bg-gray-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5471!2d38.78!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDAuMCJOIDM4wrA0Nic0OC4wIkU!5e0!3m2!1sen!2set!4v1620000000000!5m2!1sen!2set"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      title="Duka Interiors Location"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Right: Contact Form */}
              <div className="bg-gray-50 p-8 md:p-12 rounded-sm border border-gray-200 shadow-sm">
                <h2 className="text-2xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Send a Message</h2>
                
                {status === "success" ? (
                  <div className="py-12 text-center">
                    <div className="bg-green-100 text-green-800 p-4 rounded-sm mb-6 font-bold">
                      Message Sent Successfully!
                    </div>
                    <p className="text-gray-600 mb-6">Thank you for reaching out. Our technical team will review your inquiry and respond within 24 hours.</p>
                    <button 
                      onClick={() => setStatus("idle")}
                      className="text-red-600 font-bold uppercase text-sm border-b-2 border-red-600"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-sm outline-none transition bg-white"
                        placeholder="e.g. Abebe Kebede"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-sm outline-none transition bg-white"
                        placeholder="contact@company.et"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-sm outline-none transition bg-white"
                        placeholder="+251 ..."
                      />
                    </div>

                    <div>
                      <label htmlFor="project-type" className="block text-sm font-bold text-gray-900 mb-2">Project Type</label>
                      <select
                        id="project-type"
                        name="project-type"
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-sm outline-none transition bg-white"
                      >
                        <option value="">Select one</option>
                        <option value="office-fitout">Office Fit-Out</option>
                        <option value="furniture-systems">Custom Furniture Systems</option>
                        <option value="spatial-planning">Spatial Planning</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-transparent rounded-sm outline-none transition bg-white"
                        placeholder="Details about your project..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className={`w-full bg-black text-white px-6 py-4 font-black uppercase tracking-widest text-sm transition-all shadow-lg ${status === "sending" ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600 active:scale-95"}`}
                    >
                      {status === "sending" ? "Sending..." : "Send Inquiry →"}
                    </button>

                    {status === "error" && (
                      <p className="text-red-600 text-sm font-bold">Something went wrong. Please try again or contact us via Telegram.</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter">
              Precision Starts With a Conversation.
            </h2>
            <a 
              href="https://t.me/dukainteriorsplc" 
              className="inline-block bg-white text-gray-900 px-12 py-5 font-black uppercase tracking-widest text-sm hover:bg-gray-100 transition-colors"
            >
              Message Us on Telegram →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}