import { useTranslation } from 'react-i18next'
import Reveal from './ui/Reveal'

type Step = { title: string; text: string }

export default function Process() {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as Step[]

  return (
    <section className="relative bg-cream-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <Reveal>
          <p className="eyebrow mb-5">{t('process.eyebrow')}</p>
          <h2 className="display display-lg measure-tight">{t('process.title')}</h2>
        </Reveal>

        {/* ארבעה שלבים כעמודות מסורגלות. קודם לכן כל שלב היה עיגול ממוספר
            על קו מקווקו באמצע המסך, והקו נעלם ממילא מתחת ל-1024 פיקסל. */}
        <ol className="mt-12 grid gap-x-10 gap-y-0 border-t border-[color:var(--color-rule-strong)] sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, idx) => (
            <Reveal as="li" key={step.title} delay={idx * 80} className="border-b border-[color:var(--color-rule)] pt-6 pb-7 lg:border-b-0">
              <span className="marginal block tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
              <h3 className="display display-sm mt-3">{step.title}</h3>
              <p className="mt-2.5 leading-relaxed text-ink-700">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
