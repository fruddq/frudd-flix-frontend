import axios from "axios"
import type { APIMoviesresponse, IFetchMovies } from "../models/Interfaces"
import { API_URL } from "./config"

export const fetchMovies = async ({ route, from, to, genres, page, movieID, query }: IFetchMovies) => {
  const config = {
    method: "get",
    url: `${API_URL}${route}`,
    params: {
      from,
      to,
      genres,
      page,
      movieID,
      query,
    },
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}

// const data = await fetchData({ page: 2, route: "search", query: "spiderman" })

// console.log(data)
