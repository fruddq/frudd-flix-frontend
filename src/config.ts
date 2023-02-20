export const API_URL = window.location.host.includes("localhost")
  ? "http://localhost:3000/api/v1"
  : `${window.location.origin}/api/v1`

// Controls number of movies displayed in favorites and watchlater
export const moviesPerPage = 20
