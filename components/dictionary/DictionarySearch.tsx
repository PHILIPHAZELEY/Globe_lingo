'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Loader from '@/components/ui/Loader'
import { useFavorites } from '@/hooks/useFavorites'

interface Definition {
  definition: string
  example?: string
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}

interface DictionaryEntry {
  word: string
  phonetic?: string
  meanings: Meaning[]
}

export default function DictionarySearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [entry, setEntry] = useState<DictionaryEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites('favoriteWords')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setError('Please enter a word')
      return
    }

    setLoading(true)
    setError('')
    setEntry(null)

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          searchQuery.toLowerCase()
        )}`
      )

      if (!response.ok) {
        throw new Error('Word not found')
      }

      const data = await response.json()
      if (data && data.length > 0) {
        setEntry(data[0])
      } else {
        setError('Try another word')
      }
    } catch (err) {
      setError('We couldn\u0027t find that word. Try another one!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h2 className="section-title">\uD83D\uDCDA Dictionary</h2>
        <p className="section-subtitle">Look up English words and expand your vocabulary</p>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          placeholder="Search for a word (e.g., serendipity)"
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

      {entry && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="space-y-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {entry.word}
                  </h3>
                  {entry.phonetic && (
                    <p className="text-lg text-blue-600 dark:text-blue-400 italic">
                      {entry.phonetic}
                    </p>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFavorite(entry.word)}
                  className="text-3xl flex-shrink-0"
                  title={isFavorite(entry.word) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(entry.word) ? '\u2B50' : '\u2606'}
                </motion.button>
              </div>

              {entry.meanings && entry.meanings.length > 0 && (
                <div className="space-y-8">
                  {entry.meanings.map((meaning, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="space-y-4 pb-8 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                    >
                      <p className="text-xl italic font-semibold text-gray-700 dark:text-gray-300">
                        {meaning.partOfSpeech}
                      </p>

                      {meaning.definitions && meaning.definitions.length > 0 && (
                        <div>
                          <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-3">
                            Definitions
                          </p>
                          <ul className="space-y-3">
                            {meaning.definitions.slice(0, 2).map((def, defIdx) => (
                              <motion.li
                                key={defIdx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: defIdx * 0.05 }}
                                className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 border-l-4 border-blue-500"
                              >
                                <p className="text-gray-900 dark:text-white mb-2">
                                  {def.definition}
                                </p>
                                {def.example && (
                                  <p className="text-gray-600 dark:text-gray-400 italic text-sm">
                                    &ldquo;{def.example}&rdquo;
                                  </p>
                                )}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
