'use client'

import { useState } from 'react'
import { useAdmin } from '@/contexts/AdminContext'

interface EditableFieldProps {
  value: string
  onSave: (newValue: string) => Promise<void>
  multiline?: boolean
  className?: string
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li'
  rows?: number
}

export function EditableField({
  value,
  onSave,
  multiline = false,
  className = '',
  as: Tag = 'span',
  rows = 3,
}: EditableFieldProps) {
  const { isAdmin } = useAdmin()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)
  const [displayValue, setDisplayValue] = useState(value)
  const [saving, setSaving] = useState(false)

  // Keep displayValue in sync if parent value changes (e.g. after DB fetch)
  if (value !== displayValue && !editing) {
    setDisplayValue(value)
    setDraft(value)
  }

  if (!isAdmin) {
    return <Tag className={className}>{displayValue}</Tag>
  }

  const handleEdit = () => {
    setDraft(displayValue)
    setEditing(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await onSave(draft)
      setDisplayValue(draft)
    } finally {
      setSaving(false)
      setEditing(false)
    }
  }

  const handleCancel = () => {
    setDraft(displayValue)
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="relative w-full">
        {multiline ? (
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={rows}
            autoFocus
            className={`${className} w-full bg-[#fdf8f0] border border-[#8b7355] rounded px-2 py-1 resize-y outline-none`}
          />
        ) : (
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSave()
              if (e.key === 'Escape') handleCancel()
            }}
            className={`${className} w-full bg-[#fdf8f0] border border-[#8b7355] rounded px-2 py-0.5 outline-none`}
          />
        )}
        <div className="flex gap-3 mt-1.5">
          <button
            onClick={handleSave}
            disabled={saving}
            className="font-sans text-xs text-[#8b7355] hover:text-[#2c2c2c] transition-colors disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={handleCancel}
            className="font-sans text-xs text-[#aaa098] hover:text-[#2c2c2c] transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <Tag
      className={`${className} cursor-pointer hover:outline hover:outline-1 hover:outline-dashed hover:outline-[#8b7355]/50 hover:outline-offset-1 rounded-sm`}
      onClick={handleEdit}
      title="Click to edit"
    >
      {displayValue}
    </Tag>
  )
}
