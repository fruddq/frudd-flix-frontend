import React from "react"
import { useCallback, useEffect, useState, useContext } from "react"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"

import type { IMovie } from "../models/Interfaces"

import { Footer } from "../components/Footer"
import { Movies } from "../components/Movies"
import { Header } from "../components/Header"
import { Loader } from "../components/Loader"
import { ErrorComplete } from "../components/ErrorComplete"
import { Navigate } from "../components/Navigate"

import { moviesPerPage } from "../services/config"
import { fetchMovie } from "../services/fetchMovie"
import { fetchMovies } from "../services/fetchMovies"
import { storeWatchLater } from "../stores/watchLater"


export const WatchLater: React.FunctionComponent = () => {
  const watchLater = useContext(storeWatchLater.contextState)
  const params = useParams() as any as { readonly page: string }

  const [movies, setMovies] = useState<IMovie[]>([])

  const fetchAndSetData = useCallback(async () => {
    const startIndex = (Number(params.page) - 1) * moviesPerPage
    const endIndex = startIndex + moviesPerPage
    const movieIdsToFetch = watchLater.slice(startIndex, endIndex)

    const dataPromises = movieIdsToFetch.map(movieId => fetchMovie(movieId))
    const savedMovies = await Promise.all(dataPromises)

    setMovies(savedMovies)
  }, [setMovies, fetchMovies, params, watchLater])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  const navigate = useNavigate()

  return <WatchLaterBase watchLater={watchLater} params={params} movies={movies} navigate={navigate} />
}

export class WatchLaterBase extends React.Component<{
  readonly watchLater: number[]
  readonly params: { readonly page: string }
  readonly movies: IMovie[]
  readonly navigate: NavigateFunction
}> {
  navigateNext = () => {
    const { props } = this
    window.scrollTo(0, 0)
    props.navigate(`/watch-later/${Number(props.params.page) + 1}`)
  }

  navigatePrevious = () => {
    const { props } = this
    window.scrollTo(0, 0)
    props.navigate(`/watch-later/${Number(props.params.page) - 1}`)
  }

  navigateFirstPage = () => {
    const { props } = this
    window.scrollTo(0, 0)
    props.navigate("/watch-later/1")
  }

  navigateLastPage = () => {
    const { props } = this
    window.scrollTo(0, 0)
    props.navigate(`/watch-later/${Math.ceil(props.watchLater.length / moviesPerPage)}`)
  }

  override render() {
    const { props } = this

    if (props.watchLater.length < 1) return <ErrorComplete errorMessage="No movies saved" />

    const page = Number(props.params.page)

    if (page > 500 || page < 1) return <ErrorComplete errorMessage="Page not found" />

    const totalPages = Math.ceil(props.watchLater.length / moviesPerPage)

    if (page > totalPages + 1) return <ErrorComplete errorMessage={`Only ${totalPages} pages of watch later available`} />

    const paginationNumber = page + (moviesPerPage - 1) * (page - 1)

    if (props.watchLater.length < paginationNumber && page !== 1) {
      return <Navigate onNavigate={({ navigate }) => {
        window.scrollTo(0, 0)
        navigate(`/watch-later/${page - 1}`)
      }} />
    }

    return (
      <>
        <Header />

        {props.movies.length ?
          <Movies
            page={page}
            movies={props.movies}
            totalPages={totalPages}
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
