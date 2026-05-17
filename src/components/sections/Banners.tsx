import { useEffect, useRef, useState } from 'react'
import { BANNERS } from '@/lib/assets'

interface BannerCardProps {
  src: string
  alt: string
  caption: string
  className?: string
  animDelay?: string
}

function BannerCard({ src, alt, caption, className = '', animDelay = '0s' }: BannerCardProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div
      className={`banner-frame fade-in ${className}`}
      style={{ transitionDelay: animDelay }}
    >
      <div
        className="rounded-[0.875rem] overflow-hidden bg-[#0a1204] relative flex items-center justify-center"
        style={{ minHeight: '340px' }}
      >
        {/* Image */}
        {!failed ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-contain absolute inset-0 transition-transform duration-500 ease-in-out group-hover:scale-[1.03]"
            onError={() => setFailed(true)}
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-cream/40 text-sm font-semibold"
            style={{ background: 'linear-gradient(135deg, rgba(45,80,22,0.3), rgba(28,43,10,0.6))' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-10 h-10 opacity-25">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21,15 16,10 5,21" />
            </svg>
            {alt}
          </div>
        )}

        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 40%, rgba(0,0,0,0.25) 100%)' }}
        />

        {/* Corner ornaments */}
        <div className="absolute top-2 right-2 w-6 h-6 z-[3] pointer-events-none border-t-2 border-r-2 border-gold/60 rounded-[0_0.2rem_0_0]" />
        <div className="absolute top-2 left-2 w-6 h-6 z-[3] pointer-events-none border-t-2 border-l-2 border-gold/60 rounded-[0.2rem_0_0_0]" />
        <div className="absolute bottom-2 right-2 w-6 h-6 z-[3] pointer-events-none border-b-2 border-r-2 border-gold/60 rounded-[0_0_0_0.2rem]" />
        <div className="absolute bottom-2 left-2 w-6 h-6 z-[3] pointer-events-none border-b-2 border-l-2 border-gold/60 rounded-[0_0_0.2rem_0]" />

        {/* Caption */}
        <div
          className="absolute bottom-0 left-0 right-0 z-[2] flex items-center gap-2 px-4 py-3"
          style={{ background: 'linear-gradient(transparent, rgba(10,16,4,0.82))' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
          <span className="text-[0.78rem] font-semibold text-cream/85 tracking-[0.01em]">{caption}</span>
        </div>
      </div>
    </div>
  )
}

export function BannersSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible')
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.1, rootMargin: '-40px 0px' },
    )
    el.querySelectorAll('.fade-in').forEach((fe) => observer.observe(fe))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, var(--olive) 0%, var(--bg) 100%)' }}
    >
      {/* Radial mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.06) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(45,80,22,0.08) 0%, transparent 60%)',
        }}
      />

      <div className="container-max relative z-10">
        {/* Header */}
        <div className="text-center mb-9 fade-in">
          <div className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.14em] uppercase text-gold/80 mb-2">
            <span className="block w-8 h-px bg-gold/40" />
            من القسم
            <span className="block w-8 h-px bg-gold/40" />
          </div>
          <div className="text-[1.05rem] font-bold text-cream/85 tracking-tight">
            أحدث الإعلانات والفعاليات
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 max-w-[960px] mx-auto">
          {BANNERS.map((banner, i) => (
            <BannerCard
              key={banner.src}
              src={banner.src}
              alt={banner.alt}
              caption={banner.caption}
              animDelay={`${(i + 1) * 0.08}s`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
