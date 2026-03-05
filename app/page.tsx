'use client'

import { useState, useEffect } from 'react'
import { EditableField } from '@/components/EditableField'

type AboutContent = {
  bio_intro: string
  bio_main: string
  bio_secondary: string
}

const DEFAULTS: AboutContent = {
  bio_intro:
    'I am an art historian and gallery professional working across exhibition planning, archival research, and editorial writing.',
  bio_main:
    'Holding an MA in History of Art from the Courtauld Institute of Art (London) and a BA from the University of Pennsylvania (Philadelphia), my research centers on postwar European and Korean abstraction — particularly the material and biographical dimensions of trauma in the work of Alberto Burri, Manolo Millares, and Ha Chong-Hyun.',
  bio_secondary:
    'I have worked with Tina Kim Gallery (Seoul), Victoria Miro (London), and Guildhall Art Gallery (London), contributing to exhibitions, institutional publications, and artist archives across international contexts.',
}

async function saveAbout(fields: Partial<AboutContent>) {
  await fetch('/api/content/about', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(fields),
  })
}

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent>(DEFAULTS)

  useEffect(() => {
    fetch('/api/content/about')
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setContent({
            bio_intro: data.bio_intro ?? DEFAULTS.bio_intro,
            bio_main: data.bio_main ?? DEFAULTS.bio_main,
            bio_secondary: data.bio_secondary ?? DEFAULTS.bio_secondary,
          })
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">
        {/* Left: Photo + Identity */}
        <div>
          <div className="mb-8 overflow-hidden">
            <img
              src="/jooyoi.jpeg"
              alt="Jooyoung Kim"
              className="w-full object-cover grayscale-[15%] sepia-[10%]"
            />
          </div>
          <h1 className="font-serif text-6xl md:text-7xl font-light leading-[1.05] text-[#2c2c2c]">
            Jooyoung
            <br />
            Kim
          </h1>
          <p className="font-sans text-sm text-[#8b7355] tracking-widest mt-3">
            김주영
          </p>
          <div className="w-10 h-px bg-[#c8bfaf] mt-8 mb-6" />
          <div className="space-y-1">
            <p className="font-sans text-xs tracking-widest uppercase text-[#8b7355]">
              Art Historian
            </p>
            <p className="font-sans text-xs tracking-widest uppercase text-[#8b7355]">
              Gallery Professional
            </p>
            <p className="font-sans text-xs tracking-widest uppercase text-[#aaa098]">
              Seoul · London · Philadelphia
            </p>
          </div>
        </div>

        {/* Right: Bio */}
        <div className="space-y-6 pt-1">
          <EditableField
            value={content.bio_intro}
            onSave={async (v) => {
              setContent((c) => ({ ...c, bio_intro: v }))
              await saveAbout({ bio_intro: v })
            }}
            multiline
            rows={4}
            as="p"
            className="font-serif text-[1.35rem] font-light leading-relaxed text-[#2c2c2c]"
          />
          <EditableField
            value={content.bio_main}
            onSave={async (v) => {
              setContent((c) => ({ ...c, bio_main: v }))
              await saveAbout({ bio_main: v })
            }}
            multiline
            rows={5}
            as="p"
            className="font-sans text-sm leading-relaxed text-[#555555]"
          />
          <EditableField
            value={content.bio_secondary}
            onSave={async (v) => {
              setContent((c) => ({ ...c, bio_secondary: v }))
              await saveAbout({ bio_secondary: v })
            }}
            multiline
            rows={4}
            as="p"
            className="font-sans text-sm leading-relaxed text-[#555555]"
          />
          <div className="pt-4 space-y-2.5">
            <p className="font-sans text-xs tracking-widest uppercase text-[#aaa098] mb-3">
              Contact
            </p>
            <a
              href="mailto:jooyoungkim19@gmail.com"
              className="flex items-center gap-3 group"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-[#c8bfaf] w-20">Email</span>
              <span className="font-sans text-sm text-[#8b7355] group-hover:text-[#2c2c2c] transition-colors">
                jooyoungkim19@gmail.com
              </span>
            </a>
            <a
              href="https://www.instagram.com/jjooyoi_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-[#c8bfaf] w-20">Instagram</span>
              <span className="font-sans text-sm text-[#8b7355] group-hover:text-[#2c2c2c] transition-colors">
                @jjooyoi_
              </span>
            </a>
            <a
              href="https://www.instagram.com/by_jooyoi/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-[#c8bfaf] w-20"></span>
              <span className="font-sans text-sm text-[#8b7355] group-hover:text-[#2c2c2c] transition-colors">
                @by_jooyoi
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/jooyoung-kim19/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-[#c8bfaf] w-20">LinkedIn</span>
              <span className="font-sans text-sm text-[#8b7355] group-hover:text-[#2c2c2c] transition-colors">
                jooyoung-kim19
              </span>
            </a>
          </div>
          <div className="pt-4">
            <a
              href="/resume"
              className="font-sans text-xs tracking-widest uppercase text-[#aaa098] hover:text-[#2c2c2c] transition-colors border-b border-[#ddd6c8] pb-0.5"
            >
              View CV →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
