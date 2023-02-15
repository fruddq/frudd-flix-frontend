import CN from 'classnames'
import lodash from 'lodash'
import { useCallback, useContext, useEffect, useState } from "react"

import type { Props } from "../models/Props"
import { genreList } from "../services/config"
import { storeFavorites } from "../stores/favorites"
import { EActionNumberArray } from "../stores/numberArray"

export const Movie: React.FunctionComponent<Props> = ({ movie }) => {
  const [isWatchLater, setIsWatchLater] = useState(false)

  useEffect(() => {
    const watchLater = localStorage.getItem('watchLater') ? JSON.parse(localStorage.getItem('watchLater')!) : []

    setIsWatchLater(watchLater.includes(movie.id))
  }, [movie.id])

  const genreNames = movie.genre_ids.map(id => {
    const genre = genreList.find(g => g.id === id)
    return genre ? genre.name : ""
  })

  const handleWatchLater = () => {
    const watchLater = localStorage.getItem('watchLater') ? JSON.parse(localStorage.getItem('watchLater')!) : []
    const updatedWatchLater = isWatchLater ? lodash.without(watchLater, movie.id) : lodash.uniq([...watchLater, movie.id])

    localStorage.setItem('watchLater', JSON.stringify(updatedWatchLater))

    setIsWatchLater(!isWatchLater)
    console.log(updatedWatchLater)
  }


  const dispatchFavorite = useContext(storeFavorites.contextDispatch)
  const stateFavorites = useContext(storeFavorites.contextState)

  const handleFavourite: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      console.log("Button was clicked")
      event.preventDefault()

      dispatchFavorite({
        type: stateFavorites.includes(movie.id) ? EActionNumberArray.Remove : EActionNumberArray.Add,
        payload: movie.id
      })
    },
    [dispatchFavorite, stateFavorites, movie]
  )

  const watchLaterButton = isWatchLater ? (
    <button onClick={handleWatchLater} className={`watchLater movie-${movie.id} active`}>
      Watch later
    </button>
  ) : (
    <button onClick={handleWatchLater} className={`watchLater movie-${movie.id}`}>
      Watch later
    </button>
  )

  return (
    <div className="movie">
      <h2 className="movie-title">{movie.title}</h2>

      <img
        className="movie-poster"
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />

      <section className="sort-info-container">
        <p className="sort-info-text movie-year">{movie.release_date.substring(0, 4)}</p>

        <p className="sort-info-text">Rating: {movie.vote_average}/10</p>

        {watchLaterButton}

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