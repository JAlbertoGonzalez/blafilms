import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'
import MovieCard from './components/MovieCard'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [searchPage, setSearchPage] = useState(1)
  const [searchResult, setSearchResult] = useState()
  const [loading, setLoading] = useState(false)

  const wait = () => new Promise(r => setTimeout(r, 750))

  const search = async (input = searchInput, page = 1) => {
    if (!input) return setSearchResult(null)

    setLoading(true)

    await wait()

    const response = await fetch(
      'http://www.omdbapi.com/?apikey=a461e386&s=' + input + '&page=' + page,
    ).catch(() => null)

    const data = await response.json()

    setSearchResult(data.Search ? data : null)

    setLoading(false)
  }

  const handleNewSearch = () => {
    // Reset to first page
    setSearchPage(1)
    search()
  }

  useEffect(() => {
    search(searchInput, searchPage)
  }, [searchPage])

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="Search..."
          onChange={x => setSearchInput(x.target.value)}
        />
        <button onClick={handleNewSearch}>
          {loading ? <div className="spinner"></div> : 'Search'}
        </button>
      </div>
      {!searchResult || loading ? (
        <p className="no-results">{loading ? 'Loading' : 'No results'}</p>
      ) : (
        <div className="search-results">
          <div
            className="chevron"
            onClick={() => setSearchPage(Math.max(searchPage - 1, 0))}
          >
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {searchResult.Search.map(result => (
              <MovieCard {...result} />
            ))}
          </div>
          <div
            className="chevron"
            onClick={() => setSearchPage(searchPage + 1)}
          >
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
