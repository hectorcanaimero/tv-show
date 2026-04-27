import { LoginForm } from './login-form'

export const metadata = { title: 'Admin · Entrar' }

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900">TV Showcase</h1>
        <p className="mb-6 text-sm text-zinc-500">Informe sua senha para gerenciar.</p>
        <LoginForm />
      </div>
    </div>
  )
}
