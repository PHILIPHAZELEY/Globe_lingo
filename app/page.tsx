'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import CountrySearch from '@/components/country/CountrySearch'
import CurrencyConverter from '@/components/currency/CurrencyConverter'
import WeatherSection from '@/components/experience/WeatherSection'
import LanguageInsights from '@/components/experience/LanguageInsights'
import CultureCuisine from '@/components/experience/CultureCuisine'
import MapPanel from '@/components/experience/MapPanel'
import LiveClock from '@/components/dashboard/LiveClock'
import { CountryProvider, useCountry } from './context/CountryContext'

function HomeContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { selectedCountry } = useCountry()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-7xl mx-auto px-4 py-8 md:py-12"
          >
            <motion.div className="space-y-10" variants={containerVariants} initial="hidden" animate="visible">
              <motion.div variants={itemVariants}>
                <CountrySearch />
              </motion.div>

              <div className="grid gap-8 xl:grid-cols-[1.6fr_0.95fr]">
                <div className="space-y-8">
                  <motion.div variants={itemVariants}>
                    <WeatherSection />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <LanguageInsights />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <CultureCuisine />
                  </motion.div>
                  <motion.div variants={itemVariants}>
                    <MapPanel />
                  </motion.div>
                </div>

                <aside className="space-y-8">
                  <div className="sticky top-6 space-y-6">
                    <motion.div variants={itemVariants}>
                      <LiveClock label="Local time" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <CurrencyConverter />
                    </motion.div>
                  </div>
                </aside>
              </div>

              <motion.footer
                variants={itemVariants}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-sm text-slate-400"
              >
                <p>GlobeLingo is a synchronized global intelligence dashboard for travel, culture, and communication.</p>
                <p className="mt-2 text-slate-500">Powered by REST Countries, Open-Meteo, Frankfurter, Free Dictionary, and TheMealDB.</p>
              </motion.footer>
            </motion.div>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <CountryProvider>
      <HomeContent />
    </CountryProvider>
  )
}
