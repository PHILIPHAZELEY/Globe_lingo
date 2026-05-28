'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Loader from '@/components/ui/Loader'
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

interface POI {
  id: number
  name: string
  type: string
  lat: number
  lon: number
  distance?: number
}

const POI_TYPES = [
  { value: 'restaurant', label: '🍽️ Restaurants', icon: '🍽️' },
  { value: 'hotel', label: '🏨 Hotels', icon: '🏨' },
  { value: 'attraction', label: '🎢 Attractions', icon: '🎢' },
  { value: 'museum', label: '🏛️ Museums', icon: '🏛️' },
  { value: 'beach', label: '🏖️ Beaches', icon: '🏖️' },
  { value: 'park', label: '🌳 Parks', icon: '🌳' },
  { value: 'shopping', label: '🛍️ Shopping', icon: '🛍️' },
  { value: 'landmark', label: '🗼 Landmarks', icon: '🗼' },
]

export default function MapPanel() {
  const { selectedCountry } = useCountry()
  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [selectedPOIType, setSelectedPOIType] = useState('restaurant')
  const [pois, setPois] = useState<POI[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  const searchPOIs = async () => {
    if (!selectedCountry) return

    setLoading(true)
    setError('')
    setPois([])

    try {
      const lat = getCountryLatitude(selectedCountry)
      const lon = getCountryLongitude(selectedCountry)
      if (!lat || !lon) throw new Error('Country coordinates not found')

      // Using Overpass API to search for nearby POIs
      const poiTagMap: Record<string, string> = {
        restaurant: 'amenity=restaurant',
        hotel: 'tourism=hotel',
        attraction: 'tourism=attraction',
        museum: 'tourism=museum',
        beach: 'natural=beach',
        park: 'leisure=park',
        shopping: 'shop~.*',
        landmark: 'historic=monument',
      }

      const bbox = createBoundingBox(lat, lon)
      const query = `
        [bbox:${bbox.south},${bbox.west},${bbox.north},${bbox.east}];
        (node[${poiTagMap[selectedPOIType]}];way[${poiTagMap[selectedPOIType]}];);
        out geom;
      `

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      })

      if (!response.ok) throw new Error('POI search failed')

      const data = await response.json()
      const results: POI[] = []

      data.elements.forEach((element: any) => {
        const name = element.tags?.name || `${selectedPOIType.charAt(0).toUpperCase() + selectedPOIType.slice(1)}`
        const elemLat = element.lat || (element.center?.lat)
        const elemLon = element.lon || (element.center?.lon)

        if (name && elemLat && elemLon) {
          const distance = userLocation ? calculateDistance(lat, lon, elemLat, elemLon) : undefined
          results.push({
            id: element.id,
            name,
            type: selectedPOIType,
            lat: elemLat,
            lon: elemLon,
            distance,
          })
        }
      })

      // Sort by distance if user location available
      if (userLocation) {
        results.sort((a, b) => (a.distance || 0) - (b.distance || 0))
      }

      setPois(results.slice(0, 15)) // Show top 15 results
    } catch (err) {
      setError('Unable to search for nearby locations. Please try another POI type.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (selectedCountry) {
      searchPOIs()
    }
  }, [selectedCountry, selectedPOIType])

  if (!selectedCountry) return null

  const lat = getCountryLatitude(selectedCountry)
  const lon = getCountryLongitude(selectedCountry)
  if (!lat || !lon) {
    return (
      <section id="map" className="space-y-6">
        <div>
          <h2 className="section-title">🗺️ Map & Exploration</h2>
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
      <div>
        <h2 className="section-title">🗺️ Map & Exploration</h2>
        <p className="section-subtitle">Interactive exploration and POI discovery for {selectedCountry.name.common}</p>
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
              <p className="text-xs text-slate-400">Click on the map to explore • Zoom and drag to navigate • {pois.length} {selectedPOIType}(s) nearby</p>
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
                  Your position: {userLocation.lat.toFixed(2)}° N, {userLocation.lon.toFixed(2)}° E
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

      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-4">
        <Card className="bg-slate-950/80 border-slate-700 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔍 Nearby Points of Interest</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {POI_TYPES.map((type) => (
              <motion.button
                key={type.value}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPOIType(type.value)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  selectedPOIType === type.value
                    ? 'bg-blue-600 text-white border border-blue-400'
                    : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700'
                }`}
              >
                {type.icon} <span className="hidden sm:inline">{type.value}</span>
              </motion.button>
            ))}
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-400/20 rounded-lg text-red-200 mb-4">
              {error}
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-8">
              <Loader size="md" />
            </div>
          )}

          {!loading && pois.length > 0 && (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {pois.map((poi) => (
                <motion.div
                  key={poi.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg hover:border-blue-400/50 transition-all"
                >
                  <p className="font-semibold text-white text-sm">{poi.name}</p>
                  <div className="flex justify-between items-start mt-2">
                    <p className="text-xs text-slate-400">
                      📍 {poi.lat.toFixed(2)}°, {poi.lon.toFixed(2)}°
                    </p>
                    {poi.distance && (
                      <p className="text-xs text-blue-300 font-medium">{poi.distance.toFixed(1)} km away</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && pois.length === 0 && !error && (
            <div className="text-center py-8">
              <p className="text-slate-400">No {selectedPOIType}s found in this area. Try another category.</p>
            </div>
          )}
        </Card>
      </motion.div>
    </section>
  )
}
