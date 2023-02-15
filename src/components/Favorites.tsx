// @TODO should render movies from favorites local storage
// get favorites from localstorage
// send it into MovieList

import { useContext } from "react"
import { storeFavorites } from "../stores/favorites"
import { MovieList } from "./MovieList"

export const Favorites: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {

  // get favorites from reducerState

  const favorites = useContext(storeFavorites.contextState)
  // const favorites = localStorage.getItem('favorites') || undefined
  // console.log(favorites)
  return (
    <>
      <MovieList page={page} movieIDs={favorites} />
    </>
  )
};

