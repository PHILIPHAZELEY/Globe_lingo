'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

const floatingElements = [
  { emoji: '🌍', x: '10%', y: '20%', delay: 0, size: 'text-4xl' },
  { emoji: '🗺️', x: '80%', y: '15%', delay: 0.3, size: 'text-3xl' },
  { emoji: '☀️', x: '85%', y: '60%', delay: 0.6, size: 'text-3xl' },
  { emoji: '🍜', x: '5%', y: '70%', delay: 0.9, size: 'text-4xl' },
  { emoji: '💱', x: '20%', y: '80%', delay: 1.2, size: 'text-3xl' },
  { emoji: '🗣️', x: '75%', y: '80%', delay: 1.5, size: 'text-3xl' },
  { emoji: '🏛️', x: '90%', y: '35%', delay: 0.5, size: 'text-2xl' },
  { emoji: '🌴', x: '15%', y: '40%', delay: 0.8, size: 'text-3xl' },
]

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      localStorage.setItem('pendingSearch', searchQuery.trim())
      router.push('/explore')
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 via-transparent to-slate-950/80" />
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 20% 50%, rgba(56,189,248,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(circle at 50% 80%, rgba(236,72,153,0.1) 0%, transparent 50%)'
      }} />

      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          className={`absolute ${el.size} pointer-events-none`}
          style={{ left: el.x, top: el.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0.3, 0.6, 0.3], scale: 1, y: [0, -15, 0] }}
          transition={{ duration: 4, delay: el.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          {el.emoji}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-1.5 text-sm text-blue-300 mb-8"
          >
            <span className="animate-pulse">●</span>
            Global Intelligence Platform v3.0
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight">
            Explore the World{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Intelligently.
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover countries, languages, currencies, food, travel insights, maps, weather, and culture 
            in one unified global platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 max-w-xl mx-auto"
        >
          <form onSubmit={handleSearch} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-30 group-hover:opacity-60 blur-xl transition-all duration-300" />
            <div className="relative flex items-center bg-slate-900/90 border border-slate-700 rounded-3xl overflow-hidden backdrop-blur-xl">
              <span className="pl-5 text-2xl">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a country..."
                className="w-full bg-transparent px-4 py-4 text-white placeholder:text-slate-500 focus:outline-none text-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mr-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-blue-500/20"
              >
                Explore
              </motion.button>
            </div>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-400"
        >
          {['140+ Countries', 'Live Weather', 'Currency Converter', 'Language Insights', 'Travel Intel', 'Interactive Maps'].map((tag) => (
            <span key={tag} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              {tag}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  )
}
