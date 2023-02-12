import axios from "axios"

// export const fetchData = async (endPoint: string) => {
//   try {
//     const response = await axios.get(`http://localhost:3000/${endPoint}`)
//     return response.data
//   } catch (error) {
//     console.error(error)
//   }
// }

export const fetchData = async ({
  from,
  to,
  genres,
  page,
}: {
  readonly from?: number
  readonly to?: number
  readonly genres?: number[]
  readonly page?: number
}) => {
  try {
    const response = await axios.get("http://localhost:3000/browse", {
      params: {
        from,
        to,
        genres,
        page,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
