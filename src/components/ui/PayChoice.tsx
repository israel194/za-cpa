import { CreditCard, HandCoins } from 'lucide-react'
import type { PayMethod } from '../../lib/register'

/** Card now (SUMIT, invoice emailed automatically) or manual payment arranged with Orit. */
export function PayChoice({ accent = '#8e3b4a', card = true }: { accent?: string; card?: boolean }) {
  type Opt = { value: PayMethod; title: string; body: string; Icon: typeof CreditCard }
  const all: Opt[] = [
    { value: 'card', title: 'תשלום מאובטח באשראי עכשיו', body: 'חשבונית מס קבלה תישלח אלייך למייל מיד אחרי התשלום.', Icon: CreditCard },
    { value: 'manual', title: 'תשלום ידני', body: 'העברה בנקאית, ביט או מזומן. אורית תיצור איתך קשר, והחשבונית תישלח עם קבלת התשלום.', Icon: HandCoins },
  ]
  const opts = all.filter((o) => card || o.value === 'manual')
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold text-ink-800">איך נוח לך לשלם?</legend>
      <div className="space-y-2">
        {opts.map(({ value, title, body, Icon }, i) => (
          <label
            key={value}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#e6d9d6] px-4 py-3 has-[:checked]:border-[#8e3b4a] has-[:checked]:bg-[#f6efe6]"
          >
            <input type="radio" name="payMethod" value={value} defaultChecked={i === 0} className="mt-1" style={{ accentColor: accent }} />
            <Icon size={18} className="mt-0.5 shrink-0" style={{ color: accent }} />
            <span>
              <span className="block text-sm font-bold text-ink-900">{title}</span>
              <span className="block text-xs leading-relaxed text-ink-700">{body}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** Hidden honeypot field (bots fill it, people don't see it). */
export function Honeypot() {
  return <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
}
