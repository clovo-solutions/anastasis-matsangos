'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useReducedMotion } from '@/lib/hooks';

/**
 * SpineDial.
 *
 * Blueprint spine for the hero — lateral view, hairline strokes, no fills.
 * Same drawing language as the goniometer dial: currentColor, 0.3–0.5
 * stroke weights, geometry generated rather than traced.
 *
 * The loop is the practice's subject matter: the column draws itself in
 * (assessment), then a gentle flex wave travels down the vertebrae forever
 * (mobility), while goniometer guides turn at the dial's 90s pace
 * (measurement). Under prefers-reduced-motion the static drawn column is
 * the design, not a fallback.
 */

const round = (n: number) => Math.round(n * 100) / 100;

const CENTER_X = 40;
const TOP = 14;

/** cervical / thoracic / lumbar — count, body width, body height, disc gap */
const SEGMENTS = [
  { count: 7, w: 7, h: 3.4, gap: 1.2 },
  { count: 12, w: 9.5, h: 4.4, gap: 1.6 },
  { count: 5, w: 12.5, h: 5.8, gap: 2 },
];

const COLUMN_H = SEGMENTS.reduce((s, g) => s + g.count * (g.h + g.gap), 0);

/** Lateral S-curve: cervical lordosis → thoracic kyphosis → lumbar lordosis. */
function curveX(u: number): number {
  return CENTER_X - 6 * Math.cos(((u - 0.14) * Math.PI * 2) / 0.72);
}

type Vertebra = { x: number; y: number; a: number; w: number; h: number };

function buildColumn(): { verts: Vertebra[]; sacrumY: number } {
  const verts: Vertebra[] = [];
  let y = TOP;
  for (const seg of SEGMENTS) {
    for (let i = 0; i < seg.count; i++) {
      const cy = y + seg.h / 2;
      const u = (cy - TOP) / COLUMN_H;
      // Tilt each body to the local tangent of the curve.
      const e = 0.01;
      const dx = curveX(u + e) - curveX(u - e);
      const a = Math.atan2(dx, e * 2 * COLUMN_H) * (180 / Math.PI);
      verts.push({ x: round(curveX(u)), y: round(cy), a: round(a), w: seg.w, h: seg.h });
      y += seg.h + seg.gap;
    }
  }
  return { verts, sacrumY: round(y) };
}

/** Goniometer tick ring centred on the local origin. */
function guideTicks(ticks: number, r: number, len: number): string {
  const step = (Math.PI * 2) / ticks;
  let d = '';
  for (let i = 0; i < ticks; i++) {
    const a = i * step - Math.PI / 2;
    const inner = r - (i % 6 === 0 ? len : len * 0.5);
    const p = (rad: number) => `${round(Math.cos(a) * rad)} ${round(Math.sin(a) * rad)}`;
    d += `M ${p(inner)} L ${p(r)} `;
  }
  return d.trim();
}

/** Ruler ticks along a vertical rail, longer every fifth. */
function rulerTicks(x: number, top: number, bottom: number, step: number, len: number): string {
  let d = '';
  for (let y = top, i = 0; y <= bottom; y += step, i++) {
    const l = i % 5 === 0 ? len : len * 0.55;
    d += `M ${x} ${round(y)} L ${round(x - l)} ${round(y)} `;
  }
  return d.trim();
}

const { verts, sacrumY } = buildColumn();
const last = verts[verts.length - 1];

/** Measurement guides sit on C4, T7 and L3. */
const GUIDES = [
  { vi: 3, r: 7 },
  { vi: 13, r: 10 },
  { vi: 21, r: 9 },
];

export function SpineDial({ className }: { className?: string }) {
  const root = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      const strokes = gsap.utils.toArray<SVGGeometryElement>('.spine-stroke');

      // Prime the line-draw, cervical to sacrum.
      strokes.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.set('.spine-guide', { opacity: 0 });

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .to(strokes, { strokeDashoffset: 0, duration: 1.6, stagger: 0.04 })
        .to('.spine-guide', { opacity: 1, duration: 1.2, stagger: 0.15 }, '-=1.2');

      // Perpetual alignment wave — each vertebra flexes ~1.5° and returns,
      // the stagger turning it into a slow ripple down the column.
      gsap.to('.spine-vert', {
        rotation: 1.5,
        duration: 2.4,
        ease: 'sine.inOut',
        transformOrigin: 'center',
        stagger: { each: 0.09, repeat: -1, yoyo: true },
        delay: 1.2,
      });

      // Guides turn at the goniometer dial's pace.
      gsap.to('.spine-guide-rot', {
        rotation: 360,
        duration: 90,
        repeat: -1,
        ease: 'none',
        transformOrigin: 'center',
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <svg ref={root} viewBox="0 0 80 184" aria-hidden className={className}>
      {/* Construction geometry: plumb line through the column, ruler rail beside it */}
      <g className="spine-guide" stroke="currentColor" fill="none">
        <path d={`M ${CENTER_X} 8 V 178`} strokeWidth="0.3" strokeDasharray="1 2.5" />
        <path d="M 70 12 V 172" strokeWidth="0.3" />
        <path d={rulerTicks(70, 12, 172, 8, 2.6)} strokeWidth="0.3" />
      </g>

      {/* Goniometer guides over key vertebrae */}
      {GUIDES.map(({ vi, r }) => {
        const v = verts[vi];
        return (
          <g
            key={vi}
            className="spine-guide"
            transform={`translate(${v.x} ${v.y})`}
            stroke="currentColor"
            fill="none"
          >
            <circle r={r} strokeWidth="0.4" />
            <circle r={round(r * 0.62)} strokeWidth="0.3" />
            <path d={`M ${-r} 0 H ${r} M 0 ${-r} V ${r}`} strokeWidth="0.3" />
            <g className="spine-guide-rot">
              <path d={guideTicks(24, r, 1.6)} strokeWidth="0.35" />
            </g>
          </g>
        );
      })}

      {/* The column: body outline + spinous process per vertebra */}
      {verts.map((v, i) => (
        <g key={i} transform={`translate(${v.x} ${v.y}) rotate(${v.a})`}>
          <g className="spine-vert" stroke="currentColor" fill="none">
            <rect
              className="spine-stroke"
              x={round(-v.w / 2)}
              y={round(-v.h / 2)}
              width={v.w}
              height={v.h}
              rx={round(v.h * 0.32)}
              strokeWidth="0.5"
            />
            <path
              className="spine-stroke"
              d={`M ${round(v.w / 2)} 0 L ${round(v.w / 2 + v.h * 0.85)} ${round(v.h * 0.45)}`}
              strokeWidth="0.4"
            />
          </g>
        </g>
      ))}

      {/* Sacrum and coccyx — fused, so they draw but sit out of the flex wave */}
      <g
        transform={`translate(${round(last.x + 1.5)} ${sacrumY}) rotate(${round(last.a + 6)})`}
        stroke="currentColor"
        fill="none"
      >
        <path className="spine-stroke" d="M -6.2 0 Q -5 6 -2.6 11 L 2.6 11 Q 5.4 6 6.2 0 Z" strokeWidth="0.5" />
        <path className="spine-stroke" d="M -4.8 3.5 H 4.8 M -3.6 7 H 3.6" strokeWidth="0.3" />
        <path className="spine-stroke" d="M -1.6 13 L 1.6 13 L 0.9 17 L -0.9 17 Z" strokeWidth="0.4" />
      </g>
    </svg>
  );
}
