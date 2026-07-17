'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useContent } from '@/lib/i18n';
import { RevealText, MaskLine, SectionLabel, Parallax } from '@/components/primitives';
import { clipReveal, viewportOnce } from '@/lib/motion';

/**
 * Overview — 01.
 *
 * Asymmetric split. The section number is set enormous and bleeds off the left
 * edge, cropped by the viewport: scale as hierarchy, not decoration.
 */
export function Overview() {
  const company = useContent();
  return (
    <section id="overview" className="relative overflow-hidden bg-paper py-28 md:py-40 grain">
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-bg opacity-60" />

      {/* Giant outlined number, deliberately half off-canvas */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[4vw] top-8 select-none font-display text-[34vw] font-bold leading-none tracking-tightest text-transparent [-webkit-text-stroke:1px_rgba(80,83,94,0.14)]"
      >
        {company.intro.number}
      </span>

      <div className="relative edge">
        <MaskLine>
          <SectionLabel number={company.intro.number}>{company.intro.label}</SectionLabel>
        </MaskLine>

        <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Story */}
          <div className="lg:col-span-6 lg:col-start-1">
            <RevealText
              as="h2"
              text={company.intro.heading}
              className="font-display text-giant font-medium tracking-tightest text-ink"
            />
            <div className="mt-10 max-w-lg space-y-6">
              {company.intro.body.map((p, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.8, delay: 0.15 + i * 0.1 }}
                  className="text-lede text-graphite"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-px bg-graphite/15 sm:grid-cols-3">
              {company.conditions.map((condition, i) => (
                <motion.span
                  key={condition}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="bg-paper px-4 py-5 font-display text-[0.75rem] uppercase tracking-[0.12em] text-graphite"
                >
                  {condition}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Image — overlaps the text column on large screens, breaking the grid */}
          <div className="relative lg:col-span-6 lg:col-start-7 lg:-mt-24">
            <Parallax distance={40}>
              <motion.div
                variants={clipReveal}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
                className="relative aspect-[4/5] w-full overflow-hidden"
              >
                <Image
                  src={company.intro.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-ink/10 mix-blend-multiply" />
              </motion.div>
            </Parallax>

            {/* Technical annotation, CAD-style */}
            <div className="absolute -left-6 bottom-8 hidden bg-paper py-3 pl-0 pr-5 lg:block">
              <span className="label text-navy">{company.ui.figClinic}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
