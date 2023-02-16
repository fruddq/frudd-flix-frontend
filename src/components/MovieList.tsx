import { Movies } from "./Movies"
import { Header } from "./Header"
import { Footer } from "./Footer"
import type { IProps as IPropsMovies } from './Movies'

export const MovieList: React.FunctionComponent<{ readonly page: number; readonly movieIDs?: IPropsMovies['movieIDs']; readonly query?: string }> = ({ page, movieIDs, query }) => {
  const pageValue = Number(page)

  if (!Number.isInteger(pageValue) || pageValue < 1) {
    return (
      <div>
        <Header />
        <p className="error-message">Page must be a number over 0</p>
      </div>
    )
  }

  return (
    <>
      <Header />
      <Movies page={page} movieIDs={movieIDs} query={query} />
      <Footer />
    </>
  )
};

