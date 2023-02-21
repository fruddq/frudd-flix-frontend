import { useCallback, useContext } from "react"
import { useNavigate } from "react-router-dom"
import ReactSlider from "react-slider"
import type { IGenre } from "../models/Interfaces"
import { EActionBrowseMenu, storeBrowseMenu } from "../stores/browseMenu"

// @TODO Change dropdown to relate to browse
export const BrowseMenu: React.FunctionComponent<{
  readonly toggleDropdown: () => void
}> = ({ toggleDropdown }) => {
  const browseMenuData = useContext(storeBrowseMenu.contextState)
  const dispatchBrowseMenu = useContext(storeBrowseMenu.contextDispatch)

  const updateGenres = useCallback((id: number) => {
    const updatedGenres = browseMenuData.genres.map(genre => {
      if (genre.id === id) {
        return { ...genre, selected: !genre.selected }
      }
      return genre
    })

    dispatchBrowseMenu({
      type: EActionBrowseMenu.Replace,
      payload: { yearRange: { from: browseMenuData.yearRange.from, to: browseMenuData.yearRange.to }, genres: updatedGenres }
    })
  }, [browseMenuData])

  const navigate = useNavigate()

  const findMovies = useCallback(() => {
    const selectedGenreNames = browseMenuData.genres.filter(genre => genre.selected).map(genre => genre.name).join('-')
    navigate(`/browse?from=${browseMenuData.yearRange.from}&to=${browseMenuData.yearRange.to}&genres=${selectedGenreNames}&page=1`)
    toggleDropdown()
  }, [toggleDropdown, navigate, browseMenuData])

  const updateSliderValues = useCallback((min: number, max: number, genres: IGenre[]) => {
    dispatchBrowseMenu({
      type: EActionBrowseMenu.Replace,
      payload: { yearRange: { from: min, to: max }, genres }
    })
  }, [dispatchBrowseMenu])

  return (
    <div className="browse">
      <h2 className="browse-title">Year</h2>

      <div className="slider-container">
        <p className="slider-min-text">{browseMenuData.yearRange.from}</p>
      </div>

      <div className="slider-container">
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
        <p className="slider-max-text">{browseMenuData.yearRange.to}</p>
      </div>


      <h2 className="browse-title">Genre</h2>

      <div className="browse-genres">
        {browseMenuData.genres.map((genre) => (
          <button
            className={`button-genre ${genre.selected ? 'selected' : ''}`}
            key={genre.id}
            onClick={() => updateGenres(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <button className="menu-filter-btn" onClick={findMovies}>
        Find Movies
      </button>
    </div>
  )
}

