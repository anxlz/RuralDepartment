import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'الرئيسية', href: '#' },
  { label: 'الشركاء',  href: '#partners' },
  { label: 'تواصل معنا', href: '#footer' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
          scrolled
            ? 'nav-blur border-b border-forest/10 py-2 shadow-[0_4px_24px_rgba(45,80,22,0.08)]'
            : 'bg-transparent py-4',
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('#')}
              className="flex items-center gap-2.5 focus:outline-none"
              aria-label="الصفحة الرئيسية"
            >
              <div className="w-9 h-9 rounded-[0.6rem] bg-gradient-to-br from-forest to-botanical flex items-center justify-center text-base shadow-[0_4px_12px_rgba(45,80,22,0.3)]">
                🌿
              </div>
              <div className="flex flex-col leading-tight">
                <span
                  className={cn(
                    'font-extrabold text-[1.05rem] tracking-tight transition-colors duration-300',
                    scrolled ? 'text-olive' : 'text-cream',
                  )}
                >
                  RSAED
                </span>
                <span
                  className={cn(
                    'text-[0.65rem] font-medium transition-colors duration-300',
                    scrolled ? 'text-[var(--text-muted)]' : 'text-cream/60',
                  )}
                >
                  كلية الزراعة — عين شمس
                </span>
              </div>
            </button>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1 list-none">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      'px-3 py-2 rounded-[0.625rem] text-sm font-medium transition-all duration-200',
                      scrolled
                        ? 'text-olive/70 hover:bg-forest/10 hover:text-forest'
                        : 'text-cream/80 hover:bg-white/10 hover:text-cream',
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Mobile burger */}
            <button
              className={cn(
                'md:hidden w-10 h-10 rounded-[0.625rem] flex items-center justify-center transition-all duration-200',
                scrolled
                  ? 'text-forest hover:bg-forest/10'
                  : 'text-cream hover:bg-white/10',
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="القائمة"
            >
              {mobileOpen ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[90] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer — slides from the right (RTL) */}
            <motion.div
              className="absolute top-0 right-0 h-full w-72 max-w-[90vw] bg-cream shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 pt-24 flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-right px-4 py-3 rounded-xl text-base font-medium text-olive hover:bg-forest/10 hover:text-forest transition-all duration-200"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
