export type movieID = number

export interface IMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: movieID
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

// export interface APIMoviesresponse {
//   data: IMovie[]
// }

export interface APIMoviesresponse {
  data: {
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
  }
}

export interface IFetchMovies {
  readonly route: string
  readonly from?: number | undefined
  readonly to?: number | undefined
  readonly genres?: number[] | undefined
  readonly page?: number | undefined
  readonly movieID?: movieID | undefined
  readonly query?: string | undefined
}

export interface APITrailersResponse {
  data: string[]
}

export interface IGenre {
  id: number
  name: string
  selected: boolean
}
