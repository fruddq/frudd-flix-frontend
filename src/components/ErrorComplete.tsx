import { Footer } from "./Footer"
import { Header } from "./Header"

export const ErrorComplete: React.FunctionComponent<{
  errorMessage?: string

}> = ({ errorMessage }) =>
  (
    <>
      <Header />
      <div className="error-message">{errorMessage}</div>
      <Footer />
    </>
  )