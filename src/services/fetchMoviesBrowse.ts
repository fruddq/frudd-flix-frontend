import axios from "axios"
import type { IMovie } from "../models/Interfaces"
import { API_URL } from "./config"

export interface IBrowse {
  readonly page: number
  readonly from: number
  readonly to: number
  readonly genres: number[]
}

interface APIMoviesresponse {
  data: {
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
  }
}

export const fetchMoviesBrowse = async ({ from, to, genres, page }: IBrowse) => {
  const config = {
    method: "get",
    url: `${API_URL}/browse`,
    params: {
      from,
      to,
      genres,
      page,
    },
  }

  const response: APIMoviesresponse = await axios(config)
  return response.data
}
