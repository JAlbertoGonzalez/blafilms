import React, { useState, useEffect } from 'react'
import './App.css'
import placeholderImg from './placeholder.png'
import { ReactComponent as ChevronLeft } from './chevron-left.svg'
import { ReactComponent as ChevronRight } from './chevron-right.svg'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [searchPage, setSearchPage] = useState(1)
  const [searchResult, setSearchResult] = useState()

  const search = async (input = searchInput, page = 1) => {
    if (!input) return null

    const response = await fetch(
      'http://www.omdbapi.com/?apikey=a461e386&s=' + input + '&page=' + page,
    ).catch(() => null)

    const data = await response.json()

    setSearchResult(data.Search ? data : null)
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
        <button onClick={handleNewSearch}>Search</button>
      </div>
      {!searchResult ? (
        <p>No results yet</p>
      ) : (
        <div className="search-results">
          <div className="chevron" onClick={() => setSearchPage(Math.max(searchPage - 1, 0))}>
            <ChevronLeft />
          </div>
          <div className="search-results-list">
            {searchResult.Search.map(result => (
              <div key={result.imdbID} className="search-item">
                <img
                  src={result.Poster === 'N/A' ? placeholderImg : result.Poster}
                  alt="poster"
                />
                <div className="search-item-data">
                  <div className="title">{result.Title}</div>
                  <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="chevron" onClick={() => setSearchPage(searchPage + 1)}>
            <ChevronRight />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
