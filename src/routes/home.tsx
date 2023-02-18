import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Movies } from "../components/Movies"

interface PropsRouteHome {
  page: number

}

export const RouteHome: React.FunctionComponent<PropsRouteHome> = ({ page }) =>
(
  <>
    <Header />
    <Movies page={page} />
    <Footer />
  </>
)


