import { Footer } from "./Footer"
import { Header } from "./Header"

export const ErrorMessage: React.FunctionComponent<{
  errorMessage: string
}> = ({ errorMessage }) =>
  (
    <div className="error-message-container">
      <Header />
      <div className="error-message">{errorMessage}</div>
      <Footer />
    </div>
  )
