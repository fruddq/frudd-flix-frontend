import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ErrorComplete } from "../components/ErrorComplete"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Loader } from "../components/Loader"
import { Movies } from "../components/Movies"
import type { IMovie } from "../models/Interfaces"

import { DOM } from "../modules/DOM"
import { fetchMoviesBrowse } from "../services/fetchMoviesBrowse"
import { getIDsFromString } from "../services/getIDsFromString"

export const Browse: React.FunctionComponent = () => {
  const query = DOM.getters.URLQuery()

  if (!(query["from"] && query["to"] && query["page"] && query["genres"]))
    return <ErrorComplete errorMessage="Need genres, year from, year to and page in order to browse" />

  const page = Number(query["page"])

  if (page > 500 || page < 1) return <ErrorComplete errorMessage="Page not found" />

  const from = Number(query["from"])
  const to = Number(query["to"])
  const genres = getIDsFromString(query["genres"] as string)

  const [movies, setMovies] = useState<IMovie[]>([])
  const [totalPages, setTotalPages] = useState(1)

  const fetchAndSetData = useCallback(async () => {
    const data = await fetchMoviesBrowse({ from, to, genres, page })

    setMovies(data.results)
    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)

    if (page > data.total_pages) return <ErrorComplete errorMessage="Page not found" />
  }, [setMovies, setTotalPages, fetchMoviesBrowse, page])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  const location = useLocation()
  const urlQuery = `/browse${location.search.split('page=')[0]}page=`
  const navigate = useNavigate()

  const navigateNext = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`${urlQuery}${page + 1}`)
  }, [navigate, page])

  const navigatePrevious = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`${urlQuery}${page - 1}`)
  }, [navigate, page])

  const navigateFirstPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`${urlQuery}1`)

  }, [navigate, page])

  const navigateLastPage = useCallback(() => {
    window.scrollTo(0, 0)
    navigate(`${urlQuery}${totalPages}`)
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


