'use client';

import { useState, useEffect } from 'react';

export default function PremiumTestimonialCharcoal() {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Sector-based testimonials for professional anonymity
  const testimonials = [
    {
      quote: "Duka Interiors transformed our headquarters into a space that inspires creativity every day. Their technical precision and aesthetic discipline are truly unmatched in the market.",
      author: "Chief Executive Officer",
      role: "Logistics & Supply Chain Sector"
    },
    {
      quote: "They translated our brand vision into physical reality. Every detail was considered, and every material chosen with purpose. A seamless, professional experience.",
      author: "Managing Director",
      role: "Commercial Real Estate Firm"
    },
    {
      quote: "The technical execution of our office fit-out was flawless. They managed to balance modern design with functional efficiency, delivering exactly what our team needed.",
      author: "Operations Director",
      role: "International NGO"
    },
    {
      quote: "From initial spatial planning to the final custom furniture installation, the process was handled with absolute precision. They are the gold standard for workspace design.",
      author: "Project Lead",
      role: "Tech Innovation Hub"
    }
  ];

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [isHovered, testimonials.length]);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const currentTestimonial = testimonials[current];

  return (
    <section 
      className="py-24 px-4 relative overflow-hidden bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle Background Quote Icon */}
      <div className="absolute top-0 left-10 opacity-5 pointer-events-none select-none">
        <span className="text-[20rem] font-serif text-white">"</span>
      </div>

      <div className="max-w-[90vw] mx-auto relative z-10">
        <blockquote className="text-center max-w-4xl mx-auto min-h-[280px] flex flex-col justify-center">
          <p className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed italic mb-10 px-6 md:px-12">
            "{currentTestimonial.quote}"
          </p>
          <div className="space-y-2">
            <footer className="font-bold text-white text-lg uppercase tracking-widest">
              {currentTestimonial.author}
            </footer>
            <div className="text-sm text-red-500 font-black uppercase tracking-tighter drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]">
              {currentTestimonial.role}
            </div>
          </div>
        </blockquote>

        {/* Navigation Arrows */}
        <div className="flex justify-center mt-12 space-x-8">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-red-600 hover:border-red-600 transition-all group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Minimal Progress Bar Indicators */}
        <div className="flex justify-center mt-10 space-x-3" role="tablist" aria-label="Testimonial navigation">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to testimonial ${index + 1} of ${testimonials.length}`}
              aria-selected={index === current}
              role="tab"
              className={`h-1 transition-all duration-500 rounded-full ${
                index === current ? 'bg-red-600 w-10' : 'bg-gray-700 w-4'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}