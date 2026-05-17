import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react'

const quickLinks = [
  { label: 'الرئيسية',    href: '#'          },
  { label: 'الشركاء',     href: '#partners'  },
  { label: 'الأرشيف',     href: 'https://agr.asu.edu.eg', external: true },
  { label: 'المنشورات',   href: 'https://agr.asu.edu.eg', external: true },
  { label: 'الأبحاث',     href: 'https://agr.asu.edu.eg', external: true },
]

export function Footer() {
  const scrollTo = (href: string) => {
    if (href === '#') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      id="footer"
      className="relative mt-auto border-t border-forest/20 bg-olive text-cream/80"
      style={{ scrollMarginTop: '5rem' }}
    >
      {/* Gold top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container-max pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">

          {/* Brand & Contact */}
          <div className="md:col-span-1">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollTo('#') }} className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-[0.6rem] bg-gradient-to-br from-forest to-botanical flex items-center justify-center text-base shadow-[0_4px_12px_rgba(45,80,22,0.3)]">
                🌿
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-[1.05rem] text-cream">RSAED</span>
                <span className="text-[0.65rem] font-medium text-cream/50">أرشيف الإنجازات</span>
              </div>
            </a>

            <p className="mt-4 text-sm leading-relaxed text-cream/55 max-w-xs">
              الحفاظ على الإنجازات الأكاديمية لقسم المجتمع الريفي منذ تأسيسه وإبرازها.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <div className="flex items-start gap-2 text-sm text-cream/55">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-gold/70" />
                <span>حدائق شبرا، القاهرة، مصر</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-cream/55">
                <Mail size={14} className="flex-shrink-0 text-gold/70" />
                <a href="mailto:rural@agr.asu.edu.eg" className="hover:text-gold transition-colors duration-200">
                  rural@agr.asu.edu.eg
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-cream/55">
                <Phone size={14} className="flex-shrink-0 text-gold/70" />
                <span dir="ltr">+20 2 2418 8000</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-cream font-bold text-[0.7rem] uppercase tracking-[0.1em] mb-4">
              روابط سريعة
            </h3>
            <ul className="flex flex-col gap-2 list-none">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-cream/55 hover:text-gold transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-cream/55 hover:text-gold transition-colors duration-200 flex items-center gap-1.5 group w-full text-right"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-colors" />
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* University Info */}
          <div>
            <h3 className="text-cream font-bold text-[0.7rem] uppercase tracking-[0.1em] mb-4">
              تواصل معنا
            </h3>
            <div className="text-sm font-semibold text-cream/75 mb-1">قسم المجتمع الريفي</div>
            <div className="text-[0.8rem] text-cream/50 leading-relaxed mb-4">
              كلية الزراعة<br />
              جامعة عين شمس<br />
              حدائق شبرا، القاهرة
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://agr.asu.edu.eg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gold/65 hover:text-gold transition-colors duration-200"
              >
                <ExternalLink size={11} />
                agr.asu.edu.eg
              </a>
              <a
                href="https://www.asu.edu.eg"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-gold/65 hover:text-gold transition-colors duration-200"
              >
                <ExternalLink size={11} />
                asu.edu.eg
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/8 pt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[0.72rem] text-cream/35">
            © 2025 قسم المجتمع الريفي — كلية الزراعة، جامعة عين شمس. جميع الحقوق محفوظة.
          </p>
          <div className="flex items-center gap-1.5 text-[0.72rem] text-cream/30">
            <span>صُنع بـ</span>
            <span className="text-gold/50">♦</span>
            <span>
              بواسطة{' '}
              <a
                href="https://github.com/anxlz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold/65 font-bold hover:text-gold transition-colors duration-200"
              >
                anxlz
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
