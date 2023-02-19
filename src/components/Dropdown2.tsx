import { genreList } from "../services/config"
import { useState } from "react"
import ReactSlider from "react-slider"

interface Genre {
  id: number
  name: string
  selected: boolean
}

export const Dropdown: React.FunctionComponent = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(genreList.map(genre => ({ ...genre, selected: false })))
  const [min, setMin] = useState(1950)
  const [max, setMax] = useState(2023)

  const handleGenreClick = (id: number) => {
    const updatedGenres = selectedGenres.map(genre => {
      if (genre.id === id) {
        return { ...genre, selected: !genre.selected }
      }
      return genre
    })

    setSelectedGenres(updatedGenres)
  }

  //http://localhost:5173/browse/?from=100&to=200&genres=action-comedy&page=3
  // to={`/browse?from=${from}&to=${to}&genres=${genres}&page=${page}`}
  // const handleFindMovies = () => {
  //   const selectedGenreNames = selectedGenres.filter(genre => genre.selected).map(genre => genre.name).join('-')
  //   navigate(`/browse?from=${min}&to=${max}&genres=${selectedGenreNames}&page=1`)
  // }

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

        <button className="menu-filter-btn">
          Find Movies
        </button>
      </div>
    </div>
  )
}