# Αναστάσης Ματσάγκος — Physiotherapy

Single-page site for a physiotherapy & orthopedic manual therapy (OMT) practice
in Λιβάδια, Λάρνακα.

Next.js 14 (App Router) · TypeScript · Tailwind · Framer Motion · GSAP · Lenis.

```bash
npm ci             # exact install from the lockfile (see "Troubleshooting")
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

---

## ⚠️ Do not deploy until this list is cleared

This is a **healthcare** site. The design, motion and architecture are finished.
**The content is not.** Verified from the brief: the name, profession,
credentials (BSc PT, OMT), location (Λιβάδια, Λάρνακα) and email. Everything else
in `lib/company.ts` is invented scaffolding.

Publishing unverified clinical figures, invented patient testimonials, or
unconfirmed registrations under a real clinician's name is a legal, regulatory
and professional-conduct exposure — not just a content gap.

| # | Item | Where | Risk if shipped |
|---|------|-------|-----------------|
| 1 | **Statistics** — 10+ years, 5000+ sessions, 100% one-on-one, 98% would recommend | `company.stats` | Unverifiable clinical/outcome claims. The "would recommend" figure needs a real, documented patient survey. "100% one-on-one" is only publishable if literally true. |
| 2 | **Testimonials** — quotes and attributions | `company.testimonials` | **Highest risk.** Invented. A fabricated patient quote is both defamatory and a breach of patient confidentiality. Use real, written-consent testimonials or delete the section. |
| 3 | **Qualifications** beyond BSc PT / OMT | `company.qualifications` | BSc PT and OMT are confirmed. The two extra rows (registration, additional cert) are placeholders — **claiming a registration not held is regulatory fraud.** Confirm registration numbers or remove. |
| 4 | **Services** | `company.services` | A plausible OMT scope, but confirm each line reflects what Anastasis actually offers. |
| 5 | **Focus areas** | `company.focusAreas` | Representative categories, not real patient cases. |
| 6 | **Phone number** | `company.contact.phone` | Placeholder `+357 00 000000`. Feeds the CTA `tel:` link and the schema. |
| 7 | **Street address / postal code** | `company.contact.address` | Placeholders. City/region (Λιβάδια, Λάρνακα) are real; street and postcode are not. Feed the JSON-LD `PostalAddress`. |
| 8 | **Social links** | `company.social` | Point at bare instagram.com / facebook.com. |
| 9 | **Domain** | `company.url` | `example-matsangos-physio.com` — feeds canonical URL, sitemap, robots, OG tags. **Set this first.** |
| 10 | **Founding year** | `company.founded` | Guessed (2016). Shown in the schema. |
| 11 | **Imagery** | `img()` in `lib/company.ts` | Unsplash stock. Each is subject-matched, but shows **other clinicians and other patients** — never present them as Anastasis's practice or real patients. Replace with first-party photography (with patient consent), then drop the `remotePatterns` entry in `next.config.mjs`. |

Two placeholder disclaimers render **on the page itself** — under the stats and
under the qualifications — so the site can't be shown and mistaken for finished.
Delete those lines when the real content lands (`components/Stats.tsx` and
`components/WhyUs.tsx`).

Everything is typed, so deleting a field from `lib/company.ts` surfaces as a
compile error rather than an empty element.

### Language

The brand name and location render in Greek (Αναστάσης Ματσάγκος, Λιβάδια,
Λάρνακα); the interface copy is English, matching how the credentials were given
(BSc PT, OMT). If a fully Greek or bilingual site is wanted, the copy lives in
`lib/company.ts` and the section components — `lang="en"` in `app/layout.tsx`
would change with it.

---

## Architecture

```
app/
  layout.tsx           fonts, metadata, Physiotherapy/MedicalBusiness JSON-LD, skip link
  page.tsx             section order (the light/dark rhythm lives here)
  opengraph-image.tsx  1200×630 OG card, generated at the edge from the logo
  icon.tsx             favicon, same geometry
  robots.ts sitemap.ts
lib/
  company.ts           ← single source of truth. Every section reads this.
  logo.ts              logo geometry, computed. Origin of the design language.
  motion.ts            the shared motion vocabulary (two curves, no more)
  hooks.ts             reduced-motion / touch / mounted
components/
  SmoothScroll.tsx     Lenis + GSAP on one RAF loop; MotionConfig
  Nav Hero Overview Stats Services Projects Process WhyUs CTA Footer
  primitives.tsx       RevealText, MaskLine, Counter, Magnetic, Parallax
  Logo.tsx
```

### The logo drives the design

`lib/logo.ts` computes the mark rather than hard-coding path data: the letter
"Α" (for Αναστάσης) split on its vertical centre line into two clean halves. The
split reads as **balance and symmetry** — the two sides of the body a physio
works to realign. The rotating background motif is a **goniometer-style motion
dial** (`motionDial`) — the degree scale a physiotherapist reads range of motion
from. The hero draws the mark and converges its halves (assessment → alignment →
recovery); the CTA restates the convergence; the footer uses it as a cropped
watermark.

> Heritage note: this codebase began as an industrial-engineering template whose
> mark had gear teeth. Those were removed for the health brand. If you see any
> lingering "gear"/"engineering" wording in a comment, it's vestigial.

### Motion & accessibility

- Two easing curves total; transform/opacity only (no layout animation).
- Lenis + ScrollTrigger share one RAF loop.
- `prefers-reduced-motion` is honoured in three layers (Lenis disabled, the
  horizontal gallery becomes a normal scroller, `MotionConfig reducedMotion`).
- **Mask-reveal trap:** the scroll trigger must sit on the *clipping* wrapper,
  never the translated child — a child at `y:110%` is outside its own
  `overflow-hidden` box, so it never enters view and stays invisible forever.
  See the note in `MaskLine` (`components/primitives.tsx`).

---

## Troubleshooting

**`Cannot find module 'react'` or missing `.next/server`/CSS at build or run.**
This template's install can end up partial (a `node_modules` with ~342 entries
but a missing `.bin/next`, or a build that compiles then fails writing a
manifest). Two causes seen during development:

1. **A nearly-full disk** — Next can't flush `.next/server`. Free space first.
2. **Concurrent `next` processes** — a lingering `next start`/`next dev` racing a
   `next build` clobbers `.next`. Kill them all first.

Reliable reset:

```bash
pkill -f next                      # stop every next process
rm -rf .next node_modules
npm ci                             # exact lockfile install (more reliable than `npm install`)
npm run build
```

Run only one `next` process at a time.
