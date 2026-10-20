// app/components/AnimatedStat.tsx
'use client';

import { useEffect, useRef } from 'react';

/**
 * Renders the real number in the server HTML (so search engines and
 * no-JS visitors see it), then counts up from 0 once the stat scrolls
 * into view. The "+" sign is rendered by the parent.
 */
export default function AnimatedStat({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const run = () => {
      const duration = 1600;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * eased));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {target}
    </span>
  );
}
