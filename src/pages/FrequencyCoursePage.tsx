import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Waves, Sparkles, Heart, Check, MapPin, Calendar, Clock, Coins, Info, ChevronDown, MessageCircle } from 'lucide-react'
import { freshContent, loadContent } from '../lib/cms'
import { DEFAULT_FREQUENCY, FREQUENCY_CONTENT_SINCE, withDefaults, type FrequencyContent } from '../content/frequencyCourse'
import Reveal from '../components/ui/Reveal'
import { useSeo } from '../lib/seo'

const BENEFIT_ICONS = [Waves, Sparkles, Heart]

// לפי שם הפרט ולא לפי מקומו ברשימה: במערכת הניהול אפשר להוסיף, למחוק ולשנות
// סדר של פרטים, וקודם לכן כל שינוי כזה הזיז את כל הסמלים שורה אחת.
function detailIcon(title: string) {
  if (title.includes('מקום') || title.includes('כתובת')) return MapPin
  if (title.includes('מועד') || title.includes('תאריך')) return Calendar
  if (title.includes('מבנה') || title.includes('שעה') || title.includes('מפגשים')) return Clock
  if (title.includes('עלות') || title.includes('מחיר')) return Coins
  return Info
}

/** הפרט שבו מוצג המחיר. המחיר מופיע פעם אחת בעמוד, כאן בלבד. */
function isPriceDetail(title: string) {
  return title.includes('עלות') || title.includes('מחיר')
}

// Session numbers climb from peach to wine: the "frequency ladder".
const LADDER = ['#d9c08f', '#c98d96', '#b16b77', '#9e3a4d', '#8e3b4a', '#82283b', '#6e1a2d', '#521222', '#6e1a2d']

const CTA_CLASS =
  'inline-flex items-center justify-center gap-2 rounded-[6px] bg-primary px-8 py-3.5 text-base font-bold text-white transition-colors duration-200 hover:bg-burgundy-500'

export default function FrequencyCoursePage() {
  const [c, setC] = useState<FrequencyContent>(DEFAULT_FREQUENCY)

  useEffect(() => {
    let alive = true
    void loadContent<FrequencyContent>('frequency-course').then((saved) => {
      const content = freshContent(saved, FREQUENCY_CONTENT_SINCE)
      if (alive && content) setC(withDefaults(content))
    })
    return () => {
      alive = false
    }
  }, [])

  useSeo('frequencyCourse', { title: c.seoTitle.replace(/\s*\|.*$/, '') })

  // סימון השאלות הנפוצות עבור מנועי החיפוש, מתוך תוכן העמוד עצמו
  useEffect(() => {
    const answered = c.faq.filter((q) => q.title.trim() && q.body.trim())
    if (!answered.length) return
    const el = document.createElement('script')
    el.type = 'application/ld+json'
    el.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: answered.map((q) => ({
        '@type': 'Question',
        name: q.title,
        acceptedAnswer: { '@type': 'Answer', text: q.body },
      })),
    })
    document.head.appendChild(el)
    return () => el.remove()
  }, [c.faq])

  const r = c.registration
  const waHref = `https://wa.me/${r.whatsappNumber}?text=${encodeURIComponent(r.whatsappMessage)}`

  return (
    <div dir="rtl" lang="he">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[color:var(--color-rule)] bg-cream-50 pt-28 pb-12 md:pt-32 md:pb-16">
        <div aria-hidden className="grain pointer-events-none absolute inset-0" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-16 md:px-10">
          <div>
          <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold tracking-[0.16em] text-gold-600">
            <Waves size={13} /> {c.hero.badge}
          </span>

          {/* הכותרת בצבע מלא ולא בהדרגתיות חתוכה לטקסט: טקסט בהדרגתיות
              הוא הסימן המובהק ביותר של עמוד נחיתה שנוצר אוטומטית. */}
          <h1 className="display display-xl display-ink mt-5">{c.hero.title}</h1>
          <p className="measure mt-6 text-lg leading-relaxed text-ink-700 md:text-xl">{c.hero.subtitle}</p>

          {/* המחיר אינו מופיע כאן אלא רק בפרטי הקורס, בתחתית העמוד.
              במקומו קישור לאותו אזור, כדי שמי שמחפשת את העלות תגיע אליה בלחיצה. */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link to="/pay/frequency-course" className={CTA_CLASS}>
              {c.hero.cta}
            </Link>
            <a
              href="#details"
              className="rounded-full px-3 py-1 text-sm font-bold text-[#6e1a2d] underline-offset-4 hover:underline focus:outline-none focus:ring-2 focus:ring-[#9e3a4d]/60"
            >
              פרטים, מועדים ועלות ←
            </a>
          </div>
          </div>

          <figure className="relative mx-auto w-full max-w-[330px] md:mx-0 md:ms-auto">
            <div aria-hidden className="absolute -inset-2.5 rounded-t-[999px] rounded-b-[8px] border border-gold-300" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-[6px] bg-muted">
              <img
                src={c.hero.image}
                alt="אורית עשור"
                width="330"
                height="413"
                className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white py-10 md:py-12">
        <Reveal className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10">
          <p className="text-xl leading-relaxed text-ink-700">{c.intro.lead}</p>
          <p className="display display-lg self-center">{c.intro.highlight}</p>
        </Reveal>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#f6efe6] py-10 md:py-14">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <h2 className="display display-lg">{c.benefitsTitle}</h2>
          </Reveal>
          <ul className="mt-10 grid gap-x-10 border-t border-[color:var(--color-rule-strong)] md:grid-cols-3">
            {c.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length]
              return (
                <Reveal as="li" key={i} delay={i * 70} className="border-b border-[color:var(--color-rule)] pt-6 pb-7 md:border-b-0">
                  <Icon size={20} strokeWidth={1.6} className="text-gold-600" aria-hidden />
                  <h3 className="display display-sm mt-4">{b.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-ink-700">{b.body}</p>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-10 md:py-14">
        <Reveal className="mx-auto max-w-6xl px-6 md:px-10">
          <h2 className="display display-lg">{c.aboutTitle}</h2>
          <div className="mt-5 space-y-3 text-lg leading-relaxed text-ink-700">
            {c.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* JOURNEY: the frequency ladder */}
      <section className="relative overflow-hidden border-y border-[color:var(--color-rule)] bg-cream-50 py-14 md:py-20">
        <div className="relative mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold leading-tight text-burgundy-700 md:text-4xl">{c.journeyTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">{c.journeyIntro}</p>
          </Reveal>

          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {c.sessions.map((s, i) => {
              const color = LADDER[Math.min(i, LADDER.length - 1)]
              return (
                <Reveal as="li" key={i} delay={(i % 2) * 90} className={i === c.sessions.length - 1 && c.sessions.length % 2 === 1 ? 'md:col-span-2' : undefined}>
                  <div className="flex h-full items-start gap-5 border-t border-[color:var(--color-rule)] py-6">
                    <div className="flex shrink-0 flex-col items-center">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full font-display text-base font-bold text-white"
                        style={{ background: color }}
                      >
                        {i + 1}
                      </span>
                      <span aria-hidden className="mt-2 flex items-end gap-0.5">
                        {LADDER.map((_, j) => (
                          <span key={j} className="w-1 rounded-full" style={{ height: 4 + j * 2, background: j <= i ? color : '#eadcdb' }} />
                        ))}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-[#8e3b4a]">מפגש {i + 1}</div>
                      <h3 className="mt-1 display display-sm">{s.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-700">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* MID PAGE CTA: העמוד ארוך, וללא זה יש חמישה מסכים בלי שום פעולה */}
      <section className="bg-white pt-10 pb-2 md:pt-14">
        <Reveal className="mx-auto max-w-3xl px-6 md:px-10">
          <div className="rounded-[12px] border border-[color:var(--color-rule-strong)] bg-cream-50 px-6 py-8 text-center">
            <p className="display display-md">
              זה נשמע לך מדויק?
            </p>
            <p className="mx-auto mt-2 max-w-md leading-relaxed text-ink-700">
              אפשר לשמור מקום עכשיו, או לראות קודם את{' '}
              <a href="#details" className="font-bold text-[#6e1a2d] underline underline-offset-2">
                הפרטים, המועדים והעלות
              </a>
              .
            </p>
            <Link to="/pay/frequency-course" className={`mt-6 ${CTA_CLASS}`}>
              {r.button}
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FORMAT */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <h2 className="display display-lg">{c.formatTitle}</h2>
          </Reveal>
          <ol className="mt-10 grid gap-x-8 border-t border-[color:var(--color-rule-strong)] sm:grid-cols-2 lg:grid-cols-5">
            {c.format.map((f, i) => (
              <Reveal as="li" key={i} delay={i * 70} className="border-b border-[color:var(--color-rule)] lg:border-b-0">
                <div className="h-full pt-5 pb-6">
                  <span className="marginal block tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 display display-sm">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* INCLUDES */}
      <section className="bg-[#f6efe6] py-10 md:py-12">
        <Reveal className="mx-auto max-w-3xl px-6 md:px-10">
          <div>
            <h2 className="display display-lg">{c.includesTitle}</h2>
            <ul className="mt-8 border-t border-[color:var(--color-rule-strong)]">
              {c.includes.map((line, i) => (
                <li key={i} className="flex items-start gap-3 border-b border-[color:var(--color-rule)] py-4">
                  <Check size={16} strokeWidth={2.5} className="mt-1 shrink-0 text-gold-600" aria-hidden />
                  <span className="text-lg leading-relaxed text-ink-800">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIAL (hidden while empty) */}
      {c.testimonial.quote.trim() && (
        <section className="border-y border-[color:var(--color-rule)] bg-cream-50 py-14 md:py-20">
          <Reveal className="mx-auto max-w-3xl px-6 md:px-10">
            <blockquote>
              <span aria-hidden className="mb-4 block h-px w-12 bg-gold-400" />
              <p className="whitespace-pre-line text-lg leading-relaxed text-ink-800 md:text-xl">{c.testimonial.quote}</p>
              {c.testimonial.author && (
                <cite className="mt-6 block text-sm font-bold not-italic text-[#8e3b4a]">{c.testimonial.author}</cite>
              )}
            </blockquote>
          </Reveal>
        </section>
      )}

      {/* ORIT */}
      <section className="bg-white py-10 md:py-14">
        <Reveal className="mx-auto grid max-w-6xl items-start gap-10 px-6 md:grid-cols-[0.75fr_1.25fr] md:gap-16 md:px-10">
          <div>
          <h2 className="display display-lg">{c.oritTitle}</h2>
          <div className="mt-7 aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[8px] border border-[color:var(--color-rule)] bg-muted">
            <img src={c.hero.image} alt="אורית עשור" loading="lazy" width="320" height="320" className="h-full w-full object-cover object-[center_18%]" />
          </div>
          </div>
          <div className="space-y-3 text-lg leading-relaxed text-ink-700 md:pt-3">
            {c.orit.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* DETAILS + CTA: נקודת ההחלטה של העמוד, והמקום היחיד שבו מופיע המחיר */}
      <section id="details" className="scroll-mt-24 border-t border-[color:var(--color-rule)] bg-cream-50 py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <div className="overflow-hidden rounded-[14px] border border-[color:var(--color-rule)] bg-surface shadow-[var(--shadow-raise)]">
              {/* הדרגתיות כהה לאורך כולה: על הקצה האפרסקי של הדרגתיות המותג
                  לבן נותן יחס ניגודיות 1.69, ועל b84a6c הוא 4.96 */}
              <div className="bg-gradient-to-l from-[#8e3b4a] via-burgundy-500 to-burgundy-700 px-6 py-6 text-center md:px-10">
                <h2 className="font-display text-3xl font-bold text-white md:text-4xl">{c.detailsTitle}</h2>
              </div>

              <div className="px-6 py-8 md:px-10 md:py-10">
                <ul className="mx-auto max-w-xl space-y-3">
                  {c.details.map((d, i) => {
                    const Icon = detailIcon(d.title)
                    const price = isPriceDetail(d.title) && !!r.priceLabel
                    return (
                      <li
                        key={i}
                        className={
                          price
                            ? 'flex items-start gap-4 rounded-[8px] border border-gold-300 bg-cream-50 p-5'
                            : 'flex items-start gap-4 rounded-[8px] border border-[color:var(--color-rule)] bg-surface p-5'
                        }
                      >
                        <span
                          className={
                            price
                              ? 'mt-0.5 shrink-0 text-gold-600'
                              : 'mt-0.5 shrink-0 text-gold-600'
                          }
                        >
                          <Icon size={20} />
                        </span>
                        <span className="pt-1 leading-relaxed text-ink-800">
                          <strong className="text-burgundy-700">{d.title}: </strong>
                          {price ? <Price r={r} /> : d.body}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-8 text-center">
                  <Link to="/pay/frequency-course" className={`w-full sm:w-auto ${CTA_CLASS}`}>
                    {r.button}
                  </Link>
                  <p className="mt-4 text-sm leading-relaxed text-ink-700">
                    מעדיפה לדבר קודם?{' '}
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-bold text-[#157a41] underline underline-offset-2"
                    >
                      <MessageCircle size={15} /> שלחי הודעת וואטסאפ
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <h2 className="display display-lg">{c.faqTitle}</h2>
          </Reveal>
          <div className="mt-10 border-t border-[color:var(--color-rule-strong)]">
            {c.faq.map((q, i) => (
              <details key={i} className="group border-b border-[color:var(--color-rule)] py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 display display-sm">
                  {q.title}
                  <ChevronDown size={18} className="shrink-0 text-[#8e3b4a] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-relaxed text-ink-700">{q.body}</p>
              </details>
            ))}
          </div>
          {c.note && <p className="mt-6 text-center text-sm leading-relaxed text-ink-700/80">{c.note}</p>}
          <p className="mt-6 text-center text-sm">
            <Link to="/orit-group" className="font-semibold text-[#8e3b4a] underline-offset-2 hover:underline">
              לקבוצת "לחזור לעצמך" ←
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

/** המחיר: המחיר המלא עם קו חוצה, המחיר לתשלום מודגש, ותווית (למשל "מחיר השקה"). */
function Price({ r }: { r: FrequencyContent['registration'] }) {
  return (
    <span className="inline-flex flex-wrap items-baseline justify-center gap-x-2">
      {/* a83f5f ולא b84a6c: על רקע fbeff0 הניגודיות הייתה 4.41, מתחת ל-4.5 ברמה AA */}
      {r.priceNote && (
        <span className="rounded-full bg-[#f6efe6] px-2.5 py-0.5 text-sm font-bold text-[#6e1a2d]">{r.priceNote}</span>
      )}
      <strong className="text-xl text-burgundy-700">{r.priceLabel}</strong>
      {r.priceRegular && (
        <span className="text-ink-700/70">
          במקום <s>{r.priceRegular}</s>
        </span>
      )}
    </span>
  )
}
