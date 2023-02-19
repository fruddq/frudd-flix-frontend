import { useCallback, useEffect, useState } from "react"
import ReactSlider from "react-slider"
import type { IGenre } from "../models/Interfaces"
import { genreList } from "../services/config"

export interface IDropdown {
  readonly genres: IGenre[]
  readonly from: number
  readonly to: number
}

export const Dropdown: React.FunctionComponent = () => {
  const [dropdownInfo, setDropdownInfo] = useState<IDropdown>({
    genres: genreList.map(genre => ({ ...genre, selected: false })),
    from: 1950,
    to: 2023,
  })

  useEffect(() => {
    const storedDropdownInfo = localStorage.getItem('browse')

    if (storedDropdownInfo) {
      setDropdownInfo(JSON.parse(storedDropdownInfo))
    }
  }, [setDropdownInfo])

  const handleGenreClick = useCallback((id: number) => {
    const updatedGenres = dropdownInfo.genres.map((genre) => {
      if (genre.id === id) return { ...genre, selected: !genre.selected }
      return genre
    })

    const updatedDropdownInfo = {
      from: dropdownInfo.from,
      to: dropdownInfo.to,
      genres: updatedGenres,
    }

    setDropdownInfo(updatedDropdownInfo)

    localStorage.setItem('browse', JSON.stringify(updatedDropdownInfo))
  },
    [setDropdownInfo, dropdownInfo]
  )
  console.log(dropdownInfo)

  const handleSliderChange = useCallback((min: number, max: number) => {
    const updatedDropdownInfo = {
      genres: dropdownInfo.genres,
      from: min,
      to: max,
    }
    setDropdownInfo(updatedDropdownInfo)

    localStorage.setItem('browse', JSON.stringify(updatedDropdownInfo))
  }, [setDropdownInfo])

  return (
    <div className="dropdown">
      <h2 className="dropdown-title">Year</h2>

      <div className="slider-container">
        <p className="slider-min-text">{dropdownInfo.from}</p>
        <ReactSlider
          defaultValue={[dropdownInfo.from, dropdownInfo.to]}
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
            handleSliderChange(min!, max!)
          }}
        />
        <p className="slider-max-text">{dropdownInfo.to}</p>
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

      {/* <button className="menu-filter-btn" onClick={handleFindMovies}>
        Find Movies
      </button> */}

    </div>
  )
}


