import { useContext } from "react"
import { navigate } from "wouter/use-location"
import { storeFavorites } from "../stores/favorites"
import { ErrorComplete } from "./ErrorComplete"
import { MovieList } from "./MovieList"

const navigateAndReturnNull = (callback: () => void) => {
  callback()
  return null
}

export const Favorites: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {
  const favorites = useContext(storeFavorites.contextState)

  if (favorites.length < 1) {
    return (<>
      <ErrorComplete errorMessage="No movies favorited" />
    </>)
  }

  if (favorites.length < page + 19 && page !== 1) {
    // navigate(`/favorites/${page - 1}`)
    // return null
    return navigateAndReturnNull(() => {
      navigate(`/favorites/${page - 1}`)
    })
  }

  return (
    <>
      <MovieList page={page} movieIDs={favorites} />
    </>
  )
};

