import React, { useState, useEffect } from 'react'
import './App.css'
import { ReactComponent as ChevronLeft } from './images/chevron-left.svg'
import { ReactComponent as ChevronRight } from './images/chevron-right.svg'
import MovieCard from './components/MovieCard'
import SearchBar from './components/SearchBar'
import { omdbSearch } from './lib/omdbapi'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [searchPage, setSearchPage] = useState(1)
  const [searchResult, setSearchResult] = useState()
  const [loading, setLoading] = useState(false)

  const handleSearch = () => {
    // Reset to first page
    setLoading(true)
    omdbSearch(searchInput, searchPage)
      .then(setSearchResult)
      .finally(() => setLoading(false))
  }

  const handleNewSearch = () => {
    setSearchPage(1)
    handleSearch()
  }

  const nextPageExists = () => {
    return (
      10 * (searchPage - 1) + searchResult.Search.length <
      searchResult.totalResults
    )
  }

  useEffect(() => {
    handleSearch()
  }, [searchPage])

  return (
    <div className="App">
      <SearchBar
        onChange={e => setSearchInput(e.target.value)}
        onSubmit={handleNewSearch}
        loading={loading}
      />

      {!searchResult || loading ? (
        <p className="no-results">{loading ? 'Loading' : 'No results'}</p>
      ) : (
        <div className="search-results">
          <div className="chevron">
            {searchPage > 1 && (
              <button
                onClick={() => setSearchPage(Math.max(searchPage - 1, 1))}
              >
                {' '}
                <ChevronLeft />
              </button>
            )}
          </div>

          <div className="search-results-list">
            {searchResult.Search.map(result => (
              <MovieCard key={result.imdbID} {...result} />
            ))}
          </div>
          <div className="chevron">
            {nextPageExists() && (
              <button onClick={() => setSearchPage(searchPage + 1)}>
                <ChevronRight />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
