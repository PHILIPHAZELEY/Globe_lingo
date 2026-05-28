'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { useCountry } from '@/app/context/CountryContext'
import { getLanguageDetails, getLanguageSummary, getLanguageIntelligence } from '@/lib/countryUtils'

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

export default function LanguageInsights() {
  const { selectedCountry } = useCountry()
  const [searchQuery, setSearchQuery] = useState('hello')
  const [entry, setEntry] = useState<DictionaryEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const languages = selectedCountry ? getLanguageDetails(selectedCountry) : []
  const { official: officialLangs, local: localLangs } = selectedCountry
    ? getLanguageIntelligence(selectedCountry)
    : { official: [], local: [] }

  useEffect(() => {
    if (!selectedCountry) return
    setSearchQuery('hello')
    fetchLanguageEntry('hello')
  }, [selectedCountry])

  async function fetchLanguageEntry(term: string) {
    setLoading(true)
    setError('')
    setEntry(null)

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(term)}`)
      if (!response.ok) {
        throw new Error('Request failed')
      }
      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setEntry(data[0])
      } else {
        setError('No language insights available for that expression.')
      }
    } catch (err) {
      setError('Unable to load language insights. Try another phrase.')
    } finally {
      setLoading(false)
    }
  }

  if (!selectedCountry) return null

  return (
    <section id="languages" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title">Language Insights</h2>
          <p className="section-subtitle">Official and local communication cues for {selectedCountry.name.common}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Card className="bg-slate-950/80 border-slate-700 p-6">
          <div className="space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-300/80">Official language</p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {officialLangs.map(l => l.name).join(', ') || '—'}
              </p>
              {officialLangs.length > 0 && (
                <p className="mt-2 text-sm text-slate-400">
                  Code: {officialLangs.map(l => l.code).join(', ')}
                </p>
              )}
            </div>

            {localLangs.length > 0 && (
              <div className="rounded-3xl bg-white/5 border border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-3">Local languages</p>
                <div className="grid gap-2">
                  {localLangs.map(lang => (
                    <div key={lang.code} className="flex items-center justify-between">
                      <span className="text-white/90">{lang.name}</span>
                      <span className="text-xs text-slate-400">{lang.code}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl bg-gradient-to-r from-blue-600/20 via-violet-700/20 to-indigo-600/20 border border-white/10 p-5">
              <p className="text-sm uppercase tracking-[0.2em] text-blue-200/80">Communication helper</p>
              <p className="mt-2 text-white text-lg font-semibold">Say “Hello” with confidence</p>
              <p className="mt-3 text-slate-300">Use this section to explore pronunciation, meaning, and practical expressions in English while learning the local tone.</p>
            </div>
          </div>
        </Card>

        <Card className="bg-slate-950/80 border-slate-700 p-6">
          <div className="space-y-5">
            <form
              onSubmit={(event) => {
                event.preventDefault()
                if (searchQuery.trim()) fetchLanguageEntry(searchQuery.trim())
              }}
              className="grid gap-4"
            >
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Search expression
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="hello, thanks, please"
                  className="input-field bg-slate-900/70 border-slate-700"
                />
              </label>
              <Button type="submit" variant="primary" disabled={loading} fullWidth>
                {loading ? 'Searching…' : 'Explore expression'}
              </Button>
            </form>

            {loading && <SkeletonLoader variant="text" />}
            {error && <p className="text-red-300">{error}</p>}

            {entry && !loading && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-5"
              >
                <div className="rounded-3xl bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Expression</p>
                      <h3 className="mt-2 text-3xl font-semibold text-white">{entry.word}</h3>
                    </div>
                    <p className="text-xl text-blue-300">{entry.phonetic ?? ''}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {entry.meanings.slice(0, 2).map((meaning, idx) => (
                    <div key={idx} className="rounded-3xl bg-white/5 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{meaning.partOfSpeech}</p>
                      <ul className="mt-4 space-y-3 text-slate-300">
                        {meaning.definitions.slice(0, 2).map((definition, index) => (
                          <li key={index} className="rounded-2xl bg-slate-900/80 p-4">
                            <p>{definition.definition}</p>
                            {definition.example && <p className="mt-2 text-sm italic text-slate-500">“{definition.example}”</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}
