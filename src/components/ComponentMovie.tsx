import type { IMovie } from "../models/ModelMovie"

interface Props {
    movie: IMovie
}

export const ComponentMovie: React.FunctionComponent<Props> = ({ movie }) => {
    return (
        <div className="movie">
            <h2 className="movie-title">{movie.title}</h2>
            <img
                className="movie-poster"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
            />
        </div>
    );
}