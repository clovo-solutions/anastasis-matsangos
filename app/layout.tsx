import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import { company } from '@/lib/company';
import { SmoothScroll } from '@/components/SmoothScroll';
import { Providers } from '@/components/Providers';
import './globals.css';

/**
 * Display: Space Grotesk — mechanical, slightly odd, holds up at 13rem.
 * Body: Inter — recedes, which is the job.
 * Both self-hosted via next/font: no render-blocking request, no CLS.
 */
const display = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const body = Inter({
  // Cyrillic + Greek so Russian and Greek copy render in the body face rather
  // than falling back to system-ui.
  subsets: ['latin', 'cyrillic', 'greek'],
  variable: '--font-body',
  display: 'swap',
});

const title = `${company.name} — Physiotherapy & Orthopedic Manual Therapy`;
const description =
  'Physiotherapy and orthopedic manual therapy (OMT) in Λιβάδια, Λάρνακα. One-on-one, hands-on care for back and neck pain, sports injuries, post-surgery recovery and more.';

export const metadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: title,
    template: `%s — ${company.name}`,
  },
  description,
  applicationName: company.name,
  keywords: [
    'physiotherapy Larnaca',
    'physiotherapy Livadia',
    'φυσιοθεραπεία Λάρνακα',
    'φυσιοθεραπευτής Λιβάδια',
    'orthopedic manual therapy',
    'OMT',
    'sports injury rehabilitation',
    'back pain physiotherapy',
    'post-surgery rehabilitation',
    'manual therapy Cyprus',
  ],
  authors: [{ name: company.name }],
  creator: company.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: company.url,
    siteName: company.name,
    title,
    description,
    locale: 'en',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'Health',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F8FA' },
    { media: '(prefers-color-scheme: dark)', color: '#0E1624' },
  ],
  width: 'device-width',
  initialScale: 1,
};

/**
 * Physiotherapy / MedicalBusiness schema.
 *
 * NOTE: address, telephone, email and sameAs are wired to lib/company.ts, which
 * currently holds PLACEHOLDER values. Structured data asserts facts to search
 * engines and can surface in health panels — do not deploy until those are real
 * and the credentials are confirmed. See README.md.
 */
function PhysiotherapyJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'Physiotherapy'],
    '@id': `${company.url}/#physiotherapy`,
    name: company.name,
    legalName: company.legalName,
    url: company.url,
    description,
    medicalSpecialty: 'Physiotherapy',
    foundingDate: String(company.founded),
    email: company.contact.email,
    telephone: company.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.contact.address.street,
      addressLocality: company.contact.address.city,
      addressRegion: company.contact.address.region,
      postalCode: company.contact.address.postalCode,
      addressCountry: company.contact.address.country,
    },
    areaServed: [company.contact.address.city, company.contact.address.region, 'Cyprus'],
    sameAs: company.social.map((s) => s.href),
    knowsAbout: company.conditions,
    // The practitioner, with the credentials supplied in the brief.
    employee: {
      '@type': 'Person',
      name: company.name,
      jobTitle: company.profession,
      hasCredential: company.qualifications
        .filter((q) => q.detail === 'VERIFIED')
        .map((q) => ({ '@type': 'EducationalOccupationalCredential', name: q.name })),
    },
    availableService: company.services.map((s) => ({
      '@type': 'MedicalTherapy',
      name: s.title,
      description: s.summary,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Serialised from a local literal, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-navy focus:px-5 focus:py-3 focus:font-display focus:text-sm focus:uppercase focus:tracking-label focus:text-white"
        >
          Skip to content
        </a>
        <Providers>
          <SmoothScroll>{children}</SmoothScroll>
        </Providers>
        <PhysiotherapyJsonLd />
      </body>
    </html>
  );
}
