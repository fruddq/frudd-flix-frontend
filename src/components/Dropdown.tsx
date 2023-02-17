import { genreList } from "../services/config"
import { useCallback, useContext, useState } from "react"
import ReactSlider from "react-slider"
import { navigate } from "wouter/use-location"
import type { IGenre } from "../models/Interfaces"
import { EActionDropdown, storeDropdown } from "../stores/dropdown"

export const Dropdown: React.FunctionComponent = () => {
  const [selectedGenres, setSelectedGenres] = useState<IGenre[]>(genreList.map(genre => ({ ...genre, selected: false })))
  const [min, setMin] = useState(1950)
  const [max, setMax] = useState(2023)

  const dispatchDropdown = useContext(storeDropdown.contextDispatch)
  const dropdownInfo = useContext(storeDropdown.contextState)

  const handleGenreClick = useCallback((id: number) => {
    const updatedGenres = selectedGenres.map(genre => {
      if (genre.id === id) {
        return { ...genre, selected: !genre.selected }
      }
      return genre
    })

    setSelectedGenres(updatedGenres)
    console.log(selectedGenres)

    dispatchDropdown({
      type: EActionDropdown.Replace,
      payload: { yearRange: { from: min, to: max }, genres: selectedGenres }
    })

    // console.log(dropdownInfo)

  }, [selectedGenres])

  const test = useContext(storeDropdown.contextState)

  // console.log(test)

  const handleFindMovies = () => {
    const selectedGenreNames = selectedGenres.filter(genre => genre.selected).map(genre => genre.name).join('-')
    navigate(`/browse?from=${min}&to=${max}&genres=${selectedGenreNames}&page=1`)
  }

  return (
    <div className="dropdown">

      <div className="dropdown-header">
        <p className="slider-min-text">{min}</p>
        <h2 className="slider-title">Year</h2>
        <p className="slider-max-text">{max}</p>
      </div>

      <div className="slider-container">
        <ReactSlider
          defaultValue={[min, max]}
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
            setMin(min!)
            setMax(max!)
          }}
        />
      </div>

      <h2 className="slider-title">Genre</h2>

      <div className="dropdown-genres">
        {selectedGenres.map((genre) => (
          <button
            className={`button-genre ${genre.selected ? 'selected' : ''}`}
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}

        <button className="menu-filter-btn" onClick={handleFindMovies}>
          Find Movies
        </button>
      </div>
    </div>
  )
}


