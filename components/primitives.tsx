'use client';

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EASE, viewportOnce } from '@/lib/motion';
import { useReducedMotion, useIsTouch } from '@/lib/hooks';

/* ─────────────────────────────────────────────────────────────────────────────
 * RevealText — the site's default entrance.
 *
 * Splits a string into words, each clipped by its own mask, each translating up
 * on a stagger. Not a fade: the hard clip edge is what makes it read as
 * mechanical rather than soft.
 *
 * The full string stays in the DOM as one accessible node; the split spans are
 * aria-hidden, so screen readers never hear "Precision" "In" "Motion" as three
 * fragments.
 * ──────────────────────────────────────────────────────────────────────────── */
export function RevealText({
  text,
  as: Tag = 'span',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduced = useReducedMotion();
  const words = text.split(' ');

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {/* Keyed by text: a language switch remounts the reveal so its words
          re-trigger, instead of the new words inheriting a spent once-observer
          and staying stuck in the hidden (translated-down) state. */}
      <motion.span
        key={text}
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        className="inline"
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="mask inline-block align-bottom">
            <motion.span
              className={`inline-block ${wordClassName ?? ''}`}
              variants={{
                hidden: { y: '108%' },
                show: {
                  y: '0%',
                  transition: { duration: 0.85, ease: EASE, delay: delay + i * stagger },
                },
              }}
            >
              {word}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * MaskLine — clips any child on scroll-in. For rules, images, blocks.
 *
 * The trigger MUST live on the outer (clipping) element, not the inner one.
 * The inner child starts translated 110% down — entirely outside its own
 * overflow-hidden parent — so its visible area is zero. An observer attached to
 * it would never report "in view", and the content would stay hidden forever.
 * Observing the wrapper and driving the child through variants avoids that.
 * ──────────────────────────────────────────────────────────────────────────── */
export function MaskLine({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={`mask ${className ?? ''}`}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      <motion.div
        variants={{
          hidden: { y: '110%' },
          show: { y: '0%', transition: { duration: 0.9, ease: EASE, delay } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * SectionLabel — oversized tracked-out eyebrow with a gear-tooth tick.
 * ──────────────────────────────────────────────────────────────────────────── */
export function SectionLabel({ children, number }: { children: string; number?: string }) {
  return (
    <div className="flex items-center gap-4">
      <span aria-hidden className="h-2 w-2 bg-navy" />
      <span className="label">{children}</span>
      {number ? (
        <span aria-hidden className="label text-graphite/50">
          / {number}
        </span>
      ) : null}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Counter — animates a number when it enters view.
 *
 * Springs a motion value and writes straight to textContent, so counting never
 * triggers React reconciliation (60 renders/sec × 4 counters would be absurd).
 *
 * Two details that are easy to get wrong, and did get wrong here:
 *
 *  1. The real value is rendered server-side and only reset to zero once JS
 *     takes over. Rendering `0` as the SSR content would ship a page whose
 *     headline statistic reads "0" to crawlers and no-JS readers.
 *  2. The subscription paints `spring.get()` immediately rather than waiting
 *     for a 'change' event. A spring that is already at its target emits
 *     nothing — so a counter whose animation resolved before the listener
 *     attached would sit at its placeholder forever. That is exactly the bug
 *     that left "25+ Years" rendering as "0+".
 * ──────────────────────────────────────────────────────────────────────────── */
export function Counter({
  value,
  suffix = '',
  className,
  suffixClass = 'text-navy',
}: {
  value: number;
  suffix?: string;
  className?: string;
  /** The suffix carries meaning ("25+", "98%") — it must meet contrast too. */
  suffixClass?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  /**
   * Vertical inset only. A bare '-20%' insets all four sides, which shrinks the
   * trigger box horizontally too — the leftmost column of a 4-up grid then sits
   * outside it and never fires. That is what pinned "25+ Years" at "0+" while
   * the three columns further right counted up correctly.
   */
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const reduced = useReducedMotion();
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18, mass: 1 });

  // Paint + subscribe. Runs before the trigger effect below.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      el.textContent = String(value);
      return;
    }
    el.textContent = String(Math.round(spring.get()));
    return spring.on('change', (v) => {
      el.textContent = String(Math.round(v));
    });
  }, [spring, reduced, value]);

  useEffect(() => {
    if (!inView || reduced) return;
    mv.set(value);
  }, [inView, reduced, mv, value]);

  return (
    <span className={className}>
      <span ref={ref}>{value}</span>
      <span className={suffixClass}>{suffix}</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Magnetic — pulls a child toward the cursor within a radius.
 *
 * Disabled on touch (no cursor to chase) and under reduced motion.
 * ──────────────────────────────────────────────────────────────────────────── */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 15, mass: 0.4 });

  const disabled = reduced || touch;

  const onMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    // getBoundingClientRect reflects the current translate, so measure the
    // resting centre by removing it — otherwise the pull feeds back on itself
    // and the element oscillates out from under the cursor.
    const cx = r.left + r.width / 2 - sx.get();
    const cy = r.top + r.height / 2 - sy.get();
    x.set((e.clientX - cx) * strength);
    y.set((e.clientY - cy) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={disabled ? undefined : { x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Parallax — translates a child against scroll.
 *
 * Transform-only. Never animates top/height, so it stays off the layout path.
 * ──────────────────────────────────────────────────────────────────────────── */
export function Parallax({
  children,
  className,
  distance = 80,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [range, setRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (reduced) return;
    setRange([distance, -distance]);
  }, [distance, reduced]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], range);

  return (
    <div ref={ref} className={className}>
      <motion.div style={reduced ? undefined : { y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
