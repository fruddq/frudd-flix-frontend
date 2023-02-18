import { useContext } from "react"
import type { PropsBrowse } from "../models/Props"
import { storeDropdown } from "../stores/dropdown"
import { MovieList } from "./MovieList"

export const Browse: React.FunctionComponent<PropsBrowse> = ({ page, from, to, genres }) => {
  const dropdownInfo = useContext(storeDropdown.contextState)

  const selectedGenres = dropdownInfo.genres.filter((genre) => genre.selected)
    .map((genre) => genre.id)

  console.log("browse component", from, to, genres)
  return (
    <>
      <MovieList page={page} from={dropdownInfo.yearRange.from} to={dropdownInfo.yearRange.to} genres={selectedGenres} />
    </>
  )
}
