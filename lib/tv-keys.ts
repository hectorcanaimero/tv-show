export const TV_KEYS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  OK: 'Enter',
  ESCAPE: 'Escape',
} as const

const BACK_KEY_CODES = new Set([8, 27, 461, 10009])

export function isBackKey(event: KeyboardEvent): boolean {
  if (event.key === 'Escape' || event.key === 'Backspace' || event.key === 'GoBack') return true
  if ('keyCode' in event && BACK_KEY_CODES.has((event as KeyboardEvent).keyCode)) return true
  return false
}

export function isOkKey(event: KeyboardEvent): boolean {
  return event.key === 'Enter' || event.key === ' '
}
