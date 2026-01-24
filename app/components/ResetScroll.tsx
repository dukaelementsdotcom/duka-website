// app/components/ResetScroll.tsx

'use client';

import { useEffect } from 'react';

export default function ResetScroll() {
  useEffect(() => {
    // Disable scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Always scroll to top on load
    window.scrollTo(0, 0);
  }, []);

  return null;
}