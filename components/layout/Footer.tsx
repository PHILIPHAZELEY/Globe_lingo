'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Explore', href: '/explore' },
      { label: 'Travel Intel', href: '/travel-intelligence' },
      { label: 'Favorites', href: '/favorites' },
      { label: 'Settings', href: '/settings' },
    ],
  },
  {
    title: 'Features',
    links: [
      { label: 'Country Search', href: '/explore' },
      { label: 'Weather', href: '/explore#weather' },
      { label: 'Currency', href: '/explore' },
      { label: 'Languages', href: '/explore#languages' },
      { label: 'Food & Culture', href: '/explore#food' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'REST Countries', href: 'https://restcountries.com' },
      { label: 'Open-Meteo', href: 'https://open-meteo.com' },
      { label: 'Frankfurter', href: 'https://frankfurter.app' },
      { label: 'OpenStreetMap', href: 'https://openstreetmap.org' },
    ],
  },
]

const socialIcons = [
  { label: 'GitHub', icon: '🐙', href: '#' },
  { label: 'Twitter', icon: '🐦', href: '#' },
  { label: 'LinkedIn', icon: '💼', href: '#' },
  { label: 'Email', icon: '📧', href: '#' },
]

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="border-t border-slate-800 dark:border-slate-700/50 bg-slate-950/90"
    >
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌐</span>
              <div>
                <h3 className="text-xl font-bold text-white">GlobeLingo</h3>
                <p className="text-sm text-slate-400">Travel Intelligence Platform</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A synchronized global intelligence dashboard for travel, culture, and communication. 
              Discover countries, languages, currencies, food, maps, and travel insights in one unified platform.
            </p>
            <div className="flex gap-3 pt-2">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-2xl border border-slate-800 bg-slate-900/90 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
                  title={social.label}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title} className="space-y-4">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider">{group.title}</h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-800 dark:border-slate-700/30">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} GlobeLingo. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Powered by REST Countries &bull; Open-Meteo &bull; Frankfurter &bull; OpenStreetMap &bull; Free Dictionary API
          </p>
        </div>
      </div>
    </motion.footer>
  )
}
