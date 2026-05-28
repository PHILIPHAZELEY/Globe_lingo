'use client'

import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useFavorites } from '@/hooks/useFavorites'

function SettingsContent() {
  const [isDark, setIsDark] = useState(false)
  const { count: countryCount, clearAll: clearCountries } = useFavorites('favoriteCountries')
  const { count: wordCount, clearAll: clearWords } = useFavorites('favoriteWords')
  const { count: conversionCount, clearAll: clearConversions } = useFavorites('favoriteConversions')

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light'
    setIsDark(theme === 'dark')
  }, [])

  const toggleDarkMode = () => {
    const newTheme = isDark ? 'light' : 'dark'
    setIsDark(!isDark)
    localStorage.setItem('theme', newTheme)
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const clearAllFavorites = () => {
    clearCountries()
    clearWords()
    clearConversions()
  }

  const totalFavorites = countryCount + wordCount + conversionCount

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="mb-12">
            <h1 className="text-4xl font-bold gradient-text mb-2">\u2699\uFE0F Settings &amp; About</h1>
            <p className="text-slate-400">
              Manage your preferences and learn more about GlobeLingo
            </p>
          </div>

          <div className="space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <Card>
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">\uD83C\uDF1F</span>
                    Preferences
                  </h2>

                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                    <div>
                      <p className="font-semibold text-white">Dark Mode</p>
                      <p className="text-sm text-slate-400">Toggle between light and dark theme</p>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleDarkMode}
                      className={`relative w-14 h-7 rounded-full transition-colors duration-200 ${isDark ? 'bg-blue-600' : 'bg-slate-600'}`}
                    >
                      <motion.div
                        animate={{ x: isDark ? 28 : 2 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                      />
                    </motion.button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl">
                    <div>
                      <p className="font-semibold text-white">Clear All Favorites</p>
                      <p className="text-sm text-slate-400">{totalFavorites} item{totalFavorites !== 1 ? 's' : ''} saved</p>
                    </div>
                    <Button variant="secondary" size="sm" onClick={clearAllFavorites} disabled={totalFavorites === 0}>Clear All</Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">\uD83C\uDF0D</span>
                    About GlobeLingo
                  </h2>
                  <p className="text-slate-300 leading-relaxed">GlobeLingo is a modern, all-in-one travel and language companion web application designed to help you explore the world.</p>
                  <p className="text-slate-300 leading-relaxed">Built with Next.js, React, TypeScript, and Tailwind CSS, GlobeLingo provides a seamless, responsive experience across all devices.</p>
                </div>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <span className="text-3xl">\u2728</span>
                    Features
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { emoji: '\uD83C\uDF0D', title: 'Country Explorer', desc: 'Discover information about any country.' },
                      { emoji: '\uD83D\uDCB1', title: 'Currency Converter', desc: 'Convert between 70+ currencies with live rates.' },
                      { emoji: '\uD83D\uDCDA', title: 'Dictionary', desc: 'Look up English words with definitions and examples.' },
                      { emoji: '\u2B50', title: 'Favorites', desc: 'Save favorites for quick access.' },
                      { emoji: '\uD83E\uDDD0', title: 'Travel Intel', desc: 'Visa info, safety, phrases, and cost estimates.' },
                      { emoji: '\uD83C\uDF0D', title: 'Global Sync', desc: 'Everything updates when you change countries.' },
                    ].map((feature) => (
                      <div key={feature.title} className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-lg p-4">
                        <p className="font-semibold text-white mb-1">{feature.emoji} {feature.title}</p>
                        <p className="text-sm text-slate-300">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsContent />
    </Suspense>
  )
}
