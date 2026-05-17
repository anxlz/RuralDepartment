import { useState, useEffect, useCallback, useRef } from 'react'

interface UseSliderOptions {
  count: number
  interval?: number
  autoPlay?: boolean
}

export function useSlider({ count, interval = 3000, autoPlay = true }: UseSliderOptions) {
  const [current, setCurrent] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isPaused, setIsPaused] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % count) + count) % count)
    },
    [count],
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  const pause = useCallback(() => setIsPaused(true), [])
  const resume = useCallback(() => setIsPaused(false), [])

  useEffect(() => {
    if (!autoPlay || isPaused) return
    timerRef.current = setInterval(next, interval)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [autoPlay, isPaused, interval, next])

  return { current, goTo, next, prev, pause, resume }
}
