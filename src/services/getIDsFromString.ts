import { genreList } from "./config"

export const getMatchingGenreIds = (genreString: string) => {
  const splitGenres = genreString.split("-")
  const matchingGenres = genreList.filter((genre) => splitGenres.includes(genre.name))
  const matchingGenreIds = matchingGenres.map((genre) => genre.id)

  return matchingGenreIds
}
