-- ─────────────────────────────────────────────────────────────────────────────
-- jjooyoi CMS schema
-- Run this in the Supabase SQL editor to set up all tables with seed data.
-- ─────────────────────────────────────────────────────────────────────────────

-- About content (single row, always id = 'main')
create table if not exists about_content (
  id text primary key default 'main',
  bio_intro text not null default '',
  bio_main text not null default '',
  bio_secondary text not null default '',
  updated_at timestamptz default now()
);

insert into about_content (id, bio_intro, bio_main, bio_secondary) values (
  'main',
  'I am an art historian and gallery professional working across exhibition planning, archival research, and editorial writing.',
  'Holding an MA in History of Art from the Courtauld Institute of Art (London) and a BA from the University of Pennsylvania (Philadelphia), my research centers on postwar European and Korean abstraction — particularly the material and biographical dimensions of trauma in the work of Alberto Burri, Manolo Millares, and Ha Chong-Hyun.',
  'I have worked with Tina Kim Gallery (Seoul), Victoria Miro (London), and Guildhall Art Gallery (London), contributing to exhibitions, institutional publications, and artist archives across international contexts.'
) on conflict (id) do nothing;


-- Projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  year text not null default '',
  category text not null default '',
  description text not null default '',
  image text,
  link text,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

insert into projects (title, year, category, description, image, sort_order) values (
  'Ha Chong-Hyun: Conjunctions',
  '2026',
  'Editorial',
  'Proofreading, copy-editing, and artwork fact-checking for a monograph on Ha Chong-Hyun published by Rizzoli New York — the first major English-language survey of the artist''s work.',
  '/projects/ha-chong-hyun-conjunctions.jpg',
  0
);


-- Experience
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  place text not null default '',
  location text not null default '',
  period text not null default '',
  bullets jsonb not null default '[]',
  sort_order int not null default 0
);

insert into experience (title, place, location, period, bullets, sort_order) values
(
  'Associate',
  'Tina Kim Gallery',
  'Seoul',
  'Feb 2025 – Jan 2026',
  '["Assisted in exhibition planning for solo presentations of Lee Seung-jio (2025.09) and Kang Suk-ho (2025.11), contributing to Korean and English text writing","Conducted archival research for Lee Shinja''s first U.S. solo exhibition Lee Shinja: Drawn with Thread (BAMPFA, Aug 2025), including archive documentation and subtitle translation for the exhibition video","Proofread and fact-checked essays and artwork information for the Ha Chong-Hyun monograph (Rizzoli, forthcoming 2026)","Managed Seoul gallery inventory using Artlogic; coordinated artwork consignment and transport logistics","Provided client support during Frieze Seoul and assisted with art fair week programming","Distributed press releases and exhibition documentation to Korean media outlets including Korea Herald, Art in Culture, and Marie Claire"]',
  0
),
(
  'Staff',
  'Guildhall Art Gallery',
  'London',
  'Nov 2024 – May 2025',
  '["Managed front-of-house reception and art shop operations, handling ticketing and merchandise sales","Conducted collection research related to upcoming exhibition projects, including works by J.M.W. Turner"]',
  1
),
(
  'Invigilator',
  'Victoria Miro Gallery',
  'London',
  'Sep 2024 – Dec 2024',
  '["Managed gallery check-in and visitor flow using ARTSVP, accommodating up to 800 daily visitors with no recorded complaints","Provided dedicated support for press and VIP events during the Yayoi Kusama exhibition (Sep 2024)"]',
  2
),
(
  'Intern',
  'SOOM Project',
  'Seoul',
  'Dec 2020 – Jul 2021',
  '["Prepared lecture materials for SOOM Academy and Yonsei University art management courses","Assisted in writing artwork placement proposals for exhibitions (London 180 Studios) and commercial spaces (hotels, department stores)","Created virtual exhibition mockups using Adobe Illustrator and Photoshop","Coordinated installation for the Bulgari Colors exhibition"]',
  3
),
(
  'Student Docent',
  'Arthur Ross Gallery, University of Pennsylvania',
  'Philadelphia',
  'Sep 2019 – Mar 2020',
  '["Led guided tours for Jaume Plensa: Talking Continents (2019) and Frankenthaler on Paper 1970–1990 (2020)","Served on the student advisory board, contributing to gallery programming and events"]',
  4
);


-- Education
create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  degree text not null default '',
  school text not null default '',
  location text not null default '',
  period text not null default '',
  note text not null default '',
  sort_order int not null default 0
);

insert into education (degree, school, location, period, note, sort_order) values
(
  'MA, History of Art',
  'Courtauld Institute of Art',
  'London',
  '2023 – 2024',
  '"The Artists in Pain: The Parallelism of Trauma in the Burlap Paintings of Alberto Burri, Manolo Millares and Ha Chong-Hyun"',
  0
),
(
  'BA, History of Art',
  'University of Pennsylvania',
  'Philadelphia',
  '2019 – 2023',
  '"Julian Schnabel: Breaking as the New Making"',
  1
);


-- Skills
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  category text not null default '',
  items jsonb not null default '[]',
  sort_order int not null default 0
);

insert into skills (category, items, sort_order) values
(
  'Software',
  '["Adobe Photoshop","Adobe Illustrator","Adobe InDesign","Microsoft Office Suite"]',
  0
),
(
  'Languages',
  '["Korean — Native","English — Fluent","French — C1 (TCF, 2022)"]',
  1
),
(
  'Systems',
  '["Artlogic","ARTSVP"]',
  2
);
