
import { useEffect, useState } from "react";
import type { IMovie } from "../models/IMovie";
import { ComponentMovie } from "./ComponentMovie";
import { fetchData } from "../services/fetchData";


export const ComponentMovies: React.FunctionComponent = () => {


    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const data = await fetchData('home')
            setMovies(data)
        }
        fetchAndSetData()

    }, [])

    return (
        <>
            <div className="movies-container">
                {movies.map(movie => (
                    <ComponentMovie key={movie.id} movie={movie} />
                ))}
            </div>
        </>
    )
}

