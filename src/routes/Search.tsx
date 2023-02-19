import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Movies } from "../components/Movies"
import { Header } from "../components/Header"
import type { IMovie } from "../models/Interfaces"
import { fetchMovies } from "../services/fetchMovies"
import { Loader } from "../components/Loader"
import { ErrorMessage } from "../components/ErrorMessage"
import { fetchMoviesSearch } from "../services/fetchMoviesSearch"

export const Search: React.FunctionComponent = () => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const params = useParams() as any as { readonly page: string, readonly query: string }
  const navigate = useNavigate()
  const [movies, setMovies] = useState<IMovie[]>([])
  const [totalPages, setTotalPages] = useState(1)

  const page = Number(params.page)
  if (page > 500 || page < 1) return <ErrorMessage errorMessage="Page not found" />

  const query = params.query
  const fetchAndSetData = useCallback(async () => {
    const data = await fetchMoviesSearch({ page, query })

    setMovies(data.results)
    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
  }, [setMovies, setTotalPages, fetchMovies, page, query])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  const navigateNext = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/search/${query}/${page + 1}`)
  }, [navigate, page])

  const navigatePrevious = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/search/${query}/${page - 1}`)
  }, [navigate, page])

  const navigateFirstPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/search/${query}/1`)
  }, [navigate, page])

  const navigateLastPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/search/${query}/${totalPages}`)
  }, [navigate, totalPages])

  return (
    <>
      <Header />

      {movies.length ?
        <Movies
          page={page}
          movies={movies}
          totalPages={totalPages}
          navigateNext={navigateNext}
          navigatePrevious={navigatePrevious}
          navigateFirstPage={navigateFirstPage}
          navigateLastPage={navigateLastPage}
        />
        :
        <Loader />}

      <Footer />
    </>
  )
}


