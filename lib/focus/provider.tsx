'use client'

import { useEffect, useRef } from 'react'
import { init, setKeyMap } from '@noriginmedia/norigin-spatial-navigation'

export function FocusProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true
    init({
      debug: false,
      visualDebug: false,
      throttle: 50,
      throttleKeypresses: true,
    })
    setKeyMap({
      left: ['ArrowLeft', 37],
      right: ['ArrowRight', 39],
      up: ['ArrowUp', 38],
      down: ['ArrowDown', 40],
      enter: ['Enter', 13],
    })
  }, [])

  return <>{children}</>
}
