'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { icon: '\uD83C\uDF0D', label: 'Countries', href: '/', tab: 'country' },
  { icon: '\uD83D\uDCB1', label: 'Currency', href: '/', tab: 'currency' },
  { icon: '\uD83D\uDCDA', label: 'Dictionary', href: '/', tab: 'dictionary' },
  { icon: '\u2B50', label: 'Favorites', href: '/favorites' },
  { icon: '\u2699\uFE0F', label: 'Settings', href: '/settings' },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const activeTab = searchParams.get('tab') || 'country'

  const isActive = (item: typeof navItems[number]) => {
    if (item.href === '/') {
      if (pathname !== '/') return false
      if (item.tab) {
        return activeTab === item.tab
      }
      return !activeTab || activeTab === 'country'
    }
    return pathname === item.href
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
        className="fixed md:relative md:translate-x-0 left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-800 shadow-lg md:shadow-none p-6 flex flex-col gap-8 z-40 md:z-0"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">\uD83C\uDF0D</span>
          <div>
            <h1 className="text-2xl font-bold gradient-text">GlobeLingo</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Travel Companion</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={`${item.href}-${item.tab || ''}`}
              href={item.tab ? `/?tab=${item.tab}` : item.href}
              onClick={handleClick}
            >
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

        <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            &copy; 2024 GlobeLingo<br />
            Made with &hearts; for travelers
          </p>
        </div>
      </motion.aside>
    </>
  )
}
