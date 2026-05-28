'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Loader from '@/components/ui/Loader'
import { useCountry } from '@/app/context/CountryContext'
import { getCountryLatitude, getCountryLongitude } from '@/lib/countryUtils'

const weatherCodes: Record<number, { label: string; emoji: string }> = {
  0: { label: 'Clear sky', emoji: '☀️' },
  1: { label: 'Mainly clear', emoji: '🌤️' },
  2: { label: 'Partly cloudy', emoji: '⛅' },
  3: { label: 'Overcast', emoji: '☁️' },
  45: { label: 'Fog', emoji: '🌫️' },
  48: { label: 'Depositing rime fog', emoji: '🌫️' },
  51: { label: 'Drizzle', emoji: '🌦️' },
  53: { label: 'Moderate drizzle', emoji: '🌦️' },
  55: { label: 'Dense drizzle', emoji: '🌧️' },
  61: { label: 'Rain', emoji: '🌧️' },
  63: { label: 'Heavy rain', emoji: '⛈️' },
  65: { label: 'Storm rain', emoji: '⛈️' },
  71: { label: 'Snow', emoji: '❄️' },
  73: { label: 'Heavy snow', emoji: '❄️' },
  80: { label: 'Rain showers', emoji: '🌧️' },
  81: { label: 'Strong rain showers', emoji: '⛈️' },
  95: { label: 'Thunderstorm', emoji: '⚡' },
  96: { label: 'Hail shower', emoji: '🌨️' },
}

interface DailyForecast {
  date: string
  max: number
  min: number
  weathercode: number
}

export default function WeatherSection() {
  const { selectedCountry } = useCountry()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [currentWeather, setCurrentWeather] = useState<{
    temperature: number
    windspeed: number
    humidity?: number
    weathercode: number
  } | null>(null)
  const [forecast, setForecast] = useState<DailyForecast[]>([])

  const location = useMemo(() => {
    if (!selectedCountry) return null
    const lat = getCountryLatitude(selectedCountry)
    const lon = getCountryLongitude(selectedCountry)
    if (!lat || !lon) return null
    return { lat, lon }
  }, [selectedCountry])

  useEffect(() => {
    if (!location) return

    const { lat, lon } = location

    async function loadWeather() {
      setLoading(true)
      setError('')
      setCurrentWeather(null)
      setForecast([])

      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error('Weather unavailable')
        }
        const data = await response.json()
        const current = data.current_weather
        const humidityIndex = data.hourly?.time?.findIndex((timestamp: string) => timestamp === data.current_weather.time)
        const humidity = humidityIndex >= 0 ? data.hourly.relativehumidity_2m[humidityIndex] : data.hourly.relativehumidity_2m?.[0]

        setCurrentWeather({
          temperature: current.temperature,
          windspeed: current.windspeed,
          humidity: Number(humidity) || undefined,
          weathercode: current.weathercode,
        })

        const daily: DailyForecast[] = data.daily.time.map((date: string, index: number) => ({
          date,
          max: data.daily.temperature_2m_max[index],
          min: data.daily.temperature_2m_min[index],
          weathercode: data.daily.weathercode[index],
        }))

        setForecast(daily.slice(0, 7))
      } catch (err) {
        setError('Unable to load weather details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadWeather()
  }, [location])

  if (!selectedCountry) return null

  const weatherLabel = weatherCodes[currentWeather?.weathercode ?? 0] ?? { label: 'Weather', emoji: '🌤️' }

  return (
    <section id="weather" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title">Weather Intelligence</h2>
          <p className="section-subtitle">Live conditions for {selectedCountry.capital?.[0] ?? selectedCountry.name.common}</p>
        </div>
      </div>

      {loading ? (
        <Card className="bg-slate-950/80 border-slate-700">
          <Loader text="Fetching weather" />
        </Card>
      ) : error ? (
        <Card className="bg-slate-950/80 border-slate-700">
          <p className="text-red-400">{error}</p>
        </Card>
      ) : currentWeather ? (
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="bg-slate-950/80 border-slate-700 p-6 space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="uppercase tracking-[0.2em] text-xs text-blue-300/80">Live weather</p>
                <h3 className="mt-2 text-4xl font-bold text-white flex items-center gap-3">
                  {weatherLabel.emoji}
                  {currentWeather.temperature.toFixed(0)}°C
                </h3>
                <p className="text-sm text-slate-400">{weatherLabel.label}</p>
              </div>
              <div className="rounded-3xl bg-white/10 px-5 py-4 text-right backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Location</p>
                <p className="mt-2 text-lg font-semibold text-white">{selectedCountry.capital?.[0] ?? selectedCountry.name.common}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-slate-300">
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Humidity</p>
                <p className="mt-2 text-2xl font-semibold text-white">{currentWeather.humidity ?? '--'}%</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Wind</p>
                <p className="mt-2 text-2xl font-semibold text-white">{currentWeather.windspeed.toFixed(0)} km/h</p>
              </div>
              <div className="rounded-3xl bg-white/5 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Timezone</p>
                <p className="mt-2 text-2xl font-semibold text-white">{selectedCountry.timezones?.[0] ?? 'UTC'}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-950/80 border-slate-700 p-6">
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
            >
              {forecast.map((day) => {
                const forecastLabel = weatherCodes[day.weathercode] ?? { label: 'Clear', emoji: '☀️' }
                const date = new Date(day.date)
                const weekday = date.toLocaleDateString(undefined, { weekday: 'short' })
                return (
                  <motion.div
                    key={day.date}
                    className="flex-1 min-w-[110px] rounded-3xl bg-white/5 p-4 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">{weekday}</p>
                    <div className="mt-3 text-3xl">{forecastLabel.emoji}</div>
                    <p className="mt-2 text-white font-semibold text-sm">{forecastLabel.label}</p>
                    <p className="mt-3 text-xs text-slate-300">High {day.max.toFixed(0)}° / Low {day.min.toFixed(0)}°</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </Card>
        </div>
      ) : null}
    </section>
  )
}
