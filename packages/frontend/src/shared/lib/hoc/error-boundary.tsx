import { EuiErrorBoundary } from '@elastic/eui'
import { ReactNode } from 'react'

function withErrorBoundary (component: () => ReactNode) {
    const ErrorBoundaryWrapper = () => <EuiErrorBoundary>{component()}</EuiErrorBoundary>
    ErrorBoundaryWrapper.displayName = `withErrorBoundary(${component.name})`

    return ErrorBoundaryWrapper
}

export { withErrorBoundary }
