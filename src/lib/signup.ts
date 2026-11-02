import { sendLead } from './notify'
import { register, type PayMethod, type ProductId } from './register'

export type SignupOutcome = 'redirecting' | 'manual' | 'card_unavailable'

/** Registers the signup (worker → KV report + SUMIT page). Falls back to a plain lead email if the worker is unreachable. */
export async function submitSignup(product: ProductId, sourceLabel: string, fd: FormData): Promise<SignupOutcome> {
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
    return r.fallback ? 'card_unavailable' : 'manual'
  } catch {
    void sendLead({ target: 'orit', source: sourceLabel, ...fields, message: method === 'manual' ? 'ביקשה לשלם ידנית' : 'ביקשה לשלם באשראי (המערכת לא הייתה זמינה)' })
    return method === 'manual' ? 'manual' : 'card_unavailable'
  }
}

export const OUTCOME_TEXT: Record<SignupOutcome, string> = {
  redirecting: 'מעבירה אותך לעמוד תשלום מאובטח. החשבונית תישלח אלייך למייל מיד אחרי התשלום.',
  manual: 'ההרשמה נקלטה! אורית תיצור איתך קשר להסדרת התשלום, והחשבונית תישלח אלייך למייל עם קבלתו.',
  card_unavailable: 'ההרשמה נקלטה, אבל דף התשלום באשראי לא נפתח כרגע. אורית תיצור איתך קשר להשלמת התשלום.',
}
