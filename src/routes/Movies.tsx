import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { Footer } from "../components/Footer"
import { Movies as ComponentMovies } from "../components/Movies"
import { Header } from "../components/Header"
import { Loader } from "../components/Loader"
import { ErrorMessage } from "../components/ErrorMessage"

import type { IMovie } from "../models/Interfaces"
import { fetchMoviesDiscover } from "../services/fetchMoviesDiscover"


export const Movies: React.FunctionComponent = () => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const params = useParams() as any as { readonly page: string }
  const page = Number(params.page)

  if (page > 500 || page < 1) return <ErrorMessage errorMessage="Page not found" />

  const [movies, setMovies] = useState<IMovie[]>([])
  const [totalPages, setTotalPages] = useState(1)

  if (page > totalPages && page !== 1) return <ErrorMessage errorMessage="Page not found" />

  const fetchAndSetData = useCallback(async () => {
    const data = await fetchMoviesDiscover({ page })

    setMovies(data.results)
    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)

  }, [setMovies, setTotalPages, fetchMoviesDiscover, page])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  const navigate = useNavigate()

  const navigateNextPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/movies/${page + 1}`)
  }, [navigate, page])

  const navigatePreviousPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/movies/${page - 1}`)
  }, [navigate, page])

  const navigateFirstPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate("/movies/1")
  }, [navigate, page])

  const navigateLastPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/movies/${totalPages}`)
  }, [navigate, totalPages])

  return (
    <>
      <Header />

      {movies.length ?
        <ComponentMovies
          page={page}
          movies={movies}
          totalPages={totalPages}
          navigateNext={navigateNextPage}
          navigatePrevious={navigatePreviousPage}
          navigateFirstPage={navigateFirstPage}
          navigateLastPage={navigateLastPage}
        />
        :
        <Loader />}

      <Footer />
    </>
  )
}


