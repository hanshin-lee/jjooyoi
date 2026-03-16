'use client'

import { useState, useEffect } from 'react'
import { EditableField } from '@/components/EditableField'
import { useAdmin } from '@/contexts/AdminContext'
import { DropZone } from '@/components/DropZone'

type Project = {
  id: string
  title: string
  year: string
  category: string
  description: string
  image?: string
  link?: string
  sort_order: number
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Ha Chong-Hyun: Conjunctions',
    year: '2026',
    category: 'Editorial',
    description:
      "Proofreading, copy-editing, and artwork fact-checking for a monograph on Ha Chong-Hyun published by Rizzoli New York — the first major English-language survey of the artist's work.",
    image: '/projects/ha-chong-hyun-conjunctions.jpg',
    sort_order: 0,
  },
]

async function patchProject(id: string, fields: Partial<Project>) {
  await fetch('/api/content/projects', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...fields }),
  })
}

async function deleteProject(id: string) {
  await fetch('/api/content/projects', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
}

async function addProject(body: Omit<Project, 'id'>) {
  const res = await fetch('/api/content/projects', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

export default function ProjectsPage() {
  const { isAdmin } = useAdmin()
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/content/projects')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data)
      })
      .catch(() => {})
      .finally(() => setLoaded(true))
  }, [])

  const updateProject = (i: number, fields: Partial<Project>) => {
    setProjects((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...fields } : p)))
  }

  const moveProject = async (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= projects.length) return
    const next = [...projects]
    ;[next[i], next[j]] = [next[j], next[i]]
    next.forEach((p, idx) => (p.sort_order = idx))
    setProjects(next)
    await Promise.all([
      patchProject(next[i].id, { sort_order: next[i].sort_order }),
      patchProject(next[j].id, { sort_order: next[j].sort_order }),
    ])
  }

  const handleDelete = async (i: number) => {
    const project = projects[i]
    setProjects((prev) => prev.filter((_, idx) => idx !== i))
    if (!project.id.startsWith('proj-')) await deleteProject(project.id)
  }

  const handleAdd = async () => {
    const newProject = {
      title: 'New Project',
      year: new Date().getFullYear().toString(),
      category: 'Category',
      description: 'Project description.',
      sort_order: projects.length,
    }
    const data = await addProject(newProject)
    setProjects((prev) => [...prev, { ...newProject, id: data.id ?? `proj-new-${Date.now()}` }])
  }

  return (
    <div className={`max-w-4xl mx-auto px-6 py-20 transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-serif text-4xl font-light text-[#2c2c2c]">Projects</h1>
        <div className="w-full h-px bg-[#d4cfc8] mt-5" />
      </div>

      {projects.length === 0 ? (
        <div className="py-28 text-center">
          <p className="font-serif text-2xl font-light text-[#c8bfaf]">Projects coming soon.</p>
          {isAdmin && (
            <button
              onClick={handleAdd}
              className="mt-6 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
            >
              + Add project
            </button>
          )}
        </div>
      ) : (
        <>
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-px bg-[#d4cfc8] border border-[#d4cfc8] ${isAdmin ? 'relative' : ''}`}>
            {projects.map((project, i) => (
              <div key={project.id} className="bg-beige-50 hover:bg-beige-100 transition-colors group relative">
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                    <button
                      onClick={() => moveProject(i, -1)}
                      disabled={i === 0}
                      className="bg-beige-50/80 border border-[#d4cfc8] text-[#c8bfaf] hover:text-[#8b7355] disabled:opacity-20 text-xs px-1.5 py-0.5 rounded-sm"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveProject(i, 1)}
                      disabled={i === projects.length - 1}
                      className="bg-beige-50/80 border border-[#d4cfc8] text-[#c8bfaf] hover:text-[#8b7355] disabled:opacity-20 text-xs px-1.5 py-0.5 rounded-sm"
                    >
                      ▼
                    </button>
                    <button
                      onClick={() => handleDelete(i)}
                      className="bg-beige-50/80 border border-[#d4cfc8] text-[#c8bfaf] hover:text-red-400 text-xs px-1.5 py-0.5 rounded-sm"
                    >
                      ×
                    </button>
                  </div>
                )}
                {project.image && (
                  <div className="overflow-hidden border-b border-[#d4cfc8]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="flex justify-between items-start mb-5">
                    <EditableField
                      value={project.category}
                      onSave={async (v) => {
                        updateProject(i, { category: v })
                        await patchProject(project.id, { category: v })
                      }}
                      className="font-sans text-xs tracking-widest uppercase text-[#8b7355]"
                    />
                    <EditableField
                      value={project.year}
                      onSave={async (v) => {
                        updateProject(i, { year: v })
                        await patchProject(project.id, { year: v })
                      }}
                      className="font-sans text-xs text-[#aaa098]"
                    />
                  </div>
                  <EditableField
                    value={project.title}
                    onSave={async (v) => {
                      updateProject(i, { title: v })
                      await patchProject(project.id, { title: v })
                    }}
                    as="h3"
                    className="font-serif text-2xl font-light text-[#2c2c2c] mb-3 group-hover:text-[#8b7355] transition-colors leading-tight"
                  />
                  <EditableField
                    value={project.description}
                    onSave={async (v) => {
                      updateProject(i, { description: v })
                      await patchProject(project.id, { description: v })
                    }}
                    multiline
                    rows={3}
                    as="p"
                    className="font-sans text-sm text-[#555555] leading-relaxed"
                  />
                  {isAdmin && (
                    <div className="mt-5">
                      <p className="font-sans text-xs text-[#c8bfaf] tracking-widest uppercase mb-2">Cover image</p>
                      <DropZone
                        currentPath={project.image}
                        folder="projects"
                        onUpload={async (path) => {
                          updateProject(i, { image: path })
                          await patchProject(project.id, { image: path })
                        }}
                      />
                    </div>
                  )}
                  {isAdmin && (
                    <div className="mt-2">
                      <EditableField
                        value={project.link ?? ''}
                        onSave={async (v) => {
                          updateProject(i, { link: v || undefined })
                          await patchProject(project.id, { link: v || undefined })
                        }}
                        className="font-sans text-xs text-[#aaa098] block"
                      />
                      <span className="font-sans text-xs text-[#c8bfaf]">↑ link URL</span>
                    </div>
                  )}
                  {!isAdmin && project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-5 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
                    >
                      View →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
          {isAdmin && (
            <button
              onClick={handleAdd}
              className="mt-8 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
            >
              + Add project
            </button>
          )}
        </>
      )}
    </div>
  )
}
