import { useCallback, useEffect, useMemo, useState } from "react";
import type { IMovie } from "../models/IMovie";
import { Movie } from "./Movie";
import { fetchData } from "../services/fetchData";
import { navigate } from "wouter/use-location";
// import { DOM } from "../modules/DOM";

const renderMovies = (movies: IMovie[]) => {
    return movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
    ))
}

interface Props {
    readonly page: number
    readonly movieIDs?: string | undefined
}

export const Movies: React.FunctionComponent<Props> = ({ page, movieIDs }) => {

    let arrayMovieIDs: number[] = []

    if (movieIDs) {
        arrayMovieIDs = JSON.parse(movieIDs)
    }


    if (page > 500) {
        return (
            <div>
                <p className="error-message">This page does not exist</p>
            </div>
        )
    }

    const [movies, setMovies] = useState<IMovie[]>([])
    const [totalPages, setTotalPages] = useState(1)

    const moviesComponents = useMemo(() =>
        renderMovies(movies), [renderMovies, movies]
    )


    // const fetchAndSetData = useCallback(async () => {

    //     if (arrayMovieIDs.length > 0) {
    //         const dataPromises = arrayMovieIDs.map(movieId => fetchData({ route: 'id', movieID: movieId }));
    //         const savedMovies = await Promise.all(dataPromises);

    //         setMovies(savedMovies)
    //         // @TODO settotal page should not be 1, pagination
    //         setTotalPages(1)

    //     }
    //     else {
    //         const data = await fetchData({ page, route: 'discover' })

    //         setMovies(data.results)
    //         setTotalPages(data.total_pages)

    //         if (page > totalPages) {
    //             return (
    //                 <div>
    //                     <p className="error-message">This page does not exist</p>
    //                 </div>
    //             )
    //         }
    //     }

    // }, [page, setMovies, setTotalPages, movies]);

    // useEffect(() => {
    //     fetchAndSetData();
    // }, [fetchAndSetData, movieIDs]);

    const handleNextPage = useCallback(() => {
        window.scrollTo(0, 0)
        navigate(`/movies/${page + 1}`);
    }, [page]);

    const handlePrevPage = useCallback(() => {
        window.scrollTo(0, 0)
        navigate(`/movies/${page - 1}`);
    }, [page]);

    console.log("helo")

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
                    Page {page} of {totalPages > 500 ? 500 : totalPages}
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

// const query = DOM.getters.URLQuery()

