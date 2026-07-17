import type { Variants, Transition } from 'framer-motion';

/**
 * Shared motion vocabulary.
 *
 * Two curves only — a cinematic ease-out for reveals, a spring for anything
 * that tracks the cursor. Consistency is what separates "designed" from
 * "decorated": if a fifth easing curve is tempting, the section is wrong.
 */

export const EASE = [0.16, 1, 0.3, 1] as const;

export const springy: Transition = { type: 'spring', stiffness: 140, damping: 20, mass: 0.6 };

/** Mask reveal — the default entrance. Clips upward from beneath a hard edge. */
export const maskReveal: Variants = {
  hidden: { y: '110%' },
  show: (i = 0) => ({
    y: '0%',
    transition: { duration: 0.9, ease: EASE, delay: i * 0.06 },
  }),
};

/** Container that staggers masked children. */
export const staggerLines: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/** clip-path wipe for imagery. GPU-friendly: no layout, no paint thrash. */
export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 0 100% 0)' },
  show: {
    clipPath: 'inset(0 0 0% 0)',
    transition: { duration: 1.1, ease: EASE },
  },
};

/** Scale-in for figures and diagrams. */
export const scaleIn: Variants = {
  hidden: { scale: 1.12, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 1.2, ease: EASE } },
};

/** Angular slide, derived from the logo's diagonal. */
export const diagonalIn: Variants = {
  hidden: { x: -24, y: 24, opacity: 0 },
  show: { x: 0, y: 0, opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' } as const;
