import { useState, useEffect, useCallback, useRef } from 'react'

interface UseSliderOptions {
  count: number
  interval?: number
  autoPlay?: boolean
}

export type SlideDirection = 'left' | 'right'

export function useSlider({ count, interval = 3000, autoPlay = true }: UseSliderOptions) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState<SlideDirection>('left')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  // Keep a ref of current to avoid stale closures in the interval
  const currentRef = useRef(0)

  const goTo = useCallback(
    (index: number, dir?: SlideDirection) => {
      const next = ((index % count) + count) % count
      const resolvedDir = dir ?? (next > currentRef.current ? 'left' : 'right')
      setDirection(resolvedDir)
      setCurrent(next)
      currentRef.current = next
    },
    [count],
  )

  const next = useCallback(() => goTo(currentRef.current + 1, 'left'),  [goTo])
  const prev = useCallback(() => goTo(currentRef.current - 1, 'right'), [goTo])

  const pause  = useCallback(() => setIsPaused(true),  [])
  const resume = useCallback(() => setIsPaused(false), [])

  useEffect(() => {
    if (!autoPlay || isPaused) return
    timerRef.current = setInterval(next, interval)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [autoPlay, isPaused, interval, next])

  return { current, direction, goTo, next, prev, pause, resume }
}
