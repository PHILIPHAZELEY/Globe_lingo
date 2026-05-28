'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'
import { useCountry } from '@/app/context/CountryContext'
import { getLanguageIntelligence } from '@/lib/countryUtils'

interface TranslationResult {
  original: string
  translated: string
  sourceLang: string
  targetLang: string
}

const SUPPORTED_LANGUAGES: Record<string, { code: string; name: string; flag: string }> = {
  'en': { code: 'en', name: 'English', flag: '🇬🇧' },
  'es': { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  'fr': { code: 'fr', name: 'French', flag: '🇫🇷' },
  'de': { code: 'de', name: 'German', flag: '🇩🇪' },
  'it': { code: 'it', name: 'Italian', flag: '🇮🇹' },
  'pt': { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  'ja': { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  'zh': { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  'ko': { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  'ru': { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  'ar': { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  'hi': { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  'bn': { code: 'bn', name: 'Bengali', flag: '🇧🇩' },
  'th': { code: 'th', name: 'Thai', flag: '🇹🇭' },
  'vi': { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
  'id': { code: 'id', name: 'Indonesian', flag: '🇮🇩' },
  'pl': { code: 'pl', name: 'Polish', flag: '🇵🇱' },
  'tr': { code: 'tr', name: 'Turkish', flag: '🇹🇷' },
  'el': { code: 'el', name: 'Greek', flag: '🇬🇷' },
  'sw': { code: 'sw', name: 'Swahili', flag: '🇹🇿' },
}

const LANGUAGE_CODE_MAP: Record<string, string> = {
  'English': 'en',
  'Spanish': 'es',
  'French': 'fr',
  'German': 'de',
  'Italian': 'it',
  'Portuguese': 'pt',
  'Japanese': 'ja',
  'Chinese': 'zh',
  'Korean': 'ko',
  'Russian': 'ru',
  'Arabic': 'ar',
  'Hindi': 'hi',
  'Bengali': 'bn',
  'Thai': 'th',
  'Vietnamese': 'vi',
  'Indonesian': 'id',
  'Polish': 'pl',
  'Turkish': 'tr',
  'Greek': 'el',
  'Swahili': 'sw',
}

export default function LanguageTranslator() {
  const { selectedCountry } = useCountry()
  const [sourceText, setSourceText] = useState('')
  const [sourceLang, setSourceLang] = useState('en')
  const [targetLang, setTargetLang] = useState('es')
  const [result, setResult] = useState<TranslationResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Auto-detect country's primary language
  const countryPrimaryLang = useMemo(() => {
    if (!selectedCountry) return 'en'
    const { official } = getLanguageIntelligence(selectedCountry)
    if (official.length > 0) {
      const langName = official[0].name
      return LANGUAGE_CODE_MAP[langName] || 'en'
    }
    return 'en'
  }, [selectedCountry])

  useEffect(() => {
    setSourceLang('en')
    setTargetLang(countryPrimaryLang === 'en' ? 'es' : countryPrimaryLang)
  }, [countryPrimaryLang])

  const handleTranslate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!sourceText.trim()) {
      setError('Please enter text to translate')
      return
    }

    if (sourceLang === targetLang) {
      setError('Please select different source and target languages')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Using MyMemory Translation API (free, no key required)
      const encodedText = encodeURIComponent(sourceText.trim())
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`
      )

      if (!response.ok) {
        throw new Error('Translation API failed')
      }

      const data = await response.json()

      if (data.responseStatus === 200 && data.responseData.translatedText) {
        setResult({
          original: sourceText,
          translated: data.responseData.translatedText,
          sourceLang,
          targetLang,
        })
      } else {
        setError('Translation could not be completed. Please try different languages.')
      }
    } catch (err) {
      setError('Translation service is temporarily unavailable. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div>
        <h2 className="section-title">🌐 Global Translator</h2>
        <p className="section-subtitle">Translate between {Object.keys(SUPPORTED_LANGUAGES).length}+ major world languages instantly</p>
      </div>

      {selectedCountry && (
        <div className="rounded-3xl border border-slate-700 bg-gradient-to-r from-slate-900/80 to-slate-950/80 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Context</p>
          <p className="mt-2 text-sm text-slate-200">
            📍 {selectedCountry.name.common} context detected
            {countryPrimaryLang !== 'en' && ` • Default target: ${SUPPORTED_LANGUAGES[countryPrimaryLang]?.name}`}
          </p>
        </div>
      )}

      <form onSubmit={handleTranslate} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">From</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="input-field"
            >
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-300 mb-2">To</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="input-field"
            >
              {Object.entries(SUPPORTED_LANGUAGES).map(([code, lang]) => (
                <option key={code} value={code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">Text to translate</label>
          <textarea
            placeholder="Enter text here..."
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            className="input-field min-h-24 resize-none"
          />
        </div>

        <div className="flex gap-3 flex-col md:flex-row">
          <Button type="submit" fullWidth disabled={loading} className="flex-1">
            {loading ? <Loader size="sm" /> : 'Translate'}
          </Button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={swapLanguages}
            className="button-secondary md:px-4"
            title="Swap languages"
          >
            ⇄
          </motion.button>
        </div>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-red-500/10 border border-red-400/20 rounded-xl text-red-200"
        >
          {error}
        </motion.div>
      )}

      {result && !loading && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="space-y-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                  {SUPPORTED_LANGUAGES[sourceLang]?.flag} {SUPPORTED_LANGUAGES[sourceLang]?.name}
                </p>
                <div className="rounded-3xl bg-white/5 p-4 border border-slate-700">
                  <p className="text-slate-200">{result.original}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl"
                >
                  ⬇️
                </motion.div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 mb-2">
                  {SUPPORTED_LANGUAGES[targetLang]?.flag} {SUPPORTED_LANGUAGES[targetLang]?.name}
                </p>
                <div className="rounded-3xl bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-4 border border-blue-400/30">
                  <p className="text-slate-100 text-lg font-semibold">{result.translated}</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
