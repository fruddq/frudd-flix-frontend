import { useCallback, useContext } from "react"
import ReactSlider from "react-slider"
import type { IGenre } from "../../models/Interfaces"
import { EActionBrowseMenu, storeBrowseMenu } from "../../stores/browseMenu"

// @TODO Change dropdown to relate to browse
export const BrowseMenuSlider: React.FunctionComponent = () => {
  const browseMenuData = useContext(storeBrowseMenu.contextState)
  const dispatchBrowseMenu = useContext(storeBrowseMenu.contextDispatch)

  const updateSliderValues = useCallback((min: number, max: number, genres: IGenre[]) => {
    dispatchBrowseMenu({
      type: EActionBrowseMenu.Replace,
      payload: { yearRange: { from: min, to: max }, genres }
    })
  }, [dispatchBrowseMenu])

  return (
    <div className="slider-container">
      <div className="slider-year-container">
        <p className="slider-min-text">{browseMenuData.yearRange.from}</p>
        <h2 className="browse-title">Year</h2>
        <p className="slider-max-text">{browseMenuData.yearRange.to}</p>
      </div>

      <ReactSlider
        defaultValue={[browseMenuData.yearRange.from, browseMenuData.yearRange.to]}
        className="slider"
        trackClassName="tracker"
        min={1950}
        max={2023}
        minDistance={0}
        step={1}
        withTracks={true}
        pearling={true}
        renderThumb={(props) => {
          return <div {...props} className="thumb"> </div>
        }}
        renderTrack={(props) => {
          return <div {...props} className="track"> </div>
        }}
        onChange={([min, max]) => {
          updateSliderValues(min!, max!, browseMenuData.genres)
        }}
      />
    </div>
  )
}

