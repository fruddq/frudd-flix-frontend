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

    if (page > 500) {
        return (
            <div>
                <p className="error-message">This page does not exist</p>
            </div>
        )
    }

    // @TODO Make sure to check that page number EXISTS before rendering
    // @TODO When user inputs a non existing page, show them why

    const [movies, setMovies] = useState<IMovie[]>([])
    const [totalPages, setTotalPages] = useState(0)

    const moviesComponents = useMemo(() =>
        renderMovies(movies), [renderMovies, movies]
    )

    const fetchAndSetData = useCallback(async () => {
        const data = await fetchData({ page })

        setMovies(data.results)
        setTotalPages(data.total_pages)

        if (page > totalPages) {
            return (
                <div>
                    <p className="error-message">This page does not exist</p>
                </div>
            )
        }

    }, [page, setMovies, setTotalPages]);

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
                    Page {page} of Total pages: {totalPages > 500 ? 500 : totalPages}
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


// i want my pagination to have a couple of clickable numbers to handle page, already have a next button and a previous button.
// But i want it to show the two nearest numbers upwards and two nearest number downards of the parameter page. but it shouldnt be able to show numbers downards below 0.
// That means that if page = 1 then it should show page numbers 1,2,3,4,5. while highlighting current page

// if page = 2 then it should show page numbers 1,2,3,4,5. while highlighting current page
// if page = 3 then it should show page numbers 1,2,3,4,5. while highlighting current page
// if page = 4 then it should show page numbers 2,3,4,5,6. while highlighting current page
// if page = 5 then it should show page numbers 5,6,7,8,9. while highlighting current page