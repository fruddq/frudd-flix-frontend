import { ErrorBoundary as ComponentErrorBoundary } from 'react-error-boundary'

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
    <ComponentErrorBoundary FallbackComponent={ErrorFallback}>{children}</ComponentErrorBoundary>
)

export default Main