'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/home/HeroSection'
import FeaturePreview from '@/components/home/FeaturePreview'
import TrendingDestinations from '@/components/home/TrendingDestinations'
import LiveInsights from '@/components/home/LiveInsights'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <FeaturePreview />
      <TrendingDestinations />
      <LiveInsights />
    </motion.div>
  )
}
