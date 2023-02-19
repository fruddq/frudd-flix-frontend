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

export interface APIMoviesresponse {
  data: {
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
  }
}

export interface IGenre {
  readonly id: number
  readonly name: string
  readonly selected: boolean
}
