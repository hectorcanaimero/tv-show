import { NextResponse } from 'next/server'
import { z } from 'zod'
import { setIframeBlocked } from '@/lib/products'

const Body = z.object({ productId: z.string() })

export async function POST(req: Request) {
  const json = await req.json().catch(() => null)
  const parsed = Body.safeParse(json)
  if (!parsed.success) return NextResponse.json({ ok: false }, { status: 400 })
  await setIframeBlocked(parsed.data.productId, true)
  return NextResponse.json({ ok: true })
}
