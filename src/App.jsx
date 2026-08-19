import { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Background from './components/Background.jsx'
import Hero from './sections/Hero.jsx'
import Services from './sections/Services.jsx'
import Featured from './sections/Featured.jsx'
import About from './sections/About.jsx'
import WhyUs from './sections/WhyUs.jsx'
import Contact from './sections/Contact.jsx'
import X12Studio from './pages/X12Studio.jsx'
import X12License from './pages/X12License.jsx'
import X12Paper from './pages/X12Paper.jsx'

// Path-based routing. Each page route (/x12-studio/, /x12-paper/,
// /x12-license/) is its own pre-rendered HTML entry (see scripts/postbuild.mjs),
// so cross-page links are plain full-page navigations; "#section" hashes remain
// in-page scroll anchors. The path never changes without a reload, so it can be
// read once — no router state needed.
export default function App() {
  const path = window.location.pathname
  const isLicense = path.startsWith('/x12-license')
  const isPaper = path.startsWith('/x12-paper')
  const isStudio = !isLicense && !isPaper && path.startsWith('/x12')

  useEffect(() => {
    const hash = window.location.hash
    // Legacy hash routes (pre-2026-08 links like /#/x12-paper) → real paths.
    if (hash.startsWith('#/x12')) {
      window.location.replace(
        hash.startsWith('#/x12-license') ? '/x12-license/'
          : hash.startsWith('#/x12-paper') ? '/x12-paper/'
          : '/x12-studio/'
      )
      return
    }
    // Arriving on "/#section" from another page: the anchor target only exists
    // after React renders, so the browser's own anchor scroll misses it.
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [])

  return (
    <>
      <Background />
      <Navbar />
      {isLicense ? (
        <X12License />
      ) : isPaper ? (
        <X12Paper />
      ) : isStudio ? (
        <X12Studio />
      ) : (
        <main>
          <Hero />
          <Services />
          <Featured />
          <About />
          <WhyUs />
          <Contact />
        </main>
      )}
      <Footer />
    </>
  )
}
