import { listActiveProducts } from '@/lib/products'
import { ProductGrid } from '@/components/tv/product-grid'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const items = await listActiveProducts()

  if (items.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-16 text-center">
        <h1 className="text-5xl font-semibold">Sem itens cadastrados</h1>
        <p className="mt-6 text-2xl text-zinc-400">
          Acesse <span className="text-orange-400">/admin</span> e cadastre os primeiros itens
          para começar.
        </p>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen flex-col p-12">
      <header className="mb-10 flex items-baseline justify-between">
        <h1 className="text-5xl font-bold tracking-tight">Itens</h1>
        <p className="text-xl text-zinc-400">{items.length} disponíveis</p>
      </header>
      <ProductGrid items={items} />
    </main>
  )
}
