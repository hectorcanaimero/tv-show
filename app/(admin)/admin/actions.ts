'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import {
  createProduct,
  deleteProduct,
  setIframeBlocked,
  setSetting,
  updateProduct,
} from '@/lib/products'
import { checkIframeAllowed } from '@/lib/iframe-check'
import {
  createSessionCookie,
  destroySessionCookie,
  requireAdmin,
  verifyPassword,
} from '@/lib/auth'

export async function loginAction(_prev: unknown, formData: FormData) {
  const password = String(formData.get('password') ?? '')
  if (!verifyPassword(password)) {
    return { error: 'Contraseña incorrecta' }
  }
  await createSessionCookie()
  redirect('/admin')
}

export async function logoutAction() {
  await destroySessionCookie()
  redirect('/admin/login')
}

const ProductInput = z.object({
  name: z.string().min(1).max(120),
  description: z.string().max(2000).optional().nullable(),
  imageUrl: z.string().url(),
  productUrl: z.string().url(),
  price: z.string().max(40).optional().nullable(),
  orderIndex: z.coerce.number().int().min(0).default(0),
  active: z.coerce.boolean().default(true),
})

function readProductForm(formData: FormData) {
  return ProductInput.parse({
    name: formData.get('name'),
    description: formData.get('description') || null,
    imageUrl: formData.get('imageUrl'),
    productUrl: formData.get('productUrl'),
    price: formData.get('price') || null,
    orderIndex: formData.get('orderIndex') ?? 0,
    active: formData.get('active') === 'on',
  })
}

export async function createProductAction(formData: FormData) {
  await requireAdmin()
  const data = readProductForm(formData)
  const created = await createProduct(data)
  const result = await checkIframeAllowed(data.productUrl)
  await setIframeBlocked(created.id, result.blocked)
  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}

export async function updateProductAction(id: string, formData: FormData) {
  await requireAdmin()
  const data = readProductForm(formData)
  await updateProduct(id, data)
  const result = await checkIframeAllowed(data.productUrl)
  await setIframeBlocked(id, result.blocked)
  revalidatePath('/admin')
  revalidatePath('/')
  redirect('/admin')
}

export async function deleteProductAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  if (!id) return
  await deleteProduct(id)
  revalidatePath('/admin')
  revalidatePath('/')
}

export async function recheckIframeAction(formData: FormData) {
  await requireAdmin()
  const id = String(formData.get('id') ?? '')
  const url = String(formData.get('url') ?? '')
  if (!id || !url) return
  const result = await checkIframeAllowed(url)
  await setIframeBlocked(id, result.blocked)
  revalidatePath('/admin')
}

export async function updateIntervalAction(formData: FormData) {
  await requireAdmin()
  const value = String(formData.get('seconds') ?? '15')
  const n = Number.parseInt(value, 10)
  if (!Number.isFinite(n) || n <= 0) return
  await setSetting('carousel_interval_seconds', String(n))
  revalidatePath('/admin')
  revalidatePath('/carousel')
}
