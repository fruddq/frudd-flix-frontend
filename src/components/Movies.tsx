import { useCallback, useEffect, useMemo, useState } from "react"
import { navigate } from "wouter/use-location"

import type { IMovie, movieID } from "../models/Interfaces"
import { Movie } from "./Movie"
import { fetchMovies } from "../services/fetchMovies"
import { ErrorMessage } from "./ErrorMessage"
import { navigateAndReturnNull } from "../services/navigateAndReturnNull"

// import { DOM } from "../modules/DOM"

const renderMovies = (movies: IMovie[]) => {
  return movies.map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ))
}

// const getMoviesForPage = (page: number, savedMovies: IMovie[]) => {
//   const moviesPerPage = 20
//   const startIndex = (page - 1) * moviesPerPage
//   const endIndex = Math.min(startIndex + moviesPerPage, savedMovies.length)
//   return savedMovies.slice(startIndex, endIndex)
// }

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

  if (page > Math.ceil(movieIDs.length / 20) && (isFavoritePath || isWatchLaterPath)) return <ErrorMessage errorMessage="Page not found" /> // @TODO Pagination

  const [movies, setMovies] = useState<IMovie[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const fetchAndSetData = useCallback(async () => {
    setUrl(window.location.pathname)

    if (isBrowsePath) {
      const data = await fetchMovies({ page, route: 'discover', genres, from, to })

      setMovies(data.results)
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
    }
    else if (movieIDs.length) {
      // Determine the range of movies to fetch based on the current page and number of movies per page
      const moviesPerPage = 3
      const startIndex = (page - 1) * moviesPerPage
      const endIndex = startIndex + moviesPerPage
      const movieIdsToFetch = movieIDs.slice(startIndex, endIndex)

      const dataPromises = movieIdsToFetch.map(movieId => fetchMovies({ route: 'id', movieID: movieId }))
      const savedMovies = await Promise.all(dataPromises)

      setMovies(savedMovies)
      setTotalPages(Math.ceil(movieIDs.length / moviesPerPage))
    }
    else if (query !== '') {
      const data = await fetchMovies({ page, route: 'search', query: decodeURIComponent(query) })
      setMovies(data.results)
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
    }
    else {
      const data = await fetchMovies({ page, route: 'discover' })

      setMovies(data.results)
      setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
    }

    if (page > totalPages) return <ErrorMessage errorMessage="Page not found" />

    setIsLoading(false)
  }, [page, setMovies, setTotalPages, movies, movieIDs, query, url])

  const moviesComponents = useMemo(() =>
    renderMovies(movies), [renderMovies, movies]
  )

  useEffect(() => {
    fetchAndSetData()
  }, [movieIDs, page, query, url, genres, from, to])

  const handleNextPage = useCallback(() => {
    setUrl(window.location.pathname)
    window.scrollTo(0, 0)

    if (isSearchPath) {
      return navigateAndReturnNull(() => {
        navigate(`/search/${query}/${page + 1}`)
      })
    }
    else if (isFavoritePath) {
      return navigateAndReturnNull(() => {
        navigate(`/favorites/${page + 1}`)
      })
    }
    else if (isWatchLaterPath) {
      return navigateAndReturnNull(() => {
        navigate(`/watch-later/${page + 1}`)
      })
    }
    else {
      return navigateAndReturnNull(() => {
        navigate(`/movies/${page + 1}`)
      })
    }
  }, [page, url])

  const handlePrevPage = useCallback(() => {
    setUrl(window.location.pathname)
    window.scrollTo(0, 0)

    if (isSearchPath) {
      return navigateAndReturnNull(() => {
        navigate(`/search/${query}/${page - 1}`)
      })
    }
    else if (isFavoritePath) {
      return navigateAndReturnNull(() => {
        navigate(`/favorites/${page - 1}`)
      })
    }
    else if (isWatchLaterPath) {
      return navigateAndReturnNull(() => {
        navigate(`/watch-later/${page - 1}`)
      })
    }
    else {
      return navigateAndReturnNull(() => {
        navigate(`/movies/${page - 1}`)
      })
    }
  }, [page, url])

  const handleFirstPage = useCallback(() => {
    console.log(totalPages)
    setUrl(window.location.pathname)
    window.scrollTo(0, 0)

    if (isSearchPath) {
      return navigateAndReturnNull(() => {
        navigate(`/search/${query}/1}`)
      })
    }
    else if (isFavoritePath) {
      return navigateAndReturnNull(() => {
        navigate("/favorites/1")
      })
    }
    else if (isWatchLaterPath) {
      return navigateAndReturnNull(() => {
        navigate("/watch-later/1")
      })
    }
    else {
      return navigateAndReturnNull(() => {
        navigate("/movies/1")
      })
    }
  }, [page, url])

  const handleLastPage = useCallback(() => {
    console.log(totalPages)
    setUrl(window.location.pathname)
    window.scrollTo(0, 0)

    if (isSearchPath) {
      return navigateAndReturnNull(() => {
        navigate(`/search/${query}/${totalPages}`)
      })
    }
    else if (isFavoritePath) {
      return navigateAndReturnNull(() => {
        navigate(`/favorites/${totalPages}`)
      })
    }
    else if (isWatchLaterPath) {
      return navigateAndReturnNull(() => {
        navigate(`/watch-later/${totalPages}`)
      })
    }
    else {
      return navigateAndReturnNull(() => {
        navigate(`/movies/${totalPages}`)
      })
    }
  }, [page, url])
  console.log(page)

  return (
    <>
      {isLoading ? (
        <ErrorMessage errorMessage="Loading..." />
      ) : (
        // rome-ignore lint/correctness/noChildrenProp: <explanation>
        <div className="movies-container" children={moviesComponents} />
      )}

      <div className="pagination-container">
        <button
          className={`previous-btn${page === 1 ? ' disabled' : ''}`}
          disabled={page === 1}
          onClick={handleFirstPage}
        >
          «
        </button>

        <button className={`previous-btn${page === 1 ? ' disabled' : ''}`}
          disabled={page === 1}
          onClick={handlePrevPage}
        >
          ‹
        </button>

        <p className="total-pages">
          <b className="current-page-numb">{page}</b> of {totalPages}
        </p>
        {/* TODO: pagination numbers */}
        <button className={`next-btn${page === totalPages ? ' disabled' : ''}`}
          disabled={page === totalPages}
          onClick={handleNextPage}
        >
          ›
        </button>

        <button
          className={`next-btn${page === totalPages ? ' disabled' : ''}`}
          disabled={page === totalPages}
          onClick={handleLastPage}
        >
          »
        </button>
      </div>
    </>
  )
}


