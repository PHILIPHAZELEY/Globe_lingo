'use client'

import { motion } from 'framer-motion'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
}

export default function Loader({ size = 'md', text }: LoaderProps) {
  const sizeClass = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4',
  }[size]

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`inline-block rounded-full border-gray-300 dark:border-gray-600 border-t-blue-600 ${sizeClass}`}
      />
      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-600 dark:text-gray-400 text-sm"
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}
