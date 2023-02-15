import { ErrorMessage } from "./ErrorMessage"
import { Header } from "./Header"

export const Error404: React.FunctionComponent = () =>
(
  <div>
    <Header />
    <ErrorMessage errorMessage="Page not found" />
  </div>
)
