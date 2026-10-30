import { useTranslation } from 'react-i18next'
import Reveal from './ui/Reveal'

type Step = { title: string; text: string }

export default function Process() {
  const { t } = useTranslation()
  const steps = t('process.steps', { returnObjects: true }) as Step[]

  return (
    <section className="bg-plus relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="mb-4 text-sm font-bold tracking-[0.2em] text-accent">
            {t('process.eyebrow')}
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-primary md:text-5xl">
            {t('process.title')}
          </h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <span
            aria-hidden
            className="absolute inset-x-[12%] top-8 hidden h-px bg-gradient-to-l from-gold-300/0 via-gold-400 to-gold-300/0 lg:block"
          />
          {steps.map((step, idx) => (
            <Reveal as="li" key={step.title} delay={idx * 120} className="relative text-center">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold-300 bg-white shadow-[0_12px_30px_-14px_rgba(110,26,45,0.45)]">
                <span className="font-display text-xl font-extrabold text-primary">
                  {String(idx + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-primary">{step.title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-ink-700">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
