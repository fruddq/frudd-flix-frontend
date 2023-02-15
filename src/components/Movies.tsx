import { useCallback, useEffect, useMemo, useState } from "react"
import { navigate } from "wouter/use-location"

import type { IMovie } from "../models/IMovie"
import { Movie } from "./Movie"
import { fetchData } from "../services/fetchData"
import { ErrorMessage } from "./ErrorMessage"

// import { DOM } from "../modules/DOM"

const renderMovies = (movies: IMovie[]) => {
  return movies.map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ))
}

// @TODO fix Props
export interface IProps {
  readonly page: number
  readonly movieIDs?: number[] | undefined
}

// @TODO fix nonnullable wherever applies
const emptyArray: NonNullable<IProps['movieIDs']> = []

export const Movies: React.FunctionComponent<IProps> = ({ page, movieIDs = emptyArray }) => {
  if (page > 500) return <ErrorMessage errorMessage="Page not found" />

  const isFavoritePath = window.location.pathname.slice(0, 10) === '/favorites'

  if (page > 1 && isFavoritePath) return <ErrorMessage errorMessage="Page not found" /> // @TODO Pagination
  if (!movieIDs.length && isFavoritePath) return <ErrorMessage errorMessage="No movies favorited" />

  const [movies, setMovies] = useState<IMovie[]>([])
  const [totalPages, setTotalPages] = useState(1)

  const fetchAndSetData = useCallback(async () => {
    if (movieIDs.length) {
      const dataPromises = movieIDs.map(movieId => fetchData({ route: 'id', movieID: movieId }))
      const savedMovies = await Promise.all(dataPromises)

      setMovies(savedMovies)
      setTotalPages(1) // @TODO settotal page should not be 1, pagination
    }

    else {
      const data = await fetchData({ page, route: 'discover' })

      setMovies(data.results)
      setTotalPages(data.total_pages)
    }

    if (page > totalPages) return <ErrorMessage errorMessage="Page not found" />
  }, [page, setMovies, setTotalPages, movies, movieIDs])

  const moviesComponents = useMemo(() =>
    renderMovies(movies), [renderMovies, movies]
  )

  useEffect(() => {
    fetchAndSetData()
  }, [movieIDs, page])

  // @TODO ensure these can handle page with browsing and favorites/watchlater when pagination is complete
  const handleNextPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/movies/${page + 1}`)
  }, [page])

  const handlePrevPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/movies/${page - 1}`)
  }, [page])

  return (
    <>
      {/* rome-ignore lint/correctness/noChildrenProp: <explanation> */}
      <div className="movies-container" children={moviesComponents} />
      <div className="pagination-container">
        <button
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          Previous
        </button>

        <p className="total-pages">
          Page {page} of {totalPages > 500 ? 500 : totalPages}
        </p>
        {/* @TODO pagination numbers */}
        <button
          disabled={page === totalPages}
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </>
  )
}


