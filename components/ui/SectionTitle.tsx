'use client'

import { motion } from 'framer-motion'

interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export default function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`space-y-3 ${align === 'center' ? 'text-center' : ''}`}
    >
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle max-w-2xl mx-auto">{subtitle}</p>}
    </motion.div>
  )
}
