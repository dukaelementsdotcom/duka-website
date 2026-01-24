// app/components/ClientLogosCarousel.tsx

'use client';

import { useState, useEffect } from 'react';

export default function ClientLogosCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const logos = [
    { name: "ABH Partners", src: "/images/duka-interiors-client-logos/abh-partners-duka-interiors.svg" },
    { name: "Tajir Real Estate", src: "/images/duka-interiors-client-logos/tajir-real-estate-duka-interiors.svg" },
    { name: "Africa Jobs", src: "/images/duka-interiors-client-logos/africa-jobs-duka-interiors-01.svg" },
    { name: "Afro Sweden", src: "/images/duka-interiors-client-logos/afro-sweden-duka-interiors.svg" },
    { name: "Alta Computec", src: "/images/duka-interiors-client-logos/alta-computec-duka-interiors.svg" },
    { name: "Awash Wine", src: "/images/duka-interiors-client-logos/awash-wine-duka-interiors.svg" },
    { name: "Axum Metals", src: "/images/duka-interiors-client-logos/axum-metals-duka-interiors.svg" },
    { name: "Besh Gebeya", src: "/images/duka-interiors-client-logos/besh-gebeya-duka-interiors.svg" },
    { name: "Dereja Academy", src: "/images/duka-interiors-client-logos/dereja-academy-duka-interiors.svg" },
    { name: "Ethio Jobs", src: "/images/duka-interiors-client-logos/ethio-jobs-duka-interiors.svg" },
    { name: "Geneva Global", src: "/images/duka-interiors-client-logos/geneva-global-duka-interiors.svg" },
    { name: "GoFigure Fitness", src: "/images/duka-interiors-client-logos/gofigure-fitness-duka-interiors.svg" },
    { name: "Habesha Breweries", src: "/images/duka-interiors-client-logos/habesha-breweries-duka-interiors.svg" },
    { name: "Habesha Cement", src: "/images/duka-interiors-client-logos/habesha-cement-duka-interiors.svg" },
    { name: "Kifiya Financial", src: "/images/duka-interiors-client-logos/kifiya-financial-duka-interiors.svg" },
    { name: "Marubeni", src: "/images/duka-interiors-client-logos/marubeni-duka-interiors.svg" },
    { name: "Precise Consult", src: "/images/duka-interiors-client-logos/precise-consult-duka-interiors.svg" },
    { name: "Prime Media", src: "/images/duka-interiors-client-logos/prime-media-duka-interiors.svg" },
    { name: "Qatar Airways", src: "/images/duka-interiors-client-logos/qatar-airways-duka-interiors.svg" },
    { name: "Ries Engineering", src: "/images/duka-interiors-client-logos/ries-engineering-duka-interiors.svg" },
    { name: "Schneider Electric", src: "/images/duka-interiors-client-logos/schneider-electric-duka-interiors.svg" },
    { name: "Sunpeak", src: "/images/duka-interiors-client-logos/sunpeak-duka-interiors.svg" }
  ];

  // Create 3 slides: 8 logos each
  const slides = [
    logos.slice(0, 8),   // Slide 1: 1–8
    logos.slice(8, 16),  // Slide 2: 9–16
    [...logos.slice(16, 22), logos[0], logos[1]] // Slide 3: 17–22 + ABH + Tajir
  ];

  // Auto-advance every 5 seconds (unless paused)
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  const prev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const next = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-[90vw] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wide rounded-none border-b-2 border-red-600">
            OUR CLIENTS
          </div>
        </div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Left Button */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-colors duration-300 z-10 rounded-full"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>

          {/* Right Button */}
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white flex items-center justify-center hover:bg-opacity-70 transition-colors duration-300 z-10 rounded-full"
          >
            <i className="fas fa-chevron-right text-sm"></i>
          </button>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 justify-items-center">
            {slides[currentSlide].map((logo, index) => (
              <div
                key={index}
                className="group flex items-center justify-center h-32 w-full transition-all duration-300"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                  index === currentSlide ? 'bg-red-600' : 'bg-gray-300 hover:bg-gray-500'
                }`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}