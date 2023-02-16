import CN from 'classnames'
import { useCallback, useContext } from "react"

import type { PropsMovie } from "../models/Props"
import { genreList } from "../services/config"
import { EActionFavorites, storeFavorites } from "../stores/favorites"
import { EActionWatchLater, storeWatchLater } from '../stores/watchLater'

import placeHolder from '../assets/place-holder.png'

export const Movie: React.FunctionComponent<PropsMovie> = ({ movie }) => {

  const genreNames = movie.genre_ids.map(id => {
    const genre = genreList.find(g => g.id === id)
    return genre ? genre.name : ""
  })

  const dispatchWatchLater = useContext(storeWatchLater.contextDispatch)
  const stateWatchLater = useContext(storeWatchLater.contextState)

  const handleWatchLater: React.MouseEventHandler<HTMLButtonElement> = useCallback(
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

  const handleFavourite: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      event.preventDefault()

      dispatchFavorite({
        type: stateFavorites.includes(movie.id) ? EActionFavorites.Remove : EActionFavorites.Add,
        payload: movie.id
      })
    },
    [dispatchFavorite, stateFavorites, movie]
  )

  const handleTitleClick = () => {
    console.log(movie.title, movie.id)
  }

  const handleTitleKeyDown = (event: React.KeyboardEvent<HTMLHeadingElement>) => {
    if (event.key === 'Enter') {
      handleTitleClick()
    }
  }
  return (
    <div className="movie">
      <h2 className="movie-title" onClick={handleTitleClick} tabIndex={0} onKeyDown={handleTitleKeyDown}>{movie.title}</h2>

      <img
        className="movie-poster"
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : placeHolder}
        alt={movie.poster_path ? movie.title : 'No poster available'}
      />

      <section className="sort-info-container">
        <p className="sort-info-text movie-year">{movie.release_date.substring(0, 4)}</p>

        <p className="sort-info-text">Rating: {movie.vote_average.toFixed(1)}/10</p>

        <button onClick={handleWatchLater} className={CN('watch-later', `movie-${movie.id}`, {
          active: stateWatchLater.includes(movie.id)
        })}>
          Watch later
        </button>

        <button onClick={handleFavourite} className={CN('favorite', `movie-${movie.id}`, {
          active: stateFavorites.includes(movie.id)
        })}>
          &#10084;
        </button>

        <br />

        <section className="sort-info-text">
          {genreNames.map(name => (
            <button key={name} className="menu-item menu-button">
              {name}
            </button>
          ))}
        </section>
      </section>
    </div>
  )
}