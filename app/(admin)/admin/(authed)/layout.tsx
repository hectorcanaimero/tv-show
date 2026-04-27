import Link from 'next/link'
import { logoutAction } from '../actions'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-100 text-zinc-900">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="text-xl font-bold">
            TV Showcase · Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin" className="hover:underline">
              Productos
            </Link>
            <Link href="/admin/new" className="hover:underline">
              Nuevo
            </Link>
            <Link href="/" className="hover:underline">
              Ver TV
            </Link>
            <form action={logoutAction}>
              <button className="rounded-md bg-zinc-900 px-3 py-1.5 text-white hover:bg-zinc-700">
                Salir
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
    </div>
  )
}
