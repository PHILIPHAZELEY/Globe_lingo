'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import { useCountry } from '@/app/context/CountryContext'
import { getCountryLatitude, getCountryLongitude } from '@/lib/countryUtils'

function createBoundingBox(lat: number, lon: number) {
  const delta = 3
  const south = lat - delta
  const north = lat + delta
  const west = lon - delta
  const east = lon + delta
  return { south, north, west, east }
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export default function MapPanel() {
  const { selectedCountry } = useCountry()
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)

  useEffect(() => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      () => undefined,
      { maximumAge: 600000, timeout: 10000 }
    )
  }, [])

  if (!selectedCountry) return null

  const lat = getCountryLatitude(selectedCountry)
  const lon = getCountryLongitude(selectedCountry)
  if (!lat || !lon) {
    return (
      <section id="map" className="space-y-6">
        <div>
          <h2 className="section-title">Map & Orientation</h2>
          <p className="section-subtitle">Location context for the selected country</p>
        </div>
        <Card className="bg-slate-950/80 border-slate-700">
          <p className="text-slate-300">Map coordinates are unavailable for this location.</p>
        </Card>
      </section>
    )
  }

  const bbox = createBoundingBox(lat, lon)
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox.west}%2C${bbox.south}%2C${bbox.east}%2C${bbox.north}&layer=mapnik&marker=${lat}%2C${lon}`
  const distance = userLocation ? calculateDistance(lat, lon, userLocation.lat, userLocation.lon) : null

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="map" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title">Map & Location</h2>
          <p className="section-subtitle">Interactive view for {selectedCountry.name.common}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <Card className="bg-slate-950/80 border-slate-700 p-0 overflow-hidden">
            <iframe
              title="Country location map"
              src={mapSrc}
              className="h-96 w-full border-0"
            />
            <div className="p-4 bg-gradient-to-t from-slate-950/90 to-transparent">
              <p className="text-xs text-slate-400">Click on the map to explore • Zoom and drag to navigate</p>
            </div>
          </Card>
        </motion.div>

        <div className="space-y-4">
          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <Card className="bg-gradient-to-br from-blue-600/20 via-violet-700/20 to-indigo-600/20 border-blue-400/20 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-blue-300/80">Capital coordinates</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {lat.toFixed(2)}° N
                </p>
                <p className="text-2xl font-semibold text-white">
                  {lon.toFixed(2)}° E
                </p>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <Card className="bg-slate-950/80 border-slate-700 p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Capital city</p>
              <p className="mt-2 text-lg font-semibold text-white">
                {selectedCountry.capital?.[0] || 'No capital data'}
              </p>
              <p className="mt-3 text-sm text-slate-300">
                {selectedCountry.region ? `Region: ${selectedCountry.region}` : 'Region unknown'}
              </p>
            </Card>
          </motion.div>

          {userLocation && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <Card className="bg-slate-950/80 border-slate-700 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-blue-300/80">Distance from you</p>
                <p className="mt-2 text-3xl font-bold text-white">
                  {distance ? `${distance.toFixed(0)} km` : '—'}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Your location: {userLocation.lat.toFixed(2)}° N, {userLocation.lon.toFixed(2)}° E
                </p>
              </Card>
            </motion.div>
          )}

          {!userLocation && (
            <motion.div variants={itemVariants} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <Card className="bg-slate-950/80 border-slate-700 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Location services</p>
                <p className="mt-3 text-slate-300">Allow location access to calculate distance from your position</p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
