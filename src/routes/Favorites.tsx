import React from "react"
import { animateScroll } from "react-scroll"
import { useCallback, useEffect, useState, useContext } from "react"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom"

import type { IMovie } from "../models/Interfaces"

import { Footer } from "../components/Footer"
import { Movies } from "../components/Movies"
import { Header } from "../components/Header"
import { Loader } from "../components/Loader"
import { ErrorMessage } from "../components/ErrorMessage"
import { Navigate } from "../components/Navigate"

import { moviesPerPage } from "../config"
import { fetchMovie } from "../services/fetchMovie"
import { storeFavorites } from "../stores/favorites"
import { getPaginatedMovieIDs } from "../modules/getPaginatedMovieIDs"
import { scrollSettings } from "../constants"

export const Favorites: React.FunctionComponent = () => {
  const favorites = useContext(storeFavorites.contextState)
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const params = useParams() as any as { readonly page: string }

  const [movies, setMovies] = useState<IMovie[]>([])

  const fetchAndSetData = useCallback(async () => {
    const movieIdsToFetch = getPaginatedMovieIDs({ page: params.page, savedMovies: favorites })

    const dataPromises = movieIdsToFetch.map(movieId => fetchMovie(movieId))
    const savedMovies = await Promise.all(dataPromises)

    setMovies(savedMovies)
  }, [setMovies, params, favorites, getPaginatedMovieIDs])

  useEffect(() => {
    fetchAndSetData()
  }, [fetchAndSetData])

  const navigate = useNavigate()

  return <FavoritesBase favorites={favorites} params={params} movies={movies} navigate={navigate} />
}

export class FavoritesBase extends React.Component<{
  readonly favorites: number[]
  readonly params: { readonly page: string }
  readonly movies: IMovie[]
  readonly navigate: NavigateFunction
}> {
  navigateNextPage = () => {
    const { props } = this
    animateScroll.scrollToTop(scrollSettings)
    props.navigate(`/favorites/${Number(props.params.page) + 1}`)
  }

  navigatePreviousPage = () => {
    const { props } = this
    animateScroll.scrollToTop(scrollSettings)
    props.navigate(`/favorites/${Number(props.params.page) - 1}`)
  }

  navigateFirstPage = () => {
    const { props } = this
    animateScroll.scrollToTop(scrollSettings)
    props.navigate("/favorites/1")
  }

  navigateLastPage = () => {
    const { props } = this
    animateScroll.scrollToTop(scrollSettings)
    props.navigate(`/favorites/${Math.ceil(props.favorites.length / moviesPerPage)}`)
  }

  override render() {
    const { props } = this

    if (props.favorites.length < 1) {
      return (<>
        <ErrorMessage errorMessage="No movies favorited" />
      </>)
    }

    const page = Number(props.params.page)

    if (page > 500 || page < 1) return <ErrorMessage errorMessage="Page not found" />

    const totalPages = Math.ceil(props.favorites.length / moviesPerPage)

    if (page > totalPages + 1) return <ErrorMessage errorMessage={`Only ${totalPages} pages of favorites available`} />

    const paginationNumber = page + (moviesPerPage - 1) * (page - 1)

    if (props.favorites.length < paginationNumber && page !== 1) {
      return <Navigate onNavigate={({ navigate }) => {
        window.scrollTo(0, 0)
        navigate(`/favorites/${page - 1}`)
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
            navigateNext={this.navigateNextPage}
            navigatePrevious={this.navigatePreviousPage}
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
