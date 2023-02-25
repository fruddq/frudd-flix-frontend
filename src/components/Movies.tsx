import { useMemo } from "react"
import type { IMovie } from "../models/Interfaces"
import { Movie } from "./Movie"


const renderMovies = (movies: IMovie[]) => {
  return movies.map((movie) => (
    <Movie key={movie.id} movie={movie} />
  ))
}

export interface IProps {
  readonly page: number
  readonly totalPages: number
  readonly movies: IMovie[]
  readonly navigateNext: () => void
  readonly navigatePrevious: () => void
  readonly navigateFirstPage: () => void
  readonly navigateLastPage: () => void
}

export const Movies: React.FunctionComponent<IProps> = ({
  page,
  movies,
  totalPages,
  navigateNext,
  navigatePrevious,
  navigateFirstPage,
  navigateLastPage
}) => {
  const moviesComponents = useMemo(() =>
    renderMovies(movies), [renderMovies, movies]
  )

  return (
    <>
      {/* rome-ignore lint/correctness/noChildrenProp: <explanation> */}
      <div className="movies-container" children={moviesComponents} />

      <div className="pagination-container">
        <button
          className={`first-btn${page === 1 ? ' disabled' : ''}`}
          disabled={page === 1}
          onClick={navigateFirstPage}
          aria-label="First page"
        >
          «
        </button>

        <button className={`previous-btn${page === 1 ? ' disabled' : ''}`}
          disabled={page === 1}
          onClick={navigatePrevious}
          aria-label="Previous page"
        >
          ‹
        </button>

        <p className="total-pages"><b className="current-page-numb">{page}</b> of {totalPages}</p>
        <button className={`next-btn${page === totalPages ? ' disabled' : ''}`}
          disabled={page === totalPages}
          onClick={navigateNext}
          aria-label="Next page"
        >
          ›
        </button>

        <button
          className={`last-btn${page === totalPages ? ' disabled' : ''}`}
          disabled={page === totalPages}
          onClick={navigateLastPage}
          aria-label="Last page"
        >
          »
        </button>
      </div>
    </>
  )
}


