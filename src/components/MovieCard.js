import placeholderImg from '../placeholder.png'

export default function MovieCard({ imdbID, Poster, Title, Type, Year }) {
  return (
    <div key={imdbID} className="search-item">
      <img src={Poster === 'N/A' ? placeholderImg : Poster} alt="poster" />
      <div className="search-item-data">
        <div className="title">{Title}</div>
        <div className="meta">{`${Type} | ${Year}`}</div>
      </div>
    </div>
  )
}
