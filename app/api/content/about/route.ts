import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabaseAdmin'
import { requireAdmin } from '@/lib/adminCheck'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .eq('id', 'main')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const body = await req.json()
  const db = createAdminClient()

  const { error } = await db
    .from('about_content')
    .upsert({ id: 'main', ...body }, { onConflict: 'id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
