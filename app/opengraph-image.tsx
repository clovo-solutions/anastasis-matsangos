import { ImageResponse } from 'next/og';
import { company } from '@/lib/company';
import { LEFT_BLADE, RIGHT_BLADE, CROSSBAR_L, CROSSBAR_R } from '@/lib/logo';

export const runtime = 'edge';
export const alt = `${company.name} — ${company.descriptor}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * OG card, generated at the edge from the same geometry as the site.
 * Satori supports a subset of CSS — plain flex, no Tailwind, no custom fonts
 * here (the system stack keeps this fast and dependency-free).
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0E1624',
          padding: 72,
          position: 'relative',
        }}
      >
        {/* Engineering grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(to right, rgba(200,212,232,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(200,212,232,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg viewBox="0 0 100 100" width={72} height={72}>
            <path d={LEFT_BLADE} fill="#C8D4E8" />
            <path d={CROSSBAR_L} fill="#C8D4E8" />
            <path d={RIGHT_BLADE} fill="#FFFFFF" />
            <path d={CROSSBAR_R} fill="#FFFFFF" />
          </svg>
          <div
            style={{
              display: 'flex',
              fontSize: 22,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#C8D4E8',
            }}
          >
            {company.name}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 116,
              fontWeight: 700,
              letterSpacing: -4,
              color: '#FFFFFF',
              lineHeight: 1,
            }}
          >
            {company.tagline}
          </div>
          <div style={{ display: 'flex', marginTop: 28, fontSize: 30, color: '#C8D4E8' }}>
            {company.descriptor}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 20,
            color: 'rgba(200,212,232,0.55)',
            borderTop: '1px solid rgba(200,212,232,0.2)',
            paddingTop: 24,
          }}
        >
          <div style={{ display: 'flex' }}>{company.credentials}</div>
          <div style={{ display: 'flex' }}>{company.locations[0].city}</div>
        </div>
      </div>
    ),
    size,
  );
}
