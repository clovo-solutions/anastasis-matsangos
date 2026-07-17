'use client';

import { ArrowUpRight } from 'lucide-react';
import { useContent } from '@/lib/i18n';

/**
 * Footer.
 *
 * No motion here by design. After the CTA, restraint reads as confidence.
 */
export function Footer() {
  const company = useContent();
  const year = new Date().getFullYear();

  return (
    <footer data-nav="dark" className="on-dark relative overflow-hidden bg-obsidian pt-24 text-white">
      <div className="relative edge">
        <div className="grid gap-12 pb-20 md:grid-cols-4">
          <div className="md:col-span-2">
            {/* legalName already terminates in "Ltd." — don't add a second period. */}
            <p className="max-w-xs text-sm text-accent/70">
              {company.legalName} {company.descriptor}
            </p>
          </div>

          <div>
            <span className="label">{company.ui.locations}</span>
            <address className="mt-5 space-y-1 text-sm not-italic text-accent/70">
              <span className="block text-accent/60">{company.ui.clinicRole}</span>
              <span className="block">{company.contact.address.street}</span>
              <span className="block">
                {company.contact.address.city}, {company.contact.address.country}
              </span>
            </address>
            <a
              href={company.contact.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex items-center gap-2 font-display text-[0.75rem] uppercase tracking-label text-white underline-offset-4 transition-colors hover:text-accent"
            >
              {company.ui.getDirections}
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-500 ease-precision group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <div>
            <span className="label">{company.ui.elsewhere}</span>
            <ul className="mt-5 space-y-3">
              {company.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent/70 underline-offset-4 transition-colors hover:text-white hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-accent/10 py-8 md:flex-row md:items-center md:justify-between">
          <span className="text-xs text-accent/60">
            © {year} {company.legalName} {company.ui.rights}
          </span>
          <span className="text-xs text-accent/60">{company.ui.locationCity}</span>
        </div>
      </div>
    </footer>
  );
}
