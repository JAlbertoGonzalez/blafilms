export const wait = () => new Promise(r => setTimeout(r, 750))

export const omdbSearch = async (input = '', page = 1) => {
  if (!input) return null

  await wait()

  const response = await fetch(
    'http://www.omdbapi.com/?apikey=a461e386&s=' + input + '&page=' + page,
  ).catch(() => null)

  const data = await response.json()

  return data.Search ? data : null
}