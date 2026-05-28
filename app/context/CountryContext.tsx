'use client'

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

export interface CountryData {
  name: {
    common: string
    official: string
  }
  flags: {
    svg?: string
    png?: string
  }
  cca2?: string
  capital?: string[]
  region?: string
  subregion?: string
  population?: number
  languages?: Record<string, string>
  currencies?: Record<string, { name: string; symbol: string }>
  timezones?: string[]
  borders?: string[]
  latlng?: number[]
  capitalInfo?: { latlng?: number[] }
  maps?: { googleMaps?: string; openStreetMaps?: string }
}

interface CountryContextValue {
  selectedCountry: CountryData | null
  selectedCountryName: string
  loading: boolean
  error: string
  setSelectedCountry: (country: CountryData | null) => void
  searchCountry: (query: string) => Promise<void>
}

const CountryContext = createContext<CountryContextValue | undefined>(undefined)

export function CountryProvider({ children }: { children: React.ReactNode }) {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchCountry = useCallback(async (query: string) => {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}?fields=name,cca2,flags,capital,region,subregion,population,languages,currencies,timezones,borders,latlng,capitalInfo,maps`
      )

      if (!response.ok) {
        throw new Error('Country not found')
      }

      const data = await response.json()
      if (Array.isArray(data) && data.length > 0) {
        setSelectedCountry(data[0])
      } else {
        setError('We could not find that country. Try another search term.')
      }
    } catch (err) {
      setError('We could not find that country. Try another search term.')
      setSelectedCountry(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!selectedCountry) {
      searchCountry('Ghana')
    }
  }, [selectedCountry, searchCountry])

  const value = useMemo(
    () => ({
      selectedCountry,
      selectedCountryName: selectedCountry?.name.common ?? '',
      loading,
      error,
      setSelectedCountry,
      searchCountry,
    }),
    [selectedCountry, loading, error, searchCountry]
  )

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (!context) {
    throw new Error('useCountry must be used within CountryProvider')
  }
  return context
}
