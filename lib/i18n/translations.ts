/**
 * Site translations — English, Greek, Russian.
 *
 * Only human-readable copy lives here. Structural / factual data (email, phone,
 * postal address, social links, images, section numbers, statistics) stays in
 * lib/company.ts and is shared unchanged across all locales — see lib/i18n.
 *
 * Place names inside prose are transliterated per script for readability; the
 * structured postal address in lib/company.ts is never translated.
 */

export type UIStrings = {
  heroTitle: string;
  book: string;
  bookSession: string;
  viewServices: string;
  scroll: string;
  heroParagraph: string;
  statsLabel: string;
  statsDisclaimer: string;
  servicesLabel: string;
  servicesHeading1: string;
  servicesHeading2: string;
  servicesIntro: string;
  treatLabel: string;
  treatHeading: string;
  scrollToPan: string;
  next: string;
  notSureLine1: string;
  notSureLine2: string;
  approachLabel: string;
  approachHeading1: string;
  approachHeading2: string;
  step: string;
  whyLabel: string;
  whyHeading: string;
  whyWatermark: string;
  qualifications: string;
  qualificationsNote: string;
  contactLabel: string;
  ctaHeading1: string;
  ctaHeading2: string;
  email: string;
  telephone: string;
  locations: string;
  elsewhere: string;
  rights: string;
  figClinic: string;
  menuOpen: string;
  menuClose: string;
  navPrimary: string;
  home: string;
  clinicRole: string;
  locationCity: string;
  getDirections: string;
  hoursLabel: string;
  openNow: string;
  closedNow: string;
  closedLabel: string;
  days: string[];
  faqLabel: string;
  faqHeading: string;
};

export type Translation = {
  name: string;
  shortName: string;
  profession: string;
  credentials: string;
  tagline: string;
  descriptor: string;
  legalName: string;
  intro: { label: string; heading: string; body: string[] };
  services: { title: string; summary: string; capabilities: string[] }[];
  conditions: string[];
  stats: { label: string }[];
  focusAreas: { title: string; region: string; scope: string }[];
  process: { title: string; body: string }[];
  differentiators: { title: string; body: string }[];
  qualifications: { name: string }[];
  nav: { label: string }[];
  faq: { question: string; answer: string }[];
  ui: UIStrings;
};

const en: Translation = {
  name: 'Anastasis Matsangos',
  shortName: 'Matsangos',
  profession: 'Physiotherapist',
  credentials: 'BSc PT · Orthopedic Manual Therapist (OMT)',
  tagline: 'Precision In Motion.',
  descriptor: 'Physiotherapy & orthopedic manual therapy in Livadia, Larnaca.',
  legalName: 'Anastasis Matsangos Physiotherapy',
  intro: {
    label: 'About',
    heading: 'We treat the cause, not just the symptom.',
    body: [
      'Pain is rarely where the problem starts. As an orthopedic manual therapist, my work begins with a full assessment — how you move, where the load goes, and what is actually driving the symptom — before a single hands-on technique.',
      'Every session is one-on-one, start to finish, with the same therapist who assessed you. Hands-on manual therapy to settle the pain, then progressive exercise so the result holds long after you leave the clinic.',
    ],
  },
  services: [
    {
      title: 'Orthopedic Manual Therapy',
      summary:
        'Hands-on assessment and treatment of joints, muscle and soft tissue — the core of the OMT approach.',
      capabilities: ['Joint assessment', 'Soft-tissue work', 'Mobilisation', 'Manipulation'],
    },
    {
      title: 'Sports Injury Rehabilitation',
      summary:
        'From acute injury to full return-to-sport, with the load and progression a return actually needs.',
      capabilities: ['Acute care', 'Loading programmes', 'Return-to-sport', 'Performance'],
    },
    {
      title: 'Post-Surgical Rehabilitation',
      summary:
        'Structured recovery after orthopedic surgery — restoring range, strength and confidence in stages.',
      capabilities: ['Range of motion', 'Strength', 'Gait re-education', 'Milestones'],
    },
    {
      title: 'Back & Neck Care',
      summary:
        'Assessment and treatment for spinal, back and neck pain — targeting the driver, not just the ache.',
      capabilities: ['Spinal assessment', 'Manual therapy', 'Exercise', 'Ergonomics'],
    },
    {
      title: 'Joint Mobilisation',
      summary:
        'Graded mobilisation to restore movement and reduce pain in stiff or restricted joints.',
      capabilities: ['Graded mobilisation', 'Range restoration', 'Pain relief', 'Hands-on'],
    },
    {
      title: 'Therapeutic Exercise',
      summary:
        'A tailored, progressive exercise plan — because manual therapy relieves, but exercise is what lasts.',
      capabilities: ['Tailored plans', 'Progressive loading', 'Movement quality', 'Home programme'],
    },
    {
      title: 'Posture & Movement Assessment',
      summary:
        'A detailed look at how you stand, move and load — the map the whole treatment plan is built on.',
      capabilities: ['Movement screening', 'Postural analysis', 'Gait', 'Clinical reasoning'],
    },
    {
      title: 'Injury Prevention',
      summary:
        'Screening and conditioning to keep active people — runners, athletes, workers — off the treatment table.',
      capabilities: ['Screening', 'Conditioning', 'Load management', 'Education'],
    },
  ],
  conditions: [
    'Back & Neck Pain',
    'Sports Injuries',
    'Post-Surgery Recovery',
    'Joint & Muscle Pain',
    'Chronic Pain',
    'Posture & Movement',
  ],
  stats: [
    { label: 'Years in practice' },
    { label: 'Sessions delivered' },
    { label: 'One-on-one care' },
    { label: 'Would recommend' },
  ],
  focusAreas: [
    { title: 'Back & Neck Pain', region: 'Spine', scope: 'Manual therapy · Exercise · Ergonomics' },
    {
      title: 'Running & Sports Injuries',
      region: 'Lower limb',
      scope: 'Loading · Gait · Return-to-sport',
    },
    { title: 'Shoulder & Upper Limb', region: 'Shoulder', scope: 'Mobilisation · Strengthening' },
    {
      title: 'Knee & Lower Limb',
      region: 'Knee',
      scope: 'Rehabilitation · Strength · Control',
    },
    {
      title: 'Post-Operative Recovery',
      region: 'Post-surgery',
      scope: 'Range · Strength · Milestones',
    },
  ],
  process: [
    {
      title: 'Assess',
      body: 'A full first session — history, movement screening and hands-on examination. We find out what is actually driving the symptom before we treat anything.',
    },
    {
      title: 'Diagnose',
      body: 'Clinical reasoning turns the findings into a clear picture: what is happening, why it happened, and what recovery will realistically take.',
    },
    {
      title: 'Treat',
      body: 'Hands-on manual therapy to settle pain and restore movement — the OMT techniques that need a trained therapist, not a machine.',
    },
    {
      title: 'Rehabilitate',
      body: 'A progressive exercise plan built around your goals. Manual therapy relieves; loaded exercise is what makes the result last.',
    },
    {
      title: 'Prevent',
      body: 'Once you are moving well, the focus shifts to keeping you there — conditioning, load management and the knowledge to self-manage.',
    },
  ],
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
  qualifications: [
    { name: 'BSc Physiotherapy' },
    { name: 'Orthopedic Manual Therapist (OMT)' },
    { name: 'PLACEHOLDER — Registered Physiotherapist (Cyprus)' },
    { name: 'PLACEHOLDER — additional certification' },
  ],
  nav: [
    { label: 'About' },
    { label: 'Services' },
    { label: 'Focus' },
    { label: 'Approach' },
    { label: 'Contact' },
  ],
  faq: [
    {
      question: 'Do I need a doctor’s referral?',
      answer:
        'No — you can book directly. If a referral or imaging turns out to be useful, we’ll tell you at the assessment.',
    },
    {
      question: 'What happens in the first session?',
      answer:
        'A full assessment: your history, how you move and a hands-on examination — then we begin treatment and set a clear plan together.',
    },
    {
      question: 'How long is each session?',
      answer:
        'Around 45–60 minutes, one-on-one with the same therapist from start to finish.',
    },
    {
      question: 'How many sessions will I need?',
      answer:
        'It depends on the problem. You’ll get a realistic estimate after the first assessment — most people notice a change within a few sessions.',
    },
    {
      question: 'What should I wear?',
      answer:
        'Comfortable clothing you can move in. For some areas we may ask you to expose the region being treated.',
    },
  ],
  ui: {
    heroTitle: 'Physiotherapy center',
    book: 'Book',
    bookSession: 'Book a session',
    viewServices: 'Services',
    scroll: 'Scroll',
    heroParagraph:
      'Physiotherapy & orthopedic manual therapy in Livadia, Larnaca. One-on-one care that finds the cause of your pain — hands-on manual therapy and exercise that gets you moving again.',
    statsLabel: 'By the numbers',
    statsDisclaimer:
      'Indicative figures shown for layout purposes — to be confirmed before publication.',
    servicesLabel: 'Services',
    servicesHeading1: 'Hands-on care.',
    servicesHeading2: 'Start to finish.',
    servicesIntro:
      'Every service below is delivered one-on-one — by the same therapist who assessed you, from first visit to last.',
    treatLabel: 'What we treat',
    treatHeading: 'Where we help most.',
    scrollToPan: 'Scroll to pan →',
    next: 'Next',
    notSureLine1: 'Not sure where',
    notSureLine2: 'you fit? Let’s talk.',
    approachLabel: 'Our approach',
    approachHeading1: 'From first visit',
    approachHeading2: 'to back on your feet.',
    step: 'Step',
    whyLabel: 'Why us',
    whyHeading: 'Hands-on. One-on-one. Every single visit.',
    whyWatermark: 'MOVEMENT',
    qualifications: 'Qualifications',
    qualificationsNote:
      'BSc PT and OMT confirmed; registration details to be verified before publication.',
    contactLabel: 'Contact',
    ctaHeading1: 'Let’s Get',
    ctaHeading2: 'You Moving.',
    email: 'Email',
    telephone: 'Telephone',
    locations: 'Locations',
    elsewhere: 'Elsewhere',
    rights: 'All rights reserved.',
    figClinic: 'Fig. 01 — The clinic',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    navPrimary: 'Primary',
    home: 'home',
    clinicRole: 'Clinic',
    locationCity: 'Livadia, Larnaca',
    getDirections: 'Get directions',
    hoursLabel: 'Hours',
    openNow: 'Open now',
    closedNow: 'Closed now',
    closedLabel: 'Closed',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    faqLabel: 'FAQ',
    faqHeading: 'Questions, answered.',
  },
};

const el: Translation = {
  name: 'Αναστάσης Ματσάγκος',
  shortName: 'Ματσάγκος',
  profession: 'Φυσιοθεραπευτής',
  credentials: 'BSc Φυσιοθεραπείας · Ορθοπεδικός Χειροθεραπευτής (OMT)',
  tagline: 'Ακρίβεια στην κίνηση.',
  descriptor: 'Φυσιοθεραπεία & ορθοπεδική χειροθεραπεία στα Λιβάδια, Λάρνακα.',
  legalName: 'Αναστάσης Ματσάγκος Φυσιοθεραπεία',
  intro: {
    label: 'Σχετικά',
    heading: 'Αντιμετωπίζουμε την αιτία, όχι απλώς το σύμπτωμα.',
    body: [
      'Ο πόνος σπάνια ξεκινά εκεί που τον νιώθετε. Ως ορθοπεδικός χειροθεραπευτής, ξεκινώ πάντα με μια πλήρη αξιολόγηση — πώς κινείστε, πού πέφτει το βάρος, τι πραγματικά προκαλεί το σύμπτωμα — προτού εφαρμόσω την παραμικρή τεχνική.',
      'Κάθε συνεδρία είναι προσωπική, από την αρχή ως το τέλος, με τον ίδιο θεραπευτή που σας εξέτασε. Πρώτα χειροθεραπεία για να ηρεμήσει ο πόνος και μετά σταδιακή άσκηση, ώστε το αποτέλεσμα να κρατήσει πολύ αφότου φύγετε από την κλινική.',
    ],
  },
  services: [
    {
      title: 'Ορθοπεδική Χειροθεραπεία',
      summary:
        'Πρακτική αξιολόγηση και θεραπεία σε αρθρώσεις, μύες και μαλακούς ιστούς — ο πυρήνας της προσέγγισης OMT.',
      capabilities: ['Αξιολόγηση αρθρώσεων', 'Μαλακοί ιστοί', 'Κινητοποίηση', 'Χειρισμοί'],
    },
    {
      title: 'Αποκατάσταση Αθλητικών Τραυματισμών',
      summary:
        'Από τον οξύ τραυματισμό μέχρι την πλήρη επιστροφή στον αθλητισμό — με τη φόρτιση και τη σταδιακή πρόοδο που χρειάζεται πραγματικά μια επιστροφή.',
      capabilities: ['Οξεία φάση', 'Προγράμματα φόρτισης', 'Επιστροφή στον αθλητισμό', 'Απόδοση'],
    },
    {
      title: 'Μετεγχειρητική Αποκατάσταση',
      summary:
        'Οργανωμένη ανάρρωση μετά από ορθοπεδική επέμβαση — σταδιακή επαναφορά του εύρους, της δύναμης και της αυτοπεποίθησης.',
      capabilities: ['Εύρος κίνησης', 'Δύναμη', 'Επανεκπαίδευση βάδισης', 'Ορόσημα'],
    },
    {
      title: 'Φροντίδα Μέσης & Αυχένα',
      summary:
        'Αξιολόγηση και θεραπεία για πόνο στη μέση, τον αυχένα και τη σπονδυλική στήλη — με στόχο την αιτία, όχι απλώς τον πόνο.',
      capabilities: ['Αξιολόγηση σπονδυλικής στήλης', 'Χειροθεραπεία', 'Άσκηση', 'Εργονομία'],
    },
    {
      title: 'Κινητοποίηση Αρθρώσεων',
      summary:
        'Διαβαθμισμένη κινητοποίηση για να επανέλθει η κίνηση και να μειωθεί ο πόνος σε δύσκαμπτες ή περιορισμένες αρθρώσεις.',
      capabilities: ['Διαβαθμισμένη κινητοποίηση', 'Επαναφορά εύρους', 'Ανακούφιση πόνου', 'Πρακτική θεραπεία'],
    },
    {
      title: 'Θεραπευτική Άσκηση',
      summary:
        'Ένα εξατομικευμένο, σταδιακό πρόγραμμα άσκησης — γιατί η χειροθεραπεία ανακουφίζει, όμως η άσκηση είναι αυτή που διαρκεί.',
      capabilities: ['Εξατομικευμένα πλάνα', 'Σταδιακή φόρτιση', 'Ποιότητα κίνησης', 'Πρόγραμμα για το σπίτι'],
    },
    {
      title: 'Αξιολόγηση Στάσης & Κίνησης',
      summary:
        'Μια αναλυτική ματιά στο πώς στέκεστε, κινείστε και φορτίζετε το σώμα σας — ο χάρτης πάνω στον οποίο χτίζεται όλο το πλάνο θεραπείας.',
      capabilities: ['Έλεγχος κίνησης', 'Ανάλυση στάσης', 'Βάδιση', 'Κλινική σκέψη'],
    },
    {
      title: 'Πρόληψη Τραυματισμών',
      summary:
        'Έλεγχος και ενδυνάμωση που κρατούν τους δραστήριους ανθρώπους — δρομείς, αθλητές, εργαζόμενους — μακριά από το κρεβάτι της θεραπείας.',
      capabilities: ['Έλεγχος', 'Ενδυνάμωση', 'Διαχείριση φορτίου', 'Ενημέρωση'],
    },
  ],
  conditions: [
    'Πόνος σε μέση & αυχένα',
    'Αθλητικοί τραυματισμοί',
    'Ανάρρωση μετά από χειρουργείο',
    'Πόνος σε αρθρώσεις & μύες',
    'Χρόνιος πόνος',
    'Στάση & κίνηση',
  ],
  stats: [
    { label: 'Χρόνια εμπειρίας' },
    { label: 'Συνεδρίες' },
    { label: 'Ατομική φροντίδα' },
    { label: 'Θα μας σύστηναν' },
  ],
  focusAreas: [
    {
      title: 'Πόνος σε μέση & αυχένα',
      region: 'Σπονδυλική στήλη',
      scope: 'Χειροθεραπεία · Άσκηση · Εργονομία',
    },
    {
      title: 'Τρέξιμο & αθλητικοί τραυματισμοί',
      region: 'Κάτω άκρα',
      scope: 'Φόρτιση · Βάδιση · Επιστροφή στον αθλητισμό',
    },
    { title: 'Ώμος & άνω άκρο', region: 'Ώμος', scope: 'Κινητοποίηση · Ενδυνάμωση' },
    {
      title: 'Γόνατο & κάτω άκρο',
      region: 'Γόνατο',
      scope: 'Αποκατάσταση · Δύναμη · Έλεγχος',
    },
    {
      title: 'Ανάρρωση μετά από χειρουργείο',
      region: 'Μετεγχειρητικά',
      scope: 'Εύρος · Δύναμη · Ορόσημα',
    },
  ],
  process: [
    {
      title: 'Αξιολόγηση',
      body: 'Μια ολοκληρωμένη πρώτη συνεδρία — ιστορικό, έλεγχος κίνησης και πρακτική εξέταση. Βρίσκουμε τι πραγματικά προκαλεί το σύμπτωμα προτού ξεκινήσουμε οποιαδήποτε θεραπεία.',
    },
    {
      title: 'Διάγνωση',
      body: 'Η κλινική σκέψη μετατρέπει τα ευρήματα σε καθαρή εικόνα: τι συμβαίνει, γιατί συνέβη και πόσο χρόνο θα χρειαστεί ρεαλιστικά η ανάρρωση.',
    },
    {
      title: 'Θεραπεία',
      body: 'Χειροθεραπεία για να υποχωρήσει ο πόνος και να επανέλθει η κίνηση — οι τεχνικές OMT που θέλουν εκπαιδευμένα χέρια, όχι μηχάνημα.',
    },
    {
      title: 'Αποκατάσταση',
      body: 'Ένα σταδιακό πρόγραμμα άσκησης, φτιαγμένο γύρω από τους δικούς σας στόχους. Η χειροθεραπεία ανακουφίζει· η άσκηση με φορτίο είναι αυτή που κρατάει το αποτέλεσμα.',
    },
    {
      title: 'Πρόληψη',
      body: 'Μόλις κινείστε ξανά καλά, ο στόχος αλλάζει: να μείνετε εκεί — ενδυνάμωση, διαχείριση φορτίου και οι γνώσεις για να τα καταφέρνετε μόνοι σας.',
    },
  ],
  differentiators: [
    {
      title: 'Πάντα ατομικά',
      body: 'Κάθε συνεδρία γίνεται με τον Αναστάση, από την αρχή ως το τέλος — ποτέ με βοηθό, ποτέ διπλά ραντεβού.',
    },
    {
      title: 'Εκπαιδευμένα χέρια',
      body: 'Η Ορθοπεδική Χειροθεραπεία είναι τίτλος σπουδών, όχι λέξη-κλειδί. Η θεραπεία γίνεται πραγματικά με τα χέρια.',
    },
    {
      title: 'Η αιτία, όχι το σημείο',
      body: 'Αντιμετωπίζουμε αυτό που προκαλεί τον πόνο — και συχνά δεν βρίσκεται εκεί που τον νιώθετε. Αυτό είναι που τον κρατάει μακριά.',
    },
    {
      title: 'Ανάρρωση μέσα από την άσκηση',
      body: 'Η παθητική θεραπεία ανακουφίζει· η ενεργητική αποκατάσταση είναι που κρατάει. Φεύγετε με ένα πλάνο, όχι με εξάρτηση.',
    },
  ],
  qualifications: [
    { name: 'BSc Φυσιοθεραπείας' },
    { name: 'Ορθοπεδικός Χειροθεραπευτής (OMT)' },
    { name: 'PLACEHOLDER — Εγγεγραμμένος Φυσιοθεραπευτής (Κύπρος)' },
    { name: 'PLACEHOLDER — επιπλέον πιστοποίηση' },
  ],
  nav: [
    { label: 'Σχετικά' },
    { label: 'Υπηρεσίες' },
    { label: 'Τομείς' },
    { label: 'Προσέγγιση' },
    { label: 'Επικοινωνία' },
  ],
  faq: [
    {
      question: 'Χρειάζομαι παραπεμπτικό από γιατρό;',
      answer:
        'Όχι — μπορείτε να κλείσετε ραντεβού απευθείας. Αν χρειαστεί παραπεμπτικό ή απεικόνιση, θα σας το πούμε στην αξιολόγηση.',
    },
    {
      question: 'Τι γίνεται στην πρώτη συνεδρία;',
      answer:
        'Μια πλήρης αξιολόγηση: ιστορικό, πώς κινείστε και πρακτική εξέταση — και μετά ξεκινάμε τη θεραπεία και ορίζουμε μαζί ένα ξεκάθαρο πλάνο.',
    },
    {
      question: 'Πόσο διαρκεί κάθε συνεδρία;',
      answer:
        'Περίπου 45–60 λεπτά, προσωπικά με τον ίδιο θεραπευτή από την αρχή ως το τέλος.',
    },
    {
      question: 'Πόσες συνεδρίες θα χρειαστώ;',
      answer:
        'Εξαρτάται από το πρόβλημα. Θα έχετε μια ρεαλιστική εκτίμηση μετά την πρώτη αξιολόγηση — οι περισσότεροι νιώθουν διαφορά μέσα σε λίγες συνεδρίες.',
    },
    {
      question: 'Τι να φορέσω;',
      answer:
        'Άνετα ρούχα που σας επιτρέπουν να κινείστε. Για ορισμένες περιοχές ίσως σας ζητήσουμε να αφήσετε ακάλυπτο το σημείο που θα δουλέψουμε.',
    },
  ],
  ui: {
    heroTitle: 'Κέντρο Φυσιοθεραπείας',
    book: 'Ραντεβού',
    bookSession: 'Κλείστε ραντεβού',
    viewServices: 'Υπηρεσίες',
    scroll: 'Κύλιση',
    heroParagraph:
      'Φυσιοθεραπεία & ορθοπεδική χειροθεραπεία στα Λιβάδια, Λάρνακα. Ατομική φροντίδα που εντοπίζει την αιτία του πόνου σας — χειροθεραπεία και άσκηση που σας ξαναβάζουν σε κίνηση.',
    statsLabel: 'Με αριθμούς',
    statsDisclaimer:
      'Ενδεικτικά στοιχεία για τους σκοπούς της παρουσίασης — προς επιβεβαίωση πριν τη δημοσίευση.',
    servicesLabel: 'Υπηρεσίες',
    servicesHeading1: 'Φροντίδα,',
    servicesHeading2: 'από την αρχή ως το τέλος.',
    servicesIntro:
      'Κάθε υπηρεσία παρακάτω γίνεται ατομικά — από τον ίδιο θεραπευτή που σας εξέτασε, από την πρώτη ως την τελευταία επίσκεψη.',
    treatLabel: 'Τι αντιμετωπίζουμε',
    treatHeading: 'Εκεί που βοηθάμε πιο συχνά.',
    scrollToPan: 'Κυλήστε για περιήγηση →',
    next: 'Επόμενο',
    notSureLine1: 'Δεν είστε σίγουροι',
    notSureLine2: 'τι χρειάζεστε; Ας τα πούμε.',
    approachLabel: 'Η προσέγγισή μας',
    approachHeading1: 'Από την πρώτη επίσκεψη',
    approachHeading2: 'μέχρι να σταθείτε ξανά στα πόδια σας.',
    step: 'Βήμα',
    whyLabel: 'Γιατί εμείς',
    whyHeading: 'Πρακτική θεραπεία. Προσωπική φροντίδα. Σε κάθε επίσκεψη.',
    whyWatermark: 'ΚΙΝΗΣΗ',
    qualifications: 'Προσόντα',
    qualificationsNote:
      'BSc Φυσιοθεραπείας και OMT επιβεβαιωμένα· τα στοιχεία εγγραφής προς επαλήθευση πριν τη δημοσίευση.',
    contactLabel: 'Επικοινωνία',
    ctaHeading1: 'Σας βάζουμε ξανά',
    ctaHeading2: 'στην κίνηση.',
    email: 'Email',
    telephone: 'Τηλέφωνο',
    locations: 'Πού θα μας βρείτε',
    elsewhere: 'Ακολουθήστε μας',
    rights: 'Με επιφύλαξη παντός δικαιώματος.',
    figClinic: 'Εικ. 01 — Η κλινική',
    menuOpen: 'Άνοιγμα μενού',
    menuClose: 'Κλείσιμο μενού',
    navPrimary: 'Κύριο μενού',
    home: 'αρχική',
    clinicRole: 'Κλινική',
    locationCity: 'Λιβάδια, Λάρνακα',
    getDirections: 'Οδηγίες πρόσβασης',
    hoursLabel: 'Ωράριο',
    openNow: 'Ανοιχτά τώρα',
    closedNow: 'Κλειστά τώρα',
    closedLabel: 'Κλειστά',
    days: ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'],
    faqLabel: 'Συχνές ερωτήσεις',
    faqHeading: 'Απαντήσεις στις απορίες σας.',
  },
};

const ru: Translation = {
  name: 'Анастасис Мацангос',
  shortName: 'Мацангос',
  profession: 'Физиотерапевт',
  credentials: 'BSc физиотерапии · Ортопедический мануальный терапевт (OMT)',
  tagline: 'Точность в движении.',
  descriptor: 'Физиотерапия и ортопедическая мануальная терапия в Ливадии, Ларнака.',
  legalName: 'Анастасис Мацангос Физиотерапия',
  intro: {
    label: 'О нас',
    heading: 'Лечим причину, а не только симптом.',
    body: [
      'Боль редко возникает там, где вы её чувствуете. Как ортопедический мануальный терапевт, я всегда начинаю с полного осмотра — как вы двигаетесь, куда уходит нагрузка и что на самом деле вызывает симптом, — прежде чем применить хоть одну технику.',
      'Каждый сеанс проходит один на один, от начала до конца, с тем же специалистом, который вас осматривал. Сначала мануальная терапия, чтобы унять боль, затем постепенные упражнения — чтобы результат сохранялся надолго после того, как вы уйдёте из клиники.',
    ],
  },
  services: [
    {
      title: 'Ортопедическая мануальная терапия',
      summary:
        'Ручная диагностика и лечение суставов, мышц и мягких тканей — основа подхода OMT.',
      capabilities: ['Оценка суставов', 'Мягкие ткани', 'Мобилизация', 'Манипуляции'],
    },
    {
      title: 'Реабилитация спортивных травм',
      summary:
        'От острой травмы до полного возвращения в спорт — с нагрузкой и постепенностью, которые действительно нужны для возвращения.',
      capabilities: ['Острая фаза', 'Программы нагрузки', 'Возвращение в спорт', 'Форма'],
    },
    {
      title: 'Послеоперационная реабилитация',
      summary:
        'Продуманное восстановление после ортопедической операции — постепенно возвращаем амплитуду, силу и уверенность.',
      capabilities: ['Амплитуда движений', 'Сила', 'Восстановление походки', 'Этапы'],
    },
    {
      title: 'Спина и шея',
      summary:
        'Диагностика и лечение боли в спине, шее и позвоночнике — работаем с причиной, а не только с болью.',
      capabilities: ['Оценка позвоночника', 'Мануальная терапия', 'Упражнения', 'Эргономика'],
    },
    {
      title: 'Мобилизация суставов',
      summary:
        'Дозированная мобилизация, чтобы вернуть движение и снять боль в тугих или ограниченных суставах.',
      capabilities: ['Дозированная мобилизация', 'Возврат амплитуды', 'Снятие боли', 'Ручная работа'],
    },
    {
      title: 'Лечебная физкультура',
      summary:
        'Индивидуальная программа упражнений с постепенным усложнением — ведь мануальная терапия облегчает, но именно упражнения дают стойкий результат.',
      capabilities: ['Индивидуальные планы', 'Постепенная нагрузка', 'Качество движения', 'Программа для дома'],
    },
    {
      title: 'Оценка осанки и движения',
      summary:
        'Подробный разбор того, как вы стоите, двигаетесь и нагружаете тело, — карта, по которой строится весь план лечения.',
      capabilities: ['Скрининг движения', 'Анализ осанки', 'Походка', 'Клиническое мышление'],
    },
    {
      title: 'Профилактика травм',
      summary:
        'Скрининг и укрепление, чтобы активные люди — бегуны, спортсмены, те, кто много работает, — не оказывались на кушетке.',
      capabilities: ['Скрининг', 'Укрепление', 'Контроль нагрузки', 'Рекомендации'],
    },
  ],
  conditions: [
    'Боль в спине и шее',
    'Спортивные травмы',
    'Восстановление после операции',
    'Боль в суставах и мышцах',
    'Хроническая боль',
    'Осанка и движение',
  ],
  stats: [
    { label: 'Лет в практике' },
    { label: 'Проведённых сеансов' },
    { label: 'Индивидуальный подход' },
    { label: 'Рекомендуют нас' },
  ],
  focusAreas: [
    {
      title: 'Боль в спине и шее',
      region: 'Позвоночник',
      scope: 'Мануальная терапия · Упражнения · Эргономика',
    },
    {
      title: 'Бег и спортивные травмы',
      region: 'Нижние конечности',
      scope: 'Нагрузка · Походка · Возврат в спорт',
    },
    { title: 'Травмы руки', region: 'Плечо', scope: 'Мобилизация · Укрепление' },
    {
      title: 'Боли в ногах',
      region: 'Колено',
      scope: 'Реабилитация · Сила · Контроль',
    },
    {
      title: 'Восстановление после операции',
      region: 'После операции',
      scope: 'Амплитуда · Сила · Этапы',
    },
  ],
  process: [
    {
      title: 'Оценка',
      body: 'Полноценный первый сеанс — история, скрининг движения и ручной осмотр. Выясняем, что на самом деле вызывает симптом, прежде чем что-либо лечить.',
    },
    {
      title: 'Диагностика',
      body: 'Клиническое мышление превращает находки в ясную картину: что происходит, почему это случилось и сколько на самом деле займёт восстановление.',
    },
    {
      title: 'Лечение',
      body: 'Мануальная терапия, чтобы снять боль и вернуть движение, — техники OMT, которым нужны обученные руки, а не аппарат.',
    },
    {
      title: 'Реабилитация',
      body: 'Постепенная программа упражнений под ваши цели. Мануальная терапия облегчает; упражнения с нагрузкой закрепляют результат.',
    },
    {
      title: 'Профилактика',
      body: 'Когда вы снова двигаетесь свободно, задача меняется — удержать результат: укрепление, контроль нагрузки и знания, чтобы справляться самому.',
    },
  ],
  differentiators: [
    {
      title: 'Всегда один на один',
      body: 'Каждый сеанс — с Анастасисом, от начала до конца. Никаких ассистентов и двойных записей.',
    },
    {
      title: 'Работаю руками',
      body: 'Ортопедическая мануальная терапия — это квалификация, а не громкое слово. Лечение действительно ручное.',
    },
    {
      title: 'Причина, а не место боли',
      body: 'Мы работаем с тем, что вызывает боль, — а это часто не там, где вы её чувствуете. Именно поэтому она не возвращается.',
    },
    {
      title: 'Восстановление через движение',
      body: 'Пассивное лечение приятно; активная реабилитация держит результат. Вы уходите с планом, а не с зависимостью.',
    },
  ],
  qualifications: [
    { name: 'BSc физиотерапии' },
    { name: 'Ортопедический мануальный терапевт (OMT)' },
    { name: 'PLACEHOLDER — Зарегистрированный физиотерапевт (Кипр)' },
    { name: 'PLACEHOLDER — дополнительная сертификация' },
  ],
  nav: [
    { label: 'О нас' },
    { label: 'Услуги' },
    { label: 'Направления' },
    { label: 'Подход' },
    { label: 'Контакты' },
  ],
  faq: [
    {
      question: 'Нужно ли направление от врача?',
      answer:
        'Нет — вы можете записаться напрямую. Если понадобится направление или снимки, мы скажем об этом на осмотре.',
    },
    {
      question: 'Что происходит на первом приёме?',
      answer:
        'Полная оценка: анамнез, как вы двигаетесь, и ручной осмотр — затем начинаем лечение и вместе составляем понятный план.',
    },
    {
      question: 'Сколько длится один сеанс?',
      answer:
        'Около 45–60 минут, один на один с тем же специалистом от начала до конца.',
    },
    {
      question: 'Сколько сеансов понадобится?',
      answer:
        'Зависит от проблемы. Реалистичную оценку вы получите после первого осмотра — большинство чувствует изменения уже за несколько сеансов.',
    },
    {
      question: 'Что надеть?',
      answer:
        'Удобную одежду, в которой легко двигаться. Для некоторых зон мы можем попросить освободить участок, с которым будем работать.',
    },
  ],
  ui: {
    heroTitle: 'Центр физиотерапии',
    book: 'Записаться',
    bookSession: 'Записаться на приём',
    viewServices: 'Услуги',
    scroll: 'Листайте',
    heroParagraph:
      'Физиотерапия и ортопедическая мануальная терапия в Ливадии, Ларнака. Индивидуальный приём, на котором находим причину вашей боли, — мануальная терапия и упражнения, которые снова возвращают вас в движение.',
    statsLabel: 'В цифрах',
    statsDisclaimer:
      'Цифры приведены для примера оформления — уточняются перед публикацией.',
    servicesLabel: 'Услуги',
    servicesHeading1: 'Лечение руками.',
    servicesHeading2: 'От начала до конца.',
    servicesIntro:
      'Каждая услуга ниже — это работа один на один с тем же специалистом, который вас осматривал, от первого визита до последнего.',
    treatLabel: 'Что мы лечим',
    treatHeading: 'Где мы помогаем чаще всего.',
    scrollToPan: 'Листайте для просмотра →',
    next: 'Далее',
    notSureLine1: 'Не знаете, что',
    notSureLine2: 'вам подойдёт? Давайте обсудим.',
    approachLabel: 'Наш подход',
    approachHeading1: 'От первого визита',
    approachHeading2: 'до возвращения на ноги.',
    step: 'Шаг',
    whyLabel: 'Почему мы',
    whyHeading: 'Руками. Один на один. Каждый визит.',
    whyWatermark: 'ДВИЖЕНИЕ',
    qualifications: 'Квалификация',
    qualificationsNote:
      'BSc физиотерапии и OMT подтверждены; регистрационные данные уточняются перед публикацией.',
    contactLabel: 'Контакты',
    ctaHeading1: 'Пора',
    ctaHeading2: 'снова двигаться.',
    email: 'Эл. почта',
    telephone: 'Телефон',
    locations: 'Адреса',
    elsewhere: 'Мы в соцсетях',
    rights: 'Все права защищены.',
    figClinic: 'Рис. 01 — Клиника',
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню',
    navPrimary: 'Главное меню',
    home: 'главная',
    clinicRole: 'Клиника',
    locationCity: 'Ливадиа, Ларнака',
    getDirections: 'Как добраться',
    hoursLabel: 'Часы работы',
    openNow: 'Открыто сейчас',
    closedNow: 'Закрыто сейчас',
    closedLabel: 'Закрыто',
    days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    faqLabel: 'Частые вопросы',
    faqHeading: 'Ответы на ваши вопросы.',
  },
};

export const TRANSLATIONS = { en, el, ru };
