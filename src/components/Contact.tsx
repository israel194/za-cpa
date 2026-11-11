import {
  useState,
  type ChangeEvent,
  type ElementType,
  type FormEvent,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import PrivacyNotice from './ui/PrivacyNotice'
import { MapPin, Globe, Send, CheckCircle2, Phone } from 'lucide-react'
import { sendLead } from '../lib/notify'

type FormState = {
  name: string
  email: string
  phone: string
  message: string
}

const initial: FormState = { name: '', email: '', phone: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const { pathname } = useLocation()
  const [form, setForm] = useState<FormState>(initial)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>('idle')
  const sent = status === 'sent'

  const handleChange =
    (key: keyof FormState) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }))
    }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')
    // ממתינים לתשובה: קודם הוצגה הודעת תודה גם כששליחה נכשלה, והפנייה אבדה
    // בלי שאיש ידע. בכישלון הפרטים נשארים בטופס ומוצעות דרכי פנייה חלופיות.
    const ok = await sendLead({
      target: 'office',
      // נרשם בדוח ובקובץ האקסל, כדי שיהיה ברור מאיזה עמוד הגיעה הפנייה
      source: pathname === '/contact' ? 'האתר הראשי · עמוד יצירת קשר' : 'האתר הראשי · עמוד הבית',
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
    })
    if (!ok) {
      setStatus('failed')
      return
    }
    setStatus('sent')
    setForm(initial)
    setTimeout(() => setStatus('idle'), 6000)
  }

  return (
    <section className="relative overflow-hidden bg-cream-50 py-20 md:py-28">
      <div aria-hidden className="grain pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="mt-2 grid gap-8 lg:grid-cols-5">
          <form
            onSubmit={handleSubmit}
            className="rounded-[14px] border border-[color:var(--color-rule)] bg-surface p-8 shadow-[var(--shadow-raise)] md:p-10 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label={t('contact.form.name')}
                value={form.name}
                onChange={handleChange('name')}
                required
                autoComplete="name"
              />
              <Field
                label={t('contact.form.email')}
                type="email"
                value={form.email}
                onChange={handleChange('email')}
                required
                autoComplete="email"
              />
              <Field
                label={t('contact.form.phone')}
                type="tel"
                value={form.phone}
                onChange={handleChange('phone')}
                autoComplete="tel"
              />
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-ink-800">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange('message')}
                  required
                  className="w-full resize-none rounded-[6px] border border-[color:var(--color-rule-strong)] bg-background/50 px-4 py-3 text-base text-ink-900 transition-colors duration-200 placeholder:text-ink-700/40 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25"
                  placeholder={t('contact.form.messagePlaceholder')}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-[6px] bg-primary px-8 py-3.5 text-base font-bold text-white transition-colors duration-200 hover:bg-burgundy-500 disabled:opacity-60 sm:w-auto"
            >
              {sent ? (
                <>
                  <CheckCircle2 size={18} />
                  {t('common.sent')}
                </>
              ) : (
                <>
                  <Send size={18} />
                  {status === 'sending' ? t('common.sending') : t('common.send')}
                </>
              )}
            </button>

            <p aria-live="polite" className="sr-only">
              {sent ? t('contact.form.successNote') : status === 'failed' ? t('contact.form.errorTitle') : ''}
            </p>

            {status === 'sent' && (
              <p className="mt-4 rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-ink-800">
                {t('contact.form.successNote')}
              </p>
            )}

            {status === 'failed' && (
              <div role="alert" className="mt-4 rounded-2xl border border-primary/30 bg-white px-4 py-4 text-sm leading-relaxed text-ink-800">
                <p className="font-bold text-primary">{t('contact.form.errorTitle')}</p>
                <p className="mt-1">{t('contact.form.errorBody')}</p>
                <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-semibold">
                  <a href="tel:+972523975659" dir="ltr" className="underline underline-offset-2">052-3975659</a>
                  <a href="https://wa.me/972523975659" target="_blank" rel="noreferrer" className="underline underline-offset-2">WhatsApp</a>
                  <a href="mailto:office@za-cpa.com" dir="ltr" className="underline underline-offset-2">office@za-cpa.com</a>
                </p>
              </div>
            )}
            <PrivacyNotice className="mt-5" />
          </form>

          <div className="flex flex-col gap-5 lg:col-span-2">
            <DetailCard
              icon={<MapPin size={20} />}
              title={t('contact.details.address')}
              lines={[
                t('contact.details.addressLine1'),
                t('contact.details.addressLine2'),
              ]}
            />
            <DetailCard
              icon={<Phone size={20} />}
              title={t('contact.details.phone')}
              lines={['052-3975659']}
              href="tel:0523975659"
            />
            <DetailCard
              icon={<Globe size={20} />}
              title={t('contact.details.site')}
              lines={['www.za-cpa.com']}
              href="https://www.za-cpa.com"
            />

            <div className="relative overflow-hidden rounded-[14px] bg-burgundy-700 p-7 text-white">
              <div aria-hidden className="bg-plus-light pointer-events-none absolute inset-0" />
              <div className="relative">
                <span aria-hidden className="mb-4 block h-px w-10 bg-gold-400" />
                <h3 className="font-display text-xl font-bold">{t('contact.consultBox.title')}</h3>
                <p className="mt-2 leading-relaxed text-white/80">{t('contact.consultBox.text')}</p>
              </div>
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
  const id = useId()
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink-800">
        {label}
      </label>
      <input
        id={id}
        {...rest}
        className="w-full rounded-[6px] border border-[color:var(--color-rule-strong)] bg-background/50 px-4 py-3 text-base text-ink-900 transition-colors duration-200 placeholder:text-ink-700/40 focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/25"
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
  const wrapperProps = href ? { href, target: '_blank', rel: 'noreferrer' } : {}

  return (
    <Wrapper
      {...wrapperProps}
      className={`group flex items-start gap-4 rounded-[10px] border border-[color:var(--color-rule)] bg-surface p-6 transition-colors duration-200 ${
        href ? 'hover:border-gold-400' : ''
      }`}
    >
      <span className="mt-0.5 flex-none text-gold-600">{icon}</span>
      <div>
        <h3 className="display display-sm text-[1.05rem]">{title}</h3>
        {lines.map((line) => (
          <p key={line} className="mt-1 leading-relaxed text-ink-700">
            {line}
          </p>
        ))}
      </div>
    </Wrapper>
  )
}
