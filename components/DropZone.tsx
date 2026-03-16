'use client'

import { useRef, useState } from 'react'

interface DropZoneProps {
  currentPath?: string
  folder?: string
  onUpload: (path: string) => void
}

export function DropZone({ currentPath, folder = 'uploads', onUpload }: DropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [localPreview, setLocalPreview] = useState<string | null>(null)

  const upload = async (file: File) => {
    setUploading(true)
    setLocalPreview(URL.createObjectURL(file))

    const form = new FormData()
    form.append('file', file)
    form.append('folder', folder)

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form })
      const data = await res.json()
      if (data.path) {
        onUpload(data.path)
        setLocalPreview(null) // let parent's currentPath take over
      }
    } finally {
      setUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) upload(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) upload(file)
    e.target.value = '' // allow re-selecting same file
  }

  const displaySrc = localPreview || currentPath

  return (
    <div
      onClick={() => !uploading && inputRef.current?.click()}
      onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
      onDragLeave={(e) => { e.preventDefault(); setDragging(false) }}
      onDrop={handleDrop}
      className={`relative overflow-hidden rounded-sm border border-dashed transition-colors duration-200 select-none ${
        dragging
          ? 'border-[#8b7355] bg-beige-100'
          : 'border-[#d4cfc8] hover:border-[#8b7355] bg-beige-50 hover:bg-beige-100/60'
      } ${uploading ? '' : 'cursor-pointer'}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      {displaySrc ? (
        <div className="relative group/drop">
          <img src={displaySrc} alt="" className="w-full object-cover max-h-52" />
          <div className="absolute inset-0 bg-black/0 group-hover/drop:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover/drop:opacity-100 font-sans text-xs text-white tracking-widest uppercase transition-opacity">
              Replace
            </span>
          </div>
        </div>
      ) : (
        <div className="py-10 px-4 flex flex-col items-center justify-center gap-2 text-center pointer-events-none">
          {/* Simple upload icon */}
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-[#c8bfaf]">
            <path d="M10 13V3M10 3L6.5 6.5M10 3L13.5 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 14v1a2 2 0 002 2h10a2 2 0 002-2v-1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <p className="font-sans text-xs text-[#aaa098] tracking-widest uppercase">
            Drop image or click to browse
          </p>
        </div>
      )}

      {uploading && (
        <div className="absolute inset-0 bg-beige-50/80 flex items-center justify-center">
          <p className="font-sans text-xs text-[#8b7355] tracking-widest uppercase animate-pulse">
            Uploading…
          </p>
        </div>
      )}
    </div>
  )
}
