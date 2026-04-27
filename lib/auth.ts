import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'tv_admin_session'
const ALG = 'HS256'

function getSecretKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('SESSION_SECRET must be set and at least 32 chars long.')
  }
  return new TextEncoder().encode(secret)
}

export async function createSessionCookie() {
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecretKey())

  const store = await cookies()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function destroySessionCookie() {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}

export async function getSession(): Promise<{ role: 'admin' } | null> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), { algorithms: [ALG] })
    if (payload.role === 'admin') return { role: 'admin' }
    return null
  } catch {
    return null
  }
}

export async function requireAdmin() {
  const session = await getSession()
  if (!session) redirect('/admin/login')
  return session
}

export function verifyPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  if (input.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < input.length; i++) {
    mismatch |= input.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}
