'use client'

import { useCallback, useEffect, useReducer, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Product } from '@/lib/db/schema'
import { isBackKey, isOkKey } from '@/lib/tv-keys'
import { CarouselSlide } from './carousel-slide'
import { CarouselControls } from './carousel-controls'

type State = { status: 'playing' | 'paused'; index: number; tickKey: number }
type Action =
  | { type: 'TICK' }
  | { type: 'NEXT' }
  | { type: 'PREV' }
  | { type: 'TOGGLE' }
  | { type: 'JUMP'; index: number }

function makeReducer(length: number) {
  return function reducer(state: State, action: Action): State {
    switch (action.type) {
      case 'TICK':
        return { ...state, index: (state.index + 1) % length, tickKey: state.tickKey + 1 }
      case 'NEXT':
        return { ...state, index: (state.index + 1) % length, tickKey: state.tickKey + 1 }
      case 'PREV':
        return { ...state, index: (state.index - 1 + length) % length, tickKey: state.tickKey + 1 }
      case 'TOGGLE':
        return { ...state, status: state.status === 'playing' ? 'paused' : 'playing' }
      case 'JUMP':
        return { ...state, index: action.index, tickKey: state.tickKey + 1 }
    }
  }
}

type Props = {
  items: Product[]
  initialIndex: number
  intervalSeconds: number
}

export function Carousel({ items, initialIndex, intervalSeconds }: Props) {
  const router = useRouter()
  const reducer = useRef(makeReducer(items.length)).current
  const [state, dispatch] = useReducer(reducer, {
    status: 'playing',
    index: initialIndex,
    tickKey: 0,
  })

  const goBack = useCallback(() => router.push('/'), [router])

  useEffect(() => {
    if (state.status !== 'playing') return
    const interval = setInterval(() => dispatch({ type: 'TICK' }), intervalSeconds * 1000)
    return () => clearInterval(interval)
  }, [state.status, state.tickKey, intervalSeconds])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isBackKey(event)) {
        event.preventDefault()
        goBack()
        return
      }
      if (isOkKey(event)) {
        event.preventDefault()
        dispatch({ type: 'TOGGLE' })
        return
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault()
        dispatch({ type: 'NEXT' })
        return
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        dispatch({ type: 'PREV' })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [goBack])

  const product = items[state.index]

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-black">
      <CarouselSlide key={product.id} product={product} />
      <CarouselControls
        status={state.status}
        index={state.index}
        total={items.length}
        productName={product.name}
      />
    </div>
  )
}
