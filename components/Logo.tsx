import { LEFT_BLADE, RIGHT_BLADE, CROSSBAR_L, CROSSBAR_R } from '@/lib/logo';

type LogoProps = {
  className?: string;
  /** Solid fill, or line-drawn outline. */
  variant?: 'solid' | 'outline';
  /** Tailwind colour classes for each half — the mark is always two-tone. */
  leftClass?: string;
  rightClass?: string;
  title?: string;
};

/**
 * The mark. Two halves, never one shape — every surface that shows the logo
 * shows the split, because the split is the idea.
 */
export function LogoMark({
  className,
  variant = 'solid',
  leftClass = 'fill-navy',
  rightClass = 'fill-ink',
  title,
}: LogoProps) {
  const outline = variant === 'outline';
  const strokeProps = outline
    ? { fill: 'none', strokeWidth: 1.4, vectorEffect: 'non-scaling-stroke' as const }
    : {};

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <g className={outline ? undefined : leftClass} stroke={outline ? 'currentColor' : undefined}>
        <path d={LEFT_BLADE} {...strokeProps} className={outline ? undefined : leftClass} />
        <path d={CROSSBAR_L} {...strokeProps} className={outline ? undefined : leftClass} />
      </g>
      <g className={outline ? undefined : rightClass} stroke={outline ? 'currentColor' : undefined}>
        <path d={RIGHT_BLADE} {...strokeProps} className={outline ? undefined : rightClass} />
        <path d={CROSSBAR_R} {...strokeProps} className={outline ? undefined : rightClass} />
      </g>
    </svg>
  );
}
