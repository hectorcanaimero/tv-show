'use client'

type Props = {
  status: 'playing' | 'paused'
  index: number
  total: number
  onToggle: () => void
  onBack: () => void
}

export function CarouselControls({ status, index, total, onToggle, onBack }: Props) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent px-12 pt-16 pb-10">
        <div className="flex items-center gap-3">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`h-3 rounded-full transition-all ${
                i === index ? 'w-12 bg-orange-400' : 'w-3 bg-zinc-500'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 text-2xl font-semibold drop-shadow-md">
          {status === 'paused' ? (
            <>
              <button
                onClick={onBack}
                className="pointer-events-auto flex items-center gap-3 rounded-full bg-zinc-800/80 px-6 py-3 text-zinc-100 ring-2 ring-zinc-600 hover:bg-zinc-700"
              >
                Voltar
              </button>
              <button
                onClick={onToggle}
                className="pointer-events-auto flex items-center gap-3 rounded-full bg-orange-500 px-6 py-3 text-white ring-2 ring-orange-400 hover:bg-orange-600"
              >
                <PlayIcon />
                Continuar
              </button>
            </>
          ) : (
            <span className="flex items-center gap-3 rounded-full bg-zinc-800/70 px-6 py-3 text-zinc-200">
              <PlayIcon />
              {index + 1} / {total}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
