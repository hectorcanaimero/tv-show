import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const products = sqliteTable('products', {
  id: text('id').primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description'),
  imageUrl: text('image_url').notNull(),
  productUrl: text('product_url').notNull(),
  price: text('price'),
  iframeBlocked: integer('iframe_blocked', { mode: 'boolean' }),
  iframeCheckedAt: integer('iframe_checked_at', { mode: 'timestamp' }),
  orderIndex: integer('order_index').notNull().default(0),
  active: integer('active', { mode: 'boolean' }).notNull().default(true),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
})

export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull(),
})

export type Product = typeof products.$inferSelect
export type NewProduct = typeof products.$inferInsert
export type Setting = typeof settings.$inferSelect
