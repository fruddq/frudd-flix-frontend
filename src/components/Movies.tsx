import { useCallback, useEffect, useMemo, useState } from "react";
import type { IMovie } from "../models/IMovie";
import { Movie } from "./Movie";
import { fetchData } from "../services/fetchData";
import { navigate } from "wouter/use-location";
import { DOM } from "../modules/DOM";

const renderMovies = (movies: IMovie[]) => {
    return movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
    ))
}

interface Props {
    readonly page: number;
}

export const Movies: React.FunctionComponent<Props> = ({ page }) => {

    const query = DOM.getters.URLQuery()

    console.log(query)

    // @TODO Make sure to check that page number EXISTS before rendering
    // @TODO When user inputs a non existing page, show them why

    const [movies, setMovies] = useState<IMovie[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    const moviesComponents = useMemo(() =>
        renderMovies(movies), [renderMovies, movies]
    )

    const fetchAndSetData = useCallback(async () => {
        const data = await fetchData({ page });
        setMovies(data.results);
        setTotalPages(data.total_pages);
    }, [page, setMovies, setTotalPages]);
    // if (page > 1000) {
    //     return (
    //         <div>
    //             <p className="error-message">This page does not exist</p>
    //         </div>
    //     )
    // }

    console.log(totalPages)

    useEffect(() => {
        fetchAndSetData();
    }, [fetchAndSetData]);

    const handleNextPage = useCallback(() => {
        window.scrollTo(0, 0)
        navigate(`/movies/${page + 1}`);
    }, [page]);

    const handlePrevPage = useCallback(() => {
        window.scrollTo(0, 0)
        navigate(`/movies/${page - 1}`);
    }, [page]);

    return (
        <>
            {/* rome-ignore lint/correctness/noChildrenProp: <explanation> */}
            <div className="movies-container" children={moviesComponents} />
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
                {/* @TODO USE a tag for pagination numbers */}
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