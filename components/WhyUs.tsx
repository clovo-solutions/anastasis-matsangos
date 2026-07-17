'use client';

import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { useContent } from '@/lib/i18n';
import { SectionLabel, MaskLine, RevealText } from '@/components/primitives';
import { EASE, viewportOnce } from '@/lib/motion';

/**
 * Why us — 06.
 *
 * Dark. An offset editorial column of oversized statements, each with a hairline
 * that draws across on entry. The indent steps rightward down the list, so the
 * block reads as a diagonal rather than a stack.
 */
export function WhyUs() {
  const company = useContent();
  return (
    <section
      data-nav="dark"
      className="on-dark relative overflow-hidden bg-ink py-28 text-white md:py-40 grain"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg-dark" />

      {/* Oversized outlined word, cropped by the right edge */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-[8vw] top-1/2 hidden -translate-y-1/2 select-none font-display text-[16vw] font-normal leading-none tracking-tightest text-transparent [-webkit-text-stroke:1px_rgba(200,212,232,0.10)] lg:block"
      >
        {company.ui.whyWatermark}
      </span>

      <div className="relative edge">
        <MaskLine>
          <SectionLabel number="06">{company.ui.whyLabel}</SectionLabel>
        </MaskLine>

        <RevealText
          as="h2"
          text={company.ui.whyHeading}
          className="mt-10 max-w-3xl font-display text-giant font-medium tracking-tightest text-white"
        />

        <ul className="mt-20 max-w-4xl">
          {company.differentiators.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              className="group relative"
              style={{ paddingLeft: `${i * 3}vw` }}
            >
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
                className="block h-px origin-left bg-accent/20"
              />
              <div className="grid gap-4 py-9 md:grid-cols-[1fr_1.4fr] md:gap-10">
                <h3 className="font-display text-large font-medium tracking-tightest text-white transition-colors duration-500 group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="max-w-md self-end text-lede text-accent/70">{item.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Qualifications — rendered as a quiet strip, honestly labelled */}
        <div className="mt-24">
          <span className="label">{company.ui.qualifications}</span>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
            {company.qualifications.map((q, i) => (
              <Fragment key={q.name}>
                {i > 0 ? (
                  <span aria-hidden className="text-accent/25">
                    ·
                  </span>
                ) : null}
                <span className="font-display text-sm text-accent/70">{q.name}</span>
              </Fragment>
            ))}
          </div>
          <p className="mt-6 max-w-xl text-sm text-accent/70">
            {/* BSc PT and OMT are verified from the client's brief. Any further
                registrations are placeholders — claiming a registration not held
                is regulatory fraud, so the strip is labelled until lib/company.ts
                holds confirmed details. */}
            {company.ui.qualificationsNote}
          </p>
        </div>
      </div>
    </section>
  );
}
