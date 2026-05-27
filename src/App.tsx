import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'

// Inner routes are code-split — Home loads eagerly so the landing page renders fast.
const AboutPage = lazy(() => import('./pages/AboutPage'))
const TeamPage = lazy(() => import('./pages/TeamPage'))
const ServicesPage = lazy(() => import('./pages/ServicesPage'))
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'))
const SectorsPage = lazy(() => import('./pages/SectorsPage'))
const SectorDetailPage = lazy(() => import('./pages/SectorDetailPage'))
const ArticlesPage = lazy(() => import('./pages/ArticlesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const OritGroupPage = lazy(() => import('./pages/OritGroupPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="team"
            element={
              <Suspense fallback={<RouteFallback />}>
                <TeamPage />
              </Suspense>
            }
          />
          <Route
            path="services"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ServicesPage />
              </Suspense>
            }
          />
          <Route
            path="services/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ServiceDetailPage />
              </Suspense>
            }
          />
          <Route
            path="sectors"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SectorsPage />
              </Suspense>
            }
          />
          <Route
            path="sectors/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SectorDetailPage />
              </Suspense>
            }
          />
          <Route
            path="articles"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ArticlesPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="accessibility"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AccessibilityPage />
              </Suspense>
            }
          />
          <Route
            path="privacy"
            element={
              <Suspense fallback={<RouteFallback />}>
                <PrivacyPage />
              </Suspense>
            }
          />
          <Route
            path="orit-group"
            element={
              <Suspense fallback={<RouteFallback />}>
                <OritGroupPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
