import type { IMovie, movieID } from "./Interfaces.js"

export interface PropsMovie {
  movie: IMovie
}

export interface PropsMovieList {
  readonly page: number
  readonly movieIDs?: movieID[]
  readonly query?: string
  readonly from?: number
  readonly to?: number
  readonly genres?: number[]
}

export interface PropsBrowse {
  readonly page: number
  readonly from: number
  readonly to: number
  readonly genres: string
}

export interface PropsTrailers {
  trailers: string[]
  onCloseBackdrop: () => void
}
