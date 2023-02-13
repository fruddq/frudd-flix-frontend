import { ErrorBoundary } from 'react-error-boundary'

const ErrorFallback: React.FunctionComponent<{
    readonly error: Error
}> = ({ error }) => {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
        </div>
    )
}

const Main: React.FunctionComponent<React.PropsWithChildren> = ({
    children,
}) => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
)

export default Main