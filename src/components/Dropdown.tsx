import { useCallback, useContext } from "react"
import ReactSlider from "react-slider"
import { navigate } from "wouter/use-location"
import type { IGenre } from "../models/Interfaces"
import { navigateAndReturnNull } from "../services/navigateAndReturnNull"
import { EActionDropdown, storeDropdown } from "../stores/dropdown"

export const Dropdown: React.FunctionComponent = () => {
  const dropdownInfo = useContext(storeDropdown.contextState)
  const dispatchDropdown = useContext(storeDropdown.contextDispatch)

  const handleGenreClick = useCallback((id: number) => {
    const updatedGenres = dropdownInfo.genres.map(genre => {
      if (genre.id === id) {
        return { ...genre, selected: !genre.selected }
      }
      return genre
    })

    dispatchDropdown({
      type: EActionDropdown.Replace,
      payload: { yearRange: { from: dropdownInfo.yearRange.from, to: dropdownInfo.yearRange.to }, genres: updatedGenres }
    })
  }, [dropdownInfo])

  const handleFindMovies = () => {
    const selectedGenreNames = dropdownInfo.genres.filter(genre => genre.selected).map(genre => genre.name).join('-')
    return navigateAndReturnNull(() => {
      navigate(`/browse/from=${dropdownInfo.yearRange.from}/to=${dropdownInfo.yearRange.to}/genres=${selectedGenreNames}/1`)
    })
  }

  const handleDropdownChange = useCallback((min: number, max: number, genres: IGenre[]) => {
    dispatchDropdown({
      type: EActionDropdown.Replace,
      payload: { yearRange: { from: min, to: max }, genres }
    })
  }, [dispatchDropdown])

  return (
    <div className="dropdown">
      <h2 className="dropdown-title">Year</h2>

      {/* <div className="dropdown-header">
        <h2 className="slider-title">Year</h2>
      </div> */}

      <div className="slider-container">
        <p className="slider-min-text">{dropdownInfo.yearRange.from}</p>
        <ReactSlider
          defaultValue={[dropdownInfo.yearRange.from, dropdownInfo.yearRange.to]}
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
            handleDropdownChange(min!, max!, dropdownInfo.genres)
          }}
        />
        <p className="slider-max-text">{dropdownInfo.yearRange.to}</p>
      </div>

      <h2 className="dropdown-title">Genre</h2>

      <div className="dropdown-genres">
        {dropdownInfo.genres.map((genre) => (
          <button
            className={`button-genre ${genre.selected ? 'selected' : ''}`}
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      <button className="menu-filter-btn" onClick={handleFindMovies}>
        Find Movies
      </button>

    </div>
  )
}


