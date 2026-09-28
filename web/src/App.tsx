import { MotionConfig } from 'motion/react'
import { BrowserRouter } from 'react-router-dom'
import { Navigation } from './components/navigation/Navigation'
import { ReservationProvider } from './components/reservation/ReservationProvider'
import { ScrollManager } from './components/ScrollManager'
import { Footer } from './components/footer/Footer'
import { Cursor } from './components/cursor/Cursor'
import { AnimatedRoutes } from './components/AnimatedRoutes'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ReservationProvider>
          <a
            href="#main"
            className="label fixed top-3 left-3 z-[70] -translate-y-20 bg-ivory px-4 py-3 text-obsidian focus:translate-y-0"
          >
            Skip to content
          </a>
          <ScrollManager />
          <Navigation />
          <main id="main">
            <AnimatedRoutes />
          </main>
          <Footer />
          <div aria-hidden className="grain" />
          <Cursor />
        </ReservationProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
