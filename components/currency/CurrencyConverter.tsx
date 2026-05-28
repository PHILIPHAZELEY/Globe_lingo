'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Loader from '@/components/ui/Loader'
import { useFavorites } from '@/hooks/useFavorites'
import { useCountry } from '@/app/context/CountryContext'
import { getCurrencyLabel, getPrimaryCurrencyCode, getCurrencySymbol } from '@/lib/countryUtils'

interface ConversionResult {
  amount: number
  fromCurrency: string
  toCurrency: string
  result: number
}

const COMMON_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY', 'INR', 'MXN',
  'SGD', 'HKD', 'NZD', 'SEK', 'NOK', 'KRW', 'THB', 'MYR', 'PHP', 'IDR',
]

export default function CurrencyConverter() {
  const { selectedCountry } = useCountry()
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites('favoriteConversions')

  const localCurrency = useMemo(
    () => (selectedCountry ? getPrimaryCurrencyCode(selectedCountry) : 'EUR'),
    [selectedCountry]
  )

  useEffect(() => {
    if (!selectedCountry) return
    // Auto-set fromCurrency to the selected country's currency
    setFromCurrency(localCurrency)
    // Set toCurrency to USD if not already different from fromCurrency
    setToCurrency(localCurrency === 'USD' ? 'EUR' : 'USD')
  }, [selectedCountry, localCurrency])

  const conversionKey = result ? `${result.fromCurrency}-${result.toCurrency}` : ''

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || parseFloat(amount) <= 0) {
      setError('Please enter a valid amount')
      return
    }

    if (fromCurrency === toCurrency) {
      setError('Please select different currencies')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch(
        `/api/convert?amount=${parseFloat(amount)}&from=${fromCurrency}&to=${toCurrency}`
      )

      if (!response.ok) {
        throw new Error('Conversion failed')
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      if (data.rates && data.rates[toCurrency]) {
        setResult({
          amount: parseFloat(amount),
          fromCurrency,
          toCurrency,
          result: data.rates[toCurrency],
        })
      } else {
        setError('Currency conversion not available')
      }
    } catch (err) {
      setError('Unable to convert. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const swapCurrencies = () => {
    const temp = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(temp)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="space-y-6"
    >
      <div>
        <h2 className="section-title">Currency Converter</h2>
        <p className="section-subtitle">Convert with live exchange rates for the selected country</p>
      </div>

      <div className="grid gap-4">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600/20 via-violet-700/20 to-indigo-600/20 border border-blue-400/20 p-6 text-slate-300">
          <div className="flex items-center gap-4">
            {selectedCountry?.flags?.svg && (
              <img 
                src={selectedCountry.flags.svg} 
                alt={selectedCountry.name.common} 
                className="w-12 h-8 rounded-lg object-cover"
              />
            )}
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Local currency</p>
              <p className="mt-1 text-2xl font-semibold text-white">
                {getCurrencySymbol(selectedCountry ?? undefined)} {localCurrency}
              </p>
              <p className="mt-1 text-sm text-slate-300">{selectedCountry ? getCurrencyLabel(selectedCountry) : 'Select a country to preview the local currency.'}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleConvert} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Amount</label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="100"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">From</label>
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="input-field"
              >
                {COMMON_CURRENCIES.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">To</label>
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="input-field"
              >
                {COMMON_CURRENCIES.map((curr) => (
                  <option key={curr} value={curr}>
                    {curr}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 flex-col md:flex-row">
            <Button type="submit" fullWidth disabled={loading} className="flex-1">
              {loading ? <Loader size="sm" /> : 'Convert'}
            </Button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={swapCurrencies}
              className="button-secondary md:px-4"
              title="Swap currencies"
            >
              ↔
            </motion.button>
          </div>
        </form>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-400/20 rounded-xl text-red-200"
        >
          {error}
        </motion.div>
      )}

      {loading && <SkeletonLoader />}

      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">Conversion result</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFavorite(conversionKey)}
                  className="text-2xl"
                  title={isFavorite(conversionKey) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(conversionKey) ? '★' : '☆'}
                </motion.button>
              </div>

              <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
                <p className="text-sm opacity-90 mb-2">You receive</p>
                <p className="text-5xl md:text-6xl font-bold mb-2">{result.result.toFixed(2)}</p>
                <p className="text-lg opacity-90">{result.toCurrency}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">From</p>
                  <p className="mt-2 text-2xl font-bold text-white">{result.amount.toFixed(2)}</p>
                  <p className="text-sm text-slate-400">{result.fromCurrency}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Exchange Rate</p>
                  <p className="mt-2 text-2xl font-bold text-white">{(result.result / result.amount).toFixed(4)}</p>
                  <p className="text-sm text-slate-400">1 {result.fromCurrency}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
