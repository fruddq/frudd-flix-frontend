import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Movies as ComponentMovies } from "../components/Movies"
import { Header } from "../components/Header"
import type { IMovie } from "../models/Interfaces"
import { fetchMovies } from "../services/fetchMovies"
import { Loader } from "../components/Loader"
import { ErrorMessage } from "../components/ErrorMessage"
import { ErrorComplete } from "../components/ErrorComplete"

export const Movies: React.FunctionComponent = () => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const params = useParams() as any as { readonly page: string }
  const page = Number(params.page)

  if (page > 500 || page < 1) return <ErrorComplete errorMessage="Page not found" />

  const [movies, setMovies] = useState<IMovie[]>([])
  const [totalPages, setTotalPages] = useState(1)

  if (page > totalPages && page !== 1) return <ErrorComplete errorMessage="Page not found" />

  const fetchAndSetData = useCallback(async () => {
    const data = await fetchMovies({ page })

    setMovies(data.results)
    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)

    if (page > data.total_pages) return <ErrorMessage errorMessage="Page not found" />
  }, [setMovies, setTotalPages, fetchMovies, page])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  const navigate = useNavigate()

  const navigateNext = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`/movies/${page + 1}`)
  }, [navigate, page])

  const navigatePrevious = useCallback(() => {
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


