import { useCallback, useEffect, useState } from "react"
import { fetchTrailers } from "../services/fetchTrailers"
import { ErrorMessage } from "./ErrorMessage"
import { VideoPlayer } from "./VideoPlayer"
import type { PropsTrailers } from "../models/Props"



export const Trailers: React.FunctionComponent<PropsTrailers> = ({ trailers, onCloseBackdrop }) => {


  const handleCloseBackdrop = useCallback(() => {
    onCloseBackdrop()
  }, [onCloseBackdrop()])

  return (
    <div className="backdrop" >
      <button className="backdrop-exit" onClick={handleCloseBackdrop}>
        &times;
      </button>

      <VideoPlayer src={trailers[0] as string} />

    </div>
  )
}
