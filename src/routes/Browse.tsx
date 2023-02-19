import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Movies as ComponentMovies } from "../components/Movies"
import { Header } from "../components/Header"
import type { IMovie } from "../models/Interfaces"
import { fetchMovies } from "../services/fetchMovies"
import { Loader } from "../components/Loader"
import { ErrorMessage } from "../components/ErrorMessage"
import { DOM } from "../modules/DOM"

export const Browse: React.FunctionComponent = () => {
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>

  const query = DOM.getters.URLQuery()
  console.log(query)
  // const page = Number(params.page)

  // if (page > 500 || page < 1) return <ErrorMessage errorMessage="Page not found" />

  // const [movies, setMovies] = useState<IMovie[]>([])
  // const [totalPages, setTotalPages] = useState(1)

  // const fetchAndSetData = useCallback(async () => {
  //   const data = await fetchMovies({ page })

  //   setMovies(data.results)
  //   setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)
  // }, [setMovies, setTotalPages, fetchMovies, page])

  // useEffect(() => {
  //   fetchAndSetData()
  // }, [fetchAndSetData])

  // const navigate = useNavigate()

  // const navigateNext = useCallback(() => {
  //   window.scrollTo(0, 0)
  //   navigate(`/movies/${page + 1}`)
  // }, [navigate, page])

  // const navigatePrevious = useCallback(() => {
  //   window.scrollTo(0, 0)
  //   navigate(`/movies/${page - 1}`)
  // }, [navigate, page])

  // const navigateFirstPage = useCallback(() => {
  //   window.scrollTo(0, 0)
  //   navigate("/movies/1")
  // }, [navigate, page])

  // const navigateLastPage = useCallback(() => {
  //   window.scrollTo(0, 0)
  //   navigate(`/movies/${totalPages}`)
  // }, [navigate, totalPages])

  return (
    <>
      <Header />
      {/* 
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
        <Loader />} */}

      <Footer />
    </>
  )
}


