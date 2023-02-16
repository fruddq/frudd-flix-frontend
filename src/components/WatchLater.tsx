import { useContext } from "react"
import { storeWatchLater } from "../stores/watchLater"
import { MovieList } from "./MovieList"

export const WatchLater: React.FunctionComponent<{ readonly page: number }> = ({ page }) => {

  const watchLater = useContext(storeWatchLater.contextState)

  return (
    <>
      <MovieList page={page} movieIDs={watchLater} />
    </>
  )
};

