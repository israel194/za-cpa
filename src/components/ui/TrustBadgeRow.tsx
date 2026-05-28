import type { ReactNode } from 'react'
import { Award, ShieldCheck, ScrollText, Sparkles } from 'lucide-react'
import { CredentialBadge } from './Card'

type Badge = {
  icon?: ReactNode
  label: string
  value?: string
}

type Props = {
  badges?: Badge[]
  className?: string
}

const DEFAULT_BADGES: Badge[] = [
  { icon: <Award className="h-5 w-5" />, value: '12+', label: 'שנות ניסיון' },
  { icon: <Sparkles className="h-5 w-5" />, value: '250+', label: 'לקוחות מרוצים' },
  { icon: <ShieldCheck className="h-5 w-5" />, value: 'תקן 5568', label: 'נגישות' },
  { icon: <ScrollText className="h-5 w-5" />, value: 'GDPR', label: 'פרטיות מלאה' },
]

export default function TrustBadgeRow({ badges = DEFAULT_BADGES, className = '' }: Props) {
  return (
    <div
      className={`flex flex-wrap items-stretch justify-center gap-3 sm:gap-4 ${className}`}
    >
      {badges.map((b, i) => (
        <CredentialBadge key={i} icon={b.icon} label={b.label} value={b.value} />
      ))}
    </div>
  )
}
