'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useContent } from '@/lib/i18n';
import { AnimatedLogoMark } from '@/components/AnimatedLogo';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { EASE } from '@/lib/motion';

/**
 * Nav.
 *
 * Transparent over the hero, then glass once scrolled. The logo's two halves
 * pinch together on scroll — a small restatement of the hero's alignment idea,
 * cheap enough to run on every frame because it is one transform per half.
 *
 * The page alternates light and dark by design, so a fixed light bar turns to
 * grey mud the moment it crosses a dark section. The nav therefore samples what
 * is behind it and inverts. Sections opt in with `data-nav="dark"`.
 */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const [open, setOpen] = useState(false);
  const company = useContent();

  useEffect(() => {
    // Read layout in one pass per scroll frame, then write once — no thrash.
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const band = 40; // sample line through the middle of the nav
      const dark = document.querySelectorAll<HTMLElement>('[data-nav="dark"]');
      let hit = false;
      dark.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= band && r.bottom >= band) hit = true;
      });
      setOnDark(hit);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page when the mobile sheet is open.
  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', open);
    return () => document.documentElement.classList.remove('lenis-stopped');
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        data-theme={onDark ? 'dark' : 'light'}
        className={`group/nav fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-precision ${
          scrolled
            ? onDark
              ? 'border-b border-accent/10 bg-ink/60 backdrop-blur-xl'
              : 'border-b border-graphite/10 bg-paper/70 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav
          className="flex items-center justify-between edge py-4"
          aria-label={company.ui.navPrimary}
        >
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label={`${company.name} — ${company.ui.home}`}
          >
            <span className="relative block h-8 w-8">
              <motion.span
                animate={{ x: scrolled ? 0 : -2 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="absolute inset-0 block"
              >
                <AnimatedLogoMark
                  className="h-8 w-8"
                  leftColor={onDark ? '#C8D4E8' : undefined}
                  rightColor={onDark ? '#FFFFFF' : undefined}
                />
              </motion.span>
            </span>
            <span
              className={`font-display text-sm font-medium uppercase tracking-[0.14em] transition-colors duration-500 ${
                onDark ? 'text-white' : 'text-ink'
              }`}
            >
              {company.shortName}
            </span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {company.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`group relative block py-1 font-display text-[0.8125rem] uppercase tracking-[0.14em] transition-colors duration-300 ${
                    onDark ? 'text-accent/60 hover:text-white' : 'text-graphite hover:text-ink'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-precision group-hover:origin-left group-hover:scale-x-100 ${
                      onDark ? 'bg-accent' : 'bg-navy'
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <LanguageSwitcher onDark={onDark} />

            <button
              type="button"
              data-cal-namespace="assessment"
              data-cal-link="clovo-solutions-7teskm"
              data-cal-config='{"layout":"month_view"}'
              className={`hidden px-5 py-2.5 font-display text-[0.75rem] uppercase tracking-label transition-colors duration-500 ease-precision md:inline-block ${
                onDark ? 'bg-white text-obsidian hover:bg-accent' : 'bg-ink text-white hover:bg-navy'
              }`}
            >
              {company.ui.book}
            </button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className="md:hidden"
              aria-label={company.ui.menuOpen}
              aria-expanded={open}
            >
              <Menu
                className={`h-6 w-6 transition-colors duration-500 ${onDark ? 'text-white' : 'text-ink'}`}
                aria-hidden
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="on-dark fixed inset-0 z-[60] bg-ink text-white md:hidden"
          >
            <div className="flex items-center justify-between edge py-4">
              <span className="font-display text-sm uppercase tracking-[0.14em]">
                {company.shortName}
              </span>
              <button type="button" onClick={() => setOpen(false)} aria-label={company.ui.menuClose}>
                <X className="h-6 w-6" aria-hidden />
              </button>
            </div>
            <div className="edge mt-4">
              <LanguageSwitcher onDark />
            </div>
            <ul className="mt-6 flex flex-col edge">
              {company.nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.06 }}
                  className="border-b border-accent/15"
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-6 font-display text-giant font-medium tracking-tightest"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
