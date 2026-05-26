'use client'

import { useState } from 'react'

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
        setError('No country found')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch country data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <h2 className="section-title">🌍 Country Search</h2>

      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter country name (e.g., Japan)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
        />
        <button
          type="submit"
          disabled={loading}
          className="button-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
      )}

      {country && (
        <div className="card">
          <div className="flex flex-col md:flex-row gap-6">
            {country.flags.svg && (
              <img
                src={country.flags.svg}
                alt={`Flag of ${country.name.official}`}
                className="w-full md:w-32 h-auto rounded-lg object-cover"
              />
            )}

            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {country.name.official}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {country.capital && country.capital.length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Capital</p>
                    <p className="text-lg text-gray-900">{country.capital[0]}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-semibold text-gray-600">Population</p>
                  <p className="text-lg text-gray-900">
                    {country.population.toLocaleString()}
                  </p>
                </div>

                {country.languages && Object.keys(country.languages).length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Languages</p>
                    <p className="text-lg text-gray-900">
                      {Object.values(country.languages).join(', ')}
                    </p>
                  </div>
                )}

                {country.currencies && Object.keys(country.currencies).length > 0 && (
                  <div>
                    <p className="text-sm font-semibold text-gray-600">Currencies</p>
                    <p className="text-lg text-gray-900">
                      {Object.entries(country.currencies)
                        .map(([code, curr]) => `${code} (${curr.symbol})`)
                        .join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
