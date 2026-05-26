'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import SkeletonLoader from '@/components/ui/SkeletonLoader'
import Loader from '@/components/ui/Loader'
import { useFavorites } from '@/hooks/useFavorites'

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
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { isFavorite, toggleFavorite } = useFavorites('favoriteConversions')

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
        <h2 className="section-title">\uD83D\uDCB1 Currency Converter</h2>
        <p className="section-subtitle">Convert between currencies with live exchange rates</p>
      </div>

      <form onSubmit={handleConvert} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Amount
            </label>
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
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              From
            </label>
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
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              To
            </label>
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

        <div className="flex gap-3 md:flex-row flex-col">
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
            \u21C4
          </motion.button>
        </div>
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

      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Conversion Result
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleFavorite(conversionKey)}
                  className="text-2xl"
                  title={isFavorite(conversionKey) ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite(conversionKey) ? '\u2B50' : '\u2606'}
                </motion.button>
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-8 text-white text-center">
                <p className="text-sm opacity-90 mb-2">You get</p>
                <p className="text-5xl md:text-6xl font-bold mb-2">
                  {result.result.toFixed(2)}
                </p>
                <p className="text-lg opacity-90">{result.toCurrency}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    From
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {result.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {result.fromCurrency}
                  </p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    Exchange Rate
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {(result.result / result.amount).toFixed(4)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    1 {result.fromCurrency}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
