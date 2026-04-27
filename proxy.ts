import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const COOKIE_NAME = 'tv_admin_session'

async function isValidSession(token: string | undefined): Promise<boolean> {
  if (!token) return false
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) return false
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret), {
      algorithms: ['HS256'],
    })
    return payload.role === 'admin'
  } catch {
    return false
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (pathname === '/admin/login') return NextResponse.next()

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (await isValidSession(token)) return NextResponse.next()

  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*'],
}
