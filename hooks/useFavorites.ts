'use client'

import { useState, useEffect, useCallback } from 'react'

type FavoriteKey = 'favoriteCountries' | 'favoriteWords' | 'favoriteConversions'

export function useFavorites(storageKey: FavoriteKey) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        setFavorites(JSON.parse(saved))
      }
    } catch {
      setFavorites([])
    }
  }, [storageKey])

  const addFavorite = useCallback((item: string) => {
    setFavorites(prev => {
      if (prev.includes(item)) return prev
      const updated = [...prev, item]
      localStorage.setItem(storageKey, JSON.stringify(updated))
      return updated
    })
  }, [storageKey])

  const removeFavorite = useCallback((item: string) => {
    setFavorites(prev => {
      const updated = prev.filter(f => f !== item)
      localStorage.setItem(storageKey, JSON.stringify(updated))
      return updated
    })
  }, [storageKey])

  const toggleFavorite = useCallback((item: string) => {
    setFavorites(prev => {
      const exists = prev.includes(item)
      const updated = exists
        ? prev.filter(f => f !== item)
        : [...prev, item]
      localStorage.setItem(storageKey, JSON.stringify(updated))
      return updated
    })
  }, [storageKey])

  const isFavorite = useCallback((item: string) => {
    return favorites.includes(item)
  }, [favorites])

  const clearAll = useCallback(() => {
    setFavorites([])
    localStorage.removeItem(storageKey)
  }, [storageKey])

  return {
    favorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    clearAll,
    count: favorites.length,
  }
}
