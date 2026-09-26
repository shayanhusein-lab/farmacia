/**
 * All FARMACIA landing-page copy and data lives here.
 * Sections import from this file; never inline copy in JSX.
 */

export const palette = {
  blue: "#0047AB",
  blueDeep: "#062E78",
  orange: "#E94E26",
  orangeSoft: "#F58A3C",
  sun: "#FFC64E",
  sky: "#86C9F2",
  lime: "#A3E44E",
  pink: "#E26A78",
  pinkSoft: "#F9B6C0",
  peach: "#F6B79B",
  sand: "#EBD39E",
  ink: "#231F1C",
  white: "#FFFFFF",
  lemon: "#FFF07A",
} as const;

export const site = {
  name: "FARMACIA",
  faculty: "Faculty of Pharmacy & Pharmaceutical Sciences",
  university: "University of Karachi",
  description:
    "A digital home for pharmacy stories, e-magazines, ideas, achievements, and memories.",
  tagline: "Read. Discover. Remember.",
};

export const nav = {
  links: [
    { href: "#about", label: "About" },
    { href: "#issue", label: "Issue 01" },
    { href: "#human", label: "The Human Side" },
    { href: "#team", label: "Team" },
  ],
  cta: { href: "#contribute", label: "Share your story" },
};

export const hero = {
  titleLead: "Pharmacy, ",
  titleHighlight: "beyond the pages.",
  lede: "A digital home for pharmacy stories, e-magazines, ideas, achievements and memories. Written by students, faculty and alumni, and kept for whoever opens it next.",
  primaryCta: { href: "#issue", label: "Explore Issue 01" },
  secondaryCta: { href: "#about", label: "What is FARMACIA?" },
  cover: {
    issue: "ISSUE 01",
    theme: "Where our journey begins",
    ariaLabel: "Cover of FARMACIA Issue 01, Where Our Journey Begins",
  },
  stickies: [
    { text: "Every student has a journey worth telling", color: "pink" as const },
    { text: "60 pages. 8 chapters. 1 faculty.", color: "lime" as const },
  ],
  dragHint: "drag us around",
};

export const marquee = {
  words: [
    { word: "Stories", color: palette.sun },
    { word: "Ideas", color: palette.sky },
    { word: "People", color: palette.lime },
    { word: "Pharmacy", color: palette.orange },
    { word: "Read", color: palette.pink },
    { word: "Discover", color: palette.sun },
    { word: "Remember", color: palette.sky },
  ],
};

export type WhatIcon = "book" | "mic" | "camera" | "tablet";

export const whatIs = {
  tag: "What is FARMACIA?",
  title: "More than an online pile of articles.",
  intro:
    "FARMACIA turns the faculty magazine into a digital experience. Every issue lives beyond its printed pages, so readers can find past editions, revisit stories and meet new voices.",
  cards: [
    {
      icon: "book" as WhatIcon,
      title: "A collection of stories",
      body: "Experiences, perspectives, interviews, ideas and achievements, brought together in one publication.",
      bg: palette.sun,
      tilt: -2,
    },
    {
      icon: "mic" as WhatIcon,
      title: "A platform for voices",
      body: "Students, faculty, alumni and researchers get a space to share their ideas, journeys and wins.",
      bg: palette.sky,
      tilt: 1.5,
    },
    {
      icon: "camera" as WhatIcon,
      title: "A record of memories",
      body: "Every issue joins a growing archive of the moments, milestones and people that shape the faculty.",
      bg: palette.peach,
      tilt: -1,
    },
    {
      icon: "tablet" as WhatIcon,
      title: "A digital magazine",
      body: "Read a complete issue cover to cover, or jump straight to a single story and share it.",
      bg: palette.lime,
      tilt: 2,
    },
  ],
};

export const missionVision = {
  chips: [
    { label: "Voices for everyone", color: palette.orange },
    { label: "Preserve every issue", color: palette.blue },
    { label: "Celebrate milestones", color: palette.lime },
    { label: "Student & alumni journeys", color: palette.sun },
    { label: "Science & innovation", color: palette.pink },
    { label: "Creativity & lifestyle", color: palette.blue },
  ],
  mission:
    "To collect, preserve and showcase the stories, achievements and experiences of our Faculty for generations to come.",
  vision:
    "To build a lasting magazine that grows with our Faculty and becomes a treasured record of its journey.",
};

export const stats = [
  { value: 60, label: "pages in the first issue", color: "text-orange" },
  { value: 8, label: "chapters, one journey", color: "text-blue" },
  { value: 7, label: "teams building it", color: "text-lime-deep" },
  { value: 1, label: "faculty, told from the inside", color: "text-pink" },
];

export const issue = {
  tag: "Issue 01 · The 60-page concept",
  title: "A 60-page journey through our faculty.",
  theme: "Theme: Where Our Journey Begins",
  hint: "scroll sideways →",
  intro: {
    eyebrow: "Table of contents",
    title: "Eight chapters. Read in order, or jump in anywhere.",
    body: "Each chapter is one piece of the puzzle. Together they show the faculty beyond classrooms, laboratories and examinations.",
  },
  outro: {
    eyebrow: "Then what?",
    title: "Issue 01 goes into the archive. Issue 02 starts with you.",
    cta: { href: "#contribute", label: "Pitch a story" },
  },
  chapters: [
    {
      num: "01",
      title: "Faculty & Pharmacy",
      quip: "where our journey begins",
      color: palette.lime,
      topics: [
        "Introduction to the Faculty",
        "Departments & academic life",
        "Pharmacy education",
        "Pharmaceutical discoveries",
        "New molecules",
        "Career possibilities",
      ],
    },
    {
      num: "02",
      title: "Interviews",
      quip: "pull up a chair",
      color: palette.sky,
      topics: [
        "Faculty conversations",
        "Alumni in the field",
        "Professional insights",
        "Advice for the next batch",
      ],
    },
    {
      num: "03",
      title: "Alumni Stories",
      quip: "the journey doesn't end at graduation",
      color: palette.sun,
      topics: ["Careers", "Paths after university", "Achievements", "What pharmacy can offer"],
    },
    {
      num: "04",
      title: "Student Stories",
      quip: "every student has a journey worth telling",
      color: palette.pink,
      topics: [
        "Challenges",
        "Lessons learned",
        "Campus life",
        "Personal growth",
        "Dreams & aspirations",
      ],
    },
    {
      num: "05",
      title: "Achievements",
      quip: "they deserve to be remembered",
      color: palette.orange,
      topics: ["Awards", "Competitions", "Publications", "Research", "Leadership", "Community work"],
    },
    {
      num: "06",
      title: "Creativity & Lifestyle",
      quip: "pharmacy is more than academics",
      color: palette.sky,
      topics: ["Photography", "Artwork", "Creative writing", "Poetry", "Design"],
    },
    {
      num: "07",
      title: "Human Stories",
      quip: "behind every achievement is a person",
      color: palette.lime,
      topics: ["Experiences", "Challenges", "Moments", "The people behind the names"],
    },
    {
      num: "08",
      title: "Memories & Closing",
      quip: "some moments deserve to stay",
      color: palette.sun,
      topics: ["Events", "Milestones", "Gatherings", "Celebrations"],
    },
  ],
};

export const humanSide = {
  tag: "The human side",
  title: "What should readers feel?",
  lead: "When someone opens this magazine, we don't want them to simply think:",
  notThis: "“This is informative.”",
  closing: "Information can be read. Stories can be remembered.",
  quotes: [
    {
      quote: "“That's me.”",
      detail: "A reader sees their own year, their own struggle, on the page.",
      bg: palette.lemon,
      pin: palette.blue,
      tilt: -3,
    },
    {
      quote: "“I remember that.”",
      detail: "An old event, a lab day, a face from four years ago.",
      bg: palette.sky,
      pin: palette.orange,
      tilt: 2.5,
    },
    {
      quote: "“I never knew this about them.”",
      detail: "The professor who paints. The senior who started over.",
      bg: palette.lime,
      pin: palette.orange,
      tilt: -1.5,
    },
    {
      quote: "“I want to read the next page.”",
      detail: "Stories that pull you forward.",
      bg: palette.pinkSoft,
      pin: palette.orange,
      tilt: 3,
    },
    {
      quote: "“I'm proud to be part of this faculty.”",
      bg: palette.white,
      pin: palette.blue,
      tilt: -2,
      wide: true,
    },
  ],
};

export const journey = {
  eyebrow: "The FARMACIA experience",
  title: "One continuous read, not a pile of pages.",
  sub: "Readers drift from the homepage into a featured story, open the issue, then follow a related piece back through the archive.",
  stops: [
    { label: "Home", detail: "Latest issue and featured stories", color: palette.sun },
    { label: "Featured", detail: "The story everyone is talking about", color: palette.orangeSoft },
    { label: "Issue", detail: "The full magazine, cover to cover", color: palette.orange },
    { label: "Article", detail: "One story, read on its own", color: palette.pink },
    { label: "Related", detail: "More from the same people or topic", color: palette.sky },
    { label: "Past issue", detail: "What happened the year before", color: palette.lime },
    { label: "Archive", detail: "Every chapter, kept", color: palette.sun },
  ],
};

export const audience = {
  tag: "Who it's for",
  title: "A seat at the table for everyone.",
  intro: "Anyone curious about pharmacy, science, education and the people behind the field.",
  items: [
    { title: "Students", body: "Read, contribute, and find your own story in someone else's.", piece: palette.sun, hover: palette.sun },
    { title: "Faculty", body: "Share perspectives, experiences, advice and ideas.", piece: palette.sky, hover: palette.sky },
    { title: "Alumni", body: "Revisit memories, share where the road went, stay connected.", piece: palette.lime, hover: palette.lime },
    { title: "Researchers", body: "Put discoveries and pharmaceutical innovation in front of readers.", piece: palette.orange, hover: palette.peach },
    { title: "Professionals", body: "Tell the field what practice actually looks like.", piece: palette.pink, hover: palette.pinkSoft },
    { title: "Readers", body: "Anyone who likes a good story with some science in it.", piece: palette.blue, hover: palette.sand },
  ],
};

export type TeamLead = {
  name: string;
  slug: string;
  initials: string;
  role: string;
  color: string;
};

export const team = {
  tag: "The people behind it",
  title: "Seven teams, one puzzle.",
  intro: "Planning, researching, shooting, designing and chasing sponsors, so every page lands.",
  patrons: [
    { role: "Chief Patron", name: "Dr Haris Shoib", chief: true },
    { role: "Patron", name: "Dr Sana Sarfaraz", chief: false },
    { role: "Patron", name: "Dr Tazeen Husain", chief: false },
  ],
  leads: [
    { name: "Alishba Warsi", slug: "alishba-warsi", initials: "AW", role: "Team Editorial", color: palette.sky },
    { name: "Ayesha Imran", slug: "ayesha-imran", initials: "AI", role: "Team Research", color: palette.sun },
    { name: "Laiba Asif", slug: "laiba-asif", initials: "LA", role: "Team Media", color: palette.pink },
    { name: "Hajra", slug: "hajra", initials: "H", role: "Team Graphics", color: palette.lime },
    { name: "Ammar", slug: "ammar", initials: "A", role: "Team Photography", color: palette.sky },
    { name: "Alishba Raza", slug: "alishba-raza", initials: "AR", role: "Team Corporate", color: palette.orange },
    { name: "Abdullah", slug: "abdullah", initials: "A", role: "Team Logistics", color: palette.sun },
  ] satisfies TeamLead[],
  /** Inserted after this many leads in the polaroid grid */
  quoteAfter: 2,
  quote: "Professional overthinkers who turn “just a small article” into 17 tabs and a deadline.",
  footnote:
    "Corporate & Logistics: they find sponsors, chase confirmations, and chase people who don't reply.",
};

export const contribute = {
  tag: "Contribute",
  title: "Every contributor becomes part of the story.",
  body: "Write, shoot, draw, or just tell us something worth keeping. The editorial team will help shape it into a page.",
  chips: [
    { label: "Students", color: palette.sun },
    { label: "Faculty", color: palette.sky },
    { label: "Alumni", color: palette.lime },
    { label: "Researchers", color: palette.orange },
    { label: "Writers", color: palette.pink },
    { label: "Photographers", color: palette.blue },
    { label: "Designers", color: palette.sun },
    { label: "Guest contributors", color: palette.sky },
  ],
  form: {
    title: "Pitch a story",
    nameLabel: "Your name",
    namePlaceholder: "Ayesha Khan",
    typeLabel: "What are you sharing?",
    types: [
      "A student story",
      "An alumni journey",
      "An achievement",
      "Research or a discovery",
      "Photography or artwork",
      "A memory",
    ] as const,
    ideaLabel: "In one line",
    ideaPlaceholder: "The night before our first pharmacology viva",
    submit: "Send pitch",
    success: "Got it. The editorial team will be in touch.",
    toast: "Pitch sent! Thanks for adding a piece to the puzzle.",
  },
};

export const footer = {
  quoteLead: "Information can be read, but ",
  quoteEm: "stories can be remembered.",
};
