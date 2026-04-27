import Link from 'next/link'
import { listAllProducts, getCarouselIntervalSeconds } from '@/lib/products'
import {
  deleteProductAction,
  recheckIframeAction,
  updateIntervalAction,
} from '../actions'

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const items = await listAllProducts()
  const intervalSeconds = await getCarouselIntervalSeconds()

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Configurações</h2>
        <form action={updateIntervalAction} className="mt-4 flex items-end gap-3">
          <label className="flex flex-col text-sm text-zinc-600">
            Intervalo do carrossel (segundos)
            <input
              type="number"
              name="seconds"
              defaultValue={intervalSeconds}
              min={3}
              max={300}
              className="mt-1 w-40 rounded-md border border-zinc-300 px-3 py-2"
            />
          </label>
          <button className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700">
            Salvar
          </button>
        </form>
      </section>

      <section className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Itens ({items.length})</h2>
          <Link
            href="/admin/new"
            className="rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600"
          >
            + Novo item
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-zinc-500">Sem itens. Cadastre o primeiro.</p>
        ) : (
          <ul className="divide-y divide-zinc-200">
            {items.map((p) => (
              <li key={p.id} className="flex items-center gap-4 py-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="h-16 w-16 rounded-md bg-zinc-100 object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{p.name}</p>
                  <p className="truncate text-sm text-zinc-500">{p.productUrl}</p>
                  <div className="mt-1 flex items-center gap-2 text-xs">
                    <span
                      className={`rounded-full px-2 py-0.5 ${
                        p.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-zinc-200 text-zinc-600'
                      }`}
                    >
                      {p.active ? 'Ativo' : 'Inativo'}
                    </span>
                    <IframeStatus blocked={p.iframeBlocked} />
                    <span className="text-zinc-400">ordem: {p.orderIndex}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <form action={recheckIframeAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <input type="hidden" name="url" value={p.productUrl} />
                    <button className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50">
                      Verificar iframe
                    </button>
                  </form>
                  <Link
                    href={`/admin/${p.id}`}
                    className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50"
                  >
                    Editar
                  </Link>
                  <form action={deleteProductAction}>
                    <input type="hidden" name="id" value={p.id} />
                    <button className="rounded-md border border-red-300 bg-red-50 px-3 py-1.5 text-sm text-red-700 hover:bg-red-100">
                      Excluir
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

function IframeStatus({ blocked }: { blocked: boolean | null }) {
  if (blocked === true)
    return <span className="rounded-full bg-amber-100 px-2 py-0.5 text-amber-800">Iframe bloqueado · usa QR</span>
  if (blocked === false)
    return <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">Iframe OK</span>
  return <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-500">Iframe não verificado</span>
}
