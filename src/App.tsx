import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { BannersSection } from '@/components/sections/Banners'
import { VideoModal } from '@/components/sections/VideoModal'
import { Partners } from '@/components/sections/Partners'

export default function App() {
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <Navbar />
      <main>
        <Hero onOpenVideo={() => setVideoOpen(true)} />
        <BannersSection />
        <Partners />
      </main>
      <Footer />
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  )
}
