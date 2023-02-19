import axios from "axios"
import type { APIMoviesresponse } from "../models/Interfaces"
import { API_URL } from "../config"

export const fetchMoviesSearch = async ({ page, query }: { readonly page: number; readonly query: string }) => {
  const config = {
    method: "get",
    url: `${API_URL}/search`,
    params: {
      page,
      query,
    },
  }

  const response: APIMoviesresponse = await axios(config)
  return response.data
}
