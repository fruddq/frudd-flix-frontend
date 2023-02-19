import { moviesPerPage } from "../config"
import type { movieID } from "../models/Interfaces"

export const getPaginatedMovieIDs = ({
  page,
  savedMovies,
}: {
  page: string
  savedMovies: movieID[]
}) => {
  const startIndex = (Number(page) - 1) * moviesPerPage
  const endIndex = startIndex + moviesPerPage

  return savedMovies.slice(startIndex, endIndex)
}
