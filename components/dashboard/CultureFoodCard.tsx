'use client'

import React from 'react'

export default function CultureFoodCard({ item }: { item: { name: string; emoji?: string; description?: string } }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center gap-4">
        <div className="text-3xl">{item.emoji || '🍽️'}</div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{item.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
        </div>
      </div>
    </div>
  )
}
