import { useCallback, useEffect, useState } from "react"
import { fetchTrailers } from "../services/fetchTrailers"
import ReactPlayer from 'react-player/youtube'
import { ErrorMessage } from "./ErrorMessage"
import { VideoPlayer } from "./VideoPlayer"
import type { PropsTrailers } from "../models/Props"



export const Trailers: React.FunctionComponent<PropsTrailers> =
  ({ movieID, onCloseBackdrop }) => {

    const [trailers, setTrailers] = useState<string[]>([])


    const handleTitleClick = () => {
      onCloseBackdrop()
    }

    const fetchAndSetData = useCallback(async () => {
      const trailerKeys = await fetchTrailers(movieID)
      setTrailers(trailerKeys.map(trailer => `https://www.youtube.com/embed/${trailer}`))
    }, [])


    useEffect(() => {
      fetchAndSetData()

    }, [])

    return (
      <div className="backdrop" >
        <button className="backdrop-exit" onClick={handleTitleClick}>
          &times;
        </button>

        {/* {trailers.length > 0 ? (
          <ReactPlayer
            className="youtube-player"
            url={trailers}
            width="100%"
            height="50%"
            controls={true}
            origin='https://www.youtube.com'
          />
        ) : (
          <ErrorMessage errorMessage="No trailers available" />
        )} */}

        {/* @TODO Fix pagination for this. loading message */}
        <VideoPlayer src={trailers[0] as string} />

      </div>
    )
  }
