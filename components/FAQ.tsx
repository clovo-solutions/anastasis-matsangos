'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useContent } from '@/lib/i18n';
import { SectionLabel, MaskLine } from '@/components/primitives';
import { EASE, viewportOnce } from '@/lib/motion';

/**
 * FAQ — 07.
 *
 * A light accordion between Why-us (dark) and Contact (dark), keeping the
 * section rhythm alternating. One panel open at a time; the whole list is a
 * plain document under reduced motion since the height tween is the only effect.
 */
export function FAQ() {
  const company = useContent();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-paper py-28 md:py-40 grain">
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-bg opacity-50" />

      <div className="relative edge">
        <MaskLine>
          <SectionLabel number="07">{company.ui.faqLabel}</SectionLabel>
        </MaskLine>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <h2 className="font-display text-giant font-medium tracking-tightest text-ink">
              {company.ui.faqHeading}
            </h2>
          </div>

          <ul className="border-t border-graphite/15 lg:col-span-7 lg:col-start-6">
            {company.faq.map((item, i) => {
              const isOpen = open === i;
              return (
                <motion.li
                  key={item.question}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 6) * 0.05 }}
                  className="border-b border-graphite/15"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                    >
                      <span className="font-display text-large font-medium tracking-tightest text-ink transition-colors duration-300 group-hover:text-navy">
                        {item.question}
                      </span>
                      <Plus
                        aria-hidden
                        className={`h-5 w-5 shrink-0 text-navy transition-transform duration-500 ease-precision ${
                          isOpen ? 'rotate-[135deg]' : 'group-hover:rotate-90'
                        }`}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-xl pb-8 text-lede text-graphite">{item.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
