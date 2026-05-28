export type DailyStats = {
  date: string
  countries: number
  words: number
  conversions: number
  lastCountry?: string | null
  lastWord?: string | null
  lastConversion?: string | null
}

const STATS_PREFIX = 'gl_stats_'

function todayKey() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function storageKey(date?: string) {
  return STATS_PREFIX + (date || todayKey())
}

export function loadStats(date?: string): DailyStats {
  const key = storageKey(date)
  try {
    const raw = localStorage.getItem(key)
    if (raw) return JSON.parse(raw) as DailyStats
  } catch (e) {
    // ignore
  }

  const base: DailyStats = {
    date: date || todayKey(),
    countries: 0,
    words: 0,
    conversions: 0,
    lastCountry: null,
    lastWord: null,
    lastConversion: null,
  }
  return base
}

export function saveStats(stats: DailyStats) {
  try {
    localStorage.setItem(storageKey(stats.date), JSON.stringify(stats))
  } catch (e) {
    // ignore
  }
}

export function recordCountrySearch(countryName: string) {
  const stats = loadStats()
  stats.countries = (stats.countries || 0) + 1
  stats.lastCountry = countryName
  saveStats(stats)
}

export function recordWordSearch(word: string) {
  const stats = loadStats()
  stats.words = (stats.words || 0) + 1
  stats.lastWord = word
  saveStats(stats)
}

export function recordConversion(from: string, to: string) {
  const stats = loadStats()
  stats.conversions = (stats.conversions || 0) + 1
  stats.lastConversion = `${from}-${to}`
  saveStats(stats)
}

export function getTodayStats(): DailyStats {
  return loadStats()
}
