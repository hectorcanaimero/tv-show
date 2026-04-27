'use client'

import { useEffect, useRef, useState } from 'react'
import type { Product } from '@/lib/db/schema'
import { QrFallback } from './qr-fallback'

const IFRAME_LOAD_TIMEOUT_MS = 6000

export function CarouselSlide({ product }: { product: Product }) {
  const [showFallback, setShowFallback] = useState(product.iframeBlocked === true)
  const loadedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    setShowFallback(product.iframeBlocked === true)
    loadedRef.current = false
    if (product.iframeBlocked === true) return

    timerRef.current = setTimeout(() => {
      if (!loadedRef.current) {
        setShowFallback(true)
        reportBlocked(product.id)
      }
    }, IFRAME_LOAD_TIMEOUT_MS)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [product.id, product.iframeBlocked])

  if (showFallback) return <QrFallback product={product} />

  return (
    <iframe
      key={product.id}
      src={product.productUrl}
      title={product.name}
      tabIndex={-1}
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      referrerPolicy="no-referrer"
      onLoad={() => {
        loadedRef.current = true
        if (timerRef.current) clearTimeout(timerRef.current)
      }}
      className="absolute inset-0 h-full w-full border-0 bg-white"
      style={{ pointerEvents: 'none' }}
    />
  )
}

function reportBlocked(productId: string) {
  fetch('/api/iframe-blocked', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId }),
    keepalive: true,
  }).catch(() => {})
}
