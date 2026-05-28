'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Loader from '@/components/ui/Loader'
import SectionTitle from '@/components/ui/SectionTitle'
import { useCountry } from '@/app/context/CountryContext'
import { getTravelInfo } from '@/lib/travelData'
import { getCountryLatitude, getCountryLongitude } from '@/lib/countryUtils'

function SafetyBadge({ level }: { level: 'low' | 'moderate' | 'high' }) {
  const colors = {
    low: 'bg-green-500/20 text-green-300 border-green-400/30',
    moderate: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
    high: 'bg-red-500/20 text-red-300 border-red-400/30',
  }
  const labels = { low: 'Low Risk', moderate: 'Moderate', high: 'Exercise Caution' }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${colors[level]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {labels[level]}
    </span>
  )
}

function VisaBadge({ type }: { type: string }) {
  const config: Record<string, { label: string; color: string }> = {
    'visa-free': { label: 'Visa-Free', color: 'bg-green-500/20 text-green-300 border-green-400/30' },
    'evisa': { label: 'eVisa Available', color: 'bg-blue-500/20 text-blue-300 border-blue-400/30' },
    'visa-on-arrival': { label: 'Visa on Arrival', color: 'bg-purple-500/20 text-purple-300 border-purple-400/30' },
    'visa-required': { label: 'Visa Required', color: 'bg-amber-500/20 text-amber-300 border-amber-400/30' },
  }
  const c = config[type] || { label: type, color: 'bg-slate-500/20 text-slate-300 border-slate-400/30' }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${c.color}`}>
      {c.label}
    </span>
  )
}

export default function TravelIntelligence() {
  const { selectedCountry, searchCountry, loading: countryLoading } = useCountry()
  const [searchQuery, setSearchQuery] = useState('')
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const travelInfo = useMemo(() => {
    if (!selectedCountry) return null
    return getTravelInfo(selectedCountry.name.common)
  }, [selectedCountry])

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    await searchCountry(searchQuery)
  }

  useEffect(() => {
    const pending = localStorage.getItem('pendingSearch')
    if (pending && !selectedCountry) {
      searchCountry(pending)
      localStorage.removeItem('pendingSearch')
    }
  }, [])

  if (!loaded) return null

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="mb-10">
        <div className="rounded-3xl border border-blue-400/20 bg-gradient-to-br from-blue-600/10 via-violet-700/10 to-indigo-600/10 p-8">
          <SectionTitle
            title="Travel Intelligence"
            subtitle="Comprehensive travel insights, safety information, local phrases, and cost estimates for any country."
            align="left"
          />

          <form onSubmit={handleSearch} className="mt-6 max-w-xl">
            <div className="flex gap-3">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a country..."
                className="input-field flex-1"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={countryLoading}
                className="button-primary"
              >
                {countryLoading ? <Loader size="sm" /> : 'Search'}
              </motion.button>
            </div>
          </form>
        </div>
      </div>

      {!selectedCountry ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🧠</div>
          <h2 className="text-2xl font-bold text-white mb-2">Select a Country</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Search for a country above to unlock travel intelligence including visa info, safety tips, local phrases, and more.
          </p>
        </div>
      ) : countryLoading ? (
        <div className="flex justify-center py-20">
          <Loader text="Loading travel intelligence..." size="lg" />
        </div>
      ) : !travelInfo ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-6">🌍</div>
          <h2 className="text-2xl font-bold text-white mb-2">Travel Data Pending</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Travel intelligence for {selectedCountry.name.common} is being compiled. 
            Our database is continuously expanding.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.06, delayChildren: 0.1 }}
          className="space-y-10"
        >
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-3xl font-bold text-white">
              {selectedCountry.flags?.svg && (
                <img src={selectedCountry.flags.svg} alt="" className="inline-block w-8 h-6 rounded mr-3 object-cover" />
              )}
              {selectedCountry.name.common}
            </h1>
            <VisaBadge type={travelInfo.visa.type} />
            <SafetyBadge level={travelInfo.safety.level} />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="col-span-full md:col-span-2 lg:col-span-1"
            >
              <Card className="bg-slate-900/80 border-slate-700 p-6 h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">🛂 Visa Information</h3>
                    <VisaBadge type={travelInfo.visa.type} />
                  </div>
                  <p className="text-slate-300 text-sm">{travelInfo.visa.requirements}</p>
                  <p className="text-slate-400 text-xs">{travelInfo.visa.details}</p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-slate-900/80 border-slate-700 p-6 h-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">🌤️ Best Time to Visit</h3>
                  <div className="flex flex-wrap gap-2">
                    {travelInfo.bestTime.seasons.map((s) => (
                      <span key={s} className="rounded-full bg-blue-500/10 border border-blue-400/20 px-3 py-1 text-xs text-blue-300">{s}</span>
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm">{travelInfo.bestTime.recommendation}</p>
                  <p className="text-slate-400 text-xs">{travelInfo.bestTime.climateNote}</p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <Card className="bg-slate-900/80 border-slate-700 p-6 h-full">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">🛡️ Safety</h3>
                    <SafetyBadge level={travelInfo.safety.level} />
                  </div>
                  <ul className="space-y-2">
                    {travelInfo.safety.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-blue-400 mt-0.5">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-slate-900/80 border-slate-700 p-6 h-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">🚨 Emergency</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-red-500/10 border border-red-400/20 p-3">
                      <p className="text-xs text-red-300 uppercase tracking-wider">Police</p>
                      <p className="text-xl font-bold text-white mt-1">{travelInfo.emergency.police}</p>
                    </div>
                    <div className="rounded-2xl bg-blue-500/10 border border-blue-400/20 p-3">
                      <p className="text-xs text-blue-300 uppercase tracking-wider">Ambulance</p>
                      <p className="text-xl font-bold text-white mt-1">{travelInfo.emergency.ambulance}</p>
                    </div>
                    <div className="rounded-2xl bg-orange-500/10 border border-orange-400/20 p-3">
                      <p className="text-xs text-orange-300 uppercase tracking-wider">Fire</p>
                      <p className="text-xl font-bold text-white mt-1">{travelInfo.emergency.fire}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-500/10 border border-slate-400/20 p-3">
                      <p className="text-xs text-slate-300 uppercase tracking-wider">Info</p>
                      <p className="text-sm font-bold text-white mt-1">{travelInfo.emergency.general}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <Card className="bg-slate-900/80 border-slate-700 p-6 h-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">🚌 Transportation</h3>
                  <p className="text-slate-300 text-sm">{travelInfo.transport.summary}</p>
                  <ul className="space-y-2">
                    {travelInfo.transport.options.map((opt, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                        <span className="text-blue-400">▸</span>
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-slate-900/80 border-slate-700 p-6 h-full">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">💰 Cost Estimation</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5">
                      <span className="text-sm text-slate-400">Budget</span>
                      <span className="text-lg font-semibold text-green-400">{travelInfo.costs.budget}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5">
                      <span className="text-sm text-slate-400">Mid-Range</span>
                      <span className="text-lg font-semibold text-blue-400">{travelInfo.costs.midRange}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-2xl bg-white/5">
                      <span className="text-sm text-slate-400">Luxury</span>
                      <span className="text-lg font-semibold text-purple-400">{travelInfo.costs.luxury}</span>
                    </div>
                  </div>
                  <ul className="space-y-1 mt-2">
                    {travelInfo.costs.notes.map((note, i) => (
                      <li key={i} className="text-xs text-slate-500 flex items-start gap-1">
                        <span className="text-blue-400">•</span>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="bg-slate-900/80 border-slate-700 p-6">
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">🎭 Cultural Etiquette</h3>
                  <div className="space-y-3">
                    {travelInfo.safety.culturalEtiquette.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-white/5">
                        <span className="text-blue-400 mt-0.5 text-lg">{['🤝', '👔', '🍽️', '🎁', '🙏', '👋', '💬', '👀'][i % 8]}</span>
                        <p className="text-sm text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">🚫 Things to Avoid</h3>
                  <div className="space-y-3">
                    {travelInfo.safety.thingsToAvoid.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-2xl bg-red-500/5 border border-red-400/10">
                        <span className="text-red-400 mt-0.5">✕</span>
                        <p className="text-sm text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-slate-900/80 border-slate-700 p-6">
              <h3 className="text-lg font-semibold text-white mb-6">🗣️ Useful Local Phrases</h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {travelInfo.phrases.map((phrase, i) => (
                  <motion.div
                    key={phrase.english}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 + i * 0.05 }}
                    className="rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-400/20 p-4"
                  >
                    <p className="text-xs text-blue-300 uppercase tracking-wider">{phrase.english}</p>
                    <p className="text-2xl font-bold text-white mt-2">{phrase.translation}</p>
                    <p className="text-sm text-slate-400 mt-1">/{phrase.pronunciation}/</p>
                    <p className="text-xs text-slate-500 mt-1">{phrase.script}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-3xl border border-slate-700 bg-slate-900/50 p-6"
          >
            <h3 className="text-lg font-semibold text-white mb-4">📍 Nearby Discovery</h3>
            <p className="text-slate-400 text-sm mb-4">
              Discover restaurants, hotels, attractions, museums, beaches, and landmarks near {selectedCountry.name.common}.
            </p>
            <a
              href={`/explore#map`}
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
            >
              Open Interactive Map →
            </a>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
