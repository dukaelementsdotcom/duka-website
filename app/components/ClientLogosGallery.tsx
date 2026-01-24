// app/components/ClientLogosCarousel.tsx

'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ClientLogosCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);

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

  // Auto-scroll effect
  useEffect(() => {
    if (isAutoScrollPaused) return;

    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 1; // pixels per frame
    let animationId: number;

    const scroll = () => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 1) {
        scrollContainer.scrollLeft = 0; // Loop back to start
      } else {
        scrollContainer.scrollLeft += scrollSpeed;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isAutoScrollPaused]);

  const handleScroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    // Pause auto-scroll for 3 seconds
    setIsAutoScrollPaused(true);
    setTimeout(() => setIsAutoScrollPaused(false), 3000);

    // Perform scroll
    if (direction === 'left') {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-[90vw] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-2 bg-black text-white text-xs font-bold uppercase tracking-wide rounded-none border-b-2 border-red-600">
            OUR CLIENTS
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Trusted by Ethiopia’s Leading Brands
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            From startups to industry leaders, we’ve helped shape spaces that reflect vision and values.
          </p>
        </div>

        {/* Carousel Container */}
        
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => handleScroll('left')}
            aria-label="Previous logos"
            className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white flex items-center justify-center z-10 hover:bg-opacity-70 transition-all duration-300"
          >
            <i className="fas fa-chevron-left text-sm"></i>
          </button>

          {/* Scrollable Row */}
          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-hidden px-12 py-6"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Duplicate logos for seamless loop */}
            {[...logos, ...logos].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-32 sm:w-56 sm:h-36 lg:w-64 lg:h-40"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => handleScroll('right')}
            aria-label="Next logos"
            className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white flex items-center justify-center z-10 hover:bg-opacity-70 transition-all duration-300"
          >
            <i className="fas fa-chevron-right text-sm"></i>
          </button>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/clients"
            className="px-8 py-3 border-2 border-gray-300 text-gray-900 font-bold text-sm uppercase tracking-wide rounded-none hover:bg-gray-100 transition-colors duration-300 min-w-[180px]"
          >
            View All Clients
          </Link>
        </div>
      </div>
    </section>
  );
}