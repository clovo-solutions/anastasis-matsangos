'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useContent } from '@/lib/i18n';
import { SectionLabel, MaskLine } from '@/components/primitives';
import { EASE, viewportOnce } from '@/lib/motion';
import { useReducedMotion, useIsTouch } from '@/lib/hooks';

/**
 * Services — 03.
 *
 * No cards. A full-bleed vertical list where each row is a piece of typography
 * that reacts: the row scales, the index brightens, and a cinematic still tracks
 * the cursor behind the type.
 *
 * The hovered image is a single node reused across all twelve rows — mounting
 * twelve <Image>s and toggling opacity would cost twelve decodes for one
 * visible frame. Row hover only swaps the src.
 *
 * The still is pinned to the right margin and tracks the cursor vertically
 * only. Following X as well would drag it across the very title it is
 * illustrating — the type has to stay readable, so the image gets the empty
 * half of the row and the words keep the left.
 *
 * Keyboard: rows are links, and focus drives the same active state as hover, so
 * the list is fully operable without a pointer.
 */
export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const reduced = useReducedMotion();
  const touch = useIsTouch();
  const wrap = useRef<HTMLDivElement>(null);
  const company = useContent();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const y = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });

  const showImage = active !== null && !reduced && !touch;

  const onMove = (e: React.MouseEvent) => {
    if (!wrap.current || reduced || touch) return;
    const r = wrap.current.getBoundingClientRect();
    // Y tracks the cursor; X only drifts a few px, as a parallax hint.
    mx.set((e.clientX - r.left - r.width / 2) * 0.03);
    my.set(e.clientY - r.top - 130);
  };

  return (
    <section id="services" className="relative overflow-hidden bg-paper py-28 md:py-40 grain">
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-bg opacity-50" />

      <div className="relative">
        <div className="edge">
          <MaskLine>
            <SectionLabel number="03">{company.ui.servicesLabel}</SectionLabel>
          </MaskLine>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-2xl font-display text-giant font-medium tracking-tightest text-ink">
              {company.ui.servicesHeading1}
              <br />
              <span className="text-graphite/40">{company.ui.servicesHeading2}</span>
            </h2>
            <p className="max-w-xs text-sm text-graphite">{company.ui.servicesIntro}</p>
          </div>
        </div>

        <div ref={wrap} onMouseMove={onMove} className="relative mt-20">
          {/* Cursor-tracked still. One node, swapped src. */}
          <AnimatePresence>
            {showImage ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, ease: EASE }}
                style={{ x, y }}
                aria-hidden
                className="pointer-events-none absolute right-[6vw] top-0 z-20 hidden h-[260px] w-[380px] overflow-hidden lg:block"
              >
                <Image
                  src={company.services[active!].image}
                  alt=""
                  fill
                  sizes="380px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-ink/25" />
                {/* Scrim: the caption must hold over bright frames too. */}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian/90 to-transparent" />
                <span className="absolute bottom-3 left-4 right-4 font-display text-[0.65rem] uppercase tracking-label text-white">
                  {company.services[active!].capabilities.join(' · ')}
                </span>
              </motion.div>
            ) : null}
          </AnimatePresence>

          <ul className="relative z-10 border-t border-graphite/15">
            {company.services.map((service, i) => {
              const isActive = active === i;
              return (
                <motion.li
                  key={service.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.6, ease: EASE, delay: Math.min(i, 6) * 0.04 }}
                  className="border-b border-graphite/15"
                >
                  <a
                    href="#contact"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                    className="group relative block edge"
                  >
                    {/* Ink wash that wipes in from the left on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-700 ease-precision group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />

                    <span className="relative flex items-center gap-6 py-7 md:gap-10 md:py-9">
                      <span
                        className={`font-display text-sm tabular-nums tracking-label transition-colors duration-500 ${
                          isActive ? 'text-navy' : 'text-graphite/50'
                        } group-hover:text-navy`}
                      >
                        {service.index}
                      </span>

                      <span className="min-w-0 flex-1">
                        <motion.span
                          animate={
                            reduced || touch ? undefined : { x: isActive ? 18 : 0 }
                          }
                          transition={{ duration: 0.6, ease: EASE }}
                          className={`block font-display text-large font-medium tracking-tightest transition-colors duration-500 ${
                            isActive ? 'text-white' : 'text-ink'
                          } group-hover:text-white`}
                        >
                          {service.title}
                        </motion.span>

                        {/* Summary unfurls only for the active row */}
                        <AnimatePresence initial={false}>
                          {isActive && !reduced ? (
                            <motion.span
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.5, ease: EASE }}
                              className="block overflow-hidden"
                            >
                              <span className="block max-w-xl pt-3 text-sm text-accent/80 md:pl-[18px]">
                                {service.summary}
                              </span>
                            </motion.span>
                          ) : null}
                        </AnimatePresence>
                      </span>

                      <ArrowUpRight
                        aria-hidden
                        className={`h-5 w-5 shrink-0 transition-all duration-500 ease-precision ${
                          isActive
                            ? 'translate-x-0 text-accent opacity-100'
                            : '-translate-x-3 text-graphite opacity-0'
                        } group-hover:translate-x-0 group-hover:opacity-100`}
                      />
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
