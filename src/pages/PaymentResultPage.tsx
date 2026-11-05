import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { confirmPayment } from '../lib/register'
import { useSeo } from '../lib/seo'

type View = 'checking' | 'paid' | 'unverified' | 'cancelled'

/** SUMIT redirects here after payment (/payment/thanks) or cancellation (/payment/cancel). */
export default function PaymentResultPage({ cancelled = false }: { cancelled?: boolean }) {
  const { search } = useLocation()
  const [view, setView] = useState<View>(cancelled ? 'cancelled' : 'checking')
  const [product, setProduct] = useState('')

  useSeo('oritGroup', { title: 'תשלום', noIndex: true })

  useEffect(() => {
    if (cancelled) return
    const q = new URLSearchParams(search)
    const id = q.get('OG-ExternalIdentifier') ?? ''
    const paymentId = q.get('OG-PaymentID') ?? ''
    let alive = true
    confirmPayment(id, paymentId)
      .then((r) => {
        if (!alive) return
        if (r.ok && r.status === 'paid') {
          setProduct(r.product ?? '')
          setView('paid')
        } else setView('unverified')
      })
      .catch(() => alive && setView('unverified'))
    return () => {
      alive = false
    }
  }, [cancelled, search])

  const box = 'mx-auto max-w-lg rounded-3xl bg-white p-8 text-center shadow-[0_24px_60px_-30px_rgba(110,26,45,0.45)] md:p-10'
  return (
    <div dir="rtl" lang="he" className="min-h-[70vh] bg-gradient-to-b from-[#fde8de] via-[#fbeff0] to-white px-6 pt-32 pb-16">
      <div className={box} role="status" aria-live="polite">
        {view === 'checking' && (
          <>
            <Loader2 size={44} className="mx-auto animate-spin text-[#b84a6c]" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-burgundy-700">בודקת את התשלום...</h1>
          </>
        )}
        {view === 'paid' && (
          <>
            <CheckCircle2 size={52} className="mx-auto text-[#1f8f4e]" />
            <h1 className="mt-4 font-display text-3xl font-extrabold text-burgundy-700">התשלום התקבל, תודה!</h1>
            <p className="mt-3 leading-relaxed text-ink-700">
              {product ? `נרשמת ל${product}. ` : ''}חשבונית מס קבלה נשלחה אלייך למייל. מחכה לראות אותך!
            </p>
          </>
        )}
        {view === 'unverified' && (
          <>
            <CheckCircle2 size={52} className="mx-auto text-[#b84a6c]" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-burgundy-700">תודה!</h1>
            <p className="mt-3 leading-relaxed text-ink-700">
              אם התשלום הושלם, החשבונית תישלח אלייך למייל. אם משהו לא הסתדר, אורית תחזור אלייך.
            </p>
          </>
        )}
        {view === 'cancelled' && (
          <>
            <XCircle size={52} className="mx-auto text-[#b84a6c]" />
            <h1 className="mt-4 font-display text-2xl font-extrabold text-burgundy-700">התשלום לא הושלם</h1>
            <p className="mt-3 leading-relaxed text-ink-700">ההרשמה שלך נשמרה. אפשר לנסות שוב, או לבחור תשלום ידני ואורית תחזור אלייך.</p>
          </>
        )}
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/frequency-course" className="rounded-full bg-burgundy-600 px-5 py-2.5 text-sm font-bold text-white">לדף קורס העלאת תדר</Link>
          <Link to="/orit-group" className="rounded-full border border-[#f3c9d3] px-5 py-2.5 text-sm font-bold text-burgundy-700">לדף הריטריט</Link>
        </div>
      </div>
    </div>
  )
}
