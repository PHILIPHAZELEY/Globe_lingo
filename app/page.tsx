'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from '@/components/layout/Sidebar'
import Navbar from '@/components/layout/Navbar'
import CountrySearch from '@/components/country/CountrySearch'
import CurrencyConverter from '@/components/currency/CurrencyConverter'
import DictionarySearch from '@/components/dictionary/DictionarySearch'

const tabs = [
  { id: 'country', label: '\uD83C\uDF0D Countries' },
  { id: 'currency', label: '\uD83D\uDCB1 Currency' },
  { id: 'dictionary', label: '\uD83D\uDCDA Dictionary' },
] as const

function HomeContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams.get('tab')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(
    tabs.some(t => t.id === tabParam) ? tabParam! : 'country'
  )

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-6xl mx-auto px-4 py-8 md:py-12"
          >
            <div className="md:hidden flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
              {tabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-200 ${activeTab === item.id ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400'}`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              <div className="md:hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.25 }}
                  >
                    {activeTab === 'country' && <CountrySearch />}
                    {activeTab === 'currency' && <CurrencyConverter />}
                    {activeTab === 'dictionary' && <DictionarySearch />}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="hidden md:block md:space-y-12">
                <CountrySearch />
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                <CurrencyConverter />
                <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                <DictionarySearch />
              </div>
            </div>

            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-sm"
            >
              <p>
                Made with &hearts; by GlobeLingo &bull;{' '}
                <a
                  href="https://github.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </p>
              <p className="mt-2">
                Powered by{' '}
                <a href="https://restcountries.com" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  REST Countries
                </a>
                {' '} &bull;{' '}
                <a href="https://frankfurter.app" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Frankfurter
                </a>
                {' '} &bull;{' '}
                <a href="https://dictionaryapi.dev" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  Dictionary API
                </a>
              </p>
            </motion.footer>
          </motion.div>
        </main>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeContent />
    </Suspense>
  )
}
