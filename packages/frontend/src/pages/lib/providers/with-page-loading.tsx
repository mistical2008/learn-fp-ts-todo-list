import { LazyExoticComponent, ReactElement, Suspense } from 'react'

import { PagePreloader } from 'shared/ui'

function withPageLoading(Page: LazyExoticComponent<() => ReactElement>) {
    return (
        <Suspense fallback={<PagePreloader />}>
            <Page />
        </Suspense>
    )
}
export { withPageLoading }
