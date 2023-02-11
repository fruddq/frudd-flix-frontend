import { genreList } from "../services/config"
import ReactSlider from 'react-slider'
import { useState } from "react";

export const ComponentDropdown: React.FunctionComponent = () => {
    const handleGenreClick = (id: number, name: string) => {
        console.log(`Clicked genre: ${name}, id: ${id}`);
    };
    const handleFindMovies = () => {
        console.log('hello');
    };

    const [min, setMin] = useState(1950)
    const [max, setMax] = useState(2023)

    return (
        <div className="dropdown">
            <div className="dropdown-header">
                <p className="slider-min-text">
                    {min}
                </p>
                <h2 className="slider-title">Year</h2>
                <p className="slider-max-text">
                    {max}
                </p>
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
                        // @TODO Check why min max can be undefined
                        setMin(min!)
                        setMax(max!)
                    }}
                />
            </div>

            <h2 className="slider-title">Genre</h2>
            <div className="dropdown-genres">
                {genreList.map((genre) => (
                    <button className="button-genre" key={genre.id} onClick={() => handleGenreClick(genre.id, genre.name)}>
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

