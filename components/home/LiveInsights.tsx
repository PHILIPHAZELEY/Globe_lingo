'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'

interface LiveGlobeData {
  time: string
  date: string
  weather: string
  weatherEmoji: string
}

const cities = [
  { name: 'London', flag: '🇬🇧', lat: 51.5, lon: -0.12, tz: 'Europe/London' },
  { name: 'Tokyo', flag: '🇯🇵', lat: 35.68, lon: 139.76, tz: 'Asia/Tokyo' },
  { name: 'New York', flag: '🇺🇸', lat: 40.71, lon: -74.01, tz: 'America/New_York' },
  { name: 'Dubai', flag: '🇦🇪', lat: 25.20, lon: 55.27, tz: 'Asia/Dubai' },
  { name: 'Sydney', flag: '🇦🇺', lat: -33.87, lon: 151.21, tz: 'Australia/Sydney' },
  { name: 'Cairo', flag: '🇪🇬', lat: 30.04, lon: 31.24, tz: 'Africa/Cairo' },
]

const weatherCodes: Record<number, string> = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️', 45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️', 61: '🌧️', 63: '🌧️', 65: '⛈️',
  71: '❄️', 73: '❄️', 75: '❄️', 80: '🌧️', 81: '🌧️', 82: '⛈️',
  95: '⛈️', 96: '🌨️', 99: '🌨️',
}

export default function LiveInsights() {
  const [cityData, setCityData] = useState<Record<string, LiveGlobeData>>({})
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    cities.forEach((city) => {
      const tzTime = new Intl.DateTimeFormat(undefined, {
        timeZone: city.tz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(now)

      const tzDate = new Intl.DateTimeFormat(undefined, {
        timeZone: city.tz,
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }).format(now)

      setCityData(prev => ({
        ...prev,
        [city.name]: {
          time: tzTime,
          date: tzDate,
          weather: '—',
          weatherEmoji: '🌤️',
        },
      }))
    })
  }, [now])

  useEffect(() => {
    cities.forEach((city) => {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true&forecast_days=1`
      )
        .then(r => r.json())
        .then(data => {
          const code: number = data.current_weather?.weathercode
          setCityData(prev => ({
            ...prev,
            [city.name]: {
              ...prev[city.name],
              weather: `${data.current_weather?.temperature ?? '—'}°C`,
              weatherEmoji: weatherCodes[code] || '🌤️',
            },
          }))
        })
        .catch(() => undefined)
    })
  }, [])

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Live Global Insights"
          subtitle="Real-time weather, local times, and global data from cities around the world."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {cities.map((city, i) => {
            const data = cityData[city.name]
            return (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-3xl border border-slate-700/50 bg-slate-900/50 p-6 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{city.flag}</span>
                    <div>
                      <h3 className="font-semibold text-white">{city.name}</h3>
                      <p className="text-xs text-slate-500">{data?.date ?? '...'}</p>
                    </div>
                  </div>
                  <span className="text-3xl">{data?.weatherEmoji ?? '🌍'}</span>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-3xl font-bold text-white tabular-nums">
                      {data?.time ?? '--:--'}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">{city.tz.split('/')[1]}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold text-white">
                      {data?.weather ?? '—'}
                    </p>
                    <p className="text-xs text-slate-500">Current</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
