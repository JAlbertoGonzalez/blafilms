const API_KEY = process.env.REACT_APP_OMDB_API_KEY

export const wait = (t = 750) => new Promise(r => setTimeout(r, t))

export const omdbSearch = async (input = '', page = 1) => {
  if (!input) return null

  await wait()

  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&s=${input}&page=${page}`,
  ).catch(() => null)

  const data = await response.json()

  return data.Search ? data : null
}
