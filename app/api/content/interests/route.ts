import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabaseAdmin'
import { requireAdmin } from '@/lib/adminCheck'
import { supabase } from '@/lib/supabase'

// Supabase table required:
// create table interests (
//   id uuid primary key default gen_random_uuid(),
//   title text not null default '',
//   description text not null default '',
//   photos jsonb not null default '[]',
//   sort_order integer not null default 0,
//   created_at timestamptz default now()
// );
// alter table interests enable row level security;
// create policy "Public read" on interests for select using (true);
// create policy "Admin all" on interests for all using (true);

export async function GET() {
  const { data, error } = await supabase
    .from('interests')
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

  const { data, error } = await db.from('interests').insert(body).select().single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id, ...fields } = await req.json()
  const db = createAdminClient()

  const { error } = await db.from('interests').update(fields).eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  const denied = await requireAdmin()
  if (denied) return denied

  const { id } = await req.json()
  const db = createAdminClient()

  const { error } = await db.from('interests').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
