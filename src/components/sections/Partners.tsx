import { useEffect, useRef, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PartnerCardProps {
  href?: string
  logoSrc?: string
  logoAlt?: string
  fallbackEmoji?: string
  fallbackInitials?: string
  name: string
  role: string
  description: string
  tags: string[]
  linkLabel?: string
  logoWrapClass?: string
  logoRound?: boolean
  ghBadge?: boolean
  className?: string
  animDelay?: string
  clickable?: boolean
}

function PartnerCard({
  href,
  logoSrc,
  logoAlt,
  fallbackEmoji,
  fallbackInitials,
  name,
  role,
  description,
  tags,
  linkLabel,
  logoWrapClass = 'w-24 h-24',
  logoRound = false,
  ghBadge = false,
  className = '',
  animDelay = '0s',
  clickable = true,
}: PartnerCardProps) {
  const [imgFailed, setImgFailed] = useState(false)

  const inner = (
    <div className="flex flex-col items-center text-center gap-5 p-8 relative z-10 h-full">
      {/* Logo / Avatar */}
      <div className={cn('relative flex items-center justify-center', logoWrapClass)}>
        {!imgFailed && logoSrc ? (
          <img
            src={logoSrc}
            alt={logoAlt ?? name}
            className={cn(
              'w-full h-full object-contain z-[1] relative transition-transform duration-300 group-hover:scale-[1.06]',
              logoRound && 'rounded-full object-cover shadow-[0_0_0_3px_rgba(45,80,22,0.15)] group-hover:shadow-[0_0_0_3px_rgba(201,168,76,0.4)]',
            )}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            className={cn(
              'w-full h-full flex items-center justify-center z-[1] transition-transform duration-300 group-hover:scale-[1.06]',
              logoRound
                ? 'rounded-full shadow-[0_0_0_3px_rgba(45,80,22,0.15)] group-hover:shadow-[0_0_0_3px_rgba(201,168,76,0.4)]'
                : '',
            )}
            style={{ background: 'rgba(45,80,22,0.08)' }}
          >
            {fallbackInitials ? (
              <span className="text-2xl font-extrabold text-cream"
                style={{ background: 'linear-gradient(135deg,#2D5016,#3D6B1E)', borderRadius: '50%', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                {fallbackInitials}
              </span>
            ) : (
              <span className="text-5xl">{fallbackEmoji}</span>
            )}
          </div>
        )}
        {ghBadge && (
          <span className="absolute bottom-0 left-0 z-[2] w-6 h-6 rounded-full bg-[#1a1a1a] text-white text-[0.55rem] font-extrabold flex items-center justify-center border-2 border-white">
            GH
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="text-[1.1rem] font-extrabold text-olive mb-1 transition-colors duration-200 group-hover:text-forest">
          {name}
        </div>
        <div className="text-[0.8rem] font-semibold text-forest mb-2.5">{role}</div>
        <p className="text-[0.8rem] text-olive/55 leading-relaxed mb-3.5">{description}</p>
        <div className="flex flex-wrap gap-1.5 justify-center">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[0.7rem] font-semibold rounded-full border bg-forest/7 text-forest border-forest/12"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Link hint */}
      {linkLabel && clickable && (
        <div className="flex items-center gap-1.5 text-[0.72rem] text-olive/45 transition-colors duration-200 group-hover:text-forest">
          <ExternalLink size={11} />
          {linkLabel}
        </div>
      )}
    </div>
  )

  const cardClass = cn(
    'fade-in relative card-base overflow-hidden group',
    className,
    !clickable && 'cursor-default',
  )

  return href && clickable ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClass}
      style={{ transitionDelay: animDelay }}
    >
      {/* Decorative corner glow */}
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-radial from-gold/12 to-transparent -translate-y-1/2 translate-x-1/2 transition-all duration-300 group-hover:scale-150 group-hover:opacity-[1.5]" />
      {inner}
    </a>
  ) : (
    <div
      className={cardClass}
      style={{ transitionDelay: animDelay }}
    >
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-gradient-radial from-gold/12 to-transparent -translate-y-1/2 translate-x-1/2" />
      {inner}
    </div>
  )
}

export function Partners() {
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
      id="partners"
      className="section-padding"
      style={{ scrollMarginTop: '5rem' }}
    >
      <div className="container-max">
        {/* Section header */}
        <div className="text-center mb-14 fade-in">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[0.8rem] font-semibold mb-4"
            style={{ background: 'rgba(201,168,76,0.1)', borderColor: 'rgba(201,168,76,0.25)', color: 'var(--gold)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            الشركاء
          </div>

          <h2 className="text-[clamp(1.6rem,3.5vw,2.25rem)] font-extrabold text-olive tracking-tight mb-3">
            تعرف على الشركاء
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5))' }} />
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(201,168,76,0.6)' }} />
            <div className="h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.5))' }} />
          </div>

          <p className="text-olive/60 max-w-lg mx-auto text-[0.95rem] leading-relaxed">
            التعاون الأكاديمي والتقني خلف هذه المنصة
          </p>
        </div>

        {/* Partners grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1000px] mx-auto">

          {/* 1 — كلية الزراعة */}
          <PartnerCard
            href="https://agr.asu.edu.eg"
            logoSrc="https://agr.asu.edu.eg/images/agr_logo.png"
            logoAlt="كلية الزراعة"
            fallbackEmoji="🌾"
            logoWrapClass="w-28 h-28"
            name="كلية الزراعة"
            role="الشريك الأكاديمي"
            description="كلية الزراعة بجامعة عين شمس، الراعية الأكاديمية لقسم المجتمع الريفي ومنصة الأرشيف الرقمي."
            tags={['زراعة', 'بحث علمي', 'تكنولوجيا']}
            linkLabel="زيارة الصفحة"
            animDelay="0.08s"
          />

          {/* 2 — جامعة عين شمس */}
          <PartnerCard
            href="https://www.asu.edu.eg"
            logoSrc="https://upload.wikimedia.org/wikipedia/en/3/3d/Ain_Shams_logo.png"
            logoAlt="جامعة عين شمس"
            fallbackEmoji="🏛️"
            logoWrapClass="w-28 h-28"
            name="جامعة عين شمس"
            role="شريك أكاديمي"
            description="إحدى أعرق الجامعات المصرية المتميزة في مجالات الزراعة والتكنولوجيا التطبيقية والبحث العلمي."
            tags={['جامعة', 'مصر', 'بحث']}
            linkLabel="زيارة الصفحة"
            animDelay="0.16s"
          />

          {/* 3 — د. إيمان أبو قمر */}
          <PartnerCard
            name="د. إيمان أبو قمر"
            role="دكتورة"
            description="عضو هيئة التدريس في قسم المجتمع الريفي، كلية الزراعة، جامعة عين شمس."
            tags={['أكاديمية', 'مجتمع ريفي']}
            fallbackEmoji="👩‍🎓"
            logoWrapClass="w-22 h-22"
            logoRound
            clickable={false}
            animDelay="0.24s"
          />

          {/* 4 — د. جسنت ريحان (centered in row 2 of 3-col) */}
          <PartnerCard
            name="د. جسنت ريحان"
            role="أستاذة القسم"
            description="عضو هيئة التدريس في قسم المجتمع الريفي، كلية الزراعة، جامعة عين شمس."
            tags={['أكاديمية', 'مجتمع ريفي']}
            fallbackEmoji="👩‍🔬"
            logoWrapClass="w-22 h-22"
            logoRound
            clickable={false}
            className="lg:col-start-1"
            animDelay="0.32s"
          />

          {/* 5 — anxlz */}
          <PartnerCard
            href="https://github.com/anxlz"
            logoSrc="https://avatars.githubusercontent.com/u/71562488?v=4"
            logoAlt="anxlz"
            fallbackInitials="AX"
            logoWrapClass="w-20 h-20"
            logoRound
            ghBadge
            name="anxlz"
            role="مطور المنصة"
            description="مطور واجهات أمامية متخصص في بناء تجارب رقمية حديثة وتطبيقات الويب التفاعلية."
            tags={['React', 'تطوير ويب', 'UI/UX']}
            linkLabel="GitHub"
            className="lg:col-start-2"
            animDelay="0.40s"
          />

        </div>
      </div>
    </section>
  )
}
