'use client';

import { LOCALES, LOCALE_LABELS, useLanguage } from '@/lib/i18n';

/**
 * Language switcher — EN / ΕΛ / RU.
 *
 * `onDark` inverts the palette so it stays legible over both the light bar and
 * the dark sections the nav crosses.
 */
export function LanguageSwitcher({ onDark = false }: { onDark?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-1 font-display text-[0.7rem] uppercase tracking-label"
    >
      {LOCALES.map((l, i) => {
        const activeCls = onDark ? 'text-white' : 'text-ink';
        const idleCls = onDark
          ? 'text-accent/45 hover:text-white'
          : 'text-graphite/50 hover:text-ink';
        return (
          <span key={l} className="flex items-center">
            {i > 0 ? (
              <span aria-hidden className={onDark ? 'text-accent/25' : 'text-graphite/25'}>
                /
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={`px-1.5 py-1 transition-colors duration-300 ${
                locale === l ? activeCls : idleCls
              }`}
            >
              {LOCALE_LABELS[l]}
            </button>
          </span>
        );
      })}
    </div>
  );
}
