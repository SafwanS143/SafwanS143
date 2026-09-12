import { useCallback, useState } from 'react'
import Ribbon from './components/Ribbon'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Experience from './components/Experience'
import Fleetwright from './components/Fleetwright'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CommandPalette from './components/CommandPalette'

export default function App() {
  const [paletteOpen, setPaletteOpen] = useState(false)
  const openPalette = useCallback(() => setPaletteOpen(true), [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])

  return (
    <div id="top" className="tone-dark">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Ribbon />
      <Nav onOpenPalette={openPalette} />

      <main id="main">
        <Hero />
        <Highlights />
        <Experience />
        <Fleetwright />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />

      <CommandPalette open={paletteOpen} onClose={closePalette} onOpen={openPalette} />
    </div>
  )
}
