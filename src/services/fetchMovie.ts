import axios from "axios"
import type { IMovie } from "../models/Interfaces"
import { API_URL } from "./config"

export interface APITMovieIDResponse {
  data: IMovie
}

export const fetchMovie = async (movieID: number) => {
  const config = {
    url: `${API_URL}/id`,
    method: "get",
    params: {
      movieID,
    },
  }

  const response: APITMovieIDResponse = await axios(config)
  return response.data
}
