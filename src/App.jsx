import { useState } from 'react'
import Nav from './components/Nav'
import TraceLine from './components/TraceLine'
import Hero from './components/Hero'
import Signals from './components/Signals'
import Experience from './components/Experience'
import Projects from './components/Projects'
import About from './components/About'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <div id="top" className="relative min-h-dvh bg-bg text-fg">
      <a href="#main" className="skip-link">
        skip to content
      </a>
      <Nav onOpenPalette={() => setPaletteOpen(true)} />

      {/* Signature interaction — the scroll-drawn PCB trace layer */}
      <TraceLine />

      <div className="relative z-10">
        <main id="main">
          <Hero />
          <Signals />
          <Experience />
          <Projects />
          <About />
        </main>
        <Footer />
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onOpen={() => setPaletteOpen(true)}
      />
    </div>
  )
}
