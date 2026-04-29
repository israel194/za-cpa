import { useTranslation } from 'react-i18next'
import { useTeam } from '../data/content'

function initialsOf(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
}

export default function Team() {
  const { t } = useTranslation()
  const team = useTeam()

  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            {t('team.eyebrow')}
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            {t('team.title')}
          </h2>
          <p className="mt-5 text-lg text-ink-700">{t('team.subtitle')}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.name}
              className="group relative overflow-hidden rounded-2xl border border-blush-100 bg-cream-50/60 p-8 text-center
                transition-all duration-300 hover:-translate-y-1 hover:border-rose-gold-300
                hover:bg-white hover:shadow-[0_24px_48px_-24px_rgba(189,95,124,0.4)]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-rose-gold-500 via-blush-400 to-rose-gold-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blush-200 via-blush-100 to-cream-200">
                <div className="flex h-[5.25rem] w-[5.25rem] items-center justify-center rounded-full bg-white">
                  <span className="font-display text-2xl font-extrabold text-rose-gold-500">
                    {initialsOf(member.name)}
                  </span>
                </div>
              </div>

              <h3 className="font-display text-xl font-bold text-ink-900">
                {member.name}
              </h3>
              <p className="mt-1.5 text-sm font-medium text-rose-gold-500">
                {member.role}
              </p>

              <div
                aria-hidden
                className="mx-auto mt-5 h-px w-12 bg-blush-200 transition-all duration-300 group-hover:w-20 group-hover:bg-rose-gold-400"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
