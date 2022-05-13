/* eslint-disable react/display-name */
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

function withReactQuery(component: () => React.ReactNode) {
    const client = new QueryClient()

    const Wrapper = () => (
        <QueryClientProvider client={client}>
            <ReactQueryDevtools initialIsOpen={false} />
            {component()}
        </QueryClientProvider>
    )
    Wrapper.displayName = 'ReactQueryWrapper'

    return Wrapper
}
export { withReactQuery }
