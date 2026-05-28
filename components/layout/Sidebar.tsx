'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navItems = [
  { icon: '🌍', label: 'Overview', href: '#overview' },
  { icon: '☀️', label: 'Weather', href: '#weather' },
  { icon: '🗣️', label: 'Languages', href: '#languages' },
  { icon: '🍲', label: 'Food', href: '#food' },
  { icon: '🗺️', label: 'Map', href: '#map' },
  { icon: '⭐', label: 'Favorites', href: '/favorites' },
  { icon: '⚙️', label: 'Settings', href: '/settings' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [activeHash, setActiveHash] = useState('#overview')

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash || '#overview')
    updateHash()
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  const isActive = (item: typeof navItems[number]) => {
    return item.href === activeHash
  }

  const handleClick = () => {
    if (window.innerWidth < 768) {
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-30 md:hidden backdrop-blur-sm"
        />
      )}

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed md:relative md:translate-x-0 left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 shadow-lg md:shadow-none p-6 flex flex-col gap-8 z-40 md:z-0"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          <div>
            <h1 className="text-2xl font-bold text-white">GlobeLingo</h1>
            <p className="text-xs text-slate-400">Unified world intelligence</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={handleClick}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`nav-link ${isActive(item) ? 'active' : ''}`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-800">
          <p className="text-xs text-slate-500">
            &copy; 2024 GlobeLingo<br />
            Made with ❤ for travelers
          </p>
        </div>
      </motion.aside>
    </>
  )
}
