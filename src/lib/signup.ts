import { sendLead } from './notify'
import { register, type PayMethod, type ProductId } from './register'

export type SignupOutcome = 'redirecting' | 'manual' | 'card_unavailable'

/**
 * Registers the signup (worker → KV report + SUMIT page in the customer's name). If the worker or the SUMIT
 * API is not available, a card payment falls back to the static SUMIT payment page (`fallbackPayUrl`), where the
 * customer enters her own name and email so the invoice is issued to her.
 */
export async function submitSignup(product: ProductId, sourceLabel: string, fd: FormData, fallbackPayUrl = ''): Promise<SignupOutcome> {
  const method: PayMethod = fd.get('payMethod') === 'manual' ? 'manual' : 'card'
  const fields = {
    name: String(fd.get('fullName') ?? ''),
    email: String(fd.get('email') ?? ''),
    phone: String(fd.get('phone') ?? ''),
    sessionDate: String(fd.get('sessionDate') ?? ''),
  }
  try {
    const r = await register({ product, method, ...fields, website: String(fd.get('website') ?? '') })
    if (r.redirect) {
      window.location.href = r.redirect
      return 'redirecting'
    }
    if (r.fallback && fallbackPayUrl) return goPay(fallbackPayUrl)
    return r.fallback ? 'card_unavailable' : 'manual'
  } catch {
    await sendLead({
      target: 'orit',
      source: sourceLabel,
      ...fields,
      message: method === 'manual' ? 'ביקשה לשלם ידנית' : fallbackPayUrl ? 'עברה לדף התשלום באשראי ב-SUMIT' : 'ביקשה לשלם באשראי',
    })
    if (method === 'card' && fallbackPayUrl) return goPay(fallbackPayUrl)
    return method === 'manual' ? 'manual' : 'card_unavailable'
  }
}

function goPay(url: string): SignupOutcome {
  window.location.href = url
  return 'redirecting'
}

export const OUTCOME_TEXT: Record<SignupOutcome, string> = {
  redirecting: 'מעבירה אותך לעמוד תשלום מאובטח. החשבונית תישלח אלייך למייל מיד אחרי התשלום.',
  manual: 'ההרשמה נקלטה! אורית תיצור איתך קשר להסדרת התשלום, והחשבונית תישלח אלייך למייל עם קבלתו.',
  card_unavailable: 'ההרשמה נקלטה, אבל דף התשלום באשראי לא נפתח כרגע. אורית תיצור איתך קשר להשלמת התשלום.',
}
