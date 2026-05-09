import { useEffect, useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Footer from './components/Footer'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Lock scroll while loader is up
    document.body.style.overflow = loading ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className="bg-bg text-fg min-h-screen">
        <Nav />
        <main>
          <Hero />
          <About />
          <Projects />
          <Resume />
        </main>
        <Footer />
      </div>
    </>
  )
}
