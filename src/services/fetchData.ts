import axios from "axios"

export const fetchData = async ({
  route,
  from,
  to,
  genres,
  page,
  movieID,
  query,
}: {
  readonly route: string
  readonly from?: number
  readonly to?: number
  readonly genres?: number[]
  readonly page?: number
  readonly movieID?: number
  readonly query?: string
}) => {
  try {
    const response = await axios.get(`http://localhost:3000/${route}`, {
      params: {
        from,
        to,
        genres,
        page,
        movieID,
        query,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

// const data = await fetchData({ page: 2, route: "search", query: "spiderman" })

// console.log(data)
