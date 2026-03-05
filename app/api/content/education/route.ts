import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabaseAdmin'
import { requireAdmin } from '@/lib/adminCheck'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('education')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await req.json()
  const db = createAdminClient()

  const { data, error } = await db.from('education').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id, ...fields } = await req.json()
  const db = createAdminClient()

  const { error } = await db.from('education').update(fields).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await req.json()
  const db = createAdminClient()

  const { error } = await db.from('education').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
