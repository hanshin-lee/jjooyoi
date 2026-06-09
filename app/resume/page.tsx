import { education, experience, skills } from '@/lib/content'

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-16 fade-up">
        <h1 className="font-serif text-4xl font-light text-[#2c2c2c]">Curriculum Vitae</h1>
        <div className="w-full h-px bg-[#d4cfc8] mt-5" />
      </div>

      <section className="mb-16">
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Experience
        </h2>
        <div className="space-y-12">
          {experience.map((role) => (
            <div key={role.id} className="relative group/entry">
              <div className="absolute -left-3 top-1 bottom-1 w-px bg-[#8b7355] origin-top scale-y-0 group-hover/entry:scale-y-100 transition-transform duration-500 ease-out opacity-0 group-hover/entry:opacity-100" />
              <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-10">
                <div className="md:pt-0.5">
                  <p className="font-sans text-xs text-[#8b7355] leading-relaxed">
                    {role.period}
                  </p>
                  <p className="font-sans text-xs text-[#aaa098] mt-1 block">
                    {role.location}
                  </p>
                </div>
                <div>
                  <p className="font-serif text-xl font-light text-[#2c2c2c] leading-tight transition-colors duration-300 group-hover/entry:text-[#8b7355]">
                    {role.title}
                  </p>
                  <p className="font-sans text-sm text-[#8b7355] mb-4">
                    {role.place}
                  </p>
                  <ul className="space-y-2">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="font-sans text-sm text-[#555555] leading-relaxed flex gap-3 items-start"
                      >
                        <span className="text-[#c8bfaf] shrink-0 mt-[0.35rem]">—</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-[#d4cfc8] mb-16" />

      <section className="mb-16">
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Education
        </h2>
        <div className="space-y-10">
          {education.map((edu) => (
            <div key={edu.id} className="relative">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-10">
                <div className="md:pt-0.5">
                  <p className="font-sans text-xs text-[#8b7355]">{edu.period}</p>
                  <p className="font-sans text-xs text-[#aaa098] mt-1 block">
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
                    Thesis: <span>{edu.note}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-px bg-[#d4cfc8] mb-16" />

      <section>
        <h2 className="font-sans text-xs tracking-widest uppercase text-[#8b7355] mb-10">
          Skills &amp; Languages
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {skills.map((skill) => (
            <div key={skill.id}>
              <p className="font-sans text-xs tracking-wider uppercase text-[#aaa098] mb-3">
                {skill.category}
              </p>
              <ul className="space-y-1.5">
                {skill.items.map((item) => (
                  <li key={item} className="font-sans text-sm text-[#555555]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
