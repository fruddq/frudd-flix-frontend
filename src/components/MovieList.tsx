import { Movies } from "./Movies"
import { Header } from "./Header"
import { Footer } from "./Footer"
import type { IProps as IPropsMovies } from './Movies'
import type { movieID } from "../models/Interfaces"

interface PropsMovieList {
  readonly page: number
  readonly movieIDs?:
  IPropsMovies['movieIDs']
  readonly query?: string
  readonly from?: number
  readonly to?: number
  readonly genres?: movieID[]
}

export const MovieList: React.FunctionComponent<PropsMovieList> = ({ page, movieIDs, query, from, to, genres }) => {

  return (
    <>
      <Header />
      <Movies page={page} movieIDs={movieIDs} query={query} from={from} to={to} genres={genres} />
      <Footer />
    </>
  )
};

