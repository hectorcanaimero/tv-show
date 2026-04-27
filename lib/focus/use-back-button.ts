'use client'

import { useEffect } from 'react'
import { isBackKey } from '../tv-keys'

export function useBackButton(handler: () => void) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (isBackKey(event)) {
        event.preventDefault()
        handler()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [handler])
}
