'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { useContent } from '@/lib/i18n';
import { useReducedMotion } from '@/lib/hooks';
import { Magnetic } from '@/components/primitives';

/**
 * Hero.
 *
 * The load sequence is the practice's idea compressed into two seconds:
 * the mark is *drawn* (assessment), its two halves *converge* (bringing the
 * body back into alignment), then it fills solid (recovery). Headline follows
 * word by word, CTAs last.
 *
 * The whole timeline is skipped under prefers-reduced-motion — the static end
 * state is the design, not a fallback.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const company = useContent();

  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (reduced || !root.current) return;

    const ctx = gsap.context(() => {
      // Spine eases from a heavy blur down to a soft focus on its own timeline —
      // kept out of the text sequence so its 2s duration never delays the copy.
      gsap.to('.hero-spine', {
        opacity: 1,
        filter: 'blur(4px)',
        duration: 2,
        ease: 'power2.out',
        delay: 0.2,
      });

      // Text: title rises, then the paragraph, CTAs and meta follow it.
      gsap
        .timeline({ defaults: { ease: 'power3.out' }, delay: 0.2 })
        .from('.hero-word', { yPercent: 108, duration: 0.9, stagger: 0.05, ease: 'power4.out' })
        .from('.hero-sub', { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')
        .from('.hero-cta', { yPercent: 130, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.45')
        .from('.hero-meta', { opacity: 0, duration: 0.8, stagger: 0.06 }, '-=0.5');

      // Cursor parallax on the spine. Transform-only, quickTo for a throttled,
      // GPU-cheap write.
      const gx = gsap.quickTo('.hero-gear', 'x', { duration: 1.4, ease: 'power3' });
      const gy = gsap.quickTo('.hero-gear', 'y', { duration: 1.4, ease: 'power3' });

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        gx(nx * -40);
        gy(ny * -40);
      };
      window.addEventListener('mousemove', onMove, { passive: true });
      return () => window.removeEventListener('mousemove', onMove);
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  const titleWords = company.ui.heroTitle.split(' ');

  return (
    <section
      ref={root}
      className="relative isolate grid min-h-[100svh] grid-rows-[1fr_auto] overflow-hidden bg-paper grain"
    >
      {/* Engineering grid + blueprint geometry */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,transparent_35%,#F7F8FA_100%)]"
      />

      {/* Mobile only: the spine as a soft blurred watermark behind the copy.
          multiply lets its own shading tint the light paper — a light image at
          low opacity on a near-white bg would be invisible. Desktop shows the
          sharp in-flow spine inside the headline group instead. */}
      <Image
        src="/spine.png"
        alt=""
        aria-hidden
        width={383}
        height={2000}
        priority
        className="pointer-events-none absolute -right-8 top-1/2 h-[92%] w-auto -translate-y-1/2 select-none opacity-60 blur-sm mix-blend-multiply lg:hidden"
      />

      <motion.div
        style={reduced ? undefined : { y: heroY, opacity: heroFade }}
        className="relative row-start-1 flex flex-col justify-center edge pt-32"
      >
        {/* Headline + spine as one centred group */}
        <div className="mx-auto flex w-full max-w-6xl items-center justify-center gap-6 lg:gap-32">
          {/* Text column */}
          <div className="min-w-0">
            <h1 className="font-display font-medium text-ink">
              <span className="sr-only">
                {company.ui.heroTitle} — {company.name}
              </span>

              {/* Title, one word per line */}
              {titleWords.map((w, i) => (
                <span key={w} aria-hidden className="mask">
                  <span className="hero-word block text-giant font-semibold leading-[1.04] tracking-tight">
                    {w}
                    {i === titleWords.length - 1 ? <span className="text-navy">.</span> : null}
                  </span>
                </span>
              ))}

              {/* Practitioner name — navy so it reads as a distinct line rather
                  than blending into the graphite body copy. */}
              <span aria-hidden className="mask mt-5 block">
                <span className="hero-word block text-large font-normal tracking-tight text-navy">
                  {company.name}
                </span>
              </span>
            </h1>

            <div className="mt-12 flex max-w-2xl flex-wrap items-end gap-x-8 gap-y-6">
              <p className="hero-sub max-w-md text-lede text-graphite">{company.ui.heroParagraph}</p>

              <div className="flex flex-wrap gap-3">
              <span className="mask inline-block">
                <Magnetic className="hero-cta inline-block">
                  <button
                    type="button"
                    data-cal-namespace="assessment"
                    data-cal-link="clovo-solutions-7teskm"
                    data-cal-config='{"layout":"month_view"}'
                    className="group inline-flex items-center gap-3 bg-ink px-7 py-4 font-display text-sm uppercase tracking-label text-white transition-colors duration-500 ease-precision hover:bg-navy"
                  >
                    {company.ui.bookSession}
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-500 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1"
                      aria-hidden
                    />
                  </button>
                </Magnetic>
              </span>
              <span className="mask inline-block">
                <Magnetic className="hero-cta inline-block">
                  <a
                    href="#services"
                    className="inline-flex items-center gap-3 border border-graphite/30 px-7 py-4 font-display text-sm uppercase tracking-label text-ink transition-colors duration-500 ease-precision hover:border-navy hover:text-navy"
                  >
                    {company.ui.viewServices}
                  </a>
                </Magnetic>
              </span>
            </div>
          </div>
        </div>

        {/* 3D spine, lateral view — parallaxes with the cursor via .hero-gear */}
        <Image
            src="/spine.png"
            alt=""
            aria-hidden
            width={383}
            height={2000}
            priority
            style={reduced ? undefined : { opacity: 0, filter: 'blur(28px)' }}
            className="hero-gear hero-spine pointer-events-none hidden h-[78vh] w-auto shrink-0 select-none blur-[2px] lg:block"
          />
        </div>
      </motion.div>

      {/* Baseline meta strip */}
      <div className="relative row-start-2 edge pb-8 pt-10">
        <div className="rule mb-5" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="hero-meta label">{company.credentials}</span>
          <span className="hero-meta label hidden md:inline">{company.ui.locationCity}</span>
          <span className="hero-meta label inline-flex items-center gap-2 text-navy">
            {company.ui.scroll}
            <ArrowDownRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </div>
      </div>
    </section>
  );
}
