import React, { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';

export const lenisRef = { current: null as Lenis | null };

export const useLenisScroll = () => {
  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector(target) as HTMLElement | null;
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    }
  }, []);
  return { scrollTo };
};

export const LenisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRefInternal = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      syncTouch: true,
      syncTouchLerp: 0.1,
    });

    lenisRefInternal.current = lenis;
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};
