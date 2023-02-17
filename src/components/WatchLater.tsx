import { useContext } from "react"
import { navigate } from "wouter/use-location"
import { navigateAndReturnNull } from "../services/navigateAndReturnNull"
import { storeWatchLater } from "../stores/watchLater"
import { ErrorComplete } from "./ErrorComplete"
import { MovieList } from "./MovieList"

export const WatchLater: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {
  const watchLater = useContext(storeWatchLater.contextState)

  if (watchLater.length < 1) {
    return (<>
      <ErrorComplete errorMessage="No saved movies" />
    </>)
  }

  console.log(watchLater.length)
  if (watchLater.length < page + 19 && page !== 1) {
    console.log("inside IF")

    return navigateAndReturnNull(() => {
      navigate(`/watch-later/${page - 1}`)
    })
  }

  return (
    <>
      <MovieList page={page} movieIDs={watchLater} />
    </>
  )
};

