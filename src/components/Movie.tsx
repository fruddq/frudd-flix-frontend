import CN from 'classnames'
import { useCallback, useContext, useEffect, useMemo, useState } from "react"

import { EActionFavorites, storeFavorites } from "../stores/favorites"
import { EActionWatchLater, storeWatchLater } from '../stores/watchLater'

import placeHolder from '../assets/place-holder.png'

import { Trailers } from './Trailers'
import { fetchTrailers } from '../services/fetchTrailers'
import { genreList } from '../constants'

import type { IMovie } from '../models/Interfaces'

const getTrailers = async (movieID: number) => {
  const trailerKeys = await fetchTrailers(movieID)
  return (trailerKeys.map(trailer => `https://www.youtube.com/embed/${trailer}`))
}

export interface PropsMovie {
  movie: IMovie
}

export const Movie: React.FunctionComponent<PropsMovie> = ({ movie }) => {

  const [showBackdropTrailer, setShowBackdropTrailer] = useState(false)

  const genreNames = movie.genre_ids.map(id => {
    const genre = genreList.find(g => g.id === id)
    return genre ? genre.name : ""
  })

  const dispatchWatchLater = useContext(storeWatchLater.contextDispatch)
  const stateWatchLater = useContext(storeWatchLater.contextState)

  const addRemoveWatchlater: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault()

      dispatchWatchLater({
        type: stateWatchLater.includes(movie.id) ? EActionWatchLater.Remove : EActionWatchLater.Add,
        payload: movie.id
      })
    },
    [dispatchWatchLater, stateWatchLater, movie]
  )

  const dispatchFavorite = useContext(storeFavorites.contextDispatch)
  const stateFavorites = useContext(storeFavorites.contextState)
  const memoizedStateFavorites = useMemo(() => stateFavorites, [stateFavorites])

  const addRemoveFavorite: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault()

      dispatchFavorite({
        type: memoizedStateFavorites.includes(movie.id) ? EActionFavorites.Remove : EActionFavorites.Add,
        payload: movie.id
      })

    },
    [dispatchFavorite, memoizedStateFavorites, movie]
  )

  const showTrailer = useCallback(() => {
    setShowBackdropTrailer(!showBackdropTrailer)
  }, [setShowBackdropTrailer, showBackdropTrailer])

  const [trailers, setTrailers] = useState<string[]>([])

  const fetchTrailers = useCallback(async () => {
    const data = await getTrailers(movie.id)
    setTrailers(data)
  }, [setTrailers, movie.id])

  useEffect(() => {
    fetchTrailers()
  }, [fetchTrailers])

  return (
    <div className="movie">
      <div className="movie-title-container">
        <h2 className="movie-title">
          {movie.title}
        </h2>
      </div>
      <img
        className="movie-poster"
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : placeHolder
        }
        alt={movie.poster_path ? movie.title : "No poster available"}
      />

      <section className="movie-info-container">
        <article>
          <p className="movie-info-text movie-year">
            {movie.release_date.substring(0, 4)}
          </p>
          <p className="movie-info-text movie-rating">
            Rating: {movie.vote_average.toFixed(1)}/10
          </p>
        </article>

        <article className="movie-info-text movie-genre-container">
          {genreNames.map((name) => (
            <button key={name} className="menu-item menu-button">
              {name}
            </button>
          ))}
        </article>

        <article className="later-trailer-liked-container">

          {trailers.length > 0 && <button onClick={showTrailer} className="watch-trailer-btn">Watch trailer</button>}

          <button
            onClick={addRemoveWatchlater}
            className={CN("watch-later", `movie-${movie.id}`, {
              active: stateWatchLater.includes(movie.id),
            })}
          >
            Watch later
          </button>

          <button
            onClick={addRemoveFavorite}
            className={CN("favorite", `movie-${movie.id}`, {
              active: stateFavorites.includes(movie.id),
            })}
          >
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 21.35l-1.45-1.32C4.96 14.77 2 11.23 2 7.5 2 4.42 4.42 2 7.5 2c1.93 0 3.77.94 4.9 2.52C13.73 2.94 15.57 2 17.5 2 20.58 2 23 4.42 23 7.5c0 3.73-2.96 7.27-8.55 12.53L12 21.35z" />
            </svg>
          </button>
        </article>
      </section>

      {showBackdropTrailer && (
        <Trailers trailers={trailers} onCloseTrailer={showTrailer} />
      )}

      <hr className="line-break" />
    </div>
  )
}