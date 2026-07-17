'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useContent } from '@/lib/i18n';
import { SectionLabel, MaskLine } from '@/components/primitives';
import { EASE, viewportOnce } from '@/lib/motion';
import { useReducedMotion } from '@/lib/hooks';
import { motionDial } from '@/lib/logo';

/**
 * Process — 05.
 *
 * Sticky storytelling: the left column pins while the right column's steps
 * scroll past. The active step drives an SVG gear that rotates one segment per
 * stage, and a connecting line that draws down the column.
 *
 * The step list is a real <ol> — the narrative works as a plain document if
 * every effect here is stripped.
 */
export function Process() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const company = useContent();

  const { scrollYProgress } = useScroll({
    target: section,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const i = Math.min(company.process.length - 1, Math.floor(v * company.process.length));
    setActive(i);
  });

  const gearRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const lineScale = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section id="process" ref={section} className="relative bg-paper grain">
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg opacity-70" />

      <div className="relative grid edge lg:grid-cols-12 lg:gap-10">
        {/* Sticky left column */}
        <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-[100svh] lg:self-start">
          <div className="flex h-full flex-col justify-center py-24 lg:py-0">
            <MaskLine>
              <SectionLabel number="05">{company.ui.approachLabel}</SectionLabel>
            </MaskLine>

            <h2 className="mt-10 font-display text-giant font-medium tracking-tightest text-ink">
              {company.ui.approachHeading1}
              <br />
              {company.ui.approachHeading2}
            </h2>

            {/* Motion dial that indexes with the active step */}
            <div className="relative mt-14 hidden h-56 w-56 lg:block">
              <motion.svg
                viewBox="0 0 100 100"
                style={reduced ? undefined : { rotate: gearRotate }}
                className="absolute inset-0 h-full w-full text-navy/25 will-change-transform"
              >
                <path d={motionDial(24, 40, 5)} fill="none" stroke="currentColor" strokeWidth="0.7" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" strokeWidth="0.4" />
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="font-display text-[3.5rem] font-medium tabular-nums tracking-tightest text-ink"
                >
                  {company.process[active].index}
                </motion.span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling steps */}
        <ol className="relative lg:col-span-6 lg:col-start-7">
          {/* Connecting line, drawn by scroll */}
          <span
            aria-hidden
            className="absolute left-0 top-0 block h-full w-px bg-graphite/15"
          >
            <motion.span
              style={reduced ? { scaleY: 1 } : { scaleY: lineScale }}
              className="absolute inset-0 block origin-top bg-navy"
            />
          </span>

          {company.process.map((step, i) => (
            <motion.li
              key={step.index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative flex flex-col justify-center py-8 pl-8 lg:min-h-[62svh] lg:py-16 lg:pl-14"
            >
              {/* Node on the line */}
              <span
                aria-hidden
                className={`absolute -left-[5px] top-1/2 block h-2.5 w-2.5 -translate-y-1/2 transition-colors duration-500 ${
                  active >= i ? 'bg-navy' : 'bg-graphite/30'
                }`}
              />
              <span className="label text-navy">
                {company.ui.step} {step.index}
              </span>
              <h3 className="mt-5 font-display text-large font-medium tracking-tightest text-ink">
                {step.title}
              </h3>
              <p className="mt-5 max-w-md text-lede text-graphite">{step.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
