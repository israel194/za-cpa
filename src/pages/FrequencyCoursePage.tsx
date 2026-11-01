import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Waves, Sparkles, Heart, Check, X, MapPin, Calendar, Clock, Coins, Info, ChevronDown, MessageCircle } from 'lucide-react'
import { sendLead } from '../lib/notify'
import { loadContent } from '../lib/cms'
import { DEFAULT_FREQUENCY, withDefaults, type FrequencyContent } from '../content/frequencyCourse'
import Reveal from '../components/ui/Reveal'
import PrivacyNotice from '../components/ui/PrivacyNotice'

const BENEFIT_ICONS = [Waves, Sparkles, Heart]
const DETAIL_ICONS = [MapPin, Calendar, Clock, Coins, Info]

// Session numbers climb from peach to wine: the "frequency ladder".
const LADDER = ['#f4b49a', '#ec9f98', '#e08a95', '#d17590', '#bd5f83', '#a44a70', '#8a345a', '#6e1a2d']

const CTA_CLASS =
  'sheen inline-flex items-center gap-2 rounded-full bg-gradient-to-l from-[#d16d8a] via-burgundy-500 to-burgundy-700 px-8 py-4 text-base font-bold text-white shadow-[0_16px_36px_-12px_rgba(110,26,45,0.6)] transition-all duration-300 hover:-translate-y-0.5'

export default function FrequencyCoursePage() {
  const [c, setC] = useState<FrequencyContent>(DEFAULT_FREQUENCY)
  const [modalOpen, setModalOpen] = useState(false)
  const [sent, setSent] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    let alive = true
    void loadContent<FrequencyContent>('frequency-course').then(({ content }) => {
      if (alive && content) setC(withDefaults(content))
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    document.title = c.seoTitle
  }, [c.seoTitle])

  useEffect(() => {
    if (!modalOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setModalOpen(false)
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [modalOpen])

  const r = c.registration
  const waHref = `https://wa.me/${r.whatsappNumber}?text=${encodeURIComponent(r.whatsappMessage)}`
  const open = () => {
    setSent(false)
    setModalOpen(true)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    void sendLead({
      target: 'orit',
      source: 'דף קורס העלאת תדר',
      name: String(fd.get('fullName') ?? name),
      email: String(fd.get('email') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      sessionDate: String(fd.get('sessionDate') ?? ''),
    })
    setSent(true)
    if (r.paymentUrl) window.setTimeout(() => (window.location.href = r.paymentUrl), 900)
  }

  return (
    <div dir="rtl" lang="he">
      {/* HERO */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#fde8de] via-[#fbeff0] to-white" />
        <div aria-hidden className="pointer-events-none absolute -top-40 -end-32 h-[28rem] w-[28rem] rounded-full bg-[#f7b9a0]/40 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -start-24 h-80 w-80 rounded-full bg-[#d16d8a]/25 blur-3xl" />

        <div className="relative mx-auto max-w-3xl px-6 text-center md:px-10">
          <div className="relative mx-auto mb-8 h-44 w-44 md:h-52 md:w-52">
            {[0, 1, 2].map((i) => (
              <span key={i} aria-hidden className="freq-ring" style={{ animationDelay: `${i * 1.3}s` }} />
            ))}
            <img
              src={c.hero.image}
              alt="אורית עשור"
              className="relative h-full w-full rounded-full border-4 border-white object-cover object-[center_18%] shadow-[0_24px_60px_-18px_rgba(110,26,45,0.55)]"
            />
          </div>

          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-bold text-[#b84a6c] shadow-sm ring-1 ring-[#f3c9d3] backdrop-blur-sm">
            <Waves size={14} /> {c.hero.badge}
          </span>

          <h1 className="mt-6 bg-gradient-to-l from-[#e98e7f] via-[#c2577a] to-burgundy-700 bg-clip-text pb-2 font-display text-[2.55rem] font-extrabold leading-tight tracking-tight text-transparent sm:text-6xl md:text-7xl">
            {c.hero.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-700 md:text-xl">{c.hero.subtitle}</p>

          <button type="button" onClick={open} className={`mt-9 ${CTA_CLASS}`}>
            {c.hero.cta}
          </button>
        </div>
      </section>

      {/* INTRO */}
      <section className="bg-white py-16 md:py-20">
        <Reveal className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <p className="text-xl leading-loose text-ink-700 md:text-2xl">{c.intro.lead}</p>
          <p className="mt-7 font-display text-2xl font-extrabold leading-snug text-[#b84a6c] md:text-4xl">{c.intro.highlight}</p>
          <div className="mx-auto mt-8 h-1 w-28 rounded-full bg-gradient-to-l from-[#f7b9a0] via-[#d16d8a] to-burgundy-600" />
        </Reveal>
      </section>

      {/* BENEFITS */}
      <section className="bg-[#fbf4f3] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-10">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold text-burgundy-700 md:text-4xl">{c.benefitsTitle}</h2>
          </Reveal>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {c.benefits.map((b, i) => {
              const Icon = BENEFIT_ICONS[i % BENEFIT_ICONS.length]
              return (
                <Reveal as="li" key={i} delay={i * 100}>
                  <div className="group h-full rounded-3xl border border-[#f3c9d3] bg-white p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_-30px_rgba(184,74,108,0.55)]">
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f7b9a0] via-[#d16d8a] to-burgundy-600 text-white shadow-[0_12px_24px_-10px_rgba(184,74,108,0.6)]">
                      <Icon size={26} />
                    </div>
                    <h3 className="font-display text-xl font-bold leading-snug text-burgundy-700">{b.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-700">{b.body}</p>
                  </div>
                </Reveal>
              )
            })}
          </ul>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-16 md:py-24">
        <Reveal className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-extrabold text-burgundy-700 md:text-4xl">{c.aboutTitle}</h2>
          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-l from-[#f7b9a0] to-[#d16d8a]" />
          <div className="mt-8 space-y-5 text-lg leading-loose text-ink-700">
            {c.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* JOURNEY: the frequency ladder */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#fbeff0] to-[#fde8de]/60 py-16 md:py-24">
        <div className="relative mx-auto max-w-5xl px-6 md:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-extrabold leading-tight text-burgundy-700 md:text-4xl">{c.journeyTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">{c.journeyIntro}</p>
          </Reveal>

          <ol className="mt-12 grid gap-4 md:grid-cols-2">
            {c.sessions.map((s, i) => {
              const color = LADDER[Math.min(i, LADDER.length - 1)]
              return (
                <Reveal as="li" key={i} delay={(i % 2) * 90}>
                  <div className="flex h-full items-start gap-5 rounded-3xl border border-white bg-white/90 p-6 shadow-[0_14px_40px_-28px_rgba(110,26,45,0.5)] backdrop-blur-sm">
                    <div className="flex shrink-0 flex-col items-center">
                      <span
                        className="flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-extrabold text-white shadow-[0_8px_18px_-8px_rgba(110,26,45,0.6)]"
                        style={{ background: color }}
                      >
                        {i + 1}
                      </span>
                      <span aria-hidden className="mt-2 flex items-end gap-0.5">
                        {LADDER.map((_, j) => (
                          <span key={j} className="w-1 rounded-full" style={{ height: 4 + j * 2, background: j <= i ? color : '#f1dfe2' }} />
                        ))}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-wider text-[#b84a6c]">מפגש {i + 1}</div>
                      <h3 className="mt-1 font-display text-xl font-bold text-burgundy-700">{s.title}</h3>
                      <p className="mt-2 leading-relaxed text-ink-700">{s.body}</p>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* FORMAT */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6 md:px-10">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold text-burgundy-700 md:text-4xl">{c.formatTitle}</h2>
          </Reveal>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {c.format.map((f, i) => (
              <Reveal as="li" key={i} delay={i * 80} className="text-center">
                <div className="h-full rounded-2xl bg-[#fbf4f3] px-4 py-6">
                  <span className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-extrabold text-[#b84a6c] ring-1 ring-[#f3c9d3]">
                    {i + 1}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-burgundy-700">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* INCLUDES */}
      <section className="bg-[#fbf4f3] py-16 md:py-20">
        <Reveal className="mx-auto max-w-3xl px-6 md:px-10">
          <div className="rounded-3xl bg-white p-8 shadow-[0_24px_60px_-36px_rgba(110,26,45,0.5)] md:p-10">
            <h2 className="text-center font-display text-3xl font-extrabold text-burgundy-700">{c.includesTitle}</h2>
            <ul className="mt-8 space-y-4">
              {c.includes.map((line, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f7b9a0] to-[#d16d8a] text-white">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  <span className="text-lg leading-relaxed text-ink-800">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* TESTIMONIAL (hidden while empty) */}
      {c.testimonial.quote.trim() && (
        <section className="bg-gradient-to-bl from-[#fde8de] via-white to-[#fbeff0] py-16 md:py-24">
          <Reveal className="mx-auto max-w-3xl px-6 md:px-10">
            <blockquote className="rounded-3xl bg-white p-8 shadow-[0_24px_60px_-30px_rgba(184,74,108,0.45)] md:p-12">
              <div className="mb-4 text-6xl leading-none text-[#e9a9b8]">״</div>
              <p className="whitespace-pre-line text-lg leading-loose text-ink-800 md:text-xl">{c.testimonial.quote}</p>
              {c.testimonial.author && (
                <cite className="mt-6 block text-sm font-bold not-italic text-[#b84a6c]">{c.testimonial.author}</cite>
              )}
            </blockquote>
          </Reveal>
        </section>
      )}

      {/* ORIT */}
      <section className="bg-white py-16 md:py-24">
        <Reveal className="mx-auto max-w-3xl px-6 text-center md:px-10">
          <h2 className="font-display text-3xl font-extrabold text-burgundy-700 md:text-4xl">{c.oritTitle}</h2>
          <div className="mx-auto mt-8 h-40 w-40 overflow-hidden rounded-full border-4 border-[#fbeff0] shadow-[0_20px_50px_-15px_rgba(184,74,108,0.45)]">
            <img src={c.hero.image} alt="אורית עשור" loading="lazy" className="h-full w-full object-cover object-[center_18%]" />
          </div>
          <div className="mt-8 space-y-5 text-lg leading-loose text-ink-700">
            {c.orit.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </section>

      {/* DETAILS + CTA */}
      <section className="bg-gradient-to-b from-[#fbeff0] to-[#fde8de]/70 py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold text-burgundy-700 md:text-4xl">{c.detailsTitle}</h2>
          </Reveal>
          <ul className="mx-auto mt-10 max-w-xl space-y-3">
            {c.details.map((d, i) => {
              const Icon = DETAIL_ICONS[i % DETAIL_ICONS.length]
              return (
                <li key={i} className="flex items-start gap-4 rounded-2xl border border-white bg-white p-5 shadow-[0_6px_20px_-14px_rgba(110,26,45,0.45)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fbeff0] text-[#b84a6c]">
                    <Icon size={20} />
                  </span>
                  <span className="pt-1 leading-relaxed text-ink-800">
                    <strong className="text-burgundy-700">{d.title}: </strong>
                    {d.body}
                  </span>
                </li>
              )
            })}
          </ul>
          <div className="mt-12 text-center">
            <button type="button" onClick={open} className={CTA_CLASS}>
              {r.button}
            </button>
            <p className="mt-4 text-sm text-ink-700">
              מעדיפה לדבר קודם?{' '}
              <a href={waHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-[#1f8f4e] underline">
                <MessageCircle size={15} /> שלחי הודעת וואטסאפ
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-10">
          <Reveal>
            <h2 className="text-center font-display text-3xl font-extrabold text-burgundy-700 md:text-4xl">{c.faqTitle}</h2>
          </Reveal>
          <div className="mt-10 space-y-3">
            {c.faq.map((q, i) => (
              <details key={i} className="group rounded-2xl border border-[#f3c9d3] bg-[#fffafa] px-6 py-4 open:bg-white open:shadow-[0_10px_30px_-22px_rgba(110,26,45,0.5)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-bold text-burgundy-700">
                  {q.title}
                  <ChevronDown size={18} className="shrink-0 text-[#b84a6c] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 leading-relaxed text-ink-700">{q.body}</p>
              </details>
            ))}
          </div>
          {c.note && <p className="mt-10 text-center text-sm leading-relaxed text-ink-700/80">{c.note}</p>}
          <p className="mt-6 text-center text-sm">
            <Link to="/orit-group" className="font-semibold text-[#b84a6c] underline-offset-2 hover:underline">
              לקבוצת "לחזור לעצמך" ←
            </Link>
          </p>
        </div>
      </section>

      {/* REGISTRATION MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/50 p-4 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="freq-modal-title"
        >
          <div className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-7 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.4)] md:p-9">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute end-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-ink-700 hover:bg-[#fbeff0]"
              aria-label="סגירה"
            >
              <X size={20} />
            </button>
            {!sent ? (
              <>
                <h2 id="freq-modal-title" className="font-display text-2xl font-extrabold text-burgundy-700">{r.modalTitle}</h2>
                <p className="mt-1 text-sm text-ink-700">{r.modalSubtitle}</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <Input id="freq-name" name="fullName" label="שם מלא" autoComplete="name" value={name} onChange={setName} />
                  <Input id="freq-phone" name="phone" label="טלפון" type="tel" autoComplete="tel" dir="ltr" placeholder="050-0000000" />
                  <Input id="freq-email" name="email" label="דוא״ל" type="email" autoComplete="email" dir="ltr" placeholder="name@example.com" />
                  {r.dates.length > 0 && (
                    <fieldset>
                      <legend className="mb-2 block text-sm font-semibold text-ink-800">{r.dateLabel}</legend>
                      <div className="space-y-2">
                        {r.dates.map((d, i) => (
                          <label key={i} className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#f3c9d3] px-4 py-3 has-[:checked]:border-[#b84a6c] has-[:checked]:bg-[#fbeff0]">
                            <input type="radio" name="sessionDate" value={d} required={i === 0} className="accent-[#b84a6c]" />
                            <span className="text-sm text-ink-800">{d}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                  {r.priceLabel && (
                    <div className="rounded-xl bg-[#fbeff0] px-4 py-3 text-center text-ink-800">
                      סה״כ לתשלום: <strong className="text-burgundy-700">{r.priceLabel}</strong>
                    </div>
                  )}
                  <button type="submit" className={`w-full justify-center ${CTA_CLASS}`}>
                    {r.paymentUrl ? 'המשך לתשלום' : 'שליחה'}
                  </button>
                  <PrivacyNotice controller="orit" />
                </form>
              </>
            ) : (
              <div className="py-6 text-center">
                <h2 className="font-display text-2xl font-extrabold text-burgundy-700">תודה{name ? ` ${name}` : ''}!</h2>
                <p className="mt-3 text-ink-700">{r.paymentUrl ? 'מעבירה אותך לעמוד תשלום מאובטח...' : r.thanks}</p>
                <div className="mx-auto mt-6 h-1 w-24 animate-pulse rounded-full bg-gradient-to-l from-[#f7b9a0] to-[#d16d8a]" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

function Input({
  id,
  name,
  label,
  type = 'text',
  autoComplete,
  dir,
  placeholder,
  value,
  onChange,
}: {
  id: string
  name: string
  label: string
  type?: string
  autoComplete?: string
  dir?: 'ltr'
  placeholder?: string
  value?: string
  onChange?: (v: string) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-ink-800">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        dir={dir}
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="w-full rounded-xl border border-[#f3c9d3] bg-[#fffafa] px-4 py-3 text-base text-ink-900 outline-none transition-colors focus:border-[#b84a6c] focus:bg-white"
      />
    </div>
  )
}
