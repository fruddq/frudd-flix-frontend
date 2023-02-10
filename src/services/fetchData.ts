import axios from "axios"

export const fetchData = async (endpoint: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/${endpoint}`)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
//test
