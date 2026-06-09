export type AboutContent = {
  bio_intro: string
  bio_main: string
  bio_secondary: string
}

export type Project = {
  id: string
  title: string
  year: string
  category: string
  description: string
  image?: string
  link?: string
}

export type ExperienceEntry = {
  id: string
  title: string
  place: string
  location: string
  period: string
  bullets: string[]
}

export type EducationEntry = {
  id: string
  degree: string
  school: string
  location: string
  period: string
  note: string
}

export type SkillEntry = {
  id: string
  category: string
  items: string[]
}

export type Interest = {
  id: string
  title: string
  description: string
  photos: string[]
}

export const aboutContent: AboutContent = {
  bio_intro:
    'I am an art historian and gallery professional working across exhibition planning, archival research, and editorial writing.',
  bio_main:
    'Holding an MA in History of Art from the Courtauld Institute of Art (London) and a BA from the University of Pennsylvania (Philadelphia), my research centers on postwar European and Korean abstraction — particularly the material and biographical dimensions of trauma in the work of Alberto Burri, Manolo Millares, and Ha Chong-Hyun.',
  bio_secondary:
    'I have worked with Tina Kim Gallery (Seoul), Victoria Miro (London), and Guildhall Art Gallery (London), contributing to exhibitions, institutional publications, and artist archives across international contexts.',
}

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Ha Chong-Hyun: Conjunctions',
    year: '2026',
    category: 'Editorial',
    description:
      "Proofreading, copy-editing, and artwork fact-checking for a monograph on Ha Chong-Hyun published by Rizzoli New York — the first major English-language survey of the artist's work.",
    image: '/projects/ha-chong-hyun-conjunctions.jpg',
  },
]

export const experience: ExperienceEntry[] = [
  {
    id: 'exp-1',
    title: 'Associate',
    place: 'Tina Kim Gallery',
    location: 'Seoul',
    period: 'Feb 2025 – Jan 2026',
    bullets: [
      'Assisted in exhibition planning for solo presentations of Lee Seung-jio (2025.09) and Kang Suk-ho (2025.11), contributing to Korean and English text writing',
      "Conducted archival research for Lee Shinja's first U.S. solo exhibition Lee Shinja: Drawn with Thread (BAMPFA, Aug 2025), including archive documentation and subtitle translation for the exhibition video",
      'Proofread and fact-checked essays and artwork information for the Ha Chong-Hyun monograph (Rizzoli, forthcoming 2026)',
      'Managed Seoul gallery inventory using Artlogic; coordinated artwork consignment and transport logistics',
      'Provided client support during Frieze Seoul and assisted with art fair week programming',
      'Distributed press releases and exhibition documentation to Korean media outlets including Korea Herald, Art in Culture, and Marie Claire',
    ],
  },
  {
    id: 'exp-2',
    title: 'Staff',
    place: 'Guildhall Art Gallery',
    location: 'London',
    period: 'Nov 2024 – May 2025',
    bullets: [
      'Managed front-of-house reception and art shop operations, handling ticketing and merchandise sales',
      'Conducted collection research related to upcoming exhibition projects, including works by J.M.W. Turner',
    ],
  },
  {
    id: 'exp-3',
    title: 'Invigilator',
    place: 'Victoria Miro Gallery',
    location: 'London',
    period: 'Sep 2024 – Dec 2024',
    bullets: [
      'Managed gallery check-in and visitor flow using ARTSVP, accommodating up to 800 daily visitors with no recorded complaints',
      'Provided dedicated support for press and VIP events during the Yayoi Kusama exhibition (Sep 2024)',
    ],
  },
  {
    id: 'exp-4',
    title: 'Intern',
    place: 'SOOM Project',
    location: 'Seoul',
    period: 'Dec 2020 – Jul 2021',
    bullets: [
      'Prepared lecture materials for SOOM Academy and Yonsei University art management courses',
      'Assisted in writing artwork placement proposals for exhibitions (London 180 Studios) and commercial spaces (hotels, department stores)',
      'Created virtual exhibition mockups using Adobe Illustrator and Photoshop',
      'Coordinated installation for the Bulgari Colors exhibition',
    ],
  },
  {
    id: 'exp-5',
    title: 'Student Docent',
    place: 'Arthur Ross Gallery, University of Pennsylvania',
    location: 'Philadelphia',
    period: 'Sep 2019 – Mar 2020',
    bullets: [
      'Led guided tours for Jaume Plensa: Talking Continents (2019) and Frankenthaler on Paper 1970–1990 (2020)',
      'Served on the student advisory board, contributing to gallery programming and events',
    ],
  },
]

export const education: EducationEntry[] = [
  {
    id: 'edu-1',
    degree: 'MA, History of Art',
    school: 'Courtauld Institute of Art',
    location: 'London',
    period: '2023 – 2024',
    note: '"The Artists in Pain: The Parallelism of Trauma in the Burlap Paintings of Alberto Burri, Manolo Millares and Ha Chong-Hyun"',
  },
  {
    id: 'edu-2',
    degree: 'BA, History of Art',
    school: 'University of Pennsylvania',
    location: 'Philadelphia',
    period: '2019 – 2023',
    note: '"Julian Schnabel: Breaking as the New Making"',
  },
]

export const skills: SkillEntry[] = [
  {
    id: 'skill-1',
    category: 'Software',
    items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Microsoft Office Suite'],
  },
  {
    id: 'skill-2',
    category: 'Languages',
    items: ['Korean — Native', 'English — Fluent', 'French — C1 (TCF, 2022)'],
  },
  {
    id: 'skill-3',
    category: 'Systems',
    items: ['Artlogic', 'ARTSVP'],
  },
]

export const interests: Interest[] = []
