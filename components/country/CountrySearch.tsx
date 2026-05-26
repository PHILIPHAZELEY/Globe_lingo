'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Loader from '@/components/ui/Loader'
import { useFavorites } from '@/hooks/useFavorites'

interface Country {
  name: {
    official: string
    common: string
  }
  flags: {
    svg: string
    png: string
  }
  capital?: string[]
  population: number
  languages?: Record<string, string>
  currencies?: Record<string, { name: string; symbol: string }>
}

export default function CountrySearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites('favoriteCountries')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setError('Please enter a country name')
      return
    }

    setLoading(true)
    setError('')
    setCountry(null)

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(searchQuery)}`
      )

      if (!response.ok) {
        throw new Error('Country not found')
      }

      const data = await response.json()
      if (data && data.length > 0) {
        setCountry(data[0])
      } else {
        setError('We couldn\u0027t find that country. Try another name!')
      }
    } catch (err) {
      setError('We couldn\u0027t find that country. Try another name!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h2 className="section-title">\uD83C\uDF0D Explore Countries</h2>
        <p className="section-subtitle">Discover information about any country in the world</p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search for a country (e.g., Japan, France, Brazil)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader size="sm" /> : 'Search'}
        </Button>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 flex items-center gap-3"
        >
          <span className="text-xl">\u26A0\uFE0F</span>
          <span>{error}</span>
        </motion.div>
      )}

      {loading && <SkeletonLoader />}

      {country && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {country.name.official}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {country.name.common}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFavorite(country.name.official)}
                  className="text-3xl"
                  title={isFavorite(country.name.official) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(country.name.official) ? '\u2B50' : '\u2606'}
                </motion.button>
              </div>

              {country.flags.svg && (
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  src={country.flags.svg}
                  alt={'Flag of ' + country.name.official}
                  className="w-full md:w-48 h-auto rounded-xl object-cover shadow-md"
                  loading="lazy"
                />
              )}

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {country.capital && country.capital.length > 0 && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Capital
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      {country.capital[0]}
                    </p>
                  </div>
                )}

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                    Population
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {(country.population / 1_000_000).toFixed(1)}M
                  </p>
                </div>

                {country.languages && Object.keys(country.languages).length > 0 && (
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Languages
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {Object.values(country.languages).slice(0, 2).join(', ')}
                    </p>
                  </div>
                )}

                {country.currencies && Object.keys(country.currencies).length > 0 && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4">
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                      Currencies
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {Object.entries(country.currencies)
                        .map(([code]) => code)
                        .slice(0, 2)
                        .join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
