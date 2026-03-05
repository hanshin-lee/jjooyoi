import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function requireAdmin(): Promise<NextResponse | null> {
  const cookieStore = await cookies()
  if (cookieStore.get('admin_token')?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return null
}
