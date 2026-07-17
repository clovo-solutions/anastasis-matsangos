'use client';

import { motion } from 'framer-motion';
import { useContent } from '@/lib/i18n';
import { Counter, SectionLabel, MaskLine } from '@/components/primitives';
import { viewportOnce, EASE } from '@/lib/motion';

/**
 * Statistics — dark band, breaking the light rhythm.
 *
 * Not a counter row: each figure is a full-height column separated by hairlines,
 * each animating on its own trigger as it crosses into view, so the four numbers
 * land in sequence rather than together.
 */
export function Stats() {
  const company = useContent();
  return (
    <section
      data-nav="dark"
      className="on-dark relative overflow-hidden bg-ink py-24 text-white md:py-32 grain"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg-dark" />

      <div className="relative edge">
        <MaskLine>
          <SectionLabel number="02">{company.ui.statsLabel}</SectionLabel>
        </MaskLine>

        <div className="mt-16 grid grid-cols-1 gap-px bg-accent/15 sm:grid-cols-2 lg:grid-cols-4">
          {company.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
              className="group relative bg-ink px-6 py-12 lg:py-16"
            >
              {/*
                Sized against the COLUMN, not the viewport. `text-colossal`
                (10vw) renders "1200" ~345px wide inside a 279px cell, which
                collided with the neighbouring figure. 6vw is still oversized
                but stays inside its column at every breakpoint.

                The suffix is accent, not navy: navy on ink is 1.46:1, which
                made the "+" and "%" invisible — silently turning "25+" into
                "25" and "98%" into "98".
              */}
              <div className="font-display text-[clamp(2.5rem,6vw,7rem)] font-medium leading-[0.86] tracking-tightest text-white">
                <Counter value={stat.value} suffix={stat.suffix} suffixClass="text-accent" />
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span aria-hidden className="h-1.5 w-1.5 bg-navy" />
                <span className="font-display text-sm uppercase tracking-label text-accent">
                  {stat.label}
                </span>
              </div>
              {/* Gear-tooth tick, repeating the mark's motif as a divider */}
              <span
                aria-hidden
                className="absolute right-0 top-0 h-full w-px origin-top scale-y-0 bg-navy transition-transform duration-700 ease-precision group-hover:scale-y-100"
              />
            </motion.div>
          ))}
        </div>

        <p className="mt-8 max-w-xl text-sm text-accent/70">
          {/* Visible, honest disclosure while the figures are unverified.
              Delete this line once lib/company.ts holds confirmed numbers. */}
          {company.ui.statsDisclaimer}
        </p>
      </div>
    </section>
  );
}
