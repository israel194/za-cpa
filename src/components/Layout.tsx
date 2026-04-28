import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { rtlLanguages, type Language } from '../i18n'
import Header from './Header'
import Footer from './Footer'
import WhatsAppFloat from './WhatsAppFloat'
import AccessibilityMenu from './AccessibilityMenu'
import CookieConsent from './CookieConsent'

export default function Layout() {
  const location = useLocation()
  const { i18n } = useTranslation()

  // Sync html dir + lang with current language
  useEffect(() => {
    const lang = (i18n.language?.split('-')[0] ?? 'he') as Language
    const isRtl = rtlLanguages.includes(lang)
    document.documentElement.lang = lang
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr'
  }, [i18n.language])

  // Reset scroll on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-cream-50 text-ink-800">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <AccessibilityMenu />
      <CookieConsent />
    </div>
  )
}
