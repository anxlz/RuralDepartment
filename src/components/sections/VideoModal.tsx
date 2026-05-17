import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { VIDEO, IMAGES } from '@/lib/assets'

interface VideoModalProps {
  open: boolean
  onClose: () => void
}

export function VideoModal({ open, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Keyboard dismiss
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Pause video on close
  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause()
    }
  }, [open])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
        >
          <motion.div
            className="w-full max-w-[56rem] rounded-[1.25rem] overflow-hidden border border-gold/20 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            style={{ background: 'var(--olive)' }}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gold/12">
              <span className="font-bold text-cream text-[0.95rem]">فيديو القسم</span>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-cream/60 hover:text-cream hover:bg-cream/10 transition-all duration-200"
                aria-label="إغلاق"
              >
                <X size={16} />
              </button>
            </div>

            {/* Video */}
            <div className="relative pb-[56.25%] h-0 overflow-hidden">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain bg-black"
                controls
                preload="none"
                poster={IMAGES.firstBanner}
              >
                <source src={VIDEO.firstVideo} type="video/mp4" />
                متصفحك لا يدعم تشغيل الفيديو.
              </video>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
