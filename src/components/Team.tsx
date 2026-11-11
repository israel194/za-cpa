import { useTranslation } from 'react-i18next'
import { useTeam } from '../data/content'

function initialsOf(fullName: string) {
  const parts = fullName.trim().split(/\s+/)
  return (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
}

export default function Team({ heading = true }: { heading?: boolean }) {
  const { t } = useTranslation()
  const team = useTeam()

  return (
    <section className="relative bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        {heading && (
          <>
          <p className="eyebrow mb-5">{t('team.eyebrow')}</p>
          <h2 className="display display-lg">{t('team.title')}</h2>
          <p className="measure mt-5 text-lg text-ink-700">{t('team.subtitle')}</p>
          </>
        )}

        {/* דיוקנאות בריבוע עם פינה מעוגלת קלות, לא עיגולים במסגרת
            בהדרגתיות. השם והתפקיד יושבים מתחת לתמונה, כמו בעמוד מודפס. */}
        <ul className={`${heading ? 'mt-12' : ''} grid gap-x-8 gap-y-10 border-t border-[color:var(--color-rule-strong)] pt-10 sm:grid-cols-2 lg:grid-cols-4`}>
          {team.map((member) => (
            <li key={member.name}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-muted">
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    width="300"
                    height="375"
                    className="absolute inset-0 h-full w-full object-cover object-[center_15%]"
                  />
                ) : (
                  <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-bold text-rose-gold-600">
                    {initialsOf(member.name)}
                  </span>
                )}
              </div>
              <h3 className="display display-sm mt-4">{member.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
