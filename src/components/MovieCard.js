import placeholderImg from '../images/placeholder.png'

export default function MovieCard({ imdbID, Poster, Title, Type, Year }) {
  return (
    <div className="search-item">
      <img src={Poster === 'N/A' ? placeholderImg : Poster} alt="poster" />
      <div className="search-item-data">
        <div className="title">
          <a href={"https://www.imdb.com/title/" + imdbID} target="_blank" rel="noreferrer">{Title}</a>
        </div>
        <div className="meta">{`${Type} | ${Year}`}</div>
      </div>
    </div>
  )
}
