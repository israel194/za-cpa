import { CreditCard, HandCoins } from 'lucide-react'
import type { PayMethod } from '../../lib/register'

/** Card now (SUMIT, invoice emailed automatically) or manual payment arranged with Orit. */
export function PayChoice({ accent = '#b84a6c' }: { accent?: string }) {
  const opts: { value: PayMethod; title: string; body: string; Icon: typeof CreditCard }[] = [
    { value: 'card', title: 'תשלום מאובטח באשראי עכשיו', body: 'חשבונית מס קבלה תישלח אלייך למייל מיד אחרי התשלום.', Icon: CreditCard },
    { value: 'manual', title: 'תשלום ידני', body: 'העברה בנקאית, ביט או מזומן. אורית תיצור איתך קשר, והחשבונית תישלח עם קבלת התשלום.', Icon: HandCoins },
  ]
  return (
    <fieldset>
      <legend className="mb-2 block text-sm font-semibold text-ink-800">איך נוח לך לשלם?</legend>
      <div className="space-y-2">
        {opts.map(({ value, title, body, Icon }, i) => (
          <label
            key={value}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#f3c9d3] px-4 py-3 has-[:checked]:border-[#b84a6c] has-[:checked]:bg-[#fbeff0]"
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
