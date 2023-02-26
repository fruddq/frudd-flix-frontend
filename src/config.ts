export const API_VERSION = "/v1"

export const API_URL = window.location.host.includes("localhost")
  ? `http://localhost:3000/api${API_VERSION}`
  : `${window.location.origin}/api${API_VERSION}`

// Controls number of movies displayed in favorites and watchlater
export const moviesPerPage = 20
