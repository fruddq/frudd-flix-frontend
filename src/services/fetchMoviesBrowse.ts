import axios from "axios"
import type { APIMoviesresponse } from "../models/Interfaces"
import { API_URL } from "./config"

export interface IBrowse {
  readonly page: number
  readonly from: number
  readonly to: number
  readonly genres: number[]
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

// const data = await fetchData({ page: 2, route: "search", query: "spiderman" })

// console.log(data)
