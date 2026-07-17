'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent, type Content } from '@/lib/i18n';
import { SectionLabel, MaskLine } from '@/components/primitives';
import { viewportOnce } from '@/lib/motion';
import { useReducedMotion } from '@/lib/hooks';

/**
 * Featured work — 04.
 *
 * Horizontal scroll driven by vertical scroll through a tall sticky track.
 *
 * Under reduced motion this degrades to a native horizontal scroller: the
 * content and reading order are identical, only the scroll-hijacking is gone.
 * That is the point of the fallback — same information, less vestibular load.
 */
export function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const company = useContent();

  // Measure how far the strip actually overflows the viewport so the last card
  // always lands fully in view — a hardcoded percentage drifts out of sync the
  // moment the card count or a card width changes.
  const [travel, setTravel] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const compute = () => {
      if (strip.current) setTravel(Math.max(0, strip.current.scrollWidth - window.innerWidth));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [reduced]);

  const { scrollYProgress } = useScroll({ target: track });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  if (reduced) {
    return (
      <section id="work" data-nav="dark" className="on-dark bg-obsidian py-28 text-white">
        <div className="edge">
          <SectionLabel number="04">{company.ui.treatLabel}</SectionLabel>
          <h2 className="mt-10 font-display text-giant font-medium tracking-tightest">
            {company.ui.treatHeading}
          </h2>
        </div>
        <div className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6">
          {company.focusAreas.map((f) => (
            <div key={f.id} className="w-[85vw] shrink-0 snap-start md:w-[520px]">
              <FocusCard area={f} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      id="work"
      ref={track}
      data-nav="dark"
      className="on-dark relative h-[420vh] bg-obsidian text-white"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden grain">
        <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg-dark" />

        <div className="relative edge">
          <MaskLine>
            <SectionLabel number="04">{company.ui.treatLabel}</SectionLabel>
          </MaskLine>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-giant font-medium tracking-tightest">
              {company.ui.treatHeading}
            </h2>
            <span className="label">{company.ui.scrollToPan}</span>
          </div>
        </div>

        <motion.div
          ref={strip}
          style={{ x }}
          className="relative mt-14 flex gap-8 pl-6 pr-[8vw] will-change-transform"
        >
          {company.focusAreas.map((area) => (
            <div key={area.id} className="w-[78vw] shrink-0 md:w-[46vw] lg:w-[38vw]">
              <FocusCard area={area} />
            </div>
          ))}

          {/* End slate — closes the strip rather than letting it trail off */}
          <div className="flex w-[60vw] shrink-0 items-center md:w-[34vw]">
            <a href="#contact" className="group block">
              <span className="label">{company.ui.next}</span>
              <span className="mt-4 block font-display text-large font-medium tracking-tightest text-white">
                {company.ui.notSureLine1}
                <br />
                {company.ui.notSureLine2}
              </span>
              <span className="mt-6 inline-block h-px w-24 origin-left bg-navy transition-transform duration-500 ease-precision group-hover:scale-x-150" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FocusCard({ area }: { area: Content['focusAreas'][number] }) {
  return (
    <motion.article
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={viewportOnce}
      transition={{ duration: 0.7 }}
      className="group"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={area.image}
          alt={`${area.title} — ${area.region}`}
          fill
          sizes="(max-width: 768px) 80vw, 40vw"
          className="object-cover transition-transform duration-[1.2s] ease-precision group-hover:scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-transparent"
        />
        <span className="absolute left-5 top-5 bg-navy px-3 py-1.5 font-display text-[0.65rem] uppercase tracking-label text-white">
          {area.region}
        </span>
        <div className="absolute inset-x-5 bottom-5">
          <h3 className="font-display text-large font-medium tracking-tightest text-white">
            {area.title}
          </h3>
        </div>
      </div>
      <div className="mt-4 border-t border-accent/15 pt-4">
        <span className="text-sm text-accent/70">{area.scope}</span>
      </div>
    </motion.article>
  );
}
