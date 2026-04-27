import { NextResponse } from 'next/server'
import { z } from 'zod'
import { checkIframeAllowed } from '@/lib/iframe-check'
import { setIframeBlocked } from '@/lib/products'
import { requireAdmin } from '@/lib/auth'

const Body = z.object({
  url: z.string().url(),
  productId: z.string().optional(),
})

export async function POST(req: Request) {
  await requireAdmin()
  const json = await req.json().catch(() => null)
  const parsed = Body.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid body' }, { status: 400 })
  }

  const result = await checkIframeAllowed(parsed.data.url)
  if (parsed.data.productId) {
    await setIframeBlocked(parsed.data.productId, result.blocked)
  }
  return NextResponse.json(result)
}
