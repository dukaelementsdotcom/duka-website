// app/components/FinalCTA.tsx

'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FinalCTA() {
  return (
    <section className="w-full bg-black text-white py-12">
      <div className="max-w-[80vw] lg:max-w-6xl mx-auto px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl font-light mb-4">
          Let’s Build Something <span className="font-bold">Exceptional</span> Together
        </h2>
        <p className="text-gray-300 text-sm md:text-base mb-8 max-w-lg mx-auto">
          From concept to completion, we deliver spaces that reflect your vision, elevate your brand, and inspire performance.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 whitespace-nowrap">
          <Link
            href="/contact"
            className="px-8 py-3 bg-red-600 text-white font-bold text-sm uppercase tracking-wide rounded-none hover:bg-red-700 transition-colors duration-300 min-w-[180px]"
          >
            Start Your Project
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 border-2 border-gray-400 text-white font-bold text-sm uppercase tracking-wide rounded-none hover:border-white transition-colors duration-300 min-w-[180px]"
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}