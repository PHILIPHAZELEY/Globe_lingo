'use client'

import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { useFavorites } from '@/hooks/useFavorites'

interface Country {
  name: { official: string; common: string }
  flags: { svg: string; png: string }
  capital?: string[]
  population: number
}

function FavoritesContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  const { favorites: wordFavorites, removeFavorite: removeWord } = useFavorites('favoriteWords')
  const { favorites: conversionFavorites, removeFavorite: removeConversion } = useFavorites('favoriteConversions')
  const { favorites: countryNames, removeFavorite: removeCountryName } = useFavorites('favoriteCountries')

  useEffect(() => {
    setLoading(true)
    const fetchCountries = async () => {
      if (countryNames.length === 0) { setLoading(false); return }
      try {
        const countries = await Promise.all(
          countryNames.map((name: string) =>
            fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`)
              .then(r => r.json()).then(data => data[0]).catch(() => null)
          )
        )
        setFavoriteCountries(countries.filter(Boolean))
      } catch {}
      setLoading(false)
    }
    fetchCountries()
  }, [countryNames])

  const handleRemoveCountry = (name: string) => {
    setFavoriteCountries(prev => prev.filter(c => c.name.official !== name))
    removeCountryName(name)
  }

  const hasAny = favoriteCountries.length > 0 || wordFavorites.length > 0 || conversionFavorites.length > 0

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">
          <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="mb-12">
                <h1 className="text-4xl font-bold gradient-text mb-2">\u2B50 Favorites</h1>
                <p className="text-gray-600 dark:text-gray-400">All your saved countries, words, and conversions</p>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 dark:border-gray-600 border-t-blue-600" />
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading favorites...</p>
                </div>
              ) : !hasAny ? (
                <Card hover={false}>
                  <div className="text-center py-12">
                    <p className="text-5xl mb-4">\uD83D\uDCED</p>
                    <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">No favorites yet!</p>
                    <p className="text-gray-500 dark:text-gray-500 mb-8">Start saving your favorite countries, words, and conversions to see them here.</p>
                    <a href="/" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">Go explore \u2192</a>
                  </div>
                </Card>
              ) : (
                <div className="space-y-12">
                  {favoriteCountries.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">\uD83C\uDF0D Favorite Countries ({favoriteCountries.length})</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {favoriteCountries.map((c) => (
                          <motion.div key={c.name.official} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Card>
                              <div className="flex gap-4">
                                {c.flags?.svg && <img src={c.flags.svg} alt={c.name.official} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />}
                                <div className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate">{c.name.official}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Pop: {(c.population / 1_000_000).toFixed(1)}M{c.capital && ` \u2022 ${c.capital[0]}`}</p>
                                  <Button variant="secondary" size="sm" onClick={() => handleRemoveCountry(c.name.official)}>Remove</Button>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {wordFavorites.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">\uD83D\uDCDA Favorite Words ({wordFavorites.length})</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wordFavorites.map((word) => (
                          <motion.div key={word} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Card className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900 dark:text-white">{word}</span>
                              <Button variant="ghost" size="sm" onClick={() => removeWord(word)}>\u2715</Button>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {conversionFavorites.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">\uD83D\uDCB1 Favorite Conversions ({conversionFavorites.length})</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {conversionFavorites.map((conv) => (
                          <motion.div key={conv} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}>
                            <Card className="flex items-center justify-between">
                              <span className="font-semibold text-gray-900 dark:text-white">{conv.replace('-', ' \u2192 ')}</span>
                              <Button variant="ghost" size="sm" onClick={() => removeConversion(conv)}>\u2715</Button>
                            </Card>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function FavoritesPage() {
  return (
    <Suspense fallback={null}>
      <FavoritesContent />
    </Suspense>
  )
}
