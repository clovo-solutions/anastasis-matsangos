'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useContent } from '@/lib/i18n';
import { Magnetic, MaskLine, SectionLabel } from '@/components/primitives';
import {
  TRACED_VIEWBOX,
  TRACED_LEFT,
  TRACED_RIGHT,
  TRACED_LEFT_TRANSFORM,
  TRACED_RIGHT_TRANSFORM,
} from '@/lib/logoTraced';
import { EASE, viewportOnce } from '@/lib/motion';
import { useReducedMotion } from '@/lib/hooks';

/**
 * CTA — the closing statement.
 *
 * The mark's two halves converge as the section scrolls into view: the site
 * opened with the body coming back into alignment and closes on it. Same idea,
 * restated at the moment we ask for the booking.
 */
export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const company = useContent();

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const leftX = useTransform(scrollYProgress, [0, 1], ['-18%', '0%']);
  const rightX = useTransform(scrollYProgress, [0, 1], ['18%', '0%']);
  const markOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

  // Live open/closed status, computed in the clinic's timezone so it's correct
  // regardless of where the visitor is. Runs after mount (no SSR mismatch) and
  // ticks each minute.
  const [status, setStatus] = useState<{ open: boolean; today: number } | null>(null);
  useEffect(() => {
    const DAY: Record<string, number> = {
      Monday: 0,
      Tuesday: 1,
      Wednesday: 2,
      Thursday: 3,
      Friday: 4,
      Saturday: 5,
      Sunday: 6,
    };
    const toMin = (t: string) => {
      const [h, m] = t.split(':').map(Number);
      return h * 60 + m;
    };
    const compute = () => {
      const parts = new Intl.DateTimeFormat('en-US', {
        timeZone: company.timezone,
        weekday: 'long',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23',
      }).formatToParts(new Date());
      const today = DAY[parts.find((p) => p.type === 'weekday')?.value ?? ''] ?? 0;
      const now =
        Number(parts.find((p) => p.type === 'hour')?.value) * 60 +
        Number(parts.find((p) => p.type === 'minute')?.value);
      const h = company.hours[today];
      setStatus({ open: !!h && now >= toMin(h[0]) && now < toMin(h[1]), today });
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [company.timezone, company.hours]);

  const { street, city, country } = company.contact.address;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${street}, ${city}, ${country}`,
  )}&output=embed`;

  const lines = [company.ui.ctaHeading1, company.ui.ctaHeading2];
  // Render a trailing full stop in navy — the mark's one colour accent.
  const withNavyStop = (s: string) =>
    s.endsWith('.') ? (
      <>
        {s.slice(0, -1)}
        <span className="text-navy">.</span>
      </>
    ) : (
      s
    );

  return (
    <section
      id="contact"
      ref={ref}
      data-nav="dark"
      className="on-dark relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-obsidian py-28 text-white grain"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-bg-dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(15,50,109,0.35),transparent_70%)]"
      />

      {/* Converging mark, sitting behind the type — the real traced mark, its
          two halves drawing together as the section scrolls into view */}
      <svg
        aria-hidden
        viewBox={TRACED_VIEWBOX}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[85vh] w-[85vh] -translate-x-1/2 -translate-y-1/2"
      >
        <motion.g style={reduced ? undefined : { x: leftX, opacity: markOpacity }}>
          <path d={TRACED_LEFT} transform={TRACED_LEFT_TRANSFORM} className="fill-navy/[0.16]" />
        </motion.g>
        <motion.g style={reduced ? undefined : { x: rightX, opacity: markOpacity }}>
          <path d={TRACED_RIGHT} transform={TRACED_RIGHT_TRANSFORM} className="fill-navy/[0.10]" />
        </motion.g>
      </svg>

      <div className="relative edge">
        <MaskLine>
          <SectionLabel number="07">{company.ui.contactLabel}</SectionLabel>
        </MaskLine>

        {/* The trigger sits on the clipping wrapper, never on the translated
            child — see MaskLine in components/primitives.tsx. Under reduced
            motion the mask is dropped entirely: a clip that never opens would
            leave the closing headline permanently invisible. */}
        <h2 className="mt-12 font-display text-mega font-medium tracking-tightest">
          {reduced ? (
            <>
              <span className="block">{lines[0]}</span>
              <span className="block">{withNavyStop(lines[1])}</span>
            </>
          ) : (
            <>
              <span className="sr-only">
                {lines[0]} {lines[1]}
              </span>
              {lines.map((line, i) => (
                <motion.span
                  key={line}
                  aria-hidden
                  className="mask"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                >
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: '108%' },
                      show: { y: '0%', transition: { duration: 1, ease: EASE, delay: i * 0.08 } },
                    }}
                  >
                    {i === lines.length - 1 ? withNavyStop(line) : line}
                  </motion.span>
                </motion.span>
              ))}
            </>
          )}
        </h2>

        {/* Primary booking CTA */}
        <div className="mt-14">
          <Magnetic strength={0.45}>
            <button
              type="button"
              data-cal-namespace="assessment"
              data-cal-link="clovo-solutions-7teskm"
              data-cal-config='{"layout":"month_view"}'
              className="group inline-flex items-center gap-4 bg-white px-9 py-6 font-display text-sm uppercase tracking-label text-obsidian transition-colors duration-500 ease-precision hover:bg-navy hover:text-white"
            >
              {company.ui.bookSession}
              <ArrowUpRight
                aria-hidden
                className="h-5 w-5 transition-transform duration-500 ease-precision group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </Magnetic>
        </div>

        {/* Contact details + map, aligned side by side on large screens */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16">
          {/* Email · Telephone · Hours */}
          <div className="flex flex-col gap-10">
            <dl className="grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="label">{company.ui.email}</dt>
                <dd className="mt-3">
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="font-display text-lede text-white underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {company.contact.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="label">{company.ui.telephone}</dt>
                <dd className="mt-3">
                  <a
                    href={`tel:${company.contact.phone.replace(/\s/g, '')}`}
                    className="font-display text-lede text-white underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {company.contact.phone}
                  </a>
                </dd>
              </div>
            </dl>

            {/* Opening hours with a live open/closed badge */}
            <div>
              <div className="flex items-center gap-3">
                <span className="label">{company.ui.hoursLabel}</span>
                {status ? (
                  <span
                    className={`inline-flex items-center gap-1.5 font-display text-[0.7rem] uppercase tracking-label ${
                      status.open ? 'text-emerald-400' : 'text-accent/50'
                    }`}
                  >
                    <span
                      aria-hidden
                      className={`h-1.5 w-1.5 rounded-full ${
                        status.open ? 'bg-emerald-400' : 'bg-accent/40'
                      }`}
                    />
                    {status.open ? company.ui.openNow : company.ui.closedNow}
                  </span>
                ) : null}
              </div>
              <dl className="mt-4 max-w-sm space-y-2 text-sm">
                {company.ui.days.map((day, i) => {
                  const h = company.hours[i];
                  const isToday = status?.today === i;
                  return (
                    <div
                      key={day}
                      className={`flex items-baseline justify-between gap-6 ${
                        isToday ? 'font-medium text-white' : 'text-accent/70'
                      }`}
                    >
                      <dt>{day}</dt>
                      <dd className="tabular-nums">
                        {h ? `${h[0]} – ${h[1]}` : company.ui.closedLabel}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>

          {/* Map + directions */}
          <div className="flex flex-col">
            <div className="overflow-hidden border border-accent/15">
              <iframe
                title={`${company.name} — ${company.ui.locationCity}`}
                src={mapSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[340px] w-full border-0 grayscale-[0.3] contrast-[1.05] [color-scheme:light]"
              />
            </div>
            <a
              href={company.contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-4 inline-flex items-center gap-2 self-start font-display text-[0.75rem] uppercase tracking-label text-white underline-offset-4 transition-colors hover:text-accent"
            >
              {company.ui.getDirections}
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-500 ease-precision group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
