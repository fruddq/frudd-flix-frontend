import axios from "axios"
import type { IMovie } from "../models/Interfaces"
import { API_URL } from "../config"

interface APIMoviesresponse {
  data: {
    page: number
    results: IMovie[]
    total_pages: number
    total_results: number
  }
}

export const fetchMoviesDiscover = async ({ page }: { readonly page: number }) => {
  const config = {
    method: "get",
    url: `${API_URL}/discover`,
    params: {
      page,
    },
  }

  const response: APIMoviesresponse = await axios(config)
  return response.data
}
