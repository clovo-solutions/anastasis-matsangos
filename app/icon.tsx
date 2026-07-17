import { ImageResponse } from 'next/og';
import { LEFT_BLADE, RIGHT_BLADE, CROSSBAR_L, CROSSBAR_R } from '@/lib/logo';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

/** Favicon, cut from the same geometry as the mark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0E1624',
        }}
      >
        <svg viewBox="0 0 100 100" width={26} height={26}>
          <path d={LEFT_BLADE} fill="#C8D4E8" />
          <path d={CROSSBAR_L} fill="#C8D4E8" />
          <path d={RIGHT_BLADE} fill="#FFFFFF" />
          <path d={CROSSBAR_R} fill="#FFFFFF" />
        </svg>
      </div>
    ),
    size,
  );
}
