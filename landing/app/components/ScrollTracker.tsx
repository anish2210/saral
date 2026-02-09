'use client';

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from '../lib/gtm';

const THRESHOLDS = [25, 50, 75, 100];

export default function ScrollTracker() {
  const firedRef = useRef(new Set<number>());

  useEffect(() => {
    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const percentage = Math.round((window.scrollY / scrollHeight) * 100);

      for (const threshold of THRESHOLDS) {
        if (percentage >= threshold && !firedRef.current.has(threshold)) {
          firedRef.current.add(threshold);
          trackScrollDepth(threshold);
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
