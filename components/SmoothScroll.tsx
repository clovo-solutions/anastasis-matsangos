'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionConfig } from 'framer-motion';
import { useReducedMotion } from '@/lib/hooks';

/**
 * Lenis, wired into GSAP's ticker so smooth scroll and ScrollTrigger share a
 * single RAF loop. Two independent loops is the classic cause of scroll jitter
 * on sites like this.
 *
 * Skipped wholesale under prefers-reduced-motion: hijacking scroll is exactly
 * what that setting is asking us not to do.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (reduced) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // In-page anchors must go through Lenis or they jump.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href^="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: 0, duration: 1.4 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, [reduced]);

  /**
   * `reducedMotion="user"` is the global backstop: Framer drops transform and
   * layout animations when the OS asks for reduced motion, but still allows
   * opacity, so content fades in rather than flying. Components that build
   * their own timelines still check the setting themselves — this catches the
   * ordinary `initial`/`whileInView` pairs without each one restating the rule.
   */
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
