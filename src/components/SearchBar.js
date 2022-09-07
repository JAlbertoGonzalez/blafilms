export default function SearchBar({ onChange, onSubmit, loading = false }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        onChange={e => onChange && onChange(e)}
      />
      <button onClick={e => onSubmit && onSubmit(e)}>
        {loading ? <div className="spinner"></div> : 'Search'}
      </button>
    </div>
  )
}
