'use client'

import { useState, useEffect } from 'react'
import { EditableField } from '@/components/EditableField'
import { useAdmin } from '@/contexts/AdminContext'
import { readCache, writeCache } from '@/lib/cache'

type ExperienceEntry = {
  id: string
  title: string
  place: string
  location: string
  period: string
  bullets: string[]
  sort_order: number
}

type EducationEntry = {
  id: string
  degree: string
  school: string
  location: string
  period: string
  note: string
  sort_order: number
}

type SkillEntry = {
  id: string
  category: string
  items: string[]
  sort_order: number
}

const DEFAULT_EXPERIENCE: ExperienceEntry[] = [
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
    sort_order: 0,
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
    sort_order: 1,
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
    sort_order: 2,
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
    sort_order: 3,
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
    sort_order: 4,
  },
]

const DEFAULT_EDUCATION: EducationEntry[] = [
  {
    id: 'edu-1',
    degree: 'MA, History of Art',
    school: 'Courtauld Institute of Art',
    location: 'London',
    period: '2023 – 2024',
    note: '"The Artists in Pain: The Parallelism of Trauma in the Burlap Paintings of Alberto Burri, Manolo Millares and Ha Chong-Hyun"',
    sort_order: 0,
  },
  {
    id: 'edu-2',
    degree: 'BA, History of Art',
    school: 'University of Pennsylvania',
    location: 'Philadelphia',
    period: '2019 – 2023',
    note: '"Julian Schnabel: Breaking as the New Making"',
    sort_order: 1,
  },
]

const DEFAULT_SKILLS: SkillEntry[] = [
  {
    id: 'skill-1',
    category: 'Software',
    items: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Microsoft Office Suite'],
    sort_order: 0,
  },
  {
    id: 'skill-2',
    category: 'Languages',
    items: ['Korean — Native', 'English — Fluent', 'French — C1 (TCF, 2022)'],
    sort_order: 1,
  },
  {
    id: 'skill-3',
    category: 'Systems',
    items: ['Artlogic', 'ARTSVP'],
    sort_order: 2,
  },
]

async function patchEntry(table: string, id: string, fields: Record<string, unknown>) {
  await fetch(`/api/content/${table}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...fields }),
  })
}

async function deleteEntry(table: string, id: string) {
  await fetch(`/api/content/${table}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
}

async function addEntry(table: string, body: Record<string, unknown>) {
  const res = await fetch(`/api/content/${table}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export default function ResumePage() {
  const { isAdmin } = useAdmin()
  const [experience, setExperience] = useState<ExperienceEntry[]>(DEFAULT_EXPERIENCE)
  const [education, setEducation] = useState<EducationEntry[]>(DEFAULT_EDUCATION)
  const [skills, setSkills] = useState<SkillEntry[]>(DEFAULT_SKILLS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    type ResumeCache = { experience: ExperienceEntry[]; education: EducationEntry[]; skills: SkillEntry[] }
    const cached = readCache<ResumeCache>('resume')
    if (cached) {
      setExperience(cached.experience)
      setEducation(cached.education)
      setSkills(cached.skills)
      setLoaded(true)
    }

    Promise.all([
      fetch('/api/content/experience').then((r) => r.json()),
      fetch('/api/content/education').then((r) => r.json()),
      fetch('/api/content/skills').then((r) => r.json()),
    ])
      .then(([exp, edu, sk]) => {
        const next = {
          experience: Array.isArray(exp) && exp.length > 0 ? exp : DEFAULT_EXPERIENCE,
          education: Array.isArray(edu) && edu.length > 0 ? edu : DEFAULT_EDUCATION,
          skills: Array.isArray(sk) && sk.length > 0 ? sk : DEFAULT_SKILLS,
        }
        setExperience(next.experience)
        setEducation(next.education)
        setSkills(next.skills)
        writeCache('resume', next)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  // ── Experience helpers ────────────────────────────────────────────────────

  const moveExp = async (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= experience.length) return
    const next = [...experience]
    ;[next[i], next[j]] = [next[j], next[i]]
    next.forEach((e, idx) => (e.sort_order = idx))
    setExperience(next)
    await Promise.all([
      patchEntry('experience', next[i].id, { sort_order: next[i].sort_order }),
      patchEntry('experience', next[j].id, { sort_order: next[j].sort_order }),
    ])
  }

  const updateExpField = (i: number, fields: Partial<ExperienceEntry>) => {
    setExperience((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...fields } : e)))
  }

  const addBullet = async (expIdx: number) => {
    const entry = experience[expIdx]
    const newBullets = [...entry.bullets, 'New bullet point']
    updateExpField(expIdx, { bullets: newBullets })
    await patchEntry('experience', entry.id, { bullets: newBullets })
  }

  const updateBullet = async (expIdx: number, bulletIdx: number, value: string) => {
    const entry = experience[expIdx]
    const newBullets = entry.bullets.map((b, i) => (i === bulletIdx ? value : b))
    updateExpField(expIdx, { bullets: newBullets })
    await patchEntry('experience', entry.id, { bullets: newBullets })
  }

  const removeBullet = async (expIdx: number, bulletIdx: number) => {
    const entry = experience[expIdx]
    const newBullets = entry.bullets.filter((_, i) => i !== bulletIdx)
    updateExpField(expIdx, { bullets: newBullets })
    await patchEntry('experience', entry.id, { bullets: newBullets })
  }

  const deleteExp = async (i: number) => {
    const entry = experience[i]
    setExperience((prev) => prev.filter((_, idx) => idx !== i))
    if (!entry.id.startsWith('exp-')) await deleteEntry('experience', entry.id)
  }

  const addExp = async () => {
    const newEntry = {
      title: 'New Role',
      place: 'Organization',
      location: 'City',
      period: 'Month Year – Month Year',
      bullets: ['Description of role'],
      sort_order: experience.length,
    }
    const data = await addEntry('experience', newEntry)
    setExperience((prev) => [...prev, { ...newEntry, id: data.id ?? `exp-new-${Date.now()}` }])
  }

  // ── Education helpers ─────────────────────────────────────────────────────

  const moveEdu = async (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= education.length) return
    const next = [...education]
    ;[next[i], next[j]] = [next[j], next[i]]
    next.forEach((e, idx) => (e.sort_order = idx))
    setEducation(next)
    await Promise.all([
      patchEntry('education', next[i].id, { sort_order: next[i].sort_order }),
      patchEntry('education', next[j].id, { sort_order: next[j].sort_order }),
    ])
  }

  const updateEduField = (i: number, fields: Partial<EducationEntry>) => {
    setEducation((prev) => prev.map((e, idx) => (idx === i ? { ...e, ...fields } : e)))
  }

  const deleteEdu = async (i: number) => {
    const entry = education[i]
    setEducation((prev) => prev.filter((_, idx) => idx !== i))
    if (!entry.id.startsWith('edu-')) await deleteEntry('education', entry.id)
  }

  const addEdu = async () => {
    const newEntry = {
      degree: 'Degree, Field of Study',
      school: 'Institution',
      location: 'City',
      period: 'Year – Year',
      note: '"Thesis title"',
      sort_order: education.length,
    }
    const data = await addEntry('education', newEntry)
    setEducation((prev) => [...prev, { ...newEntry, id: data.id ?? `edu-new-${Date.now()}` }])
  }

  // ── Skills helpers ────────────────────────────────────────────────────────

  const updateSkillItem = async (skillIdx: number, itemIdx: number, value: string) => {
    const entry = skills[skillIdx]
    const newItems = entry.items.map((it, i) => (i === itemIdx ? value : it))
    setSkills((prev) => prev.map((s, i) => (i === skillIdx ? { ...s, items: newItems } : s)))
    await patchEntry('skills', entry.id, { items: newItems })
  }

  const addSkillItem = async (skillIdx: number) => {
    const entry = skills[skillIdx]
    const newItems = [...entry.items, 'New item']
    setSkills((prev) => prev.map((s, i) => (i === skillIdx ? { ...s, items: newItems } : s)))
    await patchEntry('skills', entry.id, { items: newItems })
  }

  const removeSkillItem = async (skillIdx: number, itemIdx: number) => {
    const entry = skills[skillIdx]
    const newItems = entry.items.filter((_, i) => i !== itemIdx)
    setSkills((prev) => prev.map((s, i) => (i === skillIdx ? { ...s, items: newItems } : s)))
    await patchEntry('skills', entry.id, { items: newItems })
  }

  const addSkillCategory = async () => {
    const newEntry = { category: 'Category', items: ['Item'], sort_order: skills.length }
    const data = await addEntry('skills', newEntry)
    setSkills((prev) => [...prev, { ...newEntry, id: data.id ?? `skill-new-${Date.now()}` }])
  }

  const deleteSkillCategory = async (i: number) => {
    const entry = skills[i]
    setSkills((prev) => prev.filter((_, idx) => idx !== i))
    if (!entry.id.startsWith('skill-')) await deleteEntry('skills', entry.id)
  }

  return (
    <div className={`max-w-4xl mx-auto px-6 py-20 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="mb-16 fade-up">
        <h1 className="font-serif text-4xl font-light text-[#2c2c2c]">Curriculum Vitae</h1>
        <div className="w-full h-px bg-[#d4cfc8] mt-5" />
      </div>

      {/* Experience */}
      <section className="mb-16">
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Experience
        </h2>
        <div className={`space-y-12 ${isAdmin ? 'pl-8' : ''}`}>
          {experience.map((role, i) => (
            <div key={role.id} className="relative group/entry">
              {/* Hover accent line */}
              {!isAdmin && (
                <div className="absolute -left-3 top-1 bottom-1 w-px bg-[#8b7355] origin-top scale-y-0 group-hover/entry:scale-y-100 transition-transform duration-500 ease-out opacity-0 group-hover/entry:opacity-100" />
              )}
              {isAdmin && (
                <div className="absolute -left-8 top-0 flex flex-col gap-0.5">
                  <button
                    onClick={() => moveExp(i, -1)}
                    disabled={i === 0}
                    className="text-[#c8bfaf] hover:text-[#8b7355] disabled:opacity-20 text-xs leading-none"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveExp(i, 1)}
                    disabled={i === experience.length - 1}
                    className="text-[#c8bfaf] hover:text-[#8b7355] disabled:opacity-20 text-xs leading-none"
                  >
                    ▼
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-10">
                <div className="md:pt-0.5">
                  <EditableField
                    value={role.period}
                    onSave={async (v) => {
                      updateExpField(i, { period: v })
                      await patchEntry('experience', role.id, { period: v })
                    }}
                    className="font-sans text-xs text-[#8b7355] leading-relaxed"
                  />
                  <EditableField
                    value={role.location}
                    onSave={async (v) => {
                      updateExpField(i, { location: v })
                      await patchEntry('experience', role.id, { location: v })
                    }}
                    className="font-sans text-xs text-[#aaa098] mt-1 block"
                  />
                </div>
                <div>
                  <EditableField
                    value={role.title}
                    onSave={async (v) => {
                      updateExpField(i, { title: v })
                      await patchEntry('experience', role.id, { title: v })
                    }}
                    as="p"
                    className="font-serif text-xl font-light text-[#2c2c2c] leading-tight transition-colors duration-300 group-hover/entry:text-[#8b7355]"
                  />
                  <EditableField
                    value={role.place}
                    onSave={async (v) => {
                      updateExpField(i, { place: v })
                      await patchEntry('experience', role.id, { place: v })
                    }}
                    as="p"
                    className="font-sans text-sm text-[#8b7355] mb-4"
                  />
                  <ul className="space-y-2">
                    {role.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="font-sans text-sm text-[#555555] leading-relaxed flex gap-3 items-start"
                      >
                        <span className="text-[#c8bfaf] shrink-0 mt-[0.35rem]">—</span>
                        <div className="flex-1 flex items-start gap-2">
                          <EditableField
                            value={bullet}
                            onSave={(v) => updateBullet(i, j, v)}
                            multiline
                            rows={2}
                            className="flex-1 font-sans text-sm text-[#555555] leading-relaxed"
                          />
                          {isAdmin && (
                            <button
                              onClick={() => removeBullet(i, j)}
                              className="shrink-0 text-[#c8bfaf] hover:text-red-400 text-xs mt-0.5"
                              title="Remove bullet"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                  {isAdmin && (
                    <div className="mt-3 flex gap-4">
                      <button
                        onClick={() => addBullet(i)}
                        className="font-sans text-xs text-[#8b7355] hover:text-[#2c2c2c] transition-colors"
                      >
                        + Add bullet
                      </button>
                      <button
                        onClick={() => deleteExp(i)}
                        className="font-sans text-xs text-[#c8bfaf] hover:text-red-400 transition-colors"
                      >
                        Delete entry
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {isAdmin && (
          <button
            onClick={addExp}
            className="mt-10 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
          >
            + Add experience
          </button>
        )}
      </section>

      <div className="w-full h-px bg-[#d4cfc8] mb-16" />

      {/* Education */}
      <section className="mb-16">
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Education
        </h2>
        <div className={`space-y-10 ${isAdmin ? 'pl-8' : ''}`}>
          {education.map((edu, i) => (
            <div key={edu.id} className="relative">
              {isAdmin && (
                <div className="absolute -left-8 top-0 flex flex-col gap-0.5">
                  <button
                    onClick={() => moveEdu(i, -1)}
                    disabled={i === 0}
                    className="text-[#c8bfaf] hover:text-[#8b7355] disabled:opacity-20 text-xs leading-none"
                  >
                    ▲
                  </button>
                  <button
                    onClick={() => moveEdu(i, 1)}
                    disabled={i === education.length - 1}
                    className="text-[#c8bfaf] hover:text-[#8b7355] disabled:opacity-20 text-xs leading-none"
                  >
                    ▼
                  </button>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-10">
                <div className="md:pt-0.5">
                  <EditableField
                    value={edu.period}
                    onSave={async (v) => {
                      updateEduField(i, { period: v })
                      await patchEntry('education', edu.id, { period: v })
                    }}
                    className="font-sans text-xs text-[#8b7355]"
                  />
                  <EditableField
                    value={edu.location}
                    onSave={async (v) => {
                      updateEduField(i, { location: v })
                      await patchEntry('education', edu.id, { location: v })
                    }}
                    className="font-sans text-xs text-[#aaa098] mt-1 block"
                  />
                </div>
                <div>
                  <EditableField
                    value={edu.degree}
                    onSave={async (v) => {
                      updateEduField(i, { degree: v })
                      await patchEntry('education', edu.id, { degree: v })
                    }}
                    as="p"
                    className="font-serif text-xl font-light text-[#2c2c2c] leading-tight"
                  />
                  <EditableField
                    value={edu.school}
                    onSave={async (v) => {
                      updateEduField(i, { school: v })
                      await patchEntry('education', edu.id, { school: v })
                    }}
                    as="p"
                    className="font-sans text-sm text-[#8b7355] mb-3"
                  />
                  <p className="font-sans text-xs text-[#aaa098] italic leading-relaxed">
                    Thesis:{' '}
                    <EditableField
                      value={edu.note}
                      onSave={async (v) => {
                        updateEduField(i, { note: v })
                        await patchEntry('education', edu.id, { note: v })
                      }}
                      className="italic"
                    />
                  </p>
                  {isAdmin && (
                    <button
                      onClick={() => deleteEdu(i)}
                      className="mt-2 font-sans text-xs text-[#c8bfaf] hover:text-red-400 transition-colors"
                    >
                      Delete entry
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {isAdmin && (
          <button
            onClick={addEdu}
            className="mt-10 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
          >
            + Add education
          </button>
        )}
      </section>

      <div className="w-full h-px bg-[#d4cfc8] mb-16" />

      {/* Skills */}
      <section>
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Skills &amp; Languages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {skills.map((s, si) => (
            <div key={s.id}>
              <EditableField
                value={s.category}
                onSave={async (v) => {
                  setSkills((prev) => prev.map((sk, i) => (i === si ? { ...sk, category: v } : sk)))
                  await patchEntry('skills', s.id, { category: v })
                }}
                as="p"
                className="font-sans text-xs tracking-wider uppercase text-[#aaa098] mb-3"
              />
              <ul className="space-y-1.5">
                {s.items.map((item, ii) => (
                  <li key={ii} className="flex items-center gap-2">
                    <EditableField
                      value={item}
                      onSave={(v) => updateSkillItem(si, ii, v)}
                      className="font-sans text-sm text-[#555555] flex-1"
                    />
                    {isAdmin && (
                      <button
                        onClick={() => removeSkillItem(si, ii)}
                        className="text-[#c8bfaf] hover:text-red-400 text-xs shrink-0"
                        title="Remove item"
                      >
                        ×
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              {isAdmin && (
                <div className="mt-2 flex gap-3">
                  <button
                    onClick={() => addSkillItem(si)}
                    className="font-sans text-xs text-[#8b7355] hover:text-[#2c2c2c] transition-colors"
                  >
                    + Add item
                  </button>
                  <button
                    onClick={() => deleteSkillCategory(si)}
                    className="font-sans text-xs text-[#c8bfaf] hover:text-red-400 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
        {isAdmin && (
          <button
            onClick={addSkillCategory}
            className="mt-10 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
          >
            + Add category
          </button>
        )}
      </section>
    </div>
  )
}
