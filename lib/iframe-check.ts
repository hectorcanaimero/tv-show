import 'server-only'

export type IframeCheckResult = {
  blocked: boolean
  reason: 'x-frame-options' | 'csp-frame-ancestors' | 'fetch-failed' | 'allowed'
}

const DEFAULT_TIMEOUT_MS = 6000

export async function checkIframeAllowed(url: string): Promise<IframeCheckResult> {
  let response: Response
  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)
    try {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent':
            'Mozilla/5.0 (SmartTV; Linux; Tizen 6.0) AppleWebKit/537.36 Chrome/120 Safari/537.36',
        },
      })
    } finally {
      clearTimeout(timer)
    }
  } catch {
    return { blocked: true, reason: 'fetch-failed' }
  }

  const xfo = response.headers.get('x-frame-options')?.toLowerCase().trim()
  if (xfo === 'deny' || xfo === 'sameorigin' || xfo?.startsWith('allow-from')) {
    return { blocked: true, reason: 'x-frame-options' }
  }

  const csp = response.headers.get('content-security-policy')?.toLowerCase() ?? ''
  if (csp.includes('frame-ancestors')) {
    const match = csp.match(/frame-ancestors([^;]*)/)
    const directive = match?.[1]?.trim() ?? ''
    if (
      directive === "'none'" ||
      directive === "'self'" ||
      (directive && !directive.includes('*') && !directive.includes('http'))
    ) {
      return { blocked: true, reason: 'csp-frame-ancestors' }
    }
  }

  return { blocked: false, reason: 'allowed' }
}
