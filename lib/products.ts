import 'server-only'
import { db } from './db/client'
import { products, settings, type Product, type NewProduct } from './db/schema'
import { eq, asc } from 'drizzle-orm'

export async function listActiveProducts(): Promise<Product[]> {
  return db
    .select()
    .from(products)
    .where(eq(products.active, true))
    .orderBy(asc(products.orderIndex), asc(products.createdAt))
}

export async function listAllProducts(): Promise<Product[]> {
  return db.select().from(products).orderBy(asc(products.orderIndex), asc(products.createdAt))
}

export async function getProduct(id: string): Promise<Product | null> {
  const rows = await db.select().from(products).where(eq(products.id, id)).limit(1)
  return rows[0] ?? null
}

export async function createProduct(data: Omit<NewProduct, 'id' | 'createdAt' | 'updatedAt'>) {
  const [row] = await db.insert(products).values(data).returning()
  return row
}

export async function updateProduct(
  id: string,
  data: Partial<Omit<NewProduct, 'id' | 'createdAt'>>,
) {
  const [row] = await db
    .update(products)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(products.id, id))
    .returning()
  return row
}

export async function deleteProduct(id: string) {
  await db.delete(products).where(eq(products.id, id))
}

export async function setIframeBlocked(id: string, blocked: boolean) {
  await db
    .update(products)
    .set({ iframeBlocked: blocked, iframeCheckedAt: new Date() })
    .where(eq(products.id, id))
}

export async function getSetting(key: string): Promise<string | null> {
  const rows = await db.select().from(settings).where(eq(settings.key, key)).limit(1)
  return rows[0]?.value ?? null
}

export async function setSetting(key: string, value: string) {
  await db
    .insert(settings)
    .values({ key, value })
    .onConflictDoUpdate({ target: settings.key, set: { value } })
}

export async function getCarouselIntervalSeconds(): Promise<number> {
  const value = await getSetting('carousel_interval_seconds')
  if (value) {
    const n = Number.parseInt(value, 10)
    if (Number.isFinite(n) && n > 0) return n
  }
  const envValue = Number.parseInt(process.env.NEXT_PUBLIC_CAROUSEL_INTERVAL_SECONDS ?? '15', 10)
  return Number.isFinite(envValue) && envValue > 0 ? envValue : 15
}
