export const ErrorMessage: React.FunctionComponent<{
  errorMessage?: string

}> = ({ errorMessage }) =>
  (
    <div className="error-message">{errorMessage}</div>
  )
