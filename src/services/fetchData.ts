import axios from "axios"

export const fetchData = async (endPoint: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/${endPoint}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
