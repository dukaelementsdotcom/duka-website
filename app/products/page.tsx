'use client';

import { useEffect } from 'react';
import ComingSoon from '@/app/components/ComingSoon';

export default function ProductsPage() {
  // ✅ CLIENT-SIDE TITLE UPDATE (SEO-optimized)
  useEffect(() => {
    document.title = "Office Furniture & Interior Products Addis Ababa | Duka Interiors";
    return () => { document.title = "Duka Interiors"; };
  }, []);

  // ✅ CRITICAL FIX: Inject canonical URL (prevents duplicate content for new page)
  useEffect(() => {
    const existing = document.querySelector('link[rel="canonical"]');
    if (existing) existing.remove();
    
    const canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    canonicalLink.href = 'https://www.dukainteriors.com/products';
    document.head.appendChild(canonicalLink);
    
    return () => { canonicalLink.remove(); };
  }, []);

  return (
    <ComingSoon 
      title="Office Furniture & Interior Products in Addis Ababa" 
      caption="We're developing exclusive, high-quality office furniture and interior products — designed for Addis Ababa's modern workplaces."
    />
  );
}