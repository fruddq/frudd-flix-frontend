import { useContext } from "react"
import { storeFavorites } from "../stores/favorites"
import { MovieList } from "./MovieList"

export const Favorites: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {

  const favorites = useContext(storeFavorites.contextState)

  return (
    <>
      <MovieList page={page} movieIDs={favorites} />
    </>
  )
};

