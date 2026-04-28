import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import TeamPage from './pages/TeamPage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import SectorsPage from './pages/SectorsPage'
import SectorDetailPage from './pages/SectorDetailPage'
import ArticlesPage from './pages/ArticlesPage'
import ContactPage from './pages/ContactPage'
import AccessibilityPage from './pages/AccessibilityPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailPage />} />
          <Route path="sectors" element={<SectorsPage />} />
          <Route path="sectors/:slug" element={<SectorDetailPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="accessibility" element={<AccessibilityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
