'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import SectionTitle from '@/components/ui/SectionTitle'

const destinations = [
  {
    name: 'Japan',
    flag: '🇯🇵',
    subtitle: 'Land of the Rising Sun',
    color: 'from-red-500/40 to-white/10',
    stats: 'Culture • Tech • Cuisine',
    image: '🍣',
  },
  {
    name: 'Italy',
    flag: '🇮🇹',
    subtitle: 'La Dolce Vita',
    color: 'from-green-500/40 to-red-500/20',
    stats: 'History • Art • Food',
    image: '🍝',
  },
  {
    name: 'Brazil',
    flag: '🇧🇷',
    subtitle: 'Vibrant & Tropical',
    color: 'from-green-500/40 to-yellow-500/20',
    stats: 'Beaches • Carnival • Nature',
    image: '🏖️',
  },
  {
    name: 'Thailand',
    flag: '🇹🇭',
    subtitle: 'Land of Smiles',
    color: 'from-blue-500/40 to-red-500/20',
    stats: 'Temples • Food • Beaches',
    image: '🍜',
  },
  {
    name: 'France',
    flag: '🇫🇷',
    subtitle: 'City of Light & Beyond',
    color: 'from-blue-500/40 to-red-500/20',
    stats: 'Art • Cuisine • Romance',
    image: '🥐',
  },
  {
    name: 'Egypt',
    flag: '🇪🇬',
    subtitle: 'Cradle of Civilization',
    color: 'from-yellow-500/40 to-orange-500/20',
    stats: 'Pyramids • History • Nile',
    image: '🏛️',
  },
]

export default function TrendingDestinations() {
  const router = useRouter()

  const handleExplore = (name: string) => {
    localStorage.setItem('pendingSearch', name)
    router.push('/explore')
  }

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          title="Trending Destinations"
          subtitle="Explore the world&apos;s most captivating countries — each with unique culture, cuisine, and travel intelligence."
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {destinations.map((dest, i) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => handleExplore(dest.name)}
              className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/50 p-6 cursor-pointer transition-all duration-300 hover:border-blue-400/30 hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${dest.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-5xl">{dest.flag}</span>
                  <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{dest.image}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-1">{dest.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{dest.subtitle}</p>
                
                <div className="flex items-center gap-2">
                  <span className="text-xs text-blue-300 font-medium">{dest.stats}</span>
                </div>

                <div className="mt-6">
                  <span className="inline-flex items-center gap-2 text-sm text-blue-400 group-hover:text-blue-300 transition-colors">
                    Explore destination →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
