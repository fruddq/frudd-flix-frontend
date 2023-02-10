import type { IMovie } from "../models/IMovie"

interface Props {
    movie: IMovie
}

export const ComponentMovie: React.FunctionComponent<Props> = ({ movie }) => {
    return (
        <div className="movie">
            <h2 className="movie-title">{movie.title}</h2>
            <section>
                <p className="movie-year">Year:{movie.release_date.substring(0, 4)}</p>
                <p className="popularity">Upvotes:{Math.ceil(movie.popularity)}</p>
            </section>
            <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
        </div>
    );
}