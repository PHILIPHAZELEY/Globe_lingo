'use client'

import { motion } from 'framer-motion'
import SectionTitle from '@/components/ui/SectionTitle'

const features = [
  {
    icon: '🌍',
    title: 'Country Explorer',
    description: 'Deep-dive into 140+ countries with flags, capitals, populations, regions, and official data.',
    gradient: 'from-blue-600/20 to-indigo-600/20',
    border: 'border-blue-400/20',
  },
  {
    icon: '☀️',
    title: 'Live Weather',
    description: 'Real-time weather conditions and 7-day forecasts for any country\'s capital city.',
    gradient: 'from-amber-600/20 to-orange-600/20',
    border: 'border-amber-400/20',
  },
  {
    icon: '💱',
    title: 'Currency Converter',
    description: 'Convert between 70+ currencies with live exchange rates powered by Frankfurter API.',
    gradient: 'from-green-600/20 to-emerald-600/20',
    border: 'border-green-400/20',
  },
  {
    icon: '🗣️',
    title: 'Language Insights',
    description: 'Explore official and local languages with dictionary lookups and pronunciation guides.',
    gradient: 'from-purple-600/20 to-pink-600/20',
    border: 'border-purple-400/20',
  },
  {
    icon: '🍜',
    title: 'Food & Culture',
    description: 'Discover authentic local dishes, recipes, and culinary heritage from every region.',
    gradient: 'from-red-600/20 to-rose-600/20',
    border: 'border-red-400/20',
  },
  {
    icon: '🗺️',
    title: 'Interactive Maps',
    description: 'Explore countries via OpenStreetMap with points of interest and distance calculations.',
    gradient: 'from-teal-600/20 to-cyan-600/20',
    border: 'border-teal-400/20',
  },
  {
    icon: '🧠',
    title: 'Travel Intelligence',
    description: 'Visa info, best travel seasons, safety tips, emergency numbers, transport, and local phrases.',
    gradient: 'from-violet-600/20 to-purple-600/20',
    border: 'border-violet-400/20',
  },
  {
    icon: '🎯',
    title: 'Smart Sync',
    description: 'Everything updates automatically when you select a country — weather, maps, food, and more.',
    gradient: 'from-sky-600/20 to-blue-600/20',
    border: 'border-sky-400/20',
  },
]

export default function FeaturePreview() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Everything You Need to Explore the World"
          subtitle="Eight powerful features working together in perfect sync — one search unlocks the entire platform."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.06, delayChildren: 0.2 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -6 }}
              className={`rounded-3xl border ${feature.border} bg-gradient-to-br ${feature.gradient} p-6 backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
