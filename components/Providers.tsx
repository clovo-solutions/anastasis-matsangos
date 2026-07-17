'use client';

import { LanguageProvider } from '@/lib/i18n';

/** Client providers wrapping the whole app (currently just language). */
export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
