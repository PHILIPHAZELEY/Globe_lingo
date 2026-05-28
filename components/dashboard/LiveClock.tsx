'use client'

import { useEffect, useMemo, useState } from 'react'
import { useCountry } from '@/app/context/CountryContext'

function parseUTCOffset(tz: string) {
  const m = tz.match(/UTC([+-])(\d{2}):(\d{2})/)
  if (!m) return null
  const sign = m[1] === '+' ? 1 : -1
  const hours = parseInt(m[2], 10)
  const mins = parseInt(m[3], 10)
  return sign * (hours * 60 + mins)
}

export default function LiveClock({ label }: { label?: string }) {
  const { selectedCountry } = useCountry()
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const timezone = selectedCountry?.timezones?.[0]

  const display = useMemo(() => {
    if (!timezone) {
      return now.toLocaleTimeString()
    }

    try {
      if (timezone.includes('/')) {
        return new Intl.DateTimeFormat(undefined, {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now)
      }

      const offset = parseUTCOffset(timezone)
      if (offset === null) {
        return now.toLocaleTimeString()
      }

      const utc = now.getTime() + now.getTimezoneOffset() * 60000
      const local = new Date(utc + offset * 60000)
      return local.toTimeString().slice(0, 8)
    } catch {
      return now.toLocaleTimeString()
    }
  }, [now, timezone])

  if (!timezone) return null

  const hour = parseInt(display.slice(0, 2), 10)
  const isDay = hour >= 6 && hour < 18
  const phase = isDay ? 'Day' : 'Night'
  const icon = isDay ? '☀️' : '🌙'

  return (
    <div className="card bg-slate-950/90 border-slate-700 p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label || 'Local time'}</p>
            <p className="mt-3 text-4xl font-semibold text-white">{display}</p>
          </div>
          <div className="rounded-3xl bg-white/10 px-4 py-3 text-right text-slate-300">
            <p className="text-sm">{icon}</p>
            <p className="mt-1 text-sm font-semibold">{phase}</p>
          </div>
        </div>
        <p className="text-sm text-slate-400">Timezone: {timezone}</p>
      </div>
    </div>
  )
}
