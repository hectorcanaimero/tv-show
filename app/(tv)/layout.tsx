import { FocusProvider } from '@/lib/focus/provider'

export default function TvLayout({ children }: { children: React.ReactNode }) {
  return (
    <FocusProvider>
      <div className="tv-screen min-h-screen w-full bg-zinc-950 text-zinc-100">{children}</div>
    </FocusProvider>
  )
}
