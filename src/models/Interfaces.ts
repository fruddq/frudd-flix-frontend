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

export interface PropsTrailers {
  movieID: movieID
  onCloseBackdrop: () => void
}

export interface IGenre {
  id: number
  name: string
  selected: boolean
}

// {
//   adult: false,
//   backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
//   belongs_to_collection: {
//     id: 529892,
//     name: 'Black Panther Collection',
//     poster_path: '/9ZSPIsxI3TZDgfg0Jzk0RZl4INg.jpg',
//     backdrop_path: '/yzVxUMYGKjK3GgmVI2BhmbuL9UY.jpg'
//   },
//   budget: 250000000,
//   genres: [
//     { id: 28, name: 'Action' },
//     { id: 12, name: 'Adventure' },
//     { id: 878, name: 'Science Fiction' }
//   ],
//   homepage: 'https://wakandaforevertickets.com',
//   id: 505642,
//   imdb_id: 'tt9114286',
//   original_language: 'en',
//   original_title: 'Black Panther: Wakanda Forever',
//   overview: 'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
//   popularity: 7895.146,
//   poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
//   production_companies: [
//     {
//       id: 420,
//       logo_path: '/hUzeosd33nzE5MCNsZxCGEKTXaQ.png',
//       name: 'Marvel Studios',
//       origin_country: 'US'
//     }
//   ],
//   production_countries: [ { iso_3166_1: 'US', name: 'United States of America' } ],
//   release_date: '2022-11-09',
//   revenue: 835000000,
//   runtime: 162,
//   spoken_languages: [
//     { english_name: 'English', iso_639_1: 'en', name: 'English' },
//   ],
//   status: 'Released',
//   tagline: 'Forever.',
//   title: 'Black Panther: Wakanda Forever',
//   video: false,
//   vote_average: 7.481,
//   vote_count: 3016
// }

// {
//   "adult": false,
//   "backdrop_path": "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
//   "genre_ids": [28, 12, 878],
//   "id": 505642,
//   "original_language": "en",
//   "original_title": "Black Panther: Wakanda Forever",
//   "overview": "Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.",
//   "popularity": 7332.994,
//   "poster_path": "/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
//   "release_date": "2022-11-09",
//   "title": "Black Panther: Wakanda Forever",
//   "video": false,
//   "vote_average": 7.5,
//   "vote_count": 2763
// }

// {
//   adult: false,
//   backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
//   id: 505642,
//   original_language: 'en',
//   original_title: 'Black Panther: Wakanda Forever',
//   overview: 'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death.  As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
//   popularity: 7895.146,
//   poster_path: '/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
//   title: 'Black Panther: Wakanda Forever',
//   vote_average: 7.483,
//   vote_count: 3035,
//   release_date: '2022-11-09',
//   genre_ids: [ 28, 12, 878 ]
// }
