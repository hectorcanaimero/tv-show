'use client'

import { useActionState } from 'react'
import { loginAction } from '../actions'

const initial = { error: '' }

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initial)

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm font-medium text-zinc-700">
        Contraseña
        <input
          type="password"
          name="password"
          autoFocus
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-base text-zinc-900 focus:border-zinc-900 focus:outline-none"
        />
      </label>
      {state?.error ? <p className="text-sm text-red-600">{state.error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-700 disabled:opacity-50"
      >
        {pending ? 'Entrando…' : 'Entrar'}
      </button>
    </form>
  )
}
