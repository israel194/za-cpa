import {
  useState,
  type ChangeEvent,
  type ElementType,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react'
import { MapPin, Globe, Send, CheckCircle2 } from 'lucide-react'

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

const initial: FormState = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState<FormState>(initial)
  const [sent, setSent] = useState(false)

  const handleChange =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
    setForm(initial)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-cream-50 to-blush-50 py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -end-32 h-96 w-96 rounded-full bg-blush-200/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -start-32 h-[28rem] w-[28rem] rounded-full bg-rose-gold-300/30 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-rose-gold-500">
            צור קשר
          </div>
          <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-ink-900 md:text-5xl">
            נשמח לשמוע מכם
          </h2>
          <p className="mt-5 text-lg text-ink-700">
            השאירו פרטים ונחזור אליכם בהקדם, או התקשרו אלינו ישירות.
          </p>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-blush-100 bg-white/90 p-8 shadow-[0_24px_60px_-32px_rgba(183,110,121,0.4)] backdrop-blur-sm md:p-10 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="שם מלא"
                value={form.name}
                onChange={handleChange('name')}
                required
                autoComplete="name"
              />
              <Field
                label='דוא"ל'
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
                autoComplete="email"
              />
              <Field
                label="טלפון"
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                autoComplete="tel"
              />
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-ink-800">
                  הודעה
                </label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  required
                  className="w-full resize-none rounded-xl border border-blush-200 bg-cream-50/60 px-4 py-3 text-base text-ink-900
                    transition-all duration-200 placeholder:text-ink-700/40
                    focus:border-rose-gold-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-gold-300/30"
                  placeholder="כתבו לנו במה תוכלו להיעזר..."
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-rose-gold-500 px-8 py-4
                text-base font-semibold text-white shadow-[0_18px_40px_-12px_rgba(183,110,121,0.55)]
                transition-all duration-300 hover:-translate-y-0.5 hover:bg-rose-gold-600
                hover:shadow-[0_22px_48px_-12px_rgba(183,110,121,0.7)] sm:w-auto"
            >
              {sent ? (
                <>
                  <CheckCircle2 size={18} />
                  ההודעה נשלחה
                </>
              ) : (
                <>
                  <Send size={18} />
                  שליחת הודעה
                </>
              )}
            </button>
          </form>

          {/* Details */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <DetailCard
              icon={<MapPin size={20} />}
              title="כתובת"
              lines={[
                "רח' נחום חפצדי 17, ירושלים",
                'מגדל רם, קומה 11',
              ]}
            />
            <DetailCard
              icon={<Globe size={20} />}
              title="אתר"
              lines={['www.za-cpa.com']}
              href="https://www.za-cpa.com"
            />

            <div className="rounded-2xl border border-rose-gold-300/40 bg-gradient-to-bl from-rose-gold-500 to-blush-400 p-8 text-white shadow-[0_24px_56px_-28px_rgba(183,110,121,0.6)]">
              <h3 className="font-display text-xl font-bold">פגישת ייעוץ ראשונית</h3>
              <p className="mt-2 leading-relaxed text-white/90">
                אנו מזמינים אתכם לפגישת היכרות ללא התחייבות, בה נכיר את הצרכים
                שלכם ונבחן יחד כיצד נוכל לסייע.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  ...rest
}: { label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-ink-800">
        {label}
      </label>
      <input
        {...rest}
        className="w-full rounded-xl border border-blush-200 bg-cream-50/60 px-4 py-3 text-base text-ink-900
          transition-all duration-200 placeholder:text-ink-700/40
          focus:border-rose-gold-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-rose-gold-300/30"
      />
    </div>
  )
}

function DetailCard({
  icon,
  title,
  lines,
  href,
}: {
  icon: ReactNode
  title: string
  lines: string[]
  href?: string
}) {
  const Wrapper: ElementType = href ? 'a' : 'div'
  const wrapperProps = href
    ? { href, target: '_blank', rel: 'noreferrer' }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={`group flex items-start gap-4 rounded-2xl border border-blush-100 bg-white/80 p-6 backdrop-blur-sm transition-all duration-300 ${
        href ? 'hover:-translate-y-0.5 hover:border-rose-gold-300 hover:shadow-[0_18px_40px_-20px_rgba(183,110,121,0.4)]' : ''
      }`}
    >
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-blush-100 text-rose-gold-500 transition-colors group-hover:bg-rose-gold-500 group-hover:text-white">
        {icon}
      </span>
      <div>
        <h3 className="font-display text-base font-bold text-ink-900">{title}</h3>
        {lines.map((line) => (
          <p key={line} className="mt-1 leading-relaxed text-ink-700">
            {line}
          </p>
        ))}
      </div>
    </Wrapper>
  )
}
