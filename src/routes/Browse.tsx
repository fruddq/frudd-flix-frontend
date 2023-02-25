import React, { useMemo } from "react"
import { useCallback, useEffect, useState, } from "react"
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom"
import { animateScroll } from "react-scroll"

import type { IMovie } from "../models/Interfaces"

import { Footer } from "../components/Footer"
import { Movies } from "../components/Movies"
import { Header } from "../components/Header"
import { Loader } from "../components/Loader"
import { ErrorMessage } from "../components/ErrorMessage"

import { DOM } from "../modules/DOM"
import { fetchMoviesBrowse } from "../services/fetchMoviesBrowse"
import { getIDsFromString } from "../modules/getIDsFromString"

export const Browse: React.FunctionComponent = () => {
  const location = useLocation()
  const query = DOM.getters.URLQuery(location)

  const page = Number(query["page"])
  const from = Number(query["from"])
  const to = Number(query["to"])
  const genres = useMemo(() => getIDsFromString(query["genres"] as string), [getIDsFromString, location.search])

  const [movies, setMovies] = useState<IMovie[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [noMoviesFound, setNoMoviesFound] = useState(false)

  const fetchAndSetData = useCallback(async () => {
    const data = await fetchMoviesBrowse({ from, to, genres, page })

    setMovies(data.results)
    setTotalPages(data.total_pages > 500 ? 500 : data.total_pages)

    if (!data.results.length) {
      setNoMoviesFound(true)
    }
    else {
      setNoMoviesFound(false)
    }

  }, [setMovies, setTotalPages, fetchMoviesBrowse, from, to, page, genres, setNoMoviesFound])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData, location.search])

  const navigate = useNavigate()
  const browseQuery = `/browse${location.search.split('page=')[0]}page=`

  return <BrowseBase
    movies={movies}
    navigate={navigate}
    browseQuery={browseQuery}
    totalPages={totalPages}
    page={page}
    noMoviesFound={noMoviesFound}
  />
}

export class BrowseBase extends React.Component<{
  readonly browseQuery: string
  readonly movies: IMovie[]
  readonly navigate: NavigateFunction
  readonly totalPages: number
  readonly page: number
  readonly noMoviesFound: boolean
}> {
  navigateNext = () => {
    const { props } = this
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: 'easeInOutQuint'
    })
    props.navigate(`${props.browseQuery}${props.page + 1}`)
  }

  navigatePrevious = () => {
    const { props } = this
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: 'easeInOutQuint'
    })
    props.navigate(`${props.browseQuery}${props.page - 1}`)
  }

  navigateFirstPage = () => {
    const { props } = this
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: 'easeInOutQuint'
    })
    props.navigate(`${props.browseQuery}1`)
  }

  navigateLastPage = () => {
    const { props } = this
    animateScroll.scrollToTop({
      duration: 1000,
      smooth: 'easeInOutQuint'
    })
    props.navigate(`${props.browseQuery}${props.totalPages}`)
  }

  override render() {
    const { props } = this

    if (props.noMoviesFound) return <ErrorMessage errorMessage="No Movies Found" />
    if (props.page > props.totalPages && props.page !== 1) return <ErrorMessage errorMessage="Page not found" />
    if (props.page > 500 || props.page < 1) return <ErrorMessage errorMessage="Page not found" />

    return (
      <>
        <Header />

        {props.movies.length ?
          <Movies
            page={props.page}
            movies={props.movies}
            totalPages={props.totalPages}
            navigateNext={this.navigateNext}
            navigatePrevious={this.navigatePrevious}
            navigateFirstPage={this.navigateFirstPage}
            navigateLastPage={this.navigateLastPage}
          />
          :
          <Loader />}

        <Footer />
      </>
    )
  }
}
