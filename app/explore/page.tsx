'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import CountrySearch from '@/components/country/CountrySearch'
import WeatherSection from '@/components/experience/WeatherSection'
import LanguageInsights from '@/components/experience/LanguageInsights'
import LanguageTranslator from '@/components/experience/LanguageTranslator'
import CultureCuisine from '@/components/experience/CultureCuisine'
import MapPanel from '@/components/experience/MapPanel'
import LiveClock from '@/components/dashboard/LiveClock'
import CurrencyConverter from '@/components/currency/CurrencyConverter'
import { useCountry } from '@/app/context/CountryContext'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

function ExploreContent() {
  const { selectedCountry } = useCountry()

  return (
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
                <LanguageTranslator />
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
        </motion.div>
      </motion.div>
    </main>
  )
}

export default function ExplorePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const pending = localStorage.getItem('pendingSearch')
    if (pending) {
      localStorage.removeItem('pendingSearch')
    }
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 flex flex-col">
        <ExploreContent />
      </div>
    </div>
  )
}
