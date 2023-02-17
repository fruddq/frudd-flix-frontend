import { useCallback, useEffect, useMemo, useState } from "react"
import { navigate } from "wouter/use-location"

import type { IMovie, movieID } from "../models/Interfaces"
import { Movie } from "./Movie"
import { fetchMovies } from "../services/fetchMovies"
import { ErrorMessage } from "./ErrorMessage"

import { DOM } from "../modules/DOM"

const renderMovies = (movies: IMovie[]) => {
  return movies.map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ))
}

// @TODO fix Props
export interface IProps {
  readonly page: number
  readonly movieIDs?: number[] | undefined
  readonly query?: string | undefined
  readonly from?: number | undefined
  readonly to?: number | undefined
  readonly genres?: movieID[] | undefined
}

// @TODO fix nonnullable wherever applies
const emptyArray: NonNullable<IProps['movieIDs']> = []

export const Movies: React.FunctionComponent<IProps> = ({ page, movieIDs = emptyArray, query = '', from, to, genres }) => {
  if (page > 500 || page < 1) return <ErrorMessage errorMessage="Page not found" />

  const [url, setUrl] = useState(window.location.pathname)

  const isFavoritePath = url.startsWith('/favorites')
  const isWatchLaterPath = url.startsWith('/watch-later')
  const isSearchPath = url.startsWith('/search')
  const isBrowsePath = url.startsWith('/browse')

  if (page > 1 && (isFavoritePath || isWatchLaterPath)) return <ErrorMessage errorMessage="Page not found" /> // @TODO Pagination
  if (!movieIDs.length && isFavoritePath) return <ErrorMessage errorMessage="No movies favorited" />
  if (!movieIDs.length && isWatchLaterPath) return <ErrorMessage errorMessage="No movies saved" />

  const [movies, setMovies] = useState<IMovie[]>([])
  const [totalPages, setTotalPages] = useState(1)

  const fetchAndSetData = useCallback(async () => {
    setUrl(window.location.pathname)
    if (isBrowsePath) {
      const data = await fetchMovies({ page, route: 'discover', genres, from, to })

      setMovies(data.results)
      setTotalPages(data.total_pages)
    }
    else if (movieIDs.length) {
      const dataPromises = movieIDs.map(movieId => fetchMovies({ route: 'id', movieID: movieId }))
      const savedMovies = await Promise.all(dataPromises)

      setMovies(savedMovies)
      setTotalPages(1) // @TODO settotal page should not be 1, pagination
    }
    else if (query !== '') {
      const data = await fetchMovies({ page, route: 'search', query: decodeURIComponent(query) })
      setMovies(data.results)
      setTotalPages(data.total_pages)
    }
    else {
      const data = await fetchMovies({ page, route: 'discover' })

      setMovies(data.results)
      setTotalPages(data.total_pages)
    }

    if (page > totalPages) return <ErrorMessage errorMessage="Page not found" />

  }, [page, setMovies, setTotalPages, movies, movieIDs, query, url])

  const moviesComponents = useMemo(() =>
    renderMovies(movies), [renderMovies, movies]
  )

  useEffect(() => {
    fetchAndSetData()

  }, [movieIDs, page, query, url])

  // @TODO WHY SEARCH PAGE 2 NOT WORKING
  const handleNextPage = useCallback(() => {
    setUrl(window.location.pathname)
    if (isSearchPath) {
      navigate(`/search/${query}/${page + 1}`)
    }
    else {
      navigate(`/movies/${page + 1}`)
    }
    window.scrollTo(0, 0)
  }, [page, url])

  const handlePrevPage = useCallback(() => {
    setUrl(window.location.pathname)
    if (isSearchPath) {
      navigate(`/search/${query}/${page - 1}`)
    }
    else {
      navigate(`/movies/${page - 1}`)
    }
    window.scrollTo(0, 0)
  }, [page, url])

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


