'use client'

import { QRCodeSVG } from 'qrcode.react'
import type { Product } from '@/lib/db/schema'

export function QrFallback({ product }: { product: Product }) {
  return (
    <div className="absolute inset-0 grid grid-cols-2 items-center bg-zinc-950 px-20 py-16 text-zinc-100">
      <div className="flex h-full items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="max-h-[80vh] max-w-full rounded-2xl object-contain"
          draggable={false}
        />
      </div>

      <div className="flex flex-col gap-8 px-8">
        <h1 className="text-6xl font-bold leading-tight tracking-tight">{product.name}</h1>
        {product.price ? (
          <p className="text-5xl font-semibold text-orange-400">{product.price}</p>
        ) : null}
        {product.description ? (
          <p className="text-2xl leading-relaxed text-zinc-300">{product.description}</p>
        ) : null}

        <div className="mt-4 flex items-center gap-8 rounded-2xl bg-white p-6 text-zinc-900">
          <QRCodeSVG value={product.productUrl} size={240} marginSize={2} level="M" />
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold">Escaneá con tu celular</p>
            <p className="text-xl text-zinc-600">Para ver el producto en detalle</p>
          </div>
        </div>
      </div>
    </div>
  )
}
