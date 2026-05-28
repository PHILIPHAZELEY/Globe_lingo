'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import { useFavorites } from '@/hooks/useFavorites'
import { useCountry } from '@/app/context/CountryContext'
import {
  formatPopulation,
  getCountryLocaleLabel,
  getCurrencyLabel,
  getLanguageSummary,
} from '@/lib/countryUtils'

export default function CountrySearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const { selectedCountry, searchCountry, loading, error } = useCountry()
  const { isFavorite, toggleFavorite } = useFavorites('favoriteCountries')

  const localeLabel = useMemo(
    () => (selectedCountry ? getCountryLocaleLabel(selectedCountry) : 'Global Intelligence'),
    [selectedCountry]
  )

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) return
    await searchCountry(searchQuery)
  }

  return (
    <section id="overview" className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-8 shadow-xl shadow-blue-500/10">
            <p className="text-sm uppercase tracking-[0.3em] text-blue-300/80">Connected country engine</p>
            <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl">Explore the world through one synchronized lens.</h1>
            <p className="mt-4 max-w-2xl text-slate-300">Search any country to instantly refresh weather, currency, language, food, time, and map insights across the entire GlobeLingo ecosystem.</p>
          </div>

          <Card className="bg-slate-950/80 border-slate-700 p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Country selector</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Search or switch country</h2>
                </div>
                {selectedCountry && (
                  <button
                    onClick={() => toggleFavorite(selectedCountry.name.official)}
                    className="text-3xl"
                    title={isFavorite(selectedCountry.name.official) ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    {isFavorite(selectedCountry.name.official) ? '★' : '☆'}
                  </button>
                )}
              </div>

              <form onSubmit={handleSearch} className="grid gap-4">
                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <input
                    type="text"
                    placeholder="Search for a country, e.g. Japan"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field bg-slate-900/80 border-slate-700"
                  />
                  <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                    {loading ? <Loader size="sm" /> : 'Discover'}
                  </Button>
                </div>
              </form>

              {error && (
                <div className="rounded-3xl bg-red-500/10 border border-red-400/20 p-4 text-sm text-red-200">
                  {error}
                </div>
              )}

              {loading && <SkeletonLoader variant="text" />}
            </div>
          </Card>
        </div>

        <Card className="bg-slate-950/80 border-slate-700 p-6">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Current country</p>
              <p className="text-sm text-blue-300/80">{localeLabel}</p>
              <h2 className="text-3xl font-semibold text-white">
                {selectedCountry?.name.official ?? 'Waiting for your first country'}
              </h2>
            </div>

            {selectedCountry ? (
              <div className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Capital</p>
                    <p className="mt-3 text-lg font-semibold text-white">{selectedCountry.capital?.[0] ?? '—'}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Population</p>
                    <p className="mt-3 text-lg font-semibold text-white">{formatPopulation(selectedCountry.population)}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Languages</p>
                    <p className="mt-3 text-lg font-semibold text-white">{getLanguageSummary(selectedCountry)}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Currency</p>
                    <p className="mt-3 text-lg font-semibold text-white">{getCurrencyLabel(selectedCountry)}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Region</p>
                    <p className="mt-3 text-lg font-semibold text-white">{selectedCountry.region ?? '—'}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Timezone</p>
                    <p className="mt-3 text-lg font-semibold text-white">{selectedCountry.timezones?.[0] ?? '—'}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-3xl bg-white/5 p-5 text-slate-300">
                Search for a country to activate the global intelligence platform.
              </div>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}
