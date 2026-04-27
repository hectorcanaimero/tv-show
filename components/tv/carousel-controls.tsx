'use client'

type Props = {
  status: 'playing' | 'paused'
  index: number
  total: number
  productName: string
}

export function CarouselControls({ status, index, total, productName }: Props) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-black/80 to-transparent px-12 pt-8 pb-16">
        <p className="text-3xl font-semibold drop-shadow-md">{productName}</p>
      </div>

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

        <div className="flex items-center gap-6 text-2xl font-semibold drop-shadow-md">
          {status === 'paused' ? (
            <span className="flex items-center gap-3 rounded-full bg-orange-500/20 px-6 py-3 text-orange-300 ring-2 ring-orange-400">
              <PauseIcon />
              Pausado
            </span>
          ) : (
            <span className="flex items-center gap-3 rounded-full bg-zinc-800/70 px-6 py-3 text-zinc-200">
              <PlayIcon />
              {index + 1} / {total}
            </span>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-10 right-12 z-10 hidden text-base text-zinc-400">
        OK pausa · ← → cambia · Atrás vuelve
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

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
    </svg>
  )
}
