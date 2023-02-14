import { useEffect, useState } from "react";
import type { Props } from "../models/Props";
import { genreList } from "../services/config";


export const Movie: React.FunctionComponent<Props> = ({ movie }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isWatchLater, setIsWatchLater] = useState(false);

    useEffect(() => {
        const favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : [];
        setIsFavorite(favorites.includes(movie.id));
    }, [movie.id]);

    const genreNames = movie.genre_ids.map(id => {
        const genre = genreList.find(g => g.id === id);
        return genre ? genre.name : "";
    });

    const handleWatchLater = () => {
        const watchLater = localStorage.getItem('watchLater') ? JSON.parse(localStorage.getItem('watchLater')!) : [];
        if (isWatchLater) {
            const index = watchLater.indexOf(movie.id);
            if (index !== -1) {
                watchLater.splice(index, 1);
            }
            localStorage.setItem('watchLater', JSON.stringify(watchLater));
        } else {
            watchLater.push(movie.id);
            localStorage.setItem('watchLater', JSON.stringify(watchLater));
        }
        setIsWatchLater(!isWatchLater);
        console.log(watchLater)
    };

    // @TODO Ensure that there cannot be duplicates in localstorage
    const handleFavourite = () => {
        const favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')!) : [];
        if (isFavorite) {
            const index = favorites.indexOf(movie.id);
            if (index !== -1) {
                favorites.splice(index, 1);
            }
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } else {
            favorites.push(movie.id);
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
        setIsFavorite(!isFavorite);
        console.log(favorites)
    };

    const favoriteButton = isFavorite ? (
        <button onClick={handleFavourite} className={`favorite active movie-${movie.id}`}>
            &#10084;
        </button>
    ) : (
        <button onClick={handleFavourite} className={`favorite movie-${movie.id}`}>
            &#10084;
        </button>
    )

    const watchLaterButton = isWatchLater ? (
        <button onClick={handleWatchLater} className={`watchLater active movie-${movie.id}`}>
            Watch later
        </button>
    ) : (
        <button onClick={handleWatchLater} className={`watchLater movie-${movie.id}`}>
            Watch later
        </button>
    )

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
                {watchLaterButton}
                {favoriteButton}
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
};