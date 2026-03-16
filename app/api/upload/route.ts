import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { requireAdmin } from '@/lib/adminCheck'

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const folder = (formData.get('folder') as string) || 'uploads'

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  // Only allow images
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
  }

  // Sanitize filename and prepend timestamp to avoid collisions
  const ext = path.extname(file.name).toLowerCase() || '.jpg'
  const base = path.basename(file.name, ext).replace(/[^a-z0-9]+/gi, '-').toLowerCase()
  const filename = `${Date.now()}-${base}${ext}`

  const dir = path.join(process.cwd(), 'public', folder)
  await mkdir(dir, { recursive: true })
  await writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()))

  return NextResponse.json({ path: `/${folder}/${filename}` })
}
