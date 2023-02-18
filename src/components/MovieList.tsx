import { Movies } from "./Movies"
import { Header } from "./Header"
import { Footer } from "./Footer"
import type { PropsMovieList } from "../models/Props"

export const MovieList: React.FunctionComponent<PropsMovieList> = ({ page, movieIDs, query, from, to, genres }) =>
(
  <>
    <Header />
    <Movies page={page} movieIDs={movieIDs} query={query} from={from} to={to} genres={genres} />
    <Footer />
  </>
)


