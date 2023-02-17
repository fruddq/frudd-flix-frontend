import { useContext } from "react"
import { storeWatchLater } from "../stores/watchLater"
import { ErrorMessage } from "./ErrorMessage"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { MovieList } from "./MovieList"

export const WatchLater: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {

  const watchLater = useContext(storeWatchLater.contextState)

  if (watchLater.length < 1) {
    return (<>
      <Header />
      <ErrorMessage errorMessage="No saved movies" />
      <Footer />
    </>)
  }

  return (
    <>
      <MovieList page={page} movieIDs={watchLater} />
    </>
  )
};

