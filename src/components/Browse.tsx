import { useEffect, useState } from "react"
import { genreList } from "../services/config"
import { ErrorMessage } from "./ErrorMessage"
import { MovieList } from "./MovieList"

interface PropsBrowse {
  readonly page: number
  readonly from: number
  readonly to: number
  readonly genres: string
}

export const Browse: React.FunctionComponent<PropsBrowse> = ({ page, from, to, genres }) => {
  const [browseState, setBrowseState] = useState({ from, to, genres, page })

  useEffect(() => {
    setBrowseState({ from, to, genres, page })
  }, [from, to, genres, page])

  const matchingGenres = genreList.filter(genre => {
    const splitGenres = genres.split('-')
    return splitGenres.includes(genre.name)
  })

  const genreIDs = matchingGenres.map(genre => genre.id)
  const currentYear = new Date().getFullYear()

  if (!genreIDs.length) return <ErrorMessage errorMessage="No such genres" />
  if (from < 1950 || from > currentYear) return <ErrorMessage errorMessage="From year must be bigger than 1950" />
  if (to > currentYear || to < 1950) return <ErrorMessage errorMessage="To year must be less than current year" />

  console.log("in browse component")

  return (
    <>
      <MovieList page={page} from={from} to={to} genres={genreIDs} />
    </>
  )
};

