import screenfull from 'screenfull'

export default function key(e) {
  // Space + Shift | Page Up | LEFT | UP: Previous page
  if (
    (e.which === 32 && e.shiftKey) ||
    e.which === 33 ||
    e.which === 37 ||
    e.which === 38
  )
    return 'prev'

  // Space | Page Down | RIGHT | DOWN: Next page
  if (
    (e.which === 32 && !e.shiftKey) ||
    e.which === 34 ||
    e.which === 39 ||
    e.which === 40
  )
    return 'next'

  // Toggle fullscreen [f / F11]
  if (
    (e.which === 70 || e.which === 122) &&
    !e.altKey &&
    !e.ctrlKey &&
    !e.metaKey &&
    screenfull &&
    screenfull.enabled
  )
    return 'fullscreen'

  // Open presenter view [p]
  if (e.which === 80 && !e.altKey && !e.ctrlKey && !e.metaKey)
    return 'presenter'

  // Last slide [end]
  if (e.which === 35) return 'last'

  // First slide [Home]
  if (e.which === 36) return 'first'

  return undefined
}
