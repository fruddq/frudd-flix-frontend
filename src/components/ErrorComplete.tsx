import { ErrorMessage } from "./ErrorMessage"
import { Footer } from "./Footer"
import { Header } from "./Header"

export const ErrorComplete: React.FunctionComponent<{
  errorMessage: string
}> = ({ errorMessage }) =>
  (
    <>
      <Header />
      <ErrorMessage errorMessage={errorMessage} />
      <Footer />
    </>
  )
