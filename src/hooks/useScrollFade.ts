import { useEffect, useRef } from 'react'

export function useScrollFade() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '-40px 0px' },
    )

    // Observe the element itself if it has fade-in class
    if (el.classList.contains('fade-in')) observer.observe(el)

    // Also observe all descendant fade-in elements
    const fadeEls = el.querySelectorAll('.fade-in')
    fadeEls.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return ref
}

/** Standalone observer for a section's fade-in children */
export function useSectionObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '-40px 0px' },
    )

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
