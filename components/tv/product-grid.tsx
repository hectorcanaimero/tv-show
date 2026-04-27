'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { setFocus } from '@noriginmedia/norigin-spatial-navigation'
import type { Product } from '@/lib/db/schema'
import { ProductCard } from './product-card'

export function ProductGrid({ items }: { items: Product[] }) {
  const router = useRouter()

  useEffect(() => {
    if (items.length === 0) return
    setFocus(`product-${items[0].id}`)
  }, [items])

  return (
    <div className="grid grid-cols-4 gap-8">
      {items.map((item, index) => (
        <ProductCard
          key={item.id}
          product={item}
          focusKey={`product-${item.id}`}
          onSelect={() => router.push(`/carousel?start=${item.id}`)}
          autoFocus={index === 0}
        />
      ))}
    </div>
  )
}
