import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const SITE = 'https://za-cpa.com'

function meta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function link(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Per page title, description, canonical and Open Graph tags.
 *
 * Without this every route served index.html's single title and description, so
 * Google saw a dozen duplicate pages. `key` reads seo.<key>.title and
 * seo.<key>.description from the locale files, which keeps the texts
 * translated; `title`/`description` override them for pages whose subject is
 * data, such as a single service or sector.
 *
 * Social crawlers do not run our JavaScript, so they still read the tags in
 * index.html; these tags are for search engines, which do.
 */
export function useSeo(
  key: string,
  override?: { title?: string; description?: string; noIndex?: boolean }
) {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()

  useEffect(() => {
    const brand = t('seo.brand')
    const bare = override?.title ?? t(`seo.${key}.title`)
    const title = key === 'home' ? bare : `${bare} | ${brand}`
    const description = override?.description ?? t(`seo.${key}.description`)
    const url = SITE + (pathname === '/' ? '/' : pathname.replace(/\/$/, ''))

    document.title = title
    meta('meta[name="description"]', 'name', 'description', description)
    meta('meta[property="og:title"]', 'property', 'og:title', title)
    meta('meta[property="og:description"]', 'property', 'og:description', description)
    meta('meta[property="og:url"]', 'property', 'og:url', url)
    meta('meta[property="og:locale"]', 'property', 'og:locale', i18n.language === 'en' ? 'en_US' : i18n.language === 'ar' ? 'ar_IL' : 'he_IL')
    link('canonical', url)

    const robots = override?.noIndex ? 'noindex, follow' : 'index, follow'
    meta('meta[name="robots"]', 'name', 'robots', robots)
  }, [key, override?.title, override?.description, override?.noIndex, pathname, t, i18n.language])
}
