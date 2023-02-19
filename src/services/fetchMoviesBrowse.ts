import axios from "axios"
import type { movieID } from "../models/Interfaces"
import { API_URL } from "./config"

export interface IBrowse {
  readonly page: number
  readonly from?: number | undefined
  readonly to?: number | undefined
  readonly genres?: number[] | undefined
  readonly movieID?: movieID | undefined
  readonly query?: string | undefined
}

export const fetchMoviesBrowse = async ({ from, to, genres, page, movieID, query }: IBrowse) => {
  const config = {
    method: "get",
    url: `${API_URL}/browse`,
    params: {
      from,
      to,
      genres,
      page,
      movieID,
      query,
    },
  }

  const response = await axios(config)
  return response.data
}

// const data = await fetchData({ page: 2, route: "search", query: "spiderman" })

// console.log(data)
