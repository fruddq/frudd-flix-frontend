import { genreList } from "../services/config"
import { useState } from "react";
import { Slider } from "./Slider";



interface Genre {
  id: number;
  name: string;
  selected: boolean;
}

export const Dropdown: React.FunctionComponent = () => {
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>(genreList.map(genre => ({ ...genre, selected: false })));

  const handleGenreClick = (id: number) => {
    const updatedGenres = selectedGenres.map(genre => {
      if (genre.id === id) {
        return { ...genre, selected: !genre.selected };
      }
      return genre;
    });
    setSelectedGenres(updatedGenres);
  };

  const handleFindMovies = () => {
  };

  return (
    <div className="dropdown">
      <Slider />
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
  );
};
