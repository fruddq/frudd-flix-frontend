import type { Props } from "../models/Props";
import { genreList } from "../services/config";


export const Movie: React.FunctionComponent<Props> = ({ movie }) => {

    const genreNames = movie.genre_ids.map(id => {
        const genre = genreList.find(g => g.id === id);
        return genre ? genre.name : "";
    });

    const handleWatchLater = () => {
    };

    const handleFavourite = () => {
    };

    return (
        <div className="movie">
            <h2 className="movie-title">{movie.title}</h2>
            <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
            <section className="sort-info-container">
                <p className="sort-info-text movie-year">{movie.release_date.substring(0, 4)}</p>
                <p className="sort-info-text">Rating: {movie.vote_average}/10</p>
                <button onClick={handleWatchLater}>Watch later</button>
                <button onClick={handleFavourite}>&#10084;</button>
                <br />
                <section className="sort-info-text">
                    {genreNames.map(name => (
                        <button key={name} className="menu-item menu-button">
                            {name}
                        </button>
                    ))}
                </section>
            </section>
        </div>
    );
}