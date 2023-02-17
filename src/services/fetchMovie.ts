import axios from "axios"
import type { APITrailersResponse } from "../models/Interfaces"
import { API_URL } from "./config"

export const fetchMovie = async (movieID: number) => {
  const config = {
    url: `${API_URL}id`,
    method: "get",
    params: {
      movieID,
    },
  }

  try {
    const response: APITrailersResponse = await axios(config)
    return response.data
  } catch (error) {
    console.error(error)
    return []
  }
}
