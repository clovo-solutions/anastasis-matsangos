'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import {
  TRACED_VIEWBOX,
  TRACED_LEFT,
  TRACED_RIGHT,
  TRACED_LEFT_TRANSFORM,
  TRACED_RIGHT_TRANSFORM,
  TRACED_LEFT_COLOR,
  TRACED_RIGHT_COLOR,
} from '@/lib/logoTraced';
import { useReducedMotion } from '@/lib/hooks';

type Props = {
  className?: string;
  /** Per-half colour — the mark is always two-tone. Defaults to the traced brand colours. */
  leftColor?: string;
  rightColor?: string;
  title?: string;
};

/**
 * AnimatedLogoMark.
 *
 * The hero's exact mark and load sequence, moved onto the nav: the two halves
 * converge onto the centre line, the outline is line-drawn, then it fills solid
 * and the outline drops. Plays once on mount; the end state is the plain solid
 * mark. Colours are props so the nav can invert over dark sections.
 *
 * Under prefers-reduced-motion the solid mark is shown immediately.
 */
export function AnimatedLogoMark({
  className,
  leftColor = TRACED_LEFT_COLOR,
  rightColor = TRACED_RIGHT_COLOR,
  title,
}: Props) {
  const root = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      const strokes = gsap.utils.toArray<SVGPathElement>('.nav-logo-stroke');
      const fills = gsap.utils.toArray<SVGPathElement>('.nav-logo-fill');

      // Prime the line-draw.
      strokes.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
      });
      gsap.set(fills, { opacity: 0 });
      gsap.set('.nav-logo-l', { xPercent: -14, opacity: 0 });
      gsap.set('.nav-logo-r', { xPercent: 14, opacity: 0 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' }, delay: 0.35 })
        .to(['.nav-logo-l', '.nav-logo-r'], {
          xPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power4.inOut',
        })
        // Draw the outline.
        .to(strokes, { strokeDashoffset: 0, duration: 1.2, stagger: 0.08 }, '-=0.75')
        // Outline → solid.
        .to(fills, { opacity: 1, duration: 0.6, stagger: 0.06 }, '-=0.35')
        .to(strokes, { opacity: 0, duration: 0.4 }, '<');
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <svg
      ref={root}
      viewBox={TRACED_VIEWBOX}
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}

      <g className="nav-logo-l" transform={TRACED_LEFT_TRANSFORM}>
        <path d={TRACED_LEFT} className="nav-logo-fill" fill={leftColor} />
        <path
          d={TRACED_LEFT}
          className="nav-logo-stroke"
          fill="none"
          stroke={leftColor}
          strokeWidth="10"
          opacity="0"
        />
      </g>
      <g className="nav-logo-r" transform={TRACED_RIGHT_TRANSFORM}>
        <path d={TRACED_RIGHT} className="nav-logo-fill" fill={rightColor} />
        <path
          d={TRACED_RIGHT}
          className="nav-logo-stroke"
          fill="none"
          stroke={rightColor}
          strokeWidth="10"
          opacity="0"
        />
      </g>
    </svg>
  );
}
