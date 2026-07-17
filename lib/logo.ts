/**
 * Logo geometry — the origin of the whole visual language.
 *
 * The mark is the letter "A" (for Αναστάσης) split into two halves on the
 * vertical centre line:
 *
 *   · LEFT  — a clean blade in clinical navy.
 *   · RIGHT — its mirror, darker.
 *
 * The split reads as balance and symmetry — the two sides of the body a
 * physiotherapist works to bring back into alignment. The blade diagonal and
 * the crossbar recur across the site as rule angles and dividers; the motion
 * dial below (a goniometer-style tick ring — the tool a physio uses to measure
 * range of motion in degrees) is the rotating background motif. Everything is
 * computed from the constants below, so the motifs stay in sync with the mark
 * if the mark is ever tuned.
 *
 * Canvas: 100 × 100 viewBox.
 */

const APEX = { x: 50, y: 6 };
const OUTER_L = { x: 4, y: 94 };
const OUTER_R = { x: 96, y: 94 };
const INNER_L = { x: 30, y: 94 };
const INNER_R = { x: 70, y: 94 };
const CROTCH = { x: 50, y: 32 };

type Pt = { x: number; y: number };

const fmt = (p: Pt) => `${round(p.x)} ${round(p.y)}`;
const round = (n: number) => Math.round(n * 1000) / 1000;

/** Left half: apex → outer bottom-left → inner bottom-left → crotch. */
export const LEFT_BLADE = [
  `M ${fmt(APEX)}`,
  `L ${fmt(OUTER_L)}`,
  `L ${fmt(INNER_L)}`,
  `L ${fmt(CROTCH)}`,
  'Z',
].join(' ');

/** Right half: apex → outer bottom-right → inner bottom-right → crotch. */
export const RIGHT_BLADE = [
  `M ${fmt(APEX)}`,
  `L ${fmt(OUTER_R)}`,
  `L ${fmt(INNER_R)}`,
  `L ${fmt(CROTCH)}`,
  'Z',
].join(' ');

/**
 * Crossbar — the A's horizontal, split on the same centre line as the blades so
 * the two halves separate as clean units.
 */
export const CROSSBAR_L = 'M 34 68 L 50 68 L 50 79 L 34 79 Z';
export const CROSSBAR_R = 'M 50 68 L 66 68 L 66 79 L 50 79 Z';

/** The blade's diagonal, in degrees from vertical. Reused as the site's rule angle. */
export const BLADE_ANGLE = round(
  (Math.atan2(OUTER_R.x - APEX.x, OUTER_R.y - APEX.y) * 180) / Math.PI,
);

/**
 * Motion dial — a goniometer-style ring of radial tick marks, longer every
 * fifth tick, like the degree scale a physiotherapist reads range of motion
 * from. Used as the slowly rotating background motif; the ticks make the
 * rotation legible where a plain circle would look static.
 *
 * Returns a path of disconnected tick strokes (multiple M/L pairs). Draw the
 * companion circles in the component.
 */
export function motionDial(ticks = 24, r = 40, len = 6): string {
  const step = (Math.PI * 2) / ticks;
  let d = '';
  for (let i = 0; i < ticks; i++) {
    const a = i * step - Math.PI / 2;
    const long = i % 5 === 0;
    const inner = r - (long ? len : len * 0.5);
    const p = (rad: number) =>
      `${round(50 + Math.cos(a) * rad)} ${round(50 + Math.sin(a) * rad)}`;
    d += `M ${p(inner)} L ${p(r)} `;
  }
  return d.trim();
}
