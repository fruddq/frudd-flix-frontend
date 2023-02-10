import { useEffect, useState } from "react";
import type { IMovie } from "../models/ModelMovie";
import { ComponentMovie } from "./ComponentMovie";
import { fetchData } from "../services/fetchData";


export const ComponentHome: React.FunctionComponent = () => {

    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const data = await fetchData('home')
            setMovies(data)
        }
        fetchAndSetData()

    }, [])

    return (
        <div>
            {movies.map(movie => (
                <ComponentMovie key={movie.id} movie={movie} />
            ))}
        </div>
    )
}