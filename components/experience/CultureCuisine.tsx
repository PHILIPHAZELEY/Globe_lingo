'use client'

import { useEffect, useMemo, useState } from 'react'
import Card from '@/components/ui/Card'
import Loader from '@/components/ui/Loader'
import { useCountry } from '@/app/context/CountryContext'
import { getFoodsForCountry } from '@/lib/culture'

interface MealItem {
  idMeal: string
  strMeal: string
  strMealThumb: string
  strCategory?: string
  strArea?: string
  strInstructions?: string
  strTags?: string | null
  [key: string]: any
}

function extractIngredients(meal: MealItem) {
  return Object.entries(meal)
    .filter(([key, value]) => key.startsWith('strIngredient') && value)
    .map(([, value]) => value)
    .slice(0, 5)
}

// Generate fallback image URLs based on food type
function getImageUrl(foodName: string, fallback: string = ''): string {
  if (fallback && fallback.includes('unsplash')) {
    return fallback
  }
  
  // Map food names to Unsplash image URLs
  const foodImageMap: Record<string, string> = {
    'Cassava Leaves': 'https://images.unsplash.com/photo-1605521209095-63d94a1cf5ae?auto=format&fit=crop&w=800&q=80',
    'Groundnut Soup': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    'Jollof Rice': 'https://images.unsplash.com/photo-1609080032921-83b7be6cf5a6?auto=format&fit=crop&w=800&q=80',
    'Fufu': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    'Banku': 'https://images.unsplash.com/photo-1609080032921-83b7be6cf5a6?auto=format&fit=crop&w=800&q=80',
    'Waakye': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    'Sushi': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80',
    'Ramen': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80',
    'Tempura': 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?auto=format&fit=crop&w=800&q=80',
    'Biryani': 'https://images.unsplash.com/photo-1609080032921-83b7be6cf5a6?auto=format&fit=crop&w=800&q=80',
    'Paella': 'https://images.unsplash.com/photo-1609080032921-83b7be6cf5a6?auto=format&fit=crop&w=800&q=80',
    'Tacos': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
  }
  
  return foodImageMap[foodName] || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'
}

export default function CultureCuisine() {
  const { selectedCountry } = useCountry()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [meals, setMeals] = useState<MealItem[]>([])

  const areaLabel = useMemo(() => selectedCountry?.name.common ?? 'Global', [selectedCountry])

  useEffect(() => {
    if (!selectedCountry) return

    const countryName = selectedCountry.name.common

    async function loadMeals() {
      setLoading(true)
      setError('')
      setMeals([])

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(countryName)}`
        )
        const data = await response.json()
        const mealsList = Array.isArray(data.meals) ? data.meals.slice(0, 4) : []

        if (mealsList.length === 0) {
          const fallback = getFoodsForCountry(countryName)
          setMeals(fallback.map((item, index) => ({
            idMeal: String(index),
            strMeal: item.name,
            strMealThumb: getImageUrl(item.name),
            strCategory: 'Local Favorite',
            strArea: countryName,
            strInstructions: item.description || 'A signature dish from the local region.',
          })))
          setLoading(false)
          return
        }

        const mealDetails = await Promise.all(
          mealsList.map(async (meal: any) => {
            const detailResponse = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            )
            const detailData = await detailResponse.json()
            return detailData.meals?.[0] ?? meal
          })
        )

        setMeals(mealDetails)
      } catch (err) {
        setError('Unable to fetch local recipes. Try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadMeals()
  }, [selectedCountry])

  if (!selectedCountry) return null

  return (
    <section id="food" className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="section-title">Food & Culture</h2>
          <p className="section-subtitle">Authentic dishes and culinary heritage from {selectedCountry.name.common}</p>
        </div>
      </div>

      {loading ? (
        <Card className="bg-slate-950/80 border-slate-700">
          <Loader text="Loading local cuisine" />
        </Card>
      ) : error ? (
        <Card className="bg-slate-950/80 border-slate-700">
          <p className="text-red-300">{error}</p>
        </Card>
      ) : (
        <div className="grid gap-6 xl:grid-cols-2">
          {meals.map((meal) => (
            <Card key={meal.idMeal} className="bg-slate-950/80 border-slate-700 p-0 overflow-hidden">
              <div className="group relative overflow-hidden rounded-3xl h-96">
                <img
                  src={getImageUrl(meal.strMeal, meal.strMealThumb)}
                  alt={meal.strMeal}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  onError={(e: any) => { e.target.src = getImageUrl(meal.strMeal) }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent flex flex-col justify-end p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{meal.strCategory ?? 'Specialty'}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">{meal.strMeal}</h3>
                  <p className="mt-2 text-sm text-slate-300 line-clamp-2">
                    {meal.strInstructions ?? 'Discover the local flavors and signature textures.'}
                  </p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 text-sm">
                    <div className="rounded-2xl bg-white/5 p-3">
                      <p className="font-semibold text-slate-100 text-xs">REGION</p>
                      <p className="text-slate-300 mt-1 text-sm">{meal.strArea ?? areaLabel}</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <p className="font-semibold text-slate-100 text-xs">INGREDIENTS</p>
                      <p className="text-slate-300 mt-1 text-sm line-clamp-2">{extractIngredients(meal).join(', ') || "Chef's choice"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  )
}
