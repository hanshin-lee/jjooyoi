const experience = [
  {
    title: "Associate",
    place: "Tina Kim Gallery",
    location: "Seoul",
    period: "Feb 2025 – Jan 2026",
    bullets: [
      "Assisted in exhibition planning for solo presentations of Lee Seung-jio (2025.09) and Kang Suk-ho (2025.11), contributing to Korean and English text writing",
      "Conducted archival research for Lee Shinja's first U.S. solo exhibition Lee Shinja: Drawn with Thread (BAMPFA, Aug 2025), including archive documentation and subtitle translation for the exhibition video",
      "Proofread and fact-checked essays and artwork information for the Ha Chong-Hyun monograph (Rizzoli, forthcoming 2026)",
      "Managed Seoul gallery inventory using Artlogic; coordinated artwork consignment and transport logistics",
      "Provided client support during Frieze Seoul and assisted with art fair week programming",
      "Distributed press releases and exhibition documentation to Korean media outlets including Korea Herald, Art in Culture, and Marie Claire",
    ],
  },
  {
    title: "Staff",
    place: "Guildhall Art Gallery",
    location: "London",
    period: "Nov 2024 – May 2025",
    bullets: [
      "Managed front-of-house reception and art shop operations, handling ticketing and merchandise sales",
      "Conducted collection research related to upcoming exhibition projects, including works by J.M.W. Turner",
    ],
  },
  {
    title: "Invigilator",
    place: "Victoria Miro Gallery",
    location: "London",
    period: "Sep 2024 – Dec 2024",
    bullets: [
      "Managed gallery check-in and visitor flow using ARTSVP, accommodating up to 800 daily visitors with no recorded complaints",
      "Provided dedicated support for press and VIP events during the Yayoi Kusama exhibition (Sep 2024)",
    ],
  },
  {
    title: "Intern",
    place: "SOOM Project",
    location: "Seoul",
    period: "Dec 2020 – Jul 2021",
    bullets: [
      "Prepared lecture materials for SOOM Academy and Yonsei University art management courses",
      "Assisted in writing artwork placement proposals for exhibitions (London 180 Studios) and commercial spaces (hotels, department stores)",
      "Created virtual exhibition mockups using Adobe Illustrator and Photoshop",
      "Coordinated installation for the Bulgari Colors exhibition",
    ],
  },
  {
    title: "Student Docent",
    place: "Arthur Ross Gallery, University of Pennsylvania",
    location: "Philadelphia",
    period: "Sep 2019 – Mar 2020",
    bullets: [
      "Led guided tours for Jaume Plensa: Talking Continents (2019) and Frankenthaler on Paper 1970–1990 (2020)",
      "Served on the student advisory board, contributing to gallery programming and events",
    ],
  },
];

const education = [
  {
    degree: "MA, History of Art",
    school: "Courtauld Institute of Art",
    location: "London",
    period: "2023 – 2024",
    note: "\"The Artists in Pain: The Parallelism of Trauma in the Burlap Paintings of Alberto Burri, Manolo Millares and Ha Chong-Hyun\"",
  },
  {
    degree: "BA, History of Art",
    school: "University of Pennsylvania",
    location: "Philadelphia",
    period: "2019 – 2023",
    note: "\"Julian Schnabel: Breaking as the New Making\"",
  },
];

const skills = [
  {
    category: "Software",
    items: ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Microsoft Office Suite"],
  },
  {
    category: "Languages",
    items: ["Korean — Native", "English — Fluent", "French — C1 (TCF, 2022)"],
  },
  {
    category: "Systems",
    items: ["Artlogic", "ARTSVP"],
  },
];

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-serif text-4xl font-light text-[#2c2c2c]">
          Curriculum Vitae
        </h1>
        <div className="w-full h-px bg-[#d4cfc8] mt-5" />
      </div>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Experience
        </h2>
        <div className="space-y-12">
          {experience.map((role, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-10">
              <div className="md:pt-0.5">
                <p className="font-sans text-xs text-[#8b7355] leading-relaxed">
                  {role.period}
                </p>
                <p className="font-sans text-xs text-[#aaa098] mt-1">
                  {role.location}
                </p>
              </div>
              <div>
                <p className="font-serif text-xl font-light text-[#2c2c2c] leading-tight">
                  {role.title}
                </p>
                <p className="font-sans text-sm text-[#8b7355] mb-4">
                  {role.place}
                </p>
                <ul className="space-y-2">
                  {role.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="font-sans text-sm text-[#555555] leading-relaxed flex gap-3"
                    >
                      <span className="text-[#c8bfaf] shrink-0 mt-[0.35rem]">
                        —
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-[#d4cfc8] mb-16" />

      {/* Education */}
      <section className="mb-16">
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Education
        </h2>
        <div className="space-y-10">
          {education.map((edu, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-10">
              <div className="md:pt-0.5">
                <p className="font-sans text-xs text-[#8b7355]">{edu.period}</p>
                <p className="font-sans text-xs text-[#aaa098] mt-1">
                  {edu.location}
                </p>
              </div>
              <div>
                <p className="font-serif text-xl font-light text-[#2c2c2c] leading-tight">
                  {edu.degree}
                </p>
                <p className="font-sans text-sm text-[#8b7355] mb-3">
                  {edu.school}
                </p>
                <p className="font-sans text-xs text-[#aaa098] italic leading-relaxed">
                  Thesis: {edu.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-[#d4cfc8] mb-16" />

      {/* Skills */}
      <section>
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Skills &amp; Languages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {skills.map((s, i) => (
            <div key={i}>
              <p className="font-sans text-xs tracking-wider uppercase text-[#aaa098] mb-3">
                {s.category}
              </p>
              <ul className="space-y-1.5">
                {s.items.map((item, j) => (
                  <li key={j} className="font-sans text-sm text-[#555555]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
