# RSAED — أرشيف الإنجازات

**React + Vite + Tailwind CSS** landing page for the Rural Community Department, Faculty of Agriculture, Ain Shams University.

---

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
rsaed-landing/
├── public/
│   ├── assets/               ← Media files go here
│   │   ├── FirstBanner.jpeg
│   │   ├── SecondBanner.jpeg
│   │   ├── FirstImage.jpeg
│   │   ├── SecondImage.jpeg
│   │   ├── ThirdImage.jpeg
│   │   ├── FourthImage.jpeg
│   │   ├── FifthImage.jpeg
│   │   └── FirstVideo.mp4
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx        ← Responsive navbar with scroll effect
│   │   │   └── Footer.tsx        ← Full footer with links & contacts
│   │   └── sections/
│   │       ├── Hero.tsx          ← Full-screen slider with stats & CTAs
│   │       ├── Banners.tsx       ← Announcements banner cards
│   │       ├── Partners.tsx      ← Partner cards grid
│   │       └── VideoModal.tsx    ← Video lightbox modal
│   ├── hooks/
│   │   ├── useSlider.ts          ← Auto-play slider with pause/resume
│   │   └── useScrollFade.ts      ← Intersection observer fade-in
│   ├── lib/
│   │   ├── assets.ts             ← Centralized media paths
│   │   └── utils.ts              ← cn() class utility
│   ├── styles/
│   │   └── globals.css           ← Design tokens + Tailwind layers
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── vercel.json
```

---

## 🖼️ Adding Assets

Drop your media files into `public/assets/`:

| File              | Used In               |
|-------------------|-----------------------|
| `FirstBanner.jpeg`  | Hero slide 1 + Banner 1 + Video poster |
| `SecondBanner.jpeg` | Hero slide 2 + Banner 2 |
| `FirstImage.jpeg`   | Hero slide 3          |
| `SecondImage.jpeg`  | Hero slide 4          |
| `ThirdImage.jpeg`   | Hero slide 5          |
| `FourthImage.jpeg`  | Hero slide 6          |
| `FifthImage.jpeg`   | Hero slide 7          |
| `FirstVideo.mp4`    | Video modal           |

All paths are configured in `src/lib/assets.ts` — edit once, works everywhere.

---

## 🎨 Design System

| Token         | Value       | Usage                  |
|---------------|-------------|------------------------|
| `--forest`    | `#2D5016`   | Primary green          |
| `--botanical` | `#3D6B1E`   | Secondary green        |
| `--gold`      | `#C9A84C`   | Accent / highlights    |
| `--cream`     | `#F5F0E8`   | Light background       |
| `--olive`     | `#1C2B0A`   | Dark text / footer bg  |
| Font          | Cairo 300–900 | RTL Arabic + English |

---

## 🚢 Deploy on Vercel

1. Push to GitHub
2. Import repo in [Vercel](https://vercel.com)
3. Framework: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy** ✅

The `vercel.json` handles SPA routing rewrites automatically.

---

## ✏️ Customisation

- **Slide images / banners** → `src/lib/assets.ts`
- **Slider interval** → `Hero.tsx` → `useSlider({ interval: 3000 })`
- **Partner cards** → `src/components/sections/Partners.tsx`
- **Footer links** → `src/components/layout/Footer.tsx`
- **Colors / fonts** → `src/styles/globals.css` + `tailwind.config.js`
