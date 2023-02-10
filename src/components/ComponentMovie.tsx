import type { IMovie } from "../models/IMovie"

interface Props {
    movie: IMovie
}

export const ComponentMovie: React.FunctionComponent<Props> = ({ movie }) => {
    return (
        <div className="movie">
            <h2 className="movie-title">{movie.title}</h2>
            {/* <h3 className="movie-year">{movie.release_date}</h3> */}
            <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
        </div>
    );
}