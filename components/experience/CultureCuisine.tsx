'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import Card from '@/components/ui/Card'
import Loader from '@/components/ui/Loader'
import { useCountry } from '@/app/context/CountryContext'
import { FoodItem, getFoodsForCountry } from '@/lib/culture'

export default function CultureCuisine() {
  const { selectedCountry } = useCountry()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [foods, setFoods] = useState<FoodItem[]>([])

  const countryName = selectedCountry?.name.common ?? ''
  const areaLabel = useMemo(() => countryName || 'Global', [countryName])

  useEffect(() => {
    if (!selectedCountry) {
      setFoods([])
      setLoading(false)
      setError('')
      return
    }

    setLoading(true)
    setError('')

    const curated = getFoodsForCountry(countryName)

    if (curated.length > 0) {
      setFoods(curated.slice(0, 4))
    } else {
      setFoods([])
      setError('No curated local dishes found for this country yet. Please select another region.')
    }

    setLoading(false)
  }, [selectedCountry, countryName])

  if (!selectedCountry) return null

  return (
    <motion.section
      id="food"
      className="space-y-6"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title">Food & Culture</h2>
          <p className="section-subtitle">Authentic dishes and culinary heritage from {countryName}</p>
        </div>
        <div className="rounded-3xl border border-slate-700 bg-slate-950/80 px-5 py-4 text-slate-300">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Curated cuisine</p>
          <p className="mt-2 font-semibold text-white">Regionally accurate local recipes</p>
        </div>
      </div>

      {loading ? (
        <Card className="bg-slate-950/80 border-slate-700 p-6">
          <Loader text="Loading local food intelligence" />
        </Card>
      ) : error ? (
        <Card className="bg-slate-950/80 border-slate-700 p-6">
          <p className="text-red-300">{error}</p>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {foods.map((food) => (
            <Card key={food.name} className="overflow-hidden bg-slate-950/80 border-slate-700">
              <motion.div whileHover={{ y: -4 }} className="group overflow-hidden rounded-[2rem] bg-slate-950/60 shadow-2xl shadow-slate-950/30">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{food.region ?? areaLabel}</p>
                    <h3 className="mt-2 text-3xl font-semibold">{food.name}</h3>
                    <p className="mt-2 text-sm text-slate-300 line-clamp-2">{food.description}</p>
                  </div>
                </div>

                <div className="space-y-4 p-6">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Ingredients</p>
                      <p className="mt-2 text-sm text-slate-200">{food.ingredients?.join(', ') ?? 'Locally sourced ingredients'}</p>
                    </div>
                    <div className="rounded-3xl bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Preparation</p>
                      <p className="mt-2 text-sm text-slate-200">{food.prepTime ?? 'Traditional cooking style'}</p>
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Instructions</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{food.instructions ?? 'Follow local seasoning and cooking techniques to preserve flavor.'}</p>
                  </div>
                </div>
              </motion.div>
            </Card>
          ))}
        </div>
      )}
    </motion.section>
  )
}
