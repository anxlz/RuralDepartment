// ============================================================
//  ASSETS CONFIGURATION
//  All media paths are defined here — change once, works everywhere
//  Assets live in /public/assets/ and are served at /assets/...
// ============================================================

const BASE = '/assets'

export const IMAGES = {
  firstBanner:  `${BASE}/FirstBanner.jpeg`,
  secondBanner: `${BASE}/SecondBanner.jpeg`,
  firstImage:   `${BASE}/FirstImage.jpeg`,
  secondImage:  `${BASE}/SecondImage.jpeg`,
  thirdImage:   `${BASE}/ThirdImage.jpeg`,
  fourthImage:  `${BASE}/FourthImage.jpeg`,
  fifthImage:   `${BASE}/FifthImage.jpeg`,
} as const

export const VIDEO = {
  firstVideo: `${BASE}/FirstVideo.mp4`,
} as const

/** Ordered list of hero slider images */
export const HERO_SLIDES: { src: string; alt: string }[] = [
  { src: IMAGES.firstBanner,  alt: 'البانر الأول'   },
  { src: IMAGES.secondBanner, alt: 'البانر الثاني'  },
  { src: IMAGES.firstImage,   alt: 'الصورة الأولى'  },
  { src: IMAGES.secondImage,  alt: 'الصورة الثانية' },
  { src: IMAGES.thirdImage,   alt: 'الصورة الثالثة' },
  { src: IMAGES.fourthImage,  alt: 'الصورة الرابعة' },
  { src: IMAGES.fifthImage,   alt: 'الصورة الخامسة' },
]

export const BANNERS: { src: string; alt: string; caption: string }[] = [
  { src: IMAGES.firstBanner,  alt: 'البانر الأول',  caption: 'البانر الأول'  },
  { src: IMAGES.secondBanner, alt: 'البانر الثاني', caption: 'البانر الثاني' },
]
