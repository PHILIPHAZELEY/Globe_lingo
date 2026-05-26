import CountrySearch from '@/components/CountrySearch'
import CurrencyConverter from '@/components/CurrencyConverter'
import DictionarySearch from '@/components/DictionarySearch'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">🌍</span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              GlobeLingo
            </h1>
          </div>
          <p className="text-gray-600 ml-14">
            Your Travel & Language Companion
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:gap-10">
          {/* Country Search Section */}
          <CountrySearch />

          {/* Currency Converter Section */}
          <CurrencyConverter />

          {/* Dictionary Search Section */}
          <DictionarySearch />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-6 md:py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © 2024 GlobeLingo. A Travel & Language Companion.
            </p>
            <div className="flex gap-6 text-sm text-gray-600">
              <a
                href="https://restcountries.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                REST Countries
              </a>
              <a
                href="https://frankfurter.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Frankfurter
              </a>
              <a
                href="https://dictionaryapi.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 transition-colors"
              >
                Dictionary API
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
