'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  onMenuClick: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Hydration fix: only run on client
    setMounted(true)
    
    // Check system preference or localStorage
    const storedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = storedTheme || (prefersDark ? 'dark' : 'light')
    
    setIsDark(theme === 'dark')
    applyTheme(theme === 'dark')
  }, [])

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark')
      document.documentElement.style.colorScheme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      document.documentElement.style.colorScheme = 'light'
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const toggleDarkMode = () => {
    const newDark = !isDark
    setIsDark(newDark)
    applyTheme(newDark)
  }

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-20 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <h1 className="text-xl font-bold text-white">GlobeLingo</h1>
          </div>
          <div className="flex-1" />
        </div>
      </nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="sticky top-0 z-20 bg-slate-950/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-800 dark:border-slate-700 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden button-icon hover:bg-slate-800"
          aria-label="Toggle sidebar menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-2xl">🌐</span>
          <div>
            <h1 className="text-xl font-bold text-white">GlobeLingo</h1>
            <p className="text-sm text-slate-400">Premium global intelligence</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDarkMode}
          className="button-icon"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.536l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.828-2.828a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm.707 5.657a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 1.414l-.707.707zM9 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </motion.button>
      </div>
    </motion.nav>
  )
}
