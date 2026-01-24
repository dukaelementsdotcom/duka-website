// app/components/AnimatedStat.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedStat({ target }: { target: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stat = ref.current;
    if (!stat) return;

    let current = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // ~60fps

    const updateCount = () => {
      current += increment;
      if (current >= target) {
        stat.textContent = target + '+';
        return;
      }
      stat.textContent = Math.floor(current) + '+';
      requestAnimationFrame(updateCount);
    };

    updateCount();
  }, [target]);

  return (
    <div
      ref={ref}
      className="text-3xl md:text-4xl font-bold text-red-600"
      aria-live="polite"
    >
      0+
    </div>
  );
}