'use client'

import { useState, useEffect } from 'react'
import { EditableField } from '@/components/EditableField'
import { useAdmin } from '@/contexts/AdminContext'
import { DropZone } from '@/components/DropZone'

type Interest = {
  id: string
  title: string
  description: string
  photos: string[]
  sort_order: number
}

const DEFAULT_INTERESTS: Interest[] = []

async function patchInterest(id: string, fields: Partial<Interest>) {
  await fetch('/api/content/interests', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...fields }),
  })
}

async function deleteInterest(id: string) {
  await fetch('/api/content/interests', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
}

async function addInterest(body: Omit<Interest, 'id'>) {
  const res = await fetch('/api/content/interests', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  return res.json()
}

function PhotoCollage({ photos }: { photos: string[] }) {
  if (photos.length === 0) return null

  // Collage grid layout patterns based on photo count
  const gridClass =
    photos.length === 1
      ? 'grid-cols-1'
      : photos.length === 2
      ? 'grid-cols-2'
      : photos.length === 3
      ? 'grid-cols-3'
      : 'grid-cols-2 md:grid-cols-4'

  return (
    <div className={`grid ${gridClass} gap-1 mt-6`}>
      {photos.map((src, i) => (
        <div
          key={i}
          className={`overflow-hidden bg-beige-100 ${
            photos.length === 4 && i === 0 ? 'col-span-2 row-span-2' : ''
          }`}
          style={{ aspectRatio: photos.length === 1 ? '16/9' : '1/1' }}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      ))}
    </div>
  )
}

function PhotoManager({
  photos,
  onChange,
}: {
  photos: string[]
  onChange: (photos: string[]) => void
}) {
  const remove = (i: number) => onChange(photos.filter((_, idx) => idx !== i))

  const replace = (i: number, path: string) => {
    const next = [...photos]
    next[i] = path
    onChange(next)
  }

  return (
    <div className="mt-4 space-y-3">
      <p className="font-sans text-xs text-[#c8bfaf] tracking-widest uppercase">Photos</p>

      {photos.map((src, i) => (
        <div key={i} className="relative">
          <DropZone
            currentPath={src || undefined}
            folder="interests"
            onUpload={(path) => replace(i, path)}
          />
          <button
            onClick={() => remove(i)}
            className="absolute top-1.5 right-1.5 z-10 bg-beige-50/80 border border-[#d4cfc8] text-[#c8bfaf] hover:text-red-400 text-xs px-1.5 py-0.5 rounded-sm transition-colors"
          >
            ×
          </button>
        </div>
      ))}

      <button
        onClick={() => onChange([...photos, ''])}
        className="font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors"
      >
        + Add photo
      </button>
    </div>
  )
}

export default function InterestsPage() {
  const { isAdmin } = useAdmin()
  const [interests, setInterests] = useState<Interest[]>(DEFAULT_INTERESTS)
  const [savingPhotos, setSavingPhotos] = useState<Record<string, boolean>>({})

  useEffect(() => {
    fetch('/api/content/interests')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setInterests(data)
      })
      .catch(() => {})
  }, [])

  const updateInterest = (i: number, fields: Partial<Interest>) => {
    setInterests((prev) => prev.map((item, idx) => (idx === i ? { ...item, ...fields } : item)))
  }

  const moveInterest = async (i: number, dir: -1 | 1) => {
    const j = i + dir
    if (j < 0 || j >= interests.length) return
    const next = [...interests]
    ;[next[i], next[j]] = [next[j], next[i]]
    next.forEach((item, idx) => (item.sort_order = idx))
    setInterests(next)
    await Promise.all([
      patchInterest(next[i].id, { sort_order: next[i].sort_order }),
      patchInterest(next[j].id, { sort_order: next[j].sort_order }),
    ])
  }

  const handleDelete = async (i: number) => {
    const interest = interests[i]
    setInterests((prev) => prev.filter((_, idx) => idx !== i))
    if (!interest.id.startsWith('int-')) await deleteInterest(interest.id)
  }

  const handleAdd = async () => {
    const newInterest = {
      title: 'New Interest',
      description: 'Describe this interest.',
      photos: [],
      sort_order: interests.length,
    }
    const data = await addInterest(newInterest)
    setInterests((prev) => [
      ...prev,
      { ...newInterest, id: data.id ?? `int-new-${Date.now()}` },
    ])
  }

  const handleSavePhotos = async (i: number, photos: string[]) => {
    const interest = interests[i]
    setSavingPhotos((prev) => ({ ...prev, [interest.id]: true }))
    updateInterest(i, { photos })
    await patchInterest(interest.id, { photos })
    setSavingPhotos((prev) => ({ ...prev, [interest.id]: false }))
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="mb-16">
        <h1 className="font-serif text-4xl font-light text-[#2c2c2c]">Interests</h1>
        <div className="w-full h-px bg-[#d4cfc8] mt-5" />
      </div>

      {interests.length === 0 ? (
        <div className="py-28 text-center">
          <p className="font-serif text-2xl font-light text-[#c8bfaf]">Interests coming soon.</p>
          {isAdmin && (
            <button
              onClick={handleAdd}
              className="mt-6 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5"
            >
              + Add interest
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="space-y-px bg-[#d4cfc8] border border-[#d4cfc8]">
            {interests.map((interest, i) => (
              <div key={interest.id} className="bg-beige-50 group relative">
                {isAdmin && (
                  <div className="absolute top-3 right-3 z-10 flex gap-1.5">
                    <button
                      onClick={() => moveInterest(i, -1)}
                      disabled={i === 0}
                      className="bg-beige-50/80 border border-[#d4cfc8] text-[#c8bfaf] hover:text-[#8b7355] disabled:opacity-20 text-xs px-1.5 py-0.5 rounded-sm"
                    >
                      ▲
                    </button>
                    <button
                      onClick={() => moveInterest(i, 1)}
                      disabled={i === interests.length - 1}
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

                <div className="p-8 md:p-12">
                  <EditableField
                    value={interest.title}
                    onSave={async (v) => {
                      updateInterest(i, { title: v })
                      await patchInterest(interest.id, { title: v })
                    }}
                    as="h2"
                    className="font-serif text-3xl font-light text-[#2c2c2c] mb-4 leading-tight"
                  />
                  <EditableField
                    value={interest.description}
                    onSave={async (v) => {
                      updateInterest(i, { description: v })
                      await patchInterest(interest.id, { description: v })
                    }}
                    multiline
                    rows={4}
                    as="p"
                    className="font-sans text-sm text-[#555555] leading-relaxed max-w-2xl"
                  />

                  {/* Photo collage */}
                  {!isAdmin && interest.photos.length > 0 && (
                    <PhotoCollage photos={interest.photos} />
                  )}

                  {isAdmin && (
                    <div className="mt-6 border-t border-dashed border-[#d4cfc8] pt-5">
                      <PhotoCollage photos={interest.photos.filter(Boolean)} />
                      <PhotoManager
                        photos={interest.photos}
                        onChange={(photos) => updateInterest(i, { photos })}
                      />
                      <button
                        onClick={() => handleSavePhotos(i, interest.photos)}
                        disabled={savingPhotos[interest.id]}
                        className="mt-3 font-sans text-xs tracking-widest uppercase text-[#8b7355] hover:text-[#2c2c2c] transition-colors border-b border-[#c8bfaf] pb-0.5 disabled:opacity-50"
                      >
                        {savingPhotos[interest.id] ? 'Saving…' : 'Save photos'}
                      </button>
                    </div>
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
              + Add interest
            </button>
          )}
        </>
      )}
    </div>
  )
}
