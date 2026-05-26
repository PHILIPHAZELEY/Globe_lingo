'use client'

import { motion } from 'framer-motion'

interface SkeletonLoaderProps {
  variant?: 'card' | 'list' | 'text'
}

function SkeletonBar({ className }: { className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700 ${className}`}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default function SkeletonLoader({ variant = 'card' }: SkeletonLoaderProps) {
  if (variant === 'text') {
    return (
      <div className="space-y-3 animate-pulse">
        <SkeletonBar className="h-4 w-3/4" />
        <SkeletonBar className="h-4 w-1/2" />
        <SkeletonBar className="h-4 w-5/6" />
      </div>
    )
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
            <SkeletonBar className="h-12 w-12 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <SkeletonBar className="h-4 w-1/3" />
              <SkeletonBar className="h-3 w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="card space-y-6 animate-pulse">
      <div className="space-y-2">
        <SkeletonBar className="h-8 w-32" />
        <SkeletonBar className="h-4 w-48" />
      </div>

      <div className="space-y-4">
        <SkeletonBar className="h-12 w-full" />
        <SkeletonBar className="h-12 w-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SkeletonBar className="h-40 w-full" />
        <div className="space-y-3">
          <SkeletonBar className="h-4 w-full" />
          <SkeletonBar className="h-4 w-5/6" />
          <SkeletonBar className="h-4 w-4/6" />
        </div>
      </div>
    </div>
  )
}
