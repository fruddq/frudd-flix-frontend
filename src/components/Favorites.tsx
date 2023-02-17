import { useContext } from "react"
import { navigate } from "wouter/use-location"
import { navigateAndReturnNull } from "../services/navigateAndReturnNull"
import { storeFavorites } from "../stores/favorites"
import { ErrorComplete } from "./ErrorComplete"
import { MovieList } from "./MovieList"

export const Favorites: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {
  const favorites = useContext(storeFavorites.contextState)
  const paginationNumber = page + 19 * (page - 1)
  const totalPages = Math.ceil(favorites.length / 20)
  //check total pages



  if (favorites.length < 1) {
    return (<>
      <ErrorComplete errorMessage="No movies favorited" />
    </>)
  }

  if (page > totalPages + 1) {
    return (<>
      <ErrorComplete errorMessage={`Only ${totalPages} pages available`} />
    </>)
  }

  console.log("favorites", favorites.length, "pagination number", page + 19 * (page - 1))

  if (favorites.length < paginationNumber && page !== 1) {
    console.log('inside if')
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

