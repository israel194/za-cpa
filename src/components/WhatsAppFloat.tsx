import { useTranslation } from 'react-i18next'
import { MessageCircle } from 'lucide-react'

const PHONE = '972523975659'

export default function WhatsAppFloat() {
  const { t } = useTranslation()
  return (
    <a
      href={`https://wa.me/${PHONE}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t('whatsapp')}
      className="group fixed bottom-6 left-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-rose-gold-500 text-white shadow-[0_18px_40px_-8px_rgba(183,110,121,0.7)] transition-all duration-300 hover:-translate-y-1 hover:bg-rose-gold-600 hover:shadow-[0_22px_48px_-8px_rgba(183,110,121,0.85)] focus:outline-none focus:ring-4 focus:ring-rose-gold-300/50"
    >
      <MessageCircle size={24} className="transition-transform group-hover:scale-110" />
      <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-rose-gold-500 opacity-60 blur-md transition-opacity group-hover:opacity-90" />
    </a>
  )
}
