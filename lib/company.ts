/**
 * SINGLE SOURCE OF TRUTH
 *
 * Every section of the site consumes this file. Nothing renders hard-coded copy.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * PLACEHOLDER AUDIT — read before launch. See README.md for the full checklist.
 *
 * VERIFIED (supplied by the client):
 *   - name, profession, credentials (BSc PT, OMT), location, email
 *
 * PLACEHOLDER (invented for layout; MUST be replaced before the site is public):
 *   - every value marked `PLACEHOLDER` below
 *   - all statistics, testimonials, projects/focus areas
 *   - phone number, street address, postal code, registration details
 *   - social links, domain, founding year
 *   - all imagery (Unsplash stock — see note on the `img` helper)
 *
 * This is a healthcare site. Publishing unverified statistics, invented patient
 * testimonials, or unconfirmed clinical claims is a legal, regulatory and
 * reputational exposure — not just a content gap.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Service = {
  id: string;
  index: string;
  title: string;
  summary: string;
  capabilities: string[];
  image: string;
};

export type FocusArea = {
  id: string;
  title: string;
  region: string;
  scope: string;
  image: string;
};

export type Stat = {
  value: number;
  suffix: string;
  label: string;
  detail: string;
};

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

/**
 * PLACEHOLDER IMAGERY.
 *
 * Unsplash stock, each still checked to match the section it sits in. These are
 * stand-ins: they show other clinicians and other patients, so they must not be
 * presented as Anastasis's own practice or real patients. Replace with
 * first-party photography (with patient consent) before launch — see README.md.
 */
const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const company = {
  name: 'Αναστάσης Ματσάγκος',
  shortName: 'Ματσάγκος',
  initial: 'Α',
  /** PLACEHOLDER — set the registered practice name if one exists. */
  legalName: 'Αναστάσης Ματσάγκος Physiotherapy',
  profession: 'Physiotherapist',
  /** VERIFIED — supplied by the client. */
  credentials: 'BSc PT · Orthopedic Manual Therapist (OMT)',
  tagline: 'Precision In Motion.',
  descriptor: 'Physiotherapy & orthopedic manual therapy in Λιβάδια, Λάρνακα.',
  /** PLACEHOLDER — replace with the real registered domain. */
  url: 'https://www.example-matsangos-physio.com',
  /** PLACEHOLDER — year practice began. */
  founded: 2016,

  intro: {
    label: 'About',
    number: '01',
    heading: 'We treat the cause, not just the symptom.',
    body: [
      /** PLACEHOLDER copy — written to demonstrate tone and layout. */
      'Pain is rarely where the problem starts. As an orthopedic manual therapist, my work begins with a full assessment — how you move, where the load goes, and what is actually driving the symptom — before a single hands-on technique.',
      'Every session is one-on-one, start to finish, with the same therapist who assessed you. Hands-on manual therapy to settle the pain, then progressive exercise so the result holds long after you leave the clinic.',
    ],
    image: img('1645005512968-0c1fe99f0093'),
  },

  /**
   * PLACEHOLDER service list — a plausible scope for a BSc physiotherapist and
   * orthopedic manual therapist. Confirm each line reflects what Anastasis
   * actually offers before launch.
   */
  services: [
    {
      id: 'manual-therapy',
      index: '01',
      title: 'Orthopedic Manual Therapy',
      summary:
        'Hands-on assessment and treatment of joints, muscle and soft tissue — the core of the OMT approach.',
      capabilities: ['Joint assessment', 'Soft-tissue work', 'Mobilisation', 'Manipulation'],
      image: img('1617952986600-802f965dcdbc'),
    },
    {
      id: 'sports-rehab',
      index: '02',
      title: 'Sports Injury Rehabilitation',
      summary:
        'From acute injury to full return-to-sport, with the load and progression a return actually needs.',
      capabilities: ['Acute care', 'Loading programmes', 'Return-to-sport', 'Performance'],
      image: img('1706353399656-210cca727a33'),
    },
    {
      id: 'post-surgical',
      index: '03',
      title: 'Post-Surgical Rehabilitation',
      summary:
        'Structured recovery after orthopedic surgery — restoring range, strength and confidence in stages.',
      capabilities: ['Range of motion', 'Strength', 'Gait re-education', 'Milestones'],
      image: img('1770012905139-713758ded6ec'),
    },
    {
      id: 'spine-care',
      index: '04',
      title: 'Back & Neck Care',
      summary:
        'Assessment and treatment for spinal, back and neck pain — targeting the driver, not just the ache.',
      capabilities: ['Spinal assessment', 'Manual therapy', 'Exercise', 'Ergonomics'],
      image: img('1519824145371-296894a0daa9'),
    },
    {
      id: 'joint-mobilisation',
      index: '05',
      title: 'Joint Mobilisation',
      summary:
        'Graded mobilisation to restore movement and reduce pain in stiff or restricted joints.',
      capabilities: ['Graded mobilisation', 'Range restoration', 'Pain relief', 'Hands-on'],
      image: img('1648638810948-f3bf2cccdde9'),
    },
    {
      id: 'therapeutic-exercise',
      index: '06',
      title: 'Therapeutic Exercise',
      summary:
        'A tailored, progressive exercise plan — because manual therapy relieves, but exercise is what lasts.',
      capabilities: ['Tailored plans', 'Progressive loading', 'Movement quality', 'Home programme'],
      image: img('1758875569423-e9d43652b0a9'),
    },
    {
      id: 'posture-assessment',
      index: '07',
      title: 'Posture & Movement Assessment',
      summary:
        'A detailed look at how you stand, move and load — the map the whole treatment plan is built on.',
      capabilities: ['Movement screening', 'Postural analysis', 'Gait', 'Clinical reasoning'],
      image: img('1764314189421-1858e027bba2'),
    },
    {
      id: 'injury-prevention',
      index: '08',
      title: 'Injury Prevention',
      summary:
        'Screening and conditioning to keep active people — runners, athletes, workers — off the treatment table.',
      capabilities: ['Screening', 'Conditioning', 'Load management', 'Education'],
      image: img('1590333748338-d629e4564ad9'),
    },
  ] satisfies Service[],

  /** PLACEHOLDER — confirm these reflect the actual caseload. */
  conditions: [
    'Back & Neck Pain',
    'Sports Injuries',
    'Post-Surgery Recovery',
    'Joint & Muscle Pain',
    'Chronic Pain',
    'Posture & Movement',
  ],

  /**
   * PLACEHOLDER — do not publish every figure below is invented.
   * Confirm against real records before this renders publicly.
   */
  stats: [
    { value: 10, suffix: '+', label: 'Years in practice', detail: 'PLACEHOLDER — confirm' },
    { value: 5000, suffix: '+', label: 'Sessions delivered', detail: 'PLACEHOLDER — confirm' },
    {
      value: 100,
      suffix: '%',
      label: 'One-on-one care',
      detail: 'PLACEHOLDER — true only if every session is 1:1; confirm before publishing',
    },
    {
      value: 98,
      suffix: '%',
      label: 'Would recommend',
      detail: 'PLACEHOLDER — requires a real, documented patient survey to publish',
    },
  ] satisfies Stat[],

  /** PLACEHOLDER — representative focus areas, not real patient case studies. */
  focusAreas: [
    {
      id: 'f-01',
      title: 'Back & Neck Pain',
      region: 'Spine',
      scope: 'Manual therapy · Exercise · Ergonomics',
      image: img('1639162906614-0603b0ae95fd'),
    },
    {
      id: 'f-02',
      title: 'Running & Sports Injuries',
      region: 'Lower limb',
      scope: 'Loading · Gait · Return-to-sport',
      image: img('1744060204728-f68e434a3edf'),
    },
    {
      id: 'f-03',
      title: 'Shoulder & Upper Limb',
      region: 'Shoulder',
      scope: 'Mobilisation · Strengthening',
      image: img('1645005512845-e6a21492ee29'),
    },
    {
      id: 'f-04',
      title: 'Knee & Lower Limb',
      region: 'Knee',
      scope: 'Rehabilitation · Strength · Control',
      image: img('1706806594828-318b9185ad0e'),
    },
    {
      id: 'f-05',
      title: 'Post-Operative Recovery',
      region: 'Post-surgery',
      scope: 'Range · Strength · Milestones',
      image: img('1699523229212-c25a2fadeb12'),
    },
  ] satisfies FocusArea[],

  process: [
    {
      index: '01',
      title: 'Assess',
      body: 'A full first session — history, movement screening and hands-on examination. We find out what is actually driving the symptom before we treat anything.',
    },
    {
      index: '02',
      title: 'Diagnose',
      body: 'Clinical reasoning turns the findings into a clear picture: what is happening, why it happened, and what recovery will realistically take.',
    },
    {
      index: '03',
      title: 'Treat',
      body: 'Hands-on manual therapy to settle pain and restore movement — the OMT techniques that need a trained therapist, not a machine.',
    },
    {
      index: '04',
      title: 'Rehabilitate',
      body: 'A progressive exercise plan built around your goals. Manual therapy relieves; loaded exercise is what makes the result last.',
    },
    {
      index: '05',
      title: 'Prevent',
      body: 'Once you are moving well, the focus shifts to keeping you there — conditioning, load management and the knowledge to self-manage.',
    },
  ] satisfies ProcessStep[],

  differentiators: [
    {
      title: 'One-on-one, always',
      body: 'Every session is with Anastasis, start to finish — never handed to an assistant, never double-booked.',
    },
    {
      title: 'Hands-on by training',
      body: 'Orthopedic Manual Therapy is a qualification, not a buzzword. The treatment is genuinely hands-on.',
    },
    {
      title: 'The cause, not the spot',
      body: 'We treat what is driving the pain, which is often not where you feel it. That is what stops it coming back.',
    },
    {
      title: 'Exercise-led recovery',
      body: 'Passive treatment feels good; active rehabilitation is what holds. You leave with a plan, not a dependency.',
    },
  ],

  /**
   * PLACEHOLDER — these people and quotes are invented.
   * Publishing an invented quote attributed to a patient is both defamatory and
   * a breach of patient confidentiality. Replace with real, written-consent
   * testimonials or delete the section entirely.
   */
  testimonials: [
    {
      quote:
        'Six months of back pain and two sessions in I finally understood why. The exercises did the rest.',
      author: 'PLACEHOLDER NAME',
      role: 'PLACEHOLDER — e.g. runner, office worker',
    },
    {
      quote: 'Got me back on the pitch after my knee surgery — properly, not just cleared to play.',
      author: 'PLACEHOLDER NAME',
      role: 'PLACEHOLDER',
    },
  ] satisfies Testimonial[],

  /**
   * Two entries are VERIFIED from the client's credentials. The rest are
   * PLACEHOLDER — claiming a registration or certification not actually held is
   * regulatory fraud. Confirm registration numbers before this renders.
   */
  qualifications: [
    { name: 'BSc Physiotherapy', detail: 'VERIFIED' },
    { name: 'Orthopedic Manual Therapist (OMT)', detail: 'VERIFIED' },
    { name: 'PLACEHOLDER — Registered Physiotherapist (Cyprus)', detail: 'Confirm registration no.' },
    { name: 'PLACEHOLDER — additional certification', detail: 'Confirm before publishing' },
  ],

  contact: {
    /** VERIFIED — supplied by the client. */
    email: 'matsangos.a.physio@gmail.com',
    /** VERIFIED — supplied by the client. */
    phone: '+357 99 797907',
    address: {
      /** VERIFIED — supplied by the client. */
      street: 'Zinonos Kitieos, Stelios Court 6',
      city: 'Larnaca',
      region: 'Larnaca',
      postalCode: 'PLACEHOLDER',
      country: 'Cyprus',
    },
    /** VERIFIED — Google Maps directions link supplied by the client. */
    directionsUrl: 'https://maps.app.goo.gl/HDsxk8xJMLtKmVbb7',
  },

  /**
   * Opening hours — VERIFIED, supplied by the client. Monday-first (index 0 =
   * Monday … 6 = Sunday); [open, close] in 24h local time, or null when closed.
   * Cyprus timezone (Asia/Nicosia) drives the live "open now" indicator.
   */
  timezone: 'Asia/Nicosia',
  hours: [
    ['08:00', '19:00'],
    ['08:00', '19:00'],
    ['08:00', '19:00'],
    ['08:00', '19:00'],
    ['08:00', '19:00'],
    ['09:00', '13:00'],
    null,
  ] as (readonly [string, string] | null)[],

  /** VERIFIED area; role labels are descriptive. */
  locations: [{ city: 'Λιβάδια, Λάρνακα', role: 'Clinic' }],

  /** PLACEHOLDER — none of these links resolve yet. */
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'Facebook', href: 'https://www.facebook.com/' },
  ],

  nav: [
    { label: 'About', href: '#overview' },
    { label: 'Services', href: '#services' },
    { label: 'Focus', href: '#work' },
    { label: 'Approach', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
} as const;

export type Company = typeof company;
