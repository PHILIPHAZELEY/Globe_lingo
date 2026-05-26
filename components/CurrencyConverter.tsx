'use client'

import { useState } from 'react'

interface ConversionResult {
  amount: number
  fromCurrency: string
  toCurrency: string
  result: number
}

const COMMON_CURRENCIES = [
  'USD',
  'EUR',
  'GBP',
  'JPY',
  'AUD',
  'CAD',
  'CHF',
  'CNY',
  'INR',
  'MXN',
]

export default function CurrencyConverter() {
  const [amount, setAmount] = useState('100')
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')
  const [result, setResult] = useState<ConversionResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
      setError(err instanceof Error ? err.message : 'Failed to convert currency')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <h2 className="section-title">💱 Currency Converter</h2>

      <form onSubmit={handleConvert} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
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

        <button
          type="submit"
          disabled={loading}
          className="button-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
      )}

      {result && (
        <div className="card">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Conversion Result</p>
            <p className="text-4xl font-bold text-blue-600 mb-2">
              {result.result.toFixed(2)}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">{result.amount}</span>{' '}
              <span className="text-gray-600">{result.fromCurrency}</span> = {' '}
              <span className="font-semibold">{result.result.toFixed(2)}</span>{' '}
              <span className="text-gray-600">{result.toCurrency}</span>
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
