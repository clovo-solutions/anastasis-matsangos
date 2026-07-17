'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { company } from '@/lib/company';
import { TRANSLATIONS, type Translation } from './translations';

export const LOCALES = ['en', 'el', 'ru'] as const;
export type Locale = (typeof LOCALES)[number];

/** Two-letter switcher labels. Greek uses ΕΛ so it reads native. */
export const LOCALE_LABELS: Record<Locale, string> = { en: 'EN', el: 'ΕΛ', ru: 'RU' };

const STORAGE_KEY = 'locale';

/**
 * Merge the locale's copy onto the shared structural data. Everything factual —
 * email, phone, postal address, social links, images, section numbers, stats
 * values — comes straight from lib/company.ts and is identical across locales;
 * only the text fields are replaced.
 */
function build(t: Translation) {
  return {
    ...company,
    name: t.name,
    shortName: t.shortName,
    profession: t.profession,
    credentials: t.credentials,
    tagline: t.tagline,
    descriptor: t.descriptor,
    legalName: t.legalName,
    intro: { ...company.intro, label: t.intro.label, heading: t.intro.heading, body: t.intro.body },
    services: company.services.map((s, i) => ({
      ...s,
      title: t.services[i].title,
      summary: t.services[i].summary,
      capabilities: t.services[i].capabilities,
    })),
    conditions: t.conditions,
    stats: company.stats.map((s, i) => ({ ...s, label: t.stats[i].label })),
    focusAreas: company.focusAreas.map((f, i) => ({
      ...f,
      title: t.focusAreas[i].title,
      region: t.focusAreas[i].region,
      scope: t.focusAreas[i].scope,
    })),
    process: company.process.map((p, i) => ({
      ...p,
      title: t.process[i].title,
      body: t.process[i].body,
    })),
    differentiators: company.differentiators.map((d, i) => ({
      ...d,
      title: t.differentiators[i].title,
      body: t.differentiators[i].body,
    })),
    qualifications: company.qualifications.map((q, i) => ({ ...q, name: t.qualifications[i].name })),
    nav: company.nav.map((n, i) => ({ ...n, label: t.nav[i].label })),
    ui: t.ui,
  };
}

const CONTENT: Record<Locale, ReturnType<typeof build>> = {
  en: build(TRANSLATIONS.en),
  el: build(TRANSLATIONS.el),
  ru: build(TRANSLATIONS.ru),
};

export type Content = ReturnType<typeof build>;

type LanguageContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  content: Content;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // SSR always renders English; the stored preference is applied on mount to
  // avoid a hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && (LOCALES as readonly string[]).includes(saved)) setLocaleState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* private mode / storage disabled — preference just won't persist */
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, content: CONTENT[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}

/** Convenience for components that only need the localized copy. */
export function useContent() {
  return useLanguage().content;
}
