import axios from "axios"

export const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/home")
    return response.data
  } catch (error) {
    console.error(error)
  }
}
