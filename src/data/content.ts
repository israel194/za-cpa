import { useTranslation } from 'react-i18next'

export const serviceSlugs = [
  'audit',
  'bookkeeping',
  'tax',
  'consulting',
  'realestate',
] as const

export const sectorSlugs = [
  'companies',
  'nonprofits',
  'self-employed',
  'employees',
] as const

export type ServiceSlug = (typeof serviceSlugs)[number]
export type SectorSlug = (typeof sectorSlugs)[number]

export type ServiceIcon = ServiceSlug
export type SectorIcon = SectorSlug

export type Service = {
  slug: ServiceSlug
  iconName: ServiceIcon
  title: string
  shortTitle: string
  summary: string
  bullets: string[]
  premium?: boolean
}

export type Sector = {
  slug: SectorSlug
  iconName: SectorIcon
  title: string
  shortTitle: string
  summary: string
  bullets: string[]
}

export function useServices(): Service[] {
  const { t } = useTranslation()
  return serviceSlugs.map((slug) => ({
    slug,
    iconName: slug,
    title: t(`services.items.${slug}.title`),
    shortTitle: t(`services.items.${slug}.shortTitle`),
    summary: t(`services.items.${slug}.summary`),
    bullets: t(`services.items.${slug}.bullets`, {
      returnObjects: true,
    }) as string[],
    premium: slug === 'realestate',
  }))
}

export function useSectors(): Sector[] {
  const { t } = useTranslation()
  return sectorSlugs.map((slug) => ({
    slug,
    iconName: slug,
    title: t(`sectors.items.${slug}.title`),
    shortTitle: t(`sectors.items.${slug}.shortTitle`),
    summary: t(`sectors.items.${slug}.summary`),
    bullets: t(`sectors.items.${slug}.bullets`, {
      returnObjects: true,
    }) as string[],
  }))
}

export type Testimonial = {
  quote: string
  name: string
  role: string
}

export function useTestimonials(): Testimonial[] {
  const { t } = useTranslation()
  return t('testimonials.items', { returnObjects: true }) as Testimonial[]
}

export type TeamMember = {
  name: string
  role: string
}

export function useTeam(): TeamMember[] {
  const { t } = useTranslation()
  return t('team.members', { returnObjects: true }) as TeamMember[]
}

export type WhyUsItem = {
  title: string
  text: string
}

export const whyUsKeys = [
  'personal',
  'expertise',
  'transparency',
  'specialty',
] as const

export function useWhyUs(): WhyUsItem[] {
  const { t } = useTranslation()
  return whyUsKeys.map((key) => ({
    title: t(`whyUs.items.${key}.title`),
    text: t(`whyUs.items.${key}.text`),
  }))
}
