import { AnimatePresence, motion } from 'motion/react'
import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { duration, ease } from '../lib/motion'
import { Home } from '../pages/Home'

// Home is the landing experience and ships in the main bundle; every other page loads on demand.
const MenuPage = lazy(() => import('../pages/MenuPage').then((m) => ({ default: m.MenuPage })))
const ExperiencePage = lazy(() => import('../pages/ExperiencePage').then((m) => ({ default: m.ExperiencePage })))
const CoffeePage = lazy(() => import('../pages/CoffeePage').then((m) => ({ default: m.CoffeePage })))
const StoryPage = lazy(() => import('../pages/StoryPage').then((m) => ({ default: m.StoryPage })))
const EventsPage = lazy(() => import('../pages/EventsPage').then((m) => ({ default: m.EventsPage })))
const VisitPage = lazy(() => import('../pages/VisitPage').then((m) => ({ default: m.VisitPage })))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })))

/** A soft cross-fade between pages; in-page anchors (same pathname) never trigger it. */
export function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: duration.base, ease: ease.silk }}
      >
        <Suspense fallback={<div className="min-h-svh bg-obsidian" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/coffee" element={<CoffeePage />} />
            <Route path="/story" element={<StoryPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}
