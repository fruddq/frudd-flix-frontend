import { useContext } from "react"
import { storeFavorites } from "../stores/favorites"
import { ErrorMessage } from "./ErrorMessage"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { MovieList } from "./MovieList"

export const Favorites: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {

  const favorites = useContext(storeFavorites.contextState)

  if (favorites.length < 1) {
    return (<>
      <Header />
      <ErrorMessage errorMessage="No movies favorited" />
      <Footer />
    </>)
  }

  return (
    <>
      <MovieList page={page} movieIDs={favorites} />
    </>
  )
};

