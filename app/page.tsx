'use client'

import { useRef } from 'react'
import { aboutContent } from '@/lib/content'

export default function AboutPage() {
  const photoRef = useRef<HTMLDivElement>(null)

  const handlePhotoMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(700px) rotateX(${y * -5}deg) rotateY(${x * 5}deg)`
    el.style.transition = 'transform 0.08s ease'
  }

  const handlePhotoLeave = () => {
    const el = photoRef.current
    if (!el) return
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg)'
    el.style.transition = 'transform 0.6s ease'
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-12 md:gap-20 items-start">
        <div className="fade-up-1">
          <div
            ref={photoRef}
            className="mb-8 overflow-hidden photo-tilt"
            onMouseMove={handlePhotoMove}
            onMouseLeave={handlePhotoLeave}
          >
            <img
              src="/jooyoi.jpeg"
              alt="Jooyoung Kim"
              className="w-full object-cover"
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

        <div className="space-y-6 pt-1 fade-up-2">
          <p className="font-serif text-[1.35rem] font-light leading-relaxed text-[#2c2c2c]">
            {aboutContent.bio_intro}
          </p>
          <p className="font-sans text-sm leading-relaxed text-[#555555]">
            {aboutContent.bio_main}
          </p>
          <p className="font-sans text-sm leading-relaxed text-[#555555]">
            {aboutContent.bio_secondary}
          </p>
          <div className="pt-4 space-y-2.5">
            <p className="font-sans text-xs tracking-widest uppercase text-[#aaa098] mb-3">
              Contact
            </p>
            <a
              href="mailto:jooyoungkim19@gmail.com"
              className="flex items-center gap-3 group"
            >
              <span className="font-sans text-xs tracking-widest uppercase text-[#c8bfaf] w-20">Email</span>
              <span className="font-sans text-sm text-[#8b7355] group-hover:text-[#2c2c2c] transition-colors duration-300 link-underline">
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
              <span className="font-sans text-sm text-[#8b7355] group-hover:text-[#2c2c2c] transition-colors duration-300 link-underline">
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
              <span className="font-sans text-sm text-[#8b7355] group-hover:text-[#2c2c2c] transition-colors duration-300 link-underline">
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
              <span className="font-sans text-sm text-[#8b7355] group-hover:text-[#2c2c2c] transition-colors duration-300 link-underline">
                jooyoung-kim19
              </span>
            </a>
          </div>
          <div className="pt-4">
            <a
              href="/resume/"
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
