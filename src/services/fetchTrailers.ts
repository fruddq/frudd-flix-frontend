import axios from "axios"
import { API_URL } from "./config"

interface APITrailersResponse {
  data: string[]
}

export const fetchTrailers = async (movieID: number) => {
  const config = {
    url: `${API_URL}/trailers`,
    method: "get",
    params: {
      movieID,
    },
  }

  const response: APITrailersResponse = await axios(config)
  return response.data
}
