import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Phone, MapPin, Mail } from 'lucide-react'

/**
 * ראש העמוד כמסד של עיתון, לא ככרטיס כהה מרחף עם פינות עגולות וכתמי אור
 * מטושטשים. הכותרת גדולה ומוגדרת בגופן סריפי, התצלום הוא העוגן החזותי
 * היחיד, והנתונים יושבים בשורה שקטה ולא כמספרים בהדרגתיות זהב.
 */
export default function HeroCinematic() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative overflow-hidden bg-cream-50 pt-28 md:pt-32">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid items-end gap-12 pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16 lg:pb-20">
          <div>
            <p className="eyebrow mb-7">{t('hero.badge')}</p>

            <h1 className="display display-xl">
              <span className="block">{t('hero.line1')}</span>
              <span className="block text-accent">{t('hero.line2')}</span>
              <span className="block">{t('hero.line3')}</span>
            </h1>

            <p className="measure mt-7 text-lg leading-relaxed text-ink-700 md:text-xl">
              {t('hero.subtitle')}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-[6px] bg-primary px-7 py-3.5 text-[0.95rem] font-bold text-white transition-colors duration-200 hover:bg-burgundy-500"
              >
                {t('hero.primaryCta')}
                <Arrow
                  size={17}
                  className={`transition-transform duration-200 ${
                    isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </Link>
              <a
                href="tel:0523975659"
                className="inline-flex items-center gap-2 rounded-[6px] border border-[color:var(--color-rule-strong)] px-7 py-3.5 text-[0.95rem] font-semibold text-primary transition-colors duration-200 hover:border-primary"
              >
                <Phone size={17} />
                {t('hero.secondaryCta')}
              </a>
            </div>

            <dl className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4 border-t border-[color:var(--color-rule)] pt-7">
              <Stat value="+12" label={t('stats.experience')} />
              <Stat value="+250" label={t('stats.happyClients')} />
              <Stat value="100%" label={t('stats.commitment')} />
            </dl>
          </div>

          {/* תצלום מקושת במסגרת קו שיער. זה הנכס החזותי האמיתי היחיד בעמוד,
              ולכן הוא מקבל את המשקל במקום ממשק מדומה של כרטיסים מרחפים. */}
          <figure className="relative mx-auto w-full max-w-[380px] lg:mx-0 lg:ms-auto">
            <div
              aria-hidden
              className="absolute -inset-2.5 rounded-t-[999px] rounded-b-[8px] border border-gold-300"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[6px] bg-muted">
              <img
                src="/orit/orit.jpeg"
                alt={t('hero.portraitAlt')}
                width="380"
                height="475"
                decoding="async"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
              />
            </div>
            <figcaption className="mt-5 flex items-baseline gap-3">
              <span aria-hidden className="h-px w-6 shrink-0 translate-y-[-0.35rem] bg-gold-400" />
              <span>
                <span className="display display-sm block">{t('hero.portraitName')}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">
                  {t('hero.portraitRole')}
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* שורת המשרד, בקו שיער אחד ובלי רקע נפרד */}
      <div className="relative border-t border-[color:var(--color-rule)]">
        <ul className="mx-auto flex max-w-6xl flex-col gap-x-10 gap-y-2 px-6 py-5 text-sm text-ink-700 sm:flex-row sm:flex-wrap md:px-10">
          <li className="flex items-center gap-2">
            <MapPin size={15} className="text-gold-600" aria-hidden />
            {t('contact.details.addressLine1')} · {t('contact.details.addressLine2')}
          </li>
          <li>
            <a href="tel:0523975659" className="flex items-center gap-2 transition-colors hover:text-accent">
              <Phone size={15} className="text-gold-600" aria-hidden />
              <span dir="ltr">052-3975659</span>
            </a>
          </li>
          <li>
            <a href="mailto:office@za-cpa.com" className="flex items-center gap-2 transition-colors hover:text-accent">
              <Mail size={15} className="text-gold-600" aria-hidden />
              office@za-cpa.com
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd className="font-display text-[1.75rem] font-bold leading-none text-primary tabular-nums">
        {value}
      </dd>
      <dd aria-hidden className="mt-1.5 text-xs font-semibold tracking-[0.1em] text-muted-foreground">
        {label}
      </dd>
    </div>
  )
}
