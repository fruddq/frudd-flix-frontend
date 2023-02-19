import { useCallback, useState } from "react"
import { Loader } from "./Loader"

export interface ITrailers {
  trailers: string[]
  onCloseBackdrop: () => void
}

export const Trailers: React.FunctionComponent<ITrailers> = ({ trailers, onCloseBackdrop }) => {
  const [isLoaded, setIsloaded] = useState(false)
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0)

  const handleCloseBackdrop = useCallback(() => {
    onCloseBackdrop()
  }, [onCloseBackdrop])

  const handleLoad = useCallback(() => {
    setIsloaded(true)
  }, [setIsloaded])

  const handleNextTrailer = useCallback(() => {
    setCurrentTrailerIndex(currentTrailerIndex + 1)
    setIsloaded(false)
  }, [setIsloaded, setCurrentTrailerIndex, currentTrailerIndex])

  const handlePreviousTrailer = useCallback(() => {
    setCurrentTrailerIndex(currentTrailerIndex - 1)
    setIsloaded(false)
  }, [setIsloaded, setCurrentTrailerIndex, currentTrailerIndex])

  return (
    <div className="backdrop" >
      <button className="backdrop-exit" onClick={handleCloseBackdrop}>
        &times;
      </button>

      {!isLoaded && <Loader />}

      <iframe
        width="95%"
        height="40%"
        src={trailers[currentTrailerIndex]}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={handleLoad}
        style={{ display: isLoaded ? 'block' : 'none' }}
      />

      {isLoaded &&
        <div className="trailer-navigation">
          <button
            onClick={handlePreviousTrailer}
            disabled={currentTrailerIndex === 0}
            className={`trailer-previous-btn${currentTrailerIndex === 0 ? ' disabled' : ''}`}>
            ‹
          </button>

          <p className="total-pages">
            <b className="current-page-numb">{currentTrailerIndex + 1}</b> of {trailers.length}
          </p>

          <button
            onClick={handleNextTrailer}
            disabled={currentTrailerIndex === trailers.length - 1}
            className={`trailer-next-btn${currentTrailerIndex === trailers.length - 1 ? ' disabled' : ''}`}>
            ›
          </button>
        </div>}
    </div>
  )
}