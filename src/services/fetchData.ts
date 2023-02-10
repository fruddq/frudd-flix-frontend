import axios from "axios"
import { API_URL, config } from "./tempConstants.js"

// @TODO ensure ENV functions as expcted
// import dotenv from "dotenv"
// dotenv.config()
// const config = { params: { api_key: process.env["API_KEY"] } }

export const fetchData = async (request: string) => {
  try {
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${request}`, config)
    return results
  } catch (err) {
    console.error(err)
  }
}
