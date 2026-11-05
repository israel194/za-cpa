import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Lock } from 'lucide-react'

/**
 * Short notice shown under every form, as required by section 11 of the
 * Privacy Protection Law (as amended by Amendment 13). `controller` picks the
 * firm (office leads) or Orit Asor (group / course registrations).
 */
export default function PrivacyNotice({ controller = 'office', className = '' }: { controller?: 'office' | 'orit'; className?: string }) {
  const { t } = useTranslation()
  return (
    <p className={`flex gap-2 text-xs leading-relaxed text-ink-700 ${className}`}>
      <Lock size={13} className="mt-0.5 shrink-0" aria-hidden />
      <span>
        {t(`formNotice.${controller}`)}{' '}
        <Link to="/privacy" className="font-semibold underline underline-offset-2">
          {t('formNotice.policy')}
        </Link>
      </span>
    </p>
  )
}
