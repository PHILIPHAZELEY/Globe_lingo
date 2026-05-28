'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface Props {
  title: string
  value: string | number
  icon?: React.ReactNode
  colorClass?: string
}

export default function StatsCard({ title, value, icon, colorClass = 'from-blue-500 to-indigo-600' }: Props) {
  return (
    <motion.div whileHover={{ y: -4 }} className="card">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
        </div>
        <div className={`p-3 rounded-lg bg-gradient-to-br ${colorClass} text-white`}>{icon}</div>
      </div>
    </motion.div>
  )
}
