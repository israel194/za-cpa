import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-cream-50 text-ink-800">
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
