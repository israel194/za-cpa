import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react'
import Reveal from './ui/Reveal'

type Props = {
  title?: string
  subtitle?: string
}

/**
 * פס כהה לרוחב העמוד במקום כרטיס מרחף עם פינות עגולות והדרגתיות צבע.
 * הכותרת והפעולות יושבות זו לצד זו ולא זו מתחת לזו במרכז, כך שהפס נקרא
 * כחלק מהעמוד ולא כבלוק שהודבק לתוכו.
 */
export default function CallToAction({ title, subtitle }: Props) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir() === 'rtl'
  const Arrow = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className="relative overflow-hidden bg-burgundy-700 text-white">
      <div aria-hidden className="bg-plus-light pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-20">
        <Reveal>
          <div className="grid items-end gap-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <span aria-hidden className="mb-6 block h-px w-14 bg-gold-400" />
              <h2 className="font-display text-3xl font-bold leading-[1.1] text-white md:text-[2.75rem]">
                {title ?? t('cta.title')}
              </h2>
              <p className="measure mt-4 text-base leading-relaxed text-white/80 md:text-lg">
                {subtitle ?? t('cta.subtitle')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-[6px] bg-gold-300 px-7 py-3.5 text-[0.95rem] font-bold text-navy-800 transition-colors duration-200 hover:bg-gold-200"
              >
                {t('common.bookConsultation')}
                <Arrow
                  size={17}
                  className={`transition-transform duration-200 ${
                    isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'
                  }`}
                />
              </Link>
              <a
                href="tel:0523975659"
                className="inline-flex items-center gap-2 rounded-[6px] border border-white/35 px-7 py-3.5 text-[0.95rem] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                <Phone size={17} />
                {t('common.callNow')}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
