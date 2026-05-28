import { CountryData } from '@/app/context/CountryContext'

export function getCountryLatitude(country?: CountryData) {
  if (!country) return 0
  return country.capitalInfo?.latlng?.[0] ?? country.latlng?.[0] ?? 0
}

export function getCountryLongitude(country?: CountryData) {
  if (!country) return 0
  return country.capitalInfo?.latlng?.[1] ?? country.latlng?.[1] ?? 0
}

export function getPrimaryCurrencyCode(country?: CountryData) {
  if (!country || !country.currencies) return 'USD'
  return Object.keys(country.currencies)[0]
}

export function getCurrencyLabel(country?: CountryData) {
  if (!country || !country.currencies) return 'USD'
  return Object.entries(country.currencies)
    .map(([code, value]) => `${code} · ${value.name}`)
    .join(', ')
}

export function getCurrencySymbol(country?: CountryData) {
  if (!country || !country.currencies) return '$'
  const primaryCode = Object.keys(country.currencies)[0]
  return country.currencies[primaryCode]?.symbol ?? '$'
}

export function formatPopulation(population?: number) {
  if (!population) return '—'
  if (population > 1_000_000_000) return `${(population / 1_000_000_000).toFixed(1)}B`
  if (population > 1_000_000) return `${(population / 1_000_000).toFixed(1)}M`
  if (population > 1_000) return `${(population / 1_000).toFixed(1)}K`
  return population.toString()
}

export function getLanguageSummary(country?: CountryData) {
  if (!country || !country.languages) return 'No language data available.'
  const values = Object.values(country.languages)
  return values.length > 1 ? values.join(', ') : values[0]
}

export function getLanguageDetails(country?: CountryData) {
  if (!country || !country.languages) return []
  return Object.entries(country.languages).map(([code, name]) => ({ code, name }))
}

// Enhanced language intelligence to distinguish official vs. local
export function getLanguageIntelligence(country?: CountryData) {
  if (!country || !country.languages) {
    return { official: [], local: [] }
  }

  const langEntries = Object.entries(country.languages)
  
  // Common official languages by country
  const OFFICIAL_LANGUAGES_MAP: Record<string, string[]> = {
    'Sierra Leone': ['English'],
    'Ghana': ['English'],
    'Nigeria': ['English'],
    'Kenya': ['English', 'Swahili'],
    'South Africa': ['English', 'Zulu', 'Xhosa', 'Afrikaans'],
    'Japan': ['Japanese'],
    'South Korea': ['Korean'],
    'China': ['Chinese'],
    'India': ['Hindi', 'English'],
    'Brazil': ['Portuguese'],
    'Mexico': ['Spanish'],
    'France': ['French'],
    'Germany': ['German'],
    'Spain': ['Spanish'],
    'Italy': ['Italian'],
    'Russia': ['Russian'],
    'United States': ['English'],
    'Canada': ['English', 'French'],
    'Australia': ['English'],
  }

  const countryName = country.name.common
  const officialLangList = OFFICIAL_LANGUAGES_MAP[countryName] || []
  
  const official = langEntries.filter(([_, name]) => officialLangList.includes(name)).map(([code, name]) => ({ code, name }))
  const local = langEntries.filter(([_, name]) => !officialLangList.includes(name)).map(([code, name]) => ({ code, name }))
  
  // If no official languages matched, assume first language is official
  if (official.length === 0 && langEntries.length > 0) {
    return {
      official: [{ code: langEntries[0][0], name: langEntries[0][1] }],
      local: langEntries.slice(1).map(([code, name]) => ({ code, name }))
    }
  }

  return { official, local }
}

export function getCountryLocaleLabel(country?: CountryData) {
  if (!country) return 'Global Intelligence'
  return country.region ? `${country.region} • ${country.subregion ?? 'Global'}` : 'Global Intelligence'
}

