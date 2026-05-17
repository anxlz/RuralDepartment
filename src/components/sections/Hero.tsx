import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSlider } from '@/hooks/useSlider'
import { HERO_SLIDES } from '@/lib/assets'

const stats = [
  { emoji: '📖', value: '240+', label: 'منشور'          },
  { emoji: '🔬', value: '85+',  label: 'بحث علمي'       },
  { emoji: '⭐', value: '30+',  label: 'عام من التميز'  },
  { emoji: '🎓', value: '1200+', label: 'طالب'          },
]

const containerVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

interface HeroProps {
  onOpenVideo: () => void
}

export function Hero({ onOpenVideo }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { current, goTo, next, prev, pause, resume } = useSlider({
    count: HERO_SLIDES.length,
    interval: 3000,
  })

  // Pause on hover
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    return () => {
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
    }
  }, [pause, resume])

  // Touch swipe support
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    let startX = 0
    const onStart = (e: TouchEvent) => { startX = e.touches[0].clientX }
    const onEnd = (e: TouchEvent) => {
      const diff = startX - e.changedTouches[0].clientX
      if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    }
    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchend', onEnd)
    }
  }, [next, prev])

  const scrollToPartners = () => {
    document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Slide backgrounds ── */}
      <div className="absolute inset-0 z-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={cn(
              'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[1200ms] ease-in-out',
              i === current ? 'opacity-100' : 'opacity-0',
            )}
            style={{ backgroundImage: `url(${slide.src})` }}
            aria-hidden={i !== current}
          />
        ))}
      </div>

      {/* ── Overlays ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(135deg, rgba(28,43,10,0.82) 0%, rgba(45,80,22,0.65) 50%, rgba(10,20,4,0.75) 100%)',
        }}
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(61,107,30,0.18) 0%, transparent 55%)',
        }}
      />
      <div className="absolute inset-0 z-[2] pattern-overlay" />

      {/* ── Slider arrows ── */}
      {/* RTL: prev = right arrow, next = left arrow */}
      <button
        onClick={next}
        aria-label="الصورة السابقة"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-cream glass border border-white/20 transition-all duration-200 hover:bg-gold/30 hover:border-gold/50 hover:scale-105 active:scale-95"
      >
        <ChevronRight size={20} strokeWidth={2.5} />
      </button>

      <button
        onClick={prev}
        aria-label="الصورة التالية"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center text-cream glass border border-white/20 transition-all duration-200 hover:bg-gold/30 hover:border-gold/50 hover:scale-105 active:scale-95"
      >
        <ChevronLeft size={20} strokeWidth={2.5} />
      </button>

      {/* ── Hero content ── */}
      <div className="relative z-10 container-max px-4 sm:px-6 text-center py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-[52rem] mx-auto"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-gold/30 text-gold text-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-gold animate-[pulseDot_2s_ease-in-out_infinite]" />
              كلية الزراعة — جامعة عين شمس
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-black text-cream leading-[1.1] tracking-tight mb-3"
          >
            أرشيف الإنجازات
          </motion.h1>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-5">
            <span className="gradient-text text-[clamp(1.25rem,3vw,2rem)] font-bold italic">
              قسم المجتمع الريفي
            </span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-[1.05rem] text-cream/72 max-w-[36rem] mx-auto leading-[1.75] mb-10"
          >
            مستودع رقمي شامل للإنجازات الأكاديمية والمنشورات البحثية ومحطات القسم التاريخية على مدى عقود من التميز في العلوم الزراعية.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center items-center mb-12"
          >
            {/* Video button */}
            <button onClick={onOpenVideo} className="btn-glass flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" className="w-3 h-3 fill-olive ml-0.5" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="5,3 19,12 5,21" />
                </svg>
              </span>
              شاهد الفيديو
            </button>

            {/* Scroll down */}
            <button onClick={scrollToPartners} className="btn-glass flex items-center gap-2">
              <ChevronDown size={16} />
              شاهد المزيد
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-[44rem] mx-auto"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass border border-cream/[0.12] rounded-2xl px-3 py-4 text-center transition-all duration-300 hover:border-gold/35 hover:bg-gold/10 cursor-default"
                whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(201,168,76,0.15)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <div className="text-[1.4rem] mb-1">{stat.emoji}</div>
                <div className="text-[1.75rem] font-extrabold text-gold leading-none">{stat.value}</div>
                <div className="text-[0.7rem] text-cream/60 mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Slide dots ── */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`الصورة ${i + 1}`}
            className={cn(
              'h-2 rounded-full transition-all duration-300 border-none cursor-pointer',
              i === current ? 'bg-gold w-6' : 'bg-cream/40 w-2 hover:bg-cream/70',
            )}
          />
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-20"
        style={{ translateX: '-50%' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-6 h-10 rounded-full border-2 border-cream/35 flex items-start justify-center pt-1.5">
          <div className="w-1 h-3 rounded-full bg-cream/50" />
        </div>
      </motion.div>

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent z-[5]" />
    </section>
  )
}
