'use client'

import { motion } from 'framer-motion'
import TravelIntelligence from '@/components/travel/TravelIntelligence'
import { CountryProvider } from '@/app/context/CountryContext'

export default function TravelIntelligencePage() {
  return (
    <CountryProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <TravelIntelligence />
      </motion.div>
    </CountryProvider>
  )
}
