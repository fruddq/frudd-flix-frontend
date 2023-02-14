import axios from "axios"

export const fetchData = async ({
  route,
  from,
  to,
  genres,
  page,
  movieID,
}: {
  readonly route: string
  readonly from?: number
  readonly to?: number
  readonly genres?: number[]
  readonly page?: number
  readonly movieID?: number
}) => {
  try {
    const response = await axios.get(`http://localhost:3000/${route}`, {
      params: {
        from,
        to,
        genres,
        page,
        movieID,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
