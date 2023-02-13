import { useEffect, useState } from "react";
import type { IMovie } from "../models/IMovie";
import { ComponentMovie } from "./ComponentMovie";
import { fetchData } from "../services/fetchData";

export const ComponentMovies: React.FunctionComponent = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchAndSetData = async () => {
            const data = await fetchData({ page });
            setMovies(data.results);
            setTotalPages(data.total_pages);
        };

        fetchAndSetData();
    }, [page]);



    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        setPage(page - 1);

    };

    return (
        <>
            <div className="movies-container">
                {movies.map((movie) => (
                    <ComponentMovie key={movie.id} movie={movie} />
                ))}
            </div>
            <div className="pagination-container">
                <button
                    disabled={page === 1}
                    onClick={handlePrevPage}
                >
                    Previous
                </button>

                <p className="total-pages">
                    Page {page} of Total pages: {totalPages}
                </p>
                <button
                    disabled={page === totalPages}
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </>
    );
};