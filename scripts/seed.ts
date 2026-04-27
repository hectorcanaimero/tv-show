import { drizzle } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import { products } from '../lib/db/schema'

const url = process.env.TURSO_DATABASE_URL
if (!url) {
  throw new Error('TURSO_DATABASE_URL is not set. Did you forget .env.local?')
}

const db = drizzle(createClient({ url, authToken: process.env.TURSO_AUTH_TOKEN }))

const sample = [
  {
    name: 'Auriculares Wireless Pro',
    description: 'Cancelación de ruido activa, 30h de batería.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    productUrl: 'https://example.com',
    price: '$ 89.999',
    orderIndex: 0,
    active: true,
  },
  {
    name: 'Smartwatch Sport Edition',
    description: 'GPS integrado, 50m sumergible, monitor cardíaco.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    productUrl: 'https://www.mercadolibre.com.ar/',
    price: '$ 149.999',
    orderIndex: 1,
    active: true,
  },
  {
    name: 'Cámara Mirrorless 4K',
    description: 'Sensor full frame, video 4K 60fps, estabilizador 5 ejes.',
    imageUrl: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80',
    productUrl: 'https://www.amazon.com/',
    price: '$ 1.499.999',
    orderIndex: 2,
    active: true,
  },
  {
    name: 'Zapatillas Running Air',
    description: 'Amortiguación premium para corredores de larga distancia.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    productUrl: 'https://example.org',
    price: '$ 79.999',
    orderIndex: 3,
    active: true,
  },
]

async function main() {
  console.log('Seeding products...')
  for (const p of sample) {
    await db.insert(products).values(p)
    console.log(`  + ${p.name}`)
  }
  console.log('Done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
