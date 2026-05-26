'use client'

import { useState } from 'react'

interface Definition {
  definition: string
  example?: string
}

interface Meaning {
  partOfSpeech: string
  definitions: Definition[]
}

interface DictionaryEntry {
  word: string
  phonetic?: string
  meanings: Meaning[]
}

export default function DictionarySearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [entry, setEntry] = useState<DictionaryEntry | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!searchQuery.trim()) {
      setError('Please enter a word')
      return
    }

    setLoading(true)
    setError('')
    setEntry(null)

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(
          searchQuery.toLowerCase()
        )}`
      )

      if (!response.ok) {
        throw new Error('Word not found')
      }

      const data = await response.json()
      if (data && data.length > 0) {
        setEntry(data[0])
      } else {
        setError('No definition found')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch word definition')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <h2 className="section-title">📚 Dictionary Search</h2>

      <form onSubmit={handleSearch} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Enter a word (e.g., serendipity)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field"
        />
        <button
          type="submit"
          disabled={loading}
          className="button-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 mb-6">
          {error}
        </div>
      )}

      {entry && (
        <div className="card space-y-6">
          <div>
            <h3 className="text-3xl font-bold text-gray-900">{entry.word}</h3>
            {entry.phonetic && (
              <p className="text-lg text-blue-600 italic">{entry.phonetic}</p>
            )}
          </div>

          {entry.meanings && entry.meanings.length > 0 && (
            <div className="space-y-6">
              {entry.meanings.map((meaning, idx) => (
                <div key={idx} className="space-y-3">
                  <p className="text-lg italic text-gray-700 font-semibold">
                    {meaning.partOfSpeech}
                  </p>

                  {meaning.definitions && meaning.definitions.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-2">
                        Definitions
                      </p>
                      <ul className="space-y-2">
                        {meaning.definitions.slice(0, 2).map((def, defIdx) => (
                          <li key={defIdx} className="text-gray-700">
                            <p className="text-sm">• {def.definition}</p>
                            {def.example && (
                              <p className="text-sm text-gray-600 italic mt-1">
                                Example: "{def.example}"
                              </p>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}
