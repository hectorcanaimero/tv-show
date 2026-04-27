'use client'

import { useEffect } from 'react'
import { useFocusable } from '@noriginmedia/norigin-spatial-navigation'
import type { Product } from '@/lib/db/schema'

type Props = {
  product: Product
  focusKey: string
  onSelect: () => void
  autoFocus?: boolean
}

export function ProductCard({ product, focusKey, onSelect, autoFocus }: Props) {
  const { ref, focused, focusSelf } = useFocusable<HTMLDivElement>({
    focusKey,
    onEnterPress: onSelect,
  })

  useEffect(() => {
    if (autoFocus) focusSelf()
  }, [autoFocus, focusSelf])

  return (
    <div
      ref={ref}
      className={`group flex flex-col overflow-hidden rounded-2xl bg-zinc-900 ${
        focused ? 'tv-focus-ring' : 'outline-none'
      }`}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-zinc-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
      <div className="flex flex-col gap-2 p-5">
        <h2 className="line-clamp-2 text-2xl font-semibold leading-tight">{product.name}</h2>
        {product.price ? (
          <p className="text-xl font-medium text-orange-400">{product.price}</p>
        ) : null}
      </div>
    </div>
  )
}
