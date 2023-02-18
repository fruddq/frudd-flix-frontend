import { Navigate } from "../components/Navigate"

export const Home: React.FunctionComponent = () => <Navigate onNavigate={({ navigate }) => {
  navigate("/movies/1")
}} />

